// CARD Click Events
document.querySelector("#card1").onclick = () => {
  window.location = "html/1-rpsls.html";
};
document.querySelector("#card2").onclick = () => {
  window.location = "html/2-twentyone.html";
};
document.querySelector("#card3").onclick = () => {
  window.location = "html/3-memory.html";
};
document.querySelector("#card4").onclick = () => {
  window.location = "html/4-blocks.html";
};

function getInfo() {
  var player = localStorage.getItem("username");
  if (!player) {
    player = prompt("Please enter your name");
    document.getElementById("userName").innerHTML = player;
    localStorage.setItem("username", player);
    localStorage.setItem("credit", 100);
  } else {
    document.getElementById("credits").innerHTML = localStorage.getItem(
      "credit"
    );
    document.getElementById("credits").style.color = "white";

    document.getElementById("userName").innerHTML = player;
    //  alert(`Player ${player} is logged`);
  }
}

function getCredit() {
  return localStorage.getItem("credit");
}

function setCredit(credit) {
  localStorage.setItem("credit", credit);
}

getInfo();
