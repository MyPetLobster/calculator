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
let displayTimeout;

// Buttons
const onClear = document.querySelector("#on-c");
const backspace = document.querySelector("#backspace");
const mode = document.querySelector("#mode-toggle");
const equals = document.querySelector("#equals");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calculatorButtons = document.querySelectorAll('.button');

// Outputs etc.
const displayText = document.querySelector(".display-text");
const displayInner = document.querySelector(".display-inner");
const solarPanel = document.querySelector(".solar-panel");

// FUNCTION DEFINITIONS
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

function brightenDisplay() {
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
        newNum += input;
        displayText.textContent = newNum.includes(".") ? newNum : `${newNum}.0`;
    } else {
        newNum += input;
        displayText.textContent = newNum.includes(".") ? `${currentDisplay}${newNum}` : `${currentDisplay + newNum}.0`;
    }
    displayText.textContent = formatDisplayText(displayText.textContent);
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
        currentDisplay = `${oldNum} ${input} `;
        displayText.textContent = currentDisplay;
        displayText.textContent = formatDisplayText(displayText.textContent);
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
            displayText.textContent = formatDisplayText(displayText.textContent);
            isFirstNum = false;
        } else {
            oldNum = tempNum;
            newNum = "";
        }
    }
}

function evaluate(prev, current, opr) {
    const newNumConverted = +current;
    const oldNumConverted = +prev;

    switch (opr) {
        case "+":
            return oldNumConverted + newNumConverted;
        case "-":
            return oldNumConverted - newNumConverted;
        case "×":
            return oldNumConverted * newNumConverted;
        case "÷":
            return newNumConverted === 0 ? undefined : oldNumConverted / newNumConverted;
        case "^":
            return oldNumConverted ** newNumConverted;
        default:
            return undefined;
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
}

function deleteChar() {
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
    }
    displayText.textContent = currentDisplay;
}

function error() {
    displayText.textContent = "can't do that";
    setTimeout(clearAll, 2000);
}

function handleButtonClick() {
    resetTimeout(); // Reset the timeout on button click
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

    // console.log(`oldNum = ${oldNum}`);
    // console.log(`newNum = ${newNum}`);
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

    displayText.textContent = currentDisplay;
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
    displayText.textContent = oldNum;
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
// Solar Easter Egg
solarPanel.addEventListener("mouseover", () => {
    if (isOn) {
        dimDisplay();
    }
});
solarPanel.addEventListener("mouseout", () => {
    if (isOn) {
        brightenDisplay();
    }
});
// TIMEOUT FUNCTIONALITY
calculatorButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


//

function formatDisplayText(text) {
    // Check if the text exceeds 12 characters
    if (text.length > 13) {
        // Shrink text
        displayText.style.fontSize = "34px";
    } 
    if (text.length > 18) {
        // Convert the number to scientific notation
        const num = parseFloat(text).toExponential(6);
        return num;
    }
    if (text.length < 13) {
        displayText.style.fontSize = "48px";
    }
    return text;
}





/////// STYLING JAVASCRIPT ///////
// Mode Button Styling on Hover
mode.addEventListener("mousedown", () => {
    mode.style.color = "#8b8b8d";
});
mode.addEventListener("mouseup", () => {
    mode.style.color = "#c0c0c1";
});