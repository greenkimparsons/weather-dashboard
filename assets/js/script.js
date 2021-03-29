var currentDateSpan = $("#current-date");
var searchForm = $("#search-form");
var searchCityEl = $("#search-city");
var weatherDisplay = $("#weather-display");
var resultContentEl = $("#result-content");

function updateCurrentDate() {
  currentDateSpan.text(moment().format("l"));
}

updateCurrentDate();

// function printResults(resultObj) {
//     console.log(resultObj);

//     // set up `<div>` to hold result content
//     var resultCard = document.createElement('div');
//     resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//     var resultBody = document.createElement('div');
//     resultBody.classList.add('card-body');
//     resultCard.append(resultBody);

//     var titleEl = document.createElement('h3');
//     titleEl.textContent = resultObj.title;

//     var bodyContentEl = document.createElement('p');
//     bodyContentEl.innerHTML =
//       '<strong>Date:</strong> ' + resultObj.date + '<br/>';

//     if (resultObj.subject) {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> No subject for this entry.';
//     }

//     if (resultObj.description) {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong> ' + resultObj.description[0];
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong>  No description for this entry.';
//     }

//     var linkButtonEl = document.createElement('a');
//     linkButtonEl.textContent = 'Read More';
//     linkButtonEl.setAttribute('href', resultObj.url);
//     linkButtonEl.classList.add('btn', 'btn-dark');

//     resultBody.append(titleEl, bodyContentEl, linkButtonEl);

//     resultContentEl.append(resultCard);
// }

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
    apiKey;
    
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
      console.log(data); //gives you the data

  //     weatherDisplay.empty(); //emptying out the storage

  //     for(var i = 0; i < data.data.length; i++) { //looping through the array to show only a certain amount of data/info
  //         var imageEl = $("<img>");
  //         imageEl.addClass("col-sm-4");
  //         imageEl.attr("src", data.data[0].city.name);
  //         weatherDisplay.append(imageEl);
  //     }

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