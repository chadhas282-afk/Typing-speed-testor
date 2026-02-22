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

let wordBank = []
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
    if (wordBank.length > 0) {
        let words = [];
        for (let i = 0; i < 120; i++) {
            words.push(wordBank[Math.floor(Math.random() * wordBank.length)]);
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
        let wpm = Math.round((correctStrokes / 5) / timeElapsed);
        wpmEl.innerText = Math.max(0, wpm);
    }
}

function resetEngine(){
    clearInterval(timeInterval);
    timerInterval = null;
    remainingTime = maxtime;
    isStarted = false;
    totalStrokes = 0;
    mistakeCount = 0;
    hiddenInput.value = "";
    hiddenInput.disabled = false;
    timerEl.innerHTML = maxtime;
    wpmEl.innerHTML = 0;
    accEl.innerHTML = "100";
    generateRandomWords();
    hiddenInput.focus();
}

function startTimer(){
    timeInterval = setInterval(() => {
      remainingTime--; 
      timerEl.innerText = remainingTime;
      if(remainingTime <= 0) endTest();
    }, 1000);
}

function endTest(){
    clearInterval(timeInterval);
    hiddenInput.disabled = true;
    document.getElementById("newTestWindow").style.display = "flex";
    document.getElementById("finalScore").innerHTML = `
        <h2 style="color:var(--accent); margin-bottom:10px;">SEQUENCE TERMINATED</h2>
        <div style="font-size:3rem; font-weight:bold;">${wpmEl.innerText} WPM</div>
        <p style="opacity:0.7">Accuracy: ${accEl.innerText}% | Mistakes: ${mistakeCount}</p>
    `;
}

startButton.addEventListener("click", () => {
    startWindow.style.display = "none";
    resetEngine();
});

hiddenInput.addEventListener("input", (e) =>{
    if (!isStarted && hiddenInput.value.length > 0){
        isStarted = true;
        startTimer();
    }
    updateStats(e);

    if (hiddenInput.value.length >= textDisplay.innerText.length - 10){
        generateRandomWords();
        hiddenInput.value = "";
    }
});

timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(!isStarted || remainingTime === maxtime){
            timeButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            maxtime = parseInt(button.getAttribute("data-time"));
            resetEngine();
        }
    });
});

setCustomBtn.addEventListener("click", () => {
    let val = parseInt(customTimeInput.value);
    if(val && val > 0){
        timeButtons.forEach(btn => btn.classList.remove("active"));
        customTimeInput.value = "";
        maxtime = val;
        resetEngine();
    }
});

restartBtn.addEventListener("click", resetEngine);
document.getElementById("newTestButton").addEventListener("click", () => {
    document.getElementById("newTestWindow").style.display = "none";
    resetEngine();
});

loadWords();