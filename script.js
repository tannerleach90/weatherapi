//Makes sure code runs when DOM is loaded
$(function () {
    var $citySearch = $('#city-search');
    var $cityHistory = $('#city-history');
//when form submits, grab city from input value and call city function with value
    $("#weather-form").submit(function (event) {
        event.preventDefault();
        var city = $citySearch.val();

        callByCity(city);
    });
//API endpoint called with API key (so we can access API) with imperial query param conversion added to URL
    function callByCity(city) {
        var corsProxy = "https://cors-anywhere.herokuapp.com/";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="        
        $.get(corsProxy + apiUrl + city + "&appid=054de0bb639f081ad717b08a3b441921&units=imperial", function (data) {        
            $(".main-city-data").html(
                "<h2>" + data.name + " " + "(" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-cloud'></i></h2>" +
                "<p>Temperature: " + data.main.temp + "F<p>" +
                "<p>Humidity: " + data.main.humidity + "%<p>" + 
                "<p>Wind Speed: " + data.wind.speed + "MPH<p>" + 
                "<p><span class='cloud-cover'>Cloud Cover:</span>"  + " " + data.clouds.all + "<p>"                 
            )
//made empty ul in the html. after data comes back and we create above html, we take name of city from the data and create an li 
//with city name and append to ul
            $cityHistory.append(
                '<li>' + data.name + '</li>'
            )        

        futureForecast(city);
        });
    }
//similar AJAX call except put into forEACH loop to get extended forecast data
    function futureForecast(city) {
        var corsProxy = "https://cors-anywhere.herokuapp.com/";
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
        var string = "";
        $.get(corsProxy + apiUrl + city + "&appid=054de0bb639f081ad717b08a3b441921&cnt=5&units=imperial", function (data) {
            //when data received, build out HTML with data and append to container to display said data
            data.list.forEach(function (forecast) {
                console.log(forecast)
                string += "<div class='forecast-city'>" + city +
                    "<h3>" + moment().format("MMM Do YY") + "</h3>" +
                    "<i class='fas fa-sun'></i>" +
                    "<p>" + forecast.main.temp + "F</p>" +
                    "<p>" + forecast.main.humidity + "%</p>" + "</div>"                                    
            })

            $('#forecast-city-container').html(string);
        });
    }
});



