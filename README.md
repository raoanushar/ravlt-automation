# Automated RAVLT Conductor

This prototype web page mirrors every spoken portion of the Rey Auditory Verbal Learning Test (RAVLT). It uses on-device speech recognition to capture the participant's recall in real time & score their responses.

> **Browser requirement:** Google Chrome (desktop) currently provides the most reliable Web Speech API implementation. Other browsers may disable the microphone, in which case the page shows a warning and the Start Listening buttons stay disabled.

## How to use it

1. Open `index.html` in Chrome. Allow microphone access the first time the page asks.
2. Work from top to bottom:
   - **Start Listening** at the beginning of a section to begin capturing the participant. A 60-second timer starts automatically and appears beside each section.
   - Read the printed prompt and word list verbatim (for List A Trials 1-5 and List B).
   - When the participant begins recalling words, each detected word appears as a chip under *Live transcription*. Recording stops automatically when the timer reaches zero (or you can press **Finish** sooner). Singular/plural variations of a list word (e.g., "drum"/"drums") are scored as correct automatically.
   - After Trial 6 completes, the app records the timestamp and enforces a 15-minute minimum delay before Trial 7. Section 8 shows a live countdown and unlocks automatically once the window is met.
3. Press **Finish** when the participant is done recalling words for that section. The tool labels every response as:
   - `Correct` (and assigns the recall order number)
   - `Repeated` (duplicate of any previously recalled word in that section)
   - `Other list` (word belongs to the opposite target list)
   - `Intrusion` (word is not part of either list)
4. Use **Reset Section** if you need to re-run a trial. This clears the captured audio tokens and returns the status to *Idle*.
5. Continue through immediate recall (Trial 6) and delayed recall after the 20-30 minute interval.

## What is included

- Section-by-section layout for:
  - List A Trials 1-5 (with script text and the 15 printed words)
  - List B interference trial
  - Immediate recall of List A (Trial 6)
  - Delayed recall of List A
- Live microphone capture with automatic restart if Chrome momentarily pauses recognition.
- Real-time word chips during recall so examiners can verify that speech is being heard.
- A full scoring table that auto-fills each word's recall order for Trials 1-7 (immediate + delayed) and List B, plus total recall and intrusion counts.
- Post-trial scoring table that follows RAVLT conventions (only correct words receive an order number; intrusions/repetitions do not).
- Reset controls per section so the examiner can quickly restart if the participant requests a do-over.


