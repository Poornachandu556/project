const API_KEY = 'ce341cf7a4905056d5ffad8baff8e9a7'; // Replace with your OpenWeatherMap API key

$('#search-btn').on('click', function () {
    const city = $('#city-input').val().trim();

    if (city === '') {
        showError('Please enter a city name.');
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    $.getJSON(url)
        .done(function (data) {
            $('#error-message').addClass('d-none');
            $('#weather-result').removeClass('d-none');

            $('#city-name').text(`${data.name}, ${data.sys.country}`);
            $('#weather-description').text(data.weather[0].description);
            $('#temperature').text(data.main.temp);
            $('#humidity').text(data.main.humidity);
            $('#wind-speed').text(data.wind.speed);
        })
        .fail(function () {
            showError('City not found. Please try another city.');
        });
}

function showError(message) {
    $('#error-message').removeClass('d-none').text(message);
    $('#weather-result').addClass('d-none');
}
