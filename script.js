const quizData = [
    { question: "What is the capital of France?", correctAnswer: "Paris", answers: ["Milan", "Paris", "Nashville", "Memphis"] },
    { question: "Which planet is known as the Red Planet?", correctAnswer: "Mars", answers: ["Venus", "Jupiter", "Mars", "Saturn"] },
    { question: "What is the largest mammal in the world?", correctAnswer: "Blue Whale", answers: ["Elephant", "Giraffe", "Blue Whale", "Lion"] },
    { question: "Who wrote 'Romeo and Juliet'?", correctAnswer: "William Shakespeare", answers: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Emily Brontë"] },
    { question: "What is the currency of Japan?", correctAnswer: "Yen", answers: ["Yen", "Won", "Ringgit", "Baht"] },
    { question: "Which element has the chemical symbol 'O'?", correctAnswer: "Oxygen", answers: ["Oxygen", "Gold", "Silver", "Iron"] },
    { question: "In what year did the first manned moon landing occur?", correctAnswer: "1969", answers: ["1969", "1975", "1982", "1990"] },
    { question: "Who is the current Prime Minister of Canada?", correctAnswer: "Justin Trudeau", answers: ["Justin Trudeau", "Stephen Harper", "Andrew Scheer", "Jean Chrétien"] },
    { question: "Which ocean is the largest on Earth?", correctAnswer: "Pacific Ocean", answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Southern Ocean"] },
];
const quizDuration = 60;
let shownQuestions = [];
let score = 0;
let timer = quizDuration;

function startQuiz() {
    document.getElementById('startpage').style.display = 'none';
    showQuestion()
    setInterval(updateTime, 1000)
}

function addScore() {
    score += 5;
    document.getElementById('HighScore').textContent = score;
}

function endGame() {
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('timeleft').textContent = 60 - timer;
    document.getElementById('finalscore').textContent = score;
}

function showQuestion() {
    const choiceList = document.getElementById('choices');
    choiceList.innerHTML = '';
    const availableQuestions = quizData.filter(question => !shownQuestions.includes(question));
    if (availableQuestions.length === 0) {
        endGame();
    }
    const currentQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    document.getElementById('question').textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement('button');
        button.classList.add("btnstyle");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        choiceList.appendChild(button);
    })
    shownQuestions.push(currentQuestion);
}

function checkAnswer(answer) {
    const currentQuestion = quizData.find(q => q.question === document.getElementById('question').textContent);
    if (answer === currentQuestion.correctAnswer) {
        addScore();
    } else {
        if (timer > 5) {
            timer -= 5;
            document.getElementById('time').textContent = timer;
        }
    }
    showQuestion()
}

function updateTime() {
    if (timer > 0) {
        timer--;
        document.getElementById('time').textContent = timer;
    } else {
        document.getElementById('time').textContent = 'Time is up!';
    }
}

function getFormData(event) {
     event.preventDefault();
     const formData = new FormData(event.target);
     const playerDB = localStorage.getItem('playerDB')
     if (!playerDB) {
        let playerArr = [];
        localStorage.setItem('playerDB', JSON.stringify(playerArr));
     }
     const playerDBParse = JSON.parse(localStorage.getItem('playerDB'));
     var player = {
        highscore: score,
        initials: formData.get('initial'),
     };
     playerDBParse.push(player);
     localStorage.setItem('playerDB', JSON.stringify(playerDBParse));
}
   
