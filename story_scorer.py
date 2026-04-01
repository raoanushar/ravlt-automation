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


class SentenceSegmentItem(BaseModel):
    prompt: str
    response: str


class SentenceSegmentation(BaseModel):
    items: list[SentenceSegmentItem]


class ComprehensionSegmentItem(BaseModel):
    prompt: str
    response: str


class ComprehensionSegmentation(BaseModel):
    items: list[ComprehensionSegmentItem]


class DigitSegmentItem(BaseModel):
    target: str
    response: str


class DigitSegmentation(BaseModel):
    items: list[DigitSegmentItem]


class SpellingSegmentItem(BaseModel):
    target: str
    response: str


class SpellingSegmentation(BaseModel):
    items: list[SpellingSegmentItem]


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

SENTENCE_SEGMENT_PROMPT = """
You are segmenting the ECAS Executive Sentence Completion task.

The clinician reads six sentence stems aloud one at a time and the participant gives a single response to each stem.
Your job is to take one full messy speech-to-text transcript containing both the clinician's spoken prompts and the participant's replies, and extract the participant's response for each sentence in order.

The actual sentence stems for this task are:
1. The mailman knocked on the
2. He brought his umbrella with him in case of
3. Sally spread her toast with butter and
4. John went to the barbers to get his hair
5. She dived into the swimming
6. They all went to the local cafe for something to

Rules:
- Ignore the clinician's words as much as possible and extract only the participant's completion response.
- Preserve the participant's wording exactly as much as possible.
- Take the first committed participant answer for each sentence. Do not replace it with a later self-correction.
- If the transcript does not contain enough evidence for a sentence, return an empty response.
- Return one item for each sentence prompt in the exact same order as provided.

Worked example:

If the sentence stems are:
- The mailman knocked on the
- He brought his umbrella with him in case of
- Sally spread her toast with butter and
- John went to the barbers to get his hair

And the raw transcript is:
"the mailman knocked on the door he brought his umbrella with him in case of rain sally spread her toast with butter and jam john went to the barbers to get his hair cut"

Then the extracted responses should be:
- The mailman knocked on the -> "door"
- He brought his umbrella with him in case of -> "rain"
- Sally spread her toast with butter and -> "jam"
- John went to the barbers to get his hair -> "cut"

Notice:
- Return only the participant's completion, not the full sentence stem.
- Keep the wording exactly as spoken.
- If the participant gives a wrong or unusual answer, preserve it exactly instead of normalizing it.

Return ONLY JSON with:
- items: array of objects with:
  - prompt: the original sentence stem
  - response: the participant's extracted response, or ""
"""

COMPREHENSION_SEGMENT_PROMPT = """
You are segmenting the ECAS Language Comprehension task (Sentence to picture matching).

The clinician reads a prompt aloud, and the participant responds by saying a word/phrase (or discussing choices) that indicates which picture matches.
Your job is to take one full messy speech-to-text transcript containing both clinician speech and participant speech, then extract the participant response for each prompt in order.

The actual prompts are:
1. Something you can fly in
2. Something with webbed feet
3. An animal that climbs trees
4. Something used for chopping
5. A means of transportation
6. Something with a sharp edge
7. Something with a sting
8. Something with a diet of nuts and seeds

Likely picture labels in this section are:
- Helicopter
- Swan
- Squirrel
- Axe
- Scorpion

Rules:
- Ignore the clinician prompt text as much as possible.
- Keep only the participant response for each prompt.
- Preserve participant wording exactly; do not auto-correct or normalize.
- If the participant self-corrects within a prompt, keep the latest committed answer for that prompt.
- If there is not enough evidence for a prompt, return an empty response.
- Return one item per prompt in the exact same order as provided.

Return ONLY JSON with:
- items: array of objects with:
  - prompt: the original prompt
  - response: extracted participant response, or ""
"""

DIGIT_SEGMENT_PROMPT = """
You are segmenting the ECAS Executive Digit Span Backwards task.

The clinician reads digit sequences aloud one at a time and the participant repeats each sequence in reverse order.
Your job is to take one full messy speech-to-text transcript containing both the clinician's prompts and the participant's responses, then extract the participant's response for each target trial in order.

The actual target trials for this task are:
1. 2 6
2. 5 8
3. 9 3 5
4. 4 1 6
5. 7 2 8 4
6. 9 5 7 3
7. 6 9 4 2 1
8. 8 3 2 5 6
9. 8 1 3 5 7 9
10. 3 6 2 7 3 4
11. 1 6 9 3 5 8 6
12. 2 3 6 8 4 9 2

Rules:
- Ignore the clinician's spoken prompt digits as much as possible and extract only the participant's spoken response.
- Preserve the participant's wording/digits exactly as much as possible.
- Keep the participant's response exactly as spoken, even if it is wrong, incomplete, repeated, or not fully reversed.
- Return one item for each target trial in the exact same order as provided.
- If there is not enough evidence for a trial, return an empty response.

Worked example:

If the target trials are:
- 2 6
- 5 8
- 9 3 5
- 4 1 6

And the raw transcript is:
"two six six two five eight eight five nine three five five three nine four one six six one"

Then the extracted responses should be:
- 2 6 -> "6 2"
- 5 8 -> "8 5"
- 9 3 5 -> "5 3 9"
- 4 1 6 -> "6 1"

Notice:
- Keep the response matched to each target trial in chronological order.
- Preserve mistakes exactly as spoken. Do not complete or correct "6 1" into "6 1 4".
- Do not include the clinician's prompt digits in the response field.

Return ONLY JSON with:
- items: array of objects with:
  - target: the original target digit sequence
  - response: the participant's extracted response, or ""
"""

SPELLING_SEGMENT_PROMPT = """
You are segmenting the ECAS Spoken Spelling Accuracy task.

The clinician reads target words aloud one at a time and the participant spells each word aloud.
Your job is to take one full messy speech-to-text transcript containing both the clinician's prompts and the participant's spoken spellings, then extract the participant's raw spelled response for each target word in order.

The target words for this task are:
1. ENVELOPE
2. SKATEBOARD
3. CONSTRUCTING
4. PARTNER
5. BISCUIT
6. LAWNMOWER
7. DELIVER
8. RECORDED
9. COATHANGER
10. ORCHESTRA
11. SCREWDRIVER
12. BROUGHT

Rules:
- Ignore the clinician's spoken prompt word as much as possible and extract only the participant's spoken spelling.
- Preserve the participant's raw spelling exactly as much as possible. Do NOT auto-correct, normalize, or improve the spelling.
- Keep the raw sequence of letters/words as spoken. If the participant spells something incorrectly, preserve the incorrect spelling.
- Use the known target-word list as context to identify which spelling belongs to which item, but do not "fix" the participant's spelling to match the target.
- If there is clarification/back-and-forth for a target word, keep the FINAL committed spelling for that target (not earlier abandoned attempts).
- Ignore conversational scaffolding such as "wait did you mean...", "like...", "as in...", "oh okay".
- If the transcript includes the token "space" inside a spelled sequence, treat it as a literal separator between spelling chunks, not as the letters of the word "space".
- Return one item for each target word in the exact same order as provided.
- If there is not enough evidence for a word, return an empty response.

Worked example:

If the raw transcript is:
"okay I'm going to spell give you a bunch of different words and you're going to spell that for me okay envelope e n v e l o p e skateboard s k a t b o a r d constructing c o n t r u c t i n g partner p a r t n e r biscuit biscuit lawn mower l a w n m o wer deliver d e l i e v e r recorded r e c o r d i d"

Then the extracted responses should be:
- ENVELOPE -> "e n v e l o p e"
- SKATEBOARD -> "s k a t b o a r d"
- CONSTRUCTING -> "c o n t r u c t i n g"
- PARTNER -> "p a r t n e r"
- BISCUIT -> "biscuit"
- LAWNMOWER -> "l a w n m o wer"
- DELIVER -> "d e l i e v e r"
- RECORDED -> "r e c o r d i d"

Notice:
- Keep the participant's raw spelling exactly as spoken.
- Do not change "s k a t b o a r d" to "s k a t e b o a r d".
- Do not change "d e l i e v e r" to "d e l i v e r".
- Do not change "r e c o r d i d" to "r e c o r d e d".
- If the participant just says the whole word, like "biscuit", preserve that raw response as "biscuit".

Additional few-shot examples:

1) Clarification and self-correction within the same target
- Raw: "the next word is constructing c o n s t r u c t e d wait did you mean constructed or constructed I meant the word constructing oh okay so so without the Ed so c o n s t r u c t i n g"
- Output for CONSTRUCTING: "c o n s t r u c t i n g"
- Why: keep the final committed spelling after clarification; discard the earlier abandoned "constructed" spelling.

2) Back-and-forth meaning clarification
- Raw: "brought like like b r a u t brought like bratwurst or as in I brought you something oh okay b r o u g h t"
- Output for BROUGHT: "b r o u g h t"
- Why: preserve the final committed spelling for the target, not the earlier failed attempt.

3) Token "space" inside spelled sequence
- Raw: "screwdriver s c r e w space d r i b r"
- Output for SCREWDRIVER: "s c r e w d r i b r"
- Why: treat "space" as a separator marker, not as literal content.

Return ONLY JSON with:
- items: array of objects with:
  - target: the original target word
  - response: the participant's extracted raw spelling, or ""
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
- Even if the participant makes an error, continue segmenting all later discernible responses from the transcript. Do NOT stop segmentation at the first mistake.
- Score each trial independently based on what was actually said for that trial.
- The downstream application will calculate the official section score as the number of consecutive correct responses from the beginning, so your job is to preserve and score every trial-level response, not to truncate the sequence.
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
    sentence_segment_url = os.getenv("SENTENCE_SEGMENTER_URL", "")
    comprehension_segment_url = os.getenv("COMPREHENSION_SEGMENTER_URL", "")
    digit_segment_url = os.getenv("DIGIT_SEGMENTER_URL", "")
    spelling_segment_url = os.getenv("SPELLING_SEGMENTER_URL", "")
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
        + ";\nwindow.SENTENCE_SEGMENTER_URL = "
        + json.dumps(sentence_segment_url or "/segment-sentences")
        + ";\nwindow.COMPREHENSION_SEGMENTER_URL = "
        + json.dumps(comprehension_segment_url or "/segment-comprehension")
        + ";\nwindow.DIGIT_SEGMENTER_URL = "
        + json.dumps(digit_segment_url or "/segment-digits")
        + ";\nwindow.SPELLING_SEGMENTER_URL = "
        + json.dumps(spelling_segment_url or "/segment-spelling")
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


@app.route("/segment-sentences", methods=["POST", "OPTIONS"])
def segment_sentences():
    if request.method == "OPTIONS":
        logging.info("Sentence segmentation OPTIONS preflight received.")
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
    prompts = data.get("prompts", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("sentence_segment.txt", SENTENCE_SEGMENT_PROMPT)
    prompt_lines = [f"{idx}. {prompt}" for idx, prompt in enumerate(prompts, start=1)]
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You segment ECAS sentence completion transcripts into prompt-level responses."},
                {
                    "role": "user",
                    "content": f"{prompt_text}\n\nSentence prompts:\n" + "\n".join(prompt_lines) + f"\n\nRaw transcript:\n{transcript}",
                },
            ],
            response_format=SentenceSegmentation,
        )
        parsed: SentenceSegmentation = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Sentence segmentation OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Sentence segmentation OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500

    return jsonify(payload)


@app.route("/segment-comprehension", methods=["POST", "OPTIONS"])
def segment_comprehension():
    if request.method == "OPTIONS":
        logging.info("Comprehension segmentation OPTIONS preflight received.")
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
    prompts = data.get("prompts", []) or []
    labels = data.get("labels", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("comprehension_segment.txt", COMPREHENSION_SEGMENT_PROMPT)
    prompt_lines = [f"{idx}. {prompt}" for idx, prompt in enumerate(prompts, start=1)]
    label_lines = [f"{idx}. {label}" for idx, label in enumerate(labels, start=1)]
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You segment ECAS sentence-to-picture transcripts into prompt-level participant responses."},
                {
                    "role": "user",
                    "content": (
                        f"{prompt_text}\n\nSentence prompts:\n"
                        + "\n".join(prompt_lines)
                        + "\n\nPicture labels:\n"
                        + "\n".join(label_lines)
                        + f"\n\nRaw transcript:\n{transcript}"
                    ),
                },
            ],
            response_format=ComprehensionSegmentation,
        )
        parsed: ComprehensionSegmentation = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Comprehension segmentation OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Comprehension segmentation OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500

    return jsonify(payload)


@app.route("/segment-digits", methods=["POST", "OPTIONS"])
def segment_digits():
    if request.method == "OPTIONS":
        logging.info("Digit segmentation OPTIONS preflight received.")
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
    prompt_text = (override or "").strip() or load_prompt_file("digit_segment.txt", DIGIT_SEGMENT_PROMPT)
    trial_lines = [f"{idx}. {trial}" for idx, trial in enumerate(trials, start=1)]
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You segment ECAS digit span transcripts into trial-level responses."},
                {
                    "role": "user",
                    "content": f"{prompt_text}\n\nTarget trials:\n" + "\n".join(trial_lines) + f"\n\nRaw transcript:\n{transcript}",
                },
            ],
            response_format=DigitSegmentation,
        )
        parsed: DigitSegmentation = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Digit segmentation OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Digit segmentation OpenAI call failed")
        return jsonify({"error": "llm_failed", "detail": str(err)}), 500

    return jsonify(payload)


@app.route("/segment-spelling", methods=["POST", "OPTIONS"])
def segment_spelling():
    if request.method == "OPTIONS":
        logging.info("Spelling segmentation OPTIONS preflight received.")
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
    targets = data.get("targets", []) or []
    override = data.get("prompt") if isinstance(data, dict) else ""
    prompt_text = (override or "").strip() or load_prompt_file("spelling_segment.txt", SPELLING_SEGMENT_PROMPT)
    target_lines = [f"{idx}. {target}" for idx, target in enumerate(targets, start=1)]
    try:
        completion = client.chat.completions.parse(
            model="gpt-5.1",
            messages=[
                {"role": "system", "content": "You segment ECAS spoken spelling transcripts into target-level raw spellings."},
                {
                    "role": "user",
                    "content": f"{prompt_text}\n\nTarget words:\n" + "\n".join(target_lines) + f"\n\nRaw transcript:\n{transcript}",
                },
            ],
            response_format=SpellingSegmentation,
        )
        parsed: SpellingSegmentation = completion.choices[0].message.parsed
        payload = parsed.model_dump()
        payload["usage"] = extract_usage(completion)
        logging.info("Spelling segmentation OpenAI call succeeded.")
    except Exception as err:  # pylint: disable=broad-except
        logging.exception("Spelling segmentation OpenAI call failed")
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
