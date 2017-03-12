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
        <h2>WEB150 Week 8</h2>
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
            <p>City: <input type="text" id="city" value="Seattle"></p>
            <button>Get Forcast</button>
        </div>
        
        <table id="fiveDay">
            <thead>
                <tr><th id="fd-title" colspan="5"></th></tr>
                <tr id="fd-date"></tr>
                <tr id="fd-icon"></tr>
                <tr id="fd-desc"></tr>
                <tr id="fd-hightemp"></tr>
                <tr id="fd-lowtemp"></tr>
                <tr id="fd-humidity"></tr>
                <tr id="fd-pressure"></tr>
                <tr id="fd-winds"></tr>
           </thead>
            <tbody>
            </tbody>
        </table>
    <div id="test"></div>


    <script type="text/JavaScript" >

    </script>
        
    <script>
        $(document).ready(function(){
            $("button").click(function(){

                buildForecast($("#city").val());

            });
        });
        
    </script>

</html> 