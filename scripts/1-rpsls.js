(() => {
  //Generate some random option for machine
  function generator(min, max) {
    let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
  }

  // AUDIO
  const audioCardflip = new Audio('../audio/cardflip.mp3');

  // AVAILABLE OPTIONS
  let options = [
    {
      selection: 'Rock',
      defeat: ['Scissors', 'Lizard'],
    },
    {
      selection: 'Paper',
      defeat: ['Rock', 'Spock'],
    },
    {
      selection: 'Scissors',
      defeat: ['Paper', 'Lizard'],
    },
    {
      selection: 'Lizard',
      defeat: ['Paper', 'Spock'],
    },
    {
      selection: 'Spock',
      defeat: ['Rock', 'Scissors'],
    },
  ];
  let state = 'go';

  function game(id, computer) {
    // Make our choice animate a bit in green/red/yellow depending on right or wrong or draw answer
    const playerChoice = options[id].selection;
    const computerChoice = options[computer].selection;
    let choice;

    switch (computerChoice) {
      case 'Rock':
        choice = 'ROCK';
        break;
      case 'Paper':
        choice = 'PAPER';
        break;
      case 'Scissors':
        choice = 'SCISSORS';
        break;
      case 'Lizard':
        choice = 'LIZARD';
        break;
      case 'Spock':
        choice = 'SPOCK';
        break;
    }

    let outcome;
    let outcomeName;
    if (playerChoice === computerChoice) {
      outcome = 'DRAW';
    } else {
      let result = options[id].defeat.indexOf(computerChoice);
      if (result >= 0) {
        //User Wins
        outcome = 'WIN';
        credits(outcome);
      } else {
        //Computer Wins
        outcome = 'LOSS';
        credits(outcome);
      }
    }

    // SET COMPUTER HTML
    document.querySelector(
      '#computerImage'
    ).src = `../images/1-rpsls/${computerChoice}.svg`;
    document.querySelector('#computerChoice').textContent = `${choice}`;

    const qMessage = document.querySelector('#message');
    const qPlayerChoice = document.querySelector(`#${playerChoice.toLowerCase()}`);
    const qComputerDiv = document.querySelector(`#computerDiv`);
    const qComputerChoice = document.querySelector(`#computerChoice`);

    switch (outcome) {
      case 'WIN':
        state = 'halt';
        qMessage.innerHTML = `You <b>win 11</b> credits!`;
        // Add Color
        qPlayerChoice.classList.add('bg-green-500');
        qPlayerChoice.classList.add('text-white');
        qComputerDiv.classList.add('bg-green-500');
        // Remove Color
        setTimeout(() => {
          qPlayerChoice.classList.remove('bg-green-500');
          qPlayerChoice.classList.remove('text-white');
          qComputerDiv.classList.remove('bg-green-500');
          state = 'go';
        }, 1500);
        break;

      case 'LOSS':
        state = 'halt';
        qMessage.innerHTML = `You <b>lost 9</b> credits.`;
        // Add Color
        qPlayerChoice.classList.add('bg-red-500');
        qPlayerChoice.classList.add('text-white');
        qComputerDiv.classList.add('bg-red-500');
        // Remove Color
        setTimeout(() => {
          qPlayerChoice.classList.remove('bg-red-500');
          qPlayerChoice.classList.remove('text-white');
          qComputerDiv.classList.remove('bg-red-500');
          state = 'go';
        }, 1500);
        break;

      case 'DRAW':
        state = 'halt';
        qMessage.innerHTML = `It's a <b>draw</b>`;
        // Add Color
        qPlayerChoice.classList.add('bg-yellow-500');
        qComputerDiv.classList.add('bg-yellow-500');
        qMessage.classList.add('text-black');
        qComputerChoice.classList.add('text-black');
        // Remove Color
        setTimeout(() => {
          qPlayerChoice.classList.remove('bg-yellow-500');
          qComputerDiv.classList.remove('bg-yellow-500');
          qMessage.classList.remove('text-black');
          qComputerChoice.classList.remove('text-black');
          state = 'go';
        }, 1500);
        break;
    }
  }

  // CLICK HANDLERS
  document.querySelector('#rock').onclick = () => {
    if (state === 'go') {
      audioCardflip.play();
      let userOption = 0;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#paper').onclick = () => {
    if (state === 'go') {
      audioCardflip.play();
      let userOption = 1;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#scissors').onclick = () => {
    if (state === 'go') {
      audioCardflip.play();
      let userOption = 2;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#lizard').onclick = () => {
    if (state === 'go') {
      audioCardflip.play();
      let userOption = 3;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#spock').onclick = () => {
    if (state === 'go') {
      audioCardflip.play();
      let userOption = 4;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };

  // CREDIT MANAGER
  function credits(outcome) {
    let credits = Number(localStorage.getItem('credits'));
    if (outcome === 'WIN') {
      credits += 11;
      localStorage.setItem('credits', credits);
      document.getElementById('credits').innerText = localStorage.getItem('credits');
    } else if (outcome === 'LOSS') {
      credits -= 9;
      localStorage.setItem('credits', credits);
      document.getElementById('credits').innerText = localStorage.getItem('credits');
    }
  }
})();
