// WEB150 WN17 - Week 5, Robo Dealer - BlackJack
// 02/02/2017 Ron Nims
// Deal cards from a standard deck
// include Blackjack card values

var cardNames = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"];
var cardValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
var suitNames = ["Spades","Hearts","Diamonds","Clubs"];
var dealerDeck = new Deck;
var hand = [];

// Create Card Object
function Card(cardSuit, cardName, cardValue) {
    this.name = cardName;
    this.suit = cardSuit;
    this.value = cardValue;
}

// Create Deck Object
function Deck() {
    // returns a Deck of 52 unique Cards
    this.cards = [];

    for (var suit in suitNames) {
        for (var card in cardNames ) {
            this.cards.push(new Card(suitNames[suit], cardNames[card], cardValues[card]));   
        }
    }

    this.deal = function (){
        // pick random Card from Deck and return it
        var dealNumber = Math.floor(Math.random() * this.cards.length);
        var dealCard = this.cards[dealNumber]

        // splice the dealt Card from Deck
        this.cards.splice(dealNumber, 1)

        return dealCard;
    };
}

var showCards = function showCards(hand){
    // manipulate DOM objects to display cards in html
    var cardId, cardImage = "";
    for (var i in hand) {
        cardId = "card" + i;
        cardImage = 'url("cardback_' + hand[i].suit+ '.png")';
        document.getElementById(cardId).style.backgroundImage = cardImage;
        document.getElementById(cardId).innerHTML = "<p>" + hand[i].name + "</p>";
    }
} 


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

