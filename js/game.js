const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "eu te amo um montao",
    choice1: "eu sei amor",
    choice2: "fodase lixo feio otario",
    choice3: "sim como soube",
    choice4: "eu ein",
    answer: 1
  },
  {
    question:
      "se por um acaso eu pedisse pra casar ctg tu falaria oq?",
    choice1: "eu nao eca",
    choice2: "papoque",
    choice3: "quero lindo xeiroso me de 2 coreanos da banda kpop",
    choice4: "fique com deus",
    answer: 3
  },
  {
    question: "quer namo?",
    choice1: "sim",
    choice2: "pfv nunca te pedi nada",
    choice3: "se escolher essa a humanidade sera extinta e vc vai viver culpada pra sem quer isso?",
    choice4: "meu sonho desde pequena teamo lindo gato elon musk barreirense salvador da patria",
    answer: 4
  },
  {
    question: "te amo mil milhoes linda perfeita eu quero ta com voce ate eu morrer com alzheimer",
    choice1: "se depender de mim vc sera a pessoa mais amada do planeta terra",
    choice2: "te amo mtmtmtmmt to morrendo de saudades",
    choice3: "pfv nao me machuque meu coraçao please tenho ansiedade depressao",
    choice4: "caso eu que te machuque me desculpa eu sou assim so faço merda (emote de choro)",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Pergunta ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();