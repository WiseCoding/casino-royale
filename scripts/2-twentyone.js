

(() => {
    //The Deck represent the deck of all cards, could be modified when the cards are dispatched
    var theDeck = [];

    //Generate some random options
    generator = (min, max) => {
        let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return rndNumber;
    }

    //******** Creating the object Card, that will be contain  the deck********
    //object:card
    var card = {
        stick: ["heart", "spade", "club", "diamond"],
        icon: ["♥", "♠", "♣", "♦"],
        figure: ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"],
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };

    //card -object -Method : getDeck -- Creating the Deck
    card.getDeck = (theDeck) => {
        for (var i = 0; i < card.stick.length; i++) {
            for (var j = 0; j < card.figure.length; j++) {
                theDeck[theDeck.length] = { stick: card.stick[i], icon: card.icon[i], figure: card.figure[j], value: card.value[j], pic: `../images/2-twentyone/${card.stick[i]}_${card.figure[j]}.svg` }
            }
        }
    }

    //card -object -Method : view -- returns the card info
    card.paintCard = (viewCard, nodeFather, cardCover) => {
        let node = document.getElementById(nodeFather);
        let imgCard = document.createElement("img");

        //setting the card
        if (cardCover == 1) { imgCard.src = "../images/2-twentyone/cardCover.jpg" } else { imgCard.src = viewCard.pic }
        imgCard.style.padding = "5px";
        imgCard.style.display = "block"
        //Append Card
        node.appendChild(imgCard)
    }
    //END object:card

    //******** Creating the object house, that will be contain  the role of the house********
    //object:house

    var house = {
        hand: [],
        holdOn: false,
        points: 0,
        pointsA: 0,
        winner: false
    };


    //house -object -Method : mixer -- unsort the deck

    house.mixer = (theDeck) => {
        var min = 0;
        var max = theDeck.length - 1;
        var tmpCard = {};
        // Mixing 200 times  
        for (var i = 0; i < 200; i++) {
            var n1card = generator(min, max);
            var n2card = generator(min, max);
            // changing cards
            tmpCard = theDeck[n1card];
            theDeck[n1card] = theDeck[n2card];
            theDeck[n2card] = tmpCard;
        };
    };  // End- mixer : unsort cards

    //house -object -Method : throwCard -- deliver to player or house cards for the game
    house.throwCard = (theDeck) => {
        var min = 0;
        var max = theDeck.length - 1;
        var card = {};

        if (theDeck.length > 0) {
            var indexCard = generator(min, max);
            card = theDeck[indexCard];
            // Removing the card throwed
            theDeck.splice(indexCard, 1);
        }
        else { console.log("Deck empty, Start propertly the game") };
        return (card);
    }; // End- throwCard -- deliver to player or house cards for the game

    //house -object -Method : handValue -- calculate the points of the hand 
    house.handValue = (hand, isA) => {
        return hand.reduce((tot, oneCard) => {
            if (isA == 1 && oneCard.value == 1) { return tot + 11 } else { return tot + oneCard.value; }
        }, 0)
    };  // End handValue -- calculate the points of the hand 

    //house -object -Method : hold -- Evaluate acording the risk , if the player(Machine) must to hold
    house.hold = (handPlayed) => {
        var risk = 0;
        var risk1 = 0;
        var handValue = 0;
        var handValueA = 0;
        var holdOn = true;

        // Add risk for make a decision 
        risk = 21 - house.handValue(handPlayed, 0);
        riskA = 21 - house.handValue(handPlayed, 1);

        // if the hand has exactly 21, or more than 21. -- and evalauting the risk
        if ((risk <= 0 || riskA <= 0) || ((risk > 0 && risk <= 5) || (riskA > 0 && riskA <= 5))) { holdOn = true; }
        return holdOn;
    };// End hold -- Evaluate acording the risk , if the player(Machine) must to hold
    //End object:house

    //******** Creating the object player, that will be contain  info about the player********
    //object:player
    var player = {
        hand: [],
        holdOn: false,
        points: 0,
        pointsA: 0,
        winner: false
    };

    //object:player

    function twentyOne() {

        //Starting
        card.getDeck(theDeck);
        house.mixer(theDeck);


        house.hand = [];
        house.holdOn = false;
        house.points = 0;
        house.pointsA = 0;
        house.winner = false;

        player.hand = [];
        player.holdOn = false;
        player.points = 0;
        player.pointsA = 0;
        player.winner = false;


        //Throwing the carts
        for (i = 1; i <= 2; i++) {
            player.hand[player.hand.length] = house.throwCard(theDeck);
            house.hand[house.hand.length] = house.throwCard(theDeck);
        }

        //evaluating if the house require another card in base to de risk
        let houseHoldOn = false
        while (!houseHoldOn) {
            house.holdOn = house.hold(house.hand);
            houseHoldOn = house.holdOn

            if (!houseHoldOn) {
                house.hand[house.hand.length] = house.throwCard(theDeck);
            }
        }

        //evaluating if the require require another card in base to de risk
        let playerHoldOn = false
        while (!playerHoldOn) {
            player.holdOn = house.hold(player.hand);
            playerHoldOn = player.holdOn

            if (!playerHoldOn) {
                player.hand[player.hand.length] = house.throwCard(theDeck);
            }
        }

        //Getting the points
        player.points = house.handValue(player.hand, 0);
        house.points = house.handValue(house.hand, 0);

        player.pointsA = house.handValue(player.hand, 1);
        house.pointsA = house.handValue(house.hand, 1);

        //impresion de prueba
        console.log("Player Hand")
        console.table(player.hand)

        player.hand.forEach(hand => {
            card.paintCard(hand, "cardsPlayer", 0);

        })

        house.hand.forEach(hand => {
            // card.paintCard(hand, "cardsHouse", 1);
            card.paintCard(hand, "cardsHouse", 0);

        })


        // console.table(`holdOn=${player.holdOn}; winner=${player.winner}`);

        console.log("House Hand")
        console.table(house.hand)
        // console.table(`holdOn=${house.holdOn}; winner=${house.winner}`);

        console.log(`PLAYER: points=${player.points}; points As=${player.pointsA} `)
        console.log(`HOUSE: points=${house.points}; points As=${house.pointsA} `)
        console.log(`PLAYER: winner=${player.winner}; HOUSE winne=${house.winner}`)
        //impresion prueba

        //Selecting the winner
        //first testing for player - is the player not over the 21 - could be win .. for now
        if (player.points <= 21) { player.winner = true } else { if (player.pointsA <= 21) { player.winner = true } }

        //first testing for house - is the house not over the 21 - could be win .. for now
        if (house.points <= 21) { house.winner = true } else { if (house.pointsA <= 21) { house.winner = true } }
        // console.log("Primera Evaluacion")
        // console.log(`PLAYER: points=${player.points}; points As=${player.pointsA} `)
        // console.log(`HOUSE: points=${house.points}; points As=${house.pointsA} `)
        // console.log(`PLAYER: winner=${player.winner}; HOUSE winne=${house.winner}`)

        if (player.winner && house.winner) {
            //Both are posisble winners,so let's counting the points
            if ((player.points >= house.points || player.pointsA >= house.pointsA) && (house.points != 21 && house.pointsA != 21)) {
                //player wins
                player.winner = true;
                house.winner = false;

                console.log("Player Wins #1")
                document.getElementById("result").innerHTML = "<strong>PLAYER</strong> Win" + "You Earned <strong>100</strong> Credits"
                //sum the points 50

            } else {
                //house wins
                house.winner = true;
                player.winner = false;
                document.getElementById("result").innerHTML = "<strong>HOUSE</strong> Wins" + "You lost <strong>100</strong> Credits"
                console.log("House Wins #2")
            }
        } else {

            if (player.winner == house.winner) {
                //both loose
                player.winner = false
                house.player = false

                console.log("Both loose")
                document.getElementById("result").innerHTML = "<strong>BOTH</strong> Loose :(" + "You lost <strong>100</strong> Credits"
            }
            else {
                if (player.winner) {
                    house.winner = false;
                    document.getElementById("result").innerHTML = "<strong>PLAYER</strong> Win" + "You Earned <strong>100</strong> Credits"
                    console.log("Player Wins #3")

                } else {
                    player.winner = false;
                    console.log("House Wins #4")
                    document.getElementById("result").innerHTML = "<strong>HOUSE</strong> Wins" + "You lost <strong>100</strong> Credits"
                }

            }
        }


    }


    //Execution Secuence
    twentyOne();
    // theDeck = card.getDeck(theDeck);
    // card.getDeck(theDeck);
    // house.mixer(theDeck)
    // console.table(card.stick);
    // console.table(card.figure);
    // console.table(card.icon);
    // console.table(card.value);
    // console.table(theDeck);
    // console.table(house.throwCard(theDeck));

    //    console.log(randomCard());

})();




