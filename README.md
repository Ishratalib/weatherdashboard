# Weather Dashboard 🌤️

A responsive weather dashboard built with **HTML, JavaScript, Tailwind CSS, and WeatherAPI**. The application allows users to search for cities, view current weather conditions, check a 5-day forecast, explore air-quality information, view sunrise and sunset times, and save favourite cities.

## 🌐 Live Demo

[View Live Demo](https://ishratalib.github.io/weatherdashboard/)

## 📂 GitHub Repository

[View Source Code](https://github.com/Ishratalib/weatherdashboard)

---

## ✨ Features

* 🌍 Search weather by city
* 📍 Get weather using the user's current location
* 🌡️ Display current temperature and weather conditions
* 💨 Show wind speed and humidity
* 📅 5-day weather forecast
* 🌫️ Air-quality information including:

  * PM2.5
  * PM10
  * CO
  * NO₂
* ☀️ Sunrise and sunset information
* 📊 Hourly temperature chart
* ❤️ Save and manage favourite cities
* 💾 Favourite cities are stored using browser `localStorage`
* 🌓 Light and dark mode
* 🔔 Toast notifications
* ⏳ Loading skeletons while weather data is being fetched
* ❌ Error handling for invalid or unavailable cities
* 📱 Responsive layout for desktop, tablet, and mobile screens
* ⚡ Search debouncing to reduce unnecessary API requests

---

## 🛠️ Technologies Used

* **HTML5** — Page structure
* **JavaScript (ES6+)** — Application logic and API handling
* **Tailwind CSS** — Styling and responsive layout
* **Chart.js** — Temperature chart
* **WeatherAPI** — Weather and air-quality data
* **Browser LocalStorage** — Favourite cities and theme preferences
* **Geolocation API** — Current-location weather
* **Fetch API** — Fetching weather data from WeatherAPI

---

## 📂 Project Structure

```text
Weather Dashboard/
│
├── index.html
├── app.js
├── config.js
└── README.md
```

### `index.html`

Contains the main structure of the dashboard, including:

* Header and live date/time
* Search section
* Current location button
* Current weather section
* 5-day forecast
* Air-quality card
* Sunrise/sunset card
* Temperature chart
* Favourite cities section
* Toast notification container

### `app.js`

Contains the main application functionality, including:

* Weather API requests
* City search
* Search debouncing
* Weather rendering
* Forecast rendering
* Air-quality rendering
* Sunrise/sunset rendering
* Chart creation
* Favourite city management
* Light/dark theme switching
* Geolocation
* Loading states
* Error handling
* Toast notifications
* Live date/time updates

### `config.js`

Contains the WeatherAPI configuration used by the application.

---

## 🚀 How to Run Locally

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Ishratalib/weatherdashboard.git
```

Then move into the project folder:

```bash
cd weatherdashboard
```

### 2. Add Your WeatherAPI Key

Open `config.js` and configure your WeatherAPI credentials:

```javascript
const API_KEY = "YOUR_WEATHER_API_KEY";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
```

Replace `YOUR_WEATHER_API_KEY` with your own WeatherAPI key.

### 3. Run the Project

This is a frontend project, so no PHP, Node.js, or database setup is required.

The easiest way to run it locally is with **VS Code Live Server**:

1. Open the cloned project folder in VS Code.
2. Install the **Live Server** extension if you don't already have it.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The Weather Dashboard will open in your browser.

You can also open `index.html` directly in a browser, although using a local development server is recommended.

---

## 🔑 API Configuration

The application uses **WeatherAPI** to retrieve weather information.

The forecast request includes:

* Current weather
* 5-day forecast
* Air-quality information
* Weather data without alerts

The API endpoint used by the project is:

```text
https://api.weatherapi.com/v1/forecast.json
```

### Important

Do **not** commit your real API key to a public GitHub repository.

For a public repository, keep your real API key out of Git and use a safer configuration approach for deployment.

---

## 🔍 How the Application Works

When the application loads:

1. The saved theme is retrieved from `localStorage`.
2. The search bar and favourite cities are rendered.
3. London is loaded as the initial city.
4. The current date and time start updating every second.
5. Weather data is requested from WeatherAPI.
6. The returned data is displayed across the dashboard.

When a user searches for a city, the application waits **800ms after the user stops typing** before sending the API request. This prevents unnecessary requests while the user is typing.

The dashboard then updates the current weather, forecast, air quality, sun cycle, and temperature chart.

---

## ❤️ Favourite Cities

Favourite cities are stored in the browser using:

```text
localStorage
```

Users can:

* Add a city to favourites
* Remove a city from favourites
* View saved cities
* Select a favourite city to load its weather

The application also removes duplicate favourite cities from storage.

---

## 🌓 Theme Switching

The dashboard supports both:

* ☀️ Light Mode
* 🌙 Dark Mode

The selected theme is saved in `localStorage`, allowing the preference to remain when the user revisits the application.

---

## 📍 Current Location

The **Use My Location** feature uses the browser's Geolocation API.

If the user allows location access, the application obtains the device's latitude and longitude and requests weather information for that location.

If location access is denied, the application displays a notification asking the user to search for a city manually.

---

## 📊 Temperature Chart

The dashboard uses **Chart.js** to display hourly temperature data for the current forecast day.

The chart is recreated whenever new weather data is loaded so that it always represents the selected city.

---

## 📱 Responsive Design

The dashboard is designed to work across different screen sizes.

The layout adapts for:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

Tailwind CSS responsive utility classes are used throughout the interface.

---

## 🎯 Project Purpose

This project was built to practice working with:

* External APIs
* Asynchronous JavaScript
* `fetch()`
* `async/await`
* Dynamic DOM rendering
* Search debouncing
* Browser LocalStorage
* Geolocation
* Chart.js
* Responsive UI design
* Light/dark themes
* Loading and error states

---

## 👩‍💻 Author

**Ishrat Talib**

Frontend Web Development Project

### Technologies

`HTML5` · `JavaScript` · `Tailwind CSS` · `Chart.js` · `WeatherAPI`
