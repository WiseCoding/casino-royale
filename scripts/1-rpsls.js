(() => {
  //Generate some random option for machine
  function generator(min, max) {
    let rndNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return rndNumber;
  }

  // AVAILABLE OPTIONS
  let options = [
    {
      selection: "Rock",
      defeat: ["Scissors", "Lizard"],
    },
    {
      selection: "Paper",
      defeat: ["Rock", "Spock"],
    },
    {
      selection: "Scissors",
      defeat: ["Paper", "Lizard"],
    },
    {
      selection: "Lizard",
      defeat: ["Paper", "Spock"],
    },
    {
      selection: "Spock",
      defeat: ["Rock", "Scissors"],
    },
  ];

  function game(id, computer) {
    // Make our choice animate a bit in green/red/yellow depending on right or wrong or draw answer
    const playerChoice = options[id].selection;
    const computerChoice = options[computer].selection;
    let choice;

    switch (computerChoice) {
      case "Rock":
        choice = "ROCK";
        break;
      case "Paper":
        choice = "PAPER";
        break;
      case "Scissors":
        choice = "SCISSORS";
        break;
      case "Lizard":
        choice = "LIZARD";
        break;
      case "Spock":
        choice = "SPOCK";
        break;
    }

    let outcome;
    if (playerChoice === computerChoice) {
      outcome = "DRAW";
    } else {
      let result = options[id].defeat.indexOf(computerChoice);
      if (result >= 0) {
        //User Wins
        outcome = "WIN";
      } else {
        //Computer Wins
        outcome = "LOSS";
      }
    }

    // SET COMPUTER HTML
    document.querySelector("#gameState").textContent = `${outcome}`;
    document.querySelector(
      "#computerImage"
    ).src = `../images/1-rpsls/${computerChoice}.svg`;
    document.querySelector("#computerChoice").textContent = `${choice}`;

    switch (outcome) {
      case "WIN":
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add("bg-green-500");
        document.querySelector(`#computerDiv`).classList.add("bg-green-500");
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove("bg-green-500");
          document
            .querySelector(`#computerDiv`)
            .classList.remove("bg-green-500");
        }, 1500);
        break;

      case "LOSS":
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add("bg-red-500");
        document.querySelector(`#computerDiv`).classList.add("bg-red-500");
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove("bg-red-500");
          document.querySelector(`#computerDiv`).classList.remove("bg-red-500");
        }, 1500);
        break;

      case "DRAW":
        // Add Color
        document
          .querySelector(`#${playerChoice.toLowerCase()}`)
          .classList.add("bg-yellow-500");
        document.querySelector(`#computerDiv`).classList.add("bg-yellow-500");
        document.querySelector(`#gameState`).classList.add("text-black");
        document.querySelector(`#computerChoice`).classList.add("text-black");
        // Remove Color
        setTimeout(() => {
          document
            .querySelector(`#${playerChoice.toLowerCase()}`)
            .classList.remove("bg-yellow-500");
          document
            .querySelector(`#computerDiv`)
            .classList.remove("bg-yellow-500");
          document.querySelector(`#gameState`).classList.remove("text-black");
          document
            .querySelector(`#computerChoice`)
            .classList.remove("text-black");
        }, 1500);
        break;
    }

    // DEBUGGING
    console.log("==================");
    console.log(playerChoice, ": Player choice");
    console.log(computerChoice, ": Computer choice");
    console.log(outcome, ": Game outcome");
    console.log("==================");
  }

  // CLICK HANDLERS
  document.querySelector("#rock").onclick = () => {
    let userOption = 0;
    let machineOption = generator(0, 4);
    game(userOption, machineOption);
  };
  document.querySelector("#paper").onclick = () => {
    let userOption = 1;
    let machineOption = generator(0, 4);
    game(userOption, machineOption);
  };
  document.querySelector("#scissors").onclick = () => {
    let userOption = 2;
    let machineOption = generator(0, 4);
    game(userOption, machineOption);
  };
  document.querySelector("#lizard").onclick = () => {
    let userOption = 3;
    let machineOption = generator(0, 4);
    game(userOption, machineOption);
  };
  document.querySelector("#spock").onclick = () => {
    let userOption = 4;
    let machineOption = generator(0, 4);
    game(userOption, machineOption);
  };

  //

  // Score
  localStorage.setItem("credits", 100);
  let outcome = (o) => {
    let credits = +localStorage.getItem("credits") || 100;
    if (o == "WIN") {
      credits += 10;
      // add points (change credits in local storage)
      // update credits in id credits

      localStorage.setItem("credits", localStorage.getItem("credits") + 10);
      document.getElementById("addCredits").innerText = localStorage.getItem(
        "credits"
      );
    } else if (o == "LOSS") {
      credits -= 10;
      localStorage.setItem("credits", localStorage.getItem("credits") - 10);
      document.getElementById("addCredits").innerText = localStorage.getItem(
        "credits"
      );
    }
  };

  // let outcome = (o) => {
  //   let credits = +localStorage.getItem("credits") || 0;

  //   if (o == "WIN") {
  //     credits += 10;
  //     localStorage.setItem("credits", localStorage.getItem("credits") + 10);
  //     document.getElementById("credits").innerText = localStorage.getItem(
  //       "credits"

  //   } else if (o == "LOSS") {
  //     credits -= 10;
  //   }
  //   localStorage.setItem("credits", localStorage.getItem("credits") - 10);
  //     document.getElementById("credits").innerText = localStorage.getItem(
  //       "credits"

  // };

  //
})();
