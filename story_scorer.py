"""
Simple Flask backend to score the story recall with OpenAI.
Run with:
  export OPENAI_API_KEY=...   # your key (or set in .env)
  python story_scorer.py
The frontend should point window.STORY_SCORER_URL to http://127.0.0.1:5000/score-story
"""

import json
import logging
import os


def load_env_file(path):
    if not os.path.isfile(path):
        return
    try:
        with open(path, "r", encoding="utf-8") as handle:
            for raw_line in handle:
                line = raw_line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip()
                if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
                    value = value[1:-1]
                os.environ.setdefault(key, value)
    except Exception as exc:
        logging.warning("Failed to load .env file %s: %s", path, exc)


from flask import Flask, request, jsonify, make_response, send_from_directory
from openai import OpenAI
from pydantic import BaseModel

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(level=logging.INFO, format="gg %(asctime)s %(levelname)s %(message)s")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_env_file(os.path.join(BASE_DIR, ".env"))
PROMPT_DIR = os.path.join(BASE_DIR, "ecas-automation", "prompts")


def load_prompt_file(filename: str, fallback: str) -> str:
    path = os.path.join(PROMPT_DIR, filename)
    try:
        with open(path, "r", encoding="utf-8") as handle:
            content = handle.read().strip()
            return content or fallback
    except Exception:
        return fallback


class StoryScore(BaseModel):
    sunday: str
    annual_cleanup: str
    marigold_woods: str
    forty_two: str
    bicycles_and_carts: str
    robert_webber: str
    woodland_project: str
    positive_emotion: str
    seventeen: str
    children: str


class FluencyScore(BaseModel):
    processed_words: list[str]
    rationale: dict[str, str]


class SentenceItemScore(BaseModel):
    prompt: str | None = None
    response: str
    score: int
    rationale: str


class SentenceScore(BaseModel):
    items: list[SentenceItemScore]
    total: int


class AlternationItem(BaseModel):
    trial: int
    target: str
    response: str
    score: int
    rationale: str


class AlternationSegmentation(BaseModel):
    items: list[AlternationItem]
    total: int
    stop_after_trial: int | None = None


SENTENCE_PROMPT = """
You are scoring the ECAS Executive - Sentence Completion task.

For each item you receive the participant's first response (no self-corrections). Score using:
- 2 points: completely unconnected / nonsensical to the sentence.
- 1 point: related/associated or opposite meaning.
- 0 points: exact or contextually appropriate word.

Rules:
- If the response is repeated from a prior trial, still score it normally but briefly note the repetition in the rationale.
- Sentences can be grammatically incorrect — focus on semantic relatedness, not grammar.
- Use clinical judgment based on meaning, not strict literal matching.

Examples:
1|The mailman knocked on the ____|2:Car,Potato|1:Window,Gate,Mailbag|0:Door
2|He brought his umbrella with him in case of ____|2:Rubber,Parachute|1:Sunshine,Wind,Ice|0:Rain
3|Sally spread her toast with butter and ____|2:Earth,Sand|1:Cereal,Egg,Oranges (other food items)|0:Jam,Marmalade,Honey,Jelly,Cheese
4|John went to the barbers to get his hair ____|2:Moon,Table|1:Washed,Lengthened,Signed,Polished|0:Cut
5|She dived into the swimming ____|2:Garden,Swing|1:Pond,Bath,Rock|0:Pool
6|They all went to the local café for something to ____|2:Jump,Dance|1:Do,Play,Buy|0:Eat,Drink

Return JSON with:
- items: array of {prompt (optional), response, score (0-2), rationale (short explanation of why the score was assigned + include note of repetition if needed)}
- total: sum of scores
"""

FLUENCY_T_PROMPT = """
You are scoring a verbal fluency task for the letter "T".
Given the raw list of spoken words, produce a processed list that follows these rules:
- Words must start with T and be EXACTLY 4 letters.
- No names of people, places, or numbers.
- Words must be varied; no repetitions or simple inflections with no meaning change.
- Exclude nonsense words (not in an English dictionary) and proper names.
- If a second meaning is provided, score it as an independent item.
- Different spelling/meaning counts as separate; different grammatical forms with meaning change count separately.
- Plurals are accepted only if the singular wasn’t already provided; if both occur, score only the first.
- Perseverations with no meaning change (sit/sat/sitting; take/took) count once.

Return ONLY JSON with:
- "processed_words": an array of strings that meet these rules.
- "rationale": a dictionary mapping EACH removed word to a reason. Use only these reasons:
  "proper name", "number", "place", "nonsense word", "repeat", "inflection", "does not start with T", "wrong length".
  If no words are removed, return an empty object.
"""


SCORING_PROMPT = """
You are an EDINBURGH COGNITIVE AND BEHAVIORAL ALS SCREEN proctor agent.

Context: The participant was read a story and then was asked to freely recall what they could remember.

Raw Transcript of what participant recalled:
"<<TRANSCRIPT>>"

--
Your job is to score their response based on these criteria.
They earn 1 point for each criterion they satisfy or mention:

1. If they mention the word "Sunday" → Only the exact word “Sunday” is accepted.
2. If they mention the "Annual Park Cleanup" → Accept: “Annual cleanup”, “garbage cleanup”, “park cleanup”, “annual trash cleanup”.
3. If they mention "Marigold Woods" → Any part of “Marigold Woods” verbatim, or a similar place such as “forest”, “park”.
4. If they recall the number "Forty two" → Can be either the raw number 42 or word version "forty two" etc.
5. If they mention "Bicycles and shopping carts" → Must mention BOTH items; similar terms like “carts” or “trolley” are allowed.
6. If they mention "Robert Webber" → A mention of “Robert” and/or “Webber” will suffice to earn the point.
7. If they mention the "Woodland project" → Mention of “woodland” + a project synonym like “plan”, “initiative”, “program”.
8. If they mention "Impressed and especially proud" → Any positive emotional response (e.g., “pleased”) would suffice to earn the point.
9. If they recall the number "Seventeen" → Can be either the raw number 17 or word version "seventeen" etc..
10. If they recall there were "Children" → “Children”, “kids”, or similar term.

Return ONLY the JSON with yes/no values for each field.
"""

FLUENCY_PROMPT = """
You are scoring a verbal fluency task for the letter "S".
Given the raw list of spoken words, produce a processed list that follows these rules:
- No names of people, places, or numbers.
- Words must be varied (e.g., sugar, salt, slipper, snow, scream, shoot, scale, scissors).
- Do not include repetitions, nonsense words (not in an English dictionary), or proper names.
- If a second meaning is provided, score it as an independent item (e.g., school the institution vs school of fish).
- Different spelling/meaning counts as separate (e.g., paced vs paste; savor vs savory).
- Different grammatical forms with meaning change count separately (e.g., final vs finally).
- Plurals are accepted only if the singular wasn’t already provided; if both occur, score only the first.
- Perseverations with no meaning change (sit/sat/sitting; take/took) count once.

Return ONLY JSON with:
- "processed_words": an array of strings that meet these rules.
- "rationale": a dictionary mapping EACH removed word to a reason. Use only these reasons:
  "proper name", "number", "place", "nonsense word", "repeat", "inflection", "does not start with S".
  If no words are removed, return an empty object.
"""

ALTERNATION_PROMPT = """
You are segmenting the ECAS Executive Alternation task: number/letter switching.

The examiner already prompted the participant with:
1-A, 2-B, 3-C

The participant then continued the sequence. Your job is to take one messy speech-to-text transcript for the whole task and segment it into the 12 ECAS target trials:
1. 4-D
2. 5-E
3. 6-F
4. 7-G
5. 8-H
6. 9-I
7. 10-J
8. 11-K
9. 12-L
10. 13-M
11. 14-N
12. 15-O

Important rules:
- A response can be number-first or letter-first. Both are correct. Example: "4 D" and "D 4" are both correct for trial 1.
- The transcript may contain ASR noise. Normalize obvious variants like:
  "four d", "4d", "d4", "dee four", "ten j", "jay ten", "eleven kay", "oh" for O.
- Segment the participant's transcript in chronological order.
- For each target trial, produce the best single response substring from the transcript.
- Preserve participant mistakes exactly. Do NOT auto-correct an incorrect sequence into the expected target.
- If the participant says something like "13 N 14 M" instead of "13 M 14 N", keep those mistakes attached to the relevant trials as spoken so downstream scoring can mark them incorrect.
- If the participant skips ahead, swaps letters/numbers, repeats, reverses order, or blends multiple trials together, reflect that in the segmented responses rather than silently fixing it.
- If the participant self-corrects within the same trial, keep only the FINAL corrected answer for that trial, not the earlier abandoned attempt.
- Example: if the transcript says "8 I, oh sorry, no actually 8 H", the response for that trial should be "8 H", not "8 I 8 H".
- More generally, when two candidate answers belong to the same trial because the speaker overrides themselves, return only the latest committed answer for that trial.
- ECAS administration stops after the first error. If the participant makes a clear error, later trials should usually be blank unless the transcript clearly contains a valid continued response before stopping.
- If there is not enough evidence for a trial, return an empty response with score 0 and explain briefly.

Return ONLY JSON with:
- items: array of 12 objects, each with:
  - trial: integer 1-12
  - target: target pair like "4-D"
  - response: best segmented participant response for that trial, or ""
  - score: 1 if correct, 0 if incorrect / missing
  - rationale: brief explanation
- total: sum of score values
- stop_after_trial: the first trial number where the sequence clearly becomes incorrect, or null if no clear stopping point
"""

def build_story_prompt(transcript: str, override: str | None, base_prompt: str) -> str:
    base = (override or "").strip() or base_prompt
    if "<<TRANSCRIPT>>" in base:
        return base.replace("<<TRANSCRIPT>>", transcript)
    return f"{base}\n\nTranscript:\n{transcript}"


def extract_usage(completion) -> dict:
    usage = getattr(completion, "usage", None)
    if not usage:
        return {}
    # Handle both legacy and newer naming if available.
    input_tokens = getattr(usage, "prompt_tokens", None)
    output_tokens = getattr(usage, "completion_tokens", None)
    total_tokens = getattr(usage, "total_tokens", None)
    if input_tokens is None:
        input_tokens = getattr(usage, "input_tokens", None)
    if output_tokens is None:
        output_tokens = getattr(usage, "output_tokens", None)
    result = {}
    if input_tokens is not None:
        result["input_tokens"] = int(input_tokens)
    if output_tokens is not None:
        result["output_tokens"] = int(output_tokens)
    if total_tokens is not None:
        result["total_tokens"] = int(total_tokens)
    return result


api_key = os.getenv("OPENAI_API_KEY", "")
client = OpenAI(api_key=api_key)
logging.info("Backend started. OPENAI_API_KEY present: %s", bool(api_key))

STATIC_DIR = os.path.join(BASE_DIR, "ecas-automation")

app = Flask(__name__)


@app.route("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.route("/config.js")
def config_js():
    supabase_url = os.getenv("SUPABASE_URL", "")
    supabase_anon = os.getenv("SUPABASE_ANON_KEY", "")
    story_url = os.getenv("STORY_SCORER_URL", "")
    fluency_url = os.getenv("FLUENCY_SCORER_URL", "")
    fluency_t_url = os.getenv("FLUENCY_T_SCORER_URL", "")
    sentence_url = os.getenv("SENTENCE_SCORER_URL", "")
    alternation_url = os.getenv("ALTERNATION_SCORER_URL", "")
    js = (
        "window.SUPABASE_URL = "
        + json.dumps(supabase_url)
        + ";\nwindow.SUPABASE_ANON_KEY = "
        + json.dumps(supabase_anon)
        + ";\nwindow.STORY_SCORER_URL = "
        + json.dumps(story_url or "/score-story")
        + ";\nwindow.FLUENCY_SCORER_URL = "
        + json.dumps(fluency_url or "/score-fluency")
        + ";\nwindow.FLUENCY_T_SCORER_URL = "
        + json.dumps(fluency_t_url or "/score-fluency-t")
        + ";\nwindow.SENTENCE_SCORER_URL = "
        + json.dumps(sentence_url or "/score-sentences")
        + ";\nwindow.ALTERNATION_SCORER_URL = "
        + json.dumps(alternation_url or "/segment-alternation")
        + ";\n"
    )
    response = make_response(js)
    response.headers["Content-Type"] = "application/javascript"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/favicon.ico")
def favicon():
    return ("", 204)


@app.route("/<path:filename>")
def static_files(filename):
    file_path = os.path.join(STATIC_DIR, filename)
    if not os.path.isfile(file_path):
        return make_response("Not Found", 404)
    return send_from_directory(STATIC_DIR, filename)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


@app.post("/score-story")
def score_story():
    if not client.api_key:
        logging.error("OPENAI_API_KEY not set")
        return jsonify({"error": "OPENAI_API_KEY not set"}), 400

    data = request.get_json(force=True) or {}
    transcript = data.get("transcript", "") or ""
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_base = load_prompt_file("story.txt", SCORING_PROMPT)
    prompt = build_story_prompt(transcript, override, prompt_base)
    logging.info("Scoring request received. Transcript length: %s", len(transcript))

    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You score transcripts using a strict schema."},
                {"role": "user", "content": prompt},
            ],
            response_format=StoryScore,
        )
        parsed: StoryScore = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500

    response = jsonify(payload)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.route("/score-story", methods=["OPTIONS"])
def score_story_options():
    logging.info("OPTIONS preflight received.")
    response = make_response("", 204)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


@app.post("/score-fluency")
def score_fluency():
    if not client.api_key:
        logging.error("OPENAI_API_KEY not set")
        return jsonify({"error": "OPENAI_API_KEY not set"}), 400
    data = request.get_json(force=True) or {}
    words = data.get("words", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("fluency.txt", FLUENCY_PROMPT)
    logging.info("Fluency scoring request. Raw words count: %s", len(words))
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You process fluency word lists following strict scoring rules."},
                {"role": "user", "content": f"{prompt_text}\n\nRaw words:\n{words}"},
            ],
            response_format={"type": "json_object"},
        )
        content = completion.choices[0].message.content or "{}"
        parsed = json.loads(content)
        processed_words = parsed.get("processed_words", [])
        rationale = parsed.get("rationale", {})
        payload = {
            "processed_words": processed_words if isinstance(processed_words, list) else [],
            "rationale": rationale if isinstance(rationale, dict) else {},
            "usage": extract_usage(completion),
        }
        logging.info("Fluency OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Fluency OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500
    return jsonify(payload)


@app.route("/score-fluency", methods=["OPTIONS"])
def score_fluency_options():
    logging.info("Fluency OPTIONS preflight received.")
    response = make_response("", 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


@app.route("/score-fluency-t", methods=["POST", "OPTIONS"])
def score_fluency_t():
    if request.method == "OPTIONS":
        logging.info("Fluency-T OPTIONS preflight received.")
        response = make_response("", 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

    if not client.api_key:
        logging.error("OPENAI_API_KEY not set")
        return jsonify({"error": "OPENAI_API_KEY not set"}), 400
    data = request.get_json(force=True) or {}
    words = data.get("words", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("fluency_t.txt", FLUENCY_T_PROMPT)
    logging.info("Fluency-T scoring request. Raw words count: %s", len(words))
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You process fluency word lists following strict scoring rules."},
                {"role": "user", "content": f"{prompt_text}\n\nRaw words:\n{words}"},
            ],
            response_format={"type": "json_object"},
        )
        content = completion.choices[0].message.content or "{}"
        parsed = json.loads(content)
        processed_words = parsed.get("processed_words", [])
        rationale = parsed.get("rationale", {})
        payload = {
            "processed_words": processed_words if isinstance(processed_words, list) else [],
            "rationale": rationale if isinstance(rationale, dict) else {},
            "usage": extract_usage(completion),
        }
        logging.info("Fluency-T OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Fluency-T OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500
    return jsonify(payload)


@app.route("/segment-alternation", methods=["POST", "OPTIONS"])
def segment_alternation():
    if request.method == "OPTIONS":
        logging.info("Alternation OPTIONS preflight received.")
        response = make_response("", 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

    if not client.api_key:
        logging.error("OPENAI_API_KEY not set")
        return jsonify({"error": "OPENAI_API_KEY not set"}), 400

    data = request.get_json(force=True) or {}
    transcript = data.get("transcript", "") or ""
    trials = data.get("trials", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("alternation.txt", ALTERNATION_PROMPT)
    trial_lines = []
    for idx, item in enumerate(trials, start=1):
        number = item.get("number") if isinstance(item, dict) else ""
        letter = item.get("letter") if isinstance(item, dict) else ""
        trial_lines.append(f"{idx}. {number}-{letter}")
    payload_text = "\n".join(trial_lines)
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You segment ECAS alternation transcripts into trial-level responses."},
                {
                    "role": "user",
                    "content": f"{prompt_text}\n\nTargets:\n{payload_text}\n\nRaw transcript:\n{transcript}",
                },
            ],
            response_format=AlternationSegmentation,
        )
        parsed: AlternationSegmentation = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Alternation OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Alternation OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500
    return jsonify(payload)


@app.route("/score-sentences", methods=["POST", "OPTIONS"])
def score_sentences():
    if request.method == "OPTIONS":
        logging.info("Sentence completion OPTIONS preflight received.")
        response = make_response("", 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

    if not client.api_key:
        logging.error("OPENAI_API_KEY not set")
        return jsonify({"error": "OPENAI_API_KEY not set"}), 400
    data = request.get_json(force=True) or {}
    responses = data.get("responses", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("sentence.txt", SENTENCE_PROMPT)
    logging.info("Sentence scoring request. Responses count: %s", len(responses))
    lines = []
    for idx, item in enumerate(responses, start=1):
        prompt = item.get("prompt") if isinstance(item, dict) else ""
        resp = item.get("response") if isinstance(item, dict) else item
        lines.append(f"{idx}. Prompt: {prompt} | Response: {resp}")
    payload_text = "\n".join(lines)
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You score sentence completion responses strictly."},
                {"role": "user", "content": f"{prompt_text}\n\nParticipant responses:\n{payload_text}"},
            ],
            response_format=SentenceScore,
        )
        parsed: SentenceScore = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Sentence OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Sentence OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500
    return jsonify(payload)


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
