import React, { useState } from "react";

// A demo API key - replace with your real key for production
const OWM_API_KEY = "c8d2c05abce0a5d7f303c425e174d820"; // Place your OpenWeatherMap API key here

// PUBLIC_INTERFACE
function WeatherPage() {
  /**
   * Renders the Weather Page for checking real-time weather updates.
   * Allows users to input a city, displays current weather and a 5-day forecast.
   */
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    try {
      // Fetch current weather
      let currRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location
        )}&appid=${OWM_API_KEY}&units=metric`
      );
      if (!currRes.ok) throw new Error("Location not found");
      let currData = await currRes.json();

      // Fetch 5 day forecast
      let foreRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          location
        )}&appid=${OWM_API_KEY}&units=metric`
      );
      if (!foreRes.ok) throw new Error("Failed to fetch forecast");
      let foreData = await foreRes.json();

      setWeather({
        main: currData.weather[0].main,
        desc: currData.weather[0].description,
        temp: currData.main.temp,
        temp_min: currData.main.temp_min,
        temp_max: currData.main.temp_max,
        humidity: currData.main.humidity,
        wind: currData.wind.speed,
        city: currData.name,
        icon: currData.weather[0].icon,
      });

      // Group forecast by date and extract one from ~12pm for each day
      const daily = {};
      for (let item of foreData.list) {
        const dt = new Date(item.dt * 1000);
        const day = dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
        if (!daily[day] && dt.getHours() >= 11 && dt.getHours() <= 14) {
          daily[day] = item;
        }
      }
      setForecast(
        Object.entries(daily).map(([day, item]) => ({
          day,
          temp: item.main.temp,
          desc: item.weather[0].description,
          icon: item.weather[0].icon,
        }))
      );
    } catch (err) {
      setError("Sorry, unable to fetch weather for this location.");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="title title-primary" style={{ fontSize: '2rem', marginBottom: 10 }}>
        Weather Checker
      </div>
      <div className="description" style={{ maxWidth: 600, marginBottom: 22 }}>
        Get real-time weather updates and upcoming forecast for your destination.
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-light"
        style={{
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(30,144,255,0.08)",
          padding: 26,
          marginBottom: 32,
          maxWidth: 430,
          color: "var(--text-dark)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <input
          required
          type="text"
          placeholder="Enter city or place"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="input"
          style={{
            padding: "9px 13px",
            border: "1px solid var(--border-color)",
            borderRadius: 4,
            fontSize: "1rem",
            flex: 1,
            minWidth: 120,
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          style={{
            fontWeight: 600,
            fontSize: "1.08rem"
          }}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Weather"}
        </button>
      </form>
      {error && (
        <div className="accent-highlight" style={{ marginBottom: 16, fontSize: "1rem" }}>
          {error}
        </div>
      )}
      <div>
        {weather && (
          <div
            className="bg-background"
            style={{
              border: "1px solid var(--primary)",
              borderRadius: 6,
              padding: "18px 20px",
              marginBottom: 28,
              maxWidth: 390
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <img
                alt={weather.main}
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                style={{ width: 54, height: 54 }}
              />
              <div>
                <div className="header-secondary" style={{ fontSize: "1.3rem", fontWeight: 600 }}>{weather.city}</div>
                <div className="text-primary" style={{ fontSize: "1.08rem" }}>{weather.main}</div>
                <div style={{ fontSize: "1.05rem" }}>
                  <b>{Math.round(weather.temp)}°C</b> (min {Math.round(weather.temp_min)}° / max {Math.round(weather.temp_max)}°)
                </div>
                <div className="text-secondary" style={{ fontSize: "0.96rem" }}>
                  {weather.desc}, humidity: {weather.humidity}%, wind: {weather.wind} m/s
                </div>
              </div>
            </div>
          </div>
        )}
        {forecast.length > 0 && (
          <div>
            <div className="header-secondary" style={{ fontWeight:600, marginBottom: 8 }}>5-Day Forecast</div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {forecast.map((f, i) => (
                <div
                  key={i}
                  className="bg-light text-dark"
                  style={{
                    border: "1px solid var(--primary)",
                    borderRadius: 6,
                    padding: "13px 14px",
                    width: 110,
                    boxShadow: "0 2px 4px rgba(30,144,255,0.03)",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{f.day}</div>
                  <img
                    alt={f.desc}
                    title={f.desc}
                    src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
                    style={{ width: 44, height: 44 }}
                  />
                  <div className="text-primary" style={{ fontSize: "1.05rem", fontWeight:600 }}>{Math.round(f.temp)}°C</div>
                  <div className="text-secondary" style={{ fontSize: "0.92rem" }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
