const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  { question: "What is the capital of France?", answers: [{ text: "London", correct: false }, { text: "Berlin", correct: false }, { text: "Paris", correct: true }, { text: "Madrid", correct: false }] },
  { question: "Which planet is known as the Red Planet?", answers: [{ text: "Venus", correct: false }, { text: "Mars", correct: true }, { text: "Jupiter", correct: false }, { text: "Saturn", correct: false }] },
  { question: "What is the largest ocean on Earth?", answers: [{ text: "Atlantic Ocean", correct: false }, { text: "Indian Ocean", correct: false }, { text: "Arctic Ocean", correct: false }, { text: "Pacific Ocean", correct: true }] },
  { question: "Which of these is NOT a programming language?", answers: [{ text: "Java", correct: false }, { text: "Python", correct: false }, { text: "Banana", correct: true }, { text: "JavaScript", correct: false }] },
  { question: "What is the chemical symbol for gold?", answers: [{ text: "Go", correct: false }, { text: "Gd", correct: false }, { text: "Au", correct: true }, { text: "Ag", correct: false }] },
  { question: "Who wrote 'Romeo and Juliet'?", answers: [{ text: "Shakespeare", correct: true }, { text: "Hemingway", correct: false }, { text: "Tolkien", correct: false }, { text: "Dickens", correct: false }] },
  { question: "Which country gifted the Statue of Liberty to the USA?", answers: [{ text: "France", correct: true }, { text: "UK", correct: false }, { text: "Germany", correct: false }, { text: "Canada", correct: false }] },
  { question: "What is the smallest prime number?", answers: [{ text: "1", correct: false }, { text: "2", correct: true }, { text: "3", correct: false }, { text: "0", correct: false }] },
  { question: "What is the speed of light?", answers: [{ text: "300,000 km/s", correct: true }, { text: "150,000 km/s", correct: false }, { text: "1,000 km/s", correct: false }, { text: "30,000 km/s", correct: false }] },
  { question: "Which element has the atomic number 1?", answers: [{ text: "Helium", correct: false }, { text: "Hydrogen", correct: true }, { text: "Oxygen", correct: false }, { text: "Carbon", correct: false }] },
  { question: "What is the tallest mountain in the world?", answers: [{ text: "K2", correct: false }, { text: "Mount Everest", correct: true }, { text: "Kangchenjunga", correct: false }, { text: "Lhotse", correct: false }] },
  { question: "Which gas do humans exhale?", answers: [{ text: "Oxygen", correct: false }, { text: "Carbon Dioxide", correct: true }, { text: "Nitrogen", correct: false }, { text: "Hydrogen", correct: false }] },
  { question: "Which is the largest continent?", answers: [{ text: "Africa", correct: false }, { text: "Asia", correct: true }, { text: "Europe", correct: false }, { text: "Antarctica", correct: false }] },
  { question: "Who painted the Mona Lisa?", answers: [{ text: "Leonardo da Vinci", correct: true }, { text: "Michelangelo", correct: false }, { text: "Raphael", correct: false }, { text: "Van Gogh", correct: false }] },
  { question: "Which is the fastest land animal?", answers: [{ text: "Cheetah", correct: true }, { text: "Lion", correct: false }, { text: "Tiger", correct: false }, { text: "Horse", correct: false }] },
  { question: "Which planet has rings?", answers: [{ text: "Saturn", correct: true }, { text: "Mars", correct: false }, { text: "Venus", correct: false }, { text: "Earth", correct: false }] },
  { question: "Who discovered gravity?", answers: [{ text: "Newton", correct: true }, { text: "Einstein", correct: false }, { text: "Galileo", correct: false }, { text: "Tesla", correct: false }] },
  { question: "Which organ purifies blood?", answers: [{ text: "Liver", correct: false }, { text: "Kidney", correct: true }, { text: "Heart", correct: false }, { text: "Lungs", correct: false }] },
  { question: "Which ocean is Bermuda Triangle located in?", answers: [{ text: "Atlantic", correct: true }, { text: "Pacific", correct: false }, { text: "Indian", correct: false }, { text: "Arctic", correct: false }] },
  { question: "Which country is famous for samba dance?", answers: [{ text: "Brazil", correct: true }, { text: "Spain", correct: false }, { text: "Italy", correct: false }, { text: "Mexico", correct: false }] },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let currentQuizQuestions = [];

totalQuestionsSpan.textContent = 5; 
maxScoreSpan.textContent = 5;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  // pick 5 random questions from 20
  currentQuizQuestions = shuffleArray(quizQuestions).slice(0, 5);

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / (currentQuizQuestions.length - 1)) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  answersContainer.querySelectorAll("button").forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score / currentQuizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}