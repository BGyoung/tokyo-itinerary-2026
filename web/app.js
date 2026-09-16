const itinerary = [
  {
    date: "9/17", weekday: "週四", time: "全天／抵達後",
    zhuang: ["晴空塔"],
    ding: ["05:00 出發送機（第二航廈）", "07:55 長榮 BR184 起飛", "12:25 抵達東京", "約14:00 抵達東京市區（可能先逛晴空塔）", "Check in 民宿"],
    shared: ["晴空塔", "民宿入住"],
  },
  {
    date: "9/18", weekday: "週五", time: "全天",
    zhuang: ["墨田水族館", "小網神社", "淺草寺、財神大黑天（淺草寺）", "淺草神社（惠比壽）"],
    ding: ["09:00 出發澀谷", "10:00 拜訪廠商", "11:30 任天堂／寶可夢", "14:30 出發池袋", "太陽城：寶可夢／萬代", "YODOBASHI 池袋店"],
    shared: [],
  },
  {
    date: "9/19", weekday: "週六", time: "全天",
    zhuang: ["橫濱麵包超人博物館", "日清泡麵博物館", "橫濱 COSMOWORLD"],
    ding: ["07:00 出發", "08:30 抵達千葉幕張展覽館", "活動結束"],
    shared: [],
  },
  {
    date: "9/20", weekday: "週日", time: "全天／晚餐",
    zhuang: ["明治神宮", "原宿", "表參道", "澀谷"],
    ding: ["08:30–10:30 江之島", "10:45–11:15 鎌倉高校前平交道", "11:30–13:30 長谷站：長谷寺＆鎌倉大佛", "14:00–15:30 小町通商店街", "15:30–16:30 鶴岡八幡宮", "最晚17:30 從鎌倉離開去新宿", "19:30 晚餐：六歌仙 新宿西口總店"],
    shared: [],
  },
  {
    date: "9/21", weekday: "週一", time: "11:00–晚上",
    zhuang: ["晴空塔", "機場"],
    ding: ["11:00 退房", "成田第一航廈寄放行李", "搭車20分鐘至成田山逛逛", "最晚18:00 前出發去機場", "20:40 長榮 BR195 起飛", "23:20 抵達台灣"],
    shared: ["機場／返台"],
  },
];

const nav = document.querySelector("#day-nav");
const container = document.querySelector("#itinerary");
const todayCard = document.querySelector("#today-card");
const today = new Date();
const todayLabel = `${today.getMonth() + 1}/${today.getDate()}`;
const todayIndex = Math.max(0, itinerary.findIndex(day => day.date === todayLabel));
let selectedDay = todayIndex;
const rainBackups = [
  "優先改為晴空塔商場等室內行程，並視交通狀況調整入住安排。",
  "優先安排水族館、商場或電器店等室內活動，戶外寺社行程可延後。",
  "優先保留室內博物館或展覽活動；如遇強風，避免海邊與高空設施。",
  "原宿、表參道與澀谷行程可改為室內商場；江之島與鎌倉戶外行程建議延後。",
  "優先於室內整理行李或使用機場設施，並提早確認航班與交通狀態。"
];

function eventCard(className, label, items) {
  if (!items.length) return "";
  return `<article class="event ${className}"><h3>${label}</h3><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul></article>`;
}

function summaryList(className, label, items) {
  if (!items.length) return "";
  return `<article class="today-list ${className}"><h3>${label}</h3><ul>${items.slice(0, 3).map(item => `<li>${item}</li>`).join("")}</ul></article>`;
}

function dayReminder(index) {
  if (index === 0) return "抵達／入住提醒：確認網路、行李與同行群組訊息。";
  if (index === itinerary.length - 1) return "退房／返台提醒：確認行李、護照與前往機場時間。";
  return "當日提醒：依行程時間與同行群組訊息安排集合。";
}

function renderTodaySummary() {
  const day = itinerary[todayIndex];
  const isTripDay = itinerary.some(item => item.date === todayLabel);
  todayCard.innerHTML = `
    <div class="today-heading">
      <div><p class="eyebrow">${isTripDay ? "TODAY'S PLAN" : "TRIP OVERVIEW"}</p><h2 id="today-title">${isTripDay ? "今天的行程" : "旅程從 9/17 開始"}</h2></div>
      <p class="today-date">${day.date}<span>${day.weekday}</span></p>
    </div>
    <p class="today-time">${day.time}</p>
    <div class="today-agenda">
      ${summaryList("zhuang", "小莊", day.zhuang)}
      ${summaryList("ding", "丁丁", day.ding)}
      ${summaryList("shared", "共同", day.shared)}
    </div>
    <div class="today-footer"><p>${dayReminder(todayIndex)}</p><button type="button" id="view-today">查看完整當日行程</button></div>`;
  document.querySelector("#view-today").addEventListener("click", () => {
    selectedDay = todayIndex;
    render();
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function render() {
  nav.innerHTML = itinerary.map((day, index) => {
    const isToday = day.date === todayLabel;
    return `<button class="day-button ${index === selectedDay ? "active" : ""} ${isToday ? "today" : ""}" data-index="${index}">${day.date} ${day.weekday.split("／")[0]}${isToday ? " <span>今天</span>" : ""}</button>`;
  }).join("");
  const day = itinerary[selectedDay];
  container.innerHTML = `
    <article class="day-panel">
      <header class="date-block">
        <div><p class="date">${day.date}</p><p class="weekday">${day.weekday}</p></div>
        <p class="time">${day.time}</p>
      </header>
      <div class="agenda">
        ${eventCard("zhuang", "小莊行程", day.zhuang)}
        ${eventCard("ding", "丁丁行程", day.ding)}
        ${eventCard("shared", "共同部分", day.shared)}
      </div>
    </article>`;
  nav.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    selectedDay = Number(button.dataset.index);
    render();
  }));
}

renderTodaySummary();
render();

const weatherStatus = document.querySelector("#weather-status");
const weatherStatusNote = document.querySelector("#weather-status-note");
const rainBackup = document.querySelector("#rain-backup");
const weatherNotes = {
  normal: "依原行程進行，出門前仍建議查看官方天氣與交通資訊。",
  watch: "請備妥雨具，並預留交通延誤與臨時調整時間。",
  indoor: "優先使用室內備案；若有警報或現場管制，請停止非必要移動。"
};
const savedWeatherStatus = localStorage.getItem("tokyo-itinerary-weather-status") || "normal";
weatherStatus.value = savedWeatherStatus;
rainBackup.textContent = rainBackups[todayIndex];
function renderWeatherStatus() {
  weatherStatusNote.textContent = weatherNotes[weatherStatus.value];
}
weatherStatus.addEventListener("change", () => {
  localStorage.setItem("tokyo-itinerary-weather-status", weatherStatus.value);
  renderWeatherStatus();
});
renderWeatherStatus();

const fontToggle = document.querySelector("#font-toggle");
const largeTextEnabled = localStorage.getItem("tokyo-itinerary-large-text") === "true";
function renderFontSize(enabled) {
  document.body.classList.toggle("large-text", enabled);
  fontToggle.setAttribute("aria-pressed", String(enabled));
  fontToggle.textContent = enabled ? "Aa 一般字模式" : "Aa 大字模式";
}
fontToggle.addEventListener("click", () => {
  const enabled = !document.body.classList.contains("large-text");
  localStorage.setItem("tokyo-itinerary-large-text", String(enabled));
  renderFontSize(enabled);
});
renderFontSize(largeTextEnabled);

const offlineStatus = document.querySelector("#offline-status");
const offlineIndicator = document.querySelector("#offline-indicator");
const offlineIndicatorText = document.querySelector("#offline-indicator-text");
const installApp = document.querySelector("#install-app");
let deferredInstallPrompt;

function setOfflineIndicator(state, text) {
  offlineIndicator.className = `offline-indicator is-${state}`;
  offlineIndicatorText.textContent = text;
}

function updateOfflineStatus() {
  if (!navigator.onLine) {
    offlineStatus.textContent = "目前離線，正在顯示已快取的行程內容。";
    setOfflineIndicator("offline", "離線中 · 已儲存行程");
  } else if (navigator.serviceWorker?.controller) {
    offlineStatus.textContent = "離線內容已準備完成，可在沒有網路時開啟此行程。";
    setOfflineIndicator("ready", "離線已就緒");
  } else {
    offlineStatus.textContent = "正在準備離線內容…";
    setOfflineIndicator("preparing", "離線準備中");
  }
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installApp.hidden = false;
});

installApp.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = undefined;
  installApp.hidden = true;
});

window.addEventListener("online", updateOfflineStatus);
window.addEventListener("offline", updateOfflineStatus);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        updateOfflineStatus();
        navigator.serviceWorker.addEventListener("controllerchange", updateOfflineStatus, { once: true });
      })
      .catch(() => {
        offlineStatus.textContent = "此瀏覽器目前無法啟用離線模式，請保持網路連線使用。";
        setOfflineIndicator("unavailable", "離線功能不可用");
      });
  });
} else {
  offlineStatus.textContent = "此瀏覽器不支援離線模式，請保持網路連線使用。";
  setOfflineIndicator("unavailable", "離線功能不可用");
}

const savedChecks = JSON.parse(localStorage.getItem("tokyo-itinerary-checks") || "{}");
document.querySelectorAll("input[data-check], input[data-day]").forEach(input => {
  const key = input.dataset.check ? `item:${input.dataset.check}` : `day:${input.dataset.day}`;
  input.checked = Boolean(savedChecks[key]);
  input.addEventListener("change", () => {
    savedChecks[key] = input.checked;
    localStorage.setItem("tokyo-itinerary-checks", JSON.stringify(savedChecks));
  });
});

document.querySelector("#clear-checks").addEventListener("click", () => {
  document.querySelectorAll("input[data-check], input[data-day]").forEach(input => { input.checked = false; });
  localStorage.removeItem("tokyo-itinerary-checks");
});

const checklistToggle = document.querySelector("#checklist-toggle");
const checklistDrawer = document.querySelector("#checklist-drawer");
const checklistBackdrop = document.querySelector("#checklist-backdrop");
function setChecklistOpen(isOpen) {
  document.body.classList.toggle("checklist-open", isOpen);
  checklistToggle.setAttribute("aria-expanded", String(isOpen));
  checklistDrawer.setAttribute("aria-hidden", String(!isOpen));
  checklistBackdrop.setAttribute("aria-hidden", String(!isOpen));
}
checklistToggle.addEventListener("click", () => setChecklistOpen(!document.body.classList.contains("checklist-open")));
document.querySelector("#checklist-close").addEventListener("click", () => setChecklistOpen(false));
checklistBackdrop.addEventListener("click", () => setChecklistOpen(false));
document.addEventListener("keydown", event => { if (event.key === "Escape") setChecklistOpen(false); });

