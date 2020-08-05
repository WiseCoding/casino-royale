

(() => {
    //     //Deck of cards
    //     var theDeck = [];
    //     var logs = false;
    //     var deck = {
    //         stick: ["hearts", "spades", "spikes", "diamond"],
    //         icon: ["♥", "♠", "♣", "♦"],
    //         figure: ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"],
    //         value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

    //     };

    //     //Generate some random option for machine
    //     generator = (min, max) => {
    //         let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    //         return rndNumber;
    //     }

    //     // Building Object methods --deck--
    //     //Creating the Deck
    //     deck.getDeck = (theDeck) => {

    //         for (var i = 0; i < deck.stick.length; i++) {
    //             for (var j = 0; j < deck.figure.length; j++) {
    //                 theDeck[theDeck.length] = { stick: deck.stick[i], icon: deck.icon[i], figure: deck.figure[j], value: deck.value[j] }
    //             }
    //         }
    //         return theDeck;
    //     }
    //     //Picking randomly a Card 
    //     deck.randomCard = (theDeck) => {
    //         var randomCard = generator(51, 0);
    //         return theDeck[randomCard];
    //     }
    //     deck.getCard = (theDeck, id) => {
    //         return theDeck[id];

    //     }
    //     deck.view = (viewCard) => {

    //         console.log("Carta: " + viewCard.stick + viewCard.figure + "; Valor: " + viewCard.value + " .");
    //     }
    //End Object deck
    //dealer -object
    // var objDealer = {};
    // objDealer.hand = [];
    // objDealer.bust = false;

    // // - mixer : unsort cards
    // objDealer.mixer = function (theInnerDeck) {
    //     var min = 0;
    //     var max = theInnerDeck.length - 1;
    //     var tmpCard = [];
    //     // Mixing 300 times  
    //     console.table(theInnerDeck)
    //     for (var i = 0; i < 100; i++) {
    //         var n1card = generator(min, max);
    //         var n2card = generator(min, max);
    //         console.log(`n1Card ${n1card} n2Card ${n2card}`)
    //         // changing cards
    //         tmpCard[0] = theInnerDeck[n1card];
    //         theInnerDeck[n1card] = theInnerDeck[n2card];
    //         theInnerDeck[n2card] = theInnerDeck[0];
    //     };
    //     console.table(theInnerDeck)
    //     return theInnerDeck;
    // };  // End- mixer : unsort cards
    //    - ThrowCard - Deliver a card and remove it from the deck 
    // objDealer.throwCards = function (theDeck) {
    //     var min = 0;
    //     var max = theDeck.length - 1;
    //     var card = {};

    //     if (theDeck.length > 0) {
    //         var n1Card = generator(min, max);
    //         card = theDeck[n1Card];
    //         // Removing the card throwed
    //         theDeck.splice(n1Card, 1);
    //         if (logs) {
    //             console.log("(Mixin) Card Throwed: " + card.stick + card.figure + theDcardeck.value);
    //         };
    //     }
    //     else {
    //         console.log("Deck empty, Start propertly the game");
    //     };
    //     return (card);
    // };  //    End- ThrowCard - Deliver a card and remove it from the deck 

    // //    - valorar: devuelve el valor de la mano (cartas del jugador).
    // objDealer.value = function (hand, isA) {
    //     return hand.reduce((tot, oneCard) => {
    //         if (isA == 1 && oneCard.value == 1) { return tot + 11 } else { return tot + oneCard.value; }
    //     }, 0)
    // };  // end function
    //    - evaluar: determina si según la mano, se ssigue jugando o se planta.
    // objDealer.evaluate = function (handPlayed) {

    //     var risk = 0;
    //     var risk1 = 0;
    //     // var posneg = true;
    //     var handValue = 0;
    //     var handValueA = 0;
    //     var swplantar = true;

    //     // Obtenemos el valor de la manoa jugada.
    //     handValue = this.value(handPlayed, 0);
    //     handValueA = this.value(handPlayed, 1);
    //     if (logs) {
    //         console.log("ValorMano: " + valormano + ".");
    //         console.log("ValorManoAs: " + valormanoas + ".");
    //     };

    //     // Añadimos "cierto" grado de riesgo para plantarnos.
    //     risk = 21 - handValue;
    //     risk1 = 21 - handValueA;
    //     if (logs) {
    //         console.log("Riesgo: " + riesgo + ".");
    //         console.log("Riesgo1: " + riesgo1 + ".");
    //     };

    //     // Si ha obtenido 21 exactos, nos plantamos.
    //     if (risk == 0 || risk1 == 0) {
    //         swplantar = true;
    //     }
    //     else {
    //         // Si nos pasamos ( 21 - 23 = -2:  "< 0")
    //         if (risk < 0 || risk1 < 0) {
    //             swplantar = true;
    //         }
    //         else {
    //             // Si nos aproximamos a 21 en hasta cinco unidades, nos plantamos.
    //             if ((risk > 0 && risk <= 5) || (risk1 > 0 && risk1 <= 5)) {
    //                 swplantar = true;
    //             }
    //             else {
    //                 swplantar = false;
    //             };
    //         };
    //     };
    //     if (logs) {
    //         console.log("SwPlantar: " + swplantar + ".");
    //     };

    //     return swplantar;
    // };  // fin function
    //end dealer object
    // Definimos el objeto "objJugador", con tres funciones:
    // Solo con dos variables:
    //    - mano (array): contendrá las cartas que vaya recogiendo en cada mano.
    //    - planta (booleano): determinará si el jugador sigue pidiendo cartas o se planta.
    // var objPlayer = {};
    // objPlayer.hand = [];
    // objPlayer.bust = false;
    // ------------------------------------------------------------- FIN objJugador -------//

    //--------------------------------------------------------------------------------------PRINCIPAL
    // Función Principal.
    function blackjack() {

        // Creamos los objetos necesarios en base a los ya creados.
        var miBaraja = deck;
        var miCrupier = objDealer;
        var miJugador = objPlayer;

        var totJugador = 0;
        var totCrupier = 0;
        var totJugadorAs = 0;
        var totCrupierAs = 0;

        // Comenzamos la partida.
        theDeck = miBaraja.getDeck(theDeck);
        //miBaraja.visualizar(cartas);
        theDeck = miCrupier.mixer(theDeck);
        //miBaraja.visualizar(cartas);

        // Incializamos las variables principales.
        miCrupier.hand = [];
        miCrupier.bust = false;
        miJugador.hand = [];
        miJugador.bust = false;



        // Empezamos lo bueno...
        //  - se reparten las cartas: dos a cada jugador.
        for (var i = 0; i < 2; i++) {
            // jugador...
            miJugador.hand[miJugador.hand.length] = miCrupier.throwCards(theDeck);
            // console.log("Len Jugador mano" + miJugador.hand.length)

            // console.log("Carta al jugador victor" + miJugador.hand.figure);
            // Crupier...
            miCrupier.hand[miCrupier.hand.length] = miCrupier.throwCards(theDeck);
            console.log("Carta al Deale victor" + miCrupier.hand.figure);
        };

        // Bucle principal donde se seguiran repartiendo cartas hasta que ambos jugadores se planten..

        // Empezamos por el Jugador.
        var swplanto = false;
        var icontaseguridad = 0;

        while (!swplanto) {
            // Valoramos la mano jugada de cada jugador.
            miJugador.bust = miCrupier.evaluate(miJugador.hand);
            swplanto = miJugador.bust;
            // No se planta, sacamos otra carta.
            if (!swplanto) {
                miJugador.hand[miJugador.hand.length] = miCrupier.throwCards(theDeck);
            };
        };  // fin While

        // Seguimos con el Crupier.
        var swplanto = false;
        var icontaseguridad = 0;

        while (!swplanto) {
            // Valoramos la mano jugada del Crupier.
            miCrupier.bust = miCrupier.evaluate(miCrupier.hand);
            swplanto = miCrupier.bust;
            // No se planta, sacamos otra carta.
            if (!swplanto) {
                miCrupier.hand[miCrupier.hand.length] = miCrupier.throwCards(theDeck);
            };
        };  // fin While

        // Cartas y Valor de las cartas del Crupier.
        console.log("Cartas obtenidas por el Crupier:");
        for (var i = 0; i < miCrupier.hand.length; i++) {
            deck.view(miCrupier.hand[i]);
        };
        totCrupier = miCrupier.value(miCrupier.hand, 0);
        totCrupierAs = miCrupier.value(miCrupier.hand, 1);
        console.log("Valor  por el Crupier:");
        console.log(" (normal)  ---> " + totCrupier + ".");
        console.log(" ('suave') ---> " + totCrupierAs + ".");

        // Cartas y Valor de las cartas del Jugador.
        console.log("Cartas obtenidas por el Jugador:");
        for (var i = 0; i < miJugador.hand.length; i++) {
            deck.view(miJugador.hand[i]);
        };
        totJugador = miCrupier.value(miJugador.hand, 0);
        totJugadorAs = miCrupier.value(miJugador.hand);
        console.log("Valor  por el Jugador:");
        console.log(" (normal)  ---> " + totJugador + ".");
        console.log(" ('suave') ---> " + totJugadorAs + ".");

        // Y gana....
        var strGanador = "";
        var ganajug = false;
        var ganacru = false;


        // Con el siguiente bloque determino si no se han pasado en la mano
        // ambos jugadores, ya sea con la valoración normal o "suave" (AS con valor 11).

        // Si el jugador no se pasa, por ahora puede ganar.
        if (totJugador <= 21) {
            ganajug = true;
        }
        else {
            // Comprobamos si con el "sueve" no se pasa.
            if (totJugadorAs <= 21) {
                ganajug = true;
            };
        };

        // Si el crupier no se pasa, por ahora puede ganar.
        if (totCrupier <= 21) {
            ganacru = true;
        }
        else {
            // Comprobamos si con el "sueve" no se pasa.
            if (totCrupierAs <= 21) {
                ganacru = true;
            };
        };


        // Si ambos jugadores pueden ganar, hay que comprobar los valores de sus cartas,
        // tanto valoradas en modo normal como en "suave" (AS con valor 11).
        if (ganajug && ganacru) {
            // Ambos son posibles ganadores, lo determinar el valor de la mano.
            if ((totJugador >= totCrupier || totJugadorAs >= totCrupierAS)
                && (totCrupier != 21 && totCrupierAs != 21)) {
                strGanador = "Jugador ( [" + totJugador + "/" + totJugadorAs +
                    "] ) mayor/igual que Crupier ( [" + totCrupier + "/" + totCrupierAs + "] )";
            }
            else {
                strGanador = "Crupier ( [" + totCrupier + "/" + totCrupierAs +
                    "] ) mayor/igual que Jugador ( [" + totJugador + "/" + totJugadorAs + "] )";
            };
        }
        else {
            if (ganajug == ganacru) {
                // Ambos han perdido.
                strGanador = "Ambos Pierden.";
            }
            else {
                if (ganajug) {
                    strGanador = "Jugador";
                }
                else {
                    strGanador = "Crupier";
                };
            };
        };

        console.log(miJugador.hand, miCrupier.hand, strGanador);

        console.log("El Ganador de la partida de Blackjack es:" + strGanador + ".");
        console.log("\n\nIntroduzca de nuevo la orden 'blackjack()' para una nueva partida.");

    };  // fin function Principal


    // Llamada la programa principa.
    blackjack();

    //---------------------------------------------------------------------//
    //------------------------------------------------------------------------------------- PRINCIPAL    


    // //Execution Secuence
    // theDeck = getDeck();
    // console.table(theDeck);
    // console.log(randomCard());

})();




