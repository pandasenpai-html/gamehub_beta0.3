const countries = [
    { image: "flag1.png", answer: "spain", hint: "el classico" },
    { image: "flag2.png", answer: "china", hint: "the great wall" },
    { image: "flag3.png", answer: "france", hint: "tour effel"},
    { image: "flag4.png", answer: "italy", hint: "mafia" },
    { image: "flag5.png", answer: "germany", hint: "nazi" },
    { image: "flag6.png", answer: "brazil", hint: "football" },
    { image: "flag7.png", answer: "swizerland", hint: "chocolate" },
    { image: "flag8.png", answer: "libye", hint: "the country name start with li..." },
    { image: "flag9.png", answer: "japon", hint: "anime et manga" },
];

let currentCountryIndex = 0;
let timer;
let timeLeft = 30;
let totalPoints = 0;
let hintUsed = false;

function loadCountry() {
    document.getElementById("countryImage").src = countries[currentCountryIndex].image;
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("timer").style.color = "green";
    document.getElementById("hintMessage").textContent = "";
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("nextButton").style.display = "none";
    hintUsed = false;
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft > 5) {
            document.getElementById("timer").style.color = "green";
        } else if (timeLeft <= 5 && timeLeft > 0) {
            document.getElementById("timer").style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            const correctAnswer = countries[currentCountryIndex].answer;
            document.getElementById("resultMessage").textContent = `Time's up! The correct answer was: ${correctAnswer}`;
            document.getElementById("resultMessage").style.color = "red";
            updateProgressColumn("skipped");
            setTimeout(() => {
                nextCountry();
            }, 3000);
        }
    }, 1000);
}

function checkGuess() {
    const guessInput = document.getElementById("guessInput").value.toLowerCase();
    const correctAnswer = countries[currentCountryIndex].answer;

    if (guessInput === correctAnswer) {
        let points = 0;
        if (hintUsed) {
            points = 0.5;
            updateProgressColumn("hint");
        } else if (timeLeft > 20) {
            points = 3;
            updateProgressColumn("correct");
        } else if (timeLeft > 10) {
            points = 2;
            updateProgressColumn("correct");
        } else {
            points = 1;
            updateProgressColumn("correct");
        }
        
        totalPoints += points;
        document.getElementById("resultMessage").textContent = `Correct! 🎉 You earned ${points} points!`;
        document.getElementById("resultMessage").style.color = "green";
        clearInterval(timer);
        document.getElementById("nextButton").style.display = "block";
    } else {
        document.getElementById("resultMessage").textContent = "Try Again!";
        document.getElementById("resultMessage").style.color = "red";
    }
}

function nextCountry() {
    currentCountryIndex++;

    if (currentCountryIndex < countries.length) {
        loadCountry();
        document.getElementById("guessInput").value = "";
    } else {
        alert(`Game Over! You scored ${totalPoints} points.`);
    }
}

function hintAction() {
    document.getElementById("hintMessage").textContent = countries[currentCountryIndex].hint;
    document.getElementById("hintMessage").style.color = "orange"; 
    hintUsed = true;
}

function skipCountry() {
    const correctAnswer = countries[currentCountryIndex].answer;
    document.getElementById("resultMessage").textContent = `Skipped! The correct answer was: ${correctAnswer}`;
    document.getElementById("resultMessage").style.color = "red";
    clearInterval(timer);
    updateProgressColumn("skipped");
    setTimeout(() => {
        nextCountry();
    }, 3000);
}

function updateProgressColumn(status) {
    const currentColumn = document.getElementById(`column${currentCountryIndex + 1}`);
    if (status === "correct") {
        currentColumn.classList.add("progress-correct");
    } else if (status === "hint") {
        currentColumn.classList.add("progress-hint");
    } else if (status === "skipped") {
        currentColumn.classList.add("progress-skipped");
    }
}

window.onload = loadCountry;