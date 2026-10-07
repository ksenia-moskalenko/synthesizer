const synthSettings = {
  volume: -8,
  portamento: 0.05,
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

const synth = new Tone.PolySynth(Tone.Synth, synthSettings).toDestination()

const keyMap = {
  a: 'C4',
  s: 'D4',
  d: 'E4',
  f: 'F4',
  g: 'G4',
  h: 'A4',
  j: 'B4',
  k: 'C5'
}

function initWebAudio() {
  Tone.start()
}

function setKeyState(note, isActive) {
  const button = document.querySelector('[data-note="' + note + '"]')

  if (button) {
    button.classList.toggle('is-active', isActive)
  }
}

function playNote(note) {
  initWebAudio()
  synth.triggerAttack(note)
  setKeyState(note, true)
}

function stopNote(note) {
  synth.triggerRelease(note)
  setKeyState(note, false)
}

function initWaveButtons() {
  const waveButtons = document.querySelectorAll('.wave-button')

  waveButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const waveType = button.dataset.wave

      synth.set({
        oscillator: {
          type: waveType
        }
      })

      waveButtons.forEach((item) => {
        item.classList.remove('is-active')
      })

      button.classList.add('is-active')
    })
  })
}

function initEnvelopeControls() {
  const attack = document.getElementById('attack')
  const decay = document.getElementById('decay')
  const sustain = document.getElementById('sustain')
  const release = document.getElementById('release')

  attack.addEventListener('input', (event) => {
    synth.set({
      envelope: {
        attack: Number(event.target.value)
      }
    })
  })

  decay.addEventListener('input', (event) => {
    synth.set({
      envelope: {
        decay: Number(event.target.value)
      }
    })
  })

  sustain.addEventListener('input', (event) => {
    synth.set({
      envelope: {
        sustain: Number(event.target.value)
      }
    })
  })

  release.addEventListener('input', (event) => {
    synth.set({
      envelope: {
        release: Number(event.target.value)
      }
    })
  })
}

function initKeyboard() {
  const keys = document.querySelectorAll('[data-note]')

  keys.forEach((button) => {
    const note = button.dataset.note

    button.addEventListener('pointerdown', () => {
      playNote(note)
    })

    button.addEventListener('pointerup', () => {
      stopNote(note)
    })

    button.addEventListener('pointerleave', () => {
      stopNote(note)
    })
  })

  window.addEventListener('keydown', (event) => {
    if (event.repeat) {
      return
    }

    const note = keyMap[event.key.toLowerCase()]

    if (note) {
      playNote(note)
    }
  })

  window.addEventListener('keyup', (event) => {
    const note = keyMap[event.key.toLowerCase()]

    if (note) {
      stopNote(note)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initWaveButtons()
  initEnvelopeControls()
  initKeyboard()
})
