// DOM variables
var currentDateSpan = $("#current-date");
var searchForm = $("#search-form");
var searchCityEl = $("#search-city");
var weatherDisplay = $("#weather-display");
var resultContentEl = $("#result-content");

var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var uvIndex = $("#uvIndex");
var city = $("#city");

var apiKey = "df4009a9dada03515b39dfea64490243";

function updateCurrentDate() {
  currentDateSpan.text(moment().format("l"));
}

updateCurrentDate();



searchForm.on("submit", function () {
  //jQuery eventListener
  event.preventDefault();

  var searchCity = searchCityEl.val();
  console.log(searchCity);
  //capitalize first letter from input
  city.text(searchCity.charAt(0).toUpperCase() + searchCity.slice(1));

  

  var queryURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&appid=" +
    apiKey + 
    "&units=imperial";
    
    

  fetch(queryURL1) //fetching for current weather in a city
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        var currentTemp = data.main.temp;
        var currentHumidity = data.main.humidity;
        var currentWindSpeed = data.wind.speed;

        temperature.text(currentTemp);
        humidity.text(currentHumidity);
        windSpeed.text(currentWindSpeed);

        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        var queryURLforUV = 
            "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            latitude + "&lon=" + longitude + "&appid=" + apiKey;

            fetch(queryURLforUV) //fetching for lat and lon in a city
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var currentUVIndex = data.value;
                // console.log(currentUVIndex); //gives you the data in array of objects
                uvIndex.text(currentUVIndex);
                uvIndex.addClass("uv-index-color");
                uvIndex.append();

                if (currentUVIndex >= 0 && currentUVIndex < 2) {
                  uvIndex.addClass("btn-success");
                } else if (currentUVIndex >= 3 && currentUVIndex <= 5) {
                  uvIndex.addClass("btn-warning");
                } else if (currentUVIndex < 5) {
                  uvIndex.addClass("btn-danger");
                }
            
            });

    });
  
  // var queryURL2 =
  //   "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
  //   searchCity +
  //   "&cnt=5&appid=" +
  //   apiKey;

  //   console.log(queryURL2);

  // fetch(queryURL2)
  //     .then(function (response2){
  //       return response2.json();
  //     })
  //     .then(function (data2) {
  //       // var accessForecastArr = data;
  //       console.log(data2);

  //       // for(var i =0; i < accessForecastArr.length; i+1) {
  //       //   var accessForecastTemp = accessForecastArr.main.temp;
  //       //   console.log(accessForecastArr[i].main.temp);
  //       // }
  //         // console.log(data.list[0].main.feels_like);

  //     });
});
