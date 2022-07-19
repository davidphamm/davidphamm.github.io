let score = 0;
let highScore = 0; 
let timeLeft = 10;
let timerInterval;
let correctAnswer = 0;

// SAVES HIGH SCORE //
window.onload = function () {
  let scoreFromBrowser = localStorage.getItem("highScore");
  if (scoreFromBrowser != undefined) highScore = scoreFromBrowser
  document.getElementById("highScore").innerHTML = "High Score:  " + highScore;
}

// GAME START //
function startGame() {
  
  newQuestion();
  document.getElementById('startBtn').disabled = true;


  let countdown = document.getElementById("countdown");
  countdown.hidden = false;
  let timerInterval = setInterval(function() {
    timeLeft -= 1;
    countdown.innerHTML = "Time remaining: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("btn1").disabled = true;
      document.getElementById("btn2").disabled = true;
      document.getElementById("btn3").disabled = true;
      document.getElementById("btn4").disabled = true;
      document.getElementById('startBtn').disabled = false;
      document.getElementById("result").innerHTML = "Game over!";
      window.alert("You scored " + score + " ! ");
      window.location.reload()
    }
  }, 1000);
}

function newQuestion() {
  let operationDiv = document.getElementById("operation");
  let firstNum = Math.ceil(Math.random() * 10);
  let secondNum = Math.ceil(Math.random() * 10);
  correctAnswer = firstNum + secondNum;
  operationDiv.innerHTML = firstNum + " + " + secondNum + " = ?";

  let wrongAnswer1 = Math.ceil(Math.random() * 10) + Math.ceil(Math.random() + 10);
  let wrongAnswer2 = Math.ceil(Math.random() * 10) + Math.ceil(Math.random() + 10);
  let wrongAnswer3 = Math.ceil(Math.random() * 10) + Math.ceil(Math.random() + 10);
  let wrongAnswer4 = Math.ceil(Math.random() * 10) + Math.ceil(Math.random() + 10);

  document.getElementById("btn1").innerHTML = wrongAnswer1;
  document.getElementById("btn2").innerHTML = wrongAnswer2;
  document.getElementById("btn3").innerHTML = wrongAnswer3;
  document.getElementById("btn4").innerHTML = wrongAnswer4;

  let correctAnswerIndex = Math.floor(Math.random() * 4) + 1;
  let correctAnswerID = "btn" + correctAnswerIndex;
  document.getElementById(correctAnswerID).innerHTML = correctAnswer;
}

function checkAnswer(buttonIndex) {
  let answer = document.getElementById("btn" + buttonIndex).innerHTML;
  if (answer == correctAnswer) {
    document.getElementById("result").innerHTML = "Correct!";
    score += 1;
    timeLeft += 1;
  } else {
    document.getElementById("result").innerHTML = "Wrong!";
  };
  document.getElementById("score").innerHTML = "Current Score: " + score;
  if (score > highScore) highScore = score;
  localStorage.setItem("highScore", highScore)
  document.getElementById("highScore").innerHTML = "High Score:  " + highScore;
  newQuestion();
}
