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
  const originDocument = "\u003c!doctype html\u003e\n\u003chtml lang=\"zh-CN\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"UTF-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#09030f\"\u003e\n  \u003cmeta name=\"description\" content=\"原点星球，W.H.Y.号私人星图中的航行员观测记录。\"\u003e\n  \u003clink rel=\"canonical\" href=\"https://weihuiyi11.github.io/origin.html\"\u003e\n  \u003ctitle\u003e原点星球 · W.H.Y.号\u003c/title\u003e\n  \u003clink rel=\"stylesheet\" href=\"./origin.css?v=20260731-orbital-motion-1\"\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cmain class=\"origin-world\" id=\"origin-world\"\u003e\n    \u003ccanvas id=\"origin-dust\" aria-hidden=\"true\"\u003e\u003c/canvas\u003e\n    \u003cdiv class=\"nebula nebula-one\" aria-hidden=\"true\"\u003e\u003c/div\u003e\n    \u003cdiv class=\"nebula nebula-two\" aria-hidden=\"true\"\u003e\u003c/div\u003e\n\n    \u003cheader class=\"world-header\"\u003e\n      \u003cbutton class=\"back-link\" id=\"back-to-map\" type=\"button\"\u003e← 返回宇宙星图\u003c/button\u003e\n      \u003cp\u003eW.H.Y.号 / 原点星球观测记录\u003c/p\u003e\n      \u003cspan\u003e坐标 00° 00′\u003c/span\u003e\n    \u003c/header\u003e\n\n    \u003csection class=\"planet-stage\" id=\"planet-stage\" aria-label=\"可探索的原点星球\"\u003e\n      \u003cdiv class=\"planet-aura\" aria-hidden=\"true\"\u003e\u003c/div\u003e\n      \u003cdiv class=\"planet-shadow\" aria-hidden=\"true\"\u003e\u003c/div\u003e\n      \u003cdiv class=\"origin-planet\" id=\"origin-planet\" aria-hidden=\"true\"\u003e\n        \u003cdiv class=\"planet-core\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"planet-crust crust-one\"\u003e\u003c/div\u003e\u003cdiv class=\"planet-crust crust-two\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"lava-stream stream-one\"\u003e\u003c/div\u003e\u003cdiv class=\"lava-stream stream-two\"\u003e\u003c/div\u003e\u003cdiv class=\"lava-stream stream-three\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"crystal-field\"\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003c/div\u003e\n        \u003cdiv class=\"planet-shine\"\u003e\u003c/div\u003e\u003cdiv class=\"planet-night\"\u003e\u003c/div\u003e\n      \u003c/div\u003e\n      \u003cdiv class=\"orbital-path path-one\" aria-hidden=\"true\"\u003e\u003c/div\u003e\u003cdiv class=\"orbital-path path-two\" aria-hidden=\"true\"\u003e\u003c/div\u003e\n\n      \u003cbutton class=\"signal-shard shard-now active\" data-record=\"now\" type=\"button\" aria-label=\"探索此刻状态\"\u003e\u003ci\u003e\u003c/i\u003e\u003cspan\u003e\u003cb\u003e01\u003c/b\u003e 此刻状态\u003c/span\u003e\u003c/button\u003e\n      \u003cbutton class=\"signal-shard shard-belief\" data-record=\"belief\" type=\"button\" aria-label=\"探索航行准则\"\u003e\u003ci\u003e\u003c/i\u003e\u003cspan\u003e\u003cb\u003e02\u003c/b\u003e 航行准则\u003c/span\u003e\u003c/button\u003e\n      \u003cbutton class=\"signal-shard shard-signal\" data-record=\"signal\" type=\"button\" aria-label=\"探索私人信号\"\u003e\u003ci\u003e\u003c/i\u003e\u003cspan\u003e\u003cb\u003e03\u003c/b\u003e 私人信号\u003c/span\u003e\u003c/button\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"planet-record\" aria-live=\"polite\"\u003e\n      \u003cp class=\"record-kicker\"\u003eORIGIN CORE / \u003cspan id=\"record-index\"\u003e01\u003c/span\u003e\u003c/p\u003e\n      \u003carticle class=\"record-text active\" data-panel=\"now\"\u003e\u003ch1\u003e此刻的\u003cbr\u003e\u003cem\u003e辉怡\u003c/em\u003e\u003c/h1\u003e\u003cp\u003e在地球上研究水与土地，\u003cbr\u003e也在自己的宇宙里寻找坐标。\u003c/p\u003e\u003c/article\u003e\n      \u003carticle class=\"record-text\" data-panel=\"belief\"\u003e\u003ch1\u003e方向，\u003cbr\u003e\u003cem\u003e由自己决定\u003c/em\u003e\u003c/h1\u003e\u003cp\u003e认真照看与世界相遇时的自己，\u003cbr\u003e但不让无关的目光替我决定方向。\u003c/p\u003e\u003c/article\u003e\n      \u003carticle class=\"record-text\" data-panel=\"signal\"\u003e\u003ch1\u003e仍会为\u003cbr\u003e\u003cem\u003e真挚靠近\u003c/em\u003e发亮\u003c/h1\u003e\u003cp\u003e喜欢未知，也珍惜那些\u003cbr\u003e让人愿意认真回应的情感。\u003c/p\u003e\u003c/article\u003e\n    \u003c/section\u003e\n\n    \u003cdiv class=\"interaction-hint\" id=\"interaction-hint\"\u003e\u003ci\u003e\u003c/i\u003e 移动光标，感受星球的回应\u003c/div\u003e\n    \u003cfooter class=\"world-footer\"\u003e\u003cspan\u003e\u003ci\u003e\u003c/i\u003e 原点星球已苏醒\u003c/span\u003e\u003cspan\u003e点击漂浮晶体，读取一段信号\u003c/span\u003e\u003cbutton id=\"quiet-mode\" type=\"button\" aria-pressed=\"false\"\u003e减弱动态\u003c/button\u003e\u003c/footer\u003e\n  \u003c/main\u003e\n  \u003cscript src=\"./origin.js?v=20260731-inline-return-1\" defer\u003e\u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e\n";
  originFrame.srcdoc = originDocument.replace("<head>", `<head><base href="${window.location.origin}/">`);
  document.body.append(originFrame);
  requestAnimationFrame(() => { if (originFrame) originFrame.style.opacity = "1"; });
  return ambientContext;
}

async function startAmbientSoundscape(volume = 0.045) {
  const context = ensureAmbientSoundscape();
  if (!context || !ambientGain) return false;
  if (context.state === "suspended") await context.resume();
  const now = context.currentTime;
  ambientGain.gain.cancelScheduledValues(now);
  ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
  ambientGain.gain.linearRampToValueAtTime(volume, now + 1.2);
  return true;
}

function stopAmbientSoundscape() {
  if (!ambientContext || !ambientGain) return;
  const now = ambientContext.currentTime;
  ambientGain.gain.cancelScheduledValues(now);
  ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
  ambientGain.gain.linearRampToValueAtTime(0, now + 0.35);
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
  let ambientStarted = false;

  try {
    ambientStarted = await startAmbientSoundscape();
  } catch (error) {
    ambientStarted = false;
  }

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
    } else if (ambientStarted) {
      setSoundButton(true);
    }
  }, 1450);
});

document.querySelector("#return-outside").addEventListener("click", () => {
  closeOriginPlanet();
  cancelFade();
  stopAmbientSoundscape();
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
      startAmbientSoundscape();
      fadeAudioTo(targetVolume, 1500);
    } catch (error) {
      try {
        await startAmbientSoundscape(0.045);
        setSoundButton(true);
      } catch (_) {
        setSoundButton(false);
        soundButton.textContent = "声场加载失败";
      }
    }
  } else {
    spaceAudio.pause();
    spaceAudio.volume = 0;
    stopAmbientSoundscape();
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
