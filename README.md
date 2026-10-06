# Weather Dashboard 🌤️

A responsive weather dashboard built with **HTML5, JavaScript, Tailwind CSS, Chart.js, and WeatherAPI**. The application allows users to search for cities, view current weather conditions, check a 5-day forecast, explore air-quality information, view sunrise and sunset times, and save favourite cities.

## 🌐 Live Demo

[View Live Demo](https://ishratalib.github.io/weatherdashboard/)

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
* 💾 Favourite cities stored using browser `localStorage`
* 🌓 Light and dark mode
* 🔔 Toast notifications
* ⏳ Loading skeletons while weather data is being fetched
* ❌ Error handling for invalid or unavailable cities
* 📱 Responsive layout for desktop, tablet, and mobile
* ⚡ Search debouncing to reduce unnecessary API requests

---

## 🛠️ Technologies Used

* **HTML5** — Page structure
* **JavaScript (ES6+)** — Application logic and API handling
* **Tailwind CSS** — Styling and responsive design
* **Chart.js** — Hourly temperature chart
* **WeatherAPI** — Weather and air-quality data
* **Fetch API** — Fetching weather data
* **LocalStorage** — Favourite cities and theme preferences
* **Geolocation API** — Current-location weather
* **Async/Await** — Handling asynchronous API requests

---

## 📂 Project Structure

```text
Weather Dashboard/
│
├── index.html
├── app.js
├── config.example.js
├── .gitignore
└── README.md
```

---

## 📄 File Overview

### `index.html`

Contains the main dashboard structure, including:

* Header and live date/time
* Search section
* Current location button
* Current weather section
* 5-day forecast
* Air-quality information
* Sunrise and sunset information
* Temperature chart
* Favourite cities
* Toast notification container

### `app.js`

Contains the main application functionality, including:

* Weather API requests
* City search
* Search debouncing
* Current weather rendering
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

For local development, it contains:

```javascript
const API_KEY = "YOUR_WEATHER_API_KEY";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
```

For a public GitHub repository, the real API key should not be committed.

---

## 🚀 How to Run Locally

This is a **frontend project**, so no PHP, Node.js, or database setup is required.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone "YOUR_REPOSITORY_URL"
```

**For example:**

```bash
git clone https://github.com/Ishratalib/weatherdashboard.git
```

Then move into the project folder:

```bash
cd weatherdashboard
```

You can also download the project as a ZIP file and extract it.

---

### 2. Configure WeatherAPI

The project uses **WeatherAPI** to retrieve weather information.

Create a WeatherAPI account and obtain your own API key.

Then create a local `config.js` file:

```javascript
const API_KEY = "YOUR_WEATHER_API_KEY";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
```

Replace:

```text
YOUR_WEATHER_API_KEY
```

with your own API key.

If the repository contains `config.example.js`, copy it and rename the copy to:

```text
config.js
```

Then add your API key to `config.js`.

### Important

**Do not commit your real API key to a public GitHub repository.**

Add `config.js` to `.gitignore`:

```gitignore
config.js
```

This allows you to keep your local API configuration without publishing your API key.

---

### 3. Run the Project

The easiest way to run the project locally is with **VS Code Live Server**.

1. Open the cloned project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The Weather Dashboard will open in your browser.

---

## 🔑 API Configuration

The application uses the WeatherAPI forecast endpoint:

```text
https://api.weatherapi.com/v1/forecast.json
```

The request retrieves weather information used for:

* Current weather
* 5-day forecast
* Air-quality data
* Hourly forecast information

The project uses the API key from the local `config.js` file.

> **Security note:** Never publish your real API key in a public GitHub repository. If an API key has already been exposed publicly, it should be regenerated.

---

## 🔍 How the Application Works

When the application loads:

1. The saved theme is retrieved from `localStorage`.
2. The search bar and favourite cities are rendered.
3. London is loaded as the initial city.
4. The current date and time start updating.
5. Weather data is requested from WeatherAPI.
6. The returned data is displayed across the dashboard.

When a user searches for a city, the application waits **800ms after the user stops typing** before sending the API request.

This search debouncing helps prevent unnecessary API requests while the user is typing.

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

The application also handles duplicate favourite cities.

---

## 🌓 Theme Switching

The dashboard supports:

* ☀️ Light Mode
* 🌙 Dark Mode

The selected theme is stored in `localStorage`, allowing the preference to remain when the user revisits the application.

The Chart.js temperature chart also updates its visual settings when the theme changes.

---

## 📍 Current Location

The **Use My Location** feature uses the browser's Geolocation API.

When location access is allowed, the application obtains the user's latitude and longitude and requests weather information for that location.

If location access is denied or unavailable, the application displays a notification and the user can search for a city manually.

---

## 📊 Temperature Chart

The dashboard uses **Chart.js** to display hourly temperature data for the current forecast day.

When new weather data is loaded, the existing chart is replaced with a new chart representing the selected location.

---

## ⏳ Loading & Error States

The application includes loading skeletons while weather information is being retrieved.

If a weather request fails or the city cannot be found, an error screen is displayed with an option to retry.

Toast notifications are also used to provide feedback for different actions.

---

## 📱 Responsive Design

The dashboard is designed to work across different screen sizes:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

Tailwind CSS responsive utility classes are used throughout the interface to adapt the layout.

---

## 🎯 Project Purpose

This project was built to practice:

* External API integration
* JavaScript Fetch API
* Async/Await
* Dynamic DOM rendering
* Search debouncing
* Browser LocalStorage
* Geolocation API
* Chart.js
* Responsive UI design
* Light/dark themes
* Loading states
* Error handling
* Working with live weather data

---

## 👩‍💻 Author

**Ishrat Talib**

Frontend Web Development Project

### Technologies

`HTML5` · `JavaScript` · `Tailwind CSS` · `Chart.js` · `WeatherAPI` · `Fetch API` · `LocalStorage`
