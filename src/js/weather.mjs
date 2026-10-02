export async function getWeather(destination) {
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${destination.latitude}` +
        `&longitude=${destination.longitude}` +
        `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&temperature_unit=fahrenheit` +
        `&wind_speed_unit=mph`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to load weather.");
    }

    const data = await response.json();

    return data.current;
}

function getWeatherDescription(code) {
    if (code === 0) {
        return "Clear";
    } else if (code <= 3) {
        return "Partly Cloudy";
    } else if (code <= 48) {
        return "Foggy";
    } else if (code <= 67) {
        return "Rain";
    } else if (code <= 77) {
        return "Snow";
    } else if (code <= 82) {
        return "Rain Showers";
    } else if (code <= 86) {
        return "Snow Showers";
    } else {
        return "Thunderstorms";
    }
}

function getWeatherIcon(code) {
    if (code === 0) {
        return "☀️";
    } else if (code <= 3) {
        return "⛅";
    } else if (code <= 48) {
        return "🌫️";
    } else if (code <= 67) {
        return "🌧️";
    } else if (code <= 77) {
        return "❄️";
    } else if (code <= 82) {
        return "🌦️";
    } else if (code <= 86) {
        return "🌨️";
    } else {
        return "⛈️";
    }
}

export function displayWeather(weather) {
    const weatherDisplay =
        document.querySelector("#weather-display");

    const description =
        getWeatherDescription(weather.weather_code);

    const icon =
        getWeatherIcon(weather.weather_code);

    weatherDisplay.innerHTML = `
        <div class="weather-icon">
            ${icon}
        </div>

        <div class="weather-details">
            <p class="weather-temperature">
                ${Math.round(weather.temperature_2m)}°F
            </p>

            <p class="weather-description">
                ${description}
            </p>

            <p>
                Feels like ${Math.round(weather.apparent_temperature)}°F
            </p>

            <p>
                Wind: ${Math.round(weather.wind_speed_10m)} mph
            </p>
        </div>
    `;
}