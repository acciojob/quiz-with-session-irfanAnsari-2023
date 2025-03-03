// Select elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Function to render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q, i) => {
    const questionContainer = document.createElement("div");
    questionContainer.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore selected answer from session storage
      if (savedProgress[i] === choice) {
        choiceElement.checked = true; // ✅ Fix for Cypress test
      }

      // Save answer when selected
      choiceElement.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionContainer.appendChild(label);
    });

    questionsElement.appendChild(questionContainer);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Store score in local storage
  localStorage.setItem("score", score);
}

// Load saved score (if available)
function loadSavedScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your last score was ${savedScore} out of 5.`;
  }
}

// Event listener for submit button
submitButton.addEventListener("click", calculateScore);

// Initialize quiz on page load
renderQuestions();
loadSavedScore();
