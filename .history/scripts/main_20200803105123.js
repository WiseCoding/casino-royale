function getInfo(){
    var getInfo = {
     "data1": name,
     "data2": credit,
     "data3": prize,
    }
    localStorage.getItem(getInfo);
}

function getName() {
    var playerName = prompt("Please enter your name", " ");
    if(playerName!= null) {
        alert("Welcome" + "playerName!" )
    }
}

function getCredit() {

}