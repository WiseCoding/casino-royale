function getInfo(){
    var getInfo = {
     "data1": name,
     "data2": credit,
     "data3": prize,
    }
    localStorage.getItem(getInfo);
}

function getName(){
    var user_name = 'username';
    var player = localStorage.getItem(user_name);
    if(!player) {
    player = prompt("Please enter your name");
    alert('Welcome' + player + "!");
    localStorage.setItem('user_name', player);
}
   else {

   }
   function getName() {
       var player = prompt("Please enter your name");
       if (player!= null)
       alert("Welcome" + player + "!");
       localStorage.setItem('username', player);
   }
    

function getCredit() {

}