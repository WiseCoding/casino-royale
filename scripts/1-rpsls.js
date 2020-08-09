(() => {
  //Generate some random option for machine
  function generator(min, max) {
    let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
  }

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
    document.querySelector('#gameState').textContent = `${outcome}`;
    document.querySelector(
      '#computerImage'
    ).src = `../images/1-rpsls/${computerChoice}.svg`;
    document.querySelector('#computerChoice').textContent = `${choice}`;

    switch (outcome) {
      case 'WIN':
        state = 'halt';
        document.querySelector('#message').innerHTML = `You <b>win 10</b> credits!`;
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add('bg-green-500');
        document.querySelector(`#computerDiv`).classList.add('bg-green-500');
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove('bg-green-500');
          document.querySelector(`#computerDiv`).classList.remove('bg-green-500');
          state = 'go';
        }, 1500);
        break;

      case 'LOSS':
        state = 'halt';
        document.querySelector('#message').innerHTML = `You <b>lost 10</b> credits.`;
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add('bg-red-500');
        document.querySelector(`#computerDiv`).classList.add('bg-red-500');
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove('bg-red-500');
          document.querySelector(`#computerDiv`).classList.remove('bg-red-500');
          state = 'go';
        }, 1500);
        break;

      case 'DRAW':
        state = 'halt';
        document.querySelector('#message').innerHTML = `DRAW, try again.`;
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add('bg-yellow-500');
        document.querySelector(`#computerDiv`).classList.add('bg-yellow-500');
        document.querySelector(`#gameState`).classList.add('text-black');
        document.querySelector(`#computerChoice`).classList.add('text-black');
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove('bg-yellow-500');
          document.querySelector(`#computerDiv`).classList.remove('bg-yellow-500');
          document.querySelector(`#gameState`).classList.remove('text-black');
          document.querySelector(`#computerChoice`).classList.remove('text-black');
          state = 'go';
        }, 1500);
        break;
    }
  }

  // CLICK HANDLERS
  document.querySelector('#rock').onclick = () => {
    if (state === 'go') {
      let userOption = 0;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#paper').onclick = () => {
    if (state === 'go') {
      let userOption = 1;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#scissors').onclick = () => {
    if (state === 'go') {
      let userOption = 2;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#lizard').onclick = () => {
    if (state === 'go') {
      let userOption = 3;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };
  document.querySelector('#spock').onclick = () => {
    if (state === 'go') {
      let userOption = 4;
      let machineOption = generator(0, 4);
      game(userOption, machineOption);
    }
  };

  // CREDIT MANAGER
  function credits(outcome) {
    let credits = Number(localStorage.getItem('credits'));
    if (outcome === 'WIN') {
      credits += 10;
      localStorage.setItem('credits', credits);
      document.getElementById('credits').innerText = localStorage.getItem('credits');

      // add points (change credits in local storage)
      // update credits in ID "credits"
    } else if (outcome === 'LOSS') {
      // deduct points (change credits in local storage)
      // update credits in ID "credits"
      credits -= 10;
      localStorage.setItem('credits', credits);
      document.getElementById('credits').innerText = localStorage.getItem('credits');
    }
  }
})();
