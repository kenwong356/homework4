var startButton = document.querySelector("#startbtn");
var startpage = document.querySelector(".startpage")
var questionpage = document.querySelector(".questionpage")
var questionsDiv = document.querySelector("#questionsDiv");
var optionbuttons = document.querySelectorAll(".option")
var endpage = document.querySelector(".alldonepage")
var form= document.querySelector("#form")
var input= document.querySelector("#input") 
var highscorespage =document.querySelector(".highscorespage")
const resetbutton =document.querySelector("#resetButton")
var scorebutton=document.querySelector("#scorebutton")
var timer = document.querySelector(".timer")
var secondsLeft = 70;
var timerInterval;
var highScores = [];
var scores = 0 
var currentQuestionIndex = 0;
var scoreEl= document.querySelector("#score")
var submitbtn = document.querySelector("#submitbtn")
var highscoreslist = document.querySelector ("#highscoreslist")
var clearscore = document.querySelector("#clearScore")

var questions = [{
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: 'booleans'
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: 'quotes'
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: 'booleans'
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commmas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: 'curly brackets'
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: 'for loops'
    }
];


function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex]
    questionsDiv.textContent = currentQuestion.question
    console.log(optionbuttons);
for (let i = 0; i < currentQuestion.answers.length; i++) {
    optionbuttons[i].textContent = currentQuestion.answers[i]
    }
}
function evalAns(event) {
    var userAnswer = event.target.innerHTML;
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
        scores += 5
        console.log("Correct answer!");
    } else {
        console.log("Incorrect answer!");
        secondsLeft -= 10; // Deduct seconds for an incorrect answer
    }

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        getQuestion();
    } else {
        // End of the quiz
        endpage.classList.remove("test");
        questionpage.classList.add("test");
        endQuiz();
    }
}

function endQuiz(){scoreEl.textContent=" Your score " + scores}

// Add the event listeners to option buttons
for (let index = 0; index < optionbuttons.length; index++) {
    optionbuttons[index].addEventListener("click", evalAns);
}





var errorMessageDisplayed = false; // Initialize a flag to keep track of error message display

form.addEventListener("submit", submitform);

function submitform(evt) {
    evt.preventDefault();
    console.log(input.value);

    if (input.value.trim() === '') {
        // Display an error message only if it's not already displayed
        if (!errorMessageDisplayed) {
            var errorMessage = document.createElement("p");
            errorMessage.textContent = "Please fill out the input field.";
            errorMessage.style.color = "red"; // Style the error message as needed
            // Append the error message to the form or another suitable location
            form.appendChild(errorMessage);
            errorMessageDisplayed = true; // Set the flag to true to indicate that the error message is displayed
        }
        return; // Prevent form submission if input is empty
    }

    highscorespage.classList.remove("test");
    endpage.classList.add("test");
}


function setTime() {
    // Clear the existing timer interval
    clearInterval(timerInterval);

    // Only start the timer if it hasn't been started already
    if (!timerInterval) {
        timerInterval = setInterval(function() {
            if (secondsLeft > 0) {
                secondsLeft--;
                timer.textContent = secondsLeft;
            }

            if (secondsLeft === 0) {
                questionpage.classList.add("test");
                endpage.classList.add("test");
                highscorespage.classList.remove("test"); 
                clearInterval(timerInterval);
            }
        }, 1000);
    }
}



startButton.addEventListener("click", startGame);

function startGame() {
    correctAnswer = 0
    setTime();
    getQuestion();
console.log("click");
startpage.classList.add("test")
questionpage.classList.remove("test")
}


for (let index = 0; index < optionbuttons.length; index++) {
    const optionbutton = optionbuttons[index];
    optionbutton.addEventListener("click", evalAns)
}

resetbutton.addEventListener("click", resetgame);

function resetgame() {
    window.location.reload()
}

function highscorescount(){
    console.log("click");
    highscorespage.classList.add("test")
    endpage.classList.remove("test")

}

function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

scorebutton.addEventListener("click", function() {
    highscoreslist.classList.remove("test");
    for (let i = 0; i < highScores.length; i++) {
        const item = document.createElement("li")
        item.textContent = highScores[i].initals + " " + highScores[i].scores
        highscoreslist.appendChild(item)
    }

})

submitbtn.addEventListener("click", function () {
    // Get the input value
    var inputValue = input.value.trim(); // Trim to remove leading/trailing spaces

    if (inputValue !== "") {
        // Only log and save to local storage if the input is not empty
        var inputObj = {
            initals: inputValue,
            scores: scores
        };
        highScores.push(inputObj);
        console.log(inputObj);
        localStorage.setItem("HighScores", JSON.stringify(highScores));
    }
});

// ... rest of your code remains the same


function getlocalstorage(){
    var getlocalstoragearray = JSON.parse(localStorage.getItem("HighScores"))
    if (getlocalstoragearray === null) { return
        
    }else{
        highScores = getlocalstoragearray
    }
}
getlocalstorage()
console.log(highScores);



function clearScores() {
    highScores = [];
    localStorage.removeItem("HighScores");
    highscoreslist.innerHTML = "";  
  }
  
  clearscore.addEventListener("click", clearScores);