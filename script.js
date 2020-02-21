
$(function () {
    var $citySearch = $('#city-search');
    var $cityHistory = $('#city-history');

    $("#weather-form").submit(function (event) {
        event.preventDefault();
        var city = $citySearch.val();

        callByCity(city);
    });

    function callByCity(city) {
        var corsProxy = "https://cors-anywhere.herokuapp.com/";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="        
        $.get(corsProxy + apiUrl + city + "&appid=054de0bb639f081ad717b08a3b441921", function (data) {        
            $(".main-city-data").html(
                "<h2>" + data.name + " " + "(" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-cloud'></i></h2>" +
                "<p>Temperature: " + data.main.temp + "<p>" +
                "<p>Humidity: " + data.main.humidity + "%<p>" + 
                "<p>Wind Speed: " + data.wind.speed + "MPH<p>" + 
                "<p><span class='cloud-cover'>Cloud Cover:</span>"  + " " + data.clouds.all + "<p>"                 
            )

            $cityHistory.append(
                '<li>' + data.name + '</li>'
            )        

        futureForecast(city);
        });
    }

    function futureForecast(city) {
        var corsProxy = "https://cors-anywhere.herokuapp.com/";
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
        var string = "";
        $.get(corsProxy + apiUrl + city + "&appid=054de0bb639f081ad717b08a3b441921&cnt=5", function (data) {
            
            data.list.forEach(function (forecast) {
                console.log(forecast)
                string += "<div class='forecast-city'>" + city +
                    "<h3>" + moment().format("MMM Do YY") + "</h3>" +
                    "<i class='fas fa-sun'></i>" +
                    "<p>" + forecast.main.temp + "</p>" +
                    "<p>" + forecast.main.humidity + "</p>" + "</div>"                                    
            })

            $('#forecast-city-container').html(string);
        });
    }
});



