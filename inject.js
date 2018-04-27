// pick the words to replace
const loopText = elementType => {
  const elements = document.querySelectorAll(elementType);
  for (let i = 0; i < elements.length; i += 1) {
    if (
      elements[i].innerHTML.indexOf("class=") === -1 &&
	  elements[i].innerHTML.indexOf("id=") === -1 &&
	  elements[i].innerHTML.indexOf("src=") === -1
    ) {
      elements[i].innerHTML = elements[i].innerHTML.replace(/hello/gi, "howdy");
      elements[i].innerHTML = elements[i].innerHTML.replace(/your/gi, "y'alls");
      elements[i].innerHTML = elements[i].innerHTML.replace(/you/gi, "y'all");
      elements[i].innerHTML = elements[i].innerHTML.replace(/the/gi, "tha");
      elements[i].innerHTML = elements[i].innerHTML.replace(/to/gi, "ta");
	//   elements[i].innerHTML = elements[i].innerHTML.replace(/er /gi, "a ");
	  elements[i].innerHTML = elements[i].innerHTML.replace(/if /gi, "if'n ");
	  elements[i].innerHTML = elements[i].innerHTML.replace(/ing/gi, "in'");
	  elements[i].innerHTML = elements[i].innerHTML.replace(/for/gi, "fer");
	  elements[i].innerHTML = elements[i].innerHTML.replace(/ and /gi, " n' ");
	//   elements[i].innerHTML = elements[i].innerHTML.replace(/ly /gi, " like ");
    }
  }
};
// replace the words
loopText("p");
loopText("a");
loopText("h1");
loopText("h2");
loopText("h3");
loopText("h4");
loopText("h5");
loopText("h6");
loopText("span"); // problem with changing class names and ruining css *fixed
loopText("section");
loopText("div");

// create the bird
class Bird {
  constructor() {
    this.bird = document.createElement("img");
    this.bird.src = "https://media0.giphy.com/media/W8fWP13NK8og/200w.webp";
    this.bird.id = "bird";
    this.bird.style.position = "fixed";
    // initialize size of bird
    this.bird.style.width = "150px";
    this.bird.style.height = "100px";
    this.bird.style.cursor =
      'url("https://png.icons8.com/color/100/centre-of-gravity.png") 50 50, auto';
    // make sure bird is on top of all other elements
    this.bird.style.zIndex = "9001";
    document.body.appendChild(this.bird);
  }

  startListener() {
    document.getElementById("bird").addEventListener("click", function() {
      if (!friendMode) {
        // Create dead bird image at the bottom of the screen at the same x position of clicked bird
        let deadBird = document.createElement("img");
        deadBird.style.height = "80px";
        deadBird.style.width = "80px";
        deadBird.style.position = "fixed";
        deadBird.style.zIndex = "9001";
        let yPosition = document.getElementById("bird").getBoundingClientRect()
          .top;
        deadBird.style.top = yPosition + "px";
        let xPosition = document.getElementById("bird").getBoundingClientRect()
          .left;
        deadBird.style.left = xPosition + "px";
        deadBird.src =
          "https://pre00.deviantart.net/4143/th/pre/i/2016/020/8/0/dead_bird_by_angi_shy-d9ilni4.png";
        document.body.appendChild(deadBird);
        // Delete bird from document
        var toDelete = document.getElementById("bird");
        toDelete.parentElement.removeChild(toDelete);
        // disable hunter button
        friendButton.disabled = true;
        gameButton.disabled = true;
        // Fade and delete deadBird
        var opacity = 1;
        var timer2 = setInterval(() => {
          opacity -= 0.05;
          deadBird.style.opacity = opacity.toString();
        }, 100);
        setTimeout(function() {
          deadBird.parentElement.removeChild(deadBird);
          clearInterval(timer2);
        }, 2000);
        // Update score
        score += 100;
        scoreText.textContent = "Score: " + score;
        // Create new bird and start listener
        setTimeout(function() {
          reverseLeft = false;
          friendButton.disabled = false;
          gameButton.disabled = false;
          obj = new Bird();
          obj.startListener();
        }, 2500);
      } else {
        obj.bird.src =
          "https://media3.giphy.com/media/3ohs4lsx1eqH1BeYDu/200w.webp";
        setTimeout(() => {
          obj.bird.src =
            "https://media3.giphy.com/media/3o7WIsrT3ap5QOXEbK/200w.webp";
        }, 500);
        // Create heart that floats upward and disappears
        let heart = document.createElement("img");
        heart.id = "heart";
        heart.src = "https://png.icons8.com/cotton/2x/hearts.png";
        heart.style.height = "100px";
        heart.style.width = "100px";
        heart.style.zIndex = "10000";
        heart.style.opacity = "0.8";
        heart.style.position = "fixed";
        let yPosition = document.getElementById("bird").getBoundingClientRect()
          .top;
        heart.style.top = yPosition + "px";
        let xPosition = document.getElementById("bird").getBoundingClientRect()
          .left;
        heart.style.left = xPosition + "px";
        document.body.appendChild(heart);
        // Update score
        score += 100;
        scoreText.textContent = "Score: " + score;
        // Animate upwards
        var timer = setInterval(() => {
          yPosition -= 1;
          heart.style.top = yPosition + "px";
        }, 5);
        setTimeout(() => {
          clearInterval(timer);
          heart.parentElement.removeChild(heart);
        }, 5000);
      }
    });
  }
}
let obj = new Bird();
obj.startListener();

// bird moving variables
let randomInsideTop = Math.floor(Math.random() * window.innerHeight - 100);
let randomInsideLeft = Math.floor(Math.random() * window.innerWidth - 150);
let birdTop = randomInsideTop;
let birdLeft = randomInsideLeft;
let reverseLeft = false;
let reverseTop = false;
// move the bird
setInterval(() => {
  if (birdTop === window.innerHeight) birdTop = 0;
  if (birdTop < -50) birdTop = window.innerHeight - 150;
  if (birdLeft === window.innerWidth) birdLeft = 0;
  if (birdLeft < -100) birdLeft = window.innerWidth - 200;
  if (reverseTop) birdTop -= 1;
  else birdTop += 1;
  if (reverseLeft) birdLeft -= 1;
  else birdLeft += 1;
  obj.bird.style.top = birdTop.toString() + "px";
  obj.bird.style.left = birdLeft.toString() + "px";
}, 5);
// change the birds direction randomly
setInterval(() => {
  if (randomNumber() > 50) {
    reverseTop = !reverseTop;
  }
  if (randomNumber() > 50) {
    reverseLeft = !reverseLeft;
    if (reverseLeft) obj.bird.style.transform = "scale(-1, 1)";
    if (!reverseLeft) obj.bird.style.transform = "scale(1, 1)";
  }
}, 1000);

// random number generator 0 - 99;
const randomNumber = () => {
  return Math.floor(Math.random() * 100);
};

// create a score div
let score = 0;
const scoreDiv = document.createElement("div");
scoreDiv.id = "score-div";
scoreDiv.style.all = "initial";
scoreDiv.style.position = "fixed";
scoreDiv.style.bottom = "15px";
scoreDiv.style.right = "15px";
scoreDiv.style.backgroundColor = "black";
scoreDiv.style.border = "1px solid pink";
scoreDiv.style.color = "white";
scoreDiv.style.zIndex = "9001";
scoreDiv.style.width = "150px";
scoreDiv.style.height = "40px";
scoreDiv.style.textAlign = "center";
scoreDiv.style.fontSize = "20px";
scoreDiv.style.fontFamily = "Arial";
scoreDiv.style.borderRadius = "3px";
scoreDiv.style.opacity = ".75";
document.body.appendChild(scoreDiv);
// create score text
const scoreText = document.createElement("p");
scoreText.id = "score-text";
scoreText.style.fontSize = "20px";
scoreText.textContent = "Score: " + score;
scoreText.style.marginTop = "7.5px";
document.getElementById("score-div").appendChild(scoreText);
// Creating button to start friendly mode
let friendMode = false;
const friendButton = document.createElement("button");
friendButton.id = "friend";
friendButton.style.all = "initial";
friendButton.style.position = "fixed";
friendButton.style.bottom = "70px";
friendButton.style.right = "15px";
friendButton.style.backgroundColor = "pink";
friendButton.style.border = "1px solid black";
friendButton.innerHTML = "Friendly Mode";
friendButton.style.zIndex = "9001";
friendButton.style.width = "150px";
friendButton.style.height = "40px";
friendButton.style.textAlign = "center";
friendButton.style.fontSize = "15px";
friendButton.style.fontFamily = "Arial";
friendButton.style.borderRadius = "3px";
friendButton.style.opacity = ".75";
friendButton.style.cursor = "pointer";
document.body.appendChild(friendButton);

const miniAndMap = document.createElement('div');
miniAndMap.id = 'mini-and-map';
document.body.appendChild(miniAndMap);

const minimizeBar = document.createElement("div");
minimizeBar.id = "minimize-bar";
minimizeBar.style.all = "initial";
minimizeBar.style.position = "fixed";
minimizeBar.style.bottom = "0";
minimizeBar.style.backgroundColor = "gainsboro";
minimizeBar.style.left = 0;
minimizeBar.style.border = "1px solid grey";
minimizeBar.style.width = "30%";
minimizeBar.style.height = "25px";
minimizeBar.textContent = "Click to Show/Hide Map";
minimizeBar.style.color = 'dimgrey'
minimizeBar.style.fontFamily = "Arial";
minimizeBar.style.textAlign = 'center';
minimizeBar.style.borderRadius = "3px";
minimizeBar.style.fontStyle = 'italic';
minimizeBar.style.cursor = 'pointer';
minimizeBar.style.zIndex = "8000";
minimizeBar.style.opacity = ".75";
document.getElementById('mini-and-map').appendChild(minimizeBar);

let mini = true;
document.getElementById("minimize-bar").addEventListener("click", () => {
  if (!mini) {
    map.style.height = "0%";
	minimizeBar.style.bottom = "0px";
	mini = true;
  } else {
    map.style.height = "30%";
	minimizeBar.style.bottom = "30%";
	mini = false;
  }
});

// google maps
var map = document.createElement("iframe");
map.style.bottom = 0;
map.style.left = 0;
map.style.width = "30%";
map.style.height = "0";
map.style.position = "fixed";
map.style.zIndex = "8000";
map.style.opacity = "0.85";
map.src =
  "https://www.google.com/maps/embed/v1/search?key=AIzaSyD4Jw54Phc2tqgel6_3WVRlYiK8mCZa4h0&q=state+park&maptype=satellite";
document.getElementById('mini-and-map').appendChild(map);

// make map draggable
//Make the DIV element draggagle:
// dragElement(document.getElementById(("minimize-bar")));
// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     elmnt.onmousedown = dragMouseDown;
//   function dragMouseDown(e) {
//     e = e || window.event;
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }





// Listener for button
document.getElementById("friend").addEventListener("click", function() {
  if (friendMode) {
    friendMode = !friendMode;
    friendButton.innerHTML = "Friendly Mode";
    map.src =
      "https://www.google.com/maps/embed/v1/search?key=AIzaSyD4Jw54Phc2tqgel6_3WVRlYiK8mCZa4h0&q=state+park&maptype=satellite";
    obj.bird.style.cursor =
      'url("https://png.icons8.com/color/100/centre-of-gravity.png") 50 50, auto';
    obj.bird.src = "https://media0.giphy.com/media/W8fWP13NK8og/200w.webp";
  } else {
    friendMode = !friendMode;
    friendButton.innerHTML = "Hunter Mode";
    map.src =
      "https://www.google.com/maps/embed/v1/search?key=AIzaSyD4Jw54Phc2tqgel6_3WVRlYiK8mCZa4h0&q=flowers+shop";
    obj.bird.style.cursor =
      'url("https://i.giphy.com/media/3ohhwi3y04VuY4dWIo/100_s.gif") 25 25, auto';
    obj.bird.src =
      "https://media3.giphy.com/media/3o7WIsrT3ap5QOXEbK/200w.webp";
  }
});

// turn on and off
let running = true;
const gameButton = document.createElement("button");
gameButton.id = "game";
gameButton.style.all = "initial";
gameButton.style.position = "fixed";
gameButton.style.bottom = "120px";
gameButton.style.right = "15px";
gameButton.style.backgroundColor = "orange";
gameButton.style.border = "1px solid blue";
gameButton.innerHTML = "End";
gameButton.style.zIndex = "9001";
gameButton.style.width = "150px";
gameButton.style.height = "40px";
gameButton.style.textAlign = "center";
gameButton.style.fontSize = "15px";
gameButton.style.fontFamily = "Arial";
gameButton.style.borderRadius = "3px";
gameButton.style.opacity = ".75";
gameButton.style.cursor = "pointer";
document.body.appendChild(gameButton);

// listener for turn off and on
document.getElementById("game").addEventListener("click", function() {
  if (running) {
    running = !running;
    gameButton.innerHTML = "Start";
    friendButton.innerHTML = "Friendly Mode";
    friendMode = false;
    friendButton.disabled = true;
    score = 0;
    scoreText.textContent = "Score: " + score;
    // Delete bird from document
    var toDelete = document.getElementById("bird");
    toDelete.parentElement.removeChild(toDelete);
  } else {
    running = !running;
    gameButton.innerHTML = "End";
    friendButton.disabled = false;
    obj = new Bird();
    obj.startListener();
  }
});
