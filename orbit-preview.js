const transport = Tone.getTransport();

// Read actual instrument output. Meter receives a parallel signal,
// so sound still goes to the speakers normally.
const visualMeter = new Tone.Meter({ normalRange: true, smoothing: 0.65 });
let orbEnergy = 0;

function animateOrbs() {
  const measured = visualMeter.getValue();
  const amplitude =
    typeof measured === "number" && Number.isFinite(measured) ? measured : 0;
  const target = Math.min(1, amplitude * 14);
  orbEnergy += (target - orbEnergy) * (target > orbEnergy ? 0.12 : 0.05);

  document.querySelectorAll(".orb-group").forEach((orb, index) => {
    const strength = index % 1 === 0 ? 0.12 : index % 3 === 1 ? 0.08 : 0.05;
    orb.style.setProperty(
      "--audio-scale",
      (1 + orbEnergy * strength).toFixed(3),
    );
  });
  requestAnimationFrame(animateOrbs);
}
requestAnimationFrame(animateOrbs);
transport.bpm.value = 118;

const synthSettings = {
  volume: -14,
  envelope: {
    attack: 0.2,
    decay: 0.35,
    sustain: 0.7,
    release: 0.8,
  },
  oscillator: {
    type: "sine",
  },
};

const bassSettings = {
  volume: -12,
  envelope: {
    attack: 0.05,
    decay: 0.2,
    sustain: 0.35,
    release: 0.8,
  },
  oscillator: {
    type: "sawtooth",
  },
};

const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
// Warm, rounded second voice for the interference-inspired sound.
const synth2Filter = new Tone.Filter(1050, "lowpass").toDestination();
const synth2 = new Tone.PolySynth(Tone.Synth).connect(synth2Filter);
const bassSynth = new Tone.PolySynth(Tone.Synth).toDestination();

synth1.set(synthSettings);
synth2.set({
  volume: -18,
  oscillator: { type: "triangle" },
  envelope: { attack: 0.12, decay: 0.5, sustain: 0.35, release: 1.1 },
});
bassSynth.set({ ...bassSettings, oscillator: { type: "triangle" }, volume: -15 });

const synth1Sequence = [
  { time: "0:0:0", noteName: "A3", duration: "8n", velocity: 0.58 },
  { time: "0:0:2", noteName: "E4", duration: "8n", velocity: 0.42 },
  { time: "0:1:0", noteName: "C4", duration: "8n", velocity: 0.52 },
  { time: "0:1:2", noteName: "E4", duration: "8n", velocity: 0.46 },
  { time: "0:2:0", noteName: "G4", duration: "8n", velocity: 0.62 },
  { time: "0:2:2", noteName: "E4", duration: "16n", velocity: 0.38 },
  { time: "0:3:0", noteName: "C4", duration: "8n", velocity: 0.5 },
  { time: "0:3:2", noteName: "B3", duration: "8n", velocity: 0.42 },
  { time: "1:0:0", noteName: "F3", duration: "8n", velocity: 0.58 },
  { time: "1:0:2", noteName: "C4", duration: "8n", velocity: 0.42 },
  { time: "1:1:0", noteName: "A3", duration: "8n", velocity: 0.52 },
  { time: "1:1:2", noteName: "C4", duration: "8n", velocity: 0.46 },
  { time: "1:2:0", noteName: "E4", duration: "8n", velocity: 0.62 },
  { time: "1:2:2", noteName: "G4", duration: "16n", velocity: 0.38 },
  { time: "1:3:0", noteName: "A4", duration: "8n", velocity: 0.5 },
  { time: "1:3:2", noteName: "E4", duration: "8n", velocity: 0.42 },
];

const synth2Sequence = [
  {
    time: "0:0:0",
    noteName: ["A4", "C5", "E5"],
    duration: "4n",
    velocity: 0.22,
  },
  {
    time: "0:2:2",
    noteName: ["G4", "B4", "E5"],
    duration: "8n",
    velocity: 0.18,
  },
  {
    time: "0:3:2",
    noteName: ["G4", "B4", "D5"],
    duration: "8n",
    velocity: 0.2,
  },
  {
    time: "1:0:0",
    noteName: ["F4", "A4", "C5"],
    duration: "4n",
    velocity: 0.22,
  },
  {
    time: "1:2:2",
    noteName: ["E4", "G4", "C5"],
    duration: "8n",
    velocity: 0.18,
  },
  {
    time: "1:3:2",
    noteName: ["E4", "G4", "B4"],
    duration: "8n",
    velocity: 0.2,
  },
];

const bassSequence = [
  { time: "0:0:0", noteName: "A1", duration: "8n", velocity: 0.82 },
  { time: "0:1:2", noteName: "A1", duration: "16n", velocity: 0.62 },
  { time: "0:2:0", noteName: "E2", duration: "8n", velocity: 0.76 },
  { time: "0:3:2", noteName: "G1", duration: "16n", velocity: 0.66 },
  { time: "1:0:0", noteName: "F1", duration: "8n", velocity: 0.82 },
  { time: "1:1:2", noteName: "F1", duration: "16n", velocity: 0.62 },
  { time: "1:2:0", noteName: "C2", duration: "8n", velocity: 0.76 },
  { time: "1:3:0", noteName: "E2", duration: "16n", velocity: 0.68 },
  { time: "1:3:2", noteName: "G1", duration: "16n", velocity: 0.58 },
];

const drumsSequence = [
  { time: "0:0:0", noteName: "C2", duration: "8n", velocity: 0.9 },
  { time: "0:1:0", noteName: "D2", duration: "8n", velocity: 0.72 },
  { time: "0:1:2", noteName: "C2", duration: "16n", velocity: 0.48 },
  { time: "0:2:0", noteName: "C2", duration: "8n", velocity: 0.82 },
  { time: "0:3:0", noteName: "D2", duration: "8n", velocity: 0.76 },
  { time: "0:3:3", noteName: "C2", duration: "16n", velocity: 0.5 },
  { time: "1:0:0", noteName: "C2", duration: "8n", velocity: 0.9 },
  { time: "1:1:0", noteName: "D2", duration: "8n", velocity: 0.72 },
  { time: "1:2:0", noteName: "C2", duration: "8n", velocity: 0.82 },
  { time: "1:2:2", noteName: "C2", duration: "16n", velocity: 0.48 },
  { time: "1:3:0", noteName: "D2", duration: "8n", velocity: 0.78 },
];

const drumsSampler = new Tone.Sampler({
  urls: {
    C2: "BT7A0D0.WAV",
    D2: "ST0T3S7.WAV",
  },
  baseUrl:
    "https://raw.githubusercontent.com/ZakharDay/ADC-GID-26-27/main/tutorial_5/roland_tr_909/",
}).toDestination();

// The meter listens to every instrument and the drum samples.
synth1.connect(visualMeter);
synth2.connect(visualMeter);
bassSynth.connect(visualMeter);
drumsSampler.connect(visualMeter);

const synth1Part = new Tone.Part((time, note) => {
  synth1.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity,
  );
}, synth1Sequence).start(0);

const synth2Part = new Tone.Part((time, note) => {
  synth2.triggerAttackRelease(
    note.noteName.map((pitch) => Tone.Frequency(pitch).transpose(-5).toNote()),
    note.duration,
    time,
    note.velocity * 0.8,
  );
}, synth2Sequence).start(0);

const bassPart = new Tone.Part((time, note) => {
  bassSynth.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity,
  );
}, bassSequence).start(0);

const drumsPart = new Tone.Part((time, note) => {
  drumsSampler.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.noteName === "D2" ? note.velocity * 0.62 : note.velocity * 0.82,
  );
}, drumsSequence).start(0);

synth1Part.loopEnd = "2m";
synth2Part.loopEnd = "2m";
bassPart.loopEnd = "2m";
drumsPart.loopEnd = "2m";

synth1Part.loop = true;
synth2Part.loop = true;
bassPart.loop = true;
drumsPart.loop = true;

synth1Part.mute = true;
synth2Part.mute = true;
bassPart.mute = true;
drumsPart.mute = true;

let audioStarted = false;

async function startAudio() {
  if (audioStarted) return;
  await Tone.start();
  drumsPart.mute = false;
  transport.start();
  audioStarted = true;
}

function initSynthPanel(panel, synth) {
  panel.querySelectorAll("[data-envelope]").forEach((slider) => {
    slider.addEventListener("input", (event) => {
      const name = event.target.dataset.envelope;

      synth.set({
        envelope: {
          [name]: Number(event.target.value),
        },
      });
    });
  });

  const buttons = panel.querySelectorAll("[data-wave]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let type = button.dataset.wave;

      if (type === "pulse") {
        type = "square";
      }

      synth.set({
        oscillator: {
          type: type,
        },
      });

      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  });
}

function initPowerButtons() {
  document.querySelectorAll("[data-power]").forEach((button) => {
    button.classList.remove("active");

    button.addEventListener("click", async () => {
      await startAudio();

      const power = button.dataset.power;

      if (power === "synth1") {
        synth1Part.mute = !synth1Part.mute;
        button.classList.toggle("active", !synth1Part.mute);
      }

      if (power === "synth2") {
        synth2Part.mute = !synth2Part.mute;
        button.classList.toggle("active", !synth2Part.mute);
      }

      if (power === "bass") {
        bassPart.mute = !bassPart.mute;
        button.classList.toggle("active", !bassPart.mute);
      }
    });
  });
}

function updateKnob(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const value = Number(input.value);
  const percent = (value - min) / (max - min);

  input.closest(".dial").style.setProperty("--value", percent);
}

function initBassControls() {
  const drive = document.getElementById("drive");
  const cutoff = document.getElementById("cutoff");
  const resonance = document.getElementById("resonance");
  const sub = document.getElementById("sub");

  [drive, cutoff, resonance].forEach((input) => {
    updateKnob(input);
    input.addEventListener("input", () => {
      updateKnob(input);
    });
  });

  drive.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    bassSynth.set({
      oscillator: {
        type: value > 0.55 ? "square" : "sawtooth",
      },
    });
  });

  cutoff.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    bassSynth.detune.value = (value - 1600) / 5;
  });

  resonance.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    bassSynth.set({
      envelope: {
        release: 0.2 + value / 5,
      },
    });
  });

  sub.addEventListener("input", (event) => {
    bassSynth.volume.value = Number(event.target.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSynthPanel(document.querySelector('[data-synth="1"]'), synth1);
  initSynthPanel(document.querySelector('[data-synth="2"]'), synth2);
  initPowerButtons();
  initBassControls();
});


// ORBIT edits the existing two synth parts and bass part, not separate voices.
const orbitSvg=document.getElementById('orbit-svg');
const orbitParts=[synth1Part,synth2Part,bassPart];
const orbitSequences=[synth1Sequence,synth2Sequence,bassSequence];
const orbitSteps=16,orbitRadii=[200,145,92],orbitCenter=230;
const svgNS='http://www.w3.org/2000/svg';
const orbitState=orbitSequences.map(seq=>Array.from({length:orbitSteps},(_,step)=>
 seq.some(note=>orbitStepOf(note.time)===step)));
let orbitPhase=0,orbitVisualStep=0;
function orbitStepOf(time){
 const [bar,beat,sixteenth]=time.split(':').map(Number);
 return (bar*8+beat*2+Math.floor(sixteenth/2))%orbitSteps;
}
function orbitPoint(radius,step){
 const angle=-Math.PI/2+step*Math.PI*2/orbitSteps;
 return [orbitCenter+radius*Math.cos(angle),orbitCenter+radius*Math.sin(angle)];
}
function orbitElement(tag,attrs){
 const el=document.createElementNS(svgNS,tag);
 Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));
 orbitSvg.appendChild(el);return el;
}
const orbitDots=[];
orbitRadii.forEach((radius,ring)=>{
 orbitElement('circle',{cx:230,cy:230,r:radius,class:'orbit-ring'});
 const dots=[];
 for(let step=0;step<orbitSteps;step++){
  const [cx,cy]=orbitPoint(radius,step);
  const dot=orbitElement('circle',{cx,cy,r:ring===0?9:7,class:'orbit-step'+(orbitState[ring][step]?' is-on':'')});
  const hit=orbitElement('circle',{cx,cy,r:18,class:'orbit-hit'});
  hit.addEventListener('click',()=>{
   orbitState[ring][step]=!orbitState[ring][step];
   dot.classList.toggle('is-on',orbitState[ring][step]);
   rebuildOrbitPart(ring);
  });
  dots.push(dot);
 }
 orbitDots.push(dots);
});
const orbitHand=orbitElement('line',{x1:230,y1:230,x2:230,y2:30,class:'orbit-hand'});
orbitElement('circle',{cx:230,cy:230,r:7,class:'orbit-center'});
function rebuildOrbitPart(ring){
 const part=orbitParts[ring];
 part.clear();
 orbitSequences[ring].forEach(note=>{
  const step=orbitStepOf(note.time);
  if(!orbitState[ring][step])return;
  const shifted=(step+(ring===1?orbitPhase:0))%orbitSteps;
  const bar=Math.floor(shifted/8),beat=Math.floor((shifted%8)/2),sub=(shifted%2)*2;
  part.add(bar+':'+beat+':'+sub,note);
 });
}
document.getElementById('orbit-tempo').addEventListener('input',event=>{
 transport.bpm.rampTo(Number(event.target.value),0.12);
});
document.getElementById('orbit-phase').addEventListener('input',event=>{
 orbitPhase=Math.round(Number(event.target.value)/100*15);
 rebuildOrbitPart(1);
});
function drawOrbit(){
 const progress=transport.state==='started'?(transport.ticks%(transport.PPQ*8))/(transport.PPQ*8):0;
 const [x,y]=orbitPoint(200,progress*orbitSteps);
 orbitHand.setAttribute('x2',x);orbitHand.setAttribute('y2',y);
 requestAnimationFrame(drawOrbit);
}
requestAnimationFrame(drawOrbit);
