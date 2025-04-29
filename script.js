async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "9f6bf47cd420d6f1e7e544de342d3c6e"; // ✅ Your actual API key
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "<p>⚠️ Please enter a city name</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  result.innerHTML = "<p>⏳ Fetching weather data...</p>"; // Loading message

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      result.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
    } else {
      result.innerHTML = `<p>❌ ${data.message}</p>`;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    result.innerHTML = "<p>⚠️ Failed to fetch weather data. Check your connection.</p>";
  }
}
