const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

let waveType = "sine";
const activeVoices = new Map();

const notes = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
};

const keyMap = {
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
  k: "C5",
};

const attack = document.querySelector("#attack");
const decay = document.querySelector("#decay");
const sustain = document.querySelector("#sustain");
const release = document.querySelector("#release");

document.querySelectorAll(".wave-button").forEach((button) => {
  button.addEventListener("click", () => {
    waveType = button.dataset.wave;
    document.querySelectorAll(".wave-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

function startNote(note) {
  if (activeVoices.has(note)) return;

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = waveType;
  osc.frequency.value = notes[note];

  const a = Number(attack.value);
  const d = Number(decay.value);
  const s = Number(sustain.value);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(1, now + a);
  gain.gain.exponentialRampToValueAtTime(Math.max(s, 0.0001), now + a + d);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();

  activeVoices.set(note, { osc, gain });
  setKeyState(note, true);
}

function stopNote(note) {
  const voice = activeVoices.get(note);
  if (!voice) return;

  const now = audioCtx.currentTime;
  const r = Number(release.value);

  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
  voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + r);
  voice.osc.stop(now + r + 0.05);

  activeVoices.delete(note);
  setKeyState(note, false);
}

function setKeyState(note, isActive) {
  const button = document.querySelector('[data-note="' + note + '"]');
  if (button) button.classList.toggle("is-active", isActive);
}

document.querySelectorAll("[data-note]").forEach((button) => {
  const note = button.dataset.note;

  button.addEventListener("pointerdown", () => startNote(note));
  button.addEventListener("pointerup", () => stopNote(note));
  button.addEventListener("pointerleave", () => stopNote(note));
});

window.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  const note = keyMap[event.key.toLowerCase()];
  if (note) startNote(note);
});

window.addEventListener("keyup", (event) => {
  const note = keyMap[event.key.toLowerCase()];
  if (note) stopNote(note);
});
