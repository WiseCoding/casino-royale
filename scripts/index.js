(() => {
  // CARD CLICK EVENTS
  document.querySelector('#card1').onclick = () => {
    window.location = 'html/1-rpsls.html';
  };
  document.querySelector('#card2').onclick = () => {
    window.location = 'html/2-twentyone.html';
  };
  document.querySelector('#card3').onclick = () => {
    window.location = 'html/3-memory.html';
  };
  document.querySelector('#card4').onclick = () => {
    window.location = 'html/4-blocks.html';
  };

  // SET POINT BADGES
  let [points1, points2, points3, points4] = [
    localStorage.getItem('gamePoints1'),
    localStorage.getItem('gamePoints2'),
    localStorage.getItem('gamePoints3'),
    localStorage.getItem('gamePoints4'),
  ];
  let [elem1, elem2, elem3, elem4] = [
    document.querySelector('#label1'),
    document.querySelector('#label2'),
    document.querySelector('#label3'),
    document.querySelector('#label4'),
  ];
  !points1 ? (elem1.textContent = 'First time') : (elem1.textContent = points1);
  !points2 ? (elem2.textContent = 'First time') : (elem2.textContent = points2);
  !points3 ? (elem3.textContent = 'First time') : (elem3.textContent = points3);
  !points4 ? (elem4.textContent = 'First time') : (elem4.textContent = points4);

  //
})();
