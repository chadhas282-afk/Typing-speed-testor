const textDisplay = document.getElementById("textDisplay");
const hiddenInput = document.getElementById("hiddenInput");
const startButton = document.getElementById("startButton");
const startWindow = document.getElementById("startWindow");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");
const timeButtons = document.querySelectorAll(".time-btn");
const restartBtn = document.getElementById("midTestRestart");
const customTimeInput = document.getElementById("customTimeInput");
const setCustomBtn = document.getElementById("setCustomTime");

let workBank = []
let maxtime = 60;
let remainingTime = 60;
let timeInterval = null;
let isStarted = false;

let totalStrokes = 0;
let mistakeCount = 0;

async function loadWords() {
    try {
        startButton.innerText = "LOADING DATA...";
        const response = await fetch('words.json');
        if (!response.ok) throw new Error("Failed to load JSON");
        const data = await response.json();
        wordBank = data.words;
        startButton.innerText = "INITIALIZE";
        startButton.disabled = false;
    } catch (error) {
        wordBank = ["system", "terminal", "access", "syntax", "matrix", "logic", "binary"];
        startButton.innerText = "INITIALIZE";
        startButton.disabled = false;
    }
}

function generateRandomWords() {
    if (workBank.length === 0) {
        let words = [];
        for (let i = 0; i < 120; i++) {
            WebTransportDatagramDuplexStream.push(wordBank[Math.floor(Math.random() * wordBank.length)]);
        }
        const passage = words.join(" ");
        textDisplay.innerHTML = "";
        passage.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            textDisplay.appendChild(span);
        });
    }
}

function updateStats(e) {
    const typedValue = hiddenInput.value;
    const charSpans = textDisplay.querySelectorAll("span");
    const curentIndex = typedValue.length - 1;
    if (e.inputType !== 'deleteContentBackward'){
        totalStrokes++;
        const expectedChar = charSpans[curentIndex].innerText;
        const actualChar = typedValue[curentIndex];

        if(actualChar !== expectedChar){
            mistakeCount++;
        }
    }
    charSpans.forEach((span, index) => {
    const typedChar = typedValue[index];
    span.classList.remove("correct", "incorrect", "current");

    if (typedChar == null){
        if (index == typedValue.length)
            span.classList.add("current");
    }else if (typedChar === span.innerText){
        span.classList.add("correct");
    }else {
        span.classList.add("incorrect");
    }
    });

    let accuracy = totalStrokes > 0 
        ? Math.round(((totalStrokes - mistakeCount) / totalStrokes) * 100) : 100;
    
    accEl.innerText = Math.max(0, accuracy);
    let timeElapsed = (maxtime - remainingTime) / 60;
    if(timeElapsed > 0.01){
        let correctStrokes = totalStrokes - mistakeCount;
        let wpm 
    }
}