let questions = [];
let userAnswers = [];
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    document.getElementById('submit-button').addEventListener('click', calculateScore);
    document.getElementById('next-button').addEventListener('click', nextQuestion); // P668f
});

function fetchQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            shuffleArray(questions);
            displayQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        return;
    }

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${question.questionText}</p>`;

    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('label');
        answerElement.classList.add('answer');
        answerElement.innerHTML = `
            <input type="radio" name="question${question.id}" value="${index}">
            ${answer.text}
        `;
        questionElement.appendChild(answerElement);
    });

    questionContainer.appendChild(questionElement);
    updateProgressBar();

    const nextButton = document.getElementById('next-button'); // P8144
    nextButton.disabled = true; // P7aa8

    const radioButtons = document.querySelectorAll(`input[name="question${question.id}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            nextButton.disabled = false; // P7aa8
        });
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none'; // P996d
    } else {
        nextButton.style.display = 'block'; // P996d
    }
}

function nextQuestion() { // P16a2
    currentQuestionIndex++;
    displayQuestion();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.value = progress;
}

function calculateScore() {
    let score = 0;

    questions.forEach((question, questionIndex) => {
        const selectedAnswerIndex = document.querySelector(`input[name="question${question.id}"]:checked`);
        if (selectedAnswerIndex && question.answers[selectedAnswerIndex.value].isCorrect) {
            score++;
        }
    });

    const finalScore = (score / questions.length) * 100;
    document.getElementById('final-score').innerText = `Your score: ${finalScore.toFixed(2)}%`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
