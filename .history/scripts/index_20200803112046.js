// CARD Click Events
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

// USER Creation
// function getName(){
//   var user_name = 'username';
//   var player = localStorage.getItem(user_name);
//   if(!player) {
//   player = prompt("Please enter your name");
//   localStorage.setItem('user_name', player);
// }
//  else {

//  }
// }
function getName() {
  var player = prompt("Please enter your name");
  if (player!= null) {
  alert("Welcome" + player + "!");
  }
  localStorage.setItem('username', player);
}