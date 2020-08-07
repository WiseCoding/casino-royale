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

  //
  //
  // ==================================== //
  // STARTING VARIABLES AND STARTING GRID //
  // ==================================== //
  let gameClicks = 0;
  let cardAmount = 16;
  let timing = 1500;
  generateGrid(cardAmount);
  let shuffled = genRandCards();
  let lastCard = [];
  let activeCards = [];
  let allCards = document.querySelectorAll('.memoryCards');
  allCards.forEach((thisCard) =>
    thisCard.addEventListener('click', () => {
      // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
      if (!activeCards.includes(thisCard.id)) {
        gameClicks++;
        activeCards.push(thisCard.id);
        lastCard = flipCards(timing, shuffled, thisCard, lastCard);
        gameCheck(cardAmount, activeCards);
      }
    })
  );

  // ==== //
  // Easy //
  // ==== //
  document.querySelector('#easy').onclick = () => {
    timing = 1600;
    cardAmount = 12;
    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          gameClicks++;
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards);
        }
      })
    );
    restartGame();
  };

  // ====== //
  // Medium //
  // ====== //
  document.querySelector('#medium').onclick = () => {
    timing = 1000;
    cardAmount = 16;
    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          gameClicks++;
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards);
        }
      })
    );
    restartGame();
  };

  // ==== //
  // Hard //
  // ==== //
  document.querySelector('#hard').onclick = () => {
    timing = 600;
    cardAmount = 20;
    generateGrid(cardAmount);
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          gameClicks++;
          activeCards.push(thisCard.id);
          lastCard = flipCards(timing, shuffled, thisCard, lastCard);
          gameCheck(cardAmount, activeCards);
        }
      })
    );
    restartGame();
  };

  // ========== //
  // RESTART GAME //
  // ========== //
  document.querySelector('#restart').onclick = () => {
    restartGame();
  };

  //
  //
  // ========= //
  // FUNCTIONS //
  // ========= //
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
        return returnValue;
      } else {
        // Nomatch
        thisCard.src = cards[shuffled[thisId]];
        returnValue = [thisCard, 'nomatch'];
        setTimeout(() => {
          lastCard[0].src = '../images/3-memory/undercover.svg';
          thisCard.src = '../images/3-memory/undercover.svg';
          activeCards = activeCards.filter(
            (id) => id !== lastCard[0].id && id !== thisCard.id
          );
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

  function gameCheck(cardAmount, activeCards) {
    // CHECK ACTIVE CARDS ARRAY LENGTH TO SEE IF GAME IS WON
    if (cardAmount === activeCards.length) {
      // TODO: ADD TIMER FUNCTIONALITY
      let timer = 10;
      // TODO: ADD COINS BASED ON TIME SPEND AND DIFFICULTY
      // SHOW RESET BUTTON
      document.querySelector(`#restart`).classList.remove('hidden');
      document.querySelector(`#restart`).classList.add('inline-block');
      // HIGHLIGHT ALL CARDS
      activeCards.forEach((card) => {
        document.querySelector(`#${card}`).classList.add('bg-yellow-500', 'border-black');
        setTimeout(() => {
          document
            .querySelector(`#${card}`)
            .classList.remove('bg-yellow-500', 'border-black');
          document.querySelector(`#${card}`).classList.add('bg-white');
        }, 4000);
      });

      // TODO: Show Message to user with gameClicks & Timer?
      console.log(
        `Congratulations, you won in ${timer} seconds and have clicked ${gameClicks} times`
      );
    }
  }

  function restartGame() {
    // Generate new random cards
    shuffled = genRandCards();
    // Reset ActiveCards
    activeCards = [];
    // Reset images
    allCards.forEach((thisCard) => {
      thisCard.src = '../images/3-memory/undercover.svg';
    });
    // Reset gameClicks variable
    gameClicks = 0;
    // Hide button
    document.querySelector(`#restart`).classList.remove('inline-block');
    document.querySelector(`#restart`).classList.add('hidden');
  }

  //
  //
})();
