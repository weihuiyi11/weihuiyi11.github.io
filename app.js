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
    <div class="cabin-arrival">
      <div class="cabin-topline"><span>W.H.Y.号 · 原点观测舱</span><span>舱压稳定 · 01</span></div>
      <div class="cabin-window" aria-hidden="true">
        <div class="window-stars"></div><div class="origin-world"></div><div class="window-reflection"></div>
        <p>抵达 · 原点星球</p>
      </div>
      <div class="cabin-console"><i></i><span>正在接收航行员的私人坐标</span><b>●</b></div>
    </div>
    <div class="origin-reading">
      <div class="origin-heading"><div><p class="archive-kicker">ORIGIN PLANET · PILOT LOG</p><h3>此刻的辉怡</h3></div><span class="archive-number">WHY-001</span></div>
      <p class="origin-lead">她正在地球上研究水与土地，也在这段难得安静的航程里，试着把自己先记录下来。</p>
      <div class="flight-grid">
        <section><span>当前坐标</span><b>中国科学院地理科学与资源研究所<br>研究生</b></section>
        <section><span>正在发生</span><b>任务还未全面拉满；一个月后的忙碌已经在靠近。</b></section>
        <section><span>引擎偏好</span><b>未知、难一点的事，以及值得认真投入的关系。</b></section>
      </div>
      <section class="log-entry"><p>航行记录 01</p><h4>不必活得太小心</h4><blockquote>“走自己的路，让别人说去吧。”</blockquote><div>这是小时候留下的航行准则。如今她知道，人与人之间的印象会带来真实的后果；因此会认真照看自己在世界里的样子。但那些无关紧要的目光，仍不值得让她缩小。</div></section>
      <section class="log-entry split"><div><p>航行记录 02</p><h4>外放，也会被打动</h4><div>她有点冒冒失失，直率得常常先把自己的感受放在前面；可对真正珍惜的人和情感，她又比表面更容易被触动。朋友们的包容，她一直记得。</div></div><div class="signal-tile"><span>INCOMING SIGNAL</span><b>比起标准答案，<br>更想走向有挑战、也有情感温度的地方。</b></div></section>
    </div>`;
}

const launchScreen = document.querySelector("#launch-screen");
const launchButton = document.querySelector("#launch-button");
const launchTransition = document.querySelector("#launch-transition");
const starMap = document.querySelector("#star-map");
const siteShell = document.querySelector("#site-shell");
const archiveOverlay = document.querySelector("#archive-overlay");
const signalOverlay = document.querySelector("#signal-overlay");

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
        drift: (index % 3 - 1) * (.45 + depth)
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
      const x = star.x + (reducedMotion ? 0 : Math.sin(time * .000025 + star.phase) * star.drift);
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

function closePanels() {
  archiveOverlay.hidden = true;
  signalOverlay.hidden = true;
}

launchButton.addEventListener("click", () => {
  launchButton.disabled = true;
  launchButton.querySelector("span").textContent = "航行者身份确认中";
  launchTransition.hidden = false;
  launchScreen.classList.add("is-launching");

  window.setTimeout(() => {
    launchScreen.hidden = true;
    launchTransition.hidden = true;
    starMap.hidden = false;
    siteShell.classList.add("is-launched");
  }, 1450);
});

document.querySelector("#return-outside").addEventListener("click", () => {
  closePanels();
  starMap.hidden = true;
  launchScreen.hidden = false;
  launchScreen.classList.remove("is-launching");
  siteShell.classList.remove("is-launched");
  launchButton.disabled = false;
  launchButton.querySelector("span").textContent = "开始航行";
});

document.querySelector("#sound-button").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const enabled = button.classList.toggle("active");
  button.textContent = enabled ? "声场 开" : "声场 关";
});

document.querySelectorAll("[data-destination]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = destinations[button.dataset.destination];
    const content = document.querySelector("#archive-content");
    if (button.dataset.destination === "origin") {
      content.innerHTML = originArchive();
    } else {
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
    }
    document.querySelector("#archive-card").style.setProperty("--accent", item.color);
    archiveOverlay.hidden = false;
  });
});

document.querySelector("#earth-signal").addEventListener("click", () => {
  signalOverlay.hidden = false;
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", closePanels);
});

[archiveOverlay, signalOverlay].forEach((overlay) => {
  overlay.addEventListener("mousedown", (event) => {
    if (event.target === overlay) closePanels();
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});
