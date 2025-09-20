let questionsList = [];
let currentQuestionIndex = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const progressEl = document.getElementById("progress");
const submitBtn = document.getElementById("submit-button");

fetch("quiz.json")
  .then((response) => response.json())
  .then((data) => {
    questionsList = data;
    answerEl.disabled = false;
    submitBtn.disabled = false;
    loadQuestion();
  })
  .catch((error) => {
    progressEl.textContent = "Erro ao carregar o quiz.";
    console.error(error);
  });

function loadQuestion() {
  if (currentQuestionIndex >= questionsList.length) {
    questionEl.textContent = "Parabéns! Você finalizou esse quiz.";
    progressEl.textContent = "";
    answerEl.style.display = "none";
    submitBtn.style.display = "none";
    return;
  }

  const currentQuestion = questionsList[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  progressEl.textContent = `${currentQuestionIndex + 1}/${questionsList.length}`;
  answerEl.value = "";
  answerEl.focus();
}

function checkAnswer() {
  const userAnswer = answerEl.value.trim().toLowerCase();
  const correctAnswer = questionsList[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer && userAnswer !== "") {
    launchConfetti(submitBtn);
    currentQuestionIndex++;
    loadQuestion();
  } else {
    answerEl.classList.add("input-error");
    setTimeout(() => {
      answerEl.classList.remove("input-error");
    }, 300);
    answerEl.focus();
  }
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  checkAnswer();
});

answerEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
});