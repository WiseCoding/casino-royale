

(() => {
    var deck = {
        card: ["hearts", "spades", "spikes", "diamond"],
        icon: ["♥", "♠", "♣", "♦"],
        figure: ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"],
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };

    //Generate some random option for machine
    function generator(min, max) {
        let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return rndNumber;
    }

    //Creating the Deck
    function getDeck() {

        let innerDeck = [];
        for (var i = 0; i < deck.card.length; i++) {
            for (var j = 0; j < deck.figure.length; j++) {
                innerDeck[innerDeck.length] = { card: deck.card[i], icon: deck.icon[i], figure: deck.figure[j], value: deck.value[j] }
            }
        }
        return innerDeck;
    }
    //Picking rendomly a Card 
    function randomCard() {
        var randomCard = generator(51, 0);
        return theDeck[randomCard];
    }


    //Execution Secuence
    theDeck = getDeck();
    console.table(theDeck);
    console.log(randomCard());

})();




