const LIST_A = [
  "DRUM",
  "CURTAIN",
  "BELL",
  "COFFEE",
  "SCHOOL",
  "PARENT",
  "MOON",
  "GARDEN",
  "HAT",
  "FARMER",
  "NOSE",
  "TURKEY",
  "COLOR",
  "HOUSE",
  "RIVER"
];

const LIST_B = [
  "DESK",
  "RANGER",
  "BIRD",
  "SHOE",
  "STOVE",
  "MOUNTAIN",
  "GLASSES",
  "TOWEL",
  "CLOUD",
  "BOAT",
  "LAMB",
  "NAIL",
  "PENCIL",
  "CHURCH",
  "FISH"
];

const stageBlueprints = [
  {
    id: "A1",
    title: "Section 1: List A, Trial 1",
    overview:
      "Introduce the first presentation of List A. Read the words at a pace of one word per second while keeping a neutral tone.",
    prompt:
      "Read aloud: <em>\"I am going to read a list of words. Listen carefully, for when I stop, you are to say back as many as you can remember. It doesn't matter in what order you repeat them. Just try to remember as many as you can.\"</em>",
    wordList: LIST_A,
    wordListLabel: "List A words (read aloud once)",
    targetList: "A"
  },
  ...Array.from({ length: 4 }, (_, idx) => {
    const trialNumber = idx + 2;
    return {
      id: `A${trialNumber}`,
      title: `Section ${trialNumber}: List A, Trial ${trialNumber}`,
      overview: "Repeat List A exactly as printed. Maintain the 1 word/second cadence.",
      prompt:
        "Read aloud: <em>\"I am going to read the same list again, and once again when I stop, I want you to tell me as many of the words as you can remember, including words you have said before.\"</em>",
      wordList: LIST_A,
      wordListLabel: "List A words (repeat)",
      targetList: "A"
    };
  }),
  {
    id: "B1",
    title: "Section 6: List B - Interference",
    overview: "Present the interference list immediately after completing List A Trial 5.",
    prompt:
      "Read aloud: <em>\"Now I am going to read a second list of words. This time, again you are to say back as many words of this second list as you can remember. The order does not matter.\"</em>",
    wordList: LIST_B,
    wordListLabel: "List B words (read aloud once)",
    targetList: "B"
  },
  {
    id: "A6",
    title: "Section 7: Trial 6 - Immediate Recall of List A",
    overview: "Without re-reading List A, prompt immediate free recall after List B.",
    prompt:
      "Say: <em>\"Now tell me all the words you remember from the first list.\"</em>",
    targetList: "A"
  },
  {
    id: "A7",
    title: "Section 8: Delayed Recall of List A",
    overview:
      "After the 20-30 minute delay, resume the assessment and request delayed free recall of List A without giving cues.",
    prompt:
      "Say: <em>\"Tell me all the words you remember from the first list.\"</em>",
    targetList: "A"
  }
];

const targetSets = {
  A: buildTargetSet(LIST_A),
  B: buildTargetSet(LIST_B)
};

const LIST_A_TRIAL_IDS = ["A1", "A2", "A3", "A4", "A5"];
const TRIAL6_STAGE_ID = "A6";
const TRIAL7_STAGE_ID = "A7";
const LIST_B_STAGE_ID = "B1";

const stateByStage = stageBlueprints.reduce((acc, stage) => {
  acc[stage.id] = {
    rawWords: [],
    scoredEntries: [],
    status: "idle",
    timer: {
      remainingMs: 60000,
      endTime: null,
      rafId: null,
      startTime: null
    }
  };
  return acc;
}, {});

const blueprintLookup = stageBlueprints.reduce((acc, stage) => {
  acc[stage.id] = stage;
  return acc;
}, {});

const dom = {
  stages: document.getElementById("stages"),
  template: document.getElementById("stage-template"),
  speechWarning: document.getElementById("speech-warning"),
  scoringBody: document.getElementById("scoring-body"),
  totalCells: {},
  intrusionCells: {}
};

const stageElements = {};
let recognition;
let speechSupported = false;
let activeStageId = null;
const scoringRows = [];
const stageTiming = {
  a6CompletedAt: null,
  a7EarliestStart: null
};
let delayNoteTimer = null;

initialize();

function initialize() {
  renderStages();
  setupSpeechRecognition();
  setupScoringTable();
  updateScoringTable();
}

function renderStages() {
  const fragment = document.createDocumentFragment();
  stageBlueprints.forEach((stage, index) => {
    const section = dom.template.content.firstElementChild.cloneNode(true);
    section.dataset.stageId = stage.id;
    section.querySelector(".stage-title").textContent = stage.title;
    section.querySelector(".overview").textContent = stage.overview;
    section.querySelector(".prompt").innerHTML = stage.prompt;

    if (stage.wordList && stage.wordList.length) {
      const wordBank = section.querySelector(".word-bank");
      wordBank.classList.remove("hidden");
      const label = stage.wordListLabel || "Word list";
      wordBank.querySelector(".word-bank-title").textContent = label;
      const ul = wordBank.querySelector(".word-list");
      stage.wordList.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        ul.appendChild(li);
      });
    }

    const startBtn = section.querySelector('[data-action="start"]');
    const finishBtn = section.querySelector('[data-action="finish"]');
    const resetBtn = section.querySelector('[data-action="reset"]');

    startBtn.addEventListener("click", () => startListening(stage.id));
    finishBtn.addEventListener("click", () => finishStage(stage.id));
    resetBtn.addEventListener("click", () => resetStage(stage.id));

    stageElements[stage.id] = {
      section,
      statusBadge: section.querySelector(".status-badge"),
      liveWords: section.querySelector(".live-words"),
      results: section.querySelector(".results"),
      resultsBody: section.querySelector("tbody"),
      countdown: section.querySelector(".countdown"),
      delayNote: section.querySelector(".delay-note"),
      delayNoteText: section.querySelector(".delay-note .note-text"),
      startBtn,
      finishBtn,
      resetBtn
    };

    updateStageUI(stage.id);
    fragment.appendChild(section);
  });
  dom.stages.appendChild(fragment);
}

function setupSpeechRecognition() {
  const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!RecognitionCtor) {
    dom.speechWarning.classList.remove("hidden");
    updateAllButtons();
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
  updateAllButtons();
}

function handleRecognitionResult(event) {
  if (!activeStageId) {
    return;
  }
  const stageState = stateByStage[activeStageId];
  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const result = event.results[i];
    if (!result.isFinal) {
      continue;
    }
    const transcript = result[0].transcript || "";
    const cleaned = transcript.replace(/[^a-zA-Z\s]/g, " ");
    cleaned
      .split(/\s+/)
      .map(word => word.trim())
      .filter(Boolean)
      .forEach(word => {
        stageState.rawWords.push({
          original: word.toUpperCase(),
          normalized: normalizeWord(word),
          canonical: canonicalizeWord(word),
          timestamp: Date.now()
        });
      });
  }
  updateStageUI(activeStageId);
}

function handleRecognitionError(event) {
  console.error("Speech recognition error", event.error);
  dom.speechWarning.textContent = `Speech recognition error: ${event.error}. Refresh and allow microphone access to continue.`;
  dom.speechWarning.classList.remove("hidden");
  if (activeStageId) {
    clearStageTimer(activeStageId);
    const stageState = stateByStage[activeStageId];
    stageState.status = "idle";
    if (stageState.timer) {
      stageState.timer.remainingMs = 60000;
    }
    activeStageId = null;
  }
  updateAllButtons();
}

function handleRecognitionEnd() {
  if (!activeStageId) {
    return;
  }
  const stageState = stateByStage[activeStageId];
  if (stageState.status === "listening") {
    recognition.start();
  } else if (stageState.status === "finishing") {
    finalizeStage(activeStageId);
  }
}

function startListening(stageId) {
  if (!speechSupported) {
    return;
  }
  if (activeStageId && activeStageId !== stageId) {
    alert("Please finish the current section before starting another.");
    return;
  }
  if (!canStartStage(stageId)) {
    return;
  }
  const stageState = stateByStage[stageId];
  stageState.rawWords = [];
  stageState.scoredEntries = [];
  stageState.status = "listening";
  startStageTimer(stageId);
  activeStageId = stageId;
  recognition.start();
  updateStageUI(stageId);
}

function finishStage(stageId) {
  const stageState = stateByStage[stageId];
  if (stageState.status !== "listening") {
    return;
  }
  clearStageTimer(stageId);
  stageState.status = "finishing";
  updateStageUI(stageId);
  if (activeStageId === stageId && recognition) {
    recognition.stop();
  }
}

function finalizeStage(stageId) {
  const stage = blueprintLookup[stageId];
  const stageState = stateByStage[stageId];
  clearStageTimer(stageId);
  stageState.scoredEntries = scoreEntries(stageState.rawWords, stage);
  stageState.status = "completed";
  activeStageId = null;
  if (stageId === TRIAL6_STAGE_ID) {
    stageTiming.a6CompletedAt = Date.now();
    stageTiming.a7EarliestStart = stageTiming.a6CompletedAt + 15 * 60 * 1000;
    updateStageUI(TRIAL7_STAGE_ID);
  }
  if (stageId === TRIAL7_STAGE_ID) {
    clearDelayTiming();
  }
  updateStageUI(stageId);
}

function resetStage(stageId) {
  const stageState = stateByStage[stageId];
  if (activeStageId === stageId && recognition) {
    recognition.stop();
    activeStageId = null;
  }
  clearStageTimer(stageId);
  stageState.rawWords = [];
  stageState.scoredEntries = [];
  stageState.status = "idle";
  stageState.timer.remainingMs = 60000;
  stageState.timer.endTime = null;
  if (stageId === TRIAL6_STAGE_ID || stageId === TRIAL7_STAGE_ID) {
    clearDelayTiming();
  }
  updateStageUI(stageId);
}

function scoreEntries(rawEntries, stage) {
  const seen = new Set();
  let recallPosition = 0;
  const targetSet = stage.targetList ? targetSets[stage.targetList] : null;
  const otherList = stage.targetList === "A" ? "B" : stage.targetList === "B" ? "A" : null;
  const otherSet = otherList ? targetSets[otherList] : null;

  return rawEntries.map(entry => {
    const normalized = entry.normalized;
    const canonical = entry.canonical || canonicalizeWord(normalized);
    const token = canonical || normalized;
    let classification = "intrusion";
    let recallOrder = "--";

    if (token && seen.has(token)) {
      classification = "repeat";
    } else if (targetSet && token && targetSet.has(token)) {
      classification = "correct";
      recallPosition += 1;
      recallOrder = recallPosition;
      seen.add(token);
    } else if (otherSet && token && otherSet.has(token)) {
      classification = "other-list";
      seen.add(token);
    } else if (token) {
      classification = "intrusion";
      seen.add(token);
    }

    return {
      word: entry.original,
      classification,
      recallOrder,
      token
    };
  });
}

function updateStageUI(stageId) {
  const stageState = stateByStage[stageId];
  const elements = stageElements[stageId];
  const status = stageState.status;

  elements.statusBadge.textContent = formatStatus(status);
  const statusClass =
    status === "listening"
      ? "listening"
      : status === "completed"
      ? "completed"
      : status === "finishing"
      ? "finishing"
      : "";
  elements.statusBadge.className = `status-badge ${statusClass}`;

  if (!stageState.rawWords.length) {
    elements.liveWords.innerHTML = '<span class="muted">No words captured yet.</span>';
  } else {
    const frag = document.createDocumentFragment();
    stageState.rawWords.forEach(entry => {
      const chip = document.createElement("span");
      chip.textContent = entry.original;
      frag.appendChild(chip);
    });
    elements.liveWords.innerHTML = "";
    elements.liveWords.appendChild(frag);
  }

  if (stageState.scoredEntries.length) {
    elements.results.classList.remove("hidden");
    const tbody = document.createDocumentFragment();
    stageState.scoredEntries.forEach(entry => {
      const tr = document.createElement("tr");
      const wordTd = document.createElement("td");
      wordTd.textContent = entry.word;
      const classTd = document.createElement("td");
      const badge = document.createElement("span");
      badge.className = `classification-tag ${entry.classification}`;
      badge.textContent = formatClassification(entry.classification);
      classTd.appendChild(badge);
      const orderTd = document.createElement("td");
      orderTd.textContent = entry.recallOrder;
      tr.append(wordTd, classTd, orderTd);
      tbody.appendChild(tr);
    });
    elements.resultsBody.innerHTML = "";
    elements.resultsBody.appendChild(tbody);
  } else {
    elements.results.classList.add("hidden");
    elements.resultsBody.innerHTML = "";
  }

  elements.startBtn.disabled = !speechSupported || status === "listening" || status === "finishing";
  if (getStageLockState(stageId)) {
    elements.startBtn.disabled = true;
  }
  elements.finishBtn.disabled = status !== "listening";
  updateCountdown(stageId);
  handleDelayNote(stageId);
  updateScoringTable();
}

function updateAllButtons() {
  stageBlueprints.forEach(stage => updateStageUI(stage.id));
}

function formatStatus(status) {
  switch (status) {
    case "listening":
      return "Listening";
    case "completed":
      return "Completed";
    case "finishing":
      return "Finishing";
    default:
      return "Idle";
  }
}

function formatClassification(value) {
  switch (value) {
    case "correct":
      return "Correct";
    case "repeat":
      return "Repeated";
    case "other-list":
      return "Other list";
    default:
      return "Intrusion";
  }
}

function startStageTimer(stageId) {
  const stageState = stateByStage[stageId];
  if (!stageState.timer) {
    stageState.timer = { remainingMs: 60000, endTime: null, rafId: null, startTime: null };
  }
  clearStageTimer(stageId);
  stageState.timer.remainingMs = 60000;
  stageState.timer.endTime = Date.now() + 60000;
  stageState.timer.startTime = performance.now();
  updateCountdown(stageId);
  stageState.timer.rafId = requestAnimationFrame(timestamp => handleTimerFrame(stageId, timestamp));
}

function clearStageTimer(stageId) {
  const timer = stateByStage[stageId].timer;
  if (timer && timer.endTime) {
    timer.endTime = null;
  }
  if (timer && timer.rafId) {
    cancelAnimationFrame(timer.rafId);
    timer.rafId = null;
  }
  if (timer) {
    timer.startTime = null;
  }
}

function handleTimerFrame(stageId, timestamp) {
  const stageState = stateByStage[stageId];
  if (!stageState || !stageState.timer || stageState.status !== "listening") {
    clearStageTimer(stageId);
    return;
  }
  const elapsed = timestamp - (stageState.timer.startTime || timestamp);
  const remaining = 60000 - elapsed;
  if (remaining <= 0) {
    stageState.timer.remainingMs = 0;
    updateCountdown(stageId);
    clearStageTimer(stageId);
    stageState.status = "finishing";
    updateStageUI(stageId);
    if (activeStageId === stageId && recognition) {
      recognition.stop();
    }
    return;
  }
  stageState.timer.remainingMs = remaining;
  updateCountdown(stageId);
  stageState.timer.rafId = requestAnimationFrame(nextTimestamp => handleTimerFrame(stageId, nextTimestamp));
}

function getStageLockState(stageId) {
  if (stageId === TRIAL7_STAGE_ID) {
    if (!stageTiming.a7EarliestStart) {
      return true;
    }
    return Date.now() < stageTiming.a7EarliestStart;
  }
  return false;
}

function canStartStage(stageId) {
  if (stageId === TRIAL7_STAGE_ID) {
    if (!stageTiming.a7EarliestStart) {
      alert("Complete Trial 6 before starting delayed recall.");
      return false;
    }
    const remaining = stageTiming.a7EarliestStart - Date.now();
    if (remaining > 0) {
      alert(`Delayed recall will unlock in ${formatTimer(Math.ceil(remaining / 1000) * 1000)}.`);
      return false;
    }
  }
  return true;
}

function handleDelayNote(stageId) {
  clearDelayNoteTimer();
  const elements = stageElements[stageId];
  if (!elements || !elements.delayNote) {
    return;
  }
  if (stageId !== TRIAL7_STAGE_ID) {
    elements.delayNote.classList.add("hidden");
    return;
  }
  const earliest = stageTiming.a7EarliestStart;
  elements.delayNote.classList.remove("hidden");
  if (!earliest) {
    elements.delayNoteText.textContent = "Complete Trial 6 (Immediate Recall) before administering delayed recall.";
    return;
  }
  const remaining = getDelayRemainingMs();
  if (remaining > 0) {
    elements.delayNoteText.textContent = `Wait at least 15 minutes. Ready in ${formatTimer(remaining)}.`;
    delayNoteTimer = setTimeout(() => {
      delayNoteTimer = null;
      updateStageUI(stageId);
    }, 1000);
  } else {
    elements.delayNoteText.textContent = `Minimum delay met at ${formatTime(earliest)}. You may begin delayed recall.`;
  }
}

function clearDelayNoteTimer() {
  if (delayNoteTimer) {
    clearTimeout(delayNoteTimer);
    delayNoteTimer = null;
  }
}

function getDelayRemainingMs() {
  if (!stageTiming.a7EarliestStart) {
    return null;
  }
  return stageTiming.a7EarliestStart - Date.now();
}

function clearDelayTiming() {
  stageTiming.a6CompletedAt = null;
  stageTiming.a7EarliestStart = null;
  updateStageUI(TRIAL7_STAGE_ID);
}

function setupScoringTable() {
  if (!dom.scoringBody) {
    return;
  }
  dom.scoringBody.innerHTML = "";
  scoringRows.length = 0;
  dom.totalCells = {};
  dom.intrusionCells = {};
  LIST_A.forEach((word, index) => {
    const row = document.createElement("tr");
    const wordCell = document.createElement("th");
    wordCell.textContent = word;
    row.appendChild(wordCell);
    const canonicalA = canonicalizeWord(word);
    const stageCells = {};
    LIST_A_TRIAL_IDS.forEach(stageId => {
      const td = document.createElement("td");
      td.dataset.stage = stageId;
      td.dataset.token = canonicalA;
      row.appendChild(td);
      stageCells[stageId] = td;
    });

    const trial6Cell = document.createElement("td");
    trial6Cell.dataset.stage = TRIAL6_STAGE_ID;
    trial6Cell.dataset.token = canonicalA;
    row.appendChild(trial6Cell);

    const trial7Cell = document.createElement("td");
    trial7Cell.dataset.stage = TRIAL7_STAGE_ID;
    trial7Cell.dataset.token = canonicalA;
    row.appendChild(trial7Cell);

    const listBWord = LIST_B[index] || "";
    const listBCell = document.createElement("th");
    listBCell.textContent = listBWord;
    row.appendChild(listBCell);

    const canonicalB = canonicalizeWord(listBWord);
    const listBRecallCell = document.createElement("td");
    listBRecallCell.dataset.stage = LIST_B_STAGE_ID;
    listBRecallCell.dataset.token = canonicalB;
    row.appendChild(listBRecallCell);

    scoringRows.push({
      stageCells,
      trial6Cell,
      trial7Cell,
      listBRecallCell,
      canonicalA,
      canonicalB
    });
    dom.scoringBody.appendChild(row);
  });

  document.querySelectorAll("[data-total-stage]").forEach(cell => {
    dom.totalCells[cell.dataset.totalStage] = cell;
  });
  document.querySelectorAll("[data-intrusion-stage]").forEach(cell => {
    dom.intrusionCells[cell.dataset.intrusionStage] = cell;
  });
}

function updateScoringTable() {
  if (!scoringRows.length) {
    return;
  }
  const stageMaps = {};
  [...LIST_A_TRIAL_IDS, TRIAL6_STAGE_ID, TRIAL7_STAGE_ID, LIST_B_STAGE_ID].forEach(stageId => {
    stageMaps[stageId] = getStageRecallMap(stageId);
  });

  scoringRows.forEach(row => {
    LIST_A_TRIAL_IDS.forEach(stageId => {
      const cell = row.stageCells[stageId];
      if (cell) {
        cell.textContent = stageMaps[stageId][row.canonicalA] || "";
      }
    });
    if (row.trial6Cell) {
      row.trial6Cell.textContent = stageMaps[TRIAL6_STAGE_ID][row.canonicalA] || "";
    }
    if (row.trial7Cell) {
      row.trial7Cell.textContent = stageMaps[TRIAL7_STAGE_ID][row.canonicalA] || "";
    }
    if (row.listBRecallCell) {
      row.listBRecallCell.textContent = stageMaps[LIST_B_STAGE_ID][row.canonicalB] || "";
    }
  });

  updateScoringSummary();
}

function getStageRecallMap(stageId) {
  const stageState = stateByStage[stageId];
  if (!stageState || !stageState.scoredEntries.length) {
    return {};
  }
  return stageState.scoredEntries.reduce((acc, entry) => {
    if (entry.classification === "correct" && entry.token) {
      acc[entry.token] = entry.recallOrder;
    }
    return acc;
  }, {});
}

function updateScoringSummary() {
  const stagesToTrack = [...LIST_A_TRIAL_IDS, TRIAL6_STAGE_ID, TRIAL7_STAGE_ID, LIST_B_STAGE_ID];
  stagesToTrack.forEach(stageId => {
    const counts = getStageCounts(stageId);
    if (dom.totalCells[stageId]) {
      dom.totalCells[stageId].textContent = counts.correct ? counts.correct : "";
    }
    if (dom.intrusionCells[stageId]) {
      dom.intrusionCells[stageId].textContent = counts.intrusions ? counts.intrusions : "";
    }
  });
}

function getStageCounts(stageId) {
  const stageState = stateByStage[stageId];
  if (!stageState) {
    return { correct: 0, intrusions: 0 };
  }
  return stageState.scoredEntries.reduce(
    (acc, entry) => {
      if (entry.classification === "correct") {
        acc.correct += 1;
      } else if (entry.classification === "intrusion") {
        acc.intrusions += 1;
      }
      return acc;
    },
    { correct: 0, intrusions: 0 }
  );
}

function updateCountdown(stageId) {
  const stageState = stateByStage[stageId];
  const elements = stageElements[stageId];
  if (!elements || !stageState || !elements.countdown) {
    return;
  }
  const timer = stageState.timer || { remainingMs: 60000 };
  const remaining = typeof timer.remainingMs === "number" ? timer.remainingMs : 60000;
  elements.countdown.textContent = formatTimer(remaining);
}

function formatTimer(ms = 60000) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normalizeWord(word = "") {
  return word
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function canonicalizeWord(word = "") {
  const normalized = normalizeWord(word);
  return singularizeWord(normalized);
}

function buildTargetSet(words) {
  const forms = new Set();
  words.forEach(word => {
    getWordForms(word).forEach(form => {
      if (form) {
        forms.add(form);
      }
    });
  });
  return forms;
}

function getWordForms(word) {
  const normalized = normalizeWord(word);
  if (!normalized) {
    return [];
  }
  const result = new Set();
  result.add(normalized);
  const singular = singularizeWord(normalized);
  result.add(singular);
  const pluralFromNormalized = pluralizeWord(normalized);
  result.add(pluralFromNormalized);
  const pluralFromSingular = pluralizeWord(singular);
  result.add(pluralFromSingular);
  return Array.from(result).filter(Boolean);
}

function singularizeWord(word = "") {
  if (!word) {
    return "";
  }
  if (word.endsWith("IES") && word.length > 3) {
    return word.slice(0, -3) + "Y";
  }
  const esEndings = ["XES", "ZES", "CHES", "SHES"];
  if (word.endsWith("ES") && esEndings.some(ending => word.endsWith(ending))) {
    return word.slice(0, -2);
  }
  if (word.endsWith("S") && !word.endsWith("SS")) {
    return word.slice(0, -1);
  }
  return word;
}

function pluralizeWord(word = "") {
  if (!word) {
    return "";
  }
  const vowels = new Set(["A", "E", "I", "O", "U"]);
  if (word.endsWith("Y") && word.length > 1 && !vowels.has(word.charAt(word.length - 2))) {
    return word.slice(0, -1) + "IES";
  }
  const esEndings = ["S", "X", "Z", "CH", "SH"];
  if (esEndings.some(ending => word.endsWith(ending))) {
    return word + "ES";
  }
  return word + "S";
}
