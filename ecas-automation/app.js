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
- "rationale": an array of short strings explaining any removals/decisions (e.g., "Removed Sally (proper name)", "Removed Sedona (place)").`,
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
- "rationale": an array of short strings explaining any removals/decisions (e.g., "Removed Tara (proper name)").`,
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

const PROMPT_DEFAULTS_VERSION = "2025-02-12";

const PROMPT_STORAGE_KEYS = {
  story: "ecas.prompt.story",
  fluency: "ecas.prompt.fluency",
  fluencyT: "ecas.prompt.fluencyT",
  sentence: "ecas.prompt.sentence"
};

const PROMPT_VERSION_KEY = "ecas.prompt.defaultsVersion";

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
  scoreEcasTotal: document.getElementById("score-ecas-total")
};

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
let fluencyDragState = null; // { scope: "fluency" | "fluencyT", listType: "raw" | "scored", index: number }
let captureContext = null; // { type: "naming" | "comprehension" | "spelling" | "story" | "fluency" | "fluencyT" | "digits" | "alternation" | "dots" | "cubes" | "numberloc" | "sentence" }
let namingSessionEnded = false;
let comprehensionSessionEnded = false;
let digitsSessionEnded = false;
let dotsSessionEnded = false;
let cubesSessionEnded = false;
let numberlocSessionEnded = false;
const sessionTimers = new Map();
const storyState = {
  status: "pending",
  tokens: [],
  entries: [],
  timestamp: null,
  manualTranscript: "",
  manualEdited: false,
  editingLive: false
};
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
const storyScoreInputs = STORY_CRITERIA.reduce((acc, criterion) => {
  acc[criterion.key] = document.getElementById(criterion.checkboxId);
  return acc;
}, {});
const STORY_SCORER_URL = window.STORY_SCORER_URL || "";
Object.values(storyScoreInputs).forEach(input => {
  if (input) {
    input.addEventListener("change", updateStoryScoreFromChecks);
  }
});
const fluencyState = {
  status: "pending",
  tokens: [],
  entries: [],
  countdownMs: 60000,
  timer: { remainingMs: 60000, endTime: null, rafId: null, startTime: null },
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

init();

function init() {
  bindControls();
  setupTabs();
  setupPromptEditor();
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
  if (dom.fluencyAIResetBtn) {
    dom.fluencyAIResetBtn.addEventListener("click", () => {
      resetFluencyAISuggestions(fluencyState);
      updateFluencyUI();
    });
  }
  if (dom.fluencyTScoreLLMBtn) {
    dom.fluencyTScoreLLMBtn.addEventListener("click", scoreFluencyTWithLLM);
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
    if (sectionId === "agent-prompts-card" || sectionId === "overall-scores-card") {
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
  const allowed = new Set(["story-card", "fluency-card", "fluency-t-card", "sentence-card"]);
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
  dom.digitsManualInput.value = "";
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
  updateScorecard();
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
      const tokens = tokenize(transcript);
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
      const tokens = tokenize(transcript);
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
  const rationales = Array.isArray(data.rationale) ? data.rationale : [];
  const processedCanonical = processedWords.map(word => canonicalize(word)).filter(Boolean);
  const processedSet = new Set(processedCanonical);
  const rationaleByProcessed = new Map();

  if (rationales.length === processedWords.length) {
    processedWords.forEach((word, idx) => {
      const key = canonicalize(word);
      if (key && !rationaleByProcessed.has(key)) {
        rationaleByProcessed.set(key, rationales[idx] || "");
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
    if (rationales.length === rawWords.length) {
      rationale = rationales[idx] || "";
    } else if (rationales.length === processedWords.length) {
      rationale = rationaleByProcessed.get(canonical) || "";
    }
    return {
      suggestion: "remove",
      decision: "pending",
      rationale
    };
  });
  state.processedWords = rawWords.filter((_, idx) => state.aiKeepMask[idx]);
  state.processedNotes = rationales.slice();
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
      rationale: existing && existing.rationale ? existing.rationale : ""
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
    updateFluencyProcessedFromReview(state);
    return;
  }
  setFluencyReviewDecision(state, idx, "rejected");
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
  const tokens = tokenize(rawValue);
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
  const tokens = tokenize(rawValue);
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
  updateFluencyUI();
  updateFluencyTUI();
  updateDigitsUI();
  updateAlternationUI();
  updateDotsUI();
  updateCubesUI();
  updateNumberLocUI();
  checkNamingCompletion();
  checkComprehensionCompletion();
  checkDigitsCompletion();
  checkDotsCompletion();
  checkCubesCompletion();
  checkNumberLocCompletion();
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
          toggleBtn.className = `ai-toggle ai-pill ${isKeep ? "keep" : "remove"}`;
          toggleBtn.textContent = isKeep ? "Keep" : "Exclude";
          toggleBtn.title =
            (review && review.rationale) || (keepByAI ? "AI suggested keep." : "No rationale provided.");
          toggleBtn.addEventListener("click", () => {
            toggleFluencySuggestion(fluencyState, i);
            updateFluencyUI();
          });
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
      dom.fluencySectionScore.textContent = processed.length ? `${processed.length}` : "0";
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
          toggleBtn.className = `ai-toggle ai-pill ${isKeep ? "keep" : "remove"}`;
          toggleBtn.textContent = isKeep ? "Keep" : "Exclude";
          toggleBtn.title =
            (review && review.rationale) || (keepByAI ? "AI suggested keep." : "No rationale provided.");
          toggleBtn.addEventListener("click", () => {
            toggleFluencySuggestion(fluencyTState, i);
            updateFluencyTUI();
          });
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
      dom.fluencyTSectionScore.textContent = processed.length ? `${processed.length}` : "0";
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

function updateScorecard() {
  const naming = getScoreValue(dom.sectionScore, 8);
  const comp = getScoreValue(dom.compSectionScore, 8);
  const spell = getScoreValue(dom.spellSectionScore, 12);
  const fluS = getScoreValue(dom.fluencySectionScore, 12);
  const fluT = getScoreValue(dom.fluencyTSectionScore, 12);
  const digits = getScoreValue(dom.digitsSectionScore, 12);
  const alt = getScoreValue(dom.altSectionScore, 12);
  const sentence = getScoreValue(dom.sentenceSectionScore, 12);
  const social = 0; // not implemented
  const story = getScoreValue(dom.storySectionScore, 10); // immediate recall
  const memoryDelayed = 0; // not implemented
  const memoryRecog = 0; // not implemented
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
