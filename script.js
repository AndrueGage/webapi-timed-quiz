// Quiz questions
const quizData = [
    { question: "What does HTML stand for?", correctAnswer: "Hypertext Markup Language", answers: ["Hypertext Markup Language", "Text Markup", "HTML", "Hypertext"] },
    { question: "Which is a programming language?", correctAnswer: "JavaScript", answers: ["CSS", "HTML", "JavaScript", "XML"] },
    { question: "In CSS, change text color with?", correctAnswer: "color", answers: ["text-color", "font-color", "color", "style-color"] },
    { question: "Declare variables in JavaScript with?", correctAnswer: "var", answers: ["let", "const", "variable", "var"] },
    { question: "What does CSS stand for?", correctAnswer: "Cascading Style Sheets", answers: ["Style Sheets", "CSS", "Cascading Style Sheets", "Web Style"] },
    { question: "Link an external JavaScript file using?", correctAnswer: "script", answers: ["link", "script", "js", "src"] },
    { question: "Purpose of 'DOCTYPE' in HTML?", correctAnswer: "Define document type", answers: ["Declare variable", "Specify character encoding", "Define document type"] },
    { question: "Comment out multiple lines in JavaScript?", correctAnswer: "/* This is a comment */", answers: ["// Comment", "/* Comment */", "<!-- Comment -->", "/* This is a comment */"] },
    { question: "Set spacing between lines in CSS?", correctAnswer: "line-height", answers: ["text-spacing", "line-spacing", "letter-spacing", "line-height"] },
    { question: "Purpose of 'defer' attribute in script tag?", correctAnswer: "Delay script execution", answers: ["Async script load", "Execute after page load", "Delay script execution"] },
];

// Global variables
const quizDuration = 60;
let submitCount = 0;
let shownQuestions = [];
let score = 0;
let timer = quizDuration;

// Start quiz function with styling to hide once the quiz has begun. Starts the clock and shows the question.
function startQuiz() {
    document.getElementById('startpage').style.display = 'none';
    document.getElementById('topbtn').style.display = 'none';
    showQuestion()
    setInterval(updateTime, 1000)
}

// Adds 5 to the score
function addScore() {
    score += 5;
    document.getElementById('HighScore').textContent = score;
}

// Stops the game and shows the endGame div
function endGame() {
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('timeleft').textContent = timer;
    document.getElementById('finalscore').textContent = score;
    document.getElementById('topbtn').style.display = 'block';
    document.getElementById('restartquiz').style.display = 'block';
}

// Adds the quizData objects one by one randomly to the DOM, while also checking previously shown questions. If there are no questions left then end the game.
function showQuestion() {
    document.getElementById('result').textContent = ''
    const choiceList = document.getElementById('choices');
    choiceList.innerHTML = '';
    const availableQuestions = quizData.filter(question => !shownQuestions.includes(question));
    if (availableQuestions.length === 0) {
        endGame();
        return;
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

// This finds the current question based on the answer passed from the quizData array. If the answer is correct we add 5 points, if its wrong and the timer is still greater than 5 seconds we deduct 5 and update the timer. We also display whether or not the answer is right or wrong and waits .5 seconds before going to the next question.
function checkAnswer(answer) {
    const currentQuestion = quizData.find(q => q.question === document.getElementById('question').textContent);
    if (answer === currentQuestion.correctAnswer) {
        addScore();
        document.getElementById('result').textContent = 'Correct!'
    } else {
        if (timer > 5) {
            timer -= 5;
            document.getElementById('time').textContent = timer;
            document.getElementById('result').textContent = 'Wrong!'
        }
    }
    setTimeout(showQuestion, 500);
}

// This runs every second to update the timer, when the timer hits 0 it ends the game.
function updateTime() {
    if (timer > 0) {
        timer--;
        document.getElementById('time').textContent = timer;
    } else {
        document.getElementById('time').textContent = 'Time is up!';
        endGame()
    }
}

// At the end of the game this handles the form for adding your initials to the score board in localStorage. It saves player data as an array of objects and also checks if that array exists before adding a new player object to it. It also keeps track of the submission count so that you can only add one submission to localStorage per game.
function getFormData(event) {
    event.preventDefault();
    if (submitCount <= 0) {
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
        submitCount += 1;
    }
}

// This compares two objects in decending order.
function compareScores(a, b) {
    return b.highscore - a.highscore
}

// This function displays the scores from localStorage and handles hiding and showing of the modal. It adds the table head each time its ran before looping over the array and adding the data for highscores. It also sorts the scores in decending order so the highscore is always at the top. Each time its ran it resets the innerHTML of the score list so that the data isnt duplicated next time you open it. 
function showScores() {
    const scoreboard = document.getElementById('scoreboard')
    const scoreList = document.getElementById('scorelist');
    scoreList.innerHTML = '';
    if (scoreboard.style.display === 'none') {
        scoreboard.style.display = 'block';
    } else {
        scoreboard.style.display = 'none';
    }
    const playerDBParse = JSON.parse(localStorage.getItem('playerDB'));
    playerDBParse.sort(compareScores);
    let firstTr = document.createElement('tr');
    let th = document.createElement('th');
    let th2 = document.createElement('th');
    th.textContent = 'Initials';
    th2.textContent = 'Score';
    firstTr.appendChild(th);
    firstTr.appendChild(th2);
    scoreList.appendChild(firstTr);
    playerDBParse.forEach(player => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = player.initials;
        let td2 = document.createElement('td');
        td2.textContent = player.highscore;
        tr.appendChild(td);
        tr.appendChild(td2);
        scoreList.appendChild(tr);
    })
}
