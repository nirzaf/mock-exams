let questions = [];
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    document.getElementById('submit-button').addEventListener('click', calculateScore);
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    loadUserAnswers();
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
            <input type="radio" name="question${question.id}" value="${index}" ${isAnswerSelected(question.id, index) ? 'checked' : ''}>
            ${answer.text}
        `;
        questionElement.appendChild(answerElement);
    });

    questionContainer.appendChild(questionElement);
    updateProgressBar();

    const nextButton = document.getElementById('next-button');
    nextButton.disabled = true;

    const radioButtons = document.querySelectorAll(`input[name="question${question.id}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            saveUserAnswer(question.id, radio.value);
            nextButton.disabled = false;
        });
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

function nextQuestion() {
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
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};

    questions.forEach((question, questionIndex) => {
        const selectedAnswerIndex = userAnswers[question.id];
        if (selectedAnswerIndex !== undefined && question.answers[selectedAnswerIndex].isCorrect) {
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

function saveUserAnswer(questionId, answerIndex) {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    userAnswers[questionId] = answerIndex;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function loadUserAnswers() {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    currentQuestionIndex = Object.keys(userAnswers).length;
}

function isAnswerSelected(questionId, answerIndex) {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    return userAnswers[questionId] == answerIndex;
}
