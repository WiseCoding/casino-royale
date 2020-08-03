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
    if(!player) 
    player = prompt("Please enter your name", " ");
    localStorage.setItem('user_name', player);
    }
   else {

   }
    

function getCredit() {

}