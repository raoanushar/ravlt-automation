const items = [
  {
    id: "accordion",
    label: "Accordion",
    src: "form_a/naming_images/accordian.png",
    answers: ["ACCORDION", "ACCORDIAN", "SQUEEZE BOX"]
  },
  {
    id: "axe",
    label: "Axe",
    src: "form_a/naming_images/axe.png",
    answers: ["AXE", "AX", "HATCHET"]
  },
  {
    id: "bow",
    label: "Bow",
    src: "form_a/naming_images/bow.png",
    answers: ["BOW", "RIBBON"]
  },
  {
    id: "fox",
    label: "Fox",
    src: "form_a/naming_images/fox.png",
    answers: ["FOX", "WOLF", "COYOTE"]
  },
  {
    id: "helicopter",
    label: "Helicopter",
    src: "form_a/naming_images/helicopter.png",
    answers: ["HELICOPTER", "CHOPPER"]
  },
  {
    id: "scorpion",
    label: "Scorpion",
    src: "form_a/naming_images/scorpion.png",
    answers: ["SCORPION"]
  },
  {
    id: "squirrel",
    label: "Squirrel",
    src: "form_a/naming_images/squirrel.png",
    answers: ["SQUIRREL"]
  },
  {
    id: "swan",
    label: "Swan",
    src: "form_a/naming_images/swan.png",
    answers: ["SWAN"]
  }
];

const itemLookup = items.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
const itemIndexById = items.reduce((acc, item, idx) => {
  acc[item.id] = idx;
  return acc;
}, {});

const comprehensionPrompts = [
  { prompt: "Something you can fly in", answerId: "helicopter" },
  { prompt: "Something with webbed feet", answerId: "swan" },
  { prompt: "An animal that climbs trees", answerId: "squirrel" },
  { prompt: "Something used for chopping", answerId: "axe" },
  { prompt: "A means of transportation", answerId: "helicopter" },
  { prompt: "Something with a sharp edge", answerId: "axe" },
  { prompt: "Something with a sting", answerId: "scorpion" },
  { prompt: "Something with a diet of nuts and seeds", answerId: "squirrel" }
];

const spellingWords = [
  "ENVELOPE",
  "SKATEBOARD",
  "CONSTRUCTING",
  "PARTNER",
  "BISCUIT",
  "LAWNMOWER",
  "DELIVER",
  "RECORDED",
  "COATHANGER",
  "ORCHESTRA",
  "SCREWDRIVER",
  "BROUGHT"
];
const spellingWordLabels = [
  "Envelope",
  "Skateboard",
  "Constructing",
  "Partner",
  "Biscuit",
  "Lawnmower",
  "Deliver",
  "Recorded",
  "Coathanger",
  "Orchestra",
  "Screwdriver",
  "Brought"
];

const digitTrials = [
  "2 6",
  "5 8",
  "9 3 5",
  "4 1 6",
  "7 2 8 4",
  "9 5 7 3",
  "6 9 4 2 1",
  "8 3 2 5 6",
  "8 1 3 5 7 9",
  "3 6 2 7 3 4",
  "1 6 9 3 5 8 6",
  "2 3 6 8 4 9 2"
];

const FLUENCY_T_LETTER = "T";
const FLUENCY_T_LENGTH = 4;

const dotTrials = [
  { id: 1, src: "form_a/dot_counting/1.png", answer: "10" },
  { id: 2, src: "form_a/dot_counting/2.png", answer: "8" },
  { id: 3, src: "form_a/dot_counting/3.png", answer: "7" },
  { id: 4, src: "form_a/dot_counting/4.png", answer: "9" }
];

const cubeTrials = [
  { id: 1, src: "form_a/cube_counting/1.png", answer: "5" },
  { id: 2, src: "form_a/cube_counting/2.png", answer: "6" },
  { id: 3, src: "form_a/cube_counting/3.png", answer: "10" },
  { id: 4, src: "form_a/cube_counting/4.png", answer: "7" }
];

const numberLocTrials = [
  { id: 1, src: "form_a/number_location/1.png", answer: "6" },
  { id: 2, src: "form_a/number_location/2.png", answer: "5" },
  { id: 3, src: "form_a/number_location/3.png", answer: "2" },
  { id: 4, src: "form_a/number_location/4.png", answer: "3" }
];

const sentencePrompts = [
  "The mailman knocked on the",
  "He brought his umbrella with him in case of",
  "Sally spread her toast with butter and",
  "John went to the barbers to get his hair",
  "She dived into the swimming",
  "They all went to the local café for something to"
];

const socialTrials = Array.from({ length: 6 }, (_, idx) => {
  const card = idx + 1;
  return {
    card,
    images: [1, 2, 3, 4].map(num => `form_a/social_cognition/${card}/${num}.png`)
  };
});
const socialBAnswerKey = [2, 4, 1, 3, 4, 1];
const socialBTrials = Array.from({ length: 6 }, (_, idx) => {
  const card = idx + 1;
  return {
    card,
    images: [1, 2, 3, 4].map(num => `form_a/social_cognition/${card}/${num}.png`),
    face: `form_a/social_cognition/faces/${card}.png`,
    correctIndex: Math.max(0, Math.min(3, (socialBAnswerKey[idx] || 1) - 1))
  };
});

const PROMPT_DEFAULTS = {
  story: `You are an EDINBURGH COGNITIVE AND BEHAVIORAL ALS SCREEN proctor agent.

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

Return ONLY the JSON with yes/no values for each field.`,
  fluency: `You are scoring a verbal fluency task for the letter "S".
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
  If no words are removed, return an empty object.`,
  fluencyT: `You are scoring a verbal fluency task for the letter "T".
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
  If no words are removed, return an empty object.`,
  sentence: `You are scoring the ECAS Executive - Sentence Completion task.

For each item you receive the participant's first response (no self-corrections). Score using:
- 2 points: completely unconnected / nonsensical to the sentence.
- 1 point: related/associated or opposite meaning.
- 0 points: exact or contextually appropriate word.

Rules:
- Take the first answer only.
- If repeated from prior trials, still score but note the repetition.
- Sentences can be ungrammatical; focus on semantic relatedness.

Return JSON with:
- items: array of {prompt (optional), response, score (0-2), rationale (short explanation of why the score was assigned)}
- total: sum of scores`
};

const PROMPT_DEFAULTS_VERSION = "2025-02-13";

const PROMPT_STORAGE_KEYS = {
  story: "ecas.prompt.story",
  fluency: "ecas.prompt.fluency",
  fluencyT: "ecas.prompt.fluencyT",
  sentence: "ecas.prompt.sentence"
};

const PROMPT_VERSION_KEY = "ecas.prompt.defaultsVersion";

const SUPABASE_URL = window.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
const supabaseClient =
  window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
const SESSION_ID_KEY = "ecas.session.id";
const SESSION_META_KEY = "ecas.session.meta";

const sentenceState = {
  index: 0,
  status: "pending",
  responses: Array(sentencePrompts.length).fill("")
};

const alternationTrials = [
  { number: 4, letter: "D" },
  { number: 5, letter: "E" },
  { number: 6, letter: "F" },
  { number: 7, letter: "G" },
  { number: 8, letter: "H" },
  { number: 9, letter: "I" },
  { number: 10, letter: "J" },
  { number: 11, letter: "K" },
  { number: 12, letter: "L" },
  { number: 13, letter: "M" },
  { number: 14, letter: "N" },
  { number: 15, letter: "O" }
];

const dom = {
  title: document.getElementById("item-title"),
  status: document.getElementById("status-badge"),
  progressCount: document.getElementById("progress-count"),
  progressFill: document.getElementById("progress-fill"),
  image: document.getElementById("prompt-image"),
  liveWords: document.getElementById("live-words"),
  expectedLabel: document.getElementById("expected-label"),
  expectedVariants: document.getElementById("expected-variants"),
  matchStatus: document.getElementById("match-status"),
  logBody: document.getElementById("log-body"),
  speechWarning: document.getElementById("speech-warning"),
  startBtn: document.getElementById("start-btn"),
  stopBtn: document.getElementById("stop-btn"),
  nextBtn: document.getElementById("next-btn"),
  resetBtn: document.getElementById("reset-btn"),
  manualInput: document.getElementById("manual-input"),
  manualBtn: document.getElementById("manual-btn"),
  compPrompt: document.getElementById("comp-prompt"),
  compStatus: document.getElementById("comp-status"),
  compProgressCount: document.getElementById("comp-progress-count"),
  compProgressFill: document.getElementById("comp-progress-fill"),
  compImageGrid: document.getElementById("comp-image-grid"),
  compStartBtn: document.getElementById("comp-start-btn"),
  compStopBtn: document.getElementById("comp-stop-btn"),
  compLiveWords: document.getElementById("comp-live-words"),
  compSubmitBtn: document.getElementById("comp-submit-btn"),
  compNextBtn: document.getElementById("comp-next-btn"),
  compResetBtn: document.getElementById("comp-reset-btn"),
  compLogBody: document.getElementById("comp-log-body"),
  compSectionScore: document.getElementById("comp-section-score"),
  spellStatus: document.getElementById("spell-status"),
  spellProgressCount: document.getElementById("spell-progress-count"),
  spellProgressFill: document.getElementById("spell-progress-fill"),
  spellWord: document.getElementById("spell-word"),
  spellStartBtn: document.getElementById("spell-start-btn"),
  spellStopBtn: document.getElementById("spell-stop-btn"),
  spellSubmitBtn: document.getElementById("spell-submit-btn"),
  spellNextBtn: document.getElementById("spell-next-btn"),
  spellResetBtn: document.getElementById("spell-reset-btn"),
  spellManualInput: document.getElementById("spell-manual-input"),
  spellManualClear: document.getElementById("spell-manual-clear"),
  spellLiveWords: document.getElementById("spell-live-words"),
  spellMatchStatus: document.getElementById("spell-match-status"),
  spellCandidate: document.getElementById("spell-candidate"),
  spellLogBody: document.getElementById("spell-log-body"),
  spellSectionScore: document.getElementById("spell-section-score"),
  storyStatus: document.getElementById("story-status"),
  storyStartBtn: document.getElementById("story-start-btn"),
  storyStopBtn: document.getElementById("story-stop-btn"),
  storyResetBtn: document.getElementById("story-reset-btn"),
  storyLiveWords: document.getElementById("story-live-words"),
  storyLogBody: document.getElementById("story-log-body"),
  storyScoreBtn: document.getElementById("story-score-btn"),
  storyScoreDeterministicBtn: document.getElementById("story-score-deterministic-btn"),
  storySectionScore: document.getElementById("story-section-score"),
  delayedStoryStatus: document.getElementById("delayed-story-status"),
  delayedStoryStartBtn: document.getElementById("delayed-story-start-btn"),
  delayedStoryStopBtn: document.getElementById("delayed-story-stop-btn"),
  delayedStoryResetBtn: document.getElementById("delayed-story-reset-btn"),
  delayedStoryLiveWords: document.getElementById("delayed-story-live-words"),
  delayedStoryLogBody: document.getElementById("delayed-story-log-body"),
  delayedStoryScoreBtn: document.getElementById("delayed-story-score-btn"),
  delayedStoryScoreDeterministicBtn: document.getElementById("delayed-story-score-deterministic-btn"),
  delayedStorySectionScore: document.getElementById("delayed-story-section-score"),
  delayedStoryRetained: document.getElementById("delayed-story-retained"),
  delayedStoryRaw: document.getElementById("delayed-story-raw"),
  delayedStoryImmediate: document.getElementById("delayed-story-immediate"),
  delayedRecognitionStatus: document.getElementById("delayed-recognition-status"),
  delayedRecognitionAdmin: document.getElementById("delayed-recognition-admin"),
  delayedRecognitionBody: document.getElementById("delayed-recognition-body"),
  delayedRecognitionScore: document.getElementById("delayed-recognition-score"),
  delayedRecognitionCard: document.getElementById("delayed-recognition-card"),
  digitsStatus: document.getElementById("digits-status"),
  digitsProgressCount: document.getElementById("digits-progress-count"),
  digitsProgressFill: document.getElementById("digits-progress-fill"),
  digitsTrialSeq: document.getElementById("digits-trial-seq"),
  digitsStartBtn: document.getElementById("digits-start-btn"),
  digitsStopBtn: document.getElementById("digits-stop-btn"),
  digitsPrevBtn: document.getElementById("digits-prev-btn"),
  digitsNextBtn: document.getElementById("digits-next-btn"),
  digitsResetBtn: document.getElementById("digits-reset-btn"),
  digitsManualInput: document.getElementById("digits-manual-input"),
  digitsManualClear: document.getElementById("digits-manual-clear"),
  digitsLiveWords: document.getElementById("digits-live-words"),
  digitsMatchStatus: document.getElementById("digits-match-status"),
  digitsCandidate: document.getElementById("digits-candidate"),
  digitsLogBody: document.getElementById("digits-log-body"),
  digitsSectionScore: document.getElementById("digits-section-score"),
  altStatus: document.getElementById("alt-status"),
  altProgressCount: document.getElementById("alt-progress-count"),
  altProgressFill: document.getElementById("alt-progress-fill"),
  altTarget: document.getElementById("alt-target"),
  altStartBtn: document.getElementById("alt-start-btn"),
  altStopBtn: document.getElementById("alt-stop-btn"),
  altSubmitBtn: document.getElementById("alt-submit-btn"),
  altNextBtn: document.getElementById("alt-next-btn"),
  altResetBtn: document.getElementById("alt-reset-btn"),
  altLiveWords: document.getElementById("alt-live-words"),
  altMatchStatus: document.getElementById("alt-match-status"),
  altCandidate: document.getElementById("alt-candidate"),
  altLogBody: document.getElementById("alt-log-body"),
  altSectionScore: document.getElementById("alt-section-score"),
  fluencyManualInput: document.getElementById("fluency-manual-input"),
  fluencyManualAdd: document.getElementById("fluency-manual-add"),
  fluencyTManualInput: document.getElementById("fluency-t-manual-input"),
  fluencyTManualAdd: document.getElementById("fluency-t-manual-add"),
  fluencyTStatus: document.getElementById("fluency-t-status"),
  fluencyTCountdown: document.getElementById("fluency-t-countdown"),
  fluencyTStartBtn: document.getElementById("fluency-t-start-btn"),
  fluencyTStopBtn: document.getElementById("fluency-t-stop-btn"),
  fluencyTResetBtn: document.getElementById("fluency-t-reset-btn"),
  fluencyTLiveWords: document.getElementById("fluency-t-live-words"),
  fluencyTScore: document.getElementById("fluency-t-score"),
  fluencyTLogBody: document.getElementById("fluency-t-log-body"),
  fluencyTScoreLLMBtn: document.getElementById("fluency-t-score-llm-btn"),
  fluencyTAIResetBtn: document.getElementById("fluency-t-ai-reset-btn"),
  fluencyTProcessedNotes: document.getElementById("fluency-t-processed-notes"),
  fluencyTRawTotal: document.getElementById("fluency-t-raw-total"),
  fluencyTProcessedTotal: document.getElementById("fluency-t-processed-total"),
  fluencySectionScore: document.getElementById("fluency-section-score"),
  fluencyTSectionScore: document.getElementById("fluency-t-section-score"),
  fluencyScoreLLMBtn: document.getElementById("fluency-score-llm-btn"),
  fluencyAIResetBtn: document.getElementById("fluency-ai-reset-btn"),
  fluencyScorerUrl: window.FLUENCY_SCORER_URL || "",
  fluencyTScorerUrl: window.FLUENCY_T_SCORER_URL || "",
  fluencyProcessedNotes: document.getElementById("fluency-processed-notes"),
  fluencyRawTotal: document.getElementById("fluency-raw-total"),
  fluencyProcessedTotal: document.getElementById("fluency-processed-total"),
  sessionParticipantId: document.getElementById("session-participant-id"),
  sessionProctorName: document.getElementById("session-proctor-name"),
  sessionDate: document.getElementById("session-date"),
  sessionIdDisplay: document.getElementById("session-id-display"),
  sessionLoadId: document.getElementById("session-load-id"),
  sessionLoadBtn: document.getElementById("session-load-btn"),
  sessionSaveBtn: document.getElementById("session-save-btn"),
  sessionNewBtn: document.getElementById("session-new-btn"),
  sessionResetBtn: document.getElementById("session-reset-btn"),
  sessionSaveStatus: document.getElementById("session-save-status"),
  dotsStatus: document.getElementById("dots-status"),
  dotsProgressCount: document.getElementById("dots-progress-count"),
  dotsProgressFill: document.getElementById("dots-progress-fill"),
  dotsImage: document.getElementById("dots-image"),
  dotsStartBtn: document.getElementById("dots-start-btn"),
  dotsStopBtn: document.getElementById("dots-stop-btn"),
  dotsNextBtn: document.getElementById("dots-next-btn"),
  dotsResetBtn: document.getElementById("dots-reset-btn"),
  dotsLiveWords: document.getElementById("dots-live-words"),
  dotsMatchStatus: document.getElementById("dots-match-status"),
  dotsCandidate: document.getElementById("dots-candidate"),
  dotsLogBody: document.getElementById("dots-log-body"),
  dotsSectionScore: document.getElementById("dots-section-score"),
  cubesStatus: document.getElementById("cubes-status"),
  cubesProgressCount: document.getElementById("cubes-progress-count"),
  cubesProgressFill: document.getElementById("cubes-progress-fill"),
  cubesImage: document.getElementById("cubes-image"),
  cubesStartBtn: document.getElementById("cubes-start-btn"),
  cubesStopBtn: document.getElementById("cubes-stop-btn"),
  cubesNextBtn: document.getElementById("cubes-next-btn"),
  cubesResetBtn: document.getElementById("cubes-reset-btn"),
  cubesLiveWords: document.getElementById("cubes-live-words"),
  cubesMatchStatus: document.getElementById("cubes-match-status"),
  cubesCandidate: document.getElementById("cubes-candidate"),
  cubesLogBody: document.getElementById("cubes-log-body"),
  cubesSectionScore: document.getElementById("cubes-section-score"),
  sectionScore: document.getElementById("section-score"),
  numberlocStatus: document.getElementById("numberloc-status"),
  numberlocProgressCount: document.getElementById("numberloc-progress-count"),
  numberlocProgressFill: document.getElementById("numberloc-progress-fill"),
  numberlocImage: document.getElementById("numberloc-image"),
  numberlocStartBtn: document.getElementById("numberloc-start-btn"),
  numberlocStopBtn: document.getElementById("numberloc-stop-btn"),
  numberlocNextBtn: document.getElementById("numberloc-next-btn"),
  numberlocResetBtn: document.getElementById("numberloc-reset-btn"),
  numberlocLiveWords: document.getElementById("numberloc-live-words"),
  numberlocMatchStatus: document.getElementById("numberloc-match-status"),
  numberlocCandidate: document.getElementById("numberloc-candidate"),
  numberlocLogBody: document.getElementById("numberloc-log-body"),
  numberlocSectionScore: document.getElementById("numberloc-section-score"),
  sentenceInputs: Array.from(document.querySelectorAll(".sentence-input")),
  sentenceScoreCells: Array.from(document.querySelectorAll(".sentence-score")),
  sentenceNoteCells: Array.from(document.querySelectorAll(".sentence-notes")),
  sentenceRows: Array.from(document.querySelectorAll(".sentence-row")),
  sentenceScoreLLMBtn: document.getElementById("sentence-score-llm-btn"),
  sentenceSectionScore: document.getElementById("sentence-section-score"),
  sentenceStartBtn: document.getElementById("sentence-start-btn"),
  sentenceStopBtn: document.getElementById("sentence-stop-btn"),
  sentenceNextBtn: document.getElementById("sentence-next-btn"),
  sentenceActiveLabel: document.getElementById("sentence-active-label"),
  sentenceLiveWords: document.getElementById("sentence-live-words"),
  socialStatus: document.getElementById("social-status"),
  socialProgressCount: document.getElementById("social-progress-count"),
  socialProgressFill: document.getElementById("social-progress-fill"),
  socialGrid: document.getElementById("social-grid"),
  socialPrevBtn: document.getElementById("social-prev-btn"),
  socialNextBtn: document.getElementById("social-next-btn"),
  socialResetBtn: document.getElementById("social-reset-btn"),
  socialLogBody: document.getElementById("social-log-body"),
  socialBStatus: document.getElementById("social-b-status"),
  socialBProgressCount: document.getElementById("social-b-progress-count"),
  socialBProgressFill: document.getElementById("social-b-progress-fill"),
  socialBGrid: document.getElementById("social-b-grid"),
  socialBFace: document.getElementById("social-b-face"),
  socialBPrevBtn: document.getElementById("social-b-prev-btn"),
  socialBNextBtn: document.getElementById("social-b-next-btn"),
  socialBResetBtn: document.getElementById("social-b-reset-btn"),
  socialBLogBody: document.getElementById("social-b-log-body"),
  socialBSectionScore: document.getElementById("social-b-section-score"),
  scoreLangNaming: document.getElementById("score-lang-naming"),
  scoreLangComp: document.getElementById("score-lang-comp"),
  scoreLangSpell: document.getElementById("score-lang-spell"),
  scoreFluencyS: document.getElementById("score-fluency-s"),
  scoreFluencyT: document.getElementById("score-fluency-t"),
  scoreExecDigits: document.getElementById("score-exec-digits"),
  scoreExecAlt: document.getElementById("score-exec-alt"),
  scoreExecSentence: document.getElementById("score-exec-sentence"),
  scoreSocial: document.getElementById("score-social"),
  scoreAlsSpecific: document.getElementById("score-als-specific"),
  scoreMemoryImmediate: document.getElementById("score-memory-immediate"),
  scoreMemoryDelayed: document.getElementById("score-memory-delayed"),
  scoreMemoryRecog: document.getElementById("score-memory-recog"),
  scoreVisuoDots: document.getElementById("score-visuo-dots"),
  scoreVisuoCubes: document.getElementById("score-visuo-cubes"),
  scoreVisuoNumberloc: document.getElementById("score-visuo-numberloc"),
  scoreAlsNonspecific: document.getElementById("score-als-nonspecific"),
  scoreEcasTotal: document.getElementById("score-ecas-total"),
  participantViewBtn: document.getElementById("participant-view-btn")
};

const participantChannelName = "ecas-participant-sync";
const participantChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(participantChannelName) : null;

const itemStates = items.map(() => ({
  entries: [],
  tokens: [],
  matched: false,
  status: "pending",
  notes: ""
}));

const compStates = comprehensionPrompts.map(() => ({
  selectedId: null,
  status: "pending",
  correct: false,
  timestamp: null,
  tokens: [],
  entries: [],
  notes: ""
}));

const spellingStates = spellingWords.map(() => ({
  entries: [],
  tokens: [],
  typedAnswer: "",
  status: "pending",
  correct: false,
  timestamp: null,
  spelledCandidate: ""
}));

let recognition;
let speechSupported = false;
let activeIndex = 0;
let isStopping = false;
let compIndex = 0;
let spellIndex = 0;
let digitsIndex = 0;
let altIndex = 0;
let dotsIndex = 0;
let cubesIndex = 0;
let numberlocIndex = 0;
let socialIndex = 0;
let socialBIndex = 0;
let fluencyDragState = null; // { scope: "fluency" | "fluencyT", listType: "raw" | "scored", index: number }
let captureContext = null; // { type: "naming" | "comprehension" | "spelling" | "story" | "storyDelayed" | "fluency" | "fluencyT" | "digits" | "alternation" | "dots" | "cubes" | "numberloc" | "sentence" }
let namingSessionEnded = false;
let comprehensionSessionEnded = false;
let digitsSessionEnded = false;
let dotsSessionEnded = false;
let cubesSessionEnded = false;
let numberlocSessionEnded = false;
const sessionTimers = new Map();
let sessionSaveTimer = null;
let sessionSaveInFlight = false;
const storyState = {
  status: "pending",
  tokens: [],
  entries: [],
  timestamp: null,
  manualTranscript: "",
  manualEdited: false,
  editingLive: false
};
const delayedStoryState = {
  status: "pending",
  tokens: [],
  entries: [],
  timestamp: null,
  manualTranscript: "",
  manualEdited: false,
  editingLive: false
};
const delayedRecognitionQuestions = [
  {
    text: "Was the story about an event that occurred last Saturday?",
    correct: false
  },
  {
    text: "Was the event the park cleanup?",
    correct: true
  },
  {
    text: "Did this take place in Marigold Woods?",
    correct: true
  },
  {
    text: "Did they remove old soda cans and candy wrappers?",
    correct: false
  },
  {
    text: "Was the man in the story called Mr. Webber?",
    correct: true
  },
  {
    text: "Was his first name ‘Thomas’?",
    correct: false
  },
  {
    text: "Was he from the local government?",
    correct: false
  },
  {
    text: "Was he especially proud of the children for coming along?",
    correct: true
  }
];
const STORY_CRITERIA = [
  { key: "sunday", checkboxId: "story-sunday" },
  { key: "annual_cleanup", checkboxId: "story-annual_cleanup" },
  { key: "marigold_woods", checkboxId: "story-marigold_woods" },
  { key: "forty_two", checkboxId: "story-forty_two" },
  { key: "bicycles_and_carts", checkboxId: "story-bicycles_and_carts" },
  { key: "robert_webber", checkboxId: "story-robert_webber" },
  { key: "woodland_project", checkboxId: "story-woodland_project" },
  { key: "positive_emotion", checkboxId: "story-positive_emotion" },
  { key: "seventeen", checkboxId: "story-seventeen" },
  { key: "children", checkboxId: "story-children" }
];
const DELAYED_STORY_CRITERIA = [
  { key: "sunday", checkboxId: "delayed-story-sunday" },
  { key: "annual_cleanup", checkboxId: "delayed-story-annual_cleanup" },
  { key: "marigold_woods", checkboxId: "delayed-story-marigold_woods" },
  { key: "forty_two", checkboxId: "delayed-story-forty_two" },
  { key: "bicycles_and_carts", checkboxId: "delayed-story-bicycles_and_carts" },
  { key: "robert_webber", checkboxId: "delayed-story-robert_webber" },
  { key: "woodland_project", checkboxId: "delayed-story-woodland_project" },
  { key: "positive_emotion", checkboxId: "delayed-story-positive_emotion" },
  { key: "seventeen", checkboxId: "delayed-story-seventeen" },
  { key: "children", checkboxId: "delayed-story-children" }
];
const storyScoreInputs = STORY_CRITERIA.reduce((acc, criterion) => {
  acc[criterion.key] = document.getElementById(criterion.checkboxId);
  return acc;
}, {});
const delayedStoryScoreInputs = DELAYED_STORY_CRITERIA.reduce((acc, criterion) => {
  acc[criterion.key] = document.getElementById(criterion.checkboxId);
  return acc;
}, {});
const STORY_SCORER_URL = window.STORY_SCORER_URL || "";
Object.values(storyScoreInputs).forEach(input => {
  if (input) {
    input.addEventListener("change", updateStoryScoreFromChecks);
  }
});
Object.values(delayedStoryScoreInputs).forEach(input => {
  if (input) {
    input.addEventListener("change", updateDelayedStoryScoreFromChecks);
  }
});
const fluencyState = {
  status: "pending",
  tokens: [],
  entries: [],
  countdownMs: 60000,
  timer: { remainingMs: 60000, endTime: null, rafId: null, startTime: null },
  readTimer: { running: false, startTime: null, elapsedMs: 0, baseMs: 0, intervalId: null },
  uniqueWords: new Set(),
  processedWords: [],
  processedNotes: [],
  aiReview: [],
  aiKeepMask: []
};
const digitStates = digitTrials.map(() => ({
  entries: [],
  digits: [],
  typedAnswer: "",
  status: "pending",
  correct: false,
  timestamp: null,
  candidate: "",
  autoAdvanceTimer: null
}));
const alternationStates = alternationTrials.map(() => ({
  entries: [],
  numbers: [],
  letters: [],
  typedAnswer: "",
  status: "pending",
  correct: false,
  timestamp: null,
  candidate: ""
}));
let alternationHalted = false;
const fluencyTState = {
  status: "pending",
  tokens: [],
  entries: [],
  countdownMs: 60000,
  timer: { remainingMs: 60000, endTime: null, rafId: null, startTime: null },
  readTimer: { running: false, startTime: null, elapsedMs: 0, baseMs: 0, intervalId: null },
  uniqueWords: new Set(),
  processedWords: [],
  processedNotes: [],
  aiReview: [],
  aiKeepMask: []
};
const dotsStates = dotTrials.map(() => ({
  entries: [],
  digits: [],
  status: "pending",
  correct: false,
  timestamp: null,
  candidate: ""
}));
const cubesStates = cubeTrials.map(() => ({
  entries: [],
  digits: [],
  status: "pending",
  correct: false,
  timestamp: null,
  candidate: ""
}));
const numberlocStates = numberLocTrials.map(() => ({
  entries: [],
  digits: [],
  status: "pending",
  correct: false,
  timestamp: null,
  candidate: ""
}));
const socialStates = socialTrials.map(() => ({
  status: "pending",
  selectedIndex: null,
  timestamp: null
}));
const socialBStates = socialBTrials.map(() => ({
  status: "pending",
  selectedIndex: null,
  timestamp: null,
  correct: null,
  score: null,
  egocentric: null,
  manualResult: false,
  manualScore: false
}));
const delayedRecognitionStates = delayedRecognitionQuestions.map(() => ({
  answer: null,
  correct: null
}));

init();

function init() {
  bindControls();
  setupTabs();
  setupPromptEditor();
  setupSessionMetadata();
  // No per-section save buttons.
  loadItem(0);
  setupSpeechRecognition();
  setupComprehension();
  setupSpelling();
  setupFluency();
  setupDigits();
  setupAlternation();
  setupFluencyT();
  setupDots();
  setupCubes();
  setupNumberLoc();
  setupSocial();
  setupSocialB();
  setupDelayedRecognition();
  setupSentenceScoreEditing();
  setupSessionTimers();
  updateUI();
}

function bindControls() {
  dom.startBtn.addEventListener("click", startListening);
  const aiDemoToggle = document.getElementById("ai-demo-toggle");
  if (aiDemoToggle) {
    aiDemoToggle.addEventListener("change", event => {
      setAIDemoMode(event.target.checked);
    });
    setAIDemoMode(aiDemoToggle.checked);
  }
  if (dom.stopBtn) {
    dom.stopBtn.addEventListener("click", stopListening);
  }
  dom.nextBtn.addEventListener("click", () => moveToIndex(activeIndex + 1, { force: true, keepListening: true }));
  dom.resetBtn.addEventListener("click", resetCurrentItem);
  if (dom.manualBtn) {
    dom.manualBtn.addEventListener("click", addManualEntry);
  }
  if (dom.manualInput) {
    dom.manualInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        addManualEntry();
      }
    });
  }
  if (dom.fluencyManualAdd) {
    dom.fluencyManualAdd.addEventListener("click", addFluencyManualEntry);
  }
  if (dom.fluencyManualInput) {
    dom.fluencyManualInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        addFluencyManualEntry();
      }
    });
  }
  if (dom.fluencyTManualAdd) {
    dom.fluencyTManualAdd.addEventListener("click", addFluencyTManualEntry);
  }
  if (dom.fluencyTManualInput) {
    dom.fluencyTManualInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        addFluencyTManualEntry();
      }
    });
  }

  if (dom.compSubmitBtn) {
    dom.compSubmitBtn.addEventListener("click", submitComprehension);
  }
  if (dom.compNextBtn) {
    dom.compNextBtn.addEventListener("click", () => moveComprehension(compIndex + 1, { force: true, keepListening: true }));
  }
  if (dom.compResetBtn) {
    dom.compResetBtn.addEventListener("click", resetComprehension);
  }
  if (dom.compStartBtn) {
    dom.compStartBtn.addEventListener("click", startComprehensionListening);
  }
  if (dom.compStopBtn) {
    dom.compStopBtn.addEventListener("click", stopComprehensionListening);
  }
  if (dom.spellStartBtn) {
    dom.spellStartBtn.addEventListener("click", startSpellingListening);
  }
  if (dom.spellStopBtn) {
    dom.spellStopBtn.addEventListener("click", stopSpellingListening);
  }
  if (dom.spellSubmitBtn) {
    dom.spellSubmitBtn.addEventListener("click", submitSpelling);
  }
  if (dom.spellNextBtn) {
    dom.spellNextBtn.addEventListener("click", () => moveSpelling(spellIndex + 1));
  }
  if (dom.spellResetBtn) {
    dom.spellResetBtn.addEventListener("click", resetSpelling);
  }
  if (dom.spellManualInput) {
    dom.spellManualInput.addEventListener("input", event => {
      const state = spellingStates[spellIndex];
      state.typedAnswer = event.target.value || "";
      if (state.status === "completed") {
        state.status = "pending";
      }
      evaluateSpelling(state, spellingWords[spellIndex]);
      updateSpellingUI();
    });
  }
  if (dom.spellManualClear) {
    dom.spellManualClear.addEventListener("click", () => {
      dom.spellManualInput.value = "";
      const state = spellingStates[spellIndex];
      state.typedAnswer = "";
      evaluateSpelling(state, spellingWords[spellIndex]);
      updateSpellingUI();
    });
  }
  if (dom.storyStartBtn) {
    dom.storyStartBtn.addEventListener("click", startStoryListening);
  }
  if (dom.storyStopBtn) {
    dom.storyStopBtn.addEventListener("click", stopStoryListening);
  }
  if (dom.storyResetBtn) {
    dom.storyResetBtn.addEventListener("click", resetStory);
  }
  if (dom.storyLiveWords) {
    dom.storyLiveWords.addEventListener("dblclick", () => {
      if (!storyState.editingLive) {
        storyState.manualTranscript = getStoryTranscript();
        storyState.manualEdited = true;
        storyState.editingLive = true;
        renderStoryUI();
      }
    });
  }
  if (dom.storyScoreBtn) {
    dom.storyScoreBtn.addEventListener("click", scoreStoryWithLLM);
  }
  if (dom.storyScoreDeterministicBtn) {
    dom.storyScoreDeterministicBtn.addEventListener("click", () => {
      ensureStoryCaptureStopped();
      if (!storyState.entries.length) {
        alert("Capture the participant's story recall before scoring.");
        return;
      }
      const transcript = getStoryTranscript();
      const result = keywordScoreStory(transcript);
      applyStoryScore(result);
    });
  }
  if (dom.participantViewBtn) {
    dom.participantViewBtn.addEventListener("click", () => {
      const url = new URL("participant.html", window.location.href);
      const win = window.open(url.toString(), "_blank");
      if (!win) {
        alert("Popup blocked. Please allow pop-ups for Participant View.");
        return;
      }
      syncParticipantView();
      window.setTimeout(syncParticipantView, 250);
    });
  }
  if (dom.delayedStoryStartBtn) {
    dom.delayedStoryStartBtn.addEventListener("click", startDelayedStoryListening);
  }
  if (dom.delayedStoryStopBtn) {
    dom.delayedStoryStopBtn.addEventListener("click", stopDelayedStoryListening);
  }
  if (dom.delayedStoryResetBtn) {
    dom.delayedStoryResetBtn.addEventListener("click", resetDelayedStory);
  }
  if (dom.delayedStoryLiveWords) {
    dom.delayedStoryLiveWords.addEventListener("dblclick", () => {
      if (!delayedStoryState.editingLive) {
        delayedStoryState.manualTranscript = getDelayedStoryTranscript();
        delayedStoryState.manualEdited = true;
        delayedStoryState.editingLive = true;
        renderDelayedStoryUI();
      }
    });
  }
  if (dom.delayedStoryScoreBtn) {
    dom.delayedStoryScoreBtn.addEventListener("click", scoreDelayedStoryWithLLM);
  }
  if (dom.delayedStoryScoreDeterministicBtn) {
    dom.delayedStoryScoreDeterministicBtn.addEventListener("click", () => {
      ensureDelayedStoryCaptureStopped();
      if (!delayedStoryState.entries.length) {
        alert("Capture the participant's delayed story recall before scoring.");
        return;
      }
      const transcript = getDelayedStoryTranscript();
      const result = keywordScoreStory(transcript);
      applyDelayedStoryScore(result);
    });
  }
  if (document.getElementById("fluency-start-btn")) {
    document.getElementById("fluency-start-btn").addEventListener("click", startFluencyListening);
  }
  if (document.getElementById("fluency-stop-btn")) {
    document.getElementById("fluency-stop-btn").addEventListener("click", stopFluencyListening);
  }
  if (document.getElementById("fluency-reset-btn")) {
    document.getElementById("fluency-reset-btn").addEventListener("click", resetFluency);
  }
  if (dom.fluencyScoreLLMBtn) {
    dom.fluencyScoreLLMBtn.addEventListener("click", scoreFluencyWithLLM);
  }
  const fluencyOpenRawBtn = document.getElementById("fluency-open-raw-btn");
  if (fluencyOpenRawBtn) {
    fluencyOpenRawBtn.addEventListener("click", () => openRawListWindow(fluencyState, "Verbal Fluency - S"));
  }
  const fluencyReadStart = document.getElementById("fluency-read-start");
  if (fluencyReadStart) {
    fluencyReadStart.addEventListener("click", () => startReadTimer(fluencyState, updateFluencyUI));
  }
  const fluencyReadStop = document.getElementById("fluency-read-stop");
  if (fluencyReadStop) {
    fluencyReadStop.addEventListener("click", () => stopReadTimer(fluencyState, updateFluencyUI));
  }
  const fluencyReadReset = document.getElementById("fluency-read-reset");
  if (fluencyReadReset) {
    fluencyReadReset.addEventListener("click", () => resetReadTimer(fluencyState, updateFluencyUI));
  }
  if (dom.fluencyAIResetBtn) {
    dom.fluencyAIResetBtn.addEventListener("click", () => {
      resetFluencyAISuggestions(fluencyState);
      updateFluencyUI();
    });
  }
  if (dom.fluencyTScoreLLMBtn) {
    dom.fluencyTScoreLLMBtn.addEventListener("click", scoreFluencyTWithLLM);
  }
  const fluencyTOpenRawBtn = document.getElementById("fluency-t-open-raw-btn");
  if (fluencyTOpenRawBtn) {
    fluencyTOpenRawBtn.addEventListener("click", () => openRawListWindow(fluencyTState, "Verbal Fluency - T"));
  }
  const fluencyTReadStart = document.getElementById("fluency-t-read-start");
  if (fluencyTReadStart) {
    fluencyTReadStart.addEventListener("click", () => startReadTimer(fluencyTState, updateFluencyTUI));
  }
  const fluencyTReadStop = document.getElementById("fluency-t-read-stop");
  if (fluencyTReadStop) {
    fluencyTReadStop.addEventListener("click", () => stopReadTimer(fluencyTState, updateFluencyTUI));
  }
  const fluencyTReadReset = document.getElementById("fluency-t-read-reset");
  if (fluencyTReadReset) {
    fluencyTReadReset.addEventListener("click", () => resetReadTimer(fluencyTState, updateFluencyTUI));
  }
  if (dom.fluencyTAIResetBtn) {
    dom.fluencyTAIResetBtn.addEventListener("click", () => {
      resetFluencyAISuggestions(fluencyTState);
      updateFluencyTUI();
    });
  }
  if (dom.digitsStartBtn) {
    dom.digitsStartBtn.addEventListener("click", startDigitsListening);
  }
  if (dom.digitsStopBtn) {
    dom.digitsStopBtn.addEventListener("click", stopDigitsListening);
  }
  if (dom.digitsPrevBtn) {
    dom.digitsPrevBtn.addEventListener("click", () => moveDigits(digitsIndex - 1));
  }
  if (dom.digitsNextBtn) {
    dom.digitsNextBtn.addEventListener("click", () => moveDigits(digitsIndex + 1, { force: true, keepListening: true }));
  }
  if (dom.digitsResetBtn) {
    dom.digitsResetBtn.addEventListener("click", resetDigits);
  }
  if (dom.digitsManualInput) {
    dom.digitsManualInput.addEventListener("input", event => {
      const state = digitStates[digitsIndex];
      state.typedAnswer = event.target.value || "";
      if (state.status === "completed") {
        state.status = "pending";
      }
      evaluateDigits(state, digitTrials[digitsIndex]);
      updateDigitsUI();
    });
  }
  if (dom.digitsManualClear) {
    dom.digitsManualClear.addEventListener("click", () => {
      dom.digitsManualInput.value = "";
      const state = digitStates[digitsIndex];
      state.typedAnswer = "";
      evaluateDigits(state, digitTrials[digitsIndex]);
      updateDigitsUI();
    });
  }
  if (dom.altStartBtn) {
    dom.altStartBtn.addEventListener("click", startAlternationListening);
  }
  if (dom.altStopBtn) {
    dom.altStopBtn.addEventListener("click", stopAlternationListening);
  }
  if (dom.altSubmitBtn) {
    dom.altSubmitBtn.addEventListener("click", submitAlternation);
  }
  if (dom.altNextBtn) {
    dom.altNextBtn.addEventListener("click", () => moveAlternation(altIndex + 1));
  }
  if (dom.altResetBtn) {
    dom.altResetBtn.addEventListener("click", resetAlternation);
  }
  if (dom.fluencyTStartBtn) {
    dom.fluencyTStartBtn.addEventListener("click", startFluencyTListening);
  }
  if (dom.fluencyTStopBtn) {
    dom.fluencyTStopBtn.addEventListener("click", stopFluencyTListening);
  }
  if (dom.fluencyTResetBtn) {
    dom.fluencyTResetBtn.addEventListener("click", resetFluencyT);
  }
  if (dom.dotsStartBtn) {
    dom.dotsStartBtn.addEventListener("click", startDotsListening);
  }
  if (dom.dotsStopBtn) {
    dom.dotsStopBtn.addEventListener("click", stopDotsListening);
  }
  if (dom.dotsNextBtn) {
    dom.dotsNextBtn.addEventListener("click", () => moveDots(dotsIndex + 1, { force: true, keepListening: true }));
  }
  if (dom.dotsResetBtn) {
    dom.dotsResetBtn.addEventListener("click", resetDots);
  }
  if (dom.sentenceScoreLLMBtn) {
    dom.sentenceScoreLLMBtn.addEventListener("click", scoreSentencesWithLLM);
  }
  if (dom.sentenceStartBtn) {
    dom.sentenceStartBtn.addEventListener("click", startSentenceListening);
  }
  if (dom.sentenceStopBtn) {
    dom.sentenceStopBtn.addEventListener("click", stopSentenceListening);
  }
  if (dom.sentenceNextBtn) {
    dom.sentenceNextBtn.addEventListener("click", () => moveSentence(1));
  }
  if (dom.cubesStartBtn) {
    dom.cubesStartBtn.addEventListener("click", startCubesListening);
  }
  if (dom.cubesStopBtn) {
    dom.cubesStopBtn.addEventListener("click", stopCubesListening);
  }
  if (dom.cubesNextBtn) {
    dom.cubesNextBtn.addEventListener("click", () => moveCubes(cubesIndex + 1, { force: true, keepListening: true }));
  }
  if (dom.cubesResetBtn) {
    dom.cubesResetBtn.addEventListener("click", resetCubes);
  }
  if (dom.numberlocStartBtn) {
    dom.numberlocStartBtn.addEventListener("click", startNumberLocListening);
  }
  if (dom.numberlocStopBtn) {
    dom.numberlocStopBtn.addEventListener("click", stopNumberLocListening);
  }
  if (dom.numberlocNextBtn) {
    dom.numberlocNextBtn.addEventListener("click", () => moveNumberLoc(numberlocIndex + 1, { force: true, keepListening: true }));
  }
  if (dom.numberlocResetBtn) {
    dom.numberlocResetBtn.addEventListener("click", resetNumberLoc);
  }
  if (dom.socialNextBtn) {
    dom.socialNextBtn.addEventListener("click", () => moveSocial(socialIndex + 1));
  }
  if (dom.socialPrevBtn) {
    dom.socialPrevBtn.addEventListener("click", () => moveSocial(socialIndex - 1));
  }
  if (dom.socialResetBtn) {
    dom.socialResetBtn.addEventListener("click", resetSocial);
  }
  if (dom.socialBPrevBtn) {
    dom.socialBPrevBtn.addEventListener("click", () => moveSocialB(socialBIndex - 1));
  }
  if (dom.socialBNextBtn) {
    dom.socialBNextBtn.addEventListener("click", () => moveSocialB(socialBIndex + 1));
  }
  if (dom.socialBResetBtn) {
    dom.socialBResetBtn.addEventListener("click", resetSocialB);
  }
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  if (!tabs.length || !panels.length) {
    return;
  }
  const activePanel = panels.find(panel => panel.classList.contains("active")) || panels[0];
  if (activePanel) {
    panels.forEach(panel => {
      const isActive = panel === activePanel;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
    document.body.dataset.activeTab = activePanel.id || "";
  }
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab-target");
      panels.forEach(panel => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
      tabs.forEach(btn => {
        const isActive = btn === tab;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });
      document.body.dataset.activeTab = targetId || "";
    });
  });
}

function getPromptValue(kind) {
  const key = PROMPT_STORAGE_KEYS[kind];
  if (!key) {
    return "";
  }
  const stored = localStorage.getItem(key);
  if (stored !== null) {
    return stored;
  }
  return PROMPT_DEFAULTS[kind] || "";
}

function savePromptValue(kind, value) {
  const key = PROMPT_STORAGE_KEYS[kind];
  if (!key) {
    return;
  }
  localStorage.setItem(key, value);
}

function resetPromptValue(kind) {
  const key = PROMPT_STORAGE_KEYS[kind];
  if (!key) {
    return;
  }
  localStorage.removeItem(key);
}

function setPromptStatus(el, message) {
  if (!el) {
    return;
  }
  el.textContent = message;
  if (!message) {
    return;
  }
  window.setTimeout(() => {
    el.textContent = "";
  }, 1500);
}

async function copyPromptText(text, statusEl) {
  const value = text || "";
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      setPromptStatus(statusEl, "Copied");
      return;
    }
  } catch (err) {
    console.warn("Clipboard copy failed", err);
  }
  const temp = document.createElement("textarea");
  temp.value = value;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    setPromptStatus(statusEl, "Copied");
  } catch (err) {
    console.warn("Fallback copy failed", err);
    setPromptStatus(statusEl, "Copy failed");
  } finally {
    document.body.removeChild(temp);
  }
}

function setupPromptEditor() {
  ensurePromptDefaultsCurrent();
  const bindings = [
    {
      kind: "story",
      inputId: "prompt-story",
      saveId: "prompt-story-save",
      revertId: "prompt-story-revert",
      copyId: "prompt-story-copy",
      statusId: "prompt-story-status"
    },
    {
      kind: "fluency",
      inputId: "prompt-fluency",
      saveId: "prompt-fluency-save",
      revertId: "prompt-fluency-revert",
      copyId: "prompt-fluency-copy",
      statusId: "prompt-fluency-status"
    },
    {
      kind: "fluencyT",
      inputId: "prompt-fluency-t",
      saveId: "prompt-fluency-t-save",
      revertId: "prompt-fluency-t-revert",
      copyId: "prompt-fluency-t-copy",
      statusId: "prompt-fluency-t-status"
    },
    {
      kind: "sentence",
      inputId: "prompt-sentence",
      saveId: "prompt-sentence-save",
      revertId: "prompt-sentence-revert",
      copyId: "prompt-sentence-copy",
      statusId: "prompt-sentence-status"
    }
  ];

  bindings.forEach(binding => {
    const input = document.getElementById(binding.inputId);
    const saveBtn = document.getElementById(binding.saveId);
    const revertBtn = binding.revertId ? document.getElementById(binding.revertId) : null;
    const copyBtn = binding.copyId ? document.getElementById(binding.copyId) : null;
    const status = document.getElementById(binding.statusId);
    if (!input || !saveBtn) {
      return;
    }
    input.value = getPromptValue(binding.kind);
    saveBtn.addEventListener("click", () => {
      savePromptValue(binding.kind, input.value || "");
      setPromptStatus(status, "Saved");
    });
    if (revertBtn) {
      revertBtn.addEventListener("click", () => {
        resetPromptValue(binding.kind);
        input.value = getPromptValue(binding.kind);
        setPromptStatus(status, "Reverted");
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copyPromptText(input.value || "", status);
      });
    }
  });
}

function setupSessionMetadata() {
  if (!dom.sessionIdDisplay) {
    return;
  }
  const sessionId = getOrCreateSessionId();
  dom.sessionIdDisplay.textContent = sessionId;

  const meta = getStoredSessionMeta();
  if (dom.sessionParticipantId) {
    dom.sessionParticipantId.value = meta.participantId || "";
    dom.sessionParticipantId.addEventListener("input", () => {
      storeSessionMeta(getSessionMetaFromInputs());
      scheduleSessionSave();
    });
  }
  if (dom.sessionProctorName) {
    dom.sessionProctorName.value = meta.proctorName || "";
    dom.sessionProctorName.addEventListener("input", () => {
      storeSessionMeta(getSessionMetaFromInputs());
      scheduleSessionSave();
    });
  }
  if (dom.sessionDate) {
    dom.sessionDate.value = meta.sessionDate || new Date().toISOString().slice(0, 10);
    dom.sessionDate.addEventListener("change", () => {
      storeSessionMeta(getSessionMetaFromInputs());
      scheduleSessionSave();
    });
  }
  if (dom.sessionNewBtn) {
    dom.sessionNewBtn.addEventListener("click", () => {
      if (!window.confirm("Start a new session? This will reset all data on the page.")) {
        return;
      }
      resetAllTests();
      const nextId = createSessionId();
      localStorage.setItem(SESSION_ID_KEY, nextId);
      dom.sessionIdDisplay.textContent = nextId;
      if (dom.sessionParticipantId) {
        dom.sessionParticipantId.value = "";
      }
      if (dom.sessionProctorName) {
        dom.sessionProctorName.value = "";
      }
      if (dom.sessionDate) {
        dom.sessionDate.value = new Date().toISOString().slice(0, 10);
      }
      storeSessionMeta(getSessionMetaFromInputs());
      scheduleSessionSave(true);
    });
  }
  if (dom.sessionSaveBtn) {
    dom.sessionSaveBtn.addEventListener("click", () => {
      scheduleSessionSave(true);
    });
  }
  if (dom.sessionLoadBtn) {
    dom.sessionLoadBtn.addEventListener("click", () => {
      const id = dom.sessionLoadId ? dom.sessionLoadId.value.trim() : "";
      if (!id) {
        alert("Enter a session ID to load.");
        return;
      }
      loadSessionById(id);
    });
  }
  if (dom.sessionResetBtn) {
    dom.sessionResetBtn.addEventListener("click", () => {
      if (dom.sessionParticipantId) {
        dom.sessionParticipantId.value = "";
      }
      if (dom.sessionProctorName) {
        dom.sessionProctorName.value = "";
      }
      if (dom.sessionDate) {
        dom.sessionDate.value = new Date().toISOString().slice(0, 10);
      }
      storeSessionMeta(getSessionMetaFromInputs());
      scheduleSessionSave(true);
    });
  }
}

function getOrCreateSessionId() {
  const existing = localStorage.getItem(SESSION_ID_KEY);
  if (existing) {
    return existing;
  }
  const next = createSessionId();
  localStorage.setItem(SESSION_ID_KEY, next);
  return next;
}

function createSessionId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `session_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getStoredSessionMeta() {
  const raw = localStorage.getItem(SESSION_META_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function storeSessionMeta(meta) {
  localStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
}

function getSessionMetaFromInputs() {
  return {
    participantId: dom.sessionParticipantId ? dom.sessionParticipantId.value.trim() : "",
    proctorName: dom.sessionProctorName ? dom.sessionProctorName.value.trim() : "",
    sessionDate: dom.sessionDate ? dom.sessionDate.value : ""
  };
}

function scheduleSessionSave(forceImmediate = false) {
  if (!supabaseClient) {
    return;
  }
  if (sessionSaveTimer) {
    window.clearTimeout(sessionSaveTimer);
  }
  const delay = forceImmediate ? 0 : 1200;
  sessionSaveTimer = window.setTimeout(() => {
    sessionSaveTimer = null;
    saveSessionSnapshot();
  }, delay);
}

async function saveSessionSnapshot() {
  if (!supabaseClient || sessionSaveInFlight) {
    return;
  }
  const sessionId = getOrCreateSessionId();
  const meta = getSessionMetaFromInputs();
  const payload = buildSessionPayload();
  sessionSaveInFlight = true;
  setSessionSaveStatus("Saving...");
  try {
    const { error } = await supabaseClient
      .from("ecas_sessions")
      .upsert(
        {
          session_id: sessionId,
          participant_id: meta.participantId || null,
          proctor_name: meta.proctorName || null,
          session_date: meta.sessionDate || null,
          data: payload.data,
          naming_data: payload.naming_data,
          comprehension_data: payload.comprehension_data,
          spelling_data: payload.spelling_data,
          story_data: payload.story_data,
          delayed_story_data: payload.delayed_story_data,
          fluency_data: payload.fluency_data,
          fluency_t_data: payload.fluency_t_data,
          digits_data: payload.digits_data,
          alternation_data: payload.alternation_data,
          dots_data: payload.dots_data,
          cubes_data: payload.cubes_data,
          numberloc_data: payload.numberloc_data,
          social_data: payload.social_data,
          social_b_data: payload.social_b_data,
          delayed_recognition_data: payload.delayed_recognition_data,
          sentences_data: payload.sentences_data,
          prompts: payload.prompts,
          scores: payload.scores,
          transcripts: payload.transcripts,
          rationales: payload.rationales,
          timers: payload.timers
        },
        { onConflict: "session_id" }
      );
    if (error) {
      console.error("Supabase save failed", error);
      setSessionSaveStatus("Save failed");
    } else {
      setSessionSaveStatus("Saved");
    }
  } catch (err) {
    console.error("Supabase save failed", err);
    setSessionSaveStatus("Save failed");
  } finally {
    sessionSaveInFlight = false;
  }
}

function setSessionSaveStatus(text) {
  if (!dom.sessionSaveStatus) {
    return;
  }
  dom.sessionSaveStatus.textContent = text || "";
  if (!text) {
    return;
  }
  window.setTimeout(() => {
    if (dom.sessionSaveStatus.textContent === text) {
      dom.sessionSaveStatus.textContent = "";
    }
  }, 2000);
}

function resetAllTests() {
  resetCurrentItem();
  activeIndex = 0;
  loadItem(0);

  resetComprehension();
  compIndex = 0;
  moveComprehension(0, { force: true });

  resetSpelling();
  spellIndex = 0;
  moveSpelling(0);

  resetStory();
  resetDelayedStory();
  resetDelayedRecognition();

  resetFluency();
  resetFluencyT();

  resetDigits();
  digitsIndex = 0;
  moveDigits(0, { force: true });

  resetAlternation();
  altIndex = 0;
  moveAlternation(0);

  resetDots();
  dotsIndex = 0;
  moveDots(0, { force: true });

  resetCubes();
  cubesIndex = 0;
  moveCubes(0, { force: true });

  resetNumberLoc();
  numberlocIndex = 0;
  moveNumberLoc(0, { force: true });

  resetSocialAll();
  socialIndex = 0;
  moveSocial(0);

  resetSocialBAll();
  socialBIndex = 0;
  moveSocialB(0);

  sentenceState.index = 0;
  sentenceState.responses = Array(sentencePrompts.length).fill("");
  if (dom.sentenceInputs) {
    dom.sentenceInputs.forEach(input => {
      input.value = "";
    });
  }
  if (dom.sentenceScoreCells) {
    dom.sentenceScoreCells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("score-invalid");
    });
  }
  if (dom.sentenceNoteCells) {
    dom.sentenceNoteCells.forEach(cell => {
      cell.textContent = "";
    });
  }
  if (dom.sentenceSectionScore) {
    dom.sentenceSectionScore.textContent = "0";
  }
  updateUI();
}

function buildSessionPayload() {
  const subtests = buildSubtestSnapshots();
  return {
    prompts: {
      story: getPromptValue("story"),
      fluency: getPromptValue("fluency"),
      fluencyT: getPromptValue("fluencyT"),
      sentence: getPromptValue("sentence")
    },
    scores: buildScoreSnapshot(),
    transcripts: {
      story: getStoryTranscript(),
      delayed_story: getDelayedStoryTranscript()
    },
    rationales: {
      fluency: extractFluencyRationales(fluencyState),
      fluencyT: extractFluencyRationales(fluencyTState)
    },
    timers: serializeSessionTimers(),
    data: {},
    ...subtests
  };
}

async function loadSessionById(sessionId) {
  if (!supabaseClient) {
    alert("Supabase is not configured.");
    return;
  }
  setSessionSaveStatus("Loading...");
  try {
    const { data, error } = await supabaseClient
      .from("ecas_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();
    if (error) {
      console.error("Supabase load failed", error);
      setSessionSaveStatus("Load failed");
      return;
    }
    if (!data) {
      setSessionSaveStatus("Not found");
      return;
    }
    applyLoadedSession(data);
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    if (dom.sessionIdDisplay) {
      dom.sessionIdDisplay.textContent = sessionId;
    }
    setSessionSaveStatus("Loaded");
  } catch (err) {
    console.error("Supabase load failed", err);
    setSessionSaveStatus("Load failed");
  }
}

function applyLoadedSession(record) {
  if (dom.sessionParticipantId) {
    dom.sessionParticipantId.value = record.participant_id || "";
  }
  if (dom.sessionProctorName) {
    dom.sessionProctorName.value = record.proctor_name || "";
  }
  if (dom.sessionDate) {
    dom.sessionDate.value = record.session_date || "";
  }
  storeSessionMeta(getSessionMetaFromInputs());

  if (record.prompts) {
    Object.entries(PROMPT_STORAGE_KEYS).forEach(([kind, key]) => {
      if (record.prompts[kind] !== undefined) {
        localStorage.setItem(key, record.prompts[kind] || "");
      }
    });
    ensurePromptDefaultsCurrent();
    refreshPromptEditorInputs();
  }

  if (record.scores) {
    applyScoreSnapshot(record.scores);
  }

  if (record.transcripts && record.transcripts.story !== undefined) {
    storyState.manualTranscript = record.transcripts.story || "";
    storyState.manualEdited = Boolean(storyState.manualTranscript);
    storyState.editingLive = false;
  }
  if (record.transcripts && record.transcripts.delayed_story !== undefined) {
    delayedStoryState.manualTranscript = record.transcripts.delayed_story || "";
    delayedStoryState.manualEdited = Boolean(delayedStoryState.manualTranscript);
    delayedStoryState.editingLive = false;
  }

  if (record.rationales) {
    applyRationales(record.rationales);
  }

  if (record.data) {
    applyStateSnapshot(record.data);
  } else {
    applyStateSnapshot({
      naming: record.naming_data,
      comprehension: record.comprehension_data,
      spelling: record.spelling_data,
      story: record.story_data,
      delayedStory: record.delayed_story_data,
      fluency: record.fluency_data,
      fluencyT: record.fluency_t_data,
      digits: record.digits_data,
      alternation: record.alternation_data,
      dots: record.dots_data,
      cubes: record.cubes_data,
      numberloc: record.numberloc_data,
      social: record.social_data,
      socialB: record.social_b_data,
      delayedRecognition: record.delayed_recognition_data,
      sentences: record.sentences_data
    });
  }
  updateUI();
}

function refreshPromptEditorInputs() {
  const map = [
    { kind: "story", id: "prompt-story" },
    { kind: "fluency", id: "prompt-fluency" },
    { kind: "fluencyT", id: "prompt-fluency-t" },
    { kind: "sentence", id: "prompt-sentence" }
  ];
  map.forEach(({ kind, id }) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = getPromptValue(kind);
    }
  });
}

function applyScoreSnapshot(scores) {
  const setText = (el, value) => {
    if (el && value !== undefined && value !== null) {
      el.textContent = String(value);
    }
  };
  setText(dom.scoreLangNaming, scores.langNaming);
  setText(dom.scoreLangComp, scores.langComp);
  setText(dom.scoreLangSpell, scores.langSpell);
  setText(dom.scoreFluencyS, scores.fluencyS);
  setText(dom.scoreFluencyT, scores.fluencyT);
  setText(dom.scoreExecDigits, scores.execDigits);
  setText(dom.scoreExecAlt, scores.execAlt);
  setText(dom.scoreExecSentence, scores.execSentence);
  setText(dom.scoreSocial, scores.social);
  setText(dom.scoreAlsSpecific, scores.alsSpecific);
  setText(dom.scoreMemoryImmediate, scores.memoryImmediate);
  setText(dom.scoreMemoryDelayed, scores.memoryDelayed);
  setText(dom.scoreMemoryRecog, scores.memoryRecog);
  setText(dom.scoreVisuoDots, scores.visuoDots);
  setText(dom.scoreVisuoCubes, scores.visuoCubes);
  setText(dom.scoreVisuoNumberloc, scores.visuoNumberloc);
  setText(dom.scoreAlsNonspecific, scores.alsNonspecific);
  setText(dom.scoreEcasTotal, scores.total);
  setText(dom.fluencySectionScore, scores.fluencySectionScore);
  setText(dom.fluencyTSectionScore, scores.fluencyTSectionScore);
  setText(dom.sentenceSectionScore, scores.sentenceSectionScore);
  setText(dom.storySectionScore, scores.storySectionScore);
  setText(dom.sectionScore, scores.namingSectionScore);
  if (dom.delayedStorySectionScore && scores.memoryDelayed !== undefined && scores.memoryDelayed !== null) {
    const match = String(scores.memoryDelayed).match(/(\d+)/);
    if (match) {
      dom.delayedStorySectionScore.textContent = match[1];
    }
  }
}

function applyRationales(rationales) {
  if (rationales.fluency && Array.isArray(fluencyState.entries)) {
    fluencyState.entries.forEach((entry, idx) => {
      const word = entry?.word || "";
      if (!word) return;
      if (!fluencyState.aiReview) {
        fluencyState.aiReview = [];
      }
      if (!fluencyState.aiReview[idx]) {
        fluencyState.aiReview[idx] = { suggestion: "remove", decision: "pending", rationale: "" };
      }
      if (rationales.fluency[word]) {
        fluencyState.aiReview[idx].manualNote = rationales.fluency[word];
      }
    });
  }
  if (rationales.fluencyT && Array.isArray(fluencyTState.entries)) {
    fluencyTState.entries.forEach((entry, idx) => {
      const word = entry?.word || "";
      if (!word) return;
      if (!fluencyTState.aiReview) {
        fluencyTState.aiReview = [];
      }
      if (!fluencyTState.aiReview[idx]) {
        fluencyTState.aiReview[idx] = { suggestion: "remove", decision: "pending", rationale: "" };
      }
      if (rationales.fluencyT[word]) {
        fluencyTState.aiReview[idx].manualNote = rationales.fluencyT[word];
      }
    });
  }
}

function applyStateSnapshot(snapshot) {
  if (snapshot.naming) {
    if (typeof snapshot.naming.activeIndex === "number") {
      activeIndex = snapshot.naming.activeIndex;
    }
    if (Array.isArray(snapshot.naming.states)) {
      itemStates.length = 0;
      snapshot.naming.states.forEach(state => itemStates.push(state));
    }
  }
  if (snapshot.comprehension) {
    if (typeof snapshot.comprehension.index === "number") {
      compIndex = snapshot.comprehension.index;
    }
    if (Array.isArray(snapshot.comprehension.states)) {
      compStates.length = 0;
      snapshot.comprehension.states.forEach(state => compStates.push(state));
    }
  }
  if (snapshot.spelling) {
    if (typeof snapshot.spelling.index === "number") {
      spellIndex = snapshot.spelling.index;
    }
    if (Array.isArray(snapshot.spelling.states)) {
      spellingStates.length = 0;
      snapshot.spelling.states.forEach(state => spellingStates.push(state));
    }
  }
  if (snapshot.story && snapshot.story.state) {
    Object.assign(storyState, snapshot.story.state);
  }
  if (snapshot.delayedStory && snapshot.delayedStory.state) {
    Object.assign(delayedStoryState, snapshot.delayedStory.state);
    if (snapshot.delayedStory.retained) {
      const retained = snapshot.delayedStory.retained;
      if (dom.delayedStoryRaw && retained.delayed_score !== undefined) {
        dom.delayedStoryRaw.textContent = `${retained.delayed_score}`;
      }
      if (dom.delayedStoryImmediate && retained.immediate_score !== undefined) {
        dom.delayedStoryImmediate.textContent = `${retained.immediate_score}`;
      }
      if (dom.delayedStoryRetained && retained.retained_percent !== undefined) {
        dom.delayedStoryRetained.textContent = `${Math.round(retained.retained_percent)}%`;
      }
      if (dom.delayedStorySectionScore && retained.converted_score !== undefined) {
        dom.delayedStorySectionScore.textContent = `${retained.converted_score}`;
      }
    }
  }
  if (snapshot.fluency) {
    Object.assign(fluencyState, snapshot.fluency);
    if (fluencyState.readTimer) {
      fluencyState.readTimer.running = false;
      fluencyState.readTimer.startTime = null;
      if (fluencyState.readTimer.intervalId) {
        clearInterval(fluencyState.readTimer.intervalId);
        fluencyState.readTimer.intervalId = null;
      }
    }
  }
  if (snapshot.fluencyT) {
    Object.assign(fluencyTState, snapshot.fluencyT);
    if (fluencyTState.readTimer) {
      fluencyTState.readTimer.running = false;
      fluencyTState.readTimer.startTime = null;
      if (fluencyTState.readTimer.intervalId) {
        clearInterval(fluencyTState.readTimer.intervalId);
        fluencyTState.readTimer.intervalId = null;
      }
    }
  }
  if (snapshot.digits) {
    if (typeof snapshot.digits.index === "number") {
      digitsIndex = snapshot.digits.index;
    }
    if (Array.isArray(snapshot.digits.states)) {
      digitStates.length = 0;
      snapshot.digits.states.forEach(state => digitStates.push(state));
    }
  }
  if (snapshot.alternation) {
    if (typeof snapshot.alternation.index === "number") {
      altIndex = snapshot.alternation.index;
    }
    if (Array.isArray(snapshot.alternation.states)) {
      alternationStates.length = 0;
      snapshot.alternation.states.forEach(state => alternationStates.push(state));
    }
    alternationHalted = Boolean(snapshot.alternation.halted);
  }
  if (snapshot.dots) {
    if (typeof snapshot.dots.index === "number") {
      dotsIndex = snapshot.dots.index;
    }
    if (Array.isArray(snapshot.dots.states)) {
      dotsStates.length = 0;
      snapshot.dots.states.forEach(state => dotsStates.push(state));
    }
  }
  if (snapshot.cubes) {
    if (typeof snapshot.cubes.index === "number") {
      cubesIndex = snapshot.cubes.index;
    }
    if (Array.isArray(snapshot.cubes.states)) {
      cubesStates.length = 0;
      snapshot.cubes.states.forEach(state => cubesStates.push(state));
    }
  }
  if (snapshot.numberloc) {
    if (typeof snapshot.numberloc.index === "number") {
      numberlocIndex = snapshot.numberloc.index;
    }
    if (Array.isArray(snapshot.numberloc.states)) {
      numberlocStates.length = 0;
      snapshot.numberloc.states.forEach(state => numberlocStates.push(state));
    }
  }
  if (snapshot.social) {
    if (typeof snapshot.social.index === "number") {
      socialIndex = snapshot.social.index;
    }
    if (Array.isArray(snapshot.social.states)) {
      socialStates.length = 0;
      snapshot.social.states.forEach(state => socialStates.push(state));
    }
  }
  if (snapshot.socialB) {
    if (typeof snapshot.socialB.index === "number") {
      socialBIndex = snapshot.socialB.index;
    }
    if (Array.isArray(snapshot.socialB.states)) {
      socialBStates.length = 0;
      snapshot.socialB.states.forEach(state => socialBStates.push(state));
    }
  }
  if (snapshot.delayedRecognition && Array.isArray(snapshot.delayedRecognition.states)) {
    delayedRecognitionStates.length = 0;
    snapshot.delayedRecognition.states.forEach(state => delayedRecognitionStates.push(state));
  }
  if (snapshot.sentences) {
    sentenceState.index = snapshot.sentences.index || 0;
    if (Array.isArray(snapshot.sentences.responses) && dom.sentenceInputs) {
      snapshot.sentences.responses.forEach((resp, idx) => {
        const input = dom.sentenceInputs[idx];
        if (input) input.value = resp.response || "";
        const scoreCell = dom.sentenceScoreCells?.[idx];
        if (scoreCell) updateSentenceScoreCell(scoreCell, resp.score || "");
        const noteCell = dom.sentenceNoteCells?.[idx];
        if (noteCell) noteCell.textContent = resp.notes || "";
      });
    }
  }
}
function buildScoreSnapshot() {
  const value = el => (el ? el.textContent || "" : "");
  return {
    langNaming: value(dom.scoreLangNaming),
    langComp: value(dom.scoreLangComp),
    langSpell: value(dom.scoreLangSpell),
    fluencyS: value(dom.scoreFluencyS),
    fluencyT: value(dom.scoreFluencyT),
    execDigits: value(dom.scoreExecDigits),
    execAlt: value(dom.scoreExecAlt),
    execSentence: value(dom.scoreExecSentence),
    social: value(dom.scoreSocial),
    alsSpecific: value(dom.scoreAlsSpecific),
    memoryImmediate: value(dom.scoreMemoryImmediate),
    memoryDelayed: value(dom.scoreMemoryDelayed),
    memoryRecog: value(dom.scoreMemoryRecog),
    visuoDots: value(dom.scoreVisuoDots),
    visuoCubes: value(dom.scoreVisuoCubes),
    visuoNumberloc: value(dom.scoreVisuoNumberloc),
    alsNonspecific: value(dom.scoreAlsNonspecific),
    total: value(dom.scoreEcasTotal),
    fluencySectionScore: value(dom.fluencySectionScore),
    fluencyTSectionScore: value(dom.fluencyTSectionScore),
    sentenceSectionScore: value(dom.sentenceSectionScore),
    storySectionScore: value(dom.storySectionScore),
    namingSectionScore: value(dom.sectionScore)
  };
}

function buildStateSnapshot() {
  return {
    naming: {
      activeIndex,
      items,
      states: itemStates
    },
    comprehension: {
      index: compIndex,
      prompts: comprehensionPrompts,
      states: compStates
    },
    spelling: {
      index: spellIndex,
      words: spellingWords,
      labels: spellingWordLabels,
      states: spellingStates
    },
    story: {
      state: storyState
    },
    delayedStory: {
      state: delayedStoryState
    },
    fluency: serializeFluencyState(fluencyState),
    fluencyT: serializeFluencyState(fluencyTState),
    digits: {
      index: digitsIndex,
      trials: digitTrials,
      states: digitStates
    },
    alternation: {
      index: altIndex,
      trials: alternationTrials,
      states: alternationStates,
      halted: alternationHalted
    },
    dots: {
      index: dotsIndex,
      trials: dotTrials,
      states: dotsStates
    },
    cubes: {
      index: cubesIndex,
      trials: cubeTrials,
      states: cubesStates
    },
    numberloc: {
      index: numberlocIndex,
      trials: numberLocTrials,
      states: numberlocStates
    },
    social: {
      index: socialIndex,
      trials: socialTrials,
      states: socialStates
    },
    socialB: {
      index: socialBIndex,
      trials: socialBTrials,
      states: socialBStates
    },
    delayedRecognition: {
      questions: delayedRecognitionQuestions,
      states: delayedRecognitionStates
    },
    sentences: {
      index: sentenceState.index,
      prompts: sentencePrompts,
      responses: getSentenceResponses()
    }
  };
}

function buildSubtestSnapshots() {
  const snapshot = buildStateSnapshot();
  const fluencyRead = buildFluencyReadMetrics(fluencyState);
  const fluencyTRead = buildFluencyReadMetrics(fluencyTState);
  const delayedRetention = buildDelayedStoryRetention();
  return {
    naming_data: snapshot.naming,
    comprehension_data: snapshot.comprehension,
    spelling_data: snapshot.spelling,
    story_data: snapshot.story,
    delayed_story_data: { ...snapshot.delayedStory, retained: delayedRetention },
    fluency_data: { ...snapshot.fluency, vfi: fluencyRead },
    fluency_t_data: { ...snapshot.fluencyT, vfi: fluencyTRead },
    digits_data: snapshot.digits,
    alternation_data: snapshot.alternation,
    dots_data: snapshot.dots,
    cubes_data: snapshot.cubes,
    numberloc_data: snapshot.numberloc,
    social_data: snapshot.social,
    social_b_data: snapshot.socialB,
    delayed_recognition_data: snapshot.delayedRecognition,
    sentences_data: snapshot.sentences
  };
}

function buildFluencyReadMetrics(state) {
  const seconds = (state.readTimer?.elapsedMs || 0) / 1000;
  const correct = Array.isArray(state.processedWords) ? state.processedWords.length : 0;
  const vfi = getFluencyVfi(seconds, correct);
  return {
    read_seconds: Number(seconds.toFixed(1)),
    correct_words: correct,
    vfi_value: vfi === null ? null : Number(vfi.toFixed(2)),
    vfi_score: getFluencyVFIScore(state, correct)
  };
}

function buildDelayedStoryRetention() {
  const immediate = getImmediateStoryScore();
  const delayed = getDelayedRawScore();
  const percent = getDelayedRetentionPercent();
  return {
    immediate_score: immediate,
    delayed_score: delayed,
    retained_percent: Number(percent.toFixed(1)),
    converted_score: getDelayedRecallScore(delayed)
  };
}

function serializeFluencyState(state) {
  const readTimer = state.readTimer || {};
  return {
    status: state.status,
    tokens: state.tokens,
    entries: state.entries,
    uniqueWords: state.uniqueWords ? Array.from(state.uniqueWords) : [],
    aiReview: state.aiReview,
    aiKeepMask: state.aiKeepMask,
    processedWords: state.processedWords,
    processedNotes: state.processedNotes,
    timer: state.timer,
    readTimer: {
      elapsedMs: readTimer.elapsedMs || 0,
      baseMs: readTimer.baseMs || 0,
      running: false
    }
  };
}

function getSentenceResponses() {
  const inputs = dom.sentenceInputs || [];
  return inputs.map((input, idx) => ({
    prompt: sentencePrompts[idx] || "",
    response: (input.value || "").trim(),
    score: dom.sentenceScoreCells?.[idx]?.textContent || "",
    notes: dom.sentenceNoteCells?.[idx]?.textContent || ""
  }));
}

function extractFluencyRationales(state) {
  const map = {};
  if (!Array.isArray(state.entries)) {
    return map;
  }
  state.entries.forEach((entry, idx) => {
    const word = entry && entry.word ? entry.word : "";
    if (!word) {
      return;
    }
    const review = Array.isArray(state.aiReview) ? state.aiReview[idx] : null;
    if (review && review.rationale) {
      map[word] = review.rationale;
    }
    if (review && review.manualNote) {
      map[word] = review.manualNote;
    }
  });
  return map;
}

function serializeSessionTimers() {
  const result = {};
  sessionTimers.forEach((timer, sectionId) => {
    result[sectionId] = {
      elapsedMs: timer.elapsedMs,
      running: Boolean(timer.intervalId)
    };
  });
  return result;
}

function ensurePromptDefaultsCurrent() {
  const currentVersion = localStorage.getItem(PROMPT_VERSION_KEY);
  if (currentVersion === PROMPT_DEFAULTS_VERSION) {
    return;
  }
  Object.entries(PROMPT_STORAGE_KEYS).forEach(([kind, key]) => {
    const defaultValue = PROMPT_DEFAULTS[kind] || "";
    localStorage.setItem(key, defaultValue);
  });
  localStorage.setItem(PROMPT_VERSION_KEY, PROMPT_DEFAULTS_VERSION);
}

function setupSentenceScoreEditing() {
  (dom.sentenceScoreCells || []).forEach(cell => {
    cell.addEventListener("dblclick", () => {
      if (cell.querySelector("input")) {
        return;
      }
      const prevText = cell.textContent.trim();
      const input = document.createElement("input");
      input.type = "text";
      input.className = "inline-edit";
      input.value = prevText;
      cell.textContent = "";
      cell.appendChild(input);
      input.focus();
      input.select();

      const commit = shouldSave => {
        const nextText = shouldSave ? (input.value || "").trim() : prevText;
        updateSentenceScoreCell(cell, nextText);
        updateSentenceScoreTotalFromCells();
      };

      input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit(true);
        } else if (event.key === "Escape") {
          event.preventDefault();
          commit(false);
        }
      });
      input.addEventListener("blur", () => commit(true));
    });
  });
}

function setupSessionTimers() {
  document.querySelectorAll("section.stage-card").forEach(section => {
    const sectionId = section.getAttribute("id") || `section-${sessionTimers.size + 1}`;
    if (sectionId === "agent-prompts-card" || sectionId === "overall-scores-card" || sectionId === "session-card") {
      return;
    }
    if (sessionTimers.has(sectionId)) {
      return;
    }
    const display = document.createElement("span");
    display.className = "session-duration";
    display.textContent = "00:00";

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.className = "ghost";
    startBtn.textContent = "Start Session";

    const endBtn = document.createElement("button");
    endBtn.type = "button";
    endBtn.className = "ghost";
    endBtn.textContent = "End Session";

    const controls = document.createElement("div");
    controls.className = "session-controls";
    controls.append(startBtn, endBtn, display);

    const header = section.querySelector(".stage-header");
    if (header) {
      header.appendChild(controls);
    } else {
      section.insertBefore(controls, section.firstChild);
    }

    const timerState = {
      startTime: null,
      elapsedMs: 0,
      intervalId: null,
      display
    };
    sessionTimers.set(sectionId, timerState);

    startBtn.addEventListener("click", () => startSessionTimer(sectionId));
    endBtn.addEventListener("click", () => stopSessionTimer(sectionId));

    const resetButtons = section.querySelectorAll("button.ghost.danger");
    resetButtons.forEach(btn => {
      if (btn.textContent.toLowerCase().includes("reset")) {
        btn.addEventListener("click", () => resetSessionTimer(sectionId));
      }
    });
  });
}

function startSessionTimer(sectionId) {
  const state = sessionTimers.get(sectionId);
  if (!state || state.intervalId) {
    return;
  }
  state.startTime = Date.now();
  state.intervalId = setInterval(() => {
    const elapsed = Date.now() - state.startTime + state.elapsedMs;
    state.display.textContent = formatDuration(elapsed);
  }, 500);
}

function stopSessionTimer(sectionId) {
  const state = sessionTimers.get(sectionId);
  if (!state || !state.intervalId) {
    return;
  }
  const now = Date.now();
  state.elapsedMs += now - state.startTime;
  clearInterval(state.intervalId);
  state.intervalId = null;
  state.startTime = null;
  state.display.textContent = formatDuration(state.elapsedMs);
}

function resetSessionTimer(sectionId) {
  const state = sessionTimers.get(sectionId);
  if (!state) {
    return;
  }
  if (state.intervalId) {
    clearInterval(state.intervalId);
  }
  state.intervalId = null;
  state.startTime = null;
  state.elapsedMs = 0;
  state.display.textContent = "00:00";
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setAIDemoMode(enabled) {
  const allowed = new Set([
    "story-card",
    "delayed-story-card",
    "fluency-card",
    "fluency-t-card",
    "sentence-card"
  ]);
  document.querySelectorAll("section.stage-card").forEach(section => {
    const id = section.getAttribute("id");
    const inPromptTab = Boolean(section.closest("#tab-prompts"));
    const shouldShow = !enabled || inPromptTab || (id && allowed.has(id));
    section.classList.toggle("ai-demo-hidden", !shouldShow);
  });
}

function setupSpeechRecognition() {
  const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!RecognitionCtor) {
    dom.speechWarning.classList.remove("hidden");
    updateButtons();
    return;
  }

  speechSupported = true;
  recognition = new RecognitionCtor();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", handleRecognitionResult);
  recognition.addEventListener("error", handleRecognitionError);
  recognition.addEventListener("end", handleRecognitionEnd);

  dom.speechWarning.classList.add("hidden");
  updateButtons();
}

function loadItem(index) {
  const boundedIndex = ((index % items.length) + items.length) % items.length;
  activeIndex = boundedIndex;
  const item = items[activeIndex];
  dom.image.src = item.src;
  dom.image.alt = item.label;
  dom.title.textContent = `Item ${activeIndex + 1} of ${items.length}`;
  dom.expectedLabel.textContent = item.label;
  dom.expectedVariants.textContent = `Acceptable: ${Array.from(buildTargetSet(item.answers)).join(", ")}`;
  updateUI();
}

function setupComprehension() {
  if (!dom.compImageGrid) {
    return;
  }
  renderComprehensionGrid();
  loadComprehension(0);
  updateComprehensionUI();
}

function setupSpelling() {
  if (!dom.spellWord) {
    return;
  }
  loadSpelling(0);
  updateSpellingUI();
}

function setupFluency() {
  updateFluencyUI();
}

function setupDigits() {
  if (!dom.digitsTrialSeq) {
    return;
  }
  loadDigits(0);
  updateDigitsUI();
}

function setupAlternation() {
  if (!dom.altTarget) {
    return;
  }
  loadAlternation(0);
  updateAlternationUI();
}

function setupFluencyT() {
  updateFluencyTUI();
}

function setupDots() {
  if (!dom.dotsImage) {
    return;
  }
  loadDots(0);
  updateDotsUI();
}

function setupCubes() {
  if (!dom.cubesImage) {
    return;
  }
  loadCubes(0);
  updateCubesUI();
}

function setupNumberLoc() {
  if (!dom.numberlocImage) {
    return;
  }
  loadNumberLoc(0);
  updateNumberLocUI();
}

function renderComprehensionGrid() {
  dom.compImageGrid.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "image-option";
    card.dataset.imageId = item.id;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.label;
    card.append(img);
    card.addEventListener("click", () => selectComprehensionImage(item.id));
    dom.compImageGrid.appendChild(card);
  });
}

function loadComprehension(index) {
  const boundedIndex = ((index % comprehensionPrompts.length) + comprehensionPrompts.length) % comprehensionPrompts.length;
  compIndex = boundedIndex;
  const question = comprehensionPrompts[compIndex];
  dom.compPrompt.textContent = question.prompt;
  dom.compProgressCount.textContent = `${compIndex + 1} / ${comprehensionPrompts.length}`;
  updateComprehensionUI();
}

function loadSpelling(index) {
  const boundedIndex = ((index % spellingWords.length) + spellingWords.length) % spellingWords.length;
  spellIndex = boundedIndex;
  const target = spellingWords[spellIndex];
  dom.spellWord.textContent = spellingWordLabels[spellIndex] || target.charAt(0) + target.slice(1).toLowerCase();
  dom.spellProgressCount.textContent = `${spellIndex + 1} / ${spellingWords.length}`;
  dom.spellManualInput.value = spellingStates[spellIndex].typedAnswer || "";
  updateSpellingUI();
}

function loadDigits(index) {
  const boundedIndex = ((index % digitTrials.length) + digitTrials.length) % digitTrials.length;
  digitsIndex = boundedIndex;
  const target = digitTrials[digitsIndex];
  dom.digitsTrialSeq.textContent = target;
  dom.digitsProgressCount.textContent = `${digitsIndex + 1} / ${digitTrials.length}`;
  if (dom.digitsManualInput) {
    dom.digitsManualInput.value = digitStates[digitsIndex].typedAnswer || "";
  }
  updateDigitsUI();
}

function loadAlternation(index) {
  const boundedIndex = ((index % alternationTrials.length) + alternationTrials.length) % alternationTrials.length;
  altIndex = boundedIndex;
  const target = alternationTrials[altIndex];
  dom.altTarget.textContent = `${target.number} - ${target.letter}`;
  dom.altProgressCount.textContent = `${altIndex + 1} / ${alternationTrials.length}`;
  updateAlternationUI();
}

function loadDots(index) {
  const boundedIndex = ((index % dotTrials.length) + dotTrials.length) % dotTrials.length;
  dotsIndex = boundedIndex;
  const trial = dotTrials[dotsIndex];
  dom.dotsImage.src = trial.src;
  dom.dotsImage.alt = `Dot counting box ${trial.id}`;
  dom.dotsProgressCount.textContent = `${dotsIndex + 1} / ${dotTrials.length}`;
  updateDotsUI();
}

function loadCubes(index) {
  const boundedIndex = ((index % cubeTrials.length) + cubeTrials.length) % cubeTrials.length;
  cubesIndex = boundedIndex;
  const trial = cubeTrials[cubesIndex];
  dom.cubesImage.src = trial.src;
  dom.cubesImage.alt = `Cube counting structure ${trial.id}`;
  dom.cubesProgressCount.textContent = `${cubesIndex + 1} / ${cubeTrials.length}`;
  updateCubesUI();
}

function loadNumberLoc(index) {
  const boundedIndex = ((index % numberLocTrials.length) + numberLocTrials.length) % numberLocTrials.length;
  numberlocIndex = boundedIndex;
  const trial = numberLocTrials[numberlocIndex];
  dom.numberlocImage.src = trial.src;
  dom.numberlocImage.alt = `Number location card ${trial.id}`;
  dom.numberlocProgressCount.textContent = `${numberlocIndex + 1} / ${numberLocTrials.length}`;
  updateNumberLocUI();
}

function startFluencyListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (fluencyState.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "fluency") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  fluencyState.status = "listening";
  fluencyState.tokens = [];
  fluencyState.entries = [];
  fluencyState.uniqueWords = new Set();
  resetFluencyAIReview(fluencyState);
  fluencyState.timer.remainingMs = 60000;
  fluencyState.timer.startTime = null;
  fluencyState.timer.endTime = Date.now() + 60000;
  captureContext = { type: "fluency" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start fluency recognition", err);
  }
  updateFluencyCountdown();
  fluencyState.timer.rafId = requestAnimationFrame(ts => handleFluencyTimer(ts));
  updateFluencyUI();
}

function startFluencyTListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (captureContext && captureContext.type !== "fluencyT") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  if (fluencyTState.status === "listening") {
    return;
  }
  fluencyTState.status = "listening";
  fluencyTState.tokens = [];
  fluencyTState.entries = [];
  fluencyTState.uniqueWords = new Set();
  resetFluencyAIReview(fluencyTState);
  fluencyTState.timer.remainingMs = 60000;
  fluencyTState.timer.startTime = null;
  fluencyTState.timer.endTime = Date.now() + 60000;
  captureContext = { type: "fluencyT" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start fluency T recognition", err);
  }
  updateFluencyTCountdown();
  fluencyTState.timer.rafId = requestAnimationFrame(ts => handleFluencyTTimer(ts));
  updateFluencyTUI();
}

function stopFluencyTListening() {
  if (fluencyTState.status !== "listening") {
    return;
  }
  fluencyTState.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  if (fluencyTState.timer.rafId) {
    cancelAnimationFrame(fluencyTState.timer.rafId);
    fluencyTState.timer.rafId = null;
  }
  updateFluencyTUI();
}

function finalizeFluencyTCapture() {
  fluencyTState.status = "completed";
  isStopping = false;
  captureContext = null;
  if (fluencyTState.timer.rafId) {
    cancelAnimationFrame(fluencyTState.timer.rafId);
    fluencyTState.timer.rafId = null;
  }
  if (!fluencyTState.processedWords) {
    fluencyTState.processedWords = [];
  }
  if (!fluencyTState.processedNotes) {
    fluencyTState.processedNotes = [];
  }
  if (!fluencyTState.aiReview) {
    fluencyTState.aiReview = [];
  }
  updateFluencyTUI();
}

function resetFluencyT() {
  if (fluencyTState.status === "listening" && recognition && captureContext && captureContext.type === "fluencyT") {
    recognition.stop();
    captureContext = null;
  }
  if (fluencyTState.timer.rafId) {
    cancelAnimationFrame(fluencyTState.timer.rafId);
    fluencyTState.timer.rafId = null;
  }
  fluencyTState.status = "pending";
  fluencyTState.tokens = [];
  fluencyTState.entries = [];
  fluencyTState.uniqueWords = new Set();
  resetReadTimer(fluencyTState);
  fluencyTState.timer.remainingMs = 60000;
  fluencyTState.timer.endTime = null;
  fluencyTState.timer.startTime = null;
  resetFluencyAIReview(fluencyTState);
  updateFluencyTUI();
}

function startDotsListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (dotsSessionEnded) {
    return;
  }
  if (captureContext && captureContext.type !== "dots") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  const state = dotsStates[dotsIndex];
  if (state.status === "listening") {
    return;
  }
  state.status = "listening";
  state.digits = [];
  state.entries = [];
  state.candidate = "";
  state.timestamp = null;
  captureContext = { type: "dots" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start dot counting recognition", err);
  }
  updateDotsUI();
}

function stopDotsListening() {
  const state = dotsStates[dotsIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateDotsUI();
}

function finalizeDotsCapture() {
  const state = dotsStates[dotsIndex];
  if (!state) {
    return;
  }
  evaluateDots(state, dotTrials[dotsIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  updateDotsUI();
  if (dotsIndex === dotTrials.length - 1) {
    endDotsSession();
  }
}

function moveDots(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (dotsSessionEnded && (!captureContext || captureContext.type === "dots")) {
    return;
  }
  const state = dotsStates[dotsIndex];
  if (!force && state.status === "listening") {
    return;
  }
  if (state.status === "pending" && (state.digits.length || state.entries.length)) {
    finalizeDotsCapture();
  }
  loadDots(index);
  if (keepListening && captureContext && captureContext.type === "dots") {
    const nextState = dotsStates[dotsIndex];
    nextState.status = "listening";
    updateDotsUI();
  }
}

function resetDots() {
  const state = dotsStates[dotsIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "dots") {
    recognition.stop();
    captureContext = null;
  }
  dotsSessionEnded = false;
  state.status = "pending";
  state.digits = [];
  state.entries = [];
  state.correct = false;
  state.candidate = "";
  state.timestamp = null;
  updateDotsUI();
}

function startCubesListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (cubesSessionEnded) {
    return;
  }
  const state = cubesStates[cubesIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "cubes") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.digits = [];
  state.entries = [];
  state.candidate = "";
  state.timestamp = null;
  captureContext = { type: "cubes" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start cube counting recognition", err);
  }
  updateCubesUI();
}

function stopCubesListening() {
  const state = cubesStates[cubesIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateCubesUI();
}

function finalizeCubesCapture() {
  const state = cubesStates[cubesIndex];
  if (!state) {
    return;
  }
  evaluateCubes(state, cubeTrials[cubesIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  updateCubesUI();
  if (cubesIndex === cubeTrials.length - 1) {
    endCubesSession();
  }
}

function moveCubes(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (cubesSessionEnded && (!captureContext || captureContext.type === "cubes")) {
    return;
  }
  const state = cubesStates[cubesIndex];
  if (!force && state.status === "listening") {
    return;
  }
  if (state.status === "pending" && (state.digits.length || state.entries.length)) {
    finalizeCubesCapture();
  }
  loadCubes(index);
  if (keepListening && captureContext && captureContext.type === "cubes") {
    const nextState = cubesStates[cubesIndex];
    nextState.status = "listening";
    updateCubesUI();
  }
}

function resetCubes() {
  const state = cubesStates[cubesIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "cubes") {
    recognition.stop();
    captureContext = null;
  }
  cubesSessionEnded = false;
  state.status = "pending";
  state.digits = [];
  state.entries = [];
  state.correct = false;
  state.candidate = "";
  state.timestamp = null;
  updateCubesUI();
}

function startNumberLocListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (numberlocSessionEnded) {
    return;
  }
  const state = numberlocStates[numberlocIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "numberloc") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.digits = [];
  state.entries = [];
  state.candidate = "";
  state.timestamp = null;
  captureContext = { type: "numberloc" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start number location recognition", err);
    setTimeout(() => {
      try {
        recognition.start();
      } catch (e2) {
        console.error("Retry start failed for number location", e2);
      }
    }, 150);
  }
  updateNumberLocUI();
}

function stopNumberLocListening() {
  const state = numberlocStates[numberlocIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateNumberLocUI();
}

function finalizeNumberLocCapture() {
  const state = numberlocStates[numberlocIndex];
  if (!state) {
    return;
  }
  evaluateNumberLoc(state, numberLocTrials[numberlocIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  updateNumberLocUI();
  if (numberlocIndex === numberLocTrials.length - 1) {
    endNumberLocSession();
  }
}

function moveNumberLoc(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (numberlocSessionEnded && (!captureContext || captureContext.type === "numberloc")) {
    return;
  }
  const state = numberlocStates[numberlocIndex];
  if (!force && state.status === "listening") {
    return;
  }
  if (state.status === "pending" && (state.digits.length || state.entries.length)) {
    finalizeNumberLocCapture();
  }
  loadNumberLoc(index);
  if (keepListening && captureContext && captureContext.type === "numberloc") {
    const nextState = numberlocStates[numberlocIndex];
    nextState.status = "listening";
    updateNumberLocUI();
  }
}

function resetNumberLoc() {
  const state = numberlocStates[numberlocIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "numberloc") {
    recognition.stop();
    captureContext = null;
  }
  numberlocSessionEnded = false;
  state.status = "pending";
  state.digits = [];
  state.entries = [];
  state.correct = false;
  state.candidate = "";
  state.timestamp = null;
  updateNumberLocUI();
}

function stopFluencyListening() {
  if (fluencyState.status !== "listening") {
    return;
  }
  fluencyState.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  if (fluencyState.timer.rafId) {
    cancelAnimationFrame(fluencyState.timer.rafId);
    fluencyState.timer.rafId = null;
  }
  updateFluencyUI();
}

function finalizeFluencyCapture() {
  fluencyState.status = "completed";
  isStopping = false;
  captureContext = null;
  if (fluencyState.timer.rafId) {
    cancelAnimationFrame(fluencyState.timer.rafId);
    fluencyState.timer.rafId = null;
  }
  updateFluencyUI();
}

function resetFluency() {
  if (fluencyState.status === "listening" && recognition && captureContext && captureContext.type === "fluency") {
    recognition.stop();
    captureContext = null;
  }
  if (fluencyState.timer.rafId) {
    cancelAnimationFrame(fluencyState.timer.rafId);
    fluencyState.timer.rafId = null;
  }
  fluencyState.status = "pending";
  fluencyState.tokens = [];
  fluencyState.entries = [];
  fluencyState.uniqueWords = new Set();
  resetReadTimer(fluencyState);
  resetFluencyAIReview(fluencyState);
  fluencyState.timer.remainingMs = 60000;
  fluencyState.timer.endTime = null;
  fluencyState.timer.startTime = null;
  updateFluencyUI();
}

function startAlternationListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (alternationHalted) {
    return;
  }
  const state = alternationStates[altIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "alternation") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.numbers = [];
  state.letters = [];
  state.entries = [];
  state.candidate = "";
  state.timestamp = null;
  captureContext = { type: "alternation" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start alternation recognition", err);
  }
  updateAlternationUI();
}

function stopAlternationListening() {
  const state = alternationStates[altIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateAlternationUI();
}

function finalizeAlternationCapture() {
  const state = alternationStates[altIndex];
  if (!state) {
    return;
  }
  evaluateAlternation(state, alternationTrials[altIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  if (!state.typedAnswer && state.entries.length) {
    state.typedAnswer = state.entries[state.entries.length - 1].text;
  }
  if (!state.correct) {
    alternationHalted = true;
  }
  updateAlternationUI();
}

function submitAlternation() {
  if (alternationHalted) {
    return;
  }
  const state = alternationStates[altIndex];
  evaluateAlternation(state, alternationTrials[altIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  if (!state.correct) {
    alternationHalted = true;
  }
  updateAlternationUI();
}

function moveAlternation(index) {
  if (alternationHalted) {
    return;
  }
  const state = alternationStates[altIndex];
  if (state.status === "pending" && (state.numbers.length || state.letters.length || state.typedAnswer)) {
    submitAlternation();
  }
  loadAlternation(index);
}

function resetAlternation() {
  const state = alternationStates[altIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "alternation") {
    recognition.stop();
    captureContext = null;
  }
  state.status = "pending";
  state.numbers = [];
  state.letters = [];
  state.entries = [];
  state.typedAnswer = "";
  state.candidate = "";
  state.correct = false;
  state.timestamp = null;
  alternationHalted = false;
  updateAlternationUI();
}

function startDigitsListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (digitsSessionEnded) {
    return;
  }
  const state = digitStates[digitsIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "digits") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.digits = [];
  state.entries = [];
  state.candidate = "";
  state.timestamp = null;
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  captureContext = { type: "digits" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start digit recognition", err);
  }
  updateDigitsUI();
}

function stopDigitsListening() {
  const state = digitStates[digitsIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateDigitsUI();
}

function finalizeDigitsCapture() {
  const state = digitStates[digitsIndex];
  if (!state) {
    return;
  }
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  evaluateDigits(state, digitTrials[digitsIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  if (!state.typedAnswer && state.entries.length) {
    state.typedAnswer = state.entries[state.entries.length - 1].text;
  }
  updateDigitsUI();
  if (digitsIndex < digitTrials.length - 1) {
    loadDigits(digitsIndex + 1);
  } else {
    endDigitsSession();
  }
}

function submitDigits() {
  const state = digitStates[digitsIndex];
  if (dom.digitsManualInput) {
    state.typedAnswer = dom.digitsManualInput.value.trim();
  }
  evaluateDigits(state, digitTrials[digitsIndex]);
  state.status = "completed";
  state.timestamp = Date.now();
  updateDigitsUI();
}

function moveDigits(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (digitsSessionEnded && (!captureContext || captureContext.type === "digits")) {
    return;
  }
  const state = digitStates[digitsIndex];
  if (!force && state.status === "listening") {
    return;
  }
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  if (state.status === "pending" && (state.digits.length || state.entries.length)) {
    finalizeDigitsCapture();
  }
  loadDigits(index);
  if (keepListening && captureContext && captureContext.type === "digits") {
    const nextState = digitStates[digitsIndex];
    nextState.status = "listening";
    updateDigitsUI();
  }
}

function resetDigits() {
  const state = digitStates[digitsIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "digits") {
    recognition.stop();
    captureContext = null;
  }
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
  digitsSessionEnded = false;
  state.status = "pending";
  state.digits = [];
  state.entries = [];
  state.typedAnswer = "";
  state.candidate = "";
  state.correct = false;
  state.timestamp = null;
  if (dom.digitsManualInput) {
    dom.digitsManualInput.value = "";
  }
  updateDigitsUI();
}

function startComprehensionListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (comprehensionSessionEnded) {
    return;
  }
  const state = compStates[compIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "comprehension") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.tokens = [];
  state.entries = [];
  captureContext = { type: "comprehension" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start comprehension recognition", err);
  }
  updateComprehensionUI();
}

function stopComprehensionListening() {
  const state = compStates[compIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateComprehensionUI();
}

function startSpellingListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  const state = spellingStates[spellIndex];
  if (state.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "spelling") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  state.status = "listening";
  state.tokens = [];
  state.entries = [];
  state.spelledCandidate = "";
  state.timestamp = null;
  captureContext = { type: "spelling" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start spelling recognition", err);
  }
  updateSpellingUI();
}

function stopSpellingListening() {
  const state = spellingStates[spellIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  updateSpellingUI();
}

function finalizeSpellingCapture() {
  const state = spellingStates[spellIndex];
  if (!state) {
    return;
  }
  const target = spellingWords[spellIndex];
  evaluateSpelling(state, target);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  if (!state.typedAnswer && state.entries.length) {
    state.typedAnswer = state.entries[state.entries.length - 1].text;
  }
  updateSpellingUI();
}

function submitSpelling() {
  const state = spellingStates[spellIndex];
  const target = spellingWords[spellIndex];
  state.typedAnswer = dom.spellManualInput.value.trim();
  evaluateSpelling(state, target);
  state.status = "completed";
  state.timestamp = Date.now();
  updateSpellingUI();
}

function moveSpelling(index) {
  const state = spellingStates[spellIndex];
  if (state.status === "pending" && (state.tokens.length || state.typedAnswer)) {
    submitSpelling();
  }
  loadSpelling(index);
}

function resetSpelling() {
  const state = spellingStates[spellIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "spelling") {
    recognition.stop();
    captureContext = null;
  }
  state.status = "pending";
  state.tokens = [];
  state.entries = [];
  state.typedAnswer = "";
  state.correct = false;
  state.timestamp = null;
  state.spelledCandidate = "";
  dom.spellManualInput.value = "";
  updateSpellingUI();
}

function finalizeComprehensionCapture() {
  const state = compStates[compIndex];
  if (!state) {
    return;
  }
  const question = comprehensionPrompts[compIndex];
  evaluateComprehension(state, question);
  state.status = "completed";
  state.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  if (!state.typedAnswer && state.entries.length) {
    state.typedAnswer = state.entries[state.entries.length - 1].text;
  }
  updateComprehensionUI();
}

function selectComprehensionImage(imageId) {
  const state = compStates[compIndex];
  state.selectedId = imageId;
  if (state.status === "completed") {
    state.status = "pending";
    state.correct = false;
    state.timestamp = null;
  }
  updateComprehensionUI();
}

function submitComprehension() {
  const state = compStates[compIndex];
  const question = comprehensionPrompts[compIndex];
  if (!state.selectedId && !state.entries.length) {
    alert("Select a picture or capture a response before submitting.");
    return;
  }
  evaluateComprehension(state, question);
  state.status = "completed";
  state.timestamp = Date.now();
  updateComprehensionUI();
}

function moveComprehension(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (comprehensionSessionEnded && (!captureContext || captureContext.type === "comprehension")) {
    return;
  }
  const current = compStates[compIndex];
  if (!force && current.status === "listening") {
    return;
  }
  if (current.status === "pending" && (current.selectedId || current.entries.length)) {
    submitComprehension();
  }
  loadComprehension(index);
  if (keepListening && captureContext && captureContext.type === "comprehension") {
    const nextState = compStates[compIndex];
    nextState.status = "listening";
    updateComprehensionUI();
  }
}

function resetComprehension() {
  const state = compStates[compIndex];
  if (state.status === "listening" && recognition && captureContext && captureContext.type === "comprehension") {
    recognition.stop();
    captureContext = null;
  }
  comprehensionSessionEnded = false;
  state.selectedId = null;
  state.correct = false;
  state.status = "pending";
  state.timestamp = null;
  state.tokens = [];
  state.entries = [];
  updateComprehensionUI();
}

function startStoryListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (storyState.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "story") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  storyState.status = "listening";
  storyState.tokens = [];
  storyState.entries = [];
  storyState.timestamp = null;
  storyState.manualTranscript = "";
  storyState.manualEdited = false;
  storyState.editingLive = false;
  captureContext = { type: "story" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start story recognition", err);
  }
  renderStoryUI();
}

function stopStoryListening() {
  if (storyState.status !== "listening") {
    return;
  }
  storyState.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  renderStoryUI();
}

function ensureStoryCaptureStopped() {
  if (storyState.status === "listening") {
    stopStoryListening();
    finalizeStoryCapture();
    return;
  }
  if (storyState.status === "finishing") {
    finalizeStoryCapture();
  }
}

function finalizeStoryCapture() {
  storyState.status = "completed";
  storyState.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  renderStoryUI();
}

function resetStory() {
  if (storyState.status === "listening" && recognition && captureContext && captureContext.type === "story") {
    recognition.stop();
    captureContext = null;
  }
  storyState.status = "pending";
  storyState.tokens = [];
  storyState.entries = [];
  storyState.timestamp = null;
  storyState.manualTranscript = "";
  storyState.manualEdited = false;
  storyState.editingLive = false;
  renderStoryUI();
}

function getStoryTranscript() {
  if (storyState.manualEdited) {
    return storyState.manualTranscript || "";
  }
  if (!storyState.entries.length) {
    return "";
  }
  return storyState.entries
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(entry => entry.text || "")
    .join("\n");
}

function startDelayedStoryListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (delayedStoryState.status === "listening") {
    return;
  }
  if (captureContext && captureContext.type !== "storyDelayed") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  delayedStoryState.status = "listening";
  delayedStoryState.tokens = [];
  delayedStoryState.entries = [];
  delayedStoryState.timestamp = null;
  delayedStoryState.manualTranscript = "";
  delayedStoryState.manualEdited = false;
  delayedStoryState.editingLive = false;
  captureContext = { type: "storyDelayed" };
  isStopping = false;
  try {
    recognition.start();
  } catch (err) {
    console.error("Failed to start delayed story recognition", err);
  }
  renderDelayedStoryUI();
}

function stopDelayedStoryListening() {
  if (delayedStoryState.status !== "listening") {
    return;
  }
  delayedStoryState.status = "finishing";
  isStopping = true;
  if (recognition) {
    recognition.stop();
  }
  renderDelayedStoryUI();
}

function ensureDelayedStoryCaptureStopped() {
  if (delayedStoryState.status === "listening") {
    stopDelayedStoryListening();
    finalizeDelayedStoryCapture();
    return;
  }
  if (delayedStoryState.status === "finishing") {
    finalizeDelayedStoryCapture();
  }
}

function finalizeDelayedStoryCapture() {
  delayedStoryState.status = "completed";
  delayedStoryState.timestamp = Date.now();
  captureContext = null;
  isStopping = false;
  renderDelayedStoryUI();
}

function resetDelayedStory() {
  if (delayedStoryState.status === "listening" && recognition && captureContext && captureContext.type === "storyDelayed") {
    recognition.stop();
    captureContext = null;
  }
  delayedStoryState.status = "pending";
  delayedStoryState.tokens = [];
  delayedStoryState.entries = [];
  delayedStoryState.timestamp = null;
  delayedStoryState.manualTranscript = "";
  delayedStoryState.manualEdited = false;
  delayedStoryState.editingLive = false;
  renderDelayedStoryUI();
}

function resetDelayedRecognition() {
  delayedRecognitionStates.forEach(state => {
    state.answer = null;
    state.correct = null;
  });
  updateDelayedRecognitionUI();
}

function getDelayedStoryTranscript() {
  if (delayedStoryState.manualEdited) {
    return delayedStoryState.manualTranscript || "";
  }
  if (!delayedStoryState.entries.length) {
    return "";
  }
  return delayedStoryState.entries
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(entry => entry.text || "")
    .join("\n");
}

async function scoreDelayedStoryWithLLM() {
  ensureDelayedStoryCaptureStopped();
  if (!delayedStoryState.entries.length) {
    alert("Capture the participant's delayed story recall before scoring.");
    return;
  }
  try {
    if (!STORY_SCORER_URL) {
      alert("Set window.STORY_SCORER_URL to your scoring endpoint before using LLM scoring.");
      return;
    }
    if (dom.delayedStoryScoreBtn) {
      dom.delayedStoryScoreBtn.disabled = true;
      dom.delayedStoryScoreBtn.textContent = "Scoring...";
    }
    const transcript = getDelayedStoryTranscript();
    console.log("POSTing delayed story transcript to scorer", { url: STORY_SCORER_URL, length: transcript.length });
    const response = await fetch(STORY_SCORER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, prompt: getPromptValue("story") })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Scorer HTTP error", response.status, text);
      throw new Error(`Scorer returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Delayed scorer response", data);
    applyDelayedStoryScore(data);
  } catch (err) {
    console.error("Delayed story scoring failed", err);
    alert("Delayed story scoring failed. Check the console and scorer configuration.");
  } finally {
    if (dom.delayedStoryScoreBtn) {
      dom.delayedStoryScoreBtn.disabled = false;
      dom.delayedStoryScoreBtn.textContent = "Score with AI Assistant";
    }
  }
}

async function scoreStoryWithLLM() {
  ensureStoryCaptureStopped();
  if (!storyState.entries.length) {
    alert("Capture the participant's story recall before scoring.");
    return;
  }
  try {
    if (!STORY_SCORER_URL) {
      alert("Set window.STORY_SCORER_URL to your scoring endpoint before using LLM scoring.");
      return;
    }
    if (dom.storyScoreBtn) {
      dom.storyScoreBtn.disabled = true;
      dom.storyScoreBtn.textContent = "Scoring...";
    }
    const transcript = getStoryTranscript();
    console.log("POSTing story transcript to scorer", { url: STORY_SCORER_URL, length: transcript.length });
    const response = await fetch(STORY_SCORER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, prompt: getPromptValue("story") })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Scorer HTTP error", response.status, text);
      throw new Error(`Scorer returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Scorer response", data);
    applyStoryScore(data);
  } catch (err) {
    console.error("Story scoring failed", err);
    alert("Story scoring failed. Check the console and scorer configuration.");
  } finally {
    if (dom.storyScoreBtn) {
      dom.storyScoreBtn.disabled = false;
      dom.storyScoreBtn.textContent = "Score with AI Assistant";
    }
  }
}

async function scoreFluencyWithLLM() {
  if (!fluencyState.entries.length) {
    alert("Capture fluency words before scoring.");
    return;
  }
  const url = dom.fluencyScorerUrl || window.FLUENCY_SCORER_URL;
  if (!url) {
    alert("Set window.FLUENCY_SCORER_URL to your scoring endpoint before using LLM scoring.");
    return;
  }
  if (dom.fluencyScoreLLMBtn) {
    dom.fluencyScoreLLMBtn.disabled = true;
    dom.fluencyScoreLLMBtn.textContent = "Scoring...";
  }
  try {
    const words = fluencyState.entries.map(entry => entry.word);
    console.log("POSTing fluency words to scorer", { url, count: words.length });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words, prompt: getPromptValue("fluency") })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Fluency scorer HTTP error", response.status, text);
      throw new Error(`Fluency scorer returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Fluency scorer response", data);
    buildFluencyAIReview(fluencyState, data);
    updateFluencyUI();
  } catch (err) {
    console.error("Fluency LLM scoring failed", err);
    alert("Fluency scoring failed. Check console/backend.");
  } finally {
    if (dom.fluencyScoreLLMBtn) {
      dom.fluencyScoreLLMBtn.disabled = false;
      dom.fluencyScoreLLMBtn.textContent = "Score with AI Assistant";
    }
  }
}

async function scoreFluencyTWithLLM() {
  if (!fluencyTState.entries.length) {
    alert("Capture fluency words before scoring.");
    return;
  }
  const url = dom.fluencyTScorerUrl || window.FLUENCY_T_SCORER_URL;
  if (!url) {
    alert("Set window.FLUENCY_T_SCORER_URL to your scoring endpoint before using AI scoring.");
    return;
  }
  if (dom.fluencyTScoreLLMBtn) {
    dom.fluencyTScoreLLMBtn.disabled = true;
    dom.fluencyTScoreLLMBtn.textContent = "Scoring...";
  }
  try {
    const words = fluencyTState.entries.map(entry => entry.word);
    console.log("POSTing fluency T words to scorer", { url, count: words.length });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words, prompt: getPromptValue("fluencyT") })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Fluency T scorer HTTP error", response.status, text);
      throw new Error(`Fluency T scorer returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Fluency T scorer response", data);
    buildFluencyAIReview(fluencyTState, data);
    updateFluencyTUI();
  } catch (err) {
    console.error("Fluency T AI scoring failed", err);
    alert("Fluency scoring failed. Check console/backend.");
  } finally {
    if (dom.fluencyTScoreLLMBtn) {
      dom.fluencyTScoreLLMBtn.disabled = false;
      dom.fluencyTScoreLLMBtn.textContent = "Score with AI Assistant";
    }
  }
}

function applyStoryScore(result) {
  let total = 0;
  STORY_CRITERIA.forEach(({ key }) => {
    const input = storyScoreInputs[key];
    const raw = result && result[key];
    const value = raw === "yes" || raw === true;
    if (input) {
      input.checked = Boolean(value);
    }
    if (value) {
      total += 1;
    }
  });
  if (dom.storySectionScore) {
    dom.storySectionScore.textContent = `${total}`;
  }
  updateDelayedRetentionDisplay();
  scheduleSessionSave();
  updateScorecard();
}

function updateStoryScoreFromChecks() {
  let total = 0;
  STORY_CRITERIA.forEach(({ key }) => {
    const input = storyScoreInputs[key];
    if (input && input.checked) {
      total += 1;
    }
  });
  if (dom.storySectionScore) {
    dom.storySectionScore.textContent = `${total}`;
  }
  updateDelayedRetentionDisplay();
  scheduleSessionSave();
  updateScorecard();
}

function applyDelayedStoryScore(result) {
  let total = 0;
  DELAYED_STORY_CRITERIA.forEach(({ key }) => {
    const input = delayedStoryScoreInputs[key];
    const raw = result && result[key];
    const value = raw === "yes" || raw === true;
    if (input) {
      input.checked = Boolean(value);
    }
    if (value) {
      total += 1;
    }
  });
  if (dom.delayedStorySectionScore) {
    dom.delayedStorySectionScore.textContent = `${getDelayedRecallScore(total)}`;
  }
  updateDelayedRetentionDisplay();
  scheduleSessionSave();
  updateScorecard();
}

function updateDelayedStoryScoreFromChecks() {
  let total = 0;
  DELAYED_STORY_CRITERIA.forEach(({ key }) => {
    const input = delayedStoryScoreInputs[key];
    if (input && input.checked) {
      total += 1;
    }
  });
  if (dom.delayedStorySectionScore) {
    dom.delayedStorySectionScore.textContent = `${getDelayedRecallScore(total)}`;
  }
  updateDelayedRetentionDisplay();
  scheduleSessionSave();
  updateScorecard();
}

function getImmediateStoryScore() {
  let total = 0;
  STORY_CRITERIA.forEach(({ key }) => {
    const input = storyScoreInputs[key];
    if (input && input.checked) {
      total += 1;
    }
  });
  return total;
}

function getDelayedRawScore() {
  let total = 0;
  DELAYED_STORY_CRITERIA.forEach(({ key }) => {
    const input = delayedStoryScoreInputs[key];
    if (input && input.checked) {
      total += 1;
    }
  });
  return total;
}

function getDelayedRetentionPercent() {
  const immediate = getImmediateStoryScore();
  const delayed = getDelayedRawScore();
  if (!immediate) {
    return 0;
  }
  return (delayed / immediate) * 100;
}

function getDelayedRecallScore(delayedRawScore) {
  const immediate = getImmediateStoryScore();
  if (!immediate) {
    return 0;
  }
  const percent = (delayedRawScore / immediate) * 100;
  if (percent <= 0) {
    return 0;
  }
  if (percent <= 10) return 1;
  if (percent <= 20) return 2;
  if (percent <= 30) return 3;
  if (percent <= 40) return 4;
  if (percent <= 50) return 5;
  if (percent <= 60) return 6;
  if (percent <= 70) return 7;
  if (percent <= 80) return 8;
  if (percent <= 90) return 9;
  return 10;
}

function updateDelayedRetentionDisplay() {
  const percent = getDelayedRetentionPercent();
  const delayedRaw = getDelayedRawScore();
  const immediate = getImmediateStoryScore();
  if (dom.delayedStoryRaw) {
    dom.delayedStoryRaw.textContent = `${delayedRaw}`;
  }
  if (dom.delayedStoryImmediate) {
    dom.delayedStoryImmediate.textContent = `${immediate}`;
  }
  if (dom.delayedStoryRetained) {
    dom.delayedStoryRetained.textContent = `${Math.round(percent)}%`;
  }
  if (dom.delayedStorySectionScore) {
    dom.delayedStorySectionScore.textContent = `${getDelayedRecallScore(delayedRaw)}`;
  }
  updateDelayedRecognitionUI();
}

function updateDelayedRecognitionUI() {
  if (!dom.delayedRecognitionBody || !dom.delayedRecognitionStatus) {
    return;
  }
  const shouldSkip = getDelayedRawScore() === 10;
  if (dom.delayedRecognitionAdmin) {
    if (shouldSkip) {
      dom.delayedRecognitionAdmin.innerHTML =
        '<span class="match-pill miss">Do not administer</span> <span class="pill-explainer miss">Participant has perfect score on recall so automatically gets full points on this section.</span>';
    } else {
      dom.delayedRecognitionAdmin.innerHTML =
        '<span class="match-pill success">Administer</span> <span class="pill-explainer success">Participant did not recall all items, so administer this section.</span>';
    }
  }
  dom.delayedRecognitionStatus.textContent = shouldSkip ? "Skip" : "Ready";
  dom.delayedRecognitionStatus.className = shouldSkip ? "status-badge completed" : "status-badge";
  if (dom.delayedRecognitionCard) {
    dom.delayedRecognitionCard.classList.toggle("section-disabled", shouldSkip);
  }

  const frag = document.createDocumentFragment();
  delayedRecognitionQuestions.forEach((question, idx) => {
    const state = delayedRecognitionStates[idx];
    const tr = document.createElement("tr");
    const qTd = document.createElement("td");
    qTd.textContent = question.text;

    const trueTd = document.createElement("td");
    const falseTd = document.createElement("td");
    const resultTd = document.createElement("td");

    const trueBtn = document.createElement("button");
    trueBtn.type = "button";
    trueBtn.className = `ghost tf-option ${state.answer === true ? "selected" : ""}`;
    trueBtn.textContent = "T";
    trueBtn.disabled = shouldSkip;
    trueBtn.addEventListener("click", () => {
      state.answer = true;
      state.correct = question.correct === true;
      updateDelayedRecognitionUI();
    });

    const falseBtn = document.createElement("button");
    falseBtn.type = "button";
    falseBtn.className = `ghost tf-option ${state.answer === false ? "selected" : ""}`;
    falseBtn.textContent = "F";
    falseBtn.disabled = shouldSkip;
    falseBtn.addEventListener("click", () => {
      state.answer = false;
      state.correct = question.correct === false;
      updateDelayedRecognitionUI();
    });

    trueTd.appendChild(trueBtn);
    falseTd.appendChild(falseBtn);

    if (state.answer === null) {
      resultTd.textContent = "—";
    } else {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Incorrect";
      resultTd.appendChild(pill);
    }

    tr.append(qTd, trueTd, falseTd, resultTd);
    frag.appendChild(tr);
  });
  dom.delayedRecognitionBody.innerHTML = "";
  dom.delayedRecognitionBody.appendChild(frag);

  const correctCount = delayedRecognitionStates.filter(state => state.correct).length;
  const score = shouldSkip ? 4 : getRecognitionScore(correctCount);
  if (dom.delayedRecognitionScore) {
    dom.delayedRecognitionScore.textContent = `${score}`;
  }
  if (dom.scoreMemoryRecog) {
    dom.scoreMemoryRecog.textContent = `${score}/4`;
  }
  updateScorecard();
  scheduleSessionSave();
}

function getRecognitionScore(correctCount) {
  if (correctCount >= 8) return 4;
  if (correctCount === 7) return 3;
  if (correctCount === 6) return 2;
  if (correctCount === 5) return 1;
  return 0;
}

function syncParticipantView() {
  const payload = buildParticipantPayload();
  if (participantChannel) {
    participantChannel.postMessage({ type: "naming-sync", payload });
  } else {
    try {
      localStorage.setItem(participantChannelName, JSON.stringify({ type: "naming-sync", payload }));
    } catch (err) {}
  }
}

function buildParticipantPayload() {
  const total = items.length || 1;
  const completed = itemStates.filter(state => state.status === "completed").length;
  const percent = Math.round((completed / total) * 100);
  const status = itemStates[activeIndex]?.status || "pending";
  const statusLabel =
    status === "listening" ? "Listening" : status === "finishing" ? "Finishing" : status === "completed" ? "Completed" : "Idle";
  const statusClass =
    status === "completed"
      ? "status-badge completed"
      : status === "listening"
      ? "status-badge listening"
      : "status-badge";
  const item = items[activeIndex] || {};
  const rawSrc = item.src || dom.image?.getAttribute("src") || "";
  const imageSrc = rawSrc ? new URL(rawSrc, window.location.href).toString() : "";
  const comprehensionImages = items.map(item => ({
    id: item.id,
    src: item.src ? new URL(item.src, window.location.href).toString() : "",
    label: item.label
  }));
  let section = "naming";
  if (namingSessionEnded) {
    section = "comprehension";
  }
  if (comprehensionSessionEnded) {
    section = "immediate-recall";
  }
  const spellingStarted =
    spellingStates.some(state => state.status === "listening") ||
    spellingStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (spellingStarted) {
    section = "spelling";
  }
  const fluencyStarted =
    fluencyState.status === "listening" ||
    (fluencyState.entries && fluencyState.entries.length) ||
    (fluencyState.tokens && fluencyState.tokens.length) ||
    (dom.fluencyManualInput && dom.fluencyManualInput.value.trim());
  if (fluencyStarted) {
    section = "fluency-s";
  }
  const digitsStarted =
    digitStates.some(state => state.status === "listening") ||
    digitStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (digitsStarted) {
    section = "digits";
  }
  const alternationStarted =
    alternationStates.some(state => state.status === "listening") ||
    alternationStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (alternationStarted) {
    section = "alternation";
  }
  const fluencyTStarted =
    fluencyTState.status === "listening" ||
    (fluencyTState.entries && fluencyTState.entries.length) ||
    (fluencyTState.tokens && fluencyTState.tokens.length) ||
    (dom.fluencyTManualInput && dom.fluencyTManualInput.value.trim());
  if (fluencyTStarted) {
    section = "fluency-t";
  }
  const dotsStarted =
    dotsStates.some(state => state.status === "listening") ||
    dotsStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (dotsStarted) {
    section = "dots";
  }
  const cubesStarted =
    cubesStates.some(state => state.status === "listening") ||
    cubesStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (cubesStarted) {
    section = "cubes";
  }
  const numberlocStarted =
    numberlocStates.some(state => state.status === "listening") ||
    numberlocStates.some(state => (state.entries && state.entries.length) || (state.typedAnswer || "").trim());
  if (numberlocStarted) {
    section = "numberloc";
  }
  const sentenceStarted =
    sentenceState.status === "listening" ||
    (sentenceState.responses && sentenceState.responses.length) ||
    (dom.sentenceInputs && Array.from(dom.sentenceInputs).some(input => (input.value || "").trim()));
  if (sentenceStarted) {
    section = "sentences";
  }
  const socialStarted = socialStates.some(state => state.selectedIndex !== null);
  const socialCompleted = socialStates.every(state => state.selectedIndex !== null);
  const socialBStarted = socialBStates.some(state => state.selectedIndex !== null);
  const socialBCompleted = socialBStates.every(state => state.selectedIndex !== null);
  if (socialStarted || socialBStarted) {
    if (socialBCompleted) {
      section = "delayed-recall";
    } else if (socialBStarted || socialCompleted) {
      section = "social-b";
    } else {
      section = "social-a";
    }
  }
  const delayedRecognitionStarted =
    sessionTimers.get("delayed-recognition-card")?.elapsedMs > 0 ||
    delayedRecognitionStates.some(state => state.answer !== null);
  if (delayedRecognitionStarted) {
    section = "delayed-recognition";
  }
  return {
    section,
    naming: {
      title: `Item ${activeIndex + 1} of ${total}`,
      progressText: `${activeIndex + 1} / ${total}`,
      progressPercent: percent,
      imageSrc,
      imageAlt: item.label || dom.image?.getAttribute("alt") || "Naming prompt",
      statusLabel,
      statusClass
    },
    comprehension: {
      progressText: `${compIndex + 1} / ${comprehensionPrompts.length}`,
      images: comprehensionImages
    },
    immediateRecall: {
      title: "Immediate recall after story",
      instructions:
        "Instructions: Listen carefully to the story that's going to be presented to you and recall everything they remember after"
    },
    spelling: {
      title: "4. Language - Spelling",
      instructions: "Instructions: You will be given different words - please spell them aloud to the best of your ability."
    },
    fluencyS: {
      title: "5. Verbal Fluency - Letter S",
      instructions:
        "Instructions: You will be given different words - list as many words that start with an S as possible."
    },
    digits: {
      title: "6. Reverse the spoken numbers",
      instructions: "Instructions: Numbers will be read aloud to you. Repeat them in reverse order."
    },
    alternation: {
      title: "Section 7: Number/letter switching",
      instructions: "Instructions: Alternating between numbers and letters, in order, without skipping any until told to stop."
    },
    fluencyT: {
      title: "Section 8: Verbal Fluency - Letter T",
      instructions: "Instructions: List as many words that start with an T and are four letters as possible."
    },
    dots: {
      title: "Section 9: Count dots in each box",
      imageSrc: dom.dotsImage?.getAttribute("src")
        ? new URL(dom.dotsImage.getAttribute("src"), window.location.href).toString()
        : "",
      imageAlt: dom.dotsImage?.getAttribute("alt") || "Dot counting prompt",
      progressText: `${dotsIndex + 1} / ${dotTrials.length}`,
      progressPercent: Math.round(((dotsIndex + 1) / dotTrials.length) * 100)
    },
    cubes: {
      title: "Section 10: Count cubes in each box",
      imageSrc: dom.cubesImage?.getAttribute("src")
        ? new URL(dom.cubesImage.getAttribute("src"), window.location.href).toString()
        : "",
      imageAlt: dom.cubesImage?.getAttribute("alt") || "Cube counting prompt",
      progressText: `${cubesIndex + 1} / ${cubeTrials.length}`,
      progressPercent: Math.round(((cubesIndex + 1) / cubeTrials.length) * 100)
    },
    numberloc: {
      title: "Section 11: Which number has the dot?",
      imageSrc: dom.numberlocImage?.getAttribute("src")
        ? new URL(dom.numberlocImage.getAttribute("src"), window.location.href).toString()
        : "",
      imageAlt: dom.numberlocImage?.getAttribute("alt") || "Number location prompt",
      progressText: `${numberlocIndex + 1} / ${numberLocTrials.length}`,
      progressPercent: Math.round(((numberlocIndex + 1) / numberLocTrials.length) * 100)
    },
    sentences: {
      title: "Section 12: Sentence Completion",
      instructions: "You will be given a parital sentence, please complete with a word that doesn't make sense."
    },
    socialA: {
      title: "Section 13 (Part A): Social Cognition",
      instructions: "Please choose which image you like best.",
      images: socialTrials[socialIndex]?.images || [],
      selectedIndex: socialStates[socialIndex]?.selectedIndex ?? null,
      progressText: `${socialIndex + 1} / ${socialTrials.length}`,
      progressPercent: Math.round(((socialIndex + 1) / socialTrials.length) * 100)
    },
    socialB: {
      title: "Section 13 (Part B): Social Cognition",
      images: socialBTrials[socialBIndex]?.images || [],
      face: socialBTrials[socialBIndex]?.face || "",
      selectedIndex: socialBStates[socialBIndex]?.selectedIndex ?? null,
      progressText: `${socialBIndex + 1} / ${socialBTrials.length}`,
      progressPercent: Math.round(((socialBIndex + 1) / socialBTrials.length) * 100)
    },
    delayedRecall: {
      title: "14. Memory - Delayed Recall",
      instructions: "Recall the story again from earlier and state everything you can remember"
    },
    delayedRecognition: {
      title: "15. Memory - Delayed Recognition",
      instructions: "Please answer the following True or False questions about the story"
    }
  };
}


function keywordScoreStory(transcript) {
  const text = (transcript || "").toLowerCase();
  const has = phrase => text.includes(phrase);
  const score = {};
  score.sunday = has("sunday") ? "yes" : "no";
  score.annual_cleanup =
    has("annual park cleanup") ||
    has("annual cleanup") ||
    has("garbage cleanup") ||
    has("park cleanup") ||
    has("annual trash cleanup")
      ? "yes"
      : "no";
  score.marigold_woods = has("marigold") || has("woods") || has("forest") || has("park") ? "yes" : "no";
  score.forty_two = has("forty two") || has("forty-two") ? "yes" : "no";
  const mentionsBikes = has("bicycle") || has("bike") || has("bikes");
  const mentionsCarts = has("cart") || has("carts") || has("trolley") || has("trolleys");
  score.bicycles_and_carts = mentionsBikes && mentionsCarts ? "yes" : "no";
  score.robert_webber = has("robert") || has("webber") ? "yes" : "no";
  score.woodland_project = has("woodland") && (has("project") || has("plan") || has("initiative") || has("program")) ? "yes" : "no";
  score.positive_emotion = has("pleased") || has("impressed") || has("proud") || has("happy") || has("glad") ? "yes" : "no";
  score.seventeen = has("17") || has("seventeen") ? "yes" : "no";
  score.children = has("children") || has("kids") || has("child") ? "yes" : "no";
  return score;
}

function startListening() {
  const state = itemStates[activeIndex];
  if (!speechSupported || state.status === "listening") {
    return;
  }
  if (namingSessionEnded) {
    return;
  }
  if (captureContext && captureContext.type !== "naming") {
    if (recognition) {
      recognition.stop();
    }
    captureContext = null;
  }
  if (!recognition) {
    return;
  }
  try {
    isStopping = false;
    state.status = "listening";
    recognition.start();
    captureContext = { type: "naming" };
    updateUI();
  } catch (err) {
    console.error("Failed to start recognition", err);
  }
}

function stopListening() {
  const state = itemStates[activeIndex];
  if (state.status !== "listening") {
    return;
  }
  state.status = "finishing";
  isStopping = true;
  updateUI();
  if (recognition) {
    recognition.stop();
  }
}

function finalizeNamingCapture() {
  const state = itemStates[activeIndex];
  if (!state) {
    return;
  }
  evaluateMatch(state, items[activeIndex]);
  state.status = "completed";
  isStopping = false;
  captureContext = null;
  updateUI();
}

function handleRecognitionResult(event) {
  if (!captureContext) {
    return;
  }
  if (captureContext.type === "naming") {
    const state = itemStates[activeIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenizeFluency(transcript);
      state.entries.push({
        text: transcript.trim(),
        source: "Voice",
        timestamp: Date.now(),
        tokens
      });
      state.tokens.push(...tokens);
    }
    evaluateMatch(state, items[activeIndex]);
    state.status = "completed";
    updateUI();
    // Advance regardless of correctness; keep mic live between items.
    if (activeIndex === items.length - 1) {
      endNamingSession();
    } else {
      setTimeout(() => moveToIndex(activeIndex + 1, { force: true, keepListening: true }), 150);
    }
    return;
  }

  if (captureContext.type === "comprehension") {
    const state = compStates[compIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenizeFluency(transcript);
      state.entries.push({
        text: transcript.trim(),
        source: "Voice",
        timestamp: Date.now(),
        tokens
      });
      state.tokens.push(...tokens);
    }
    evaluateComprehension(state, comprehensionPrompts[compIndex]);
    state.status = "completed";
    updateComprehensionUI();
    if (compIndex === comprehensionPrompts.length - 1) {
      endComprehensionSession();
    } else {
      setTimeout(() => moveComprehension(compIndex + 1, { force: true, keepListening: true }), 150);
    }
    return;
  }

  if (captureContext.type === "spelling") {
    const state = spellingStates[spellIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenize(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        tokens
      });
      state.tokens.push(...tokens);
    }
    evaluateSpelling(state, spellingWords[spellIndex]);
    updateSpellingUI();
    return;
  }

  if (captureContext.type === "dots") {
    const state = dotsStates[dotsIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const digits = extractDigits(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        digits
      });
      state.digits.push(...digits);
    }
    evaluateDots(state, dotTrials[dotsIndex]);
    state.status = "completed";
    state.timestamp = Date.now();
    updateDotsUI();
    if (dotsIndex === dotTrials.length - 1) {
      endDotsSession();
    } else {
      setTimeout(() => moveDots(dotsIndex + 1, { force: true, keepListening: true }), 150);
    }
    return;
  }

  if (captureContext.type === "cubes") {
    const state = cubesStates[cubesIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const digits = extractDigits(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        digits
      });
      state.digits.push(...digits);
    }
    evaluateCubes(state, cubeTrials[cubesIndex]);
    state.status = "completed";
    state.timestamp = Date.now();
    updateCubesUI();
    if (cubesIndex === cubeTrials.length - 1) {
      endCubesSession();
    } else {
      setTimeout(() => moveCubes(cubesIndex + 1, { force: true, keepListening: true }), 150);
    }
    return;
  }

  if (captureContext.type === "sentence") {
    if (sentenceState.status !== "listening" && sentenceState.status !== "finishing") {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const text = transcript.trim();
      if (!text) {
        continue;
      }
      const idx = sentenceState.index;
      const input = dom.sentenceInputs[idx];
      if (input) {
        if (!input.value) {
          input.value = text;
        } else {
          input.value = `${input.value} ${text}`.trim();
        }
        sentenceState.responses[idx] = input.value;
      } else {
        sentenceState.responses[idx] = text;
      }
    }
    updateSentenceUI();
    return;
  }

  if (captureContext.type === "numberloc") {
    const state = numberlocStates[numberlocIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const digits = extractDigits(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        digits
      });
      if (digits.length) {
        state.digits.push(...digits);
      } else {
        // Fallback: show tokens so live transcript isn't empty
        const tokens = tokenize(transcript);
        state.digits.push(...tokens);
      }
    }
    evaluateNumberLoc(state, numberLocTrials[numberlocIndex]);
    state.status = "completed";
    state.timestamp = Date.now();
    updateNumberLocUI();
    if (numberlocIndex === numberLocTrials.length - 1) {
      endNumberLocSession();
    } else {
      setTimeout(() => moveNumberLoc(numberlocIndex + 1, { force: true, keepListening: true }), 150);
    }
    return;
  }

  if (captureContext.type === "digits") {
    const state = digitStates[digitsIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const digits = extractDigits(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        digits
      });
      state.digits.push(...digits);
    }
    if (!state.typedAnswer && state.entries.length) {
      state.typedAnswer = state.entries[state.entries.length - 1].text;
      dom.digitsManualInput.value = state.typedAnswer;
    }
    evaluateDigits(state, digitTrials[digitsIndex]);
    updateDigitsUI();
    if (!state.autoAdvanceTimer) {
      state.autoAdvanceTimer = setTimeout(() => {
        state.autoAdvanceTimer = null;
        if (state.status === "listening") {
          state.status = "finishing";
          isStopping = true;
          if (recognition) {
            recognition.stop();
          }
        }
      }, 600);
    }
    return;
  }

  if (captureContext.type === "cubes") {
    const state = cubesStates[cubesIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const digits = extractDigits(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        digits
      });
      state.digits.push(...digits);
    }
    evaluateCubes(state, cubeTrials[cubesIndex]);
    updateCubesUI();
    return;
  }

  if (captureContext.type === "fluencyT") {
    if (fluencyTState.status !== "listening" && fluencyTState.status !== "finishing") {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenize(transcript);
      tokens.forEach(token => {
        fluencyTState.tokens.push(token);
        const entry = {
          word: token,
          timestamp: Date.now()
        };
        fluencyTState.entries.push(entry);
        if (isValidFluencyWord(token, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)) {
          fluencyTState.uniqueWords.add(token);
        }
      });
    }
    updateFluencyTUI();
    return;
  }

  if (captureContext.type === "alternation") {
    const state = alternationStates[altIndex];
    if (!state || (state.status !== "listening" && state.status !== "finishing")) {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const { numbers, letters } = extractDigitsAndLetters(transcript);
      state.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        numbers,
        letters
      });
      state.numbers.push(...numbers);
      state.letters.push(...letters);
    }
    if (!state.typedAnswer && state.entries.length) {
      state.typedAnswer = state.entries[state.entries.length - 1].text;
    }
    evaluateAlternation(state, alternationTrials[altIndex]);
    updateAlternationUI();
    return;
  }

  if (captureContext.type === "fluency") {
    if (fluencyState.status !== "listening" && fluencyState.status !== "finishing") {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenize(transcript);
      tokens.forEach(token => {
        fluencyState.tokens.push(token);
        const entry = {
          word: token,
          timestamp: Date.now()
        };
        fluencyState.entries.push(entry);
        if (isValidFluencyWord(token)) {
          fluencyState.uniqueWords.add(token);
        }
      });
    }
    updateFluencyUI();
    return;
  }

  if (captureContext.type === "story") {
    if (storyState.status !== "listening" && storyState.status !== "finishing") {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenize(transcript);
      storyState.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        tokens
      });
      storyState.tokens.push(...tokens);
      if (storyState.manualEdited) {
        const trimmed = transcript.trim();
        if (trimmed) {
          storyState.manualTranscript = storyState.manualTranscript
            ? `${storyState.manualTranscript}\n${trimmed}`
            : trimmed;
          const textarea = dom.storyLiveWords ? dom.storyLiveWords.querySelector("textarea") : null;
          if (textarea) {
            textarea.value = storyState.manualTranscript;
          }
        }
      }
    }
    renderStoryUI();
    return;
  }

  if (captureContext.type === "storyDelayed") {
    if (delayedStoryState.status !== "listening" && delayedStoryState.status !== "finishing") {
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result.isFinal) {
        continue;
      }
      const transcript = result[0].transcript || "";
      const tokens = tokenize(transcript);
      delayedStoryState.entries.push({
        text: transcript.trim(),
        timestamp: Date.now(),
        tokens
      });
      delayedStoryState.tokens.push(...tokens);
      if (delayedStoryState.manualEdited) {
        const trimmed = transcript.trim();
        if (trimmed) {
          delayedStoryState.manualTranscript = delayedStoryState.manualTranscript
            ? `${delayedStoryState.manualTranscript}\n${trimmed}`
            : trimmed;
          const textarea = dom.delayedStoryLiveWords ? dom.delayedStoryLiveWords.querySelector("textarea") : null;
          if (textarea) {
            textarea.value = delayedStoryState.manualTranscript;
          }
        }
      }
    }
    renderDelayedStoryUI();
  }
}

function handleRecognitionError(event) {
  console.error("Speech recognition error", event.error);
  dom.speechWarning.textContent = `Speech recognition error: ${event.error}. Refresh and allow microphone access to continue.`;
  dom.speechWarning.classList.remove("hidden");
  updateButtons();
  isStopping = false;
  if (captureContext && captureContext.type === "naming") {
    const state = itemStates[activeIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      captureContext = null;
      updateUI();
    }
  } else if (captureContext && captureContext.type === "comprehension") {
    const state = compStates[compIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      captureContext = null;
      updateComprehensionUI();
    }
  } else if (captureContext && captureContext.type === "spelling") {
    const state = spellingStates[spellIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      captureContext = null;
      updateSpellingUI();
    }
  } else if (captureContext && captureContext.type === "fluency") {
    if (fluencyState.status === "listening" || fluencyState.status === "finishing") {
      fluencyState.status = "pending";
      fluencyState.tokens = [];
      fluencyState.entries = [];
      fluencyState.uniqueWords = new Set();
      resetFluencyAIReview(fluencyState);
      captureContext = null;
      if (fluencyState.timer.rafId) {
        cancelAnimationFrame(fluencyState.timer.rafId);
        fluencyState.timer.rafId = null;
      }
      fluencyState.timer.startTime = null;
      fluencyState.timer.remainingMs = 60000;
      updateFluencyUI();
    }
  } else if (captureContext && captureContext.type === "fluencyT") {
    if (fluencyTState.status === "listening" || fluencyTState.status === "finishing") {
      fluencyTState.status = "pending";
      fluencyTState.tokens = [];
      fluencyTState.entries = [];
      fluencyTState.uniqueWords = new Set();
      resetFluencyAIReview(fluencyTState);
      captureContext = null;
      if (fluencyTState.timer.rafId) {
        cancelAnimationFrame(fluencyTState.timer.rafId);
        fluencyTState.timer.rafId = null;
      }
      fluencyTState.timer.startTime = null;
      fluencyTState.timer.remainingMs = 60000;
      updateFluencyTUI();
    }
  } else if (captureContext && captureContext.type === "dots") {
    const state = dotsStates[dotsIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateDotsUI();
    }
  } else if (captureContext && captureContext.type === "numberloc") {
    const state = numberlocStates[numberlocIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateNumberLocUI();
    }
  } else if (captureContext && captureContext.type === "cubes") {
    const state = cubesStates[cubesIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateCubesUI();
    }
  } else if (captureContext && captureContext.type === "numberloc") {
    const state = numberlocStates[numberlocIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateNumberLocUI();
    }
  } else if (captureContext && captureContext.type === "digits") {
    const state = digitStates[digitsIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.typedAnswer = "";
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateDigitsUI();
    }
  } else if (captureContext && captureContext.type === "alternation") {
    const state = alternationStates[altIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.numbers = [];
      state.letters = [];
      state.entries = [];
      state.typedAnswer = "";
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      alternationHalted = false;
      updateAlternationUI();
    }
  } else if (captureContext && captureContext.type === "dots") {
    const state = dotsStates[dotsIndex];
    if (state.status === "listening" || state.status === "finishing") {
      state.status = "pending";
      state.digits = [];
      state.entries = [];
      state.candidate = "";
      state.correct = false;
      captureContext = null;
      updateDotsUI();
    }
  } else if (captureContext && captureContext.type === "story") {
    if (storyState.status === "listening" || storyState.status === "finishing") {
      storyState.status = "pending";
      storyState.tokens = [];
      storyState.entries = [];
      storyState.manualTranscript = "";
      storyState.manualEdited = false;
      storyState.editingLive = false;
      captureContext = null;
      renderStoryUI();
    }
  } else if (captureContext && captureContext.type === "storyDelayed") {
    if (delayedStoryState.status === "listening" || delayedStoryState.status === "finishing") {
      delayedStoryState.status = "pending";
      delayedStoryState.tokens = [];
      delayedStoryState.entries = [];
      delayedStoryState.manualTranscript = "";
      delayedStoryState.manualEdited = false;
      delayedStoryState.editingLive = false;
      captureContext = null;
      renderDelayedStoryUI();
    }
  }
}

function handleRecognitionEnd() {
  if (!captureContext) {
    return;
  }
  if (captureContext.type === "naming") {
    const state = itemStates[activeIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeNamingCapture();
    }
  } else if (captureContext.type === "comprehension") {
    const state = compStates[compIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeComprehensionCapture();
    }
  } else if (captureContext.type === "fluency") {
    if (fluencyState.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (fluencyState.status === "finishing") {
      finalizeFluencyCapture();
    }
  } else if (captureContext.type === "fluencyT") {
    if (fluencyTState.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (fluencyTState.status === "finishing") {
      finalizeFluencyTCapture();
    }
  } else if (captureContext.type === "dots") {
    const state = dotsStates[dotsIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeDotsCapture();
    }
  } else if (captureContext.type === "cubes") {
    const state = cubesStates[cubesIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeCubesCapture();
    }
  } else if (captureContext.type === "numberloc") {
    const state = numberlocStates[numberlocIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeNumberLocCapture();
    }
  } else if (captureContext.type === "sentence") {
    if (sentenceState.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (sentenceState.status === "finishing") {
      sentenceState.status = "pending";
      updateSentenceUI();
    }
  } else if (captureContext.type === "digits") {
    const state = digitStates[digitsIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeDigitsCapture();
    }
  } else if (captureContext.type === "alternation") {
    const state = alternationStates[altIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeAlternationCapture();
    }
  } else if (captureContext.type === "spelling") {
    const state = spellingStates[spellIndex];
    if (!state) {
      return;
    }
    if (state.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (state.status === "finishing") {
      finalizeSpellingCapture();
    }
  } else if (captureContext.type === "story") {
    if (storyState.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (storyState.status === "finishing") {
      finalizeStoryCapture();
    }
  } else if (captureContext.type === "storyDelayed") {
    if (delayedStoryState.status === "listening" && !isStopping) {
      recognition.start();
      return;
    }
    if (delayedStoryState.status === "finishing") {
      finalizeDelayedStoryCapture();
    }
  }
}

function resetCurrentItem() {
  const state = itemStates[activeIndex];
  if (state.status === "listening" && recognition) {
    recognition.stop();
    if (captureContext && captureContext.type === "naming") {
      captureContext = null;
    }
  }
  state.entries = [];
  state.tokens = [];
  state.matched = false;
  state.status = "pending";
  isStopping = false;
  namingSessionEnded = false;
  updateUI();
}

function addManualEntry() {
  if (!dom.manualInput) {
    return;
  }
  const value = (dom.manualInput.value || "").trim();
  if (!value) {
    return;
  }
  const state = itemStates[activeIndex];
  const tokens = tokenize(value);
  state.entries.push({
    text: value,
    source: "Typed",
    timestamp: Date.now(),
    tokens
  });
  state.tokens.push(...tokens);
  evaluateMatch(state, items[activeIndex]);
  dom.manualInput.value = "";
  updateUI();
}

function startInlineEdit(targetEl, initialValue, onCommit) {
  if (!targetEl || targetEl.querySelector("input")) {
    return;
  }
  const input = document.createElement("input");
  input.type = "text";
  input.className = "inline-editor";
  input.value = initialValue || "";
  targetEl.textContent = "";
  targetEl.appendChild(input);
  input.focus();
  input.select();

  let finished = false;
  const finalize = shouldCommit => {
    if (finished) {
      return;
    }
    finished = true;
    if (shouldCommit) {
      onCommit(input.value || "");
    } else {
      targetEl.textContent = initialValue || "";
    }
  };

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      finalize(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finalize(false);
    }
  });
  input.addEventListener("blur", () => finalize(true));
}

function reorderArray(values, fromIndex, toIndex) {
  if (!Array.isArray(values)) {
    return;
  }
  const length = values.length;
  if (fromIndex < 0 || fromIndex >= length || toIndex < 0 || toIndex >= length) {
    return;
  }
  const [moved] = values.splice(fromIndex, 1);
  values.splice(toIndex, 0, moved);
}

function resetFluencyAIReview(state) {
  state.aiReview = [];
  state.aiKeepMask = [];
  state.processedWords = [];
  state.processedNotes = [];
}

function buildFluencyAIReview(state, data = {}) {
  const rawWords = state.entries.map(entry => entry.word);
  const processedWords = Array.isArray(data.processed_words) ? data.processed_words : [];
  const rationales = data.rationale || {};
  const processedCanonical = processedWords.map(word => canonicalize(word)).filter(Boolean);
  const processedSet = new Set(processedCanonical);
  const rationaleByRemoved = new Map();

  if (rationales && typeof rationales === "object" && !Array.isArray(rationales)) {
    Object.entries(rationales).forEach(([word, reason]) => {
      const key = canonicalize(word);
      if (key && !rationaleByRemoved.has(key)) {
        rationaleByRemoved.set(key, String(reason || ""));
      }
    });
  }

  state.aiKeepMask = rawWords.map(word => {
    const canonical = canonicalize(word);
    return Boolean(canonical && processedSet.has(canonical));
  });
  state.aiReview = rawWords.map((word, idx) => {
    if (state.aiKeepMask[idx]) {
      return null;
    }
    const canonical = canonicalize(word);
    let rationale = "";
    if (Array.isArray(rationales) && rationales.length === rawWords.length) {
      rationale = rationales[idx] || "";
    } else if (Array.isArray(rationales) && rationales.length === processedWords.length) {
      rationale = rationales[idx] || "";
    } else {
      rationale = rationaleByRemoved.get(canonical) || "";
    }
    return {
      suggestion: "remove",
      decision: "pending",
      rationale
    };
  });
  state.processedWords = rawWords.filter((_, idx) => state.aiKeepMask[idx]);
  state.processedNotes = Array.isArray(rationales) ? rationales.slice() : [];
}

function resetFluencyAISuggestions(state) {
  const rawWords = state.entries.map(entry => entry.word);
  const keepMask = Array.isArray(state.aiKeepMask) ? state.aiKeepMask : [];
  if (!rawWords.length || keepMask.length !== rawWords.length) {
    return;
  }
  const nextReview = rawWords.map((_, idx) => {
    if (keepMask[idx]) {
      return null;
    }
    const existing = Array.isArray(state.aiReview) ? state.aiReview[idx] : null;
    return {
      suggestion: "remove",
      decision: "pending",
      rationale: existing && existing.rationale ? existing.rationale : "",
      manualNote: ""
    };
  });
  state.aiReview = nextReview;
  state.processedWords = rawWords.filter((_, idx) => keepMask[idx]);
}

function updateFluencyProcessedFromReview(state) {
  if (!Array.isArray(state.aiReview) || state.aiReview.length !== state.entries.length) {
    return;
  }
  const reviewed = [];
  state.entries.forEach((entry, idx) => {
    const word = entry ? entry.word : "";
    if (!word) {
      return;
    }
    const keepByAI = Array.isArray(state.aiKeepMask) ? state.aiKeepMask[idx] : false;
    const review = state.aiReview[idx];
    if (keepByAI) {
      if (review && review.decision === "accepted") {
        return;
      }
      reviewed.push(word);
      return;
    }
    if (review && review.decision === "rejected") {
      reviewed.push(word);
    }
  });
  state.processedWords = reviewed;
}

function isFluencyExcluded(state, idx) {
  const keepByAI = Array.isArray(state.aiKeepMask) ? state.aiKeepMask[idx] : false;
  const review = Array.isArray(state.aiReview) ? state.aiReview[idx] : null;
  if (keepByAI) {
    return Boolean(review && review.decision === "accepted");
  }
  if (review) {
    return review.decision !== "rejected";
  }
  return false;
}

function toggleFluencySuggestion(state, idx) {
  const keepByAI = Array.isArray(state.aiKeepMask) ? state.aiKeepMask[idx] : false;
  if (keepByAI) {
    if (!state.aiReview[idx]) {
      state.aiReview[idx] = {
        suggestion: "keep",
        decision: "pending",
        rationale: ""
      };
    }
    const current = state.aiReview[idx].decision;
    state.aiReview[idx].decision = current === "accepted" ? "pending" : "accepted";
    if (state.aiReview[idx].decision === "pending") {
      state.aiReview[idx].manualNote = "";
    }
    updateFluencyProcessedFromReview(state);
    return;
  }
  setFluencyReviewDecision(state, idx, "rejected");
  const review = state.aiReview && state.aiReview[idx];
  if (review && review.decision === "rejected") {
    review.manualNote = "";
  }
}

function setFluencyManualNote(state, idx, note) {
  if (!Array.isArray(state.aiReview)) {
    state.aiReview = [];
  }
  if (!state.aiReview[idx]) {
    state.aiReview[idx] = {
      suggestion: "keep",
      decision: "pending",
      rationale: ""
    };
  }
  state.aiReview[idx].manualNote = note;
}

function normalizeManualNote(value = "") {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.replace(/^(exclude|keep)\s*-\s*/i, "");
}

function getSuggestionNote(review) {
  if (!review) {
    return "";
  }
  if (review.manualNote) {
    return review.manualNote.trim();
  }
  if (review.rationale) {
    return review.rationale.trim();
  }
  return "";
}

function getFluencyScoredLabel(state, idx) {
  const entry = state.entries[idx];
  const word = entry ? entry.word || "" : "";
  if (!word) {
    return "";
  }
  return isFluencyExcluded(state, idx) ? "—" : word;
}

function setFluencyReviewDecision(state, index, decision) {
  if (!state.aiReview || !state.aiReview[index]) {
    return;
  }
  const current = state.aiReview[index].decision;
  state.aiReview[index].decision = current === decision ? "pending" : decision;
  updateFluencyProcessedFromReview(state);
}

function applyFluencyReorder(state, listType, fromIndex, toIndex) {
  if (!state) {
    return;
  }
  if (listType === "raw") {
    reorderArray(state.entries, fromIndex, toIndex);
    reorderArray(state.tokens, fromIndex, toIndex);
    reorderArray(state.aiReview, fromIndex, toIndex);
    reorderArray(state.aiKeepMask, fromIndex, toIndex);
    updateFluencyProcessedFromReview(state);
    return;
  }
  if (listType === "scored") {
    if (!Array.isArray(state.processedWords)) {
      state.processedWords = [];
    }
    reorderArray(state.processedWords, fromIndex, toIndex);
  }
}

function attachFluencyDragHandlers(cell, options, onDrop) {
  if (!cell) {
    return;
  }
  cell.draggable = true;
  cell.classList.add("draggable-word");
  cell.addEventListener("dragstart", event => {
    fluencyDragState = {
      scope: options.scope,
      listType: options.listType,
      index: options.index
    };
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
    cell.classList.add("dragging");
  });
  cell.addEventListener("dragend", () => {
    cell.classList.remove("dragging");
    fluencyDragState = null;
  });
  cell.addEventListener("dragover", event => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    cell.classList.add("drag-over");
  });
  cell.addEventListener("dragleave", () => {
    cell.classList.remove("drag-over");
  });
  cell.addEventListener("drop", event => {
    event.preventDefault();
    cell.classList.remove("drag-over");
    if (!fluencyDragState) {
      return;
    }
    if (fluencyDragState.scope !== options.scope || fluencyDragState.listType !== options.listType) {
      return;
    }
    if (fluencyDragState.index === options.index) {
      return;
    }
    onDrop(fluencyDragState.index, options.index);
  });
}

function recomputeFluencyUniqueWords(state, validator) {
  state.uniqueWords = new Set();
  state.tokens.forEach(token => {
    if (validator(token)) {
      state.uniqueWords.add(token);
    }
  });
}

function removeFluencyEntry(state, entryIndex, validator) {
  if (entryIndex < 0 || entryIndex >= state.tokens.length) {
    return;
  }
  state.tokens.splice(entryIndex, 1);
  state.entries.splice(entryIndex, 1);
  if (Array.isArray(state.aiReview)) {
    state.aiReview.splice(entryIndex, 1);
  }
  if (Array.isArray(state.aiKeepMask)) {
    state.aiKeepMask.splice(entryIndex, 1);
  }
  recomputeFluencyUniqueWords(state, validator);
  updateFluencyProcessedFromReview(state);
}

function applyFluencyEntryEdit(state, entryIndex, rawValue, validator) {
  if (entryIndex < 0 || entryIndex >= state.tokens.length) {
    return;
  }
  const tokens = tokenizeFluency(rawValue);
  if (!tokens.length) {
    state.tokens.splice(entryIndex, 1);
    state.entries.splice(entryIndex, 1);
  } else {
    const token = tokens[0];
    state.tokens[entryIndex] = token;
    if (state.entries[entryIndex]) {
      state.entries[entryIndex].word = token;
    } else {
      state.entries[entryIndex] = { word: token, timestamp: Date.now() };
    }
  }
  recomputeFluencyUniqueWords(state, validator);
  resetFluencyAIReview(state);
}

function addFluencyTokens(state, rawValue, validator) {
  const tokens = tokenizeFluency(rawValue);
  if (!tokens.length) {
    return;
  }
  const timestamp = Date.now();
  tokens.forEach(token => {
    state.tokens.push(token);
    state.entries.push({ word: token, timestamp });
  });
  recomputeFluencyUniqueWords(state, validator);
  resetFluencyAIReview(state);
}

function addFluencyManualEntry() {
  if (!dom.fluencyManualInput) {
    return;
  }
  const value = (dom.fluencyManualInput.value || "").trim();
  if (!value) {
    return;
  }
  addFluencyTokens(fluencyState, value, token => isValidFluencyWord(token));
  dom.fluencyManualInput.value = "";
  updateFluencyUI();
}

function addFluencyTManualEntry() {
  if (!dom.fluencyTManualInput) {
    return;
  }
  const value = (dom.fluencyTManualInput.value || "").trim();
  if (!value) {
    return;
  }
  addFluencyTokens(fluencyTState, value, token =>
    isValidFluencyWord(token, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
  );
  dom.fluencyTManualInput.value = "";
  updateFluencyTUI();
}

function moveToIndex(index, options = {}) {
  const { force = false, keepListening = false } = options;
  if (namingSessionEnded && (!captureContext || captureContext.type === "naming")) {
    return;
  }
  const currentState = itemStates[activeIndex];
  if (!force && currentState.status === "listening") {
    return;
  }
  if (currentState.status === "pending" && currentState.entries.length) {
    currentState.status = "completed";
  }
  loadItem(index);
  if (keepListening && captureContext && captureContext.type === "naming") {
    const nextState = itemStates[activeIndex];
    nextState.status = "listening";
    updateUI();
  }
}

function updateUI() {
  updateStatusBadge();
  updateProgress();
  renderLiveWords();
  renderLog();
  renderMatchStatus();
  updateButtons();
  updateComprehensionUI();
  renderStoryUI();
  renderDelayedStoryUI();
  updateFluencyUI();
  updateFluencyTUI();
  updateDigitsUI();
  updateAlternationUI();
  updateDotsUI();
  updateCubesUI();
  updateNumberLocUI();
  updateSocialUI();
  updateSocialBUI();
  updateDelayedRecognitionUI();
  checkNamingCompletion();
  checkComprehensionCompletion();
  checkDigitsCompletion();
  checkDotsCompletion();
  checkCubesCompletion();
  checkNumberLocCompletion();
  syncParticipantView();
  scheduleSessionSave();
}

function updateStatusBadge() {
  const state = itemStates[activeIndex];
  const status = state.status;
  let label = "Idle";
  if (status === "listening") {
    label = "Listening";
  } else if (status === "finishing") {
    label = "Finishing";
  } else if (status === "completed") {
    label = "Completed";
  }
  dom.status.textContent = label;
  const className =
    status === "listening" ? "status-badge listening" : status === "completed" ? "status-badge completed" : "status-badge";
  dom.status.className = className;
}

function updateProgress() {
  dom.progressCount.textContent = `${activeIndex + 1} / ${items.length}`;
  const completed = itemStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / items.length) * 100);
  dom.progressFill.style.width = `${percent}%`;
}

function updateComprehensionUI() {
  if (!dom.compImageGrid) {
    return;
  }
  const state = compStates[compIndex];
  const question = comprehensionPrompts[compIndex];
  const buttons = dom.compImageGrid.querySelectorAll(".image-option");
  buttons.forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.imageId === state.selectedId);
  });

  const completed = compStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / comprehensionPrompts.length) * 100);
  dom.compProgressFill.style.width = `${percent}%`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  } else if (state.selectedId || state.typedAnswer) {
    statusLabel = "Pending submit";
  }
  dom.compStatus.textContent = statusLabel;
  dom.compStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : "status-badge";

  dom.compSubmitBtn.disabled = (state.status === "completed" && state.correct) || comprehensionSessionEnded;
  dom.compNextBtn.disabled = comprehensionSessionEnded;
  dom.compResetBtn.disabled = comprehensionSessionEnded;
  if (dom.compStartBtn) {
    dom.compStartBtn.disabled = !speechSupported || state.status === "listening" || comprehensionSessionEnded;
  }
  if (dom.compStopBtn) {
    dom.compStopBtn.disabled = state.status !== "listening";
  }

  renderComprehensionLog();
  renderComprehensionLive();
}

function updateSpellingUI() {
  if (!dom.spellStatus) {
    return;
  }
  const state = spellingStates[spellIndex];
  const completed = spellingStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / spellingWords.length) * 100);
  dom.spellProgressFill.style.width = `${percent}%`;
  dom.spellProgressCount.textContent = `${spellIndex + 1} / ${spellingWords.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  }
  dom.spellStatus.textContent = statusLabel;
  dom.spellStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.spellStartBtn) {
    dom.spellStartBtn.disabled = !speechSupported || state.status === "listening";
  }
  if (dom.spellStopBtn) {
    dom.spellStopBtn.disabled = state.status !== "listening";
  }
  if (dom.spellSubmitBtn) {
    dom.spellSubmitBtn.disabled = state.status === "listening";
  }
  if (dom.spellNextBtn) {
    dom.spellNextBtn.disabled = state.status === "listening";
  }
  if (dom.spellResetBtn) {
    dom.spellResetBtn.disabled = state.status === "listening";
  }

  renderSpellingLive();
  renderSpellingMatch();
  renderSpellingLog();
}

function updateFluencyUI() {
  const statusEl = document.getElementById("fluency-status");
  const countdownEl = document.getElementById("fluency-countdown");
  if (!statusEl || !countdownEl) {
    return;
  }
  const status = fluencyState.status;
  let label = "Idle";
  if (status === "listening") {
    label = "Listening";
  } else if (status === "finishing") {
    label = "Finishing";
  } else if (status === "completed") {
    label = "Completed";
  }
  statusEl.textContent = label;
  statusEl.className =
    status === "completed"
      ? "status-badge completed"
      : status === "listening"
      ? "status-badge listening"
      : "status-badge";

  updateFluencyCountdown();
  const startBtn = document.getElementById("fluency-start-btn");
  const stopBtn = document.getElementById("fluency-stop-btn");
  const resetBtn = document.getElementById("fluency-reset-btn");
  if (startBtn) {
    startBtn.disabled = !speechSupported || status === "listening";
  }
  if (stopBtn) {
    stopBtn.disabled = status !== "listening";
  }
  if (resetBtn) {
    resetBtn.disabled = status === "listening";
  }

  const scoreEl = document.getElementById("fluency-score");
  if (scoreEl) {
    scoreEl.textContent = `${fluencyState.uniqueWords.size} valid words`;
  }

  updateFluencyReadout(fluencyState, {
    timeId: "fluency-read-time",
    vfiId: "fluency-vfi",
    calcId: "fluency-vfi-calc",
    scoreId: "fluency-vfi-score"
  });

  const live = document.getElementById("fluency-live-words");
  if (live) {
    if (!fluencyState.tokens.length) {
      live.innerHTML = '<span class="muted">No words captured yet.</span>';
    } else {
      const frag = document.createDocumentFragment();
      const startIndex = Math.max(0, fluencyState.tokens.length - 20);
      fluencyState.tokens.slice(-20).forEach((token, idx) => {
        const chip = document.createElement("span");
        chip.className = "editable-word word-chip";
        const label = document.createElement("span");
        label.textContent = token;
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        const tokenIndex = startIndex + idx;
        chip.addEventListener("dblclick", () => {
          startInlineEdit(label, token, value => {
            applyFluencyEntryEdit(fluencyState, tokenIndex, value, tokenValue =>
              isValidFluencyWord(tokenValue)
            );
            updateFluencyUI();
          });
        });
        chip.addEventListener("contextmenu", event => {
          event.preventDefault();
          removeFluencyEntry(fluencyState, tokenIndex, tokenValue => isValidFluencyWord(tokenValue));
          updateFluencyUI();
        });
        removeBtn.addEventListener("click", () => {
          removeFluencyEntry(fluencyState, tokenIndex, tokenValue => isValidFluencyWord(tokenValue));
          updateFluencyUI();
        });
        attachFluencyDragHandlers(
          chip,
          { scope: "fluency", listType: "raw", index: tokenIndex },
          (fromIndex, toIndex) => {
            applyFluencyReorder(fluencyState, "raw", fromIndex, toIndex);
            updateFluencyUI();
          }
        );
        chip.append(label, removeBtn);
        frag.appendChild(chip);
      });
      live.innerHTML = "";
      live.appendChild(frag);
    }
  }

  const logBody = document.getElementById("fluency-log-body");
  if (logBody) {
    const rawWords = fluencyState.entries.map(entry => entry.word);
    const processed = Array.isArray(fluencyState.processedWords) ? fluencyState.processedWords : [];
    const aiReview = Array.isArray(fluencyState.aiReview) ? fluencyState.aiReview : [];
    const rowCount = rawWords.length;
    if (!rowCount) {
      logBody.innerHTML = '<tr class="empty-row"><td colspan="4">No responses yet.</td></tr>';
    } else {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < rowCount; i += 1) {
        const tr = document.createElement("tr");
        const num = document.createElement("td");
        num.textContent = i + 1;
        const rawTd = document.createElement("td");
        rawTd.classList.add("raw-cell");
        const rawLabel = document.createElement("span");
        rawLabel.textContent = rawWords[i] || "";
        rawTd.appendChild(rawLabel);
        if (rawWords[i]) {
          rawTd.classList.add("editable-word");
          attachInlineEdit(rawLabel, rawWords[i] || "", newText => {
            applyFluencyEntryEdit(fluencyState, i, newText, tokenValue =>
              isValidFluencyWord(tokenValue)
            );
            updateFluencyUI();
          });
          const deleteBtn = document.createElement("button");
          deleteBtn.type = "button";
          deleteBtn.className = "remove-btn";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => {
            removeFluencyEntry(fluencyState, i, tokenValue => isValidFluencyWord(tokenValue));
            updateFluencyUI();
          });
          rawTd.appendChild(deleteBtn);
          attachFluencyDragHandlers(
            rawTd,
            { scope: "fluency", listType: "raw", index: i },
            (fromIndex, toIndex) => {
              applyFluencyReorder(fluencyState, "raw", fromIndex, toIndex);
              updateFluencyUI();
            }
          );
        }
        const aiTd = document.createElement("td");
        aiTd.className = "ai-cell";
        const review = aiReview.length === rawWords.length ? aiReview[i] : null;
        const keepByAI = Array.isArray(fluencyState.aiKeepMask) ? fluencyState.aiKeepMask[i] : false;
        if (review || keepByAI) {
          const toggleBtn = document.createElement("button");
          toggleBtn.type = "button";
          const isKeep = !isFluencyExcluded(fluencyState, i);
          const note = getSuggestionNote(review);
          let clickTimer = null;
          toggleBtn.className = `ai-toggle ai-pill ${isKeep ? "keep" : "remove"}`;
          const labelText = isKeep ? "Keep" : note ? `Exclude - ${note}` : "Exclude";
          const labelSpan = document.createElement("span");
          labelSpan.textContent = labelText;
          toggleBtn.title =
            (review && review.rationale) || (keepByAI ? "AI suggested keep." : "No rationale provided.");
          toggleBtn.addEventListener("click", event => {
            if (toggleBtn.dataset.ignoreClick === "true") {
              return;
            }
            if (clickTimer) {
              window.clearTimeout(clickTimer);
            }
            clickTimer = window.setTimeout(() => {
              toggleFluencySuggestion(fluencyState, i);
              updateFluencyUI();
              clickTimer = null;
            }, 220);
          });
          const handleEdit = event => {
            event.preventDefault();
            event.stopPropagation();
            if (clickTimer) {
              window.clearTimeout(clickTimer);
              clickTimer = null;
            }
            toggleBtn.dataset.ignoreClick = "true";
            window.setTimeout(() => {
              delete toggleBtn.dataset.ignoreClick;
            }, 250);
            const currentNote = note;
            startInlineEdit(labelSpan, currentNote, value => {
              const cleaned = normalizeManualNote(value);
              setFluencyManualNote(fluencyState, i, cleaned);
              updateFluencyUI();
            });
          };
          labelSpan.addEventListener("dblclick", handleEdit);
          aiTd.addEventListener("dblclick", handleEdit);
          toggleBtn.append(labelSpan);
          aiTd.append(toggleBtn);
        } else {
          aiTd.textContent = "—";
        }
        const scoredTd = document.createElement("td");
        scoredTd.textContent = getFluencyScoredLabel(fluencyState, i);
        tr.append(num, rawTd, scoredTd, aiTd);
        frag.appendChild(tr);
      }
      logBody.innerHTML = "";
      logBody.appendChild(frag);
    }
    if (dom.fluencyRawTotal) {
      dom.fluencyRawTotal.textContent = rawWords.length ? rawWords.length : "";
    }
    if (dom.fluencyProcessedTotal) {
      dom.fluencyProcessedTotal.textContent = processed.length ? processed.length : "";
    }
  if (dom.fluencySectionScore) {
      dom.fluencySectionScore.textContent = `${getFluencyVFIScore(fluencyState, processed.length)}`;
    }
  }
  renderFluencyNotes();
  updateScorecard();
}

function renderFluencyLists() {
  renderFluencyNotes();
}

function renderFluencyNotes() {
  if (!dom.fluencyProcessedNotes) {
    return;
  }
  const notes = fluencyState.processedNotes || [];
  if (!notes.length) {
    dom.fluencyProcessedNotes.innerHTML = '<span class="muted">No AI Assistant notes yet.</span>';
  } else {
    dom.fluencyProcessedNotes.textContent = notes.join(", ");
  }
}

function openRawListWindow(state, title) {
  const rawWords = state.entries.map(entry => entry.word).filter(Boolean);
  if (participantChannel) {
    participantChannel.postMessage({ type: "fluency-raw", payload: { words: rawWords, title } });
  } else {
    try {
      localStorage.setItem(
        `${participantChannelName}-fluency`,
        JSON.stringify({ type: "fluency-raw", payload: { words: rawWords, title } })
      );
    } catch (err) {}
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function startReadTimer(state, onUpdate) {
  if (!state.readTimer) {
    return;
  }
  if (state.readTimer.running) {
    return;
  }
  state.readTimer.running = true;
  state.readTimer.startTime = Date.now();
  if (!state.readTimer.baseMs) {
    state.readTimer.baseMs = state.readTimer.elapsedMs || 0;
  }
  state.readTimer.intervalId = setInterval(() => {
    state.readTimer.elapsedMs = Date.now() - state.readTimer.startTime + (state.readTimer.baseMs || 0);
    if (onUpdate) {
      onUpdate();
    }
  }, 100);
  if (onUpdate) {
    onUpdate();
  }
}

function stopReadTimer(state, onUpdate) {
  if (!state.readTimer || !state.readTimer.running) {
    return;
  }
  state.readTimer.elapsedMs = Date.now() - state.readTimer.startTime + (state.readTimer.baseMs || 0);
  state.readTimer.baseMs = state.readTimer.elapsedMs;
  state.readTimer.running = false;
  if (state.readTimer.intervalId) {
    clearInterval(state.readTimer.intervalId);
    state.readTimer.intervalId = null;
  }
  if (onUpdate) {
    onUpdate();
  }
  scheduleSessionSave();
}

function resetReadTimer(state, onUpdate) {
  if (!state.readTimer) {
    return;
  }
  if (state.readTimer.intervalId) {
    clearInterval(state.readTimer.intervalId);
    state.readTimer.intervalId = null;
  }
  state.readTimer.running = false;
  state.readTimer.startTime = null;
  state.readTimer.elapsedMs = 0;
  state.readTimer.baseMs = 0;
  if (onUpdate) {
    onUpdate();
  }
  scheduleSessionSave();
}

function updateFluencyReadout(state, ids) {
  const timerEl = document.getElementById(ids.timeId);
  const vfiEl = document.getElementById(ids.vfiId);
  const calcEl = ids.calcId ? document.getElementById(ids.calcId) : null;
  const scoreEl = document.getElementById(ids.scoreId);
  if (!timerEl || !vfiEl || !scoreEl) {
    return;
  }
  const seconds = (state.readTimer?.elapsedMs || 0) / 1000;
  timerEl.textContent = `${seconds.toFixed(1)}s`;
  const correct = Array.isArray(state.processedWords) ? state.processedWords.length : 0;
  const vfi = getFluencyVfi(seconds, correct);
  vfiEl.textContent = vfi === null ? "—" : vfi.toFixed(2);
  if (calcEl) {
    calcEl.textContent = vfi === null ? "VFI = (60 − t) / correct" : `VFI = (60 − ${seconds.toFixed(1)}) / ${correct}`;
  }
  scoreEl.textContent = `${getFluencyVFIScore(state, correct)}`;
}

function getFluencyVfi(seconds, correctWords) {
  if (!correctWords) {
    return null;
  }
  const remaining = Math.max(0, 60 - seconds);
  return remaining / correctWords;
}

function getFluencyVFIScore(state, correctWords) {
  const vfi = getFluencyVfi((state.readTimer?.elapsedMs || 0) / 1000, correctWords);
  if (vfi === null) {
    return 0;
  }
  if (vfi >= 12) return 0;
  if (vfi >= 10) return 2;
  if (vfi >= 8) return 4;
  if (vfi >= 6) return 6;
  if (vfi >= 4) return 8;
  if (vfi >= 2) return 10;
  return 12;
}

function renderFluencyTNotes() {
  if (!dom.fluencyTProcessedNotes) {
    return;
  }
  const notes = fluencyTState.processedNotes || [];
  if (!notes.length) {
    dom.fluencyTProcessedNotes.innerHTML = '<span class="muted">No AI Assistant notes yet.</span>';
  } else {
    dom.fluencyTProcessedNotes.textContent = notes.join(", ");
  }
}

function updateFluencyTUI() {
  const statusEl = dom.fluencyTStatus;
  const countdownEl = dom.fluencyTCountdown;
  if (!statusEl || !countdownEl) {
    return;
  }
  const status = fluencyTState.status;
  let label = "Idle";
  if (status === "listening") {
    label = "Listening";
  } else if (status === "finishing") {
    label = "Finishing";
  } else if (status === "completed") {
    label = "Completed";
  }
  statusEl.textContent = label;
  statusEl.className =
    status === "completed"
      ? "status-badge completed"
      : status === "listening"
      ? "status-badge listening"
      : "status-badge";

  updateFluencyTCountdown();
  if (dom.fluencyTStartBtn) {
    dom.fluencyTStartBtn.disabled = !speechSupported || status === "listening";
  }
  if (dom.fluencyTStopBtn) {
    dom.fluencyTStopBtn.disabled = status !== "listening";
  }
  if (dom.fluencyTResetBtn) {
    dom.fluencyTResetBtn.disabled = status === "listening";
  }

  if (dom.fluencyTScore) {
    dom.fluencyTScore.textContent = `${fluencyTState.uniqueWords.size} valid words`;
  }

  updateFluencyReadout(fluencyTState, {
    timeId: "fluency-t-read-time",
    vfiId: "fluency-t-vfi",
    calcId: "fluency-t-vfi-calc",
    scoreId: "fluency-t-vfi-score"
  });

  if (dom.fluencyTLiveWords) {
    if (!fluencyTState.tokens.length) {
      dom.fluencyTLiveWords.innerHTML = '<span class="muted">No words captured yet.</span>';
    } else {
      const frag = document.createDocumentFragment();
      const startIndex = Math.max(0, fluencyTState.tokens.length - 20);
      fluencyTState.tokens.slice(-20).forEach((token, idx) => {
        const chip = document.createElement("span");
        chip.className = "editable-word word-chip";
        const label = document.createElement("span");
        label.textContent = token;
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        const tokenIndex = startIndex + idx;
        chip.addEventListener("dblclick", () => {
          startInlineEdit(label, token, value => {
            applyFluencyEntryEdit(fluencyTState, tokenIndex, value, tokenValue =>
              isValidFluencyWord(tokenValue, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
            );
            updateFluencyTUI();
          });
        });
        chip.addEventListener("contextmenu", event => {
          event.preventDefault();
          removeFluencyEntry(fluencyTState, tokenIndex, tokenValue =>
            isValidFluencyWord(tokenValue, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
          );
          updateFluencyTUI();
        });
        removeBtn.addEventListener("click", () => {
          removeFluencyEntry(fluencyTState, tokenIndex, tokenValue =>
            isValidFluencyWord(tokenValue, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
          );
          updateFluencyTUI();
        });
        attachFluencyDragHandlers(
          chip,
          { scope: "fluencyT", listType: "raw", index: tokenIndex },
          (fromIndex, toIndex) => {
            applyFluencyReorder(fluencyTState, "raw", fromIndex, toIndex);
            updateFluencyTUI();
          }
        );
        chip.append(label, removeBtn);
        frag.appendChild(chip);
      });
      dom.fluencyTLiveWords.innerHTML = "";
      dom.fluencyTLiveWords.appendChild(frag);
    }
  }

  if (dom.fluencyTLogBody) {
    const rawWords = fluencyTState.entries.map(entry => entry.word);
    const processed = Array.isArray(fluencyTState.processedWords) ? fluencyTState.processedWords : [];
    const aiReview = Array.isArray(fluencyTState.aiReview) ? fluencyTState.aiReview : [];
    const rowCount = rawWords.length;
    if (!rowCount) {
      dom.fluencyTLogBody.innerHTML = '<tr class="empty-row"><td colspan="4">No responses yet.</td></tr>';
    } else {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < rowCount; i += 1) {
        const tr = document.createElement("tr");
        const num = document.createElement("td");
        num.textContent = i + 1;
        const rawTd = document.createElement("td");
        rawTd.classList.add("raw-cell");
        const rawLabel = document.createElement("span");
        rawLabel.textContent = rawWords[i] || "";
        rawTd.appendChild(rawLabel);
        if (rawWords[i]) {
          rawTd.classList.add("editable-word");
          attachInlineEdit(rawLabel, rawWords[i] || "", newText => {
            applyFluencyEntryEdit(fluencyTState, i, newText, tokenValue =>
              isValidFluencyWord(tokenValue, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
            );
            updateFluencyTUI();
          });
          const deleteBtn = document.createElement("button");
          deleteBtn.type = "button";
          deleteBtn.className = "remove-btn";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => {
            removeFluencyEntry(fluencyTState, i, tokenValue =>
              isValidFluencyWord(tokenValue, FLUENCY_T_LETTER, FLUENCY_T_LENGTH)
            );
            updateFluencyTUI();
          });
          rawTd.appendChild(deleteBtn);
          attachFluencyDragHandlers(
            rawTd,
            { scope: "fluencyT", listType: "raw", index: i },
            (fromIndex, toIndex) => {
              applyFluencyReorder(fluencyTState, "raw", fromIndex, toIndex);
              updateFluencyTUI();
            }
          );
        }
        const aiTd = document.createElement("td");
        aiTd.className = "ai-cell";
        const review = aiReview.length === rawWords.length ? aiReview[i] : null;
        const keepByAI = Array.isArray(fluencyTState.aiKeepMask) ? fluencyTState.aiKeepMask[i] : false;
        if (review || keepByAI) {
          const toggleBtn = document.createElement("button");
          toggleBtn.type = "button";
          const isKeep = !isFluencyExcluded(fluencyTState, i);
          const note = getSuggestionNote(review);
          let clickTimer = null;
          toggleBtn.className = `ai-toggle ai-pill ${isKeep ? "keep" : "remove"}`;
          const labelText = isKeep ? "Keep" : note ? `Exclude - ${note}` : "Exclude";
          const labelSpan = document.createElement("span");
          labelSpan.textContent = labelText;
          toggleBtn.title =
            (review && review.rationale) || (keepByAI ? "AI suggested keep." : "No rationale provided.");
          toggleBtn.addEventListener("click", event => {
            if (toggleBtn.dataset.ignoreClick === "true") {
              return;
            }
            if (clickTimer) {
              window.clearTimeout(clickTimer);
            }
            clickTimer = window.setTimeout(() => {
              toggleFluencySuggestion(fluencyTState, i);
              updateFluencyTUI();
              clickTimer = null;
            }, 220);
          });
          const handleEdit = event => {
            event.preventDefault();
            event.stopPropagation();
            if (clickTimer) {
              window.clearTimeout(clickTimer);
              clickTimer = null;
            }
            toggleBtn.dataset.ignoreClick = "true";
            window.setTimeout(() => {
              delete toggleBtn.dataset.ignoreClick;
            }, 250);
            const currentNote = note;
            startInlineEdit(labelSpan, currentNote, value => {
              const cleaned = normalizeManualNote(value);
              setFluencyManualNote(fluencyTState, i, cleaned);
              updateFluencyTUI();
            });
          };
          labelSpan.addEventListener("dblclick", handleEdit);
          aiTd.addEventListener("dblclick", handleEdit);
          toggleBtn.append(labelSpan);
          aiTd.append(toggleBtn);
        } else {
          aiTd.textContent = "—";
        }
        const scoredTd = document.createElement("td");
        scoredTd.textContent = getFluencyScoredLabel(fluencyTState, i);
        tr.append(num, rawTd, scoredTd, aiTd);
        frag.appendChild(tr);
      }
      dom.fluencyTLogBody.innerHTML = "";
      dom.fluencyTLogBody.appendChild(frag);
    }
    if (dom.fluencyTRawTotal) {
      dom.fluencyTRawTotal.textContent = rawWords.length ? `${rawWords.length}` : "0";
    }
    if (dom.fluencyTProcessedTotal) {
      dom.fluencyTProcessedTotal.textContent = processed.length ? `${processed.length}` : "0";
    }
    if (dom.fluencyTSectionScore) {
      dom.fluencyTSectionScore.textContent = `${getFluencyVFIScore(fluencyTState, processed.length)}`;
    }
  }
  renderFluencyTNotes();
  updateScorecard();
}

function renderComprehensionLog() {
  if (!dom.compLogBody) {
    return;
  }
  const frag = document.createDocumentFragment();
  let correctCount = 0;
  comprehensionPrompts.forEach((q, idx) => {
    const tr = document.createElement("tr");
    const state = compStates[idx];
    const expected = itemLookup[q.answerId];

    const correctTd = document.createElement("td");
    correctTd.textContent = `${idx + 1}. ${expected ? expected.label : ""}`;

    const responseTd = document.createElement("td");
    const latestEntry = state.entries
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    const selectionLabel = state.selectedId ? itemLookup[state.selectedId].label : "";
    const spoken = latestEntry ? latestEntry.text : "";
    const combined = [selectionLabel, spoken].filter(Boolean).join(" / ");
    responseTd.textContent = combined || "";
    responseTd.classList.add("editable-cell");
    attachInlineEdit(responseTd, combined, newText => {
      const trimmed = newText.trim();
      state.selectedId = null; // manual override
      if (trimmed) {
        const newEntry = {
          text: trimmed,
          source: "Edited",
          timestamp: Date.now(),
          tokens: tokenize(trimmed)
        };
        state.entries.push(newEntry);
        state.tokens.push(...newEntry.tokens);
      }
      evaluateComprehension(state, q);
      updateComprehensionUI();
    });

    const scoreTd = document.createElement("td");
    let pillClass = "pending";
    let pillText = "Pending";
    if (state.entries.length || state.selectedId) {
      const matched = evaluateComprehension(state, q);
      pillClass = matched ? "success" : "miss";
      pillText = matched ? "Correct" : "Incorrect";
      if (matched) {
        correctCount += 1;
      }
    }
    const pill = document.createElement("span");
    pill.className = `match-pill ${pillClass}`;
    pill.textContent = pillText;
    scoreTd.appendChild(pill);

    const notesTd = document.createElement("td");
    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.value = state.notes || "";
    notesInput.placeholder = "Notes";
    notesInput.dataset.index = idx;
    notesInput.addEventListener("input", event => {
      const targetState = compStates[Number(event.target.dataset.index)];
      targetState.notes = event.target.value;
    });
    notesTd.appendChild(notesInput);

    tr.append(correctTd, responseTd, scoreTd, notesTd);
    frag.appendChild(tr);
  });

  dom.compLogBody.innerHTML = "";
  dom.compLogBody.appendChild(frag);
  if (dom.compSectionScore) {
    dom.compSectionScore.textContent = `${correctCount}`;
  }
}

function renderComprehensionLive() {
  if (!dom.compLiveWords) {
    return;
  }
  const state = compStates[compIndex];
  if (!state.tokens.length) {
    dom.compLiveWords.innerHTML = '<span class="muted">No words captured yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.tokens.slice(-12).forEach(token => {
    const chip = document.createElement("span");
    chip.textContent = token;
    frag.appendChild(chip);
  });
  dom.compLiveWords.innerHTML = "";
  dom.compLiveWords.appendChild(frag);
}

function renderSpellingLive() {
  if (!dom.spellLiveWords) {
    return;
  }
  const state = spellingStates[spellIndex];
  if (!state.tokens.length) {
    dom.spellLiveWords.innerHTML = '<span class="muted">No words captured yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.tokens.slice(-20).forEach(token => {
    const chip = document.createElement("span");
    chip.textContent = token;
    frag.appendChild(chip);
  });
  dom.spellLiveWords.innerHTML = "";
  dom.spellLiveWords.appendChild(frag);
}

function renderSpellingMatch() {
  if (!dom.spellMatchStatus || !dom.spellCandidate) {
    return;
  }
  const state = spellingStates[spellIndex];
  if (!state.tokens.length && !state.typedAnswer) {
    dom.spellMatchStatus.textContent = "No response yet";
    dom.spellCandidate.textContent = "";
    return;
  }
  dom.spellCandidate.textContent = state.spelledCandidate
    ? `Heard/typed: ${state.spelledCandidate}`
    : state.typedAnswer
    ? `Typed: ${state.typedAnswer}`
    : "";
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.spellMatchStatus.innerHTML = "";
  dom.spellMatchStatus.appendChild(pill);
}

function renderSpellingLog() {
  if (!dom.spellLogBody) {
    return;
  }
  const frag = document.createDocumentFragment();
  let total = 0;
  spellingStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const correctTd = document.createElement("td");
    const label = spellingWordLabels[idx] || spellingWords[idx].charAt(0) + spellingWords[idx].slice(1).toLowerCase();
    correctTd.textContent = `${idx + 1}. ${label}`;
    const targetTd = document.createElement("td");
    targetTd.textContent =
      state.spelledCandidate || state.typedAnswer || (state.entries.slice(-1)[0]?.text || "");
    targetTd.classList.add("editable-cell");
    attachInlineEdit(targetTd, targetTd.textContent, newText => {
      const trimmed = newText.trim();
      state.typedAnswer = trimmed;
      state.spelledCandidate = trimmed;
      evaluateSpelling(state, spellingWords[idx]);
      updateSpellingUI();
    });
    const resultTd = document.createElement("td");
    const pill = document.createElement("span");
    const statusClass = state.status === "completed" ? (state.correct ? "success" : "miss") : "pending";
    pill.className = `match-pill ${statusClass}`;
    pill.textContent = state.status === "completed" ? (state.correct ? "Correct" : "Incorrect") : "Pending";
    resultTd.appendChild(pill);
    if (state.status === "completed" && state.correct) {
      total += 1;
    }
    tr.append(correctTd, targetTd, resultTd);
    frag.appendChild(tr);
  });
  dom.spellLogBody.innerHTML = "";
  dom.spellLogBody.appendChild(frag);
  if (dom.spellSectionScore) {
    dom.spellSectionScore.textContent = `${total}`;
  }
}

function renderStoryUI() {
  if (!dom.storyStatus) {
    return;
  }
  const status = storyState.status;
  let label = "Idle";
  if (status === "listening") {
    label = "Listening";
  } else if (status === "finishing") {
    label = "Finishing";
  } else if (status === "completed") {
    label = "Completed";
  }
  dom.storyStatus.textContent = label;
  dom.storyStatus.className =
    status === "completed"
      ? "status-badge completed"
      : status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.storyStartBtn) {
    dom.storyStartBtn.disabled = !speechSupported || status === "listening";
  }
  if (dom.storyStopBtn) {
    dom.storyStopBtn.disabled = status !== "listening";
  }
  if (dom.storyResetBtn) {
    dom.storyResetBtn.disabled = status === "listening";
  }

  if (dom.storyLiveWords) {
    if (storyState.editingLive) {
      if (!dom.storyLiveWords.querySelector("textarea")) {
        const textarea = document.createElement("textarea");
        textarea.className = "story-live-edit";
        textarea.value = getStoryTranscript();
        dom.storyLiveWords.innerHTML = "";
        dom.storyLiveWords.appendChild(textarea);
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        const previousValue = textarea.value;
        textarea.addEventListener("keydown", event => {
          if (event.key === "Escape") {
            event.preventDefault();
            storyState.manualTranscript = previousValue;
            storyState.manualEdited = true;
            storyState.editingLive = false;
            renderStoryUI();
          }
        });
        textarea.addEventListener("input", () => {
          storyState.manualTranscript = textarea.value;
          storyState.manualEdited = true;
        });
        textarea.addEventListener("blur", () => {
          storyState.manualTranscript = textarea.value;
          storyState.manualEdited = true;
          storyState.editingLive = false;
          renderStoryUI();
        });
      }
    } else {
      const transcript = getStoryTranscript();
      dom.storyLiveWords.textContent = transcript || "No words captured yet.";
    }
  }

  if (dom.storyLogBody) {
    if (!storyState.entries.length) {
      dom.storyLogBody.innerHTML = '<tr class="empty-row"><td colspan="3">No responses yet.</td></tr>';
    } else {
      const frag = document.createDocumentFragment();
      storyState.entries
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
        .forEach((entry, idx) => {
          const tr = document.createElement("tr");
          const numberTd = document.createElement("td");
          numberTd.textContent = idx + 1;
          const textTd = document.createElement("td");
          textTd.textContent = entry.text || "(blank)";
          const timeTd = document.createElement("td");
          timeTd.textContent = formatTime(entry.timestamp);
          tr.append(numberTd, textTd, timeTd);
          frag.appendChild(tr);
        });
      dom.storyLogBody.innerHTML = "";
      dom.storyLogBody.appendChild(frag);
    }
  }
}

function renderDelayedStoryUI() {
  if (!dom.delayedStoryStatus) {
    return;
  }
  const status = delayedStoryState.status;
  let label = "Idle";
  if (status === "listening") {
    label = "Listening";
  } else if (status === "finishing") {
    label = "Finishing";
  } else if (status === "completed") {
    label = "Completed";
  }
  dom.delayedStoryStatus.textContent = label;
  dom.delayedStoryStatus.className =
    status === "completed"
      ? "status-badge completed"
      : status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.delayedStoryStartBtn) {
    dom.delayedStoryStartBtn.disabled = !speechSupported || status === "listening";
  }
  if (dom.delayedStoryStopBtn) {
    dom.delayedStoryStopBtn.disabled = status !== "listening";
  }
  if (dom.delayedStoryResetBtn) {
    dom.delayedStoryResetBtn.disabled = status === "listening";
  }

  if (dom.delayedStoryLiveWords) {
    if (delayedStoryState.editingLive) {
      if (!dom.delayedStoryLiveWords.querySelector("textarea")) {
        const textarea = document.createElement("textarea");
        textarea.className = "story-live-edit";
        textarea.value = getDelayedStoryTranscript();
        dom.delayedStoryLiveWords.innerHTML = "";
        dom.delayedStoryLiveWords.appendChild(textarea);
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        const previousValue = textarea.value;
        textarea.addEventListener("keydown", event => {
          if (event.key === "Escape") {
            event.preventDefault();
            delayedStoryState.manualTranscript = previousValue;
            delayedStoryState.manualEdited = true;
            delayedStoryState.editingLive = false;
            renderDelayedStoryUI();
          }
        });
        textarea.addEventListener("input", () => {
          delayedStoryState.manualTranscript = textarea.value;
          delayedStoryState.manualEdited = true;
        });
        textarea.addEventListener("blur", () => {
          delayedStoryState.manualTranscript = textarea.value;
          delayedStoryState.manualEdited = true;
          delayedStoryState.editingLive = false;
          renderDelayedStoryUI();
        });
      }
    } else {
      const transcript = getDelayedStoryTranscript();
      dom.delayedStoryLiveWords.textContent = transcript || "No words captured yet.";
    }
  }
}

function updateDigitsUI() {
  if (!dom.digitsStatus) {
    return;
  }
  const state = digitStates[digitsIndex];
  const completed = digitStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / digitTrials.length) * 100);
  dom.digitsProgressFill.style.width = `${percent}%`;
  dom.digitsProgressCount.textContent = `${digitsIndex + 1} / ${digitTrials.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  }
  dom.digitsStatus.textContent = statusLabel;
  dom.digitsStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.digitsStartBtn) {
    dom.digitsStartBtn.disabled = !speechSupported || state.status === "listening" || digitsSessionEnded;
  }
  if (dom.digitsStopBtn) {
    dom.digitsStopBtn.disabled = state.status !== "listening";
  }
  if (dom.digitsPrevBtn) {
    dom.digitsPrevBtn.disabled = state.status === "listening" || digitsSessionEnded;
  }
  if (dom.digitsNextBtn) {
    dom.digitsNextBtn.disabled = state.status === "listening" || digitsSessionEnded;
  }
  if (dom.digitsResetBtn) {
    dom.digitsResetBtn.disabled = state.status === "listening";
  }

  renderDigitsLive();
  renderDigitsMatch();
  renderDigitsLog();
}

function renderDigitsLive() {
  if (!dom.digitsLiveWords) {
    return;
  }
  const state = digitStates[digitsIndex];
  const recentEntries = state.entries.slice(-4);
  if (!recentEntries.length) {
    dom.digitsLiveWords.innerHTML = '<span class="muted">No responses yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  recentEntries.forEach(entry => {
    const chip = document.createElement("span");
    chip.textContent = entry.text || "(blank)";
    frag.appendChild(chip);
  });
  dom.digitsLiveWords.innerHTML = "";
  dom.digitsLiveWords.appendChild(frag);
}

function renderDigitsMatch() {
  if (!dom.digitsMatchStatus || !dom.digitsCandidate) {
    return;
  }
  const state = digitStates[digitsIndex];
  if (!state.digits.length && !state.typedAnswer) {
    dom.digitsMatchStatus.textContent = "No response yet";
    dom.digitsCandidate.textContent = "";
    return;
  }
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.digitsMatchStatus.innerHTML = "";
  dom.digitsMatchStatus.appendChild(pill);
  dom.digitsCandidate.textContent = state.candidate ? `Heard/typed: ${state.candidate}` : "";
}

function renderDigitsLog() {
  if (!dom.digitsLogBody) {
    return;
  }
  let correctCount = 0;
  const frag = document.createDocumentFragment();
  digitStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const trialTd = document.createElement("td");
    trialTd.textContent = idx + 1;
    const targetTd = document.createElement("td");
    targetTd.textContent = digitTrials[idx];
    const respTd = document.createElement("td");
    const lastEntry = state.entries.slice(-1)[0];
    respTd.textContent = state.candidate || (lastEntry?.text || "");
    respTd.classList.add("editable-cell");
    attachInlineEdit(respTd, respTd.textContent, newText => {
      const trimmed = newText.trim();
      state.typedAnswer = trimmed;
      state.candidate = trimmed;
      if (trimmed) {
        state.entries.push({
          text: trimmed,
          timestamp: Date.now(),
          digits: extractDigits(trimmed)
        });
      }
      evaluateDigits(state, digitTrials[idx]);
      state.status = "completed";
      updateDigitsUI();
    });
    const resultTd = document.createElement("td");
    if (state.status === "completed") {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Incorrect";
      resultTd.appendChild(pill);
      if (state.correct) {
        correctCount += 1;
      }
    }
    tr.append(trialTd, targetTd, respTd, resultTd);
    frag.appendChild(tr);
  });
  dom.digitsLogBody.innerHTML = "";
  dom.digitsLogBody.appendChild(frag);
  if (dom.digitsSectionScore) {
    dom.digitsSectionScore.textContent = `${correctCount}`;
  }
  updateScorecard();
}

function evaluateDigits(state, targetSeq) {
  const targetDigits = targetSeq.split(/\s+/).filter(Boolean);
  const reversed = [...targetDigits].reverse().join("");
  const voiceCandidate = (state.digits || []).join("");
  const typedCandidate = extractDigits(state.typedAnswer || "").join("");
  const candidate = voiceCandidate || typedCandidate;
  state.candidate = candidate;
  state.correct = candidate === reversed;
}

function extractDigits(text = "") {
  const wordMap = {
    ZERO: "0",
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9"
  };
  return text
    .toUpperCase()
    .split(/[\s,.-]+/)
    .map(part => part.trim())
    .flatMap(part => {
      const digits = part.replace(/[^0-9]/g, "").split("").filter(Boolean);
      if (digits.length) {
        return digits;
      }
      if (wordMap[part]) {
        return [wordMap[part]];
      }
      return [];
    })
    .filter(Boolean);
}

function updateAlternationUI() {
  if (!dom.altStatus) {
    return;
  }
  const state = alternationStates[altIndex];
  const completed = alternationStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / alternationTrials.length) * 100);
  dom.altProgressFill.style.width = `${percent}%`;
  dom.altProgressCount.textContent = `${altIndex + 1} / ${alternationTrials.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  } else if (alternationHalted) {
    statusLabel = "Stopped after error";
  }
  dom.altStatus.textContent = statusLabel;
  dom.altStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  const disabledDueToHalt = alternationHalted && state.status !== "listening";
  if (dom.altStartBtn) {
    dom.altStartBtn.disabled = !speechSupported || state.status === "listening";
  }
  if (dom.altStopBtn) {
    dom.altStopBtn.disabled = state.status !== "listening";
  }
  if (dom.altSubmitBtn) {
    dom.altSubmitBtn.disabled = state.status === "listening" || disabledDueToHalt;
  }
  if (dom.altNextBtn) {
    dom.altNextBtn.disabled = state.status === "listening" || disabledDueToHalt;
  }
  if (dom.altResetBtn) {
    dom.altResetBtn.disabled = state.status === "listening";
  }

  renderAlternationLive();
  renderAlternationMatch();
  renderAlternationLog();
}

function renderAlternationLive() {
  if (!dom.altLiveWords) {
    return;
  }
  const state = alternationStates[altIndex];
  const combined = [...state.numbers, ...state.letters];
  if (!combined.length) {
    dom.altLiveWords.innerHTML = '<span class="muted">No entries captured yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  combined.slice(-12).forEach(token => {
    const chip = document.createElement("span");
    chip.textContent = token;
    frag.appendChild(chip);
  });
  dom.altLiveWords.innerHTML = "";
  dom.altLiveWords.appendChild(frag);
}

function renderAlternationMatch() {
  if (!dom.altMatchStatus || !dom.altCandidate) {
    return;
  }
  const state = alternationStates[altIndex];
  if (!state.numbers.length && !state.letters.length && !state.typedAnswer) {
    dom.altMatchStatus.textContent = "No response yet";
    dom.altCandidate.textContent = "";
    return;
  }
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.altMatchStatus.innerHTML = "";
  dom.altMatchStatus.appendChild(pill);
  if (alternationHalted && !state.correct) {
    dom.altCandidate.textContent = "Administration stopped after an error. Press Reset to restart.";
  } else {
    dom.altCandidate.textContent = state.candidate ? `Heard/typed: ${state.candidate}` : "";
  }
}

function renderAlternationLog() {
  if (!dom.altLogBody) {
    return;
  }
  let correctCount = 0;
  const frag = document.createDocumentFragment();
  alternationStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const trialTd = document.createElement("td");
    trialTd.textContent = idx + 1;
    const targetTd = document.createElement("td");
    targetTd.textContent = `${alternationTrials[idx].number}-${alternationTrials[idx].letter}`;
    const respTd = document.createElement("td");
    respTd.textContent = state.candidate || state.typedAnswer || (state.entries.slice(-1)[0]?.text || "");
    respTd.classList.add("editable-cell");
    attachInlineEdit(respTd, respTd.textContent, newText => {
      const trimmed = newText.trim();
      state.typedAnswer = trimmed;
      state.candidate = trimmed;
      if (trimmed) {
        state.entries.push({
          text: trimmed,
          timestamp: Date.now(),
          numbers: extractDigits(trimmed),
          letters: extractLetters(trimmed)
        });
      }
      evaluateAlternation(state, alternationTrials[idx]);
      state.status = "completed";
      updateAlternationUI();
    });
    const resultTd = document.createElement("td");
    if (state.status === "completed") {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Incorrect";
      resultTd.appendChild(pill);
      if (state.correct) {
        correctCount += 1;
      }
    }
    tr.append(trialTd, targetTd, respTd, resultTd);
    frag.appendChild(tr);
  });
  dom.altLogBody.innerHTML = "";
  dom.altLogBody.appendChild(frag);
  if (dom.altSectionScore) {
    dom.altSectionScore.textContent = `${correctCount}`;
  }
  updateScorecard();
}

function evaluateAlternation(state, trial) {
  const requiredNumber = String(trial.number);
  const requiredLetter = trial.letter.toUpperCase();
  const numbers = state.numbers || [];
  const letters = state.letters || [];
  const typedNums = extractDigits(state.typedAnswer || "");
  const typedLetters = extractLetters(state.typedAnswer || "");
  const allNumbers = [...numbers, ...typedNums];
  const allLetters = [...letters, ...typedLetters];
  const numberMatch = allNumbers.includes(requiredNumber);
  const letterMatch = allLetters.includes(requiredLetter);
  const candidateParts = [];
  if (allNumbers.length) {
    candidateParts.push(allNumbers.join(" "));
  }
  if (allLetters.length) {
    candidateParts.push(allLetters.join(" "));
  }
  state.candidate = candidateParts.join(" / ");
  state.correct = Boolean(numberMatch && letterMatch);
  if (!state.correct) {
    alternationHalted = true;
  }
}

function extractDigitsAndLetters(text = "") {
  return {
    numbers: extractDigits(text),
    letters: extractLetters(text)
  };
}

function extractLetters(text = "") {
  if (!text) {
    return [];
  }
  return text
    .toUpperCase()
    .split(/[\s,.-]+/)
    .map(part => part.trim())
    .flatMap(part => {
      if (/^[A-Z]$/.test(part)) {
        return [part];
      }
      if (/^[A-Z]{2,}$/.test(part)) {
        return part.split("");
      }
      return [];
    })
    .filter(Boolean);
}

function updateCubesUI() {
  if (!dom.cubesStatus) {
    return;
  }
  const state = cubesStates[cubesIndex];
  const completed = cubesStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / cubeTrials.length) * 100);
  dom.cubesProgressFill.style.width = `${percent}%`;
  dom.cubesProgressCount.textContent = `${cubesIndex + 1} / ${cubeTrials.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  }
  dom.cubesStatus.textContent = statusLabel;
  dom.cubesStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.cubesStartBtn) {
    dom.cubesStartBtn.disabled = !speechSupported || state.status === "listening" || cubesSessionEnded;
  }
  if (dom.cubesStopBtn) {
    dom.cubesStopBtn.disabled = state.status !== "listening";
  }
  if (dom.cubesNextBtn) {
    dom.cubesNextBtn.disabled = state.status === "listening" || cubesSessionEnded;
  }
  if (dom.cubesResetBtn) {
    dom.cubesResetBtn.disabled = state.status === "listening";
  }

  renderCubesLive();
  renderCubesMatch();
  renderCubesLog();
  syncParticipantView();
}

function renderCubesLive() {
  if (!dom.cubesLiveWords) {
    return;
  }
  const state = cubesStates[cubesIndex];
  if (!state.digits.length) {
    dom.cubesLiveWords.innerHTML = '<span class="muted">No responses yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.digits.slice(-10).forEach(d => {
    const chip = document.createElement("span");
    chip.textContent = d;
    frag.appendChild(chip);
  });
  dom.cubesLiveWords.innerHTML = "";
  dom.cubesLiveWords.appendChild(frag);
}

function renderCubesMatch() {
  if (!dom.cubesMatchStatus || !dom.cubesCandidate) {
    return;
  }
  const state = cubesStates[cubesIndex];
  if (!state.digits.length && !state.entries.length) {
    dom.cubesMatchStatus.textContent = "No response yet";
    dom.cubesCandidate.textContent = "";
    return;
  }
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.cubesMatchStatus.innerHTML = "";
  dom.cubesMatchStatus.appendChild(pill);
  dom.cubesCandidate.textContent = state.candidate ? `Heard: ${state.candidate}` : "";
}

function renderCubesLog() {
  if (!dom.cubesLogBody) {
    return;
  }
  const frag = document.createDocumentFragment();
  cubesStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const boxTd = document.createElement("td");
    boxTd.textContent = idx + 1;
    const targetTd = document.createElement("td");
    targetTd.textContent = cubeTrials[idx].answer;
    const respTd = document.createElement("td");
    respTd.textContent = state.candidate || (state.entries.slice(-1)[0]?.text || "");
    respTd.classList.add("editable-cell");
    attachInlineEdit(respTd, respTd.textContent, newText => {
      const trimmed = newText.trim();
      state.candidate = trimmed;
      if (trimmed) {
        state.entries.push({
          text: trimmed,
          timestamp: Date.now(),
          digits: extractDigits(trimmed)
        });
        state.digits = extractDigits(trimmed);
      }
      evaluateNumberLoc(state, numberLocTrials[idx]);
      state.status = "completed";
      updateNumberLocUI();
    });
    respTd.classList.add("editable-cell");
    attachInlineEdit(respTd, respTd.textContent, newText => {
      const trimmed = newText.trim();
      state.candidate = trimmed;
      if (trimmed) {
        state.entries.push({
          text: trimmed,
          timestamp: Date.now(),
          digits: extractDigits(trimmed)
        });
        state.digits = extractDigits(trimmed);
      }
      evaluateCubes(state, cubeTrials[idx]);
      state.status = "completed";
      updateCubesUI();
    });
    respTd.classList.add("editable-cell");
    attachInlineEdit(respTd, respTd.textContent, newText => {
      const trimmed = newText.trim();
      state.candidate = trimmed;
      if (trimmed) {
        state.entries.push({
          text: trimmed,
          timestamp: Date.now(),
          digits: extractDigits(trimmed)
        });
        state.digits = extractDigits(trimmed);
      }
      evaluateDots(state, dotTrials[idx]);
      state.status = "completed";
      updateDotsUI();
    });
    const resultTd = document.createElement("td");
    if (state.status === "completed") {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Recorded";
      resultTd.appendChild(pill);
    } else {
      resultTd.textContent = "";
    }
    tr.append(boxTd, targetTd, respTd, resultTd);
    frag.appendChild(tr);
  });
  dom.cubesLogBody.innerHTML = "";
  dom.cubesLogBody.appendChild(frag);
  if (dom.cubesSectionScore) {
    const totalCorrect = cubesStates.filter(s => s.correct).length;
    dom.cubesSectionScore.textContent = `${totalCorrect}`;
  }
  updateScorecard();
}

function evaluateCubes(state, trial) {
  const expected = trial.answer;
  const candidate = (state.digits || []).join("") || (state.entries.slice(-1)[0]?.text || "");
  state.candidate = candidate;
  state.correct = candidate === expected;
}

function updateNumberLocUI() {
  if (!dom.numberlocStatus) {
    return;
  }
  const state = numberlocStates[numberlocIndex];
  const completed = numberlocStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / numberLocTrials.length) * 100);
  dom.numberlocProgressFill.style.width = `${percent}%`;
  dom.numberlocProgressCount.textContent = `${numberlocIndex + 1} / ${numberLocTrials.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  }
  dom.numberlocStatus.textContent = statusLabel;
  dom.numberlocStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.numberlocStartBtn) {
    dom.numberlocStartBtn.disabled = !speechSupported || state.status === "listening" || numberlocSessionEnded;
  }
  if (dom.numberlocStopBtn) {
    dom.numberlocStopBtn.disabled = state.status !== "listening";
  }
  if (dom.numberlocNextBtn) {
    dom.numberlocNextBtn.disabled = state.status === "listening" || numberlocSessionEnded;
  }
  if (dom.numberlocResetBtn) {
    dom.numberlocResetBtn.disabled = state.status === "listening";
  }

  renderNumberLocLive();
  renderNumberLocMatch();
  renderNumberLocLog();
  syncParticipantView();
}

function renderNumberLocLive() {
  if (!dom.numberlocLiveWords) {
    return;
  }
  const state = numberlocStates[numberlocIndex];
  if (!state.digits.length) {
    dom.numberlocLiveWords.innerHTML = '<span class="muted">No responses yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.digits.slice(-10).forEach(d => {
    const chip = document.createElement("span");
    chip.textContent = d;
    frag.appendChild(chip);
  });
  dom.numberlocLiveWords.innerHTML = "";
  dom.numberlocLiveWords.appendChild(frag);
}

function renderNumberLocMatch() {
  if (!dom.numberlocMatchStatus || !dom.numberlocCandidate) {
    return;
  }
  const state = numberlocStates[numberlocIndex];
  if (!state.digits.length && !state.entries.length) {
    dom.numberlocMatchStatus.textContent = "No response yet";
    dom.numberlocCandidate.textContent = "";
    return;
  }
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.numberlocMatchStatus.innerHTML = "";
  dom.numberlocMatchStatus.appendChild(pill);
  dom.numberlocCandidate.textContent = state.candidate ? `Heard: ${state.candidate}` : "";
}

function renderNumberLocLog() {
  if (!dom.numberlocLogBody) {
    return;
  }
  const frag = document.createDocumentFragment();
  numberlocStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const boxTd = document.createElement("td");
    boxTd.textContent = idx + 1;
    const targetTd = document.createElement("td");
    targetTd.textContent = numberLocTrials[idx].answer;
    const respTd = document.createElement("td");
    respTd.textContent = state.candidate || (state.entries.slice(-1)[0]?.text || "");
    const resultTd = document.createElement("td");
    if (state.status === "completed") {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Recorded";
      resultTd.appendChild(pill);
    } else {
      resultTd.textContent = "";
    }
    tr.append(boxTd, targetTd, respTd, resultTd);
    frag.appendChild(tr);
  });
  dom.numberlocLogBody.innerHTML = "";
  dom.numberlocLogBody.appendChild(frag);
  if (dom.numberlocSectionScore) {
    const totalCorrect = numberlocStates.filter(s => s.correct).length;
    dom.numberlocSectionScore.textContent = `${totalCorrect}`;
  }
  updateScorecard();
}

function setupSocial() {
  updateSocialUI();
}

function setupSocialB() {
  updateSocialBUI();
}

function setupDelayedRecognition() {
  updateDelayedRecognitionUI();
}

function updateSocialUI() {
  if (!dom.socialGrid || !dom.socialProgressFill || !dom.socialProgressCount || !dom.socialStatus) {
    return;
  }
  const state = socialStates[socialIndex];
  const completed = socialStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / socialTrials.length) * 100);
  dom.socialProgressFill.style.width = `${percent}%`;
  dom.socialProgressCount.textContent = `${socialIndex + 1} / ${socialTrials.length}`;
  if (dom.socialPrevBtn) {
    dom.socialPrevBtn.disabled = socialIndex === 0;
  }
  if (dom.socialNextBtn) {
    dom.socialNextBtn.disabled = socialIndex >= socialTrials.length - 1;
  }

  let statusLabel = "Idle";
  if (state.status === "completed") {
    statusLabel = "Recorded";
  } else if (state.selectedIndex !== null) {
    statusLabel = "Selected";
  }
  dom.socialStatus.textContent = statusLabel;
  dom.socialStatus.className =
    state.status === "completed"
      ? "status-badge completed"
      : state.selectedIndex !== null
      ? "status-badge listening"
      : "status-badge";

  renderSocialGrid();
  renderSocialLog();
  scheduleSessionSave();
  syncParticipantView();
}

function renderSocialGrid() {
  if (!dom.socialGrid) {
    return;
  }
  const state = socialStates[socialIndex];
  const trial = socialTrials[socialIndex];
  if (!trial) {
    dom.socialGrid.innerHTML = "";
    return;
  }
  dom.socialGrid.innerHTML = "";
  trial.images.forEach((src, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "social-option";
    if (state.selectedIndex === idx) {
      btn.classList.add("selected");
    }
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Social cognition option ${idx + 1}`;
    btn.appendChild(img);
    btn.addEventListener("click", () => {
      state.selectedIndex = idx;
      state.status = "completed";
      state.timestamp = Date.now();
      if (socialIndex < socialTrials.length - 1) {
        moveSocial(socialIndex + 1);
      } else {
        updateSocialUI();
      }
    });
    dom.socialGrid.appendChild(btn);
  });
}

function renderSocialLog() {
  if (!dom.socialLogBody) {
    return;
  }
  const completed = socialStates.filter(s => s.status === "completed");
  if (!completed.length) {
    dom.socialLogBody.innerHTML = '<tr class="empty-row"><td colspan="2">No responses yet.</td></tr>';
    return;
  }
  const frag = document.createDocumentFragment();
  socialStates.forEach((state, idx) => {
    if (state.status !== "completed") {
      return;
    }
    const tr = document.createElement("tr");
    const cardTd = document.createElement("td");
    cardTd.textContent = idx + 1;
    const chosenTd = document.createElement("td");
    chosenTd.textContent = state.selectedIndex !== null ? `Image ${state.selectedIndex + 1}` : "—";
    tr.append(cardTd, chosenTd);
    frag.appendChild(tr);
  });
  dom.socialLogBody.innerHTML = "";
  dom.socialLogBody.appendChild(frag);
}

function moveSocial(nextIndex) {
  socialIndex = Math.max(0, Math.min(socialTrials.length - 1, nextIndex));
  updateSocialUI();
}

function resetSocial() {
  const state = socialStates[socialIndex];
  state.status = "pending";
  state.selectedIndex = null;
  state.timestamp = null;
  updateSocialUI();
}

function resetSocialAll() {
  socialStates.forEach(state => {
    state.status = "pending";
    state.selectedIndex = null;
    state.timestamp = null;
  });
  updateSocialUI();
}

function updateSocialBUI() {
  if (!dom.socialBGrid || !dom.socialBProgressFill || !dom.socialBProgressCount || !dom.socialBStatus) {
    return;
  }
  const state = socialBStates[socialBIndex];
  const completed = socialBStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / socialBTrials.length) * 100);
  dom.socialBProgressFill.style.width = `${percent}%`;
  dom.socialBProgressCount.textContent = `${socialBIndex + 1} / ${socialBTrials.length}`;
  if (dom.socialBPrevBtn) {
    dom.socialBPrevBtn.disabled = socialBIndex === 0;
  }
  if (dom.socialBNextBtn) {
    dom.socialBNextBtn.disabled = socialBIndex >= socialBTrials.length - 1;
  }

  let statusLabel = "Idle";
  if (state.status === "completed") {
    statusLabel = "Recorded";
  } else if (state.selectedIndex !== null) {
    statusLabel = "Selected";
  }
  dom.socialBStatus.textContent = statusLabel;
  dom.socialBStatus.className =
    state.status === "completed"
      ? "status-badge completed"
      : state.selectedIndex !== null
      ? "status-badge listening"
      : "status-badge";

  renderSocialBGrid();
  renderSocialBLog();
  updateSocialBScore();
  scheduleSessionSave();
  syncParticipantView();
}

function renderSocialBGrid() {
  if (!dom.socialBGrid) {
    return;
  }
  const state = socialBStates[socialBIndex];
  const trial = socialBTrials[socialBIndex];
  if (!trial) {
    dom.socialBGrid.innerHTML = "";
    if (dom.socialBFace) dom.socialBFace.removeAttribute("src");
    return;
  }
  dom.socialBGrid.innerHTML = "";
  trial.images.forEach((src, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "social-option";
    if (state.selectedIndex === idx) {
      btn.classList.add("selected");
    }
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Social cognition option ${idx + 1}`;
    btn.appendChild(img);
    btn.addEventListener("click", () => {
      state.selectedIndex = idx;
      state.status = "completed";
      state.timestamp = Date.now();
      scoreSocialBState(socialBIndex);
      if (socialBIndex < socialBTrials.length - 1) {
        moveSocialB(socialBIndex + 1);
      } else {
        updateSocialBUI();
      }
    });
    dom.socialBGrid.appendChild(btn);
  });
  if (dom.socialBFace) {
    dom.socialBFace.src = trial.face;
  }
}

function renderSocialBLog() {
  if (!dom.socialBLogBody) {
    return;
  }
  const completed = socialBStates.filter(s => s.status === "completed");
  if (!completed.length) {
    dom.socialBLogBody.innerHTML = '<tr class="empty-row"><td colspan="4">No responses yet.</td></tr>';
    return;
  }
  const frag = document.createDocumentFragment();
  socialBStates.forEach((state, idx) => {
    if (state.status !== "completed") {
      return;
    }
    const tr = document.createElement("tr");
    const cardTd = document.createElement("td");
    cardTd.textContent = idx + 1;
    const chosenTd = document.createElement("td");
    chosenTd.textContent = state.selectedIndex !== null ? `Image ${state.selectedIndex + 1}` : "—";
    const resultTd = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = `match-pill clickable ${state.correct === true ? "success" : "miss"}`;
    pill.textContent = state.correct === true ? "Correct" : "Incorrect";
    pill.addEventListener("click", () => {
      if (state.selectedIndex === null) {
        return;
      }
      const nextCorrect = state.correct === true ? false : true;
      state.manualResult = true;
      state.correct = nextCorrect;
      state.egocentric =
        !nextCorrect && socialStates[idx]?.selectedIndex !== null && socialStates[idx]?.selectedIndex === state.selectedIndex;
      if (!state.manualScore) {
        state.score = nextCorrect ? 2 : state.egocentric ? 0 : 1;
      }
      updateSocialBUI();
    });
    resultTd.appendChild(pill);
    const scoreTd = document.createElement("td");
    const scoreText = state.score !== null && state.score !== undefined ? `${state.score}` : "0";
    scoreTd.textContent = scoreText;
    scoreTd.classList.add("editable-cell");
    attachInlineEdit(scoreTd, scoreText, newText => {
      const nextValue = parseInt(newText, 10);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      state.manualScore = true;
      state.score = Math.max(0, Math.min(2, nextValue));
      updateSocialBUI();
    });
    tr.append(cardTd, chosenTd, resultTd, scoreTd);
    frag.appendChild(tr);
  });
  dom.socialBLogBody.innerHTML = "";
  dom.socialBLogBody.appendChild(frag);
}

function moveSocialB(nextIndex) {
  socialBIndex = Math.max(0, Math.min(socialBTrials.length - 1, nextIndex));
  updateSocialBUI();
}

function resetSocialB() {
  const state = socialBStates[socialBIndex];
  state.status = "pending";
  state.selectedIndex = null;
  state.timestamp = null;
  state.correct = null;
  state.score = null;
  state.egocentric = null;
  state.manualResult = false;
  state.manualScore = false;
  updateSocialBUI();
}

function resetSocialBAll() {
  socialBStates.forEach(state => {
    state.status = "pending";
    state.selectedIndex = null;
    state.timestamp = null;
    state.correct = null;
    state.score = null;
    state.egocentric = null;
    state.manualResult = false;
    state.manualScore = false;
  });
  updateSocialBUI();
}

function scoreSocialBState(index) {
  const state = socialBStates[index];
  const trial = socialBTrials[index];
  if (!state || !trial || state.selectedIndex === null) {
    return;
  }
  if (!state.manualResult) {
    state.correct = state.selectedIndex === trial.correctIndex;
  }
  const partAChoice = socialStates[index]?.selectedIndex ?? null;
  state.egocentric = state.correct ? false : partAChoice !== null && partAChoice === state.selectedIndex;
  if (!state.manualScore) {
    state.score = state.correct ? 2 : state.egocentric ? 0 : 1;
  }
}

function updateSocialBScore() {
  socialBStates.forEach((_, idx) => scoreSocialBState(idx));
  const total = socialBStates.reduce((sum, state) => sum + (Number.isFinite(state.score) ? state.score : 0), 0);
  if (dom.scoreSocial) dom.scoreSocial.textContent = `${total}/12`;
  if (dom.socialBSectionScore) dom.socialBSectionScore.textContent = `${total}`;
  updateScorecard();
}

async function scoreSentencesWithLLM() {
  const inputs = dom.sentenceInputs || [];
  if (!inputs.length) {
    alert("No sentence inputs found.");
    return;
  }
  const responses = inputs.map((input, idx) => ({
    prompt: sentencePrompts[idx] || "",
    response: (input.value || "").trim()
  }));
  const url = window.SENTENCE_SCORER_URL;
  if (!url) {
    alert("Set window.SENTENCE_SCORER_URL before scoring.");
    return;
  }
  if (dom.sentenceScoreLLMBtn) {
    dom.sentenceScoreLLMBtn.disabled = true;
    dom.sentenceScoreLLMBtn.textContent = "Scoring...";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses, prompt: getPromptValue("sentence") })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Sentence scorer HTTP error", response.status, text);
      throw new Error(`Sentence scorer returned ${response.status}`);
    }
    const data = await response.json();
    applySentenceScores(data);
  } catch (err) {
    console.error("Sentence scoring failed", err);
    alert("Sentence scoring failed. Check console/backend.");
  } finally {
    if (dom.sentenceScoreLLMBtn) {
      dom.sentenceScoreLLMBtn.disabled = false;
      dom.sentenceScoreLLMBtn.textContent = "Score with AI Assistant";
    }
  }
}

function applySentenceScores(result = {}) {
  const items = Array.isArray(result.items) ? result.items : [];
  let total = 0;
  items.forEach((item, idx) => {
    const scoreCell = dom.sentenceScoreCells[idx];
    const noteCell = dom.sentenceNoteCells[idx];
    if (scoreCell) {
      const scoreVal = typeof item.score === "number" ? item.score : "";
      const scoreText = scoreVal === "" ? "" : `${scoreVal}`;
      updateSentenceScoreCell(scoreCell, scoreText);
      if (typeof item.score === "number" && scoreVal >= 0 && scoreVal <= 2) {
        total += item.score;
      }
    }
    if (noteCell) {
      noteCell.textContent = item.rationale || "";
    }
  });
  if (dom.sentenceSectionScore) {
    dom.sentenceSectionScore.textContent = `${total}`;
  }
}

function isValidSentenceScore(value) {
  return /^(0|1|2)$/.test(value);
}

function updateSentenceScoreCell(cell, valueText) {
  const trimmed = (valueText || "").trim();
  cell.textContent = trimmed;
  if (trimmed && !isValidSentenceScore(trimmed)) {
    cell.classList.add("score-invalid");
  } else {
    cell.classList.remove("score-invalid");
  }
}

function updateSentenceScoreTotalFromCells() {
  const cells = dom.sentenceScoreCells || [];
  let total = 0;
  cells.forEach(cell => {
    const val = (cell.textContent || "").trim();
    if (isValidSentenceScore(val)) {
      total += Number(val);
    }
  });
  if (dom.sentenceSectionScore) {
    dom.sentenceSectionScore.textContent = `${total}`;
  }
  updateScorecard();
}

function syncSentenceResponsesFromInputs() {
  (dom.sentenceInputs || []).forEach((input, idx) => {
    sentenceState.responses[idx] = input.value || "";
  });
  updateSentenceUI();
}
function startSentenceListening() {
  if (!speechSupported || !recognition) {
    return;
  }
  if (captureContext && captureContext.type !== "sentence") {
    return;
  }
  if (sentenceState.status === "listening") {
    return;
  }
  sentenceState.status = "listening";
  captureContext = { type: "sentence" };
  isStopping = false;
  recognition.start();
  updateSentenceUI();
}

function stopSentenceListening() {
  if (sentenceState.status !== "listening") {
    return;
  }
  isStopping = true;
  sentenceState.status = "pending";
  if (recognition) {
    recognition.stop();
  }
  captureContext = null;
  updateSentenceUI();
}

function moveSentence(delta = 1) {
  const len = sentencePrompts.length;
  sentenceState.index = ((sentenceState.index + delta) % len + len) % len;
  updateSentenceUI();
}

function updateSentenceUI() {
  if (dom.sentenceActiveLabel) {
    dom.sentenceActiveLabel.textContent = `${sentenceState.index + 1}`;
  }
  if (dom.sentenceStartBtn) {
    dom.sentenceStartBtn.disabled = !speechSupported || sentenceState.status === "listening";
  }
  if (dom.sentenceStopBtn) {
    dom.sentenceStopBtn.disabled = sentenceState.status !== "listening";
  }
  if (dom.sentenceNextBtn) {
    dom.sentenceNextBtn.disabled = sentenceState.status === "listening";
  }
  if (dom.sentenceRows && dom.sentenceRows.length) {
    dom.sentenceRows.forEach((row, idx) => {
      row.classList.toggle("active-row", idx === sentenceState.index);
    });
  }
  if (dom.sentenceLiveWords) {
    const val = dom.sentenceInputs[sentenceState.index]?.value || "";
    dom.sentenceLiveWords.textContent = val || "No responses yet.";
  }
}

function getScoreValue(el, max) {
  if (!el) {
    return 0;
  }
  const match = `${el.textContent}`.match(/(\d+)/);
  const val = match ? parseInt(match[1], 10) : 0;
  return Number.isFinite(val) ? Math.max(0, Math.min(val, max)) : 0;
}

function getSocialBTotalScore() {
  return socialBStates.reduce((sum, state) => sum + (Number.isFinite(state.score) ? state.score : 0), 0);
}

function updateScorecard() {
  const naming = getScoreValue(dom.sectionScore, 8);
  const comp = getScoreValue(dom.compSectionScore, 8);
  const spell = getScoreValue(dom.spellSectionScore, 12);
  const fluS = getScoreValue(dom.fluencySectionScore, 12);
  const fluT = getScoreValue(dom.fluencyTSectionScore, 12);
  const digits = getScoreValue(dom.digitsSectionScore, 12);
  const alt = getScoreValue(dom.altSectionScore, 12);
  const sentence = getScoreValue(dom.sentenceSectionScore, 12);
  const social = getSocialBTotalScore();
  const story = getScoreValue(dom.storySectionScore, 10); // immediate recall
  const memoryDelayed = getScoreValue(dom.delayedStorySectionScore, 10);
  const memoryRecog = getScoreValue(dom.delayedRecognitionScore, 4);
  const dots = getScoreValue(dom.dotsSectionScore, 4);
  const cubes = getScoreValue(dom.cubesSectionScore, 4);
  const numberloc = getScoreValue(dom.numberlocSectionScore, 4);

  if (dom.scoreLangNaming) dom.scoreLangNaming.textContent = `${naming}/8`;
  if (dom.scoreLangComp) dom.scoreLangComp.textContent = `${comp}/8`;
  if (dom.scoreLangSpell) dom.scoreLangSpell.textContent = `${spell}/12`;
  const langTotal = naming + comp + spell;
  if (dom.scoreFluencyS) dom.scoreFluencyS.textContent = `${fluS}/12`;
  if (dom.scoreFluencyT) dom.scoreFluencyT.textContent = `${fluT}/12`;
  const fluTotal = fluS + fluT;
  if (dom.scoreExecDigits) dom.scoreExecDigits.textContent = `${digits}/12`;
  if (dom.scoreExecAlt) dom.scoreExecAlt.textContent = `${alt}/12`;
  if (dom.scoreExecSentence) dom.scoreExecSentence.textContent = `${sentence}/12`;
  if (dom.scoreSocial) dom.scoreSocial.textContent = `${social}/12`;
  const execTotal = digits + alt + sentence + social;

  if (dom.scoreMemoryImmediate) dom.scoreMemoryImmediate.textContent = `${story}/10`;
  if (dom.scoreMemoryDelayed) dom.scoreMemoryDelayed.textContent = `${memoryDelayed}/10`;
  if (dom.scoreMemoryRecog) dom.scoreMemoryRecog.textContent = `${memoryRecog}/4`;
  const memoryTotal = story + memoryDelayed + memoryRecog;

  if (dom.scoreVisuoDots) dom.scoreVisuoDots.textContent = `${dots}/4`;
  if (dom.scoreVisuoCubes) dom.scoreVisuoCubes.textContent = `${cubes}/4`;
  if (dom.scoreVisuoNumberloc) dom.scoreVisuoNumberloc.textContent = `${numberloc}/4`;
  const visuoTotal = dots + cubes + numberloc;

  if (dom.scoreAlsSpecific) dom.scoreAlsSpecific.textContent = `${langTotal + fluTotal + execTotal}/100`;
  if (dom.scoreAlsNonspecific) dom.scoreAlsNonspecific.textContent = `${memoryTotal + visuoTotal}/36`;
  if (dom.scoreEcasTotal) dom.scoreEcasTotal.textContent = `${langTotal + fluTotal + execTotal + memoryTotal + visuoTotal}/136`;
}

setInterval(updateScorecard, 1000);
// Expose for console debugging
window.updateScorecard = updateScorecard;
// Run once on load to sync immediately
updateScorecard();

function evaluateNumberLoc(state, trial) {
  const expected = trial.answer;
  const candidate = (state.digits || []).join("") || (state.entries.slice(-1)[0]?.text || "");
  state.candidate = candidate;
  state.correct = candidate === expected;
}

function updateDotsUI() {
  if (!dom.dotsStatus) {
    return;
  }
  const state = dotsStates[dotsIndex];
  const completed = dotsStates.filter(s => s.status === "completed").length;
  const percent = Math.round((completed / dotTrials.length) * 100);
  dom.dotsProgressFill.style.width = `${percent}%`;
  dom.dotsProgressCount.textContent = `${dotsIndex + 1} / ${dotTrials.length}`;

  let statusLabel = "Idle";
  if (state.status === "listening") {
    statusLabel = "Listening";
  } else if (state.status === "finishing") {
    statusLabel = "Finishing";
  } else if (state.status === "completed") {
    statusLabel = state.correct ? "Correct" : "Recorded";
  }
  dom.dotsStatus.textContent = statusLabel;
  dom.dotsStatus.className =
    state.status === "completed"
      ? state.correct
        ? "status-badge completed"
        : "status-badge"
      : state.status === "listening"
      ? "status-badge listening"
      : "status-badge";

  if (dom.dotsStartBtn) {
    dom.dotsStartBtn.disabled = !speechSupported || state.status === "listening" || dotsSessionEnded;
  }
  if (dom.dotsStopBtn) {
    dom.dotsStopBtn.disabled = state.status !== "listening";
  }
  if (dom.dotsNextBtn) {
    dom.dotsNextBtn.disabled = state.status === "listening" || dotsSessionEnded;
  }
  if (dom.dotsResetBtn) {
    dom.dotsResetBtn.disabled = state.status === "listening";
  }

  renderDotsLive();
  renderDotsMatch();
  renderDotsLog();
  syncParticipantView();
}

function renderDotsLive() {
  if (!dom.dotsLiveWords) {
    return;
  }
  const state = dotsStates[dotsIndex];
  if (!state.digits.length) {
    dom.dotsLiveWords.innerHTML = '<span class="muted">No responses yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.digits.slice(-10).forEach(d => {
    const chip = document.createElement("span");
    chip.textContent = d;
    frag.appendChild(chip);
  });
  dom.dotsLiveWords.innerHTML = "";
  dom.dotsLiveWords.appendChild(frag);
}

function renderDotsMatch() {
  if (!dom.dotsMatchStatus || !dom.dotsCandidate) {
    return;
  }
  const state = dotsStates[dotsIndex];
  if (!state.digits.length && !state.entries.length) {
    dom.dotsMatchStatus.textContent = "No response yet";
    dom.dotsCandidate.textContent = "";
    return;
  }
  const pill = document.createElement("span");
  pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
  pill.textContent = state.correct ? "Correct" : "Recorded";
  dom.dotsMatchStatus.innerHTML = "";
  dom.dotsMatchStatus.appendChild(pill);
  dom.dotsCandidate.textContent = state.candidate ? `Heard: ${state.candidate}` : "";
}

function renderDotsLog() {
  if (!dom.dotsLogBody) {
    return;
  }
  const frag = document.createDocumentFragment();
  dotsStates.forEach((state, idx) => {
    const tr = document.createElement("tr");
    const boxTd = document.createElement("td");
    boxTd.textContent = idx + 1;
    const targetTd = document.createElement("td");
    targetTd.textContent = dotTrials[idx].answer;
    const respTd = document.createElement("td");
    respTd.textContent = state.candidate || (state.entries.slice(-1)[0]?.text || "");
    const resultTd = document.createElement("td");
    if (state.status === "completed") {
      const pill = document.createElement("span");
      pill.className = `match-pill ${state.correct ? "success" : "miss"}`;
      pill.textContent = state.correct ? "Correct" : "Recorded";
      resultTd.appendChild(pill);
    } else {
      resultTd.textContent = "";
    }
    tr.append(boxTd, targetTd, respTd, resultTd);
    frag.appendChild(tr);
  });
  dom.dotsLogBody.innerHTML = "";
  dom.dotsLogBody.appendChild(frag);
  if (dom.dotsSectionScore) {
    const totalCorrect = dotsStates.filter(s => s.correct).length;
    dom.dotsSectionScore.textContent = `${totalCorrect}`;
  }
  updateScorecard();
}

function evaluateDots(state, trial) {
  const expected = trial.answer;
  const candidate = (state.digits || []).join("") || (state.entries.slice(-1)[0]?.text || "");
  state.candidate = candidate;
  state.correct = candidate === expected;
}

function updateFluencyCountdown() {
  const countdownEl = document.getElementById("fluency-countdown");
  if (!countdownEl) {
    return;
  }
  const remaining = Math.max(0, Math.floor((fluencyState.timer.remainingMs || 60000) / 1000));
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  countdownEl.textContent = `${minutes}:${seconds}`;
}

function updateFluencyTCountdown() {
  const countdownEl = dom.fluencyTCountdown;
  if (!countdownEl) {
    return;
  }
  const remaining = Math.max(0, Math.floor((fluencyTState.timer.remainingMs || 60000) / 1000));
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  countdownEl.textContent = `${minutes}:${seconds}`;
}

function handleFluencyTimer(timestamp) {
  if (fluencyState.status !== "listening") {
    return;
  }
  if (!fluencyState.timer.startTime) {
    fluencyState.timer.startTime = timestamp;
  }
  const elapsed = timestamp - fluencyState.timer.startTime;
  const remaining = 60000 - elapsed;
  fluencyState.timer.remainingMs = Math.max(0, remaining);
  updateFluencyCountdown();
  if (remaining <= 0) {
    fluencyState.status = "finishing";
    if (recognition) {
      recognition.stop();
    }
    updateFluencyUI();
    return;
  }
  fluencyState.timer.rafId = requestAnimationFrame(ts => handleFluencyTimer(ts));
}

function handleFluencyTTimer(timestamp) {
  if (fluencyTState.status !== "listening") {
    return;
  }
  if (!fluencyTState.timer.startTime) {
    fluencyTState.timer.startTime = timestamp;
  }
  const elapsed = timestamp - fluencyTState.timer.startTime;
  const remaining = 60000 - elapsed;
  fluencyTState.timer.remainingMs = Math.max(0, remaining);
  updateFluencyTCountdown();
  if (remaining <= 0) {
    fluencyTState.status = "finishing";
    if (recognition) {
      recognition.stop();
    }
    updateFluencyTUI();
    return;
  }
  fluencyTState.timer.rafId = requestAnimationFrame(ts => handleFluencyTTimer(ts));
}

function isValidFluencyWord(token = "", letter = "S", exactLength = null) {
  if (!token) {
    return false;
  }
  if (!/^[A-Z]+$/.test(token)) {
    return false;
  }
  if (!token.startsWith(letter)) {
    return false;
  }
  if (exactLength !== null) {
    return token.length === exactLength;
  }
  if (token.length < 2) {
    return false;
  }
  return true;
}

function renderLiveWords() {
  const state = itemStates[activeIndex];
  if (!state.tokens.length) {
    dom.liveWords.innerHTML = '<span class="muted">No words captured yet.</span>';
    return;
  }
  const frag = document.createDocumentFragment();
  state.tokens.slice(-12).forEach(token => {
    const chip = document.createElement("span");
    chip.textContent = token;
    frag.appendChild(chip);
  });
  dom.liveWords.innerHTML = "";
  dom.liveWords.appendChild(frag);
}

function renderMatchStatus() {
  const state = itemStates[activeIndex];
  const item = items[activeIndex];
  const pill = document.createElement("span");
  pill.classList.add("match-pill");

  if (!state.entries.length) {
    dom.matchStatus.textContent = "No response yet";
    return;
  }

  const matched = evaluateMatch(state, item);
  if (matched) {
    pill.classList.add("success");
    pill.textContent = "Matched";
    dom.matchStatus.innerHTML = "";
    dom.matchStatus.appendChild(pill);
  } else {
    pill.classList.add("miss");
    pill.textContent = "No match yet";
    dom.matchStatus.innerHTML = "";
    dom.matchStatus.appendChild(pill);
  }
}

function renderLog() {
  const frag = document.createDocumentFragment();
  let correctCount = 0;
  items.forEach((item, index) => {
    const tr = document.createElement("tr");
    const state = itemStates[index];
    const targetSet = buildTargetSet(item.answers);

    const correctTd = document.createElement("td");
    correctTd.textContent = `${index + 1}. ${item.label}`;

    const participantTd = document.createElement("td");
    const latestEntry = state.entries
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    participantTd.textContent = latestEntry ? latestEntry.text || "(blank)" : "";
    participantTd.classList.add("editable-cell");
    attachInlineEdit(participantTd, participantTd.textContent, newText => {
      const trimmed = newText.trim();
      if (latestEntry) {
        latestEntry.text = trimmed;
        latestEntry.tokens = tokenize(trimmed);
      } else if (trimmed) {
        state.entries.push({
          text: trimmed,
          source: "Edited",
          timestamp: Date.now(),
          tokens: tokenize(trimmed)
        });
      }
      retokenizeItemState(state);
      evaluateMatch(state, item);
      updateUI();
    });

    const scoreTd = document.createElement("td");
    const matched = state.entries.length ? evaluateMatch(state, item) : false;
    const pill = document.createElement("span");
    pill.className = `match-pill ${state.entries.length ? (matched ? "success" : "miss") : "pending"}`;
    pill.textContent = state.entries.length ? (matched ? "Correct" : "Incorrect") : "Pending";
    scoreTd.appendChild(pill);
    if (matched) {
      correctCount += 1;
    }

    const notesTd = document.createElement("td");
    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.value = state.notes || "";
    notesInput.placeholder = "Notes";
    notesInput.dataset.index = index;
    notesInput.addEventListener("input", event => {
      const targetState = itemStates[Number(event.target.dataset.index)];
      targetState.notes = event.target.value;
    });
    notesTd.appendChild(notesInput);

    tr.append(correctTd, participantTd, scoreTd, notesTd);
    frag.appendChild(tr);
  });
  dom.logBody.innerHTML = "";
  dom.logBody.appendChild(frag);
  if (dom.sectionScore) {
    dom.sectionScore.textContent = `${correctCount}`;
  }
}

function updateButtons() {
  const state = itemStates[activeIndex];
  if (dom.startBtn) {
    dom.startBtn.disabled = !speechSupported || state.status === "listening" || namingSessionEnded;
  }
  if (dom.stopBtn) {
    dom.stopBtn.disabled = state.status !== "listening";
  }
  if (dom.nextBtn) {
    dom.nextBtn.disabled = namingSessionEnded;
  }
  if (dom.resetBtn) {
    dom.resetBtn.disabled = state.status === "listening";
  }
}

function evaluateMatch(state, item) {
  const targetSet = buildTargetSet(item.answers);
  state.matched = state.tokens.some(token => targetSet.has(token));
  return state.matched;
}

function retokenizeItemState(state) {
  const tokens = [];
  state.entries.forEach(entry => {
    const entryTokens = entry.tokens && entry.tokens.length ? entry.tokens : tokenize(entry.text || "");
    entry.tokens = entryTokens;
    tokens.push(...entryTokens);
  });
  state.tokens = tokens;
}

function getNamingAliasTokens(itemId) {
  const idx = itemIndexById[itemId];
  if (typeof idx !== "number") {
    return new Set();
  }
  const namingState = itemStates[idx];
  const aliases = new Set();
  if (!namingState || !Array.isArray(namingState.entries)) {
    return aliases;
  }
  namingState.entries.forEach(entry => {
    const entryTokens = entry.tokens && entry.tokens.length ? entry.tokens : tokenize(entry.text || "");
    entryTokens.forEach(tok => {
      if (tok) {
        aliases.add(tok);
      }
    });
  });
  return aliases;
}

function evaluateComprehension(state, question) {
  const expected = itemLookup[question.answerId];
  const targetSet = buildTargetSet(expected ? expected.answers : []);
  const selectionMatch = state.selectedId === question.answerId;
  const voiceMatch = (state.tokens || []).some(token => targetSet.has(token));
  const aliasSet = getNamingAliasTokens(question.answerId);
  const aliasMatch = (state.tokens || []).some(token => aliasSet.has(token));
  state.correct = Boolean(selectionMatch || voiceMatch || aliasMatch);
  return state.correct;
}

function evaluateSpelling(state, target) {
  const targetCanonical = canonicalize(target);
  const voiceCandidate = buildSpelledCandidate(state.tokens || []);
  const typedCandidate = canonicalize(state.typedAnswer || "");
  state.spelledCandidate = voiceCandidate || typedCandidate || "";
  state.correct = state.spelledCandidate === targetCanonical || typedCandidate === targetCanonical;
}

function tokenize(text = "") {
  const cleaned = text.replace(/[^a-zA-Z\s]/g, " ");
  return cleaned
    .split(/\s+/)
    .map(token => canonicalize(token))
    .filter(Boolean);
}

function tokenizeFluency(text = "") {
  const cleaned = text.replace(/[^a-zA-Z\s]/g, " ");
  return cleaned
    .split(/\s+/)
    .map(token => normalizeFluencyToken(token))
    .filter(Boolean);
}

function normalizeFluencyToken(word = "") {
  return word
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function buildSpelledCandidate(tokens = []) {
  if (!tokens.length) {
    return "";
  }
  const letters = tokens
    .map(token => token.trim())
    .filter(Boolean)
    .map(token => (token.length === 1 ? token : token));
  const onlyLetters = letters.filter(ch => ch.length === 1 && ch >= "A" && ch <= "Z").join("");
  if (onlyLetters) {
    return onlyLetters;
  }
  return letters.join("");
}

function canonicalize(word = "") {
  const normalized = word
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  if (!normalized) {
    return "";
  }
  // Light singular/plural handling to reduce mismatches.
  if (normalized.endsWith("IES") && normalized.length > 3) {
    return normalized.slice(0, -3) + "Y";
  }
  if (normalized.endsWith("ES")) {
    const esEndings = ["XES", "ZES", "CHES", "SHES", "SES"];
    if (esEndings.some(end => normalized.endsWith(end))) {
      return normalized.slice(0, -2);
    }
  }
  if (normalized.endsWith("S") && !normalized.endsWith("SS")) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function buildTargetSet(words = []) {
  const set = new Set();
  words.forEach(word => {
    const normalized = canonicalize(word);
    if (normalized) {
      set.add(normalized);
      set.add(`${normalized}S`);
    }
  });
  return set;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function attachInlineEdit(cell, initialValue, onSave) {
  cell.addEventListener("dblclick", () => {
    if (cell.querySelector("input")) {
      return;
    }
    const input = document.createElement("input");
    input.type = "text";
    input.value = initialValue || "";
    input.className = "inline-edit";
    cell.innerHTML = "";
    cell.appendChild(input);
    input.focus();
    input.select();

    const commit = save => {
      const nextText = save ? input.value : initialValue || "";
      onSave(nextText);
    };

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        commit(true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        commit(false);
      }
    });
    input.addEventListener("blur", () => commit(true));
  });
}

function endNamingSession() {
  if (namingSessionEnded) {
    return;
  }
  namingSessionEnded = true;
  if (captureContext && captureContext.type === "naming" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateButtons();
}

function checkNamingCompletion() {
  if (namingSessionEnded) {
    return;
  }
  const allCaptured = itemStates.every(s => s.entries.length > 0);
  if (allCaptured) {
    endNamingSession();
  }
}

function endComprehensionSession() {
  if (comprehensionSessionEnded) {
    return;
  }
  comprehensionSessionEnded = true;
  if (captureContext && captureContext.type === "comprehension" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateComprehensionUI();
}

function checkComprehensionCompletion() {
  if (comprehensionSessionEnded) {
    return;
  }
  const allCaptured = compStates.every(s => s.selectedId || (s.entries && s.entries.length));
  if (allCaptured) {
    endComprehensionSession();
  }
}

function endDigitsSession() {
  if (digitsSessionEnded) {
    return;
  }
  digitsSessionEnded = true;
  if (captureContext && captureContext.type === "digits" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateDigitsUI();
}

function checkDigitsCompletion() {
  if (digitsSessionEnded) {
    return;
  }
  const allCaptured = digitStates.every(s => s.digits.length || s.entries.length || s.typedAnswer);
  if (allCaptured) {
    endDigitsSession();
  }
}

function endDotsSession() {
  if (dotsSessionEnded) {
    return;
  }
  dotsSessionEnded = true;
  if (captureContext && captureContext.type === "dots" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateDotsUI();
}

function checkDotsCompletion() {
  if (dotsSessionEnded) {
    return;
  }
  const allCaptured = dotsStates.every(s => s.digits.length || s.entries.length);
  if (allCaptured) {
    endDotsSession();
  }
}

function endCubesSession() {
  if (cubesSessionEnded) {
    return;
  }
  cubesSessionEnded = true;
  if (captureContext && captureContext.type === "cubes" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateCubesUI();
}

function checkCubesCompletion() {
  if (cubesSessionEnded) {
    return;
  }
  const allCaptured = cubesStates.every(s => s.digits.length || s.entries.length);
  if (allCaptured) {
    endCubesSession();
  }
}

function endNumberLocSession() {
  if (numberlocSessionEnded) {
    return;
  }
  numberlocSessionEnded = true;
  if (captureContext && captureContext.type === "numberloc" && recognition) {
    recognition.stop();
    captureContext = null;
  }
  isStopping = false;
  updateNumberLocUI();
}

function checkNumberLocCompletion() {
  if (numberlocSessionEnded) {
    return;
  }
  const allCaptured = numberlocStates.every(s => s.digits.length || s.entries.length);
  if (allCaptured) {
    endNumberLocSession();
  }
}
