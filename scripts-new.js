let oldNum = "";
let newNum = "";
let operator = "";
let currentDisplay = `${oldNum} ${operator} ${newNum}`;

let displayTimeout;

let isOn = false;


let numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operatorList = ['+', '-', '÷', '×', '='];
let otherButtonList = ['ON/C', '⌫', 'MODE'];


// Buttons
const onClear = document.querySelector("#on-c");
const backspace = document.querySelector("#backspace");
const mode = document.querySelector("#mode-toggle");
const equals = document.querySelector("#equals")
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// Outputs etc.
const displayText = document.querySelector(".display-text");
const displayInner = document.querySelector(".display-inner");
const solarPanel = document.querySelector(".solar-panel");

// Timeout functionality
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
function handleButtonClick() {
    resetTimeout(); 
}


/////// FUNCTION DEFINITIONS ///////

function powerUpCalc() {
    resetTimeout();
    displayInner.style.transition = "all 0.5s ease-in-out";
    displayInner.style.backgroundColor = "#728173";
    displayInner.style.color = "black";
}

function powerDownCalc() {
    displayInner.style.transition = "all 0.8s ease-in-out";
    displayInner.style.backgroundColor = "#28393D";
    displayInner.style.color = "#263638";
    isOn = false;
}

function dimDisplay() {
    displayInner.style.transition = "all 5s ease-in-out";
    displayInner.style.backgroundColor = "#28393D";
    displayInner.style.color = "#263638";
}

function brightenDisplay () {
    displayInner.style.backgroundColor = "#728173";
    displayInner.style.color = "black";
    displayInner.style.transition = "all 5s ease-in-out";
}

function resetTimeout() {
    clearTimeout(displayTimeout);
    displayTimeout = setTimeout(powerDownCalc, 30000); // 30 seconds
}

function clearAll() {
    currentDisplay = "0.";
    displayText.textContent = currentDisplay;
    oldNum = "";
    newNum = "";
    operator = "";
}



// EVENT LISTENERS and ACTIONS

// Solar Easter Egg
solarPanel.addEventListener("mouseover", () => {
    if (isOn) {
        dimDisplay();
    }
})
solarPanel.addEventListener("mouseout", () => {
    if (isOn) {
        brightenDisplay();
    }
})

// Clear Button
onClear.addEventListener("click", () => {
    if (isOn === false) {
        powerUpCalc();
        isOn = true;
    }
    clearAll();
})


function handleAllButtons(input) {
    if (numberList.includes(input)) {
        // Handle number input
    } else if (operatorList.includes(input)) {
        // Handle operator input
    } else if (otherButtonList.includes(input)) {
        // Handle other buttons
    }
}

function handleNumbers(input) {
    
}