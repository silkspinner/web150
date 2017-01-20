<html>
    <!-- WEB150 WN17 Week 3 Assignment*/ -->
    <!-- 01/19/2017 Ron Nims -->
    <!-- Simple webpage display grades list and summary -->

    <head>
        <link rel="stylesheet" href="gradelist.css" />
        <script src="gradelist.js"></script>
    </head>
    <body>
        <h2>WEB150 Week 3</h2>

        <h3 id="nameField"></h3>

        <h3>
            <script> 
                var firstName = "Ron";
                var lastName = "Nims";
                var thisDate = new Date();
                document.getElementById("nameField").innerHTML = 'Name: ' + firstName + ' ' + lastName + ' - Date: ' + thisDate.toDateString();
            </script>
        </h3>
        <h3>Assignment: Students Grade List</h3>
        <p>Input Data String for this assignment shown here</p>
        <div class="input">jim|25, sue|32, mary|34, ann|22, ted|28, frank|15, lisa|19, mike|30, ahn|26, vishaya|27</div>
        <table id="gradeChart"></table>
        
        <script>
            listGrades();

            document.write('<h3>The lowest grade was ' + gradeMin + '</h3>');
            document.write('<h3>The highest grade was ' + gradeMax + '</h3>');
            document.write('<h3>The average grade was ' + gradeAverage + '</h3>');
        </script>
    </body>
</html>
