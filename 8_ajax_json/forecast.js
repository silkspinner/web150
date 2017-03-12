// WEB150 WN17 - Week 9 - Sunny with a chance of Awesome
// 03/08/2017 Ron Nims

// function buildForcast
// use city in getJSON request to openweathermap.org to get forcast object
// then populate http using underscore template functionality
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

var compass = function compass(degrees) {
    var compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      
    var direction = Math.round((degrees - 11.25)/22.5);
    return compassPoints[direction];
}

function dayhtml(date, icon, description, hiTemp, loTemp, humidity, pressure, windspeed, windangle) {
    // define dayhtml object from weather data
    // each property should contain fully marked up html representaion of data
    // which will be inserted into a td element
    this.dayname = "";
    this.iconurl = "";
    this.description = "";
    this.hiTemp = "";
    this.loTemp = "";
    this.humidity = "";
    this.pressure = "";
    this.winds = "";
    
}

var buildForecast = function buildForecast(city) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +
                ",US&units=imperial&appid=9b98b2bff9b27e273ccf886e1e20856e";
    var iconUrl = "http://openweathermap.org/img/w/";
    
    console.log(url);

    // request JSON data from weather service
    $.getJSON(url, function (forecast, status) {
        if (status === "success") {
            // handle successful request
            
            // alert("Data: " + forecast.toString() + "\nStatus: " + status);
            // console.log(forecast.city.name);
            
            // build an array of just the 12PM forcasts
            var days = [];
            for (idx = 0; idx < 5; idx++) {
                days[idx] = forecast.list[6 + (idx * 8)];
            }
            
            // build array of daily min max temperatures
            var dailyTemps = [];            
            var dayCnt = 0;
            // var dateLast = new Date(forecast.list[0].dt_txt);
            var dateLast = new Date();
            var dateNow = dateLast.getDate();
            var compareDate = Date;
            var checkDate = 0;
            var dayMinTemp = 200;
            var dayMaxTemp = -200;
            var objTemps = {};
            
            for (idx in forecast.list) {
                compareDate = new Date(forecast.list[idx].dt_txt);
                checkDate = compareDate.getDate();
                console.log(forecast.list[idx].dt_txt);
                console.log(checkDate);
               
                if ( dateNow != checkDate) {
                    dateNow = checkDate;
                    objTemps.min = dayMinTemp;
                    objTemps.max = dayMaxTemp;
                    dailyTemps[dayCnt] = objTemps;
                    console.log(dailyTemps[dayCnt]);

                    dayCnt += 1;
                    dayMinTemp = 200;
                    dayMaxTemp = -200;
                }

                if ( dayMinTemp > Math.round(forecast.list[idx].main.temp) ) {
                    dayMinTemp = Math.round(forecast.list[idx].main.temp) ;
                }

                if ( dayMaxTemp < Math.round(forecast.list[idx].main.temp) ) {
                    dayMaxTemp = Math.round(forecast.list[idx].main.temp);
                }
            }

            // add temps for last day
            objTemps.min = dayMinTemp;
            objTemps.max = dayMaxTemp;
            dailyTemps[dayCnt] = objTemps;
            console.log(dailyTemps);
            
            // update table elements with the forcast

            $("#fd-title").html("<h1>Five day forecast for " + forecast.city.name + "</h1>");
            
            // loop thru days building table rows
            var dateRow = "";
            var iconRow = "";
            var descRow = "";
            var hiTempRow = "";
            var loTempRow = "";
            var humidity = "";
            var pressure = "";
            var winds = "";
            var dt = Date;
            
            for (ctr in days) {
                dt = new Date(days[ctr].dt_txt);
                
                dateRow += "<td><p><b>" + weekday[dt.getDay()] + "</b></p>";
                dateRow += "<p>" + months[dt.getMonth()] + " " + dt.getDate() + "</p></td>";
                iconRow += '<td><img src="' + iconUrl + days[ctr].weather[0].icon + '.png"></td>';
                descRow += "<td><b>" + days[ctr].weather[0].description + "</b></td>";
                
                hiTempRow += "<td><b>High " + dailyTemps[ctr].max + "°F </b></td>";
                loTempRow += "<td><b>Low " + dailyTemps[ctr].min + "°F </b></td>";
                humidity += "<td><b>" + days[ctr].main.humidity + "%</b> humidity</td>";
                pressure += "<td><p>barometric</p><p>pressure</p><p><b>" + Math.round(days[ctr].main.pressure) + " hPa</b></p></td>";
                winds += "<td><p>winds <b>" + Math.round(days[ctr].wind.speed) + " mph</b></p>";
                winds += "<p>from <b>" + compass(Math.round(days[ctr].wind.deg)) + "</b></p></td>";
            }

            $("#fd-date").html(dateRow);
            $("#fd-icon").html(iconRow);
            $("#fd-desc").html(descRow);
            $("#fd-hightemp").html(hiTempRow);
            $("#fd-lowtemp").html(loTempRow);
            $("#fd-humidity").html(humidity);
            $("#fd-pressure").html(pressure);
            $("#fd-winds").html(winds);

        } else {
            // request failed
            console.out(status);
        }
    });
};


