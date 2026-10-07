const transport = Tone.getTransport()
transport.bpm.value = 118

const synthSettings = {
  volume: -14,
  envelope: {
    attack: 0.2,
    decay: 0.35,
    sustain: 0.7,
    release: 0.8
  },
  oscillator: {
    type: 'sine'
  }
}

const bassSettings = {
  volume: -12,
  envelope: {
    attack: 0.05,
    decay: 0.2,
    sustain: 0.35,
    release: 0.8
  },
  oscillator: {
    type: 'sawtooth'
  }
}

const synth1 = new Tone.PolySynth(Tone.Synth).toDestination()
const synth2 = new Tone.PolySynth(Tone.Synth).toDestination()
const bassSynth = new Tone.PolySynth(Tone.Synth).toDestination()
const synth3 = new Tone.PolySynth(Tone.Synth).toDestination()
const bassSynth2 = new Tone.PolySynth(Tone.Synth).toDestination()
const hatSynth = new Tone.PolySynth(Tone.Synth).toDestination()

synth1.set(synthSettings)
synth2.set(synthSettings)
bassSynth.set(bassSettings)
synth3.set({
  volume: -18,
  envelope: { attack: 0.01, decay: 0.12, sustain: 0.05, release: 1.2 },
  oscillator: { type: 'triangle' }
})
bassSynth2.set({
  volume: -17,
  envelope: { attack: 0.02, decay: 0.18, sustain: 0.2, release: 0.35 },
  oscillator: { type: 'square' }
})
hatSynth.set({
  volume: -28,
  envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.02 },
  oscillator: { type: 'square' }
})

const synth1Sequence = [
  { time: '0:0:0', noteName: 'A3', duration: '8n', velocity: 0.58 },
  { time: '0:0:2', noteName: 'E4', duration: '8n', velocity: 0.42 },
  { time: '0:1:0', noteName: 'C4', duration: '8n', velocity: 0.52 },
  { time: '0:1:2', noteName: 'E4', duration: '8n', velocity: 0.46 },
  { time: '0:2:0', noteName: 'G4', duration: '8n', velocity: 0.62 },
  { time: '0:2:2', noteName: 'E4', duration: '16n', velocity: 0.38 },
  { time: '0:3:0', noteName: 'C4', duration: '8n', velocity: 0.5 },
  { time: '0:3:2', noteName: 'B3', duration: '8n', velocity: 0.42 },
  { time: '1:0:0', noteName: 'F3', duration: '8n', velocity: 0.58 },
  { time: '1:0:2', noteName: 'C4', duration: '8n', velocity: 0.42 },
  { time: '1:1:0', noteName: 'A3', duration: '8n', velocity: 0.52 },
  { time: '1:1:2', noteName: 'C4', duration: '8n', velocity: 0.46 },
  { time: '1:2:0', noteName: 'E4', duration: '8n', velocity: 0.62 },
  { time: '1:2:2', noteName: 'G4', duration: '16n', velocity: 0.38 },
  { time: '1:3:0', noteName: 'A4', duration: '8n', velocity: 0.5 },
  { time: '1:3:2', noteName: 'E4', duration: '8n', velocity: 0.42 }
]

const synth2Sequence = [
  { time: '0:0:0', noteName: ['A4', 'C5', 'E5'], duration: '4n', velocity: 0.22 },
  { time: '0:2:2', noteName: ['G4', 'B4', 'E5'], duration: '8n', velocity: 0.18 },
  { time: '0:3:2', noteName: ['G4', 'B4', 'D5'], duration: '8n', velocity: 0.2 },
  { time: '1:0:0', noteName: ['F4', 'A4', 'C5'], duration: '4n', velocity: 0.22 },
  { time: '1:2:2', noteName: ['E4', 'G4', 'C5'], duration: '8n', velocity: 0.18 },
  { time: '1:3:2', noteName: ['E4', 'G4', 'B4'], duration: '8n', velocity: 0.2 }
]

const bassSequence = [
  { time: '0:0:0', noteName: 'A1', duration: '8n', velocity: 0.82 },
  { time: '0:1:2', noteName: 'A1', duration: '16n', velocity: 0.62 },
  { time: '0:2:0', noteName: 'E2', duration: '8n', velocity: 0.76 },
  { time: '0:3:2', noteName: 'G1', duration: '16n', velocity: 0.66 },
  { time: '1:0:0', noteName: 'F1', duration: '8n', velocity: 0.82 },
  { time: '1:1:2', noteName: 'F1', duration: '16n', velocity: 0.62 },
  { time: '1:2:0', noteName: 'C2', duration: '8n', velocity: 0.76 },
  { time: '1:3:0', noteName: 'E2', duration: '16n', velocity: 0.68 },
  { time: '1:3:2', noteName: 'G1', duration: '16n', velocity: 0.58 }
]

const synth3Sequence = [
  { time: '0:1:2', noteName: 'E5', duration: '16n', velocity: 0.28 },
  { time: '0:3:2', noteName: 'B5', duration: '16n', velocity: 0.32 },
  { time: '1:1:2', noteName: 'C6', duration: '16n', velocity: 0.3 },
  { time: '1:3:2', noteName: 'G5', duration: '16n', velocity: 0.28 }
]

const bass2Sequence = [
  { time: '0:0:2', noteName: 'E2', duration: '16n', velocity: 0.45 },
  { time: '0:2:2', noteName: 'G2', duration: '16n', velocity: 0.5 },
  { time: '1:0:2', noteName: 'C2', duration: '16n', velocity: 0.45 },
  { time: '1:2:2', noteName: 'E2', duration: '16n', velocity: 0.5 }
]

const kickSequence = [
  { time: '0:0:0', noteName: 'C2', duration: '8n', velocity: 0.9 },
  { time: '0:2:0', noteName: 'C2', duration: '8n', velocity: 0.82 },
  { time: '0:3:2', noteName: 'C2', duration: '16n', velocity: 0.48 },
  { time: '1:0:0', noteName: 'C2', duration: '8n', velocity: 0.9 },
  { time: '1:2:0', noteName: 'C2', duration: '8n', velocity: 0.82 }
]

const snareSequence = [
  { time: '0:1:0', noteName: 'D2', duration: '8n', velocity: 0.72 },
  { time: '0:3:0', noteName: 'D2', duration: '8n', velocity: 0.76 },
  { time: '1:1:0', noteName: 'D2', duration: '8n', velocity: 0.72 },
  { time: '1:3:0', noteName: 'D2', duration: '8n', velocity: 0.78 }
]

const hatSequence = [
  { time: '0:0:2', noteName: 'C7', duration: '32n', velocity: 0.12 },
  { time: '0:1:2', noteName: 'C7', duration: '32n', velocity: 0.1 },
  { time: '0:2:2', noteName: 'C7', duration: '32n', velocity: 0.12 },
  { time: '0:3:2', noteName: 'C7', duration: '32n', velocity: 0.1 },
  { time: '1:0:2', noteName: 'C7', duration: '32n', velocity: 0.12 },
  { time: '1:1:2', noteName: 'C7', duration: '32n', velocity: 0.1 },
  { time: '1:2:2', noteName: 'C7', duration: '32n', velocity: 0.12 },
  { time: '1:3:2', noteName: 'C7', duration: '32n', velocity: 0.1 }
]

const drumsSequence = [
  { time: '0:0:0', noteName: 'C2', duration: '8n', velocity: 0.9 },
  { time: '0:1:0', noteName: 'D2', duration: '8n', velocity: 0.72 },
  { time: '0:1:2', noteName: 'C2', duration: '16n', velocity: 0.48 },
  { time: '0:2:0', noteName: 'C2', duration: '8n', velocity: 0.82 },
  { time: '0:3:0', noteName: 'D2', duration: '8n', velocity: 0.76 },
  { time: '0:3:3', noteName: 'C2', duration: '16n', velocity: 0.5 },
  { time: '1:0:0', noteName: 'C2', duration: '8n', velocity: 0.9 },
  { time: '1:1:0', noteName: 'D2', duration: '8n', velocity: 0.72 },
  { time: '1:2:0', noteName: 'C2', duration: '8n', velocity: 0.82 },
  { time: '1:2:2', noteName: 'C2', duration: '16n', velocity: 0.48 },
  { time: '1:3:0', noteName: 'D2', duration: '8n', velocity: 0.78 }
]

const drumsSampler = new Tone.Sampler({
  urls: {
    C2: 'BT7A0D0.WAV',
    D2: 'ST0T3S7.WAV'
  },
  baseUrl: 'https://raw.githubusercontent.com/ZakharDay/ADC-GID-26-27/main/tutorial_5/roland_tr_909/'
}).toDestination()

const synth1Part = new Tone.Part((time, note) => {
  synth1.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, synth1Sequence).start(0)

const synth2Part = new Tone.Part((time, note) => {
  synth2.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, synth2Sequence).start(0)

const bassPart = new Tone.Part((time, note) => {
  bassSynth.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, bassSequence).start(0)

const synth3Part = new Tone.Part((time, note) => {
  synth3.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, synth3Sequence).start(0)

const bass2Part = new Tone.Part((time, note) => {
  bassSynth2.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, bass2Sequence).start(0)

const kickPart = new Tone.Part((time, note) => {
  drumsSampler.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, kickSequence).start(0)

const snarePart = new Tone.Part((time, note) => {
  drumsSampler.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, snareSequence).start(0)

const hatPart = new Tone.Part((time, note) => {
  hatSynth.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, hatSequence).start(0)

synth1Part.loopEnd = '2m'
synth2Part.loopEnd = '2m'
bassPart.loopEnd = '2m'
synth3Part.loopEnd = '2m'
bass2Part.loopEnd = '2m'
kickPart.loopEnd = '2m'
snarePart.loopEnd = '2m'
hatPart.loopEnd = '2m'

synth1Part.loop = true
synth2Part.loop = true
bassPart.loop = true
synth3Part.loop = true
bass2Part.loop = true
kickPart.loop = true
snarePart.loop = true
hatPart.loop = true

synth1Part.mute = true
synth2Part.mute = true
bassPart.mute = true
synth3Part.mute = true
bass2Part.mute = true
kickPart.mute = true
snarePart.mute = true
hatPart.mute = true

let audioStarted = false

async function startAudio() {
  if (audioStarted) return
  await Tone.start()
  transport.start()
  audioStarted = true
}

function initSynthPanel(panel, synth) {
  panel.querySelectorAll('[data-envelope]').forEach((slider) => {
    slider.addEventListener('input', (event) => {
      const name = event.target.dataset.envelope

      synth.set({
        envelope: {
          [name]: Number(event.target.value)
        }
      })
    })
  })

  const buttons = panel.querySelectorAll('[data-wave]')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let type = button.dataset.wave

      if (type === 'pulse') {
        type = 'square'
      }

      synth.set({
        oscillator: {
          type: type
        }
      })

      buttons.forEach((item) => {
        item.classList.remove('active')
      })

      button.classList.add('active')
    })
  })
}

function initPowerButtons() {
  document.querySelectorAll('[data-power]').forEach((button) => {
    button.classList.remove('active')

    button.addEventListener('click', async () => {
      await startAudio()

      const power = button.dataset.power

      if (power === 'synth1') {
        synth1Part.mute = !synth1Part.mute
        button.classList.toggle('active', !synth1Part.mute)
      }

      if (power === 'synth2') {
        synth2Part.mute = !synth2Part.mute
        button.classList.toggle('active', !synth2Part.mute)
      }

      if (power === 'bass') {
        bassPart.mute = !bassPart.mute
        button.classList.toggle('active', !bassPart.mute)
      }

      if (power === 'synth3') {
        synth3Part.mute = !synth3Part.mute
        button.classList.toggle('active', !synth3Part.mute)
      }

      if (power === 'bass2') {
        bass2Part.mute = !bass2Part.mute
        button.classList.toggle('active', !bass2Part.mute)
      }

      if (power === 'kick') {
        kickPart.mute = !kickPart.mute
        button.classList.toggle('active', !kickPart.mute)
      }

      if (power === 'snare') {
        snarePart.mute = !snarePart.mute
        button.classList.toggle('active', !snarePart.mute)
      }

      if (power === 'hat') {
        hatPart.mute = !hatPart.mute
        button.classList.toggle('active', !hatPart.mute)
      }
    })
  })
}

function updateKnob(input) {
  const min = Number(input.min)
  const max = Number(input.max)
  const value = Number(input.value)
  const percent = (value - min) / (max - min)

  input.closest('.dial').style.setProperty('--value', percent)
}

function initBassControls() {
  const drive = document.getElementById('drive')
  const cutoff = document.getElementById('cutoff')
  const resonance = document.getElementById('resonance')
  const sub = document.getElementById('sub')

  ;[drive, cutoff, resonance].forEach((input) => {
    updateKnob(input)
    input.addEventListener('input', () => {
      updateKnob(input)
    })
  })

  drive.addEventListener('input', (event) => {
    const value = Number(event.target.value)
    bassSynth.set({
      oscillator: {
        type: value > 0.55 ? 'square' : 'sawtooth'
      }
    })
  })

  cutoff.addEventListener('input', (event) => {
    const value = Number(event.target.value)
    bassSynth.detune.value = (value - 1600) / 5
  })

  resonance.addEventListener('input', (event) => {
    const value = Number(event.target.value)
    bassSynth.set({
      envelope: {
        release: 0.2 + value / 5
      }
    })
  })

  sub.addEventListener('input', (event) => {
    bassSynth.volume.value = Number(event.target.value)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initSynthPanel(document.querySelector('[data-synth="1"]'), synth1)
  initSynthPanel(document.querySelector('[data-synth="2"]'), synth2)
  initPowerButtons()
  initBassControls()
})