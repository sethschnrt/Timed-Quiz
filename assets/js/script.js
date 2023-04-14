// Variable Section that lets me target HTML IDs
var quizSection = document.getElementById("timedQuiz");
var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timerCount");
var mainEl = document.getElementById("main");
var childElements = quizSection.children;
var scoreForm = document.getElementById("score");
var endGameContainer = document.getElementById("endGame");
var alertDivContainer = document.getElementById("alert");
// Variable that gives me a starting amount on my timer
var timerCount = 60;
var score;

// Object variable for my questions, along with thier answer options, and the correlated correct answer.
var quizQuestions = [
  {
    question: "CSS sections are enclosed between what type of character? :",
    answerChoices: [
      "1. Parenthesis",
      "2. Square Brackets",
      "3. Curly Brackets",
      "4. Angle Brackets",
    ],
    correctAnswer: "3. Curly Brackets",
  },
  {
    question: "Commonly used data types DO NOT include:",
    answerChoices: ["1. Strings", "2. Alerts", "3. Booleans", "4. Numbers"],
    correctAnswer: "2. Alerts",
  },
  {
    question: "Arrays in JavaScript can be used to store _____:",
    answerChoices: [
      "1. Numbers and Strings",
      "2. Other Arrays",
      "3. Booleans",
      "4. All of the above",
    ],
    correctAnswer: "4. All of the above",
  },
  {
    question:
      "A very useful tool for development and debugging for printing content to the debugger:",
    answerChoices: [
      "1. Console.log",
      "2. Terminal/Bash",
      "3. For Loops",
      "4. JavaScript",
    ],
    correctAnswer: "1. Console.log",
  },
];
// This variable lets me increment through the questions above by assigning them an integer based on thier position.
var currentQuestion = 0;
// This is the master function. This function is the hub for all the other fuctions that have there own responsibilities.
function startQuiz(event) {
  console.log("start game");
  event.preventDefault();
  startTimer();
  generateQuestion();
}

var timer;
// This function increments the timerCount variable by negative 1 each second and displays a string based on what the user should see.
function startTimer() {
  timer = setInterval(function () {
    if (timerCount > 1) {
      timerEl.textContent = timerCount + " seconds remaining.";
      timerCount--;
    } else if (timerCount === 1) {
      timerEl.textContent = timerCount + " second remaining.";
      timerCount--;
    } else {
      endGame();
      quizSection.innerHTML = "";
    }
  }, 1000);
}

function generateQuestion() {
  quizSection.innerHTML = "";
  var question = quizQuestions[currentQuestion].question;
  var multiChoice = document.createElement("div");
  multiChoice.textContent = question;
  multiChoice.setAttribute("id", "multiChoice");
  quizSection.appendChild(multiChoice);
  generateAnswerChoices();
}

function generateAnswerChoices() {
  for (
    let i = 0;
    i < quizQuestions[currentQuestion].answerChoices.length;
    i++
  ) {
    var answerChoices = quizQuestions[currentQuestion].answerChoices;

    var choice = document.createElement("button");
    choice.setAttribute("id", "choice");
    choice.textContent = answerChoices[i];
    choice.addEventListener("click", function (event) {
      var userChoice = event.target.textContent;
      console.log(userChoice);
      var alertDiv = document.createElement("div");
      var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
      if (userChoice === correctAnswer) {
        alertDivContainer.textContent = "The last answer was correct!";
      } else {
        alertDivContainer.textContent = "The last answer was wrong!";
        timerCount -= 10;
      }
      if (currentQuestion >= quizQuestions.length - 1) {
        endGame();
        for (let i = childElements.length - 1; i >= 0; i--) {
          quizSection.removeChild(childElements[i]);
        }
      } else {
        currentQuestion++;
        generateQuestion();
      }
    });
    quizSection.appendChild(choice);
  }
}

endGameContainer.style.display = "none";
var result = document.getElementById("result");

function endGame() {
  clearInterval(timer);
  timerEl.textContent = "";
  endGameContainer.style.display = "block";
  quizSection.display = "none";
  var endGameDisplay = document.createElement("div");
  quizSection.appendChild(endGameDisplay);
  score = timerCount;
  result.innerHTML = "You got a score of: " + score;
  score.display = "inline";
}

var initialsBtn = document.getElementById("initialsBtn");
var initialsInput = document.getElementById("initialsInput");

initialsBtn.addEventListener("click", saveScore);


function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    initials: initialsInput.value,
    score: timerCount,
  };
  var scoreHistory = JSON.parse(localStorage.getItem("score"));
  if (scoreHistory == null || scoreHistory == undefined) {
    scoreHistory = [];
  }
  scoreHistory.push(scoreObj);
  localStorage.setItem("score", JSON.stringify(scoreHistory));
  getScore();
  
}

function getScore() {
  
    var score = JSON.parse(window.localStorage.getItem("score"));
  console.log(score);
  var scoreBoard = document.createElement("ul");

  for(let i = 0; i < score.length; i++) {
  var li = document.createElement("li");
  li.innerHTML = `${score[i].initials} - ${score[i].score}`;
  //scoreBoard.append(li)
  endGameContainer.append(li);
  }
}
startBtn.addEventListener("click", startQuiz);

scoreForm.addEventListener("submit", score);
