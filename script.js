let questions = [];
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
    document.getElementById('submit-button').addEventListener('click', calculateScore);
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('prev-button').addEventListener('click', previousQuestion);
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
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
    updateQuestionNumber();
    updateTimeRemaining();

    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
    prevButton.disabled = currentQuestionIndex === 0;

    const radioButtons = document.querySelectorAll(`input[name="question${question.id}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            saveUserAnswer(question.id, radio.value);
            nextButton.disabled = false;
        });
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionNumber() {
    const questionNumber = document.getElementById('question-number');
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}


function updateTimeRemaining() {
    // Implement a timer functionality here
    // For now, we'll just display a static time
    const timeRemaining = document.getElementById('time-remaining');
    timeRemaining.textContent = 'Time Remaining: 2:00:00';
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

    document.querySelector('.exam-container').classList.add('hidden');
    document.getElementById('score-container').classList.remove('hidden');

    showAnswers(userAnswers);
}

function showAnswers(userAnswers) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    questions.forEach((question, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${question.questionText}</p>`;

        question.answers.forEach((answer, index) => {
            const answerElement = document.createElement('label');
            answerElement.classList.add('answer');
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = `question${question.id}`;
            radioButton.value = index;
            radioButton.disabled = true;
            radioButton.checked = userAnswers[question.id] == index;

            if (answer.isCorrect) {
                radioButton.style.accentColor = 'green';
                radioButton.style.outline = '2px solid green';
                radioButton.style.outlineOffset = '2px';
            }

            answerElement.appendChild(radioButton);
            answerElement.appendChild(document.createTextNode(` ${answer.text}`));
            questionElement.appendChild(answerElement);
        });

        questionContainer.appendChild(questionElement);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
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