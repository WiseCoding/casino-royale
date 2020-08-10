(() => {
  // STARTING CARD NAMES
  const cardNames = [
    'bar',
    'bingo',
    'camera',
    'champagne',
    'chip',
    'cigar',
    'cocktail',
    'crown',
    'cues',
    'diamond',
    'dice',
    'gem',
    'glass',
    'gold',
    'grapes',
    'man',
    'police',
    'purse',
    'seven',
    'shoe',
    'shuffler',
    'slots',
    'strawberry',
    'tie',
    'vault',
    'woman',
  ];

  // GENERATE RELATIVE PATHS TO CARDS IN ARRAY
  const cards = [];
  for (let i = 0; i < cardNames.length; i++) {
    const path = `../images/3-memory/${cardNames[i]}.svg`;
    cards.push(path);
  }

  // AUDIO FILES
  const audioBump = new Audio('../audio/bump.mp3');
  const audioShuffle = new Audio('../audio/shuffle.mp3');
  const audioCardflip = new Audio('../audio/cardflip.mp3');
  const audioSuccess = new Audio('../audio/success.mp3');

  // ==================================== //
  // STARTING VARIABLES AND STARTING GRID //
  // ==================================== //
  // Starting Variables
  let difficulty = 'medium';
  let cardAmount = 16;
  let gameClicks = 0;
  let gameTime = 0;
  let gameTimer;
  let flipCheck = 1;
  let flipConfirm = 'go';
  let timing = 1000;
  let shuffled = genRandCards();
  let lastCard = [];
  let activeCards = [];

  generateGrid(cardAmount);
  let allCards = document.querySelectorAll('.memoryCards');
  allCards.forEach((thisCard) =>
    thisCard.addEventListener('click', () => {
      // When cards are no match, halt turning cards until they are turned again
      if (flipConfirm === 'halt' && flipCheck === 1) {
        flipCheck = 0;
      }

      // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
      if (flipCheck === 1 && flipConfirm === 'go' && !activeCards.includes(thisCard.id)) {
        audioCardflip.play();
        gameClicks++;
        // If first card is turned, start timer, stop timer when game is won
        if (gameClicks === 1) {
          payCredits(difficulty);
          gameTimer = setInterval(() => {
            gameTime++;
            document.querySelector('#seconds').textContent = gameTime;
            document.querySelector('#clicks').textContent = gameClicks;
          }, 1000);
        }
        activeCards.push(thisCard.id);
        lastCard = flipCards(timing, shuffled, thisCard, lastCard);
        gameCheck(cardAmount, activeCards, gameTime);
      }
    })
  );

  // ==== //
  // EASY //
  // ==== //
  document.querySelector('#easy').onclick = () => {
    audioShuffle.play();
    // RESET TIMER
    clearInterval(gameTimer);

    // Starting Variables
    difficulty = 'easy';
    cardAmount = 12;
    gameClicks = 0;
    gameTime = 0;
    timing = 1600;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];

    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        if (flipConfirm === 'halt' && flipCheck === 1) {
          flipCheck = 0;
        }
        if (
          flipCheck === 1 &&
          flipConfirm === 'go' &&
          !activeCards.includes(thisCard.id)
        ) {
          audioCardflip.play();
          gameClicks++;
          if (gameClicks === 1) {
            payCredits(difficulty);
            gameTimer = setInterval(() => {
              gameTime++;
              document.querySelector('#seconds').textContent = gameTime;
              document.querySelector('#clicks').textContent = gameClicks;
            }, 1000);
          }
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards, gameTime);
        }
      })
    );
    restartGame();
  };

  // ====== //
  // MEDIUM //
  // ====== //
  document.querySelector('#medium').onclick = () => {
    audioShuffle.play();
    // RESET TIMER
    clearInterval(gameTimer);

    // Starting Variables
    difficulty = 'medium';
    cardAmount = 16;
    gameClicks = 0;
    gameTime = 0;
    timing = 1000;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];

    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        if (flipConfirm === 'halt' && flipCheck === 1) {
          flipCheck = 0;
        }
        if (
          flipCheck === 1 &&
          flipConfirm === 'go' &&
          !activeCards.includes(thisCard.id)
        ) {
          audioCardflip.play();
          gameClicks++;
          if (gameClicks === 1) {
            payCredits(difficulty);
            gameTimer = setInterval(() => {
              gameTime++;
              document.querySelector('#seconds').textContent = gameTime;
              document.querySelector('#clicks').textContent = gameClicks;
            }, 1000);
          }
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards, gameTime);
        }
      })
    );
    restartGame();
  };

  // ==== //
  // HARD //
  // ==== //
  document.querySelector('#hard').onclick = () => {
    audioShuffle.play();
    // RESET TIMER
    clearInterval(gameTimer);

    // Starting Variables
    difficulty = 'hard';
    cardAmount = 20;
    gameClicks = 0;
    gameTime = 0;
    timing = 600;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];

    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        if (flipConfirm === 'halt' && flipCheck === 1) {
          flipCheck = 0;
        }
        if (
          flipCheck === 1 &&
          flipConfirm === 'go' &&
          !activeCards.includes(thisCard.id)
        ) {
          gameClicks++;
          if (gameClicks === 1) {
            payCredits(difficulty);
            gameTimer = setInterval(() => {
              audioCardflip.play();
              gameTime++;
              document.querySelector('#seconds').textContent = gameTime;
              document.querySelector('#clicks').textContent = gameClicks;
            }, 1000);
          }
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards, gameTime);
        }
      })
    );
    restartGame();
  };

  // RESTART BUTTON //
  document.querySelector('#restart').onclick = () => {
    restartGame();
    audioShuffle.play();
  };

  // INFO BOX //
  document.querySelector('#infoDiv').onmouseenter = () => {
    audioBump.play();
  };

  // ========= //
  // FUNCTIONS //
  // ========= //
  // Generate pairs of random cards
  function genRandCards() {
    // GENERATE RANDOM SELECTION OF CARD
    const chosenCards = [];
    while (chosenCards.length < cardAmount / 2) {
      const randNum = ~~(Math.random() * cards.length);
      if (!chosenCards.includes(randNum)) {
        chosenCards.push(randNum);
      }
    }

    // GENERATE 2 OF THE SAME CARDS IN THE ARRAY
    const doubleCards = chosenCards.concat(chosenCards);

    // SHUFFLE THE FINAL ARRAY
    const shuffled = shuffler(doubleCards);
    return shuffled;
  }

  // Shuffle pairs of random cards
  function shuffler(input) {
    // FISHER-YATES SHUFFLER
    let currentIndex = input.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = input[currentIndex];
      input[currentIndex] = input[randomIndex];
      input[randomIndex] = temporaryValue;
    }
    return input;
  }

  // Generates variable grid of random cards
  function generateGrid(cardAmount) {
    const main = document.querySelector('#main');

    // Create Cards equal to cardAmount
    let cards = '';
    for (let i = 0; i < cardAmount; i++) {
      cards += `<img id="card${
        i + 1
      }" class="memoryCards bg-white hover:shadow-lg hover:border-yellow-500" src="../images/3-memory/undercover.svg" alt="Sun glasses with a moustache underneath"/>`;
    }

    // Create grid
    let rows;
    let cols;
    switch (cardAmount) {
      case 6:
        cols = 3;
        rows = 2;
        break;
      case 12:
        cols = 4;
        rows = 3;
        break;
      case 16:
        cols = 4;
        rows = 4;
        break;
      case 20:
        cols = 4;
        rows = 5;
        break;
      case 24:
        cols = 4;
        rows = 6;
        break;
    }
    const grid = `
                  <div
                    id="cardGrid"
                    class="grid mx-auto gap-1 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-${cols} grid-rows-${rows} m-6 md:max-w-2xl">
                      ${cards}
                  </div>
                  `;
    main.innerHTML = grid;
  }

  // Card flip functionality
  function flipCards(timing, shuffled, thisCard, lastCard) {
    // Value that will be returned
    let returnValue = [];
    // Get the ID from thisCard
    const thisId = Number(thisCard.id.slice(4)) - 1;

    // IF there was a lastCard, check if ID's match, if not, turn cards
    if (lastCard[1] === 'first card turned') {
      const lastId = Number(lastCard[0].id.slice(4)) - 1;

      if (shuffled[lastId] === shuffled[thisId]) {
        // Match
        thisCard.src = cards[shuffled[thisId]];
        returnValue = [thisCard, 'match'];
        lastCard[0].classList.add('bg-green-400');
        thisCard.classList.add('bg-green-400');
        setTimeout(() => {
          lastCard[0].classList.remove('bg-green-400');
          thisCard.classList.remove('bg-green-400');
        }, timing);

        return returnValue;
      } else {
        // Nomatch
        thisCard.src = cards[shuffled[thisId]];
        returnValue = [thisCard, 'nomatch'];
        flipConfirm = 'halt';
        lastCard[0].classList.add('bg-red-400');
        thisCard.classList.add('bg-red-400');
        setTimeout(() => {
          lastCard[0].src = '../images/3-memory/undercover.svg';
          thisCard.src = '../images/3-memory/undercover.svg';
          activeCards = activeCards.filter(
            (id) => id !== lastCard[0].id && id !== thisCard.id
          );
          flipCheck = 1;
          flipConfirm = 'go';
          lastCard[0].classList.remove('bg-red-400');
          thisCard.classList.remove('bg-red-400');
        }, timing);
        return returnValue;
      }
    } else {
      // First Card Turn
      thisCard.src = cards[shuffled[thisId]];
      returnValue = [thisCard, 'first card turned'];
      return returnValue;
    }
  }

  // If game is won, do certain things
  function gameCheck(cardAmount, activeCards, gameTime) {
    // CHECK ACTIVE CARDS ARRAY LENGTH TO SEE IF GAME IS WON
    if (cardAmount === activeCards.length) {
      audioSuccess.play();
      // RESET TIMER
      clearInterval(gameTimer);
      // HIDE DIFFICULTY & SHOW RESTART
      document.querySelector(`#difficulty`).classList.remove('flex');
      document.querySelector(`#difficulty`).classList.add('hidden');
      document.querySelector(`#restart`).classList.remove('hidden');
      document.querySelector(`#restart`).classList.add('flex');
      // HIGHLIGHT ALL CARDS
      activeCards.forEach((card) => {
        document.querySelector(`#${card}`).classList.add('border-yellow-500');
        setTimeout(() => {
          document.querySelector(`#${card}`).classList.remove('border-yellow-500');
          document.querySelector(`#${card}`).classList.add('bg-white');
        }, 3000);
      });

      // ADD COINS BASED ON TIME SPEND AND DIFFICULTY
      const credits = addCredits(difficulty, gameClicks, gameTime);

      // SHOW GAME TOTAL TIME & GAME TOTAL CLICKS
      document.querySelector('#seconds').textContent = gameTime;
      document.querySelector('#clicks').textContent = gameClicks;
      document.querySelector(
        '#message'
      ).innerHTML = `Congratulations, you finished in <b>${gameTime} seconds</b>, clicked <b>${gameClicks} times</b> and earned <b>${credits} credits</b>!`;
    }
  }

  // Restart game
  function restartGame() {
    // Generate new random cards
    shuffled = genRandCards();
    // Reset ActiveCards
    activeCards = [];
    // Reset images
    allCards.forEach((thisCard) => {
      thisCard.src = '../images/3-memory/undercover.svg';
    });
    // Reset gameClicks
    gameClicks = 0;
    //Reset gameTime
    gameTime = 0;
    // Hide button Show dropdown
    document.querySelector(`#difficulty`).classList.remove('hidden');
    document.querySelector(`#difficulty`).classList.add('flex');
    document.querySelector(`#restart`).classList.remove('flex');
    document.querySelector(`#restart`).classList.add('hidden');
    // Reset message
    document.querySelector('#message').textContent = '';
  }

  // MANAGE CREDITS
  function addCredits(difficulty, gameClicks, gameTime) {
    const oldCredits = localStorage.getItem('credits');
    let calc = gameClicks + gameTime;
    let calcCredits;
    switch (difficulty) {
      case 'easy':
        if (calc < 45) {
          calcCredits = 15;
        } else if (calc >= 45 && calc < 60) {
          calcCredits = 10;
        } else if (calc >= 60 && calc < 80) {
          calcCredits = 5;
        } else {
          calcCredits = 1;
        }
        break;
      case 'medium':
        if (calc < 80) {
          calcCredits = 75;
        } else if (calc >= 80 && calc < 100) {
          calcCredits = 50;
        } else if (calc >= 100 && calc < 120) {
          calcCredits = 25;
        } else {
          calcCredits = 10;
        }
        break;
      case 'hard':
        if (calc < 125) {
          calcCredits = 150;
        } else if (calc >= 125 && calc < 150) {
          calcCredits = 100;
        } else if (calc >= 150 && calc < 170) {
          calcCredits = 50;
        } else {
          calcCredits = 25;
        }
        break;
    }
    localStorage.setItem('credits', Number(oldCredits) + calcCredits);
    document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
    return calcCredits;
  }

  function payCredits(difficulty) {
    const oldCredits = localStorage.getItem('credits');
    let calcCredits;
    switch (difficulty) {
      case 'easy':
        calcCredits = 10;
        break;
      case 'medium':
        calcCredits = 50;
        break;
      case 'hard':
        calcCredits = 100;
        break;
    }
    localStorage.setItem('credits', Number(oldCredits) - calcCredits);
    document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
  }

  //
})();
