(() => {
  //The Deck represent the deck of all cards, could be modified when the cards are dispatched
  var theDeck = [];
  var gambleCredits = 0;

  // AUDIO
  const audioShuffle = new Audio('../audio/shuffle.mp3');
  const audioWhoop = new Audio('../audio/whoop.mp3');
  const audioBump = new Audio('../audio/bump.mp3');

  //SET USERNAME
  let userName = localStorage.getItem('username');
  document.querySelector('#playerName').textContent = userName.toLocaleUpperCase();

  //Generate some random options
  generator = (min, max) => {
    let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
  };

  //******** Creating the object Card, that will be contain  the deck********
  //object:card
  var card = {
    stick: ['heart', 'spade', 'club', 'diamond'],
    icon: ['♥', '♠', '♣', '♦'],
    figure: ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'],
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
  };

  //card -object -Method : getDeck -- Creating the Deck
  card.getDeck = (theDeck) => {
    for (var i = 0; i < card.stick.length; i++) {
      for (var j = 0; j < card.figure.length; j++) {
        theDeck[theDeck.length] = {
          stick: card.stick[i],
          icon: card.icon[i],
          figure: card.figure[j],
          value: card.value[j],
          pic: `../images/2-twentyone/${card.stick[i]}_${card.figure[j]}.svg`,
        };
      }
    }
  };

  //card -object -Method : view -- returns the card info
  card.paintCard = (viewCard, nodeFather, cardCover) => {
    let node = document.getElementById(nodeFather);
    let imgCard = document.createElement('img');

    //setting the card
    if (cardCover == 1) {
      imgCard.src = '../images/2-twentyone/cardCover.jpg';
    } else {
      imgCard.src = viewCard.pic;
    }
    imgCard.id = `${viewCard.stick}_${viewCard.figure}`;
    imgCard.style.width = '170px';
    imgCard.style.height = '200px';
    imgCard.style.padding = '5px';
    imgCard.style.display = 'inline-block';
    //Append Card
    node.appendChild(imgCard);
  };
  //END object:card
  //object:player
  var player = {
    hand: [],
    holdOn: false,
    points: 0,
    pointsA: 0,
    winner: false,
  };

  player.winnerSound = (option) => {
    switch (option) {
      case 1:
        //Win sound
        var audio = new Audio('../audio/win.mp3');
        break;

      case 2:
        //Lose Sound
        var audio = new Audio('../audio/dead.mp3');
        break;
      case 3:
        //BlackJack
        var audio = new Audio('../audio/win.mp3');
        break;
    }
    audio.play();
  };

  //Function AddCredits
  player.addCredits = (newCredits) => {
    const oldCredits = localStorage.getItem('credits');
    localStorage.setItem('credits', Number(oldCredits) + newCredits);
    document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
    if (newCredits > 0) {
      player.winnerSound(1); //winner
    } else {
      player.winnerSound(2); //lost
    }
  };

  //object:player

  //******** Creating the object house, that will be contain  the role of the house********
  //object:house

  var house = {
    hand: [],
    holdOn: false,
    points: 0,
    pointsA: 0,
    winner: false,
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
    }
  }; // End- mixer : unsort cards

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
    } else {
      console.log('Deck empty, Start propertly the game');
    }
    return card;
  }; // End- throwCard -- deliver to player or house cards for the game

  //house -object -Method : handValue -- calculate the points of the hand
  house.handValue = (hand, isA) => {
    return hand.reduce((tot, oneCard) => {
      if (isA == 1 && oneCard.value == 1) {
        return tot + 11;
      } else {
        return tot + oneCard.value;
      }
    }, 0);
  }; // End handValue -- calculate the points of the hand

  //house -object -Method : hold -- Evaluate according the risk , if the player(Machine) must to hold
  house.hold = (handPlayed) => {
    var risk = 0;
    var riskA = 0;
    var holdOn = false;

    // Add risk for make a decision
    risk = 21 - house.handValue(handPlayed, 0);
    riskA = 21 - house.handValue(handPlayed, 1);

    // if the hand has exactly 21, or more than 21. -- and evaluating the risk
    if (risk <= 0 || riskA <= 0 || (risk > 0 && risk <= 5) || (riskA > 0 && riskA <= 5)) {
      holdOn = true;
    }
    return holdOn;
  }; // End hold -- Evaluate acording the risk , if the player(Machine) must to hold

  house.houseGetNewCard = () => {
    //evaluating if the house require another card in base to de risk
    let houseHoldOn = false;

    while (!houseHoldOn) {
      house.holdOn = house.hold(house.hand);
      houseHoldOn = house.holdOn;

      if (!houseHoldOn) {
        let indexNewCard = house.hand.length;
        house.hand[indexNewCard] = house.throwCard(theDeck);
        card.paintCard(house.hand[indexNewCard], 'cardsHouse', 0);
      }
    }
  };
  //house -object -Method : winner -- Evaluate the winner and add points to player
  house.getWinner = () => {
    //Getting the points
    player.points = house.handValue(player.hand, 0);
    house.points = house.handValue(house.hand, 0);

    player.pointsA = house.handValue(player.hand, 1);
    house.pointsA = house.handValue(house.hand, 1);

    //impresion prueba
    console.log('Player Hand');
    console.table(player.hand);

    console.log('House Hand');
    console.table(house.hand);

    console.log(`PLAYER: points=${player.points}; points As=${player.pointsA} `);
    console.log(`HOUSE: points=${house.points}; points As=${house.pointsA} `);
    //impresion prueba

    //first testing for player - is the player not over the 21 - could be win .. for now
    if (player.pointsA <= 21) {
      player.winner = true;
    } else {
      if (player.points <= 21) {
        player.winner = true;
      } else {
        player.winner = false;
      }
    }

    //first testing for house - is the house not over the 21 - could be win .. for now
    if (house.pointsA <= 21) {
      house.winner = true;
    } else {
      if (house.points <= 21) {
        house.winner = true;
      } else {
        house.winner = false;
      }
    }

    if (player.winner && house.winner) {
      //Both are possible winners,so let's counting the points
      if (
        (player.points >= house.points || player.pointsA >= house.pointsA) &&
        house.points != 21 &&
        house.pointsA != 21
      ) {
        if (player.points == house.points || player.pointsA == house.pointsA) {
          //dawn
          console.log('Draw #0');
          document.getElementById('result').innerHTML = `<strong>It's a draw.</strong>`;
        } else {
          //player wins
          player.winner = true;
          house.winner = false;

          console.log('Player Wins #1');
          document.getElementById(
            'result'
          ).innerHTML = `You win: <strong>+${gambleCredits}</strong> Credits`;
          //Credits
          player.addCredits(gambleCredits);
        }
      } else {
        //house wins
        house.winner = true;
        player.winner = false;
        document.getElementById(
          'result'
        ).innerHTML = `You lose: <strong>-${gambleCredits}</strong> Credits`;
        //credits
        player.addCredits(-gambleCredits);

        console.log('House Wins #2');
      }
    } else {
      if (player.winner == house.winner) {
        //both loose
        player.winner = false;
        house.player = false;

        console.log('Both loose');
        document.getElementById(
          'result'
        ).innerHTML = `It's a draw: <strong>-${gambleCredits}</strong> Credits`;
        //credits
        player.addCredits(-gambleCredits);
      } else {
        if (player.winner) {
          house.winner = false;
          document.getElementById(
            'result'
          ).innerHTML = `You win: <strong>+${gambleCredits}</strong> Credits`;
          //credits
          player.addCredits(gambleCredits);
          console.log('Player Wins #3');
        } else {
          player.winner = false;
          console.log('House Wins #4');
          document.getElementById(
            'result'
          ).innerHTML = `You lose: <strong>-${gambleCredits}</strong> Credits`;

          //credits
          player.addCredits(-gambleCredits);
        }
      }
    }
  }; //END house -object -Method : winner -- Evaluate the winner and add points to player

  //End object:house

  //******** Creating the object player, that will be contain  info about the player********

  function twentyOne() {
    //Starting
    theDeck = [];
    card.getDeck(theDeck);
    house.mixer(theDeck);
    console.table(theDeck);

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

    //Painting the cards - Player
    player.hand.forEach((hand) => {
      card.paintCard(hand, 'cardsPlayer', 0);
    });

    //Painting the cards - House
    card.paintCard(house.hand[0], 'cardsHouse', 0);

    //Evaluate if  house or Player has BlackJack
    player.pointsA = house.handValue(player.hand, 1);
    house.pointsA = house.handValue(house.hand, 1);

    if (house.pointsA == 21 && player.pointsA == 21) {
      //BlackJack Dawn
      //painting the second card of house
      card.paintCard(house.hand[1], 'cardsHouse', 0);

      house.winner = true;
      player.winner = true;

      document.getElementById('result').innerHTML =
        '<strong>DAWN !! BlackJack</strong><br/> <strong>HOUSE</strong> wins, ' +
        ` you lost <strong>${gambleCredits}</strong> Credits`;
      //credits
      player.addCredits(-gambleCredits);
      console.log('DAWN #BLackJack');
      return; //end of the game
    } else {
      if (house.pointsA == 21) {
        //House BlackJack
        //painting the second card of house
        card.paintCard(house.hand[1], 'cardsHouse', 0);
        house.winner = true;
        document.getElementById('result').innerHTML =
          '<strong>BlackJack</strong><br/><strong>HOUSE</strong> Wins, ' +
          `You lost <strong>${gambleCredits}</strong> Credits`;
        //credits
        player.addCredits(-gambleCredits);
        console.log('HOUSE Wins #BLackJack');
        return; //end of the game
      } else if (player.pointsA == 21) {
        //Player BlackJack
        //painting the second card of house
        card.paintCard(house.hand[1], 'cardsHouse', 0);
        player.winner = true;
        document.getElementById('result').innerHTML =
          '<strong>BlackJack</strong><br/><strong>PLAYER</strong> Wins, ' +
          `You Earned <strong>${gambleCredits}</strong> Credits`;

        //credits
        player.addCredits(gambleCredits);
        console.log('PLAYER Wins #BLackJack');
        return; //End of the game
      }
    }

    //painting the second card of house
    card.paintCard(house.hand[1], 'cardsHouse', 1);

    console.log(`PLAYER: points=${player.points}; points As=${player.pointsA} `);
    console.log(`HOUSE: points=${house.points}; points As=${house.pointsA} `);
  }

  //Execution Sequence
  //buttons
  var btnGoPlay = document.getElementById('btnPlay');
  var btnNewCard = document.getElementById('newCard');
  var btnHoldOn = document.getElementById('holdOn');

  //Divs
  var cardsHouse = document.getElementById('cardsHouse');
  var cardsPlayer = document.getElementById('cardsPlayer');
  var optionsPlayer = document.getElementById('optionsPlayer');
  const houseDiv = document.querySelector('#house');
  const playerDiv = document.querySelector('#player');

  //result
  var targetResult = document.getElementById('result');

  //getting hide the buttons
  optionsPlayer.classList.add('hidden');

  btnGoPlay.onclick = () => {
    audioShuffle.play();

    //Hide button
    btnGoPlay.classList.add('hidden');
    //Show player & house
    houseDiv.classList.remove('hidden');
    playerDiv.classList.remove('hidden');

    //Cleaning the card Spaces
    cardsHouse.innerHTML = '';
    cardsPlayer.innerHTML = '';
    targetResult.innerHTML = '';
    //bet
    gambleCredits = 15;
    console.clear();

    // //Asking to player for how much wants to play
    // var bet = prompt("Hey (name) How much you want bet in this match?");
    // while (parseFloat(bet) <= 0.0 || bet == null || bet == "") {
    //     bet = prompt("Hey (name) How much you want bet in this match?");
    //     //Evaluate how much money, he has... points?
    // }
    // console.log(bet)

    twentyOne();

    if (house.winner || player.winner) {
      optionsPlayer.classList.add('hidden');
      btnGoPlay.classList.remove('hidden');
    } else {
      optionsPlayer.classList.remove('hidden');
    }
  };

  btnNewCard.onclick = () => {
    audioWhoop.play();
    let newCardIndex = player.hand.length;

    player.hand[newCardIndex] = house.throwCard(theDeck);
    card.paintCard(player.hand[newCardIndex], 'cardsPlayer', 0);

    if (house.handValue(player.hand, 0) >= 21) {
      //no more cards - Automatic Hold!
      optionsPlayer.classList.add('hidden');
      btnGoPlay.classList.remove('hidden');

      //Discover the second card of House
      document.getElementById(`${house.hand[1].stick}_${house.hand[1].figure}`).src =
        house.hand[1].pic;

      //Evaluate Winner
      house.getWinner();
    }
  };

  btnHoldOn.onclick = () => {
    audioBump.play();
    //Discover the second card of House
    document.getElementById(`${house.hand[1].stick}_${house.hand[1].figure}`).src =
      house.hand[1].pic;

    //Evaluate if house needs a newCard
    house.houseGetNewCard();

    //Evaluate Winner
    house.getWinner();

    optionsPlayer.classList.add('hidden');
    btnGoPlay.classList.remove('hidden');
  };
})();
