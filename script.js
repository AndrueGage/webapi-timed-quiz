const quizData = [
    { question: "What is the capital of France?", correctAnswer: "Paris", answers: ["Milan", "Paris", "Nashville", "Memphis"] },
    { question: "Which planet is known as the Red Planet?", correctAnswer: "Mars", answers: ["Venus", "Jupiter", "Mars", "Saturn"] },
    { question: "What is the largest mammal in the world?", correctAnswer: "Blue Whale", answers: ["Elephant", "Giraffe", "Blue Whale", "Lion"] },
    { question: "Who wrote 'Romeo and Juliet'?", correctAnswer: "William Shakespeare", answers: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Emily Brontë"] },
];
const quizDuration = 60;
let score = 0;
let timer = quizDuration;

function startQuiz() {
    document.getElementById('startpage').style.visibility = 'hidden';
    showQuestion() 
    setInterval(updateTime, 1000)
}

function addScore() {
    score += 5;
    console.log(score)
    document.getElementById('HighScore').textContent = score;
}

function showQuestion() {
    const choiceList = document.getElementById('choices');
    const currentQuestion = quizData[Math.floor(Math.random() * quizData.length)];
    // make it not run the same question twice
    document.getElementById('question').textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        choiceList.appendChild(button);
    }) 
}

function checkAnswer(answer){
    console.log(answer)
    const currentQuestion = quizData.find(q => q.question === document.getElementById('question').textContent);
    if(answer === currentQuestion.correctAnswer) {
        addScore();
    }
}

function updateTime(){
    if (timer > 0) {
    timer--;
    document.getElementById('time').textContent = timer;
    }else{
        document.getElementById('time').textContent = 'Time is up!';
    }
    
}

// time interval 
// quiz duration 
// getelementbyId variables
// questions
// function that updates timer
// function to start quiz
// 