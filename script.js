const synthSettings={volume:-14,envelope:{attack:.2,decay:.35,sustain:.7,release:.8},oscillator:{type:'sine'}}
const synth1=new Tone.PolySynth(Tone.Synth).toDestination()
const synth2=new Tone.PolySynth(Tone.Synth).toDestination()
synth1.set(synthSettings)
synth2.set(synthSettings)

const bassFilter=new Tone.Filter({frequency:1600,type:'lowpass',Q:4}).toDestination()
const bassDistortion=new Tone.Distortion(.35)
const bassSynth=new Tone.PolySynth(Tone.Synth)
bassSynth.set({volume:-16,envelope:{attack:.05,decay:.2,sustain:.3,release:1.2},oscillator:{type:'sawtooth'}})
bassSynth.chain(bassDistortion,bassFilter)

const keyMap={a:'C4',s:'D4',d:'E4',f:'F4',g:'G4',h:'A4',j:'B4',k:'C5'}
let synth1On=true
let synth2On=true
let bassOn=true

async function initWebAudio(){await Tone.start()}

function initSynthPanel(panel,synth){
 panel.querySelectorAll('[data-envelope]').forEach((slider)=>{
  slider.addEventListener('input',(event)=>{
   const name=event.target.dataset.envelope
   synth.set({envelope:{[name]:Number(event.target.value)}})
  })
 })
 const buttons=panel.querySelectorAll('[data-wave]')
 buttons.forEach((button)=>{
  button.addEventListener('click',()=>{
   let type=button.dataset.wave
   if(type==='pulse')type='square'
   synth.set({oscillator:{type:type}})
   buttons.forEach((item)=>item.classList.remove('active'))
   button.classList.add('active')
  })
 })
}

function initPowerButtons(){
 document.querySelectorAll('[data-power]').forEach((button)=>{
  button.addEventListener('click',async()=>{
   await initWebAudio()
   const power=button.dataset.power
   if(power==='synth1')synth1On=!synth1On
   if(power==='synth2')synth2On=!synth2On
   if(power==='bass')bassOn=!bassOn
   const isOn=power==='synth1'?synth1On:power==='synth2'?synth2On:bassOn
   button.classList.toggle('active',isOn)
   if(!isOn){
    if(power==='synth1')synth1.releaseAll()
    if(power==='synth2')synth2.releaseAll()
    if(power==='bass')bassSynth.releaseAll()
   }
  })
 })
}

function updateKnob(input){
 const min=Number(input.min),max=Number(input.max),value=Number(input.value)
 input.closest('.dial').style.setProperty('--value',(value-min)/(max-min))
}

function initBassControls(){
 const drive=document.getElementById('drive')
 const cutoff=document.getElementById('cutoff')
 const resonance=document.getElementById('resonance')
 const sub=document.getElementById('sub')
 ;[drive,cutoff,resonance].forEach((input)=>{
  updateKnob(input)
  input.addEventListener('input',()=>updateKnob(input))
 })
 drive.addEventListener('input',(event)=>{bassDistortion.distortion=Number(event.target.value)})
 cutoff.addEventListener('input',(event)=>{bassFilter.frequency.value=Number(event.target.value)})
 resonance.addEventListener('input',(event)=>{bassFilter.Q.value=Number(event.target.value)})
 sub.addEventListener('input',(event)=>{bassSynth.volume.value=Number(event.target.value)})
}

async function playNote(note){
 await initWebAudio()
 if(synth1On)synth1.triggerAttack(note)
 if(synth2On)synth2.triggerAttack(note)
 if(bassOn)bassSynth.triggerAttack(Tone.Frequency(note).transpose(-12).toNote())
}
function stopNote(note){
 if(synth1On)synth1.triggerRelease(note)
 if(synth2On)synth2.triggerRelease(note)
 if(bassOn)bassSynth.triggerRelease(Tone.Frequency(note).transpose(-12).toNote())
}

document.addEventListener('DOMContentLoaded',()=>{
 initSynthPanel(document.querySelector('[data-synth="1"]'),synth1)
 initSynthPanel(document.querySelector('[data-synth="2"]'),synth2)
 initBassControls()
 initPowerButtons()
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