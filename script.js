const transport = Tone.getTransport()
transport.bpm.value = 112

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

synth1.set(synthSettings)
synth2.set(synthSettings)
bassSynth.set(bassSettings)

const synth1Sequence = [
  { time: '0:0:0', noteName: 'C4', duration: '8n', velocity: 0.65 },
  { time: '0:1:0', noteName: 'E4', duration: '8n', velocity: 0.55 },
  { time: '0:2:0', noteName: 'G4', duration: '8n', velocity: 0.65 },
  { time: '0:3:0', noteName: 'E4', duration: '8n', velocity: 0.55 },
  { time: '1:0:0', noteName: 'A3', duration: '8n', velocity: 0.65 },
  { time: '1:1:0', noteName: 'C4', duration: '8n', velocity: 0.55 },
  { time: '1:2:0', noteName: 'E4', duration: '8n', velocity: 0.65 },
  { time: '1:3:0', noteName: 'G4', duration: '8n', velocity: 0.55 }
]

const synth2Sequence = [
  { time: '0:0:0', noteName: 'C5', duration: '4n', velocity: 0.3 },
  { time: '0:2:0', noteName: 'B4', duration: '4n', velocity: 0.3 },
  { time: '1:0:0', noteName: 'A4', duration: '4n', velocity: 0.3 },
  { time: '1:2:0', noteName: 'G4', duration: '4n', velocity: 0.3 }
]

const bassSequence = [
  { time: '0:0:0', noteName: 'C2', duration: '8n', velocity: 0.8 },
  { time: '0:2:0', noteName: 'C2', duration: '8n', velocity: 0.7 },
  { time: '1:0:0', noteName: 'A1', duration: '8n', velocity: 0.8 },
  { time: '1:2:0', noteName: 'G1', duration: '8n', velocity: 0.75 }
]

const synth1Part = new Tone.Part((time, note) => {
  synth1.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, synth1Sequence).start(0)

const synth2Part = new Tone.Part((time, note) => {
  synth2.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, synth2Sequence).start(0)

const bassPart = new Tone.Part((time, note) => {
  bassSynth.triggerAttackRelease(note.noteName, note.duration, time, note.velocity)
}, bassSequence).start(0)

synth1Part.loopEnd = '2m'
synth2Part.loopEnd = '2m'
bassPart.loopEnd = '2m'

synth1Part.loop = true
synth2Part.loop = true
bassPart.loop = true

synth1Part.mute = true
synth2Part.mute = true
bassPart.mute = true

let audioStarted = false

async function startAudio() {
  if (audioStarted) return
  await Tone.start()
  transport.start()
  audioStarted = true

  const status = document.getElementById('audioStatus')
  status.textContent = 'audio on'
  status.classList.add('on')
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