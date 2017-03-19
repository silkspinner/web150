// WEB150 WN17 - Week 9 - Sunny with a chance of Awesome
// 03/08/2017 Ron Nims

// GLOBAL CONSTANTS
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
var iconUrl = "http://openweathermap.org/img/w/";

// global var to contain city info
var cityInfo = {name: "Seattle", lon: -118.24, lat: 34.05};

// global var for chart information
var chartInfo = {};
chartInfo.data = [];

var padDigit = function padDigit(myNumber) {
    // add leading zero to single digits
    var newNumber = ("0" + myNumber).slice(-2);
    return newNumber;
}
var makeTime = function makeTime(myDate) {
    // make 'HH:SS PST' time format
    var timeStr = myDate.getHours() + ":" + padDigit(myDate.getMinutes());
    return timeStr;
}

var cToF = function cToF(celsius) {
    return (celsius * (9/5)) + 32
}

var mpsToMph = function mpsToMph(mps) {
    return (mps * 2.2369)
}

var processPage = function processPage() {
    if ($("#city").val().length > 0) {
        if (/^[a-zA-Z\s,]+$/.test($("#city").val())) {
            buildCurrent($("#city").val());
            buildForecast($("#city").val());
            $("#city").select();
        }
        else {
            alert("Enter a proper city name to get weather information.");
        }
    } 
    else {
        alert("Enter a city name to get weather information.");
    }
}

var compass = function compass(degrees) {
    // convert degrees into correct compass point notation
    var compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    var direction = 0;

    if (degrees > 11.25 && degrees <= 33.75) { direction = 1}
    else if (degrees > 33.75 && degrees <= 56.25) { direction = 2}
    else if (degrees > 56.25 && degrees <= 78.75) { direction = 3}
    else if (degrees > 78.75 && degrees <= 101.25) { direction = 4}
    else if (degrees > 101.25 && degrees <= 123.75) { direction = 5}
    else if (degrees > 123.75 && degrees <= 146.25) { direction = 6}
    else if (degrees > 146.25 && degrees <= 168.75) { direction = 7}
    else if (degrees > 168.75 && degrees <= 191.25) { direction = 8}
    else if (degrees > 191.25 && degrees <= 213.75) { direction = 9}
    else if (degrees > 213.75 && degrees <= 236.25) { direction = 10}
    else if (degrees > 236.25 && degrees <= 258.75) { direction = 11}
    else if (degrees > 258.75 && degrees <= 281.25) { direction = 12}
    else if (degrees > 281.25 && degrees <= 303.75) { direction = 13}
    else if (degrees > 303.75 && degrees <= 326.25) { direction = 14}
    else if (degrees > 326.25 && degrees <= 348.75) { direction = 15}
    else { direction = 0};
    
    return compassPoints[direction];
}

function DayHtml(onedayData) {
    // define DayHtml object from weather data
    // each property contains fully marked-up html td element
    var dayDate = new Date(onedayData.date);

    this.dayName = "<td><p><b>" + weekdays[dayDate.getDay()] + "</b></p>";
    this.dayName += "<p>" + months[dayDate.getMonth()] + " " + dayDate.getDate() + "</p></td>";
    this.iconUrl = '<td><img src="' + iconUrl + onedayData.icon + '.png" height="70" width="70"></td>';
    this.description = "<td><b>" + onedayData.description + "</b></td>";
    this.hiTemp = "<td><b>High " + onedayData.hiTemp + "°F</b></td>";
    this.loTemp = "<td><b>Low " + onedayData.loTemp + "°F</b></td>";
    this.humidity = "<td><b>" + onedayData.humidity + "%</b> humidity</td>";
    this.pressure = "<td><p>barometric</p><p>pressure</p><p><b>";
    this.pressure += onedayData.pressure + " hPa</b></p></td>";
    this.winds = "<td><p>winds <b>" + onedayData.wind.speed + " mph</b></p>";
    this.winds += "<p>from <b>" + onedayData.wind.angle + "</b></p>";
    // if the wind gust value is included add it to winds display
    if (onedayData.wind.gust > 0) {
        this.winds += "<p>Gusts to <b>" + onedayData.wind.gust + " mph</b></p>";
    }
    else {
        
    }
    this.winds += "</td>"
}

function DayData() {
    // define DayHtml object from weather data
    // each property contains fully marked-up html td element

    this.date = Date;
    this.icon = '';
    this.description = '';
    this.hiTemp = -200;
    this.loTemp = 200;
    this.humidity = 0;
    this.pressure = 0;
    this.wind = {speed: 0, angle: 0, gust: 0};
 }

var trimForecast = function trimForecast(forecast) {
    // function to return array of forecast.list items not dated today
    var newForcast = [];
    var today = new Date();
    var checkDate = Date;
    
    for (idx in forecast.list) {
        // loop thru list, skip any entries for today
        checkDate = new Date(forecast.list[idx].dt_txt);
   
        if (today.getDate() != checkDate.getDate()) {
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
    // otherwise pull other info from forcast  with targetHour timestamp
    
    // return this array
    var fdWeek = [];
    
    // hour of the day forcast chosen to pull days data other than temps        
    var targetHour = 15;      

    // establish ojects used for data collections
    var fdDay = DayHtml;
    var data = {};

    // create DayData object to hold daily info while traversing that day
    var todayData = new DayData();
 
    // remove any forcast entries for today
    var fdForecast = trimForecast(forecast);

    var checkDate= new Date(fdForecast[0].dt_txt);
    var compareDate = Date;

    // loop through all forecast items
    // build chartInfor.data array for drawing chart
    // and build fdWeek array for forcast table
    for (idx in fdForecast) {
        compareDate = new Date(fdForecast[idx].dt_txt);
     
        //write data to chart array for very 3hour forcast
        data = {date: compareDate,
                icon: fdForecast[idx].weather[0].icon,
                description: fdForecast[idx].weather[0].description,
                temp: Math.round(cToF(fdForecast[idx].main.temp)),
                humidity: Math.round(fdForecast[idx].main.humidity),
                pressure: Math.round(fdForecast[idx].main.pressure),
                wind: {speed: Math.round(mpsToMph(fdForecast[idx].wind.speed)),
                    angle: compass(Math.round(mpsToMph(fdForecast[idx].wind.deg)))}}
        chartInfo.data.push(data);
    
        if ( checkDate.getDate() != compareDate.getDate() ) {
            // encountered next day, so create DayHtml for this day and reinitialize todayData

            fdDay = new DayHtml(todayData);
            fdWeek.push(fdDay);
            
            todayData = new DayData();
            todayData.date = checkDate;

            // update checkDate
            checkDate = compareDate;
        }
        
        // if this forecast item matches targetHour then extract general data

        if ( compareDate.getHours() == targetHour) {
            todayData.icon = fdForecast[idx].weather[0].icon;
            // always use daytime version of icons for forcasts
            todayData.icon = todayData.icon.slice(0, todayData.icon.length - 1) + "d";

            todayData.description = fdForecast[idx].weather[0].description;
            todayData.humidity = Math.round(fdForecast[idx].main.humidity);
            todayData.pressure = Math.round(fdForecast[idx].main.pressure);
            todayData.wind.angle = compass(Math.round(fdForecast[idx].wind.deg)) ;
            // if the wind gust value is included add it to winds display
            if (typeof(fdForecast[idx].wind.gust) != 'undefined') {
                // current API has bug speed and gust reversed when gust is present
                todayData.wind.speed = Math.round(mpsToMph(fdForecast[idx].wind.speed));                
                todayData.wind.gust = Math.round(mpsToMph(fdForecast[idx].wind.gust));
            }
            else {
                todayData.wind.speed = Math.round(mpsToMph(fdForecast[idx].wind.speed));
            }
        }

        // update min and max temps if neccesary 
        if ( todayData.loTemp > Math.round(cToF(fdForecast[idx].main.temp)) ) {
            todayData.loTemp = Math.round(cToF(fdForecast[idx].main.temp))  ;
        }

        if ( todayData.hiTemp < Math.round(cToF(fdForecast[idx].main.temp)) ) {
            todayData.hiTemp = Math.round(cToF(fdForecast[idx].main.temp));
        }
    }

    // add object for last day
    fdDay = new DayHtml(todayData);
    fdWeek.push(fdDay);
    
    return fdWeek;
}

var buildCurrent = function buildCurrent(city) {
    // use city in getJSON to get current weather object from openweathermap.org
    // use data to populate Html Table rows
    
    var currentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city +
               "&units=metric&appid=9b98b2bff9b27e273ccf886e1e20856e";

    // request current weather JSON data from weather service
    $.getJSON(currentUrl, function (current, status) {
        if (status === "success") {
            // handle successful request
            
            // set global city info
            cityInfo.name = current.name;
            cityInfo.lon = current.coord.lon;
            cityInfo.lat = current.coord.lat;

            var cityDate = new Date(current.dt * 1000);
            var cityHours = cityDate.getHours() + ':00';
            if (cityDate.getHours() == "0") {
                cityHours = "Midnight"
            }
            var cityDateText = months[cityDate.getMonth()] + ' ' + cityDate.getDay() + ' at ' + cityHours;
            
            //set title
            $("#cw-title").html('<p><h2>Weather for ' + current.name + ', ' + current.sys.country +
                                ' as of ' + cityDateText + '</h2></p>');
            
            // initialize variables used to accumulate row info
            var mainRow = "", lastRow = "";
            
            var sunriseDate = new Date(current.sys.sunrise * 1000);
            var sunsetDate = new Date(current.sys.sunset * 1000);

            // process all weather data into mainRow and lastRow
            mainRow += '<td id="icon"><img src="' + iconUrl + current.weather[0].icon + '.png" height="100" width="100"></td>';
            mainRow += '<td><p>Temperature</p><p><b>' + Math.round(cToF(current.main.temp)) + ' °F</b></p></td>';
            mainRow += '<td><b>' + current.main.humidity + '%</b><p>Humidity</p></td>';
            mainRow += '<td><p>barometric</p><p>pressure</p><p><b>';
            mainRow += Math.round(current.main.pressure) + " hPa</b></p></td>";
            mainRow += '<td><p>Sunrise</p><p>' + makeTime(sunriseDate) +  '</p><p><img src="sunrise.jpg"></p></td>';


            lastRow += '<td id="desc"><b>';
            for (type in current.weather) {
                lastRow += '<p>' + current.weather[type].main + '</p>';
                if (current.weather[type].main.toLowerCase() != current.weather[type].description.toLowerCase()) {
                    lastRow += '<p>' + current.weather[type].description + '</p>';           
                }
            }
            lastRow += '</b></td>';
            if (current.clouds.all == 1){
                lastRow += '<td><p>Cloudcover</p><p><b>Zero %</b></p></td>';
            }
            else {
                lastRow += '<td><p>Cloudcover</p><p><b>' + Math.round(current.clouds.all) + '%</b></p></td>';
            }
            lastRow += '<td>';
            if (typeof(current.wind.gust) != 'undefined') {
                // current API has bug speed and gust reversed when gust is present
                lastRow += '<p>Winds <b>' + Math.round(mpsToMph(current.wind.speed)) + ' mph</b></p>';
                lastRow += '<p>from <b>' + compass(Math.round(current.wind.deg)) + '</b></p>';
                lastRow += '<p>Gusts to <b>' + Math.round(mpsToMph(current.wind.gust)) + ' mph</b></p>';         
            }
            else {
                lastRow += '<p>Winds <b>' + Math.round(mpsToMph(current.wind.speed)) + ' mph</b></p>';
                lastRow += '<p>from <b>' + compass(Math.round(current.wind.deg)) + '</b></p>';
            }
            lastRow += '</td>';
            lastRow += '<td><p>Visibility</p><p><b>' + Math.round(current.visibility) + ' ft</b></p></td>';
            lastRow += '<td><p>Sunset</p><p>' + makeTime(sunsetDate) +  '</p><p><img src="sunset.jpg"></p></td>';
            
            // update the html rows
            $("#cw-main").html(mainRow);
            $("#cw-last").html(lastRow);

        } else {
            // request failed
            console.log("status:", status, " cod:", forecast.cod, " message: ", forecast.message );
            alert("Request for current weather data failed. Response message: " + forecast.message );
        }
    });
}

var buildForecast = function buildForecast(city) {
    // use city in getJSON to get forcast object from openweathermap.org
    // from forcast extract array thisWeek of 5 DayHtml objects
    // use thisWeek to populate Html Table rows

    var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +
                "&units=metric&appid=9b98b2bff9b27e273ccf886e1e20856e";


    // request 5 day forcast JSON data from weather service
    $.getJSON(forcastUrl, function (forecast, status) {
        if (status === "success" && forecast.cod == "200") {
            // handle successful request

            var thisWeek = makeWeek(forecast);
   
            // update forcast table elements with the forcast
            $("#fd-title").html("<h2>5-day forecast for " + forecast.city.name + ", " + forecast.city.country + "</h2>");
            
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
            console.log("status:", status, " cod:", forecast.cod, " message: ", forecast.message );
            alert("Request for weather forecast data failed. Response message: " + forecast.message);
        }
    });
};

