const btn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', getWeather);
document.getElementById('city').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') getWeather();
});

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
    return;
  }

  const apiKey = "c321baef6f214b2c09ee011ba4ff7640"; // ← paste your OpenWeatherMap key here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        resultDiv.innerHTML = '<p class="error">City not found. Try another name.</p>';
      } else {
        resultDiv.innerHTML = `<p class="error">Error: ${res.status} ${res.statusText}</p>`;
      }
      return;
    }

    const data = await res.json();
    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ <strong>${data.main.temp}°C</strong></p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">Network error. Check your internet connection.</p>`;
    console.error(err);
  }
}
