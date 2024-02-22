// weather.js
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        }, () => {
            document.getElementById('weather-content').textContent = 'Geolocation is not supported or permission denied.';
        });
    } else {
        document.getElementById('weather-content').textContent = 'Geolocation is not supported by this browser.';
    }
});

function fetchWeather(latitude, longitude) {
    fetch(`/weather?latitude=${latitude}&longitude=${longitude}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data to debug
            updateWeatherWidget(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-content').textContent = 'Error fetching weather data.';
        });
}

function updateWeatherWidget(data) {
    const location = data.name; // City name
    const country = data.sys.country; // Country code
    const temperature = data.main.temp.toFixed(1); // Temperature in Celsius, rounded to 1 decimal place
    const windSpeed = (data.wind.speed * 3.6).toFixed(1); // Wind speed in km/h, converted from m/s and rounded
    const humidity = data.main.humidity; // Humidity in percentage
    const feelsLike = data.main.feels_like.toFixed(1); // "Feels like" temperature
    const weatherDescription = data.weather[0].description; // Weather description
    const iconCode = data.weather[0].icon; // Weather icon code
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // URL for weather icon

    // Update the text content of existing elements
    document.getElementById('weather-location').textContent = `Location: ${location}, ${country}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('feels-like').textContent = `Feels Like: ${feelsLike}°C`;
    document.getElementById('weather-description').textContent = weatherDescription;
    
    // Update the src attribute of the weather icon image
    const weatherIconImg = document.getElementById('weather-icon');
    weatherIconImg.src = iconUrl;
    weatherIconImg.alt = weatherDescription;
}




