// WEB150 WN17 - Week 9 - Sunny with a chance of Awesome
// 03/08/2017 Ron Nims

// GLOBAL CONSTANTS
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
var iconUrl = "http://openweathermap.org/img/w/";

// global var for chart information
var chartInfo = [];

// global var to contain city info
var cityInfo = {name: "Seattle", lon: -118.24, lat: 34.05};

var offsetX = 0;
var offsetY = 0;
    
var popCanvas = Object;
var popCtx = Object;

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
    return;
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
    todayData.date = checkDate; // set the first todayData.date
    var compareDate = Date;

    // loop through all forecast items
    // and build fdWeek array for forcast table

    for (idx in fdForecast) {
        compareDate = new Date(fdForecast[idx].dt_txt);
        
        if ( checkDate.getDate() != compareDate.getDate() ) {
            // encountered next day, so create DayHtml for this day and reinitialize todayData

            fdDay = new DayHtml(todayData);
            fdWeek.push(fdDay);
            
            // update checkDate
            checkDate = compareDate;
            
            todayData = new DayData();
            todayData.date = checkDate;
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
            var cityDateText = months[cityDate.getMonth()] + ' ' + cityDate.getDate() + ' at ' + cityHours;
            
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
            
            // build chart from forecast
            buildChart(forecast);

        } else {
            // request failed
            console.log("status:", status, " cod:", forecast.cod, " message: ", forecast.message );
            alert("Request for weather forecast data failed. Response message: " + forecast.message);
        }
    });

}

var buildChart = function buildChart(forecast) {
    // use accumulated weather info in chartInfo to draw a chart
    // X axis time, one step per each 3 hour forcast
    // Y axis primary temperature, secondary wind speed, pressure, humidity
    
    // define overall chart size
    var chartX = 540;
    var chartY = 420;

    // define chart axis boundary
    var labelAreaX = 30;
    var padX = 10;
    var axisPadX = padX + labelAreaX;
    var axisPadY = 20;
    var labelArea = 20;

    var axisX = chartX - ((2 * padX) + labelAreaX);
    var axisY = chartY - ((2 * axisPadY) + labelArea);
    
    var canvas = document.getElementById('chart');
    $("#chart").attr("width", chartX);    
    $("#chart").attr("height", chartY);    
    var context = canvas.getContext('2d');

    popCanvas = document.getElementById("popCast");
    popCtx = popCanvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,chartX,chartY);
    context.font="12px Arial";
    context.textBaseline="bottom";
    
    chartInfo = gatherChart(forecast);
    var stepX = Math.floor(axisX/(chartInfo.length + 1));
    
    // reset axisX to fit actual data set
    axisX = (stepX * (chartInfo.length + 2));
    
    drawHorzAxis(context, axisPadX, axisPadY, axisX, axisY, "#000000", stepX);
    
    var minMax = findMinMax(chartInfo);
    
    // stepY size is axis/(range + 2) allowing one stepY "margin" on each end
    var stepY = Math.floor(axisY/(Math.ceil(minMax.max - minMax.min) + 2));
    
    drawVertAxis(context, axisPadX, axisPadY + axisY, axisX, axisY,
                 "temp", "#017C74", "°", minMax.min, minMax.max, stepY);
    
    plotDots(context, axisPadX, axisPadY, axisX, axisY, "#0b57c1", stepX, stepY, minMax);
    
    context.font="12px Arial";
    context.fillStyle = "#000000";
    context.textAlign="center";
    context.textBaseline="bottom";
    context.fillText("5-Day Temperature forcast, 3hr steps - Hover over any dot for details", chartX/2, 18);
    
    var canvasOffset = $("#chart").offset();
    offsetX = canvasOffset.left;
    offsetY = canvasOffset.top;

    // use chartInfo.dot to check for hover
    
    // request mousemove events
    $("#chart").mousemove(function (move) {
       mouseMoved(move);
    });

}

function mouseMoved(move) {

    var mouseX = parseInt(move.pageX - offsetX);
    var mouseY = parseInt(move.pageY - offsetY);
    var box = 7;
    var popImg = new Image();

    var hit = false;
    var popCast = document.getElementById("popCast");
    popCtx.textBaseline="bottom";
    popCtx.textAlign="center";
    
    for (datum in chartInfo) {
        var dot = chartInfo[datum].dot;

        if (((mouseX < dot.x + box) && (mouseX > dot.x - box)) &&
            ((mouseY < dot.y + box) && (mouseY > dot.y - box))) {
            // hovering over dot so position popCast
            popCast.style.left = (dot.x + offsetX - 40) + "px";
            popCast.style.top = (dot.y + offsetY - 160) + "px";
            popCtx.fillStyle = "#ffffff";
            popCtx.fillRect(0, 0, popCast.width, popCast.height);
            
            popImg.src = iconUrl + chartInfo[datum].icon + ".png";
            popImg.onload = function() {
                popCtx.drawImage(popImg, 10, 0);
            };
            popCtx.fillStyle = "#000000";
            popCtx.font="14px Arial";
            popCtx.fillText("Temp " + chartInfo[datum].temp + "°", 40, 60);
            if (chartInfo[datum].description.length > 10) {
                popCtx.font="10px Arial";                
            }
            else {
                popCtx.font="12px Arial";                
            }

            popCtx.fillText(chartInfo[datum].description, 40, 75);
            
            popCtx.font="14px Arial";
            popCtx.fillText("Hum " + chartInfo[datum].humidity + "%", 40, 95);
            popCtx.font="11px Arial";
            popCtx.fillText("Pres " + chartInfo[datum].pressure + " hPa", 40, 110);
            popCtx.font="12px Arial";
            popCtx.fillText("Winds " + chartInfo[datum].wind.speed + " mph", 40, 125);
            popCtx.fillText("from " + chartInfo[datum].wind.angle, 40, 140);
            
            popCtx.stroke();     
            hit = true;
        }
    }
    if (!hit) {
        //$("#popCast").style.left = "-200px";
        popCast.style.left = "-200px";
    }
}

var gatherChart = function gatherChart(forecast) {
    // use accumulated weather info in chartInfo to draw a chart
    // build chartInfor.data array for drawing chart
    // remove any forcast entries for today
    var fdForecast = trimForecast(forecast);
    var data = {};
    chartInfo = [];
    
    for (idx in fdForecast) {
        //write data to chart array for very 3hour forcast
        data = {date: new Date(fdForecast[idx].dt_txt),
                icon: fdForecast[idx].weather[0].icon,
                description: fdForecast[idx].weather[0].description,
                temp: Math.round(cToF(fdForecast[idx].main.temp)),
                humidity: Math.round(fdForecast[idx].main.humidity),
                pressure: Math.round(fdForecast[idx].main.pressure),
                wind: {speed: Math.round(mpsToMph(fdForecast[idx].wind.speed)),     
                    angle: compass(Math.round(mpsToMph(fdForecast[idx].wind.deg)))}}
        chartInfo.push(data);
    }
    return chartInfo;
}

var drawGridline = function drawGridline(ctx, fixAxis, stepAxis, gridLength, dash, skip, width, color, orient) {
    // general function to draw dotted gridline
    // gridline can be horizontal or vertical based on orient; 0 = horizontal, 1 = vertical
    // gridline composed of solid line gridLength dash, seperated by skip
    
    var dashStart = {};
    var dashEnd = {};    
    
    // start after the first "skip"
    for (var step = skip; step < gridLength; step += (skip + dash) ) {
        if (orient == 1) {
            // draw vertical gridline north from fixAxis, stepAxis
            dashStart = {x: fixAxis, y: stepAxis - step };
            dashEnd = {x: fixAxis, y: stepAxis - step - dash};              
        }
        else {
            // draw horizontal gridline east from stepAxis, fixAxis

            dashStart = {x: stepAxis + step, y: fixAxis};
            dashEnd = {x: stepAxis + step + dash, y: fixAxis};              
        }
        drawLine(ctx, dashStart, dashEnd, width, color);
    }   
}

var drawLine = function drawLine(ctx, pStart, pEnd, width, color) {

    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=width;
    ctx.moveTo(pStart.x, pStart.y);
    ctx.lineTo(pEnd.x, pEnd.y);
    ctx.stroke();
}

var fillCircle = function fillCircle(ctx, pos, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2*Math.PI);
    ctx.fill();

}

var findMinMax = function findMinMax(chartInfo) {
    // determine min and max values of chartInfo.temp
    
    var minMax = {min: Infinity, max: -Infinity};
    
    for (day in chartInfo) {
        if (chartInfo[day].temp < minMax.min) {
            minMax.min = chartInfo[day].temp;
        }                
        if (chartInfo[day].temp > minMax.max) {
            minMax.max = chartInfo[day].temp;
        }
        
    }
    return minMax;
}

var plotDots = function plotDots(context, axisPadX, axisPadY, axisX, axisY, color, stepX, stepY, minMax) {
    // plot chart data, build list of data locations to compare for mouse inputs            
    var chartDots = [];
    var dotRadius = 6;
   
    // draw first dot, then loop thru chartInfo drawing graph line + next dot
    var plotX = axisPadX + stepX;
    var plotY = (axisPadY + axisY) - ((stepY * (chartInfo[0].temp - minMax.min)) + stepY);
    var plotDot = {x: plotX, y:plotY};
    fillCircle(context, plotDot, dotRadius, color);
    chartInfo[0].dot = plotDot;
    
    var lastDot = plotDot;
    for (day in chartInfo) {
        // skip first entry that is already drawn
        if (day != 0) {
            plotX = axisPadX + stepX + (day * stepX);
            plotY = (axisPadY + axisY) - ((stepY * (chartInfo[day].temp - minMax.min)) + stepY);
            plotDot = {x: plotX, y:plotY};            
            drawLine(context, lastDot, plotDot, 2, color);            
            fillCircle(context, plotDot, dotRadius, color);
            chartInfo[day].dot  = plotDot;
            lastDot = plotDot;
        }
    }
}

var drawHorzAxis = function drawHorzAxis(ctx, axisPadX, axisPadY, axisX,
                            axisY, color, step) {
    //draw x axis in black
    var tickX = 6;
    var labelDateX = 20; // x axis date distance from axis
    var labelHourOffset = 12; // x axis midnight/noon offset from date
    var labelNoonOffset = 7; // Noon extra offset from axis
    
    var lineStart = {x: axisPadX - 1, y: axisPadY + axisY}; // -1 to cover width of vert axis
    var lineEnd = {x: axisX + axisPadX + 1, y: axisPadY + axisY}; // +1 to cover width of vert end axis
    drawLine(ctx, lineStart, lineEnd, 2, "#000000");
    
    lineStart = {x: axisX + axisPadX, y: axisPadY + axisY}; // draw boundary line
    lineEnd = {x: axisX + axisPadX, y: axisPadY};
    drawLine(ctx, lineStart, lineEnd, 1, "#000000");

    ctx.textAlign="center";
    ctx.fillStyle="#000000";
 
    // draw X axis ticks and labels
    var dateTickLen = 0;
    var hourText = ""
    var tickPosX = 0;
    var gridColor = "#000000";
    
    for (day in chartInfo) {
        // draw X axis ticks
        tickPosX = axisPadX + step + (day * step);
        lineStart = {x: tickPosX, y: (axisPadY + axisY)};
        lineEnd = {x: tickPosX, y: (axisPadY + axisY)- tickX};        
        drawLine(ctx, lineStart, lineEnd, 1, "#000000");
        
        // check if noon/midnight then draw label tick, label, and gridLine
        if ((chartInfo[day].date.getHours() == '00') || (chartInfo[day].date.getHours() == '12'))  {
            
            // set appropriate values for noon or midnight
            if (chartInfo[day].date.getHours() == '00') {
                hourText = "Midnight";
                dateTickLen = 5;
                labelNoonOffset = 0;
                gridColor = "#8888BB";
            }
            else {
                hourText = "Noon";
                dateTickLen = 11;
                labelNoonOffset = 7;
                gridColor = "#88BB88";
            }

            // draw label tick
            lineStart = {x: tickPosX, y: (axisPadY + axisY) - tickX - 3};
            lineEnd = {x: tickPosX, y: (axisPadY + axisY) + dateTickLen};        
            drawLine(ctx, lineStart, lineEnd, 2, gridColor);
 
            // draw label
            label = (chartInfo[day].date.getMonth() + 1) + "/" + chartInfo[day].date.getDate(); 
            ctx.fillText(label, tickPosX, (axisPadY + axisY) + labelDateX + labelNoonOffset);
            ctx.fillText(hourText, tickPosX, (axisPadY + axisY)
                             + labelDateX + labelHourOffset + labelNoonOffset);
            ctx.stroke();
            
            // draw gridline for each tick
            drawGridline(ctx, (tickPosX), (axisPadY + axisY), axisY, 2, 12, 2, gridColor, 1);            
        }
    }
}

var drawVertAxis = function drawVertAxis(ctx, posX, posY, axisX,
                            axisY, dataProp, color, unit, minProp, maxProp, step) {
    // use data in property weather.[dataProp] to determine number of ticks
    // start at xPos,yPos draw up from there
    // add appropriate tick marks
    // on context ctx with color "color"
    
    // draw Y axis
    var lineStart = {x:posX, y:posY};
    var lineEnd = {x:posX, y:posY - axisY};
    drawLine(ctx, lineStart, lineEnd, 2, color);
    
    
    var labelList = [];
    for (dataCnt = 0; dataCnt <= Math.ceil(maxProp - minProp); dataCnt++) {
        labelList[dataCnt] = parseInt(minProp) + dataCnt;
    }
    
    var tickPosY = 0;
    var tickY = 6;
    var labelOffsetLeft = 15;
    ctx.font="11px Arial";
    ctx.textBaseline="middle";
    ctx.fillStyle=color;
    for (var inc in labelList) {
        tickPosY = posY - step - (inc * step);
        ctx.font="11px Arial";
 
        if ( (labelList[inc] % 10 == 0) || (labelList[inc] % 5 == 0) ) {
            drawGridline(ctx, tickPosY, posX, axisX, 3, 7, 1, color, 0);            
            ctx.font="14px Arial";
        }

        // if too many labels, only show even ones
        if ( (labelList.length < 20) || (inc % 2 != 0) ) {
            // draw Y axis tick
            lineStart = {x:posX, y:tickPosY};
            lineEnd = {x:posX + tickY, y:tickPosY};
            drawLine(ctx, lineStart, lineEnd, 2, color);
            // draw Y axis label
            ctx.beginPath();
            ctx.fillText(labelList[inc] + unit, posX - labelOffsetLeft, tickPosY);  
            ctx.stroke();
        }
    }
    lineStart = {x: posX - 1, y: posY - axisY}; // -1 to cover width of vertical axis
    lineEnd = {x: posX + axisX + 1, y: posY - axisY}; // +1 to cover width of vertical axis
    drawLine(ctx, lineStart, lineEnd, 1, color);
}
