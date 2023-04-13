// Variable Section that lets me target HTML IDs
var quizSection = document.getElementById("timedQuiz");
var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timerCount");
var mainEl = document.getElementById("main");
var childElements = quizSection.children;
var scoreForm = document.getElementById("score");
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
  generateAnswerChoices();
  validateAnswer();
}
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
      timerEl.textContent = "";
      endGame();
    }
  }, 1000);
}

function generateQuestion() {
  var question = quizQuestions[currentQuestion].question;
  var multiChoice = document.createElement("div");
  multiChoice.textContent = question;
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
    choice.textContent = answerChoices[i];
    choice.addEventListener("click", function () {
      validateAnswer(choice);
    });
    quizSection.appendChild(choice);
  }
}

function validateAnswer(event) {
  event.preventDefault();
  var userChoice = event.target.textContent;
  console.log(userChoice);
  var alertDiv = document.createElement("div");
  var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (userChoice === correctAnswer) {
    var correctAnswer = alert("Correct!");
    alertDiv.innerHTML = correctAnswer;
  } else {
    var wrongAnswer = alert("Wrong answer.");
    alertDiv.innerHTML = wrongAnswer;
    timerCount -= 10;
  }
  currentQuestion++;
  if (currentQuestion === quizQuestions.length) {
    endGame();
    for (let i = childElements.length - 1; i >= 0; i--) {
      quizSection.removeChild(childElements[i]);
    }
  }
  generateQuestion();
}

function endGame() {
  quizSection.display = "none";
  var endGameDisplay = document.createElement("div");
  quizSection.appendChild(endGameDisplay);

  score = timerCount;
  score.display = "inline";
}

function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    initials: event.target.children[0].value,
    score: timerCount,
  };
  localStorage.setItem("score", JSON.stringify(scoreObj));
}

function getScore() {
  var score = JSON.parse(localStorage.getItem("score"));
  endGameDisplay.appendChild(score);
}
startBtn.addEventListener("click", startQuiz);

scoreForm.addEventListener("submit", score);
