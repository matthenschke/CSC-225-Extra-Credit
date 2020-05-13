var API_KEY = "af27518a1555472dce5188ddd8d303f3";

$(document).ready(function () {
  var loading = $("<h3>").html("Loading ... ");
  var currentWeather;

  function createMainWeatherCol() {
    var mainCol = $("<div>").addClass(
      "col-4 d-flex justify-content-center flex-column align-items-center"
    );
    var temp = currentWeather.main.temp;
    var fahrenTemp = Math.floor(parseInt(temp) * 1.8 - 459.67);
    var tempText = $("<div>")
      .addClass("display-1")
      .html(fahrenTemp + "&deg");
    var weather = currentWeather.weather[0];
    var weatherText = $("<h5>")
      .addClass("card-title ")
      .html(`Weather: ${weather.description}`);
    mainCol.append([tempText, weatherText]);
    return mainCol;
  }

  function createCardBody() {
    var bodyCol = $("<div>").addClass("col-8");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h3>").addClass("card-title").html(currentWeather.name);

    var coord = currentWeather.coord;
    var coordText = $("<h6>")
      .addClass("card-text")
      .html(`Longitude: ${coord.lon}`);
    var latText = $("<span>").addClass("pl-3").html(`Latitude: ${coord.lat}`);
    coordText.append(latText);

    var clouds = currentWeather.clouds;
    var cloudText = $("<h6>")
      .addClass("card-text")
      .html(`Cloudiness: ${clouds.all}%`);

    var wind = currentWeather.wind;
    var windSpeedText = $("<span>")
      .addClass("card-text")
      .html(`Wind Speed: ${wind.speed} meter/sec`);
    var windDegText = $("<span>")
      .addClass("card-text")
      .html(`Wind Degrees: ${wind.deg} deg`);
    // var d = new Date();
    // localTime = d.getTime();
    // localOffset = d.getTimezoneOffset() * 60000;

    // // obtain UTC time in msec
    // utc = localTime + localOffset;
    // // create new Date object for different city
    // // using supplied offset
    // var nd = new Date(utc + (3600000*offset));
    // //nd = 3600000 + nd;
    // utc = new Date(utc);
    // // return time as a string
    // $("#local").html(nd.toLocaleString());
    // $("#utc").html(utc.toLocaleString());

    cardBody.append([
      cardTitle,
      coordText,

      cloudText,
      windSpeedText,
      windDegText,
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
    var error;
    $("#weather-info").empty();
    $("#weather-info").append(loading);
    $("#zip-code").val("");

    if (Number.isNaN(zip)) {
      error = $("<h3>")
        .addClass("text-danger")
        .html("Please enter a numeric value of 5 digits");
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
        console.log(err);
        loading.remove();
        error = $("<h3>")
          .addClass("text-danger")
          .html(err.response.data.message);
        $("#weather-info").append(error);
      });
  });
});
