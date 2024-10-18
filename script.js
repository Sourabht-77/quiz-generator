document.addEventListener("DOMContentLoaded", () => {
  const frontPage = document.getElementById('front-page');
  const quizSection = document.getElementById('quiz-section');
  const startQuizBtn = document.getElementById('start-quiz-btn');

  // Start quiz button event listener
  startQuizBtn.addEventListener('click', () => {
    console.log("Start Quiz button clicked"); // Debugging log
    frontPage.classList.add('hidden'); // Hide front page
    quizSection.classList.remove('hidden'); // Show quiz section
    loadQuestion(); // Start loading the first quiz question
  });

  // Ensure other functions and elements are correctly interacting
  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const feedbackSection = document.getElementById('feedback-section');
  const feedbackElement = document.getElementById('feedback');
  const restartBtn = document.getElementById('restart-btn');
  const questionNavElement = document.getElementById('question-nav'); // Navigation container

  const quizData = [
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyperlinks and Text Markup Language",
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Tool Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used to link a JavaScript file in HTML?",
      choices: ["<script>", "<link>", "<javascript>", "<js>"],
      answer: "<script>"
    },
    {
      question: "What is the purpose of the <meta> ta in HTML",
      choices: [
        "To include metadata like charset, viewport settings and description",
        "To create a link to a Css file",
        "To include an image in the page",
        "To define a table structure"
      ],
      answer: "To include metadata like charset, viewport settings and description"
    },
    {
      question: "What is the correct way to create a function in JavaScript?",
      choices: [
        "function myFunction() { }",
        "def myFunction() { }",
        "func myFunction() { }",
        "create myFunction() { }"
      ],
      answer: "function myFunction() { }"
    },
    {
      question: "What does document.getElementById() do in JavaScript?",
      choices: [
        "Selects an element by its class.",
        "Selects an element by its tag.",
        "Selects an element by its ID.",
        "Selects all elements of the same type."
      ],
      answer: "Selects an element by its ID."
    },
    {
      question : "Which method is used to update state in a React component?",
      choices: [
        "this.setState()",
        "this.updateState()",
        "this.changeState()",
        "this.stateUpdate()"
      ],
      answer: "this.setState()"
    },
    {
      question: "Which CSS property is used to control the spacing between lines of text?",
      choices: [
        "letter-spacing",
        "line-height",
        "text-indent",
        "text-spacing"
      ],
      answer: "line-height"
    },
    // More IT-related questions can be added here...
  ];

  function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${currentQuiz.question}`;
    choicesElement.innerHTML = '';
    currentQuiz.choices.forEach(choice => {
      const li = document.createElement('li');
      li.classList.add('bg-gray-200', 'px-4', 'py-2', 'rounded', 'cursor-pointer');
      li.textContent = choice;
      li.addEventListener('click', () => checkAnswer(choice));
      choicesElement.appendChild(li);
    });
    updateNavigation();
  }

  function checkAnswer(selectedChoice) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (selectedChoice === correctAnswer) {
      score++;
      markQuestionNav("correct");
    } else {
      markQuestionNav("incorrect");
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showFeedback();
    }
  }

  function showFeedback() {
    document.getElementById('question-section').classList.add('hidden');
    feedbackSection.classList.remove('hidden');
    feedbackElement.textContent = `You scored ${score} out of ${quizData.length}.`;
  }

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('question-section').classList.remove('hidden');
    feedbackSection.classList.add('hidden');
    resetNavigation();
    loadQuestion();
  });

  function createNavigation() {
    questionNavElement.innerHTML = '';
    quizData.forEach((_, index) => {
      const navButton = document.createElement('div');
      navButton.classList.add('w-10', 'h-10', 'border', 'border-gray-400', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'text-lg');
      navButton.textContent = index + 1;
      navButton.addEventListener('click', () => jumpToQuestion(index));
      questionNavElement.appendChild(navButton);
    });
  }

  function markQuestionNav(status) {
    const navButtons = questionNavElement.children;
    if (status === "correct") {
      navButtons[currentQuestion].classList.add('bg-green-500', 'text-white');
    } else {
      navButtons[currentQuestion].classList.add('bg-red-500', 'text-white');
    }
  }

  function updateNavigation() {
    const navButtons = questionNavElement.children;
    Array.from(navButtons).forEach((button, index) => {
      button.classList.remove('bg-yellow-300');
      if (index === currentQuestion) {
        button.classList.add('bg-yellow-300');
      }
    });
  }

  function jumpToQuestion(index) {
    currentQuestion = index;
    loadQuestion();
  }

  function resetNavigation() {
    const navButtons = questionNavElement.children;
    Array.from(navButtons).forEach(button => {
      button.classList.remove('bg-green-500', 'bg-red-500', 'text-white', 'bg-yellow-300');
    });
  }

  createNavigation();
});
