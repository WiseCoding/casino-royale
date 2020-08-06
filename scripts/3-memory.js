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

  // GENERATE GRIDS (6-12-24)
  // Start Grid
  let cardAmount = 16;
  generateGrid(cardAmount);
  let shuffled = genRandCards();
  // FLIP CARD
  let lastCard = [];
  let activeCards = [];
  let allCards = document.querySelectorAll('.memoryCards');
  allCards.forEach((thisCard) =>
    thisCard.addEventListener('click', () => {
      // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
      if (!activeCards.includes(thisCard.id)) {
        activeCards.push(thisCard.id);
        lastCard = flipCards(shuffled, thisCard, lastCard);
      }
    })
  );

  // Easy
  document.querySelector('#easy').onclick = () => {
    generateGrid(12);
    cardAmount = 12;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          activeCards.push(thisCard.id);
          lastCard = flipCards(shuffled, thisCard, lastCard);
        }
      })
    );
    resetGame();
  };

  // Medium
  document.querySelector('#medium').onclick = () => {
    generateGrid(16);
    cardAmount = 16;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          activeCards.push(thisCard.id);
          lastCard = flipCards(shuffled, thisCard, lastCard);
        }
      })
    );
    resetGame();
  };

  // Hard
  document.querySelector('#hard').onclick = () => {
    generateGrid(20);
    cardAmount = 20;
    shuffled = genRandCards();
    lastCard = [];
    activeCards = [];
    allCards = document.querySelectorAll('.memoryCards');
    allCards.forEach((thisCard) =>
      thisCard.addEventListener('click', () => {
        // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
        if (!activeCards.includes(thisCard.id)) {
          activeCards.push(thisCard.id);
          lastCard = flipCards(shuffled, thisCard, lastCard);
        }
      })
    );
    resetGame();
  };

  // RESET GAME
  document.querySelector('#restart').onclick = () => {
    resetGame();
  };

  // FUNCTIONS
  function generateGrid(cardAmount) {
    const main = document.querySelector('#main');

    // Create Cards equal to cardAmount
    let cards = '';
    for (let i = 0; i < cardAmount; i++) {
      cards += `<img id="card${
        i + 1
      }" class="memoryCards" src="../images/3-memory/undercover.svg" alt="Sun glasses with a moustache underneath"/>`;
    }

    // Create grid
    let rows;
    let cols;
    switch (cardAmount) {
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
    }
    const grid = `
                  <div class="grid mx-auto gap-1 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-${cols} grid-rows-${rows} m-6 md:max-w-2xl ">
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

  function flipCards(shuffled, thisCard, lastCard) {
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
        }, 2000);
        return returnValue;
      }
    } else {
      // First Card Turn
      thisCard.src = cards[shuffled[thisId]];
      returnValue = [thisCard, 'first card turned'];
      return returnValue;
    }
  }

  function resetGame() {
    // Generate new random cards
    shuffled = genRandCards();
    // Reset ActiveCards
    activeCards = [];
    // Reset images
    allCards.forEach((thisCard) => {
      thisCard.src = '../images/3-memory/undercover.svg';
    });
  }

  //
  //
})();
