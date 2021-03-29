var currentDateSpan = $("#current-date");
var searchForm = $("#search-form");
var searchCityEl = $("#search-city");

function updateCurrentDate(){
    currentDateSpan.text(moment().format("l"));
}

updateCurrentDate();

searchForm.on("submit", function() { //jQuery eventListener 
    event.preventDefault();

    var searchCity = searchCityEl.val();
    console.log(searchCity);
    var apiKey = "df4009a9dada03515b39dfea64490243";

    var queryURL = "api.openweathermap.org/data/2.5/forecast?q={" + cityName + "}&appid={" + apiKey + "}"; 

    fetch(queryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data.data[0]).images.fixed_.url;

            imagesDisplay.empty(); //emptying out the storage

            for(var i = 0; i < data.data.length; i++) { //looping through the array to show only a certain amount of data/info
                var imageEl = $("<img>");
                imageEl.addClass("col-sm-4");
                imageEl.attr("src", data.data[0].images.fixed_.url);
                imagesDisplay.append(imageEl);
            }

            
        });

})