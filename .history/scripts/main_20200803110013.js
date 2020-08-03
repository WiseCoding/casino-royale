function getInfo(){
    var getInfo = {
     "data1": name,
     "data2": credit,
     "data3": prize,
    }
    localStorage.getItem(getInfo);
}

function getName(){
    var player = prompt("Please enter your name", " ");
    if(player!= null) {
        alert("Welcome" + player + "!");
    }
  }

function getCredit() {

}