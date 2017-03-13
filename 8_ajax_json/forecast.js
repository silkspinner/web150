// WEB150 WN17 - Week 9 - Sunny with a chance of Awesome
// 03/08/2017 Ron Nims


var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
var iconUrl = "http://openweathermap.org/img/w/";

var compass = function compass(degrees) {
    var compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    var direction = Math.round((degrees)/22.5);
    
    return compassPoints[direction];
}

function DayHtml(date, icon, description, hiTemp, loTemp, humidity, pressure, windspeed, windangle) {
    // define DayHtml object from weather data
    // each property contains fully marked-up html td element

    this.dayName = "<td><p><b>" + weekdays[date.getDay()] + "</b></p>";
    this.dayName += "<p>" + months[date.getMonth()] + " " + date.getDate() + "</p></td>";
    this.iconUrl = '<td><img src="' + iconUrl + icon + '.png" height="70" width="70"></td>';
    this.description = "<td><b>" + description + "</b></td>";
    this.hiTemp = "<td><b>High " + hiTemp + "°F</b></td>";
    this.loTemp = "<td><b>Low " + loTemp + "°F</b></td>";
    this.humidity = "<td><b>" + humidity + "%</b> humidity</td>";
    this.pressure = "<td><p>barometric</p><p>pressure</p><p><b>";
    this.pressure += Math.round(pressure) + " hPa</b></p></td>";
    this.winds = "<td><p>winds <b>" + Math.round(windspeed) + " mph</b></p>";
    this.winds += "<p>from <b>" + compass(Math.round(windangle)) + "</b></p></td>";
    
}

var trimForecast = function trimForecast(forecast) {
    // function to return array of forecast.list items not dated today
    var newForcast = [];
    var today = new Date();
    var checkDate = Date;
    
    for (idx in forecast.list) {
        // loop thru list, skip any entries for today
        checkDate = new Date(forecast.list[idx].dt_txt);

        if (today != checkDate) {
            // add this non-today list object
            newForcast.push(forecast.list[idx]);
        }
    }
    return newForcast;
}

var makeWeek = function makeWeek(forecast) {
    // populate and return an array of 5 DayHtml objects
    // using the forcast data
    // loop through list of 3-hour forcasts
    // skip 3hour forcasts for Today
    // aggregate min and max temps for each day
    // otherwise pull other info from forcast for targetHour entry
    
    // return this array
    var fdWeek = [];
    var fdDay = DayHtml;
    
    // hour of the day forcast chosen to pull days data other than temps        
    var targetHour = 15;      

    // set of variables used to instantiate DayHtml objects
    var dayIcon = "", dayDescription = "";
    var dayMaxTemp = -200, dayMinTemp = 200;
    var dayHumidity = 0, dayPressure = 0, dayWindSpeed = 0, dayWindAnge = 0;

    // remove any forcast entries for today
    var fdForecast = trimForecast(forecast);
    
    var checkDate = new Date(fdForecast[0].dt_txt);
    var checkDay = checkDate.getDate();
    
    var compareDate = Date;
    var compareDay = 0;
   
    for (idx in fdForecast) {
        compareDate = new Date(fdForecast[idx].dt_txt);
        compareDay = compareDate.getDate();

        if ( checkDay != compareDay) {
            // encountered next day, so create DayHtml for this day and reset check dates and min/max temps
            fdDay = new DayHtml(checkDate, dayIcon, dayDescription, dayMaxTemp, dayMinTemp,
                                dayHumidity, dayPressure, dayWindSpeed, dayWindAnge);
            fdWeek.push(fdDay);
            
            checkDate = compareDate;
            checkDay = compareDay;

            dayMinTemp = 200;
            dayMaxTemp = -200;
        }
        
        // if this forecast item matches targetHour then expract general data
        if ( compareDate.getHours() == targetHour) {

            dayIcon = fdForecast[idx].weather[0].icon;
            dayDescription = fdForecast[idx].weather[0].description;
            dayHumidity = fdForecast[idx].main.humidity ;
            dayPressure = fdForecast[idx].main.pressure;
            dayWindSpeed = fdForecast[idx].wind.speed;
            dayWindAnge = fdForecast[idx].wind.deg;
        }

        // update min and max temps if neccesary 
        if ( dayMinTemp > Math.round(fdForecast[idx].main.temp) ) {
            dayMinTemp = Math.round(fdForecast[idx].main.temp);
        }

        if ( dayMaxTemp < Math.round(fdForecast[idx].main.temp) ) {
            dayMaxTemp = Math.round(fdForecast[idx].main.temp);
        }
    }

    // add object for last day
    fdDay = new DayHtml(checkDate, dayIcon, dayDescription, dayMaxTemp, dayMinTemp,
                        dayHumidity, dayPressure, dayWindSpeed, dayWindAnge);
    fdWeek.push(fdDay);
    
    return fdWeek;
}

var buildCurrent = function buildCurrent(city) {
    // function buildCurrent
    // use city in getJSON to get current weather object from openweathermap.org
    // use data to populate Html Table rows
    
    var currentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city +
                ",US&units=imperial&appid=9b98b2bff9b27e273ccf886e1e20856e";
    
    // request current weather JSON data from weather service
    $.getJSON(currentUrl, function (current, status) {
        if (status === "success") {
            // handle successful request

            $("#cw-title").html("<p><h2>Current weather for " + current.name + "</h2></p>");
            
            // initialize variables used to accumulate row info
            var mainRow = "", lastRow = "";
            var sunriseDate = new Date(current.sys.sunrise * 1000);
            var sunsetDate = new Date(current.sys.sunset * 1000);

            mainRow += '<td><img src="' + iconUrl + current.weather[0].icon + '.png" height="100" width="100"></td>';
            mainRow += '<td><p><b>' + current.weather[0].main + '</b></p><p>' + current.weather[0].description + '</p></td>';
            
            mainRow += '<td><p>Tempurature</p><p><b>' + Math.round(current.main.temp) + ' °F</b></p></td>';
 
            mainRow += '<td><p><img src="sunrise.jpg"></p><p>Sunrise</p><p><b>';
            mainRow += sunriseDate.getHours() + ":" + sunriseDate.getMinutes() + " PST</b></p></td>";

            lastRow += "<td><b>" + current.main.humidity + "%</b><p>Humidity</p></td>";
            
            lastRow += '<td><p>barometric</p><p>pressure</p><p><b>';
            lastRow += Math.round(current.main.pressure) + " hPa</b></p></td>";

            lastRow += '<td><p>Winds <b>' + Math.round(current.wind.speed) + ' mph</b></p>';
            lastRow += '<p>from <b>' + compass(Math.round(current.wind.deg)) + '</b></p></td>';
            
            lastRow += '<td><p><img src="sunset.jpg"></p><p>Sunset</p><p><b>';
            lastRow += sunsetDate.getHours() + ":" + sunsetDate.getMinutes() + " PST</b></p></td>";
            
            // update the html rows
            $("#cw-main").html(mainRow);
            $("#cw-last").html(lastRow);

        } else {
            // request failed
            console.out(status);
        }
    });
}

var buildForecast = function buildForecast(city) {
    // function buildForecast
    // use city in getJSON to get forcast object from openweathermap.org
    // from forcast extract array thisWeek of 5 DayHtml objects
    // use thisWeek to populate Html Table rows

    var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +
                ",US&units=imperial&appid=9b98b2bff9b27e273ccf886e1e20856e";

    // request 5 day forcast JSON data from weather service
    $.getJSON(forcastUrl, function (forecast, status) {
        if (status === "success") {
            // handle successful request
            
            var thisWeek = makeWeek(forecast);
   
            // update forcast table elements with the forcast
            $("#fd-title").html("<h2>Five-day forecast for " + forecast.city.name + "</h2>");
            
            // initialize variables used to accumulate row info
            var dateRow = "", iconRow = "", descRow = "", hiTempRow = "";
            var loTempRow = "", humidityRow = "", pressureRow = "", windsRow = "";

            // composite thisWeeks DayHtml properties into rows
            for (day in thisWeek) {
                dateRow += thisWeek[day].dayName;
                iconRow += thisWeek[day].iconUrl;
                descRow += thisWeek[day].description;                
                hiTempRow += thisWeek[day].hiTemp;
                loTempRow += thisWeek[day].loTemp;
                humidityRow += thisWeek[day].humidity;
                pressureRow += thisWeek[day].pressure;
                windsRow += thisWeek[day].winds;
            }

            // update the html rows
            $("#fd-date").html(dateRow);
            $("#fd-icon").html(iconRow);
            $("#fd-desc").html(descRow);
            $("#fd-hightemp").html(hiTempRow);
            $("#fd-lowtemp").html(loTempRow);
            $("#fd-humidity").html(humidityRow);
            $("#fd-pressure").html(pressureRow);
            $("#fd-winds").html(windsRow);

        } else {
            // request failed
            console.out(status);
        }
    });
};


