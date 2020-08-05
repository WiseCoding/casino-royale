// ---------------
//! MUST
// 12 CARDS
// CLICK TURNS, MAX 2 AT SAME
//  - If match, stay visible,
//  - If no match, flip them back
// RANDOM POSITION CARDS IN GRID
// RESET BUTTON
//
//? NICE TO HAVE
// Playable by keyboard
// User define custom url images
// Multiplayer (local)
// ---------------

//? GAME VARIABLES
const cardAmount = 16;

// STARTING CARD NAMES
const cardNames = [
  'bar',
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
  'gold',
  'grapes',
  'man',
  'police',
  'seven',
  'shoe',
  'slots',
  'strawberry',
  'vault',
  'woman',
];

// GENERATE RELATIVE PATHS TO CARDS IN ARRAY
const cards = [];
for (let i = 0; i < cardNames.length; i++) {
  const path = `../images/3-memory/${cardNames[i]}.svg`;
  cards.push(path);
}

// GENERATE RANDOM SELECTION OF CARD
let chosenCards = [];
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

// FISHER-YATES SHUFFLER
function shuffler(input) {
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

// PLACE RANDOM CARDS IN GRID
/* const grid = document.querySelectorAll('.memoryCards');
let i = 0;
grid.forEach((card) => {
  card.src = cards[shuffled[i]];
  i++;
}); */

// CARD FLIP
let lastChoice;
const flip = document.querySelectorAll('.memoryCards');
flip.forEach((card) =>
  card.addEventListener('click', () => {
    // Get ID to place in the shuffled[id] array
    const id = Number(card.id.slice(4)) - 1;
    flipCards(card, id, lastChoice);
  })
);

function flipCards(card, id, lastChoice) {
  /* // Flip REVEAL CARD
  card.src = cards[shuffled[id]];
  // Flip HIDE CARD
  setTimeout(() => {
    card.src = '../images/3-memory/undercover.svg';
  }, 2000); */

  // IF lastChoice === currentChoice => both cards stay
  if (lastChoice) {
    if (lastChoice === shuffled[id]) {
      document.querySelector(`#card${lastChoice}`).src = cards[shuffled[lastChoice]];
      card.src = cards[shuffled[id]];
      lastChoice = shuffled[id];
    } else {
      setTimeout(() => {
        document.querySelector(`#card${lastChoice}`).src =
          '../images/3-memory/undercover.svg';
        card.src = '../images/3-memory/undercover.svg';
      }, 2000);
      lastChoice = shuffled[id];
    }
  } else {
    card.src = cards[shuffled[id]];
    lastChoice = shuffled[id];
  }

  /* // If choice is
  if (shuffled[id] === lastChoice) {
    card.src = cards[shuffled[id]];
  } else {
  }
  lastChoice = shuffled[id]; */
}

// DEBUGGER
console.log('======================================');
console.log(cardAmount);
console.log(doubleCards);
console.log(shuffled);
console.log('======================================');
