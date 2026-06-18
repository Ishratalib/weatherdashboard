// ==========================================
// ZONE 1: CONFIGURATION & GLOBALS
// ==========================================
let debounceTimer;
let myChart;
 
// ==========================================
// ZONE 2: INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "dark") document.documentElement.classList.add("dark");
 
  renderSearchBar();
  renderFavoritesList();
  getWeather("London");
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
 
// ==========================================
// ZONE 3: FUNCTIONS
// ==========================================
 
// --- A. UI & ERROR HANDLING ---
function showLoadingSkeletons() {
  const forecastSkeleton = `<div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-2xl p-4 h-24"></div>`;
  document.getElementById("forecastContainer").innerHTML =
    forecastSkeleton.repeat(5);
  document.getElementById("aqiCard").innerHTML =
    '<div class="animate-pulse bg-slate-200 dark:bg-slate-700 h-full rounded-3xl"></div>';
  document.getElementById("sunCard").innerHTML =
    '<div class="animate-pulse bg-slate-200 dark:bg-slate-700 h-full rounded-3xl"></div>';
}
 
function renderError(message) {
  document.querySelector("main").innerHTML = `
    <div class="flex flex-col items-center justify-center h-full text-center p-10 bg-white dark:bg-[#2d2d5e] rounded-3xl">
      <h2 class="text-2xl font-bold mb-4">Oops!</h2>
      <p class="mb-6">${message}</p>
      <button onclick="location.reload()" class="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">Retry</button>
    </div>`;
}
 
// --- B. GEOLOCATION ---
function getMyLocation() {
  showToast("Fetching your location...", "info");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => getWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      () =>
        showToast("Location access denied. Please search manually.", "error"),
    );
  } else {
    showToast("Geolocation not supported.", "error");
  }
}
 
// --- C. THEME & SEARCH ---
// Is code ko copy karke apni app.js mein purane setTheme ki jagah paste kar dein
function setTheme(mode) {
  const root = document.documentElement;
 
  if (mode === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
 
  // Chart ke colors update karne ke liye
  if (typeof myChart !== "undefined" && myChart) {
    const isDark = root.classList.contains("dark");
    const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
 
    myChart.options.scales.x.grid.color = gridColor;
    myChart.options.scales.y.grid.color = gridColor;
    myChart.options.scales.x.ticks.color = isDark ? "#fff" : "#000";
    myChart.options.scales.y.ticks.color = isDark ? "#fff" : "#000";
    myChart.update();
  }
}
 
function renderSearchBar() {
  const searchContainer = document.getElementById("searchSection");
  if (searchContainer) {
    searchContainer.innerHTML = `<input id="cityInput" type="text" placeholder="Search city..." autocomplete="off" class="bg-white dark:bg-[#2d2d5e] text-slate-900 dark:text-white px-4 py-3 rounded-2xl w-full outline-none border border-slate-200 dark:border-none shadow-sm transition-colors duration-300 placeholder-slate-400"/>`;
    document.getElementById("cityInput").addEventListener("input", (e) => {
      const q = e.target.value.trim();
      if (q.length === 0) return;
      showLoadingSkeletons();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => getWeather(q), 800);
    });
  }
}
 
// --- D. DATA FETCHING ---
async function getWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`,
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    renderCurrentWeather(data);
    renderForecast(data);
    renderAQI(data);
    renderSunData(data);
    renderChart(data);
    showToast(`Weather updated for ${data.location.name}`, "success");
  } catch (error) {
    renderError(
      "We couldn't find the city. Please check the spelling or try again.",
    );
  }
}
 
// --- E. RENDERING COMPONENTS ---
function renderCurrentWeather(data) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  const isFav = favs.includes(data.location.name);
  document.getElementById("currentWeather").innerHTML = `
    <div class="bg-blue-400 rounded-3xl p-6 h-full text-white relative shadow-md">
        <button onclick="toggleFavourite('${data.location.name}')" class="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform cursor-pointer ${isFav ? "text-red-500" : "text-white"}">❤️</button>
        <h2 class="text-2xl font-bold">${data.location.name}</h2>
        <img class="w-28 mx-auto" src="${data.current.condition.icon}">
        <h1 class="text-6xl font-bold text-center my-4">${Math.round(data.current.temp_c)}°</h1>
        <p class="text-center text-lg font-medium">${data.current.condition.text}</p>
        <div class="grid grid-cols-2 gap-3 mt-6">
            <div class="bg-white/20 p-3 rounded-xl"><p class="text-xs opacity-80">Wind</p><h3 class="font-bold">${data.current.wind_kph} km/h</h3></div>
            <div class="bg-white/20 p-3 rounded-xl"><p class="text-xs opacity-80">Humidity</p><h3 class="font-bold">${data.current.humidity}%</h3></div>
        </div>
    </div>`;
}
 
function renderForecast(data) {
  document.getElementById("forecastContainer").innerHTML =
    data.forecast.forecastday
      .map(
        (day) => `
    <div class="bg-white dark:bg-[#2d2d5e] border border-slate-200 dark:border-none rounded-2xl p-2 md:p-4 text-center shadow-sm">
        <h3 class="text-[10px] md:text-sm font-medium text-slate-500 dark:text-gray-400">${new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</h3>
        <img class="w-8 h-8 md:w-12 md:h-12 mx-auto" src="${day.day.condition.icon}">
        <p class="text-xs md:text-sm font-bold mt-1">${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°</p>
    </div>`,
      )
      .join("");
}
 
function renderAQI(data) {
  document.getElementById("aqiCard").innerHTML = `
    <h2 class="text-xl font-bold mb-4">Air Quality</h2>
 
    <div class="grid grid-cols-2 gap-3 sm:gap-4">
      ${[
        ["PM2.5", data.current.air_quality.pm2_5],
        ["PM10", data.current.air_quality.pm10],
        ["CO", data.current.air_quality.co],
        ["NO2", data.current.air_quality.no2],
      ]
        .map(
          ([key, val]) => `
        <div class="bg-blue-50 dark:bg-slate-700/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <p class="text-xs text-slate-400">${key}</p>
          <p class="text-sm md:text-base font-bold">${Number(val).toFixed(1)}</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}
function renderSunData(data) {
  document.getElementById("sunCard").innerHTML = `
    <h2 class="text-xl font-bold mb-4">Sun Cycle</h2>
 
    <div class="space-y-3 w-full">
 
      <!-- SUNRISE -->
      <div class="bg-blue-50 dark:bg-slate-700/50 p-3 rounded-xl flex items-center justify-between w-full min-w-0">
 
        <div class="flex items-center gap-2 shrink-0">
          <span>☀️</span>
          <span class="font-medium text-sm sm:text-base">Sunrise</span>
        </div>
 
        <span class="font-bold text-sm sm:text-base truncate max-w-[120px] text-right">
          ${data.forecast.forecastday[0].astro.sunrise}
        </span>
 
      </div>
 
      <!-- SUNSET -->
      <div class="bg-blue-50 dark:bg-slate-700/50 p-3 rounded-xl flex items-center justify-between w-full min-w-0">
 
        <div class="flex items-center gap-2 shrink-0">
          <span>🌙</span>
          <span class="font-medium text-sm sm:text-base">Sunset</span>
        </div>
 
        <span class="font-bold text-sm sm:text-base truncate max-w-[120px] text-right">
          ${data.forecast.forecastday[0].astro.sunset}
        </span>
 
      </div>
 
    </div>
  `;
}
 
function renderChart(data) {
  const ctx = document.getElementById("tempChart").getContext("2d");
  if (myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.forecast.forecastday[0].hour.map(
        (h) => h.time.split(" ")[1],
      ),
      datasets: [
        {
          label: "Temp (°C)",
          data: data.forecast.forecastday[0].hour.map((h) => h.temp_c),
          borderColor: "#7aa2ff",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}
 
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `${{ success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600" }[type]} text-white px-6 py-3 rounded-lg shadow-lg mb-2 transition-all`;
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
 
function toggleFavourite(city) {
  let favs = JSON.parse(localStorage.getItem("favs")) || [];
  favs.includes(city)
    ? (favs = favs.filter((item) => item !== city))
    : favs.unshift(city);
  localStorage.setItem("favs", JSON.stringify(favs));
  renderFavoritesList();
}
 
async function renderFavoritesList() {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  const container = document.getElementById("favCardsContainer");
  if (!container) return;
  const results = await Promise.all(favs.slice(0, 2).map(getFavoriteData));
  container.innerHTML = results
    .map((data, i) =>
      data
        ? `<button onclick="getWeather('${data.location.name}')" class="bg-pink-500 p-4 rounded-3xl w-full text-white flex justify-between items-center"><div>📍 ${data.location.name}</div><div class="font-bold">${Math.round(data.current.temp_c)}°</div></button>`
        : "",
    )
    .join("");
}
 
async function getFavoriteData(city) {
  try {
    return await (
      await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no&alerts=no`)
    ).json();
  } catch (e) {
    return null;
  }
}
 
function updateDateTime() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit", hour12: true },
  );
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-US",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  );
}