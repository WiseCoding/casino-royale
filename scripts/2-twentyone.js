

(() => {
    //Deck of cards
    var theDeck = [];
    var logs = false;
    var deck = {
        stick: ["hearts", "spades", "spikes", "diamond"],
        icon: ["♥", "♠", "♣", "♦"],
        figure: ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"],
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

    };

    //Generate some random option for machine
    generator = (min, max) => {
        let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return rndNumber;
    }

    // Building Object methods --deck--
    //Creating the Deck
    deck.getDeck = (theDeck) => {

        for (var i = 0; i < deck.card.length; i++) {
            for (var j = 0; j < deck.figure.length; j++) {
                theDeck[theDeck.length] = { stick: deck.stick[i], icon: deck.icon[i], figure: deck.figure[j], value: deck.value[j] }
            }
        }
    }
    //Picking randomly a Card 
    deck.randomCard = (theDeck) => {
        var randomCard = generator(51, 0);
        return theDeck[randomCard];
    }
    deck.getCard = (theDeck, id) => {
        return theDeck[id];

    }
    //End Object deck
    //dealer -object
    objDealer.hand = [];
    objCrupier.bust = false;

    // - mixer : unsort cards
    objDealer.mixer = function (theDeck) {
        var min = 0;
        var max = theDeck.length;
        var tmpCard = [];
        // Mixing 300 times   
        for (var i = 0; i < 300; i++) {
            var n1card = generator(min, max);
            var n2card = generator(min, max);
            // changing cards
            tmpCard[0] = theDeck[n1card];
            theDeck[n1card] = theDeck[n2card];
            theDeck[n2card] = theDeck[0];
        };
        return theDeck;
    };  // End- mixer : unsort cards
    //    - ThrowCard - Deliver a card and remove it from the deck 
    objDealer.throwCards = function (theDeck) {
        var min = 0;
        var max = theDeck.length;
        var card = {};

        if (theDeck.length > 0) {
            var n1Card = generator(min, max);
            card = theDeck[n1Card];
            // Removing the card throwed
            theDeck.splice(n1Card, 1);
            if (logs) {
                console.log("(Mixin) Card Throwed: " + card.stick + card.figure + theDcardeck.value);
            };
        }
        else {
            console.log("Deck empty, Start propertly the game");
        };
        return (card);
    };  //    End- ThrowCard - Deliver a card and remove it from the deck 

    //    - valorar: devuelve el valor de la mano (cartas del jugador).
    objDealer.value = function (hand, isA) {
        return hand.reduce((tot, oneCard) => {
            if (isA == 1 && oneCard.value == 1) { return tot + 11 } else { return tot + oneCard.value; }
        }, 0)
    };  // end function


    //end dealer object

    //Execution Secuence
    theDeck = getDeck();
    console.table(theDeck);
    console.log(randomCard());

})();




