<!DOCTYPE html>
<html>
    <!-- WEB150 WN17 Week 9 Assignment*/ -->
    <!-- 02/11/2017 Ron Nims -->
    <!-- Assignment - Sunny with chance of awesome-->
    <head>
        <link rel="stylesheet" href="forecast.css" />
        <script src="forecast.js"></script>    
        <script src="underscore.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Bubblegum+Sans" rel="stylesheet">
    </head>
    <body>
        <h2>WEB150 Week 9</h2>
        <h3>Assignment:  Sunny with chance of awesome</h3>    
        <h3 id="nameField"></h3>
    
        <h3>
            <script> 
                var thisDate = new Date();
                document.getElementById("nameField").innerHTML = 'Name: Ron Nims - Date: ' + thisDate.toDateString();
            </script>
        </h3>
        <hr>
        <div id="getCity">
            <p>Enter US City: <input type="text" id="city" value="Seattle"></p>
            <button>Get Forecast</button>
        </div>
        
         <table id="current">
            <thead>
                <tr><th id="cw-title" colspan="4"></th></tr>
           </thead>
            <tbody>
                <tr id="cw-main"></tr>
                <tr id="cw-last"></tr>
            </tbody>
        </table>
       
        <table id="fiveDay">
            <thead>
                <tr><th id="fd-title" colspan="5"></th></tr>
           </thead>
            <tbody>
                <tr id="fd-date"></tr>
                <tr id="fd-icon"></tr>
                <tr id="fd-desc"></tr>
                <tr id="fd-hightemp"></tr>
                <tr id="fd-lowtemp"></tr>
                <tr id="fd-humidity"></tr>
                <tr id="fd-pressure"></tr>
                <tr id="fd-winds"></tr>
            </tbody>
        </table>

    <script type="text/JavaScript" >

    </script>
        
    <script>
        $(document).ready(function(){
            $("button").click(function(){
                if ($("#city").val().length > 0) {
                    if (/^[a-zA-Z]+$/.test($("#city").val())) {
                        buildCurrent($("#city").val());
                        buildForecast($("#city").val());
                    }
                    else {
                        alert("Enter a proper US city name to get weather information.");
                    }
                } 
                else {
                    alert("Enter a US city name to get weather information.");
                }
            });
        });
        
    </script>

</html> 