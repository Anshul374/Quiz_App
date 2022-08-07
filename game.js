let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices);
let question_track = document.querySelector(".question-track");
let scoreCount = document.querySelector(".scoreCount");
let insideProgress = document.querySelector(".insideProgress");
let loader=document.getElementById("loader");
let container1=document.querySelector(".container1");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
//     {
//         question: "Inside which HTML element do we put the JavaScript??",
//         choice1: "<script>",
//         choice2: "<javascript>",
//         choice3: "<js>",
//         choice4: "<scripting>",
//         answer: 1
//     },
//     {
//         question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
//         choice1: "<script href='xxx.js'>",
//         choice2: "<script name='xxx.js'>",
//         choice3: "<script src='xxx.js'>",
//         choice4: "<script file='xxx.js'>",
//         answer: 3
//     },
//     {
//         question: "How do you write 'Hello World' in an alert box?",
//         choice1: "msgBox('Hello World');",
//         choice2: "alertBox('Hello World');",
//         choice3: "msg('Hello Worls');",
//         choice4: "alert('Hello World');",
//         answer: 4
//     }
// container1.style.visibility='hidden';
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then((response) => {
        // console.log(response)
        return response.json();
    }).then((data) => {
        // console.log(data)
        questions = data.results;
        console.log(questions);
        
        container1.hidden=false;
        loader.style.visibility='hidden';
        startGame();
    })
    .catch(err => {
        console.error(err);
    })

let correct_Bonus = 0;
const max_Questions = 10;
let str = '';

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNextQuestion();
}
getNextQuestion = () => {
    // console.log('hi')

    if (availableQuestions.length === 0 || questionCounter >= max_Questions) {
        localStorage.setItem('mostRecentScore', correct_Bonus);
        return window.location.assign("end.html");

    }

    questionCounter++;
    // progressbar
    insideProgress.style.width = `${(questionCounter / max_Questions) * 100}%`;
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // console.log(questionIndex)
    currentQuestion = availableQuestions[questionIndex];
    
    // add an correct_answer and incorrect answers into a new array
    random_no = Math.floor(Math.random() * 4);
    console.log(currentQuestion);
    let array1 = [];
    array1 = currentQuestion.incorrect_answers;
    array1.splice(random_no, 0, currentQuestion.correct_answer);
    console.log(array1);
    
    // show the questions one by one
    question.innerText = currentQuestion.question;

    // show all the options by traversing them
    let i=0;
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        if(i<=array1.length-1){
            choice.innerText = array1[i]
        }
        i++;
        
    })

    // we splice out all the questions which we iterate so that it can not repeat again
    availableQuestions.splice(questionIndex, 1);

    // top questioncounter
    str = `<h3>Questions</h3>
        <h3 class="qProgress">${questionCounter}/${max_Questions}</h3>`;
    question_track.innerHTML = str;

};
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        console.log(choice);
        let selectedAnswer = choice.innerHTML;
        // console.log(selectedAnswer)
        if (selectedAnswer === currentQuestion.correct_answer) {
            // console.log("correct");
            choice.classList.add("correct");
            correct_Bonus += 10;
        } else {
            // console.log("incorrect");
            choice.classList.add("incorrect");
        }
        setTimeout(() => {

            choice.classList.remove("correct");
            choice.classList.remove("incorrect");
            getNextQuestion();
        }, 1000);

        let str2 = `  <h3>Score</h3>
                    <h2>${correct_Bonus}</h2>`
        scoreCount.innerHTML = str2



    });
});
