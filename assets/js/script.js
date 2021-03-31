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

var for_day1 = $("#day1");
var for_day2 = $("#day2");
var for_day3 = $("#day3");
var for_day4 = $("#day4");
var for_day5 = $("#day5");
var for_temp1 = $("#temp1");
var for_temp2 = $("#temp2");
var for_temp3 = $("#temp3");
var for_temp4 = $("#temp4");
var for_temp5 = $("#temp5");
var for_humid1 = $("#humid1");
var for_humid2 = $("#humid2");
var for_humid3 = $("#humid3");
var for_humid4 = $("#humid4");
var for_humid5 = $("#humid5");

var apiKey = "df4009a9dada03515b39dfea64490243";

function updateCurrentDate() {
  currentDateSpan.text(moment().format("l"));
}

updateCurrentDate();

function forecastDay1() {
  for_day1.text(moment().add(1, 'days').calendar());
}

forecastDay1();

function forecastDay2() {
  for_day2.text(moment().add(2, 'days').calendar());
}

forecastDay2();

function forecastDay3() {
  for_day3.text(moment().add(3, 'days').calendar());
}

forecastDay3();

function forecastDay4() {
  for_day4.text(moment().add(4, 'days').calendar());
}

forecastDay4();

function forecastDay5() {
  for_day5.text(moment().add(5, 'days').calendar());
}

forecastDay5();

searchForm.on("submit", function () {
  //jQuery eventListener
  event.preventDefault();

  var searchCity = searchCityEl.val();
  console.log(searchCity);
  //capitalize first letter from input
  city.text(searchCity.charAt(0).toUpperCase() + searchCity.slice(1));

  // ---------------------------------------
  // Add submit event to form

  // var historyText = searchCity.trim();

  // // Return from function early if submitted todoText is blank
  // if (historyText === "") {
  //   return;
  // }

  // // Add new todoText to historyArr, clear the input
  // historyArr.push(historyText);
  // searchCity.val("");

  // // Store updated historyArr in localStorage, re-render the list
  // storeTodos();
  // renderTodos();

  // ------------------------------------------------

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

      temperature.text(currentTemp + "° F");
      humidity.text(currentHumidity + "%");
      windSpeed.text(currentWindSpeed + " MPH");

      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      var queryURLforUV =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey;

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
            uvIndex.addClass("good");
          } else if (currentUVIndex >= 3 && currentUVIndex <= 5) {
            uvIndex.addClass("moderate");
          } else if (currentUVIndex > 5) {
            uvIndex.addClass("bad");
          }
        });
        var part = "current,minutely,hourly,alerts";
        var queryURL2 =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&exclude=" +
          part +
          "&appid=" +
          apiKey +
          "&units=imperial";
      
        console.log(queryURL2);
      
      fetch(queryURL2)
        .then(function (response2) {
          return response2.json();
        })
        .then(function (data2) {
          
          var forecast = data2.daily;
          // console.log(forecast);

          // for(var i =0; i < forecast.length; i++) {
          //   var forecastTemp = forecast[i].feels_like.day;
          //   var forecastHumid = forecast[i].humidity;

          //   var addCard = weatherDisplay.append("<div>")
          //   addCard.addClass("card")

          // }

          var temp1 = forecast[0].feels_like.day + "° F";
          for_temp1.text(temp1);
          var temp2 = forecast[1].feels_like.day + "° F";
          for_temp2.text(temp2);
          var temp3 = forecast[2].feels_like.day + "° F";
          for_temp3.text(temp3);
          var temp4 = forecast[3].feels_like.day + "° F";
          for_temp4.text(temp4);
          var temp5 = forecast[4].feels_like.day + "° F";
          for_temp5.text(temp5);

          var humid1 = forecast[0].humidity + "%";
          for_humid1.text(humid1);
          var humid2 = forecast[1].humidity + "%";
          for_humid2.text(humid1);
          var humid3 = forecast[2].humidity + "%";
          for_humid3.text(humid1);
          var humid4 = forecast[3].humidity + "%";
          for_humid4.text(humid4);
          var humid5 = forecast[4].humidity + "%";
          for_humid5.text(humid5);


          // console.log(for_temp1.text(forecast[0].feels_like.day + "° F"));
          // for_humid1.text(forecast[0].humidity + "%");
          });
    });
});

// var todoInput = $("#search-city");
// // var todoForm = $("#search-form");
// var todoList = $("#search-list");
// var historyArr = []; //originally todos

// // The following function renders items in a todo list as <li> elements
// function renderTodos() {
//   // Clear todoList element and update todoCountSpan
//   todoList.innerHTML = "";

//   // Render a new li for each history
//   for (var i = 0; i < historyArr.length; i++) {
//     var history = historyArr[i]; //history = todo

//     var li = document.createElement("li");
//     li.textContent = history;
//     li.setAttribute("data-index", i);

//     li.addClass("list-group-item");

//     todoList.appendChild(li);
//   }
// }

// // This function is being called below and will run when the page loads.
// function init() {
//   // Get stored todos from localStorage
//   var storedTodos = JSON.parse(localStorage.getItem("historyArr"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedTodos !== null) {
//     historyArr = storedTodos;
//   }

//   // This is a helper function that will render todos to the DOM
//   renderTodos();
// }

// function storeTodos() {
//   // Stringify and set key in localStorage to todos array
//   localStorage.setItem("historyArr", JSON.stringify(historyArr));
// }

// todoList.addEventListener("click", function(event) {
//   var element = event.target;

//   // Checks if element is a button
//   if (element.matches("li") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     historyArr;

//     // Store updated todos in localStorage, re-render the list
//     storeTodos();
//     renderTodos();
//   }
// });
