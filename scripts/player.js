(() => {
  // GET PLAYER INFO
  function getPlayer(credits) {
    let player = localStorage.getItem('username');
    if (!player) {
      player = prompt('Please enter your name');
      document.querySelector('#userName').innerHTML = player;
      localStorage.setItem('username', player);
      localStorage.setItem('credits', credits);
      document.querySelector('#credits').innerHTML = credits;
    } else {
      document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
      document.querySelector('#userName').innerHTML = player;
    }
  }

  function getCredits() {
    return localStorage.getItem('credits');
  }

  function addCredits(newCredits) {
    const oldCredits = localStorage.getItem('credits');
    localStorage.setItem('credits', Number(oldCredits) + newCredits);
    document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
  }

  // GET-SET PLAYER & STARTING CREDITS (100)
  getPlayer(100);

  document.querySelector('#addCredits').onclick = () => {
    addCredits(100);
  };

  //
})();
