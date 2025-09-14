// script for final VIP-MODE-PANEL
const popSound = document.getElementById('popSound');
const getBtn = document.getElementById('getBtn');
const periodInput = document.getElementById('periodInput');
const resultSize = document.getElementById('resultSize');
const resultNumber = document.getElementById('resultNumber');
const resultColor = document.getElementById('resultColor');
const activeUsersEl = document.getElementById('activeUsers');

const COLORS = [
  {name:'RED', css:'#ff4d4f', text:'#fff'},
  {name:'GREEN', css:'#34d399', text:'#032a20'},
  {name:'BLUE', css:'#60a5fa', text:'#03174a'},
  {name:'YELLOW', css:'#fbbf24', text:'#3a2a00'},
  {name:'PURPLE', css:'#a78bfa', text:'#20123f'}
];

// compute a simple integer hash from a string (period input)
function hashString(s){
  let h = 0;
  for(let i=0;i<s.length;i++){ h = (h<<5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

// seeded pick based on integer seed
function pickFromSeed(seed){
  // decide big or small by parity
  const isBig = (seed % 2) === 0;
  const size = isBig ? 'BIG' : 'SMALL';
  const number = isBig ? (5 + (seed % 5)) : (seed % 5);
  const color = COLORS[seed % COLORS.length];
  return { size, number, color };
}

// Animate number pop
function animateResult(){
  resultNumber.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:320,easing:'ease'});
  resultNumber.animate([{opacity:0.6},{opacity:1}],{duration:320,fill:'forwards'});
}

// Get Prediction click
getBtn.addEventListener('click', ()=>{
  const period = (periodInput.value || '').trim();
  if(period.length === 0){
    alert('Please enter a Period Number.');
    return;
  }
  const seed = hashString(period);
  const pick = pickFromSeed(seed);
  // show result
  resultSize.textContent = pick.size;
  resultNumber.textContent = String(pick.number);
  resultColor.textContent = pick.color.name;
  resultColor.style.background = pick.color.css;
  resultColor.style.color = pick.color.text;
  animateResult();
  try{ popSound.currentTime = 0; popSound.play(); }catch(e){}
});

// Active users auto-refreshing above 10000
function refreshActive(){
  const base = 10000;
  const extra = Math.floor(Math.random() * 5000) + 100; // 100..5099
  const n = base + extra;
  activeUsersEl.textContent = 'Active Users: ' + n.toLocaleString();
}
// refresh every 3 seconds
setInterval(refreshActive, 3000);
refreshActive();

// allow Enter key to trigger prediction
periodInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') getBtn.click(); });
