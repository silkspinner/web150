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
        <script>
            var shuffleDeck = function shuffleDeck(deck) {
                deck  = new Deck;
                var cardId = "";
                document.getElementById("dealerSays").innerHTML = "Poker or Blackjack?";
                for ( var i = 0; i < 5; i++) {
                    cardId = "card" + i;
                    document.getElementById(cardId).style.backgroundImage = 'url("cardback.png")';
                    document.getElementById(cardId).innerHTML = "";
                }
            }
                
            var dealCardsPoker = function dealCardsPoker(deck) {
                hand = [];
                for ( var i = 0; i < 5; i++) {
                    hand.push(deck.deal());
                    }
                showCards(hand);
                document.getElementById("dealerSays").innerHTML = "Your Poker hand!";
            }
                
            var dealCardsBlackjack = function dealCardsBlackjack(deck) {
                hand = [];
                handValue = 0;
                for ( var i = 0; i < 3; i++) {
                    hand.push(deck.deal());
                    handValue += hand[i].value;
                    }

                document.getElementById("card3").innerHTML = "";
                if (handValue > 21) {
                    document.getElementById("card3").style.backgroundImage = 'url("cardback_bust.png")';                    
                } else {
                    document.getElementById("card3").style.backgroundImage = 'url("cardback_win.png")';                       
                }
                document.getElementById("card4").innerHTML = "<p>" + handValue.toString() + "</p>";
                document.getElementById("card4").style.backgroundImage = 'url("cardback_value.png")';
                showCards(hand);
            }

        </script>
    
    </body>
</html> 