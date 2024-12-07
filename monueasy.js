const countries = [
    { image: "place1.png", answer: "india", hint: "The country name starts with I" },
    { image: "place2.png", answer: "egypt", hint: "The country name starts with E" },
    { image: "place3.png", answer: "china", hint: "The country name starts with C" },
    { image: "place4.png", answer: "england", hint: "The country name starts with E" },
    { image: "place5.png", answer: "usa", hint: "The country name starts with U" },
    { image: "place6.png", answer: "italy", hint: "The country name starts with I" },
    { image: "place7.png", answer: "russia", hint: "The country name starts with R" },
    { image: "place8.png", answer: "italy", hint: "The country name starts with I" },
    { image: "place9.png", answer: "brazil", hint: "The country name starts with B" },
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