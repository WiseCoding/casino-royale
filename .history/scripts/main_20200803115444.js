function getInfo(){
    var getInfo = {
     "data1": name,
     "data2": credit,
     "data3": prize,
    }
    localStorage.getItem(getInfo);
}

// function getName(){
//     var user_name = 'username';
//     var player = localStorage.getItem(user_name);
//     if(!player) {
//     player = prompt("Please enter your name");
//     alert('Welcome' + player + "!");
//     localStorage.setItem('user_name', player);
// }
//    else {

//    } 

   
function getName(){
    var user_name = 'username';
    var user_credit='credit';
  
    var player = localStorage.getItem(user_name);
    if(!player) {
    player = prompt("Please enter your name");
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