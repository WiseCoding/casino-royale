(() => {
  //Generate some random option for machine
  function generator(min, max) {
    let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
  }
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

  let userOption;
  let machineOption = generator(0, 4);

  userOption = prompt(
    '¿What do you choose?\nRock: 0\nPaper: 1\nScissors: 2\nLizard: 3\nSpock: 4 ',
    0
  );

  alert('Choosen ' + options[userOption].selection);
  alert('Javascript Choosen ' + options[machineOption].selection);

  if (options[userOption].selection == options[machineOption].selection) {
    alert('Draw!!');
  } else {
    let result = options[userOption].defeat.indexOf(options[machineOption].selection);
    if (result >= 0) {
      //User Wins
      alert('Congrats You Win!!');
    } else {
      //Machine Wins
      alert('Sorry you Lost!!');
    }
  }
})();
