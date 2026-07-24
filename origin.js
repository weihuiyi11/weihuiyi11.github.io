const canvas = document.querySelector('#cabin-stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize(){
  const ratio = Math.min(devicePixelRatio || 1, 2); const w = innerWidth; const h = innerHeight;
  canvas.width=w*ratio; canvas.height=h*ratio; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(ratio,0,0,ratio,0,0);
  let seed=719; const random=()=>((seed=(seed*16807)%2147483647)/2147483647);
  stars=Array.from({length:Math.max(150,Math.min(320,w*h/7200))},()=>({x:random()*w,y:random()*h,r:random()*1.05+.18,a:random()*.55+.18,p:random()*6.28}));
}
function paint(t){ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{ctx.fillStyle=`rgba(210,235,255,${s.a*(.7+Math.sin(t*.001+s.p)*.3)})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill()});if(!document.body.classList.contains('quiet'))requestAnimationFrame(paint)}
resize();addEventListener('resize',resize);requestAnimationFrame(paint);
document.querySelectorAll('.record').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.record,.record-text').forEach(el=>el.classList.remove('active'));button.classList.add('active');document.querySelector(`[data-panel="${button.dataset.record}"]`).classList.add('active')}));
document.querySelector('#quiet-mode').addEventListener('click',e=>{document.body.classList.toggle('quiet');e.currentTarget.textContent=document.body.classList.contains('quiet')?'恢复动态':'减弱动态';if(!document.body.classList.contains('quiet'))requestAnimationFrame(paint)});
