var API_KEY = "af27518a1555472dce5188ddd8d303f3";

$(document).ready(function () {
  var loading = $("<h3>").html("Loading ... ");
  var currentWeather;

  function createCardImage() {
    var imageCol = $("<div>").addClass("col-4");
    var weather = currentWeather.weather;
    var icon = weather[0].icon;
    console.log(`http://openweathermap.org/img/w/${icon}.png`);
    var iconImg = $("<img>")
      .addClass("card-img")
      .attr("src", `http://openweathermap.org/img/w/${icon}.png`);
    imageCol.append(iconImg);
    return imageCol;
  }

  function createCardBody() {
    var cityName = currentWeather.name;
  }
  function createWeatherCard() {
    var card = $("<div>").addClass("card mb-3").css("max-width", "540px");
  }

  $("#zip-form").on("submit", function (e) {
    e.preventDefault();
    var zip = parseInt($("#zip-code").val());
    var error;
    $("#weather-info").empty();
    $("#weather-info").append(loading);
    $("#zip-code").val("");

    if (Number.isNaN(zip)) {
      error = $("<small>")
        .addClass("text-danger")
        .html("Please enter a numeric value of 5 digits");
      loading.remove();
      $("#weather-info").append(error);

      return;
    }
    console.log(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`
    );
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
        error = $("<small>")
          .addClass("text-danger")
          .html(err.response.data.message);
        $("#weather-info").append(error);
      });
  });
});
