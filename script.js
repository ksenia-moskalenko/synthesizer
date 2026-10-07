const synthSettings = {
  volume: -14,
  envelope: { attack: 0.2, decay: 0.35, sustain: 0.7, release: 0.8 },
  oscillator: { type: 'sine' }
}

const keyMap = { a:'C4',s:'D4',d:'E4',f:'F4',g:'G4',h:'A4',j:'B4',k:'C5' }

let synth1
let synth2
let bassSynth
let bassFilter
let bassDistortion
let audioStarted = false

let synth1On = true
let synth2On = true
let bassOn = true

async function startAudio(){
  if(audioStarted) return

  await Tone.start()

  synth1 = new Tone.PolySynth(Tone.Synth).toDestination()
  synth2 = new Tone.PolySynth(Tone.Synth).toDestination()
  synth1.set(synthSettings)
  synth2.set(synthSettings)

  bassFilter = new Tone.Filter({
    frequency: 1600,
    type: 'lowpass',
    Q: 4
  }).toDestination()

  bassDistortion = new Tone.Distortion(0.35)

  bassSynth = new Tone.PolySynth(Tone.Synth)
  bassSynth.set({
    volume: -16,
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 1.2 },
    oscillator: { type: 'sawtooth' }
  })
  bassSynth.chain(bassDistortion, bassFilter)

  audioStarted = true
  updateAllControls()
  const status=document.getElementById('audioStatus')
  status.textContent='audio on'
  status.classList.add('on')
}

function updateAllControls(){
  document.querySelectorAll('[data-synth]').forEach((panel)=>{
    const synth = panel.dataset.synth === '1' ? synth1 : synth2

    panel.querySelectorAll('[data-envelope]').forEach((slider)=>{
      const name = slider.dataset.envelope
      synth.set({ envelope:{ [name]:Number(slider.value) } })
    })

    const activeWave = panel.querySelector('[data-wave].active')
    if(activeWave){
      let type = activeWave.dataset.wave
      if(type === 'pulse') type = 'square'
      synth.set({ oscillator:{ type:type } })
    }
  })

  bassDistortion.distortion = Number(document.getElementById('drive').value)
  bassFilter.frequency.value = Number(document.getElementById('cutoff').value)
  bassFilter.Q.value = Number(document.getElementById('resonance').value)
  bassSynth.volume.value = Number(document.getElementById('sub').value)
}

function initSynthPanel(panel){
  panel.querySelectorAll('[data-envelope]').forEach((slider)=>{
    slider.addEventListener('input',async(event)=>{
      await startAudio()
      const synth = panel.dataset.synth === '1' ? synth1 : synth2
      const name = event.target.dataset.envelope
      synth.set({ envelope:{ [name]:Number(event.target.value) } })
    })
  })

  const buttons = panel.querySelectorAll('[data-wave]')
  buttons.forEach((button)=>{
    button.addEventListener('click',async()=>{
      await startAudio()

      let type = button.dataset.wave
      if(type === 'pulse') type = 'square'

      const synth = panel.dataset.synth === '1' ? synth1 : synth2
      synth.set({ oscillator:{ type:type } })

      buttons.forEach((item)=>item.classList.remove('active'))
      button.classList.add('active')
    })
  })
}

function initPowerButtons(){
  document.querySelectorAll('[data-power]').forEach((button)=>{
    button.addEventListener('click',async()=>{
      if(!audioStarted){
        await startAudio()

        const firstPower = button.dataset.power
        if(firstPower === 'synth1') synth1.triggerAttackRelease('C4', '8n')
        if(firstPower === 'synth2') synth2.triggerAttackRelease('E4', '8n')
        if(firstPower === 'bass') bassSynth.triggerAttackRelease('C2', '8n')
        return
      }

      const power = button.dataset.power

      if(power === 'synth1') synth1On = !synth1On
      if(power === 'synth2') synth2On = !synth2On
      if(power === 'bass') bassOn = !bassOn

      const isOn =
        power === 'synth1' ? synth1On :
        power === 'synth2' ? synth2On :
        bassOn

      button.classList.toggle('active',isOn)

      if(isOn){
        if(power === 'synth1') synth1.triggerAttackRelease('C4', '8n')
        if(power === 'synth2') synth2.triggerAttackRelease('E4', '8n')
        if(power === 'bass') bassSynth.triggerAttackRelease('C2', '8n')
      }

      if(!isOn){
        if(power === 'synth1') synth1.releaseAll()
        if(power === 'synth2') synth2.releaseAll()
        if(power === 'bass') bassSynth.releaseAll()
      }
    })
  })
}

function updateKnob(input){
  const min = Number(input.min)
  const max = Number(input.max)
  const value = Number(input.value)
  input.closest('.dial').style.setProperty('--value',(value-min)/(max-min))
}

function initBassControls(){
  const drive = document.getElementById('drive')
  const cutoff = document.getElementById('cutoff')
  const resonance = document.getElementById('resonance')
  const sub = document.getElementById('sub')

  ;[drive,cutoff,resonance].forEach((input)=>{
    updateKnob(input)
    input.addEventListener('input',()=>updateKnob(input))
  })

  drive.addEventListener('input',async(event)=>{
    await startAudio()
    bassDistortion.distortion = Number(event.target.value)
  })

  cutoff.addEventListener('input',async(event)=>{
    await startAudio()
    bassFilter.frequency.value = Number(event.target.value)
  })

  resonance.addEventListener('input',async(event)=>{
    await startAudio()
    bassFilter.Q.value = Number(event.target.value)
  })

  sub.addEventListener('input',async(event)=>{
    await startAudio()
    bassSynth.volume.value = Number(event.target.value)
  })
}

function playNote(note){
  if(!audioStarted) return

  if(synth1On) synth1.triggerAttack(note)
  if(synth2On) synth2.triggerAttack(note)
  if(bassOn) bassSynth.triggerAttack(Tone.Frequency(note).transpose(-12).toNote())
}

function stopNote(note){
  if(!audioStarted) return

  if(synth1On) synth1.triggerRelease(note)
  if(synth2On) synth2.triggerRelease(note)
  if(bassOn) bassSynth.triggerRelease(Tone.Frequency(note).transpose(-12).toNote())
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-synth]').forEach((panel)=>initSynthPanel(panel))
  initBassControls()
  initPowerButtons()

  window.addEventListener('keydown',(event)=>{
    if(event.repeat) return
    const note = keyMap[event.key.toLowerCase()]
    if(note) playNote(note)
  })

  window.addEventListener('keyup',(event)=>{
    const note = keyMap[event.key.toLowerCase()]
    if(note) stopNote(note)
  })
})