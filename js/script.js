var API_KEY = "af27518a1555472dce5188ddd8d303f3";

$(document).ready(function () {
  var loading = $("<h3>").html("Loading ... ");
  var currentWeather;

  function createMainWeatherCol() {
    var mainCol = $("<div>").addClass(
      "col border-right d-flex justify-content-center flex-column align-items-center p-2"
    );

    var temp = currentWeather.main.temp;
    var fahrenTemp = Math.floor(parseInt(temp) * 1.8 - 459.67);
    var tempText = $("<div>")
      .addClass("display-1 mb-1")
      .html(fahrenTemp + "&deg");
    var weather = currentWeather.weather[0];
    var weatherText = $("<h5>")
      .addClass("card-title")
      .html(`Weather: ${weather.description}`);
    mainCol.append([tempText, weatherText]);
    return mainCol;
  }

  function createCardBody() {
    var bodyCol = $("<div>").addClass("col");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h3>")
      .addClass("card-title")
      .html("<u>" + currentWeather.name + "</u>");

    var coord = currentWeather.coord;
    var longText = $("<h6>")
      .addClass("card-text")
      .html(`Longitude: ${coord.lon}&deg`);
    var latText = $("<h6>").html(`Latitude: ${coord.lat}&deg`);

    var pressureText = $("<h6>")
      .addClass("card-text")
      .html(`Pressure: ${currentWeather.main.pressure} hPa`);
    var humidityText = $("<h6>")
      .addClass("card-text")
      .html(`Humidity: ${currentWeather.main.humidity}%`);

    var wind = currentWeather.wind;
    var windSpeedText = $("<h6>")
      .addClass("card-text")
      .html(`Wind Speed: ${wind.speed} meter/sec`);
    var windDegText = $("<h6>")
      .addClass("card-text")
      .html(`Wind Degrees: ${wind.deg}&deg`);

    var clouds = currentWeather.clouds;
    var cloudText = $("<h6>")
      .addClass("card-text")
      .html(`Cloudiness: ${clouds.all}%`);

    var sys = currentWeather.sys;
    var sunriseText = $("<h6>")
      .addClass("card-text")
      .html(
        `Sunrise Time: ${new Date(sys.sunrise * 1000).toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })}`
      );

    var sunsetText = $("<h6>")
      .addClass("card-text")
      .html(
        `Sunset Time: ${new Date(sys.sunset * 1000).toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })}`
      );

    cardBody.append([
      cardTitle,
      longText,
      latText,
      pressureText,
      humidityText,
      windSpeedText,
      windDegText,
      cloudText,
      sunriseText,
      sunsetText,
    ]);
    bodyCol.append(cardBody);
    return bodyCol;
  }
  function createWeatherCard() {
    var card = $("<div>").addClass("card mb-3 rounded w-100 shadow");

    var cardRow = $("<div>").addClass("row no-gutters");
    var mainWeatherCol = createMainWeatherCol();

    var bodyCol = createCardBody();
    cardRow.append([mainWeatherCol, bodyCol]);
    card.append(cardRow);
    return card;
  }

  $("#zip-form").on("submit", function (e) {
    e.preventDefault();
    var zip = parseInt($("#zip-code").val());
    var error = $("<span>").addClass("error");
    $("#weather-info").empty();
    $("#weather-info").append(loading);
    $("#zip-code").val("");

    if (Number.isNaN(zip)) {
      error.html("Please enter a numeric value of 5 digits");
      loading.remove();
      $("#weather-info").append(error);

      return;
    }

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`
      )
      .then(function (res) {
        currentWeather = res.data;
        loading.remove();
        $("#weather-info").append(createWeatherCard());
      })
      .catch(function (err) {
        var errMsg = err.response.data.message;
        loading.remove();
        error.html(errMsg.charAt(0).toUpperCase() + errMsg.substring(1));
        $("#weather-info").append(error);
      });
  });
});
