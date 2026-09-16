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
let selectedDay = 0;

function eventCard(className, label, items) {
  if (!items.length) return "";
  return `<article class="event ${className}"><h3>${label}</h3><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul></article>`;
}

function render() {
  nav.innerHTML = itinerary.map((day, index) => `<button class="day-button ${index === selectedDay ? "active" : ""}" data-index="${index}">${day.date} ${day.weekday.split("／")[0]}</button>`).join("");
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

render();

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

