const synthSettings = {
  volume: -10,
  envelope: { attack: 0.2, decay: 0.35, sustain: 0.7, release: 0.8 },
  oscillator: { type: 'sine' }
}

const synth1 = new Tone.PolySynth(Tone.Synth, synthSettings).toDestination()
const synth2 = new Tone.PolySynth(Tone.Synth, synthSettings).toDestination()

const bassFilter = new Tone.Filter(1600, 'lowpass').toDestination()
bassFilter.Q.value = 4
const bassDistortion = new Tone.Distortion(0.35)
const bassSynth = new Tone.PolySynth(Tone.Synth, {
  volume: -12,
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 1.2 },
  oscillator: { type: 'sawtooth' }
})
bassSynth.chain(bassDistortion, bassFilter)

const keyMap = { a:'C4',s:'D4',d:'E4',f:'F4',g:'G4',h:'A4',j:'B4',k:'C5' }

function initWebAudio(){ Tone.start() }

function initSynthPanel(panel, synth){
  panel.querySelectorAll('[data-envelope]').forEach((slider)=>{
    slider.addEventListener('input',(event)=>{
      const name=event.target.dataset.envelope
      synth.set({ envelope:{ [name]:Number(event.target.value) } })
    })
  })

  const buttons=panel.querySelectorAll('[data-wave]')
  buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
      let type=button.dataset.wave
      if(type==='pulse') type='square'
      synth.set({ oscillator:{ type:type } })
      buttons.forEach((item)=>item.classList.remove('active'))
      button.classList.add('active')
    })
  })
}

function initBassControls(){
  document.getElementById('drive').addEventListener('input',(event)=>{
    bassDistortion.distortion=Number(event.target.value)
  })
  document.getElementById('cutoff').addEventListener('input',(event)=>{
    bassFilter.frequency.value=Number(event.target.value)
  })
  document.getElementById('resonance').addEventListener('input',(event)=>{
    bassFilter.Q.value=Number(event.target.value)
  })
  document.getElementById('sub').addEventListener('input',(event)=>{
    bassSynth.volume.value=Number(event.target.value)
  })
}

function playNote(note){
  initWebAudio()
  synth1.triggerAttack(note)
  synth2.triggerAttack(note)
  bassSynth.triggerAttack(Tone.Frequency(note).transpose(-12).toNote())
}

function stopNote(note){
  synth1.triggerRelease(note)
  synth2.triggerRelease(note)
  bassSynth.triggerRelease(Tone.Frequency(note).transpose(-12).toNote())
}

document.addEventListener('DOMContentLoaded',()=>{
  initSynthPanel(document.querySelector('[data-synth="1"]'),synth1)
  initSynthPanel(document.querySelector('[data-synth="2"]'),synth2)
  initBassControls()

  window.addEventListener('keydown',(event)=>{
    if(event.repeat)return
    const note=keyMap[event.key.toLowerCase()]
    if(note)playNote(note)
  })
  window.addEventListener('keyup',(event)=>{
    const note=keyMap[event.key.toLowerCase()]
    if(note)stopNote(note)
  })
})