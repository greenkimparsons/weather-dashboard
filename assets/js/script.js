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



function updateCurrentDate() {
  currentDateSpan.text(moment().format("l"));
}

updateCurrentDate();



searchForm.on("submit", function () {
  //jQuery eventListener
  event.preventDefault();

  var searchCity = searchCityEl.val();
  console.log(searchCity);

  var apiKey = "df4009a9dada03515b39dfea64490243";

  var queryURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&appid=" +
    apiKey + 
    "&units=imperial";
    
//   var queryURL2 =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     searchCity +
//     "&appid=" +
//     apiKey;

    

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
            "http://api.openweathermap.org/data/2.5/uvi?lat=" +
            latitude + "&lon=" + longitude + "&appid=" + apiKey;

            fetch(queryURLforUV) //fetching for lat and lon in a city
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var currentUVIndex = data.value;
                // console.log(currentUVIndex); //gives you the data in array of objects
                uvIndex.text(currentUVIndex);

                if (currentUVIndex >= 0 && currentUVIndex < 2) {
                  uvButtonEl.attr(".bg-success");
                } else if (currentUVIndex >= 3 && currentUVIndex <= 5) {
                  uvButtonEl.attr(".bg-warning");
                } else if (currentUVIndex < 5) {
                  uvButtonEl.attr(".bg-danger");
                }
            
                uvIndex.append(uvButtonEl);
            });

    });
    

  // fetch(queryURL)
  //     .then(function (response){
  //         return response.json();
  //     })
  //     .then(function (data) {
  //         console.log(data.data[0]).city.name;

  //         weatherDisplay.empty(); //emptying out the storage

  //         for(var i = 0; i < data.data.length; i++) { //looping through the array to show only a certain amount of data/info
  //             var imageEl = $("<img>");
  //             imageEl.addClass("col-sm-4");
  //             imageEl.attr("src", data.data[0].city.name);
  //             weatherDisplay.append(imageEl);
  //         }

  //     });
});
