(() => {
  const world = document.querySelector('#origin-world');
  const stage = document.querySelector('#planet-stage');
  const back = document.querySelector('#back-to-map');
  const quiet = document.querySelector('#quiet-mode');
  const shards = [...document.querySelectorAll('.signal-shard')];
  const panels = [...document.querySelectorAll('.record-text')];
  const index = document.querySelector('#record-index');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let quietMode = false;

  back.addEventListener('click', () => {
    if (window.parent !== window) window.parent.postMessage({ type: 'why:close-origin' }, '*');
    else if (history.length > 1) history.back(); else location.href = './index.html';
  });

  function select(record) {
    shards.forEach((item) => item.classList.toggle('active', item.dataset.record === record));
    panels.forEach((item) => item.classList.toggle('active', item.dataset.panel === record));
    index.textContent = ({now:'01',belief:'02',signal:'03'})[record];
    world.dataset.record = record;
  }
  shards.forEach((shard) => shard.addEventListener('click', () => select(shard.dataset.record)));

  stage.addEventListener('pointermove', (event) => {
    if (quietMode) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    stage.style.setProperty('--px', `${x * 15}px`);
    stage.style.setProperty('--py', `${y * 11}px`);
  });
  stage.addEventListener('pointerleave', () => { stage.style.setProperty('--px','0px'); stage.style.setProperty('--py','0px'); });

  function setQuiet(value) {
    quietMode = value; world.classList.toggle('quiet', value);
    quiet.setAttribute('aria-pressed', String(value)); quiet.textContent = value ? '恢复动态' : '减弱动态';
    try { localStorage.setItem('why-origin-quiet', String(value)); } catch (_) {}
  }
  try {
    const savedQuiet = localStorage.getItem('why-origin-quiet');
    setQuiet(savedQuiet === null ? prefersReducedMotion : savedQuiet === 'true');
  } catch (_) {
    setQuiet(prefersReducedMotion);
  }
  quiet.addEventListener('click', () => setQuiet(!quietMode));

  const canvas = document.querySelector('#origin-dust'); const ctx = canvas.getContext('2d');
  let particles=[]; let frame=0;
  function resize(){const r=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*r;canvas.height=innerHeight*r;ctx.setTransform(r,0,0,r,0,0);particles=Array.from({length:Math.max(80,innerWidth/13)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.15,a:Math.random()*.5+.12,s:Math.random()*.12+.025,p:Math.random()*6.28}));}
  function draw(t){ctx.clearRect(0,0,innerWidth,innerHeight);particles.forEach(p=>{ctx.fillStyle=`rgba(255,${150+Math.floor(Math.sin(p.p)*45)},${150+Math.floor(Math.cos(p.p)*60)},${p.a*(.75+Math.sin(t*.001+p.p)*.25)})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();p.y-=p.s;if(p.y<0){p.y=innerHeight;p.x=Math.random()*innerWidth;}});if(!quietMode)frame=requestAnimationFrame(draw);}
  resize(); draw(0); addEventListener('resize',()=>{cancelAnimationFrame(frame);resize();draw(0)}); quiet.addEventListener('click',()=>{cancelAnimationFrame(frame);if(!quietMode)draw(0)});
})();
