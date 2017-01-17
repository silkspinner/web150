<html>
    <!-- WEB150 WN17 Week 2 Assignment*/ -->
    <!-- 01/12/2017 Ron Nims -->
    <!-- Simple webpage to demonstrate Pig Latin translator -->

    <head>
        <link rel="stylesheet" href="piglatin.css" />
        <script src="piglatin.js"></script>
    </head>
    <body>
        <h1>WEB150 Week 2</h1>
        <div class="floatright">
            <img src="pig_dancing.gif" alt="Dancing Pig" title="Dancing Pig" />
        </div>

        <h3 id="dateField"></h3>

        <h3>
            <script> 
                var firstName = "Ron";
                var lastName = "Nims";
                var translatedText = "";
                var sentance = "";
                var thisDate = new Date();
                document.getElementById("dateField").innerHTML = 'Name: ' + firstName + ' ' + lastName + ' - Date: ' + thisDate.toDateString();
            </script>
        </h3>
        <h2>Pig Latin Translator</h2>
        <button onclick="reloadPage()">Click to enter new sentance</button>

        <h2>Original Sentance</h2>
        <div id="original">
        </div>
        <button onclick="translatePigLatin(sentance)">Click to translate sentance</button>

        <h2>Translated Sentance</h2>
        <div id="translation">
        </div>
        <script>
            getSentance("Enter sentance to translate");
            document.getElementById("original").innerHTML = sentance;
        </script>
    </body>
</html>
