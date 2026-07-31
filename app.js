const destinations = {
  origin: {
    name: "原点星球",
    code: "WHY-001",
    summary: "此刻的我",
    detail: "一个正在学习怎样与世界相处，也仍然愿意向未知出发的人。",
    color: "#f6c987"
  },
  memory: {
    name: "记忆星云",
    code: "WHY-0719",
    summary: "照片、朋友与走过的地方",
    detail: "童年、大学、旅行和一些不能只用日期概括的瞬间。每一张照片会成为一片星云碎片，靠近它，才会读到背后的故事。",
    color: "#bc8cff"
  },
  interest: {
    name: "兴趣卫星群",
    code: "WHY-LOVE",
    summary: "我最近喜欢的一切",
    detail: "音乐、电影、收藏、CP，以及那些会让我突然很开心的小事。这里不会是一张固定清单，而是一组不断改变轨道的小卫星。",
    color: "#67d9ee"
  },
  earth: {
    name: "地球观测站",
    code: "WHY-EARTH",
    summary: "全国流域观测任务",
    detail: "当前任务：观察中国流域中的水库与农田变化。已扫描年份：2000—2002。航行员状态：偶尔崩溃，但仍在推进。",
    color: "#6ed6a5"
  }
};

function originArchive() {
  return `
    <section class="origin-cockpit" aria-label="W.H.Y.号原点观测舱">
      <div class="cockpit-stars" aria-hidden="true"></div>
      <div class="cockpit-hull hull-left" aria-hidden="true"></div><div class="cockpit-hull hull-right" aria-hidden="true"></div>
      <header class="cockpit-header"><span>W.H.Y.号 / ORIGIN OBSERVATORY</span><span>距离原点星球 · 2,184 km</span></header>
      <button class="cockpit-close" type="button" data-close aria-label="离开观测舱">×</button>
      <div class="cockpit-window" aria-hidden="true"><div class="window-glow"></div><div class="origin-world"></div><div class="orbit-line orbit-line-one"></div><div class="orbit-line orbit-line-two"></div><span class="window-coordinate">ORIGIN · 00°00′</span></div>
      <aside class="cockpit-left">
        <span class="panel-tag">PILOT PROFILE</span><h3>此刻的辉怡</h3>
        <p>在地球上研究水与土地，<br>也在自己的宇宙里寻找坐标。</p>
        <div class="pilot-stat"><span>当前身份</span><b>地理学研究生</b></div>
        <div class="pilot-stat"><span>航行阶段</span><b>短暂的悠闲与蓄能</b></div>
      </aside>
      <nav class="cockpit-tabs" aria-label="航行员记录">
        <button class="origin-tab active" type="button" data-log="now"><i>01</i><span>此刻状态</span></button>
        <button class="origin-tab" type="button" data-log="rule"><i>02</i><span>航行准则</span></button>
        <button class="origin-tab" type="button" data-log="signal"><i>03</i><span>私人信号</span></button>
      </nav>
      <section class="cockpit-projection" aria-live="polite">
        <article class="origin-log active" data-log-panel="now"><span>01 / CURRENT FLIGHT</span><h4>在忙碌靠近前，<br>先把自己记录下来。</h4><p>眼下的航程难得安静。但一个月后，研究任务会再次拉满；所以这间观测舱，是给此刻的她留下的一枚坐标。</p></article>
        <article class="origin-log" data-log-panel="rule"><span>02 / FLIGHT RULE</span><h4>不必活得<br>太小心。</h4><p>小时候相信“走自己的路”。现在知道印象会影响关系与资源，于是认真照看自己在世界里的样子；但不让无关的目光替自己决定方向。</p></article>
        <article class="origin-log" data-log-panel="signal"><span>03 / PRIVATE SIGNAL</span><h4>喜欢未知，<br>也很需要情感。</h4><p>她愿意走向难一点的事，也会被真挚的关系和情绪浓烈的故事打动。表面有些炸炸呼呼，内里却始终认真回应靠近。</p></article>
      </section>
      <footer class="cockpit-console"><div><i class="status-dot"></i> 舱压稳定</div><div class="console-sweep"><i></i></div><div>观测模式 · 私人</div><button type="button" data-close>返回私人星图 ↗</button></footer>
    </section>`;
}

const launchScreen = document.querySelector("#launch-screen");
const launchButton = document.querySelector("#launch-button");
const launchTransition = document.querySelector("#launch-transition");
const starMap = document.querySelector("#star-map");
const siteShell = document.querySelector("#site-shell");
const archiveOverlay = document.querySelector("#archive-overlay");
const signalOverlay = document.querySelector("#signal-overlay");
const mapViewport = document.querySelector(".cosmic-map");
let isApproachingDestination = false;
let originFrame = null;
let activeDialogTrigger = null;

function openOriginPlanet(button) {
  // Keep the star map document alive beneath the planet. This lets the BGM
  // continue without restarting and keeps every other planet in its position.
  mapViewport.classList.remove("is-approaching");
  button.classList.remove("is-approaching");
  isApproachingDestination = false;

  originFrame = document.createElement("iframe");
  originFrame.title = "原点星球";
  originFrame.setAttribute("allow", "autoplay");
  originFrame.style.cssText = [
    "position:fixed", "z-index:100", "inset:0", "width:100vw", "height:100vh",
    "border:0", "background:#02040c", "opacity:0", "transition:opacity .42s ease",
    "box-shadow:0 0 80px rgba(0,0,0,.6)"
  ].join(";");
  document.body.append(originFrame);
  let originLoaded = false;
  originFrame.addEventListener("load", () => { originLoaded = true; }, { once: true });
  originFrame.src = new URL("./origin.html?v=20260731-origin-frame-1", window.location.href).href;
  requestAnimationFrame(() => { if (originFrame) originFrame.style.opacity = "1"; });
  window.setTimeout(() => {
    if (!originLoaded && originFrame) {
      window.location.href = "./origin.html?v=20260731-origin-frame-1";
    }
  }, 1800);
}

function closeOriginPlanet() {
  if (!originFrame) return;
  const frame = originFrame;
  originFrame = null;
  frame.style.opacity = "0";
  window.setTimeout(() => frame.remove(), 430);
  // Defensive reset: the map must never remain in its approach-only state.
  mapViewport.classList.remove("is-approaching");
  document.querySelectorAll("[data-destination]").forEach((item) => item.classList.remove("is-approaching"));
  isApproachingDestination = false;
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "why:close-origin" && event.source === originFrame?.contentWindow) {
    closeOriginPlanet();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (originFrame) {
    closeOriginPlanet();
    return;
  }
  closePanels();
});

function createStarfield() {
  const canvas = document.querySelector("#starfield");
  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = [
    [222, 236, 255],
    [169, 218, 244],
    [255, 225, 190],
    [198, 202, 255]
  ];
  let stars = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  // Stable pseudo-random values keep the sky natural without jumping after resize.
  function randomFactory(seed) {
    return function random() {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let value = Math.imul(seed ^ seed >>> 15, 1 | seed);
      value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildStars() {
    const random = randomFactory(7192001);
    const density = Math.min(310, Math.max(150, Math.round(width * height / 6500)));
    stars = Array.from({ length: density }, (_, index) => {
      const depth = Math.pow(random(), 1.85);
      const bright = random() > .91;
      return {
        x: random() * width,
        y: random() * height,
        radius: bright ? .85 + random() * 1.25 : .22 + depth * .78,
        opacity: bright ? .58 + random() * .36 : .14 + random() * .46,
        phase: random() * Math.PI * 2,
        speed: .00018 + random() * .00042,
        color: palette[Math.floor(random() * palette.length)],
        glow: bright ? 2.5 + random() * 4 : 0,
        // The launch sky remains subtle; the star map adds its own closer layers.
        drift: (index % 3 - 1) * (2.4 + depth * 3.2)
      };
    });
  }

  function resize() {
    window.cancelAnimationFrame(animationFrame);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    buildStars();
    if (reducedMotion) {
      draw(performance.now());
    } else {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      const shimmer = reducedMotion ? 1 : .78 + Math.sin(time * star.speed + star.phase) * .22;
      const x = star.x + (reducedMotion ? 0 : Math.sin(time * .00012 + star.phase) * star.drift);
      const [red, green, blue] = star.color;

      if (star.glow) {
        context.beginPath();
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${star.opacity * .12 * shimmer})`;
        context.arc(x, star.y, star.radius + star.glow, 0, Math.PI * 2);
        context.fill();
      }

      context.beginPath();
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${star.opacity * shimmer})`;
      context.arc(x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });

    if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
}

createStarfield();

function openPanel(overlay, trigger) {
  activeDialogTrigger = trigger || document.activeElement;
  overlay.hidden = false;
  const dialog = overlay.querySelector("[role=dialog]");
  window.setTimeout(() => dialog?.focus(), 0);
}

function closePanels() {
  const shouldRestoreFocus = !archiveOverlay.hidden || !signalOverlay.hidden;
  archiveOverlay.hidden = true;
  signalOverlay.hidden = true;
  if (shouldRestoreFocus && activeDialogTrigger instanceof HTMLElement) {
    activeDialogTrigger.focus();
  }
  activeDialogTrigger = null;
}

const spaceAudio = new Audio("tattooedpreacher-above-earth-8672.mp3");
spaceAudio.loop = true;
spaceAudio.preload = "auto";
spaceAudio.volume = 0;

const soundButton = document.querySelector("#sound-button");
const targetVolume = 0.35;
let fadeTimer = null;

function setSoundButton(isEnabled) {
  soundButton.classList.toggle("active", isEnabled);
  soundButton.setAttribute("aria-pressed", String(isEnabled));
  soundButton.textContent = isEnabled ? "声场 开" : "声场 关";
}

function cancelFade() {
  if (fadeTimer) {
    window.clearInterval(fadeTimer);
    fadeTimer = null;
  }
}

function fadeAudioTo(volume, duration) {
  cancelFade();
  const startVolume = spaceAudio.volume;
  const startedAt = performance.now();

  fadeTimer = window.setInterval(() => {
    const progress = Math.min(1, (performance.now() - startedAt) / duration);
    spaceAudio.volume = startVolume + (volume - startVolume) * progress;

    if (progress === 1) {
      cancelFade();
    }
  }, 40);
}

launchButton.addEventListener("click", async () => {
  launchButton.disabled = true;
  launchButton.querySelector("span").textContent = "航行者身份确认中";
  launchTransition.hidden = false;
  launchScreen.classList.add("is-launching");

  // Start muted inside the user's click, so browsers allow playback.
  cancelFade();
  spaceAudio.currentTime = 0;
  spaceAudio.volume = 0;
  let audioStarted = false;
  let enteredMap = false;

  const audioAttempt = spaceAudio.play();
  audioAttempt.then(() => {
    audioStarted = true;
    if (enteredMap) {
      setSoundButton(true);
      fadeAudioTo(targetVolume, 7000);
    }
  }).catch(() => {
    setSoundButton(false);
  });

  window.setTimeout(() => {
    launchScreen.hidden = true;
    launchTransition.hidden = true;
    starMap.hidden = false;
    siteShell.classList.add("is-launched");
    enteredMap = true;

    if (audioStarted) {
      setSoundButton(true);
      // The music becomes audible only after entering the star map, then rises gently.
      fadeAudioTo(targetVolume, 7000);
    }
  }, 1450);
});

document.querySelector("#return-outside").addEventListener("click", () => {
  closeOriginPlanet();
  cancelFade();
  spaceAudio.pause();
  spaceAudio.currentTime = 0;
  spaceAudio.volume = 0;
  setSoundButton(false);
  closePanels();
  starMap.hidden = true;
  launchScreen.hidden = false;
  launchScreen.classList.remove("is-launching");
  siteShell.classList.remove("is-launched");
  launchButton.disabled = false;
  launchButton.querySelector("span").textContent = "开始航行";
});

soundButton.addEventListener("click", async () => {
  const shouldEnable = !soundButton.classList.contains("active");
  cancelFade();

  if (shouldEnable) {
    try {
      spaceAudio.volume = 0;
      await spaceAudio.play();
      setSoundButton(true);
      fadeAudioTo(targetVolume, 1500);
    } catch (error) {
      setSoundButton(false);
      soundButton.textContent = "声场加载失败";
    }
  } else {
    spaceAudio.pause();
    spaceAudio.volume = 0;
    setSoundButton(false);
  }
});

document.querySelectorAll("[data-destination]").forEach((button) => {
  button.addEventListener("click", () => {
    if (isApproachingDestination) return;
    isApproachingDestination = true;
    mapViewport.classList.add("is-approaching");
    button.classList.add("is-approaching");

    if (button.dataset.destination === "origin") {
      window.setTimeout(() => openOriginPlanet(button), 720);
      return;
    }
    const item = destinations[button.dataset.destination];
    window.setTimeout(() => {
      const content = document.querySelector("#archive-content");
      content.innerHTML = `
        <div class="archive-number" id="archive-number"></div>
        <p class="archive-kicker">W.H.Y.号航行档案</p>
        <h3 id="archive-title"></h3>
        <p class="archive-summary" id="archive-summary"></p>
        <div class="archive-divider"></div>
        <p class="archive-detail" id="archive-detail"></p>
        <div class="archive-placeholder"><span>内容舱位预留</span><small>之后我们会在这里放入你的真实照片与故事</small></div>`;
      document.querySelector("#archive-number").textContent = item.code;
      document.querySelector("#archive-title").textContent = item.name;
      document.querySelector("#archive-summary").textContent = item.summary;
      document.querySelector("#archive-detail").textContent = item.detail;
    document.querySelector("#archive-card").style.setProperty("--accent", item.color);
    openPanel(archiveOverlay, button);
      mapViewport.classList.remove("is-approaching");
      button.classList.remove("is-approaching");
      isApproachingDestination = false;
    }, 560);
  });
});

document.querySelector("#earth-signal").addEventListener("click", () => {
  openPanel(signalOverlay, document.querySelector("#earth-signal"));
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", closePanels);
});

[archiveOverlay, signalOverlay].forEach((overlay) => {
  overlay.addEventListener("mousedown", (event) => {
    if (event.target === overlay) closePanels();
  });
});

archiveOverlay.addEventListener("click", (event) => {
  if (event.target.closest("[data-close]")) closePanels();
});
