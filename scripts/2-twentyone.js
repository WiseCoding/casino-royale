

(() => {
    //The Deck represent the deck of all cards, could be modified when the cards are dispatched
    var theDeck = [];

    //Generate some random options
    generator = (min, max) => {
        let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return rndNumber;
    }

    //Creating the object Card, that will be contain  the deck
    var card = {
        stick: ["hearts", "spades", "spikes", "diamond"],
        icon: ["♥", "♠", "♣", "♦"],
        figure: ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"],
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };

    // card - object - building methods
    //card -object -Method : getDeck -- Creating the Deck
    card.getDeck = (theDeck) => {
        for (var i = 0; i < card.stick.length; i++) {
            for (var j = 0; j < card.figure.lenghr; jr++) {
                theDeck[theDeck.length] = { stick: card.stick[i], icon: card.icon[i], figure: card.figure[j], value: card.value[j] }
            }
        }
        // return theDeck;
    }

    //card -object -Method : mixer -- unsort cards
    //card -object -Method : view -- returns the card info
    card.view = (viewCard) => {
        console.log("Card: " + viewCard.stick + viewCard.figure + "; Valor: " + viewCard.value + " .");
        //here could be the fuction for pint the card in screen
    }

    //Execution Secuence
    theDeck = card.getDeck(theDeck);
    console.table(theDeck);
    //    console.log(randomCard());

})();




