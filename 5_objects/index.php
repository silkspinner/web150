<!DOCTYPE html>
<html>
    <!-- WEB150 WN17 Week 5 Assignment*/ -->
    <!-- 02/02/2017 Ron Nims -->
    <!-- Robot Dealer - BlackJack -->
    <head>
        <link rel="stylesheet" href="RoboDeal.css" />
        <script src="RoboDeal.js"></script>    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    </head>
    <body>
        <h2>WEB150 Week 5</h2>
    
        <h3 id="nameField"></h3>
    
        <h3>
            <script> 
                var firstName = "Ron";
                var lastName = "Nims";
                var thisDate = new Date();
                document.getElementById("nameField").innerHTML = 'Name: ' + firstName + ' ' + lastName + ' - Date: ' + thisDate.toDateString();
            </script>
        </h3>
        <h3>Assignment: Robot Dealer - BlackJack</h3>
        <br>
        <h2 id="dealerSays">Hello, Poker or Blackjack?</h2>
        <section id="hand">
            <div class="card" id="card0"><p></p></div>
            <div class="card" id="card1"><p></p></div>
            <div class="card" id="card2"><p></p></div>
            <div class="card" id="card3"><p></p></div>
            <div class="card" id="card4"><p></p></div>
        </section>
        <div>
            <button onclick="dealCardsPoker(dealerDeck)">Deal Poker</button>
            <button onclick="dealCardsBlackjack(dealerDeck)">Deal Blackjack</button>
            <button onclick="shuffleDeck(dealerDeck)">Shuffle</button>
        </div>
    
    </body>
</html> 