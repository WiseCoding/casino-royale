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

// ALL CARDS
const [
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
  c15,
  c16,
  c17,
  c18,
  c19,
  c20,
  c21,
  c22,
] = [
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
  'undercover',
  'vault',
  'woman',
];

const cards = [
  `../images/3-memory/${c1}.svg`,
  `../images/3-memory/${c2}.svg`,
  `../images/3-memory/${c3}.svg`,
  `../images/3-memory/${c4}.svg`,
  `../images/3-memory/${c5}.svg`,
  `../images/3-memory/${c6}.svg`,
  `../images/3-memory/${c7}.svg`,
  `../images/3-memory/${c8}.svg`,
  `../images/3-memory/${c9}.svg`,
  `../images/3-memory/${c10}.svg`,
  `../images/3-memory/${c11}.svg`,
  `../images/3-memory/${c12}.svg`,
  `../images/3-memory/${c13}.svg`,
  `../images/3-memory/${c14}.svg`,
  `../images/3-memory/${c15}.svg`,
  `../images/3-memory/${c16}.svg`,
  `../images/3-memory/${c17}.svg`,
  `../images/3-memory/${c18}.svg`,
  `../images/3-memory/${c19}.svg`,
  `../images/3-memory/${c20}.svg`,
  `../images/3-memory/${c21}.svg`,
  `../images/3-memory/${c22}.svg`,
];

// SHUFFLE CARDS
// Array/Object with 6x2 different links, generate random
let chosenCards = [];
for (let i = 0; i < 6; i++) {
  const randNum = ~~(Math.random() * 22);
  if (chosenCards.includes(randNum)) {
    const randNum = ~~(Math.random() * 22);
  } else {
    chosenCards.push(randNum);
  }
}

const shuffle = [];

// CARD FLIP
const flip = document.querySelectorAll('.memoryCards');
flip.forEach((card) =>
  card.addEventListener('click', function () {
    flipCards(card);
  })
);

function flipCards(card) {
  card.src = '../images/3-memory/cocktail.svg';
}
