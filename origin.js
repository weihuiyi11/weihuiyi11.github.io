(() => {
  const world = document.querySelector('.origin-world');
  const backLink = document.querySelector('#back-to-map');
  const quietButton = document.querySelector('#quiet-mode');
  const buttons = [...document.querySelectorAll('.record')];
  const panels = [...document.querySelectorAll('.record-text')];

  // 从宇宙星图进入时，返回浏览历史中的第二页；直接打开本页才回首页。
  backLink?.addEventListener('click', (event) => {
    if (window.history.length > 1 && document.referrer) {
      event.preventDefault();
      window.history.back();
    }
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.record;
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
      world.dataset.panel = target;
    });
  });

  const setQuiet = (enabled) => {
    world.classList.toggle('quiet', enabled);
    quietButton?.setAttribute('aria-pressed', String(enabled));
    if (quietButton) quietButton.textContent = enabled ? '恢复动态' : '减弱动态';
    try { localStorage.setItem('why-origin-quiet', String(enabled)); } catch (_) {}
  };
  try { setQuiet(localStorage.getItem('why-origin-quiet') === 'true'); } catch (_) {}
  quietButton?.addEventListener('click', () => setQuiet(!world.classList.contains('quiet')));

  const canvas = document.querySelector('#cabin-stars');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  let stars = [];
  let animationId;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.max(70, Math.round(innerWidth / 15)) }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 1.25 + .2, a: Math.random() * .6 + .15,
      drift: Math.random() * .12 + .02, phase: Math.random() * Math.PI * 2
    }));
  }
  function draw(time = 0) {
    context.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach((star) => {
      const alpha = star.a * (.72 + Math.sin(time * .0012 + star.phase) * .28);
      context.fillStyle = `rgba(213,239,255,${alpha})`;
      context.beginPath();
      context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      context.fill();
      star.y -= star.drift;
      if (star.y < -3) { star.y = innerHeight + 3; star.x = Math.random() * innerWidth; }
    });
    if (!world.classList.contains('quiet') && !reduced.matches) animationId = requestAnimationFrame(draw);
  }
  function restart() { cancelAnimationFrame(animationId); draw(); }
  resize(); restart();
  addEventListener('resize', () => { resize(); restart(); });
  quietButton?.addEventListener('click', () => { cancelAnimationFrame(animationId); if (!world.classList.contains('quiet') && !reduced.matches) restart(); });
})();
