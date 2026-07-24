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
    <div class="archive-number">WHY-001</div>
    <p class="archive-kicker">ORIGIN PLANET · 航行员档案</p>
    <h3>此刻的辉怡</h3>
    <p class="archive-summary">在地球上研究水与土地，也在自己的宇宙里寻找坐标。</p>
    <div class="archive-divider"></div>
    <p class="origin-intro">我现在最重要的身份，是中国科学院地理科学与资源研究所的一名研究生。眼下难得处在一段比较悠闲的航段，但我知道，大概一个月后，研究任务就会重新拉满。趁这段空隙，我想先把自己记录下来。</p>

    <section class="origin-status" aria-label="航行员当前状态">
      <div><span>当前身份</span><b>地理学研究生</b></div>
      <div><span>观测任务</span><b>流域 · 闸坝 · 灌溉</b></div>
      <div><span>航行阶段</span><b>短暂的悠闲与蓄能</b></div>
      <div><span>核心燃料</span><b>好奇心、挑战与情感</b></div>
    </section>

    <section class="origin-section">
      <p class="origin-label">PERSONAL FLIGHT RULE</p>
      <blockquote class="origin-quote">“走自己的路，让别人说去吧。”</blockquote>
      <p>这是我小时候给自己的座右铭。现在的我不再完全照单全收：我知道别人对我的印象，会影响他们之后如何对待我，也可能影响我能获得的资源。所以我会认真维护自己的形象；但在那些真正与我无关的目光面前，我还是希望自己不必活得太小心。</p>
    </section>

    <section class="origin-section origin-traits">
      <p class="origin-label">航行员特征</p>
      <div class="trait-list">
        <span>神经大条 · 炸炸呼呼</span>
        <span>偶尔敏感，但不愿假装</span>
        <span>喜欢冒险，也喜欢难一点的事</span>
        <span>说话直接，仍在学习更好地表达</span>
      </div>
      <p>我通常把自己的感受放在很前面，这让我比较有边界，也让我有时会不小心刺到朋友。幸运的是，我身边有很包容的人；而我也在慢慢学着，让直率不等于忽略别人。</p>
    </section>

    <section class="origin-note">
      <span>PRIVATE TRANSMISSION</span>
      <p>我喜欢未知，也很需要情感。那些情绪浓烈的动漫、故事和关系，会让我一次次确认：原来人可以这样认真地靠近彼此。</p>
    </section>`;
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
