// Global Variables
let oldNum = "";
let newNum = "";
let operator = "";
let currentDisplay = "";
let lastButtonPress = "";

let isOn = false;
let isFirstEquals = true;
let isFirstOperator = true;
let isFirstNum = true;
let isAltMode = false;
let isMuted = false;

let displayTimeout;

// Buttons
const onClear = document.querySelector("#on-c");
const backspace = document.querySelector("#backspace");
const mode = document.querySelector("#mode-toggle");
const equals = document.querySelector("#equals")
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const divisionButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const minusButton = document.querySelector("#minus");
const xSquaredButton = document.querySelector("#xTo2");
const xToYButton = document.querySelector("#xToY");
const posNegButton = document.querySelector("#positive-negative");
const calculatorButtons = document.querySelectorAll('.button');
const redButtons = document.querySelectorAll(".red-btn");
const numberButtons = document.querySelectorAll(".number");
const muteButton = document.querySelector("#mute");

// Outputs etc.
const displayText = document.querySelector(".display-text");
const displayInner = document.querySelector(".display-inner");
const solarPanel = document.querySelector(".solar-panel");

const clickAudio = new Audio("audio/click_004.ogg");
clickAudio.volume = 0.1;
const errorAudio = new Audio("audio/error_005.ogg");
errorAudio.volume = 0.2;


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
    displayTimeout = setTimeout(powerDownCalc, 45000); // 45 seconds
}
function handleNumberButtons(input) {
    
    
    if (lastButtonPress === "equals") {
        isFirstNum = true;
        oldNum = "";
        newNum = "";
    }

    isFirstEquals = true;
    lastButtonPress = "number";

    if (isFirstNum) {
        // Set max num length to 10 digits
        if ((newNum + input).length > 10) {
        } else {
            newNum += input;
        }
        
        if (newNum.includes(".")) {
            displayText.textContent = newNum;
        } else {
            displayText.textContent = `${newNum}.0`;
        }

    } else {
        // If length of oldNum is greater than 5, preemptively hide oldNum from display
        if (oldNum.length > 5) {
            newNum += input;
            if (newNum.includes(".")) {
                displayText.textContent = newNum;
            } else {
                displayText.textContent = `${newNum}.0`;
            }
        } else {
            // check if length of oldNum and newNum exceeds 10 char
            if ((`${oldNum} ${operator} ${newNum}`).length > 10) {
                newNum += input;
                if (newNum.includes(".")) {
                    displayText.textContent = newNum;
                } else {
                    displayText.textContent = `${newNum}.0`;
                } 
            } else {
                newNum += input;
                if (newNum.includes(".")) {
                    displayText.textContent = currentDisplay + newNum;
                } else {
                    displayText.textContent = `${currentDisplay + newNum}.0`;
                }
            }

        }

        
    }
}
function handleOperatorButtons(input) {
    lastButtonPress = "operator";
    
    if (input === "xy") {
        input = "^";
    }

    if (isFirstOperator) {
        if (isFirstEquals) {
            oldNum = newNum;
        }   
        operator = input;
        newNum = "";
        // Set "currentDisplay" to be used by handleNum on second operand
        // if oldNum longer than 6 char, hide it
        if (oldNum.length > 6) {
            currentDisplay = `${input} `;
        } else {
            currentDisplay = `${oldNum} ${input} `;
        }
        
        displayText.textContent = currentDisplay;
        isFirstNum = false;
        isFirstOperator = false;
    } else {
        let tempNum = oldNum;
        oldNum = evaluate(oldNum, newNum, operator);
        if (oldNum !== undefined) {
            operator = input;
            newNum = "";
            currentDisplay = `${oldNum} ${input} `;
            displayText.textContent = currentDisplay;
            isFirstNum = false;
        } else {
            oldNum = tempNum;
            newNum = "";
        }
        
    }
}
function evaluate(prev, current, opr) {
    newNumConverted = +current;
    oldNumConverted = +prev;

    if (opr === "+") {
        return formatDisplayText(oldNumConverted + newNumConverted);
    } else if (opr === "-") {
        return formatDisplayText(oldNumConverted - newNumConverted);
    } else if (opr === "×") {
        return formatDisplayText(oldNumConverted * newNumConverted);
    } else if (opr === "÷") {
        if (newNumConverted === 0) {
            errorAudio.play();
            displayText.textContent = "can't do that";
            setTimeout(() => {
                displayText.textContent = `${oldNumConverted} ${operator}`;
                return oldNumConverted;
            }, 2000);
            
        } else {
            return formatDisplayText(oldNumConverted / newNumConverted);
        }
        
    } else if (opr === "^") {
        return formatDisplayText(oldNumConverted ** newNumConverted);
    }
}
function clearAll() {
    currentDisplay = "0.";
    displayText.textContent = currentDisplay;
    oldNum = "";
    newNum = "";
    operator = "";
    isFirstNum = true;
    isFirstOperator = true;
    isFirstEquals = true;
    displayText.style.transition = "none";
}
function deleteChar() {
    console.log(`oldNum = ${oldNum}`);
    console.log(`newNum = ${newNum}`);
    console.log(`operator = ${operator}`);
    console.log('-----------');

    if (lastButtonPress === "equals") {
        clearAll();
    }

    if (oldNum && newNum && operator) {
        newNum = newNum.slice(0, -1);
        currentDisplay = `${oldNum} ${operator} ${newNum}`;
    } else if (oldNum && operator) {
        operator = "";
        currentDisplay = `${oldNum} ${operator} ${newNum}`;
        isFirstOperator = true;
        newNum = oldNum;
    } else if (oldNum) {
        if (oldNum.length > 1) {
            oldNum = oldNum.slice(0, -1);
            currentDisplay = `${oldNum} ${operator}`;
        } else {
            clearAll();
        }
    } else if (newNum) {
        if (newNum.length > 1) {
            newNum = newNum.slice(0, -1);
            currentDisplay = `${newNum}`;
        } else {
            clearAll();
        }
    }
    displayText.textContent = currentDisplay;
}
function error() {
    errorAudio.play();
    displayText.textContent = "can't do that";
    setTimeout(clearAll, 2000);
}
function handleButtonClick() {
    resetTimeout(); // Reset the timeout on button click
}
function formatDisplayText(text) {
    // Check if the text exceeds 10 characters
    text = text.toString();

    if (text.length > 10) {
        // Convert the number to scientific notation
        const num = parseFloat(text).toExponential(6);
        return num;
    }
    return text
}


///// EVENT LISTENERS and ACTIONS /////
// BACKSPACE
backspace.addEventListener("click", () => {
    deleteChar();
});
// NUMBER BUTTONS
numbers.forEach((num) => num.addEventListener("click", function(e) {
    handleNumberButtons(e.target.textContent);
}));
// OPERATOR BUTTONS
operators.forEach((opr) => opr.addEventListener("click", function(e) {
    handleOperatorButtons(e.target.textContent);
    // console.log(`button value = ${e.target.textContent}`);
}));
// EQUALS BUTTON
equals.addEventListener("click", () => {
    console.log(`operator = ${operator}`);

    lastButtonPress = "equals";

    isFirstEquals = false;
    isFirstOperator = true;

    newNumConverted = +newNum;
    oldNumConverted = +oldNum;

    if (operator === "+") {
        currentDisplay = oldNumConverted + newNumConverted;
    } else if (operator === "-") {
        currentDisplay = oldNumConverted - newNumConverted;
    } else if (operator === "×") {
        currentDisplay = oldNumConverted * newNumConverted;
    } else if (operator === "÷") {
        if (newNumConverted === 0) {
            error();
            return;
        } else {
            currentDisplay = oldNumConverted / newNumConverted;
        }
    } else if (operator === "^") {
        currentDisplay = oldNumConverted ** newNumConverted;
    }

    /////
    displayText.textContent = formatDisplayText(currentDisplay);

    oldNum = currentDisplay.toString();
});
// CLEAR BUTTON
onClear.addEventListener("click", () => {
    if (isOn === false) {
        powerUpCalc();
        isOn = true;
    }
    clearAll();
});
// SQUARED
xSquaredButton.addEventListener("click", () => {
    oldNum = oldNum ** 2;
    displayText.textContent = formatDisplayText(oldNum);
    isFirstOperator = true;
    newNum = oldNum;

});
// POSITIVE NEGATIVE TOGGLE
posNegButton.addEventListener("click", () => {
    
    if (operator != "") {
        newNum = +newNum * -1;
        newNum = newNum.toString();
        displayText.textContent = `${oldNum} ${operator} ${newNum}`;
        isFirstOperator = false;
    } else {
        newNum = +newNum * -1;
        displayText.textContent = `${oldNum} ${operator} ${newNum}`;
    }
    if (lastButtonPress === "equals") {

        oldNum = oldNum *-1;
       
        displayText.textContent = `${oldNum} `;
        newNum = oldNum;
        oldNum = "";
        operator = "";

        isFirstEquals = true;
        isFirstOperator = true;
        
    }
});
// MODE TOGGLE
mode.addEventListener("click", () => {
    if (isOn) {
        if (isAltMode) {
            divisionButton.style.display = "initial"
            multiplyButton.style.display = "initial";
            minusButton.style.display = "initial";
            posNegButton.style.display = "none";
            xSquaredButton.style.display = "none";
            xToYButton.style.display = "none";
    
            isAltMode = false;
        } else {
            divisionButton.style.display = "none";
            multiplyButton.style.display = "none";
            minusButton.style.display = "none";
            posNegButton.style.display = "inline-block";
            xSquaredButton.style.display = "inline-block";
            xToYButton.style.display = "inline-block";
    
            isAltMode = true;
        }
    }
    
});
// MUTE BUTTON
muteButton.addEventListener("click", () => {
    if (!isMuted) {
        clickAudio.volume = 0.0;
        errorAudio.volume = 0.0;
        isMuted = true;
    } else {
        clickAudio.volume = 0.1;
        errorAudio.volume = 0.2;
        isMuted = false;
    }
});
// Solar Easter Egg
solarPanel.addEventListener("mouseover", () => {
    if (isOn) {
        dimDisplay();
    }
});
solarPanel.addEventListener("touchstart", () => {
    if (isOn) {
        dimDisplay();
    }
})
solarPanel.addEventListener("mouseout", () => {
    if (isOn) {
        brightenDisplay();
    }
});
solarPanel.addEventListener("touchend", () => {
    if (isOn) {
        brightenDisplay();
    }
});
// TIMEOUT FUNCTIONALITY
calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick;
        clickAudio.play();
    });
    
});


/////// STYLING JAVASCRIPT ///////
numberButtons.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.fontWeight = "700";
    })
});
numberButtons.forEach(btn => {
    btn.addEventListener("mouseup", () => {
        btn.style.fontWeight = "500";
    })
});
redButtons.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.fontWeight = "700";
        btn.style.color = "#8b8b8d";
    })
});
redButtons.forEach(btn => {
    btn.addEventListener("mouseup", () => {
        btn.style.fontWeight = "500";
        btn.style.color = "#d3d3d3";
    })
});
mode.addEventListener("mousedown", () => {
    mode.style.color = "#737373";
    mode.style.fontWeight = "700";
});
mode.addEventListener("mouseup", () => {
    mode.style.color = "#c0c0c1";
    mode.style.fontWeight = "500";
});


////// DEBUGGING TOOLS ///////

// alert(`oldNum = ${oldNum}`);
// alert(`newNum = ${newNum}`);
// alert(`operator = ${operator}`);

// console.log(`oldNum = ${oldNum}`);
// console.log(`newNum = ${newNum}`);
// console.log(`operator = ${operator}`);


