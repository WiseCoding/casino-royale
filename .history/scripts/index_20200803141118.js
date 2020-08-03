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


function getName(){
  var user_name = 'username';
  var user_credit='credit';

  var player = localStorage.getItem(user_name);
  if(!player) {
  player = prompt("Please enter your name");
  document.getElementById("userName").innerHTML= player;
  localStorage.setItem(user_name, player);
  localStorage.setItem(user_credit, 100);

}
 else {
   var credit = localStorage.getItem(user_credit);
   document.getElementById("credits").innerHTML = credit;
   document.getElementById("credits").style.color= "white";
  //  alert(`Player ${player} is logged`);
 }
}
getName() 
  
function getCredit() {
  var score = 100;

}
  functions 
  1 to add credits other for take credits 