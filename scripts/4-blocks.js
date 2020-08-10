// INFO //
const audioTick = new Audio('../audio/tick2.mp3');
const info = document.querySelector('#info');
const gameInfo = document.querySelector('#gameInfo');
let infoClick = 1;
info.onclick = () => {
  audioTick.play();
  if (infoClick === 1) {
    gameInfo.classList.remove('hidden');
    gameInfo.classList.add('flex');
    infoClick = 0;
  } else {
    gameInfo.classList.remove('flex');
    gameInfo.classList.add('hidden');
    infoClick = 1;
  }
};

// Declaring global variables
let startTime;
let endTime;
let seconds;
let minutes;
let i = 0;
let j = 0;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Creates random moving blocks
let block = {
  // determines the position where the block will apear math.random gives a random position
  position: {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  },
  size: 30,
  //for the acceleration of blocks
  acceleration: { x: 3, y: 2 },
  // Function that draws the block
  drawBlock: function () {
    ctx.fillStyle = 'red';
    // begins path
    ctx.beginPath();
    // calls the object it will draw with positions and size
    ctx.rect(block.position.x, block.position.y, block.size, block.size);
    // fills the colour
    ctx.fill();

    // Update the location.
    block.position.x += block.acceleration.x;
    block.position.y += block.acceleration.y;

    // Keeps the block within the boundary of canvas
    if (block.position.x >= canvas.width - block.size || block.position.x <= block.size)
      block.acceleration.x = -block.acceleration.x;
    if (block.position.y >= canvas.height - block.size || block.position.y <= block.size)
      block.acceleration.y = -block.acceleration.y;
  },
};
let block2 = {
  // determines the position where the block will apear math.random gives a random position on the x ace
  position: {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  },
  size: 30,
  // Will determine if the block will get faster or slower
  acceleration: { x: 2, y: 2.5 },
  // Function that draws the block
  drawblock2: function () {
    ctx.fillStyle = 'red';
    // begins path
    ctx.beginPath();
    // calls the object it will draw with positions and size
    ctx.rect(block2.position.x, block2.position.y, block2.size, block2.size);
    ctx.fill();

    // Calling collision functions for block 2
    collideWithblock2();
    collideWithBlock12();

    //updates the location
    block2.position.x += block2.acceleration.x;
    block2.position.y += block2.acceleration.y;

    //Keeps the block within the boundary of canvas.
    if (
      block2.position.x >= canvas.width - block2.size ||
      block2.position.x <= block2.size
    )
      block2.acceleration.x = -block2.acceleration.x;
    if (
      block2.position.y >= canvas.height - block2.size ||
      block2.position.y <= block2.size
    )
      block2.acceleration.y = -block2.acceleration.y;
  },
};
let block3 = {
  // determines the position where the block apperars
  position: {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  },
  // Will determine the size of the block
  size: 30,
  acceleration: { x: 2.5, y: 2 },
  // Function that draws the block
  drawBlock3: function () {
    ctx.fillStyle = 'red';
    // begins path
    ctx.beginPath();
    // calls the object it will draw with positions and size
    ctx.rect(block3.position.x, block3.position.y, block3.size, block3.size);
    ctx.fill();

    //Calling colision functions for block 3
    collideWithBlock13();
    collideWithblock23();
    collideWithBlock3();

    // Update the location.
    block3.position.x += block3.acceleration.x;
    block3.position.y += block3.acceleration.y;

    // Keeps the block within the boundary of canvas
    if (
      block3.position.x >= canvas.width - block3.size ||
      block3.position.x <= block3.size
    )
      block3.acceleration.x = -block3.acceleration.x;
    if (
      block3.position.y >= canvas.height - block3.size ||
      block3.position.y <= block3.size
    )
      block3.acceleration.y = -block3.acceleration.y;
  },
};
let block4 = {
  // determines the position where the block apears
  position: {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  },

  size: 30,
  acceleration: { x: 2.7, y: 2.3 },
  // Function that draws the block
  drawBlock4: function () {
    // begins path
    ctx.beginPath();
    // calls the object it will draw with positions and size
    ctx.rect(block4.position.x, block4.position.y, block4.size, block4.size);
    ctx.fillStyle = 'red';
    ctx.fill();

    //Calling colision functions for block 4
    collideWithBlock14();
    collideWithblock24();
    collideWithBlock34();
    collideWithBlock4();

    // Updates the location.
    block4.position.x += block4.acceleration.x;
    block4.position.y += block4.acceleration.y;

    // Keeps the block within the boundary of canvas
    if (
      block4.position.x >= canvas.width - block4.size ||
      block4.position.x <= block4.size
    )
      block4.acceleration.x = -block4.acceleration.x;
    if (
      block4.position.y >= canvas.height - block4.size ||
      block4.position.y <= block4.size
    )
      block4.acceleration.y = -block4.acceleration.y;
  },
};

// creates the block that can be controlled
let blockm = {
  // spawns the block in the middle of the canvas
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  size: 30,
};

// Creates a draw rectangle function which draws the main block
function drawRect() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.rect(blockm.position.x, blockm.position.y, blockm.size, blockm.size);
  ctx.fill();
  collideWithBlock();
  displayt();
}

// calculates the position of the main block and calls gameover function on collision with first random moving blocks
function collideWithBlock() {
  // position of  x axis
  let dx = block.position.x - blockm.position.x;
  // position y axis
  let dy = block.position.y - blockm.position.y;
  // Distance calculation
  let distance = Math.sqrt(dx * dx + dy * dy);
  // Creating if (if distance between 2 balls is less then 0 execute )
  if (distance < block.size + blockm.size) {
    gameOver();
  }
}
//check the collision between main block and block 2 and calls gameover function on collision
function collideWithblock2() {
  let dx = block2.position.x - blockm.position.x;
  let dy = block2.position.y - blockm.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block2.size + blockm.size) {
    gameOver();
  }
}
//check the collision between main block and block 3 and calls gameover function on collision
function collideWithBlock3() {
  let dx = block3.position.x - blockm.position.x;
  let dy = block3.position.y - blockm.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block3.size + blockm.size) {
    gameOver();
  }
}
//check the collision between main block and block 4 and calls gameover function on collision
function collideWithBlock4() {
  let dx = block4.position.x - blockm.position.x;
  let dy = block4.position.y - blockm.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block4.size + blockm.size) {
    gameOver();
  }
}

// These are functions what handle the collision between all random blocks
//collision between block 1 and 2
function collideWithBlock12() {
  let dx = block.position.x - block2.position.x;
  let dy = block.position.y - block2.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block.size + block2.size) {
    block.acceleration.x = +block.acceleration.x;
    block.acceleration.y = +block.acceleration.y;
  }
}
//collision between block 1 and 3
function collideWithBlock13() {
  let dx = block.position.x - block3.position.x;
  let dy = block.position.y - block3.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block.size + block3.size) {
    block.acceleration.x = -block.acceleration.x;
    block.acceleration.y = +block.acceleration.y;
  }
}
//colliison between block 1 and 4
function collideWithBlock14() {
  let dx = block.position.x - block4.position.x;
  let dy = block.position.y - block4.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block.size + block4.size) {
    block.acceleration.x = -block.acceleration.x;
    block.acceleration.y = -block.acceleration.y;
  }
}
//collision between block 2 and 3
function collideWithblock23() {
  let dx = block2.position.x - block3.position.x;
  let dy = block2.position.y - block3.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block2.size + block3.size) {
    block2.acceleration.x = +block2.acceleration.x;
    block2.acceleration.y = +block2.acceleration.y;
  }
}
//collision between block 2 and 4
function collideWithblock24() {
  let dx = block2.position.x - block4.position.x;
  let dy = block2.position.y - block4.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block2.size + block4.size) {
    block2.acceleration.x = -block2.acceleration.x;
    block2.acceleration.y = +block2.acceleration.y;
  }
}
//collision between block 3 and 4
function collideWithBlock34() {
  let dx = block4.position.x - block3.position.x;
  let dy = block4.position.y - block3.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < block4.size + block3.size) {
    block3.acceleration.x = -block3.acceleration.x;
    block3.acceleration.y = -block3.acceleration.y;
  }
}

/* Function to check if the game has started
if the game has started this function also makes sure
that the variable startTime does not get overwritten*/
function checkStart() {
  if (i == 0) {
    startTime = new Date();
    i++;
  }
}

//function that calculates time passed between 2 date variables;
function displayt() {
  // later record end time
  let endTime = new Date();
  // time difference in ms
  let timeDiff = endTime - startTime;
  // strip the miliseconds
  timeDiff /= 1000;
  // get seconds
  seconds = Math.round(timeDiff % 60);
  // remove seconds from the date
  timeDiff = Math.floor(timeDiff / 60);
  // get minutes
  minutes = Math.round(timeDiff % 60);
  //displays the time elapsed
  ctx.fillText(minutes + ':' + seconds, 40, 80);
  /*Creates time parameter to call function
  function is only active in the first 5 seconds of the game*/
  if (seconds <= 5 && minutes <= 0) {
    startMessage();
  }
}

/*Function that checks if given time has elapsed
If the time has reached a certain point
 creates another blocks (up to 4)*/
function startBlock2() {
  if (seconds >= 10 || minutes > 0) {
    block2.drawblock2();
  }
}
function startBlock3() {
  if (seconds >= 15 || minutes > 0) {
    block3.drawBlock3();
  }
}
function startBlock4() {
  if (seconds >= 20 || minutes > 0) {
    block4.drawBlock4();
  }
}

/*function that increases  block sizes
when 40 seconds have elapse*/
function increaseSize1() {
  if (seconds > 40 || minutes > 0) {
    block.size = 35;
    block2.size = 40;
  }
}

/*function that increases  block sizes
when 50 seconds have elapse*/
function increaseSize2() {
  if (seconds > 50 || minutes > 0) {
    block3.size = 45;
    block4.size = 50;
  }
}
/*function that increases the players block size
when one minute has elapsed*/
function increaseSizem() {
  if (minutes > 0) {
    blockm.size = 30;
  }
}

// Creates a function that displays starting message
function startMessage() {
  ctx.font = '20px white';
  ctx.fillText('Save the block! Use arrow keys to dodge', canvas.width / 3.5, 20);
}

// A function to repeat every time the animation loops.
function update() {
  // clears  the screan/canvas i.e. where the block was previously does not show up.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  checkStart();
  drawRect();
  // calls the function in the block object
  block.drawBlock();
  increaseSize1();
  increaseSize2();
  increaseSizem();
  startBlock2();
  startBlock3();
  startBlock4();
  endTime = new Date();
  // gets the animation going
  window.requestAnimationFrame(update);
}

// Creates shutdown function
function shutdown() {
  // if enter is pressed the game starts again
  if (event.keyCode == 13) {
    // resets global variable to 0
    i = 0;
    // reloads the animation page
    location.reload();
    j = 0;
  }
}

/* Function that Displays a messgae to the user that the game is over
and gives user instructions on how to continue.*/
function gameOver() {
  j = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('"Game Over"  ', canvas.width / 2.7, canvas.height / 2);
  ctx.fillText('  Press enter to restart', canvas.width / 3.25, canvas.height / 2 + 20);
  ctx.fillText(
    'Time survived: ' + minutes + ':' + seconds,
    canvas.width / 2.7 - 20,
    canvas.height / 2 + 50
  );
  shutdown();
}

// Add an event listener to the keypress event.
window.addEventListener('keydown', function (event) {
  // Makes arrow keys unpressable when in Game over mode.
  if (j == 0) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // move Right
    if (event.keyCode == 39 && blockm.position.x < canvas.width - blockm.size)
      // updates location by int given
      blockm.position.x += Math.min(15, canvas.width - blockm.position.x - blockm.size);
    // move Left
    else if (event.keyCode == 37 && blockm.position.x > blockm.size)
      // updates location by int given
      blockm.position.x -= 15;
    // move down
    else if (event.keyCode == 40 && blockm.position.y < canvas.height - blockm.size)
      // updates location by int given
      blockm.position.y += 15;
    // move up
    else if (event.keyCode == 38 && blockm.position.y > blockm.size)
      // updates location by int given
      blockm.position.y -= 15;

    // calls draw rectangle function
    drawRect();
  } else if (event.keyCode == 13) {
    // resets global variable to 0
    i = 0;
    // reloads the animation page
    location.reload();
    j = 0;
  }
});

// Get the animation going.
window.requestAnimationFrame(update);
