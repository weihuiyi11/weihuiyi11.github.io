const destinations = {
  origin: {
    name: "原点星球",
    code: "WHY-001",
    summary: "此刻的我",
    detail: "一个正在学习怎样与世界相处，也仍然愿意向未知出发的人。这里以后会放入我的自我介绍、近况、性格碎片，以及我希望朋友认识的那个我。",
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

const launchScreen = document.querySelector("#launch-screen");
const launchButton = document.querySelector("#launch-button");
const launchTransition = document.querySelector("#launch-transition");
const starMap = document.querySelector("#star-map");
const siteShell = document.querySelector("#site-shell");
const archiveOverlay = document.querySelector("#archive-overlay");
const signalOverlay = document.querySelector("#signal-overlay");

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
    document.querySelector("#archive-number").textContent = item.code;
    document.querySelector("#archive-title").textContent = item.name;
    document.querySelector("#archive-summary").textContent = item.summary;
    document.querySelector("#archive-detail").textContent = item.detail;
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
