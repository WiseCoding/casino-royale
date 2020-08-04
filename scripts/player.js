(() => {
  // LOGIN FUNCTIONALITY
  function getPlayer(startCredits) {
    let player = localStorage.getItem('username');
    if (!player) {
      player = prompt('Please enter your name');
      document.querySelector('#userName').innerHTML = player;
      localStorage.setItem('username', player);
      localStorage.setItem('credits', startCredits);
      document.querySelector('#credits').innerHTML = startCredits;
    } else {
      document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
      document.querySelector('#userName').innerHTML = player;
    }
  }

  // CREDITS FUNCTIONALITY
  function getCredits() {
    return localStorage.getItem('credits');
  }
  function addCredits(newCredits) {
    const oldCredits = localStorage.getItem('credits');
    localStorage.setItem('credits', Number(oldCredits) + newCredits);
    document.querySelector('#credits').innerHTML = localStorage.getItem('credits');
  }

  //

  // GET+SET USERNAME & STARTING CREDITS
  getPlayer(100);

  // ADD CREDITS BUTTON
  document.querySelector('#addCredits').onclick = () => {
    addCredits(100);
  };

  //
})();
