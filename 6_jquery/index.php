<!DOCTYPE html>
<html>
    <!-- WEB150 WN17 Week 6 Assignment*/ -->
    <!-- 02/11/2017 Ron Nims -->
    <!-- Assignment - Potterific Hogwarts Directory-->
    <head>
        <link rel="stylesheet" href="hogwarts.css" />
        <script src="hogwarts.js"></script>    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Metal+Mania" rel="stylesheet">
    </head>
    <body>
        <h2>WEB150 Week 6</h2>
    
        <h3 id="nameField"></h3>
    
        <h3>
            <script> 
                var thisDate = new Date();
                document.getElementById("nameField").innerHTML = 'Name: Ron Nims - Date: ' + thisDate.toDateString();
            </script>
        </h3>
        <h3>Assignment: Potterific - Hogwarts Directory</h3>
        <br>
        <div id="hogwarts">
            <h2>Hogwart's Directory</h2>
            
            <div id="buttonRow">
            </div>
            
            <table id="directory">
            </table>
        </div>
    </body>
    <script>
        $(document).ready(function(){
            buildTable()
        });
    </script>
</html> 