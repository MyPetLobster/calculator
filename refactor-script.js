///// VARIABLE DECLARATIONS ///////

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

let displayTimeout;

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


// TIMEOUT FUNCTIONALITY
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
function handleButtonClick() {
    resetTimeout(); // Reset the timeout on button click
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
        if (newNum.includes(".")) {
            displayText.textContent = newNum;
        } else {
            displayText.textContent = `${newNum}.0`
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
function handleOperatorButtons(input) {
    lastButtonPress = "operator";

    if (isFirstOperator) {
        if (isFirstEquals) {
            oldNum = newNum;
        }   
        operator = input;
        newNum = "";
        currentDisplay = `${oldNum} ${input} `;
        displayText.textContent = currentDisplay;
        isFirstNum = false;
        isFirstOperator = false;
    } else {


        oldNum = evaluate(oldNum, newNum, operator);


        operator = input;
        newNum = "";
        currentDisplay = `${oldNum} ${input} `;
        displayText.textContent = currentDisplay;
        isFirstNum = false;
    }
}
function evaluate(prev, current, opr) {
    newNumConverted = +current;
    oldNumConverted = +prev;

    if (opr === "+") {
        return oldNumConverted + newNumConverted;
    } else if (opr === "-") {
        return oldNumConverted - newNumConverted;
    } else if (opr === "×") {
        return oldNumConverted * newNumConverted;
    } else if (opr === "÷") {
        return oldNumConverted / newNumConverted;
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
    console.log(`oldNum = ${oldNum}`);
    console.log(`newNum = ${newNum}`);
    console.log(`operator = ${operator}`);
    console.log('-----------');

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

backspace.addEventListener("click", () => {
    deleteChar();
});


// backspace.addEventListener("click", () => {
//     console.log(`oldNum = ${oldNum}`);
//     console.log(`newNum = ${newNum}`);
//     console.log(`operator = ${operator}`);
//     if (newNum === "") {
//         if ((oldNum.length == 1) && (operator == "")) {
//             console.log("clearing all");
//             clearAll();
//         } else {
//             operator = "";

//             displayText.textContent = `${oldNum} `;
//             lastButtonPress = "number";
//             newNum = oldNum;
//             oldNum = "";
//             isFirstOperator = true;
//         }
        
//     } else {
//         newNum = newNum.slice(0, -1);
        
//         handleNumberButtons("");
       
//     } 
// });

/////// EVENT LISTENERS and ACTIONS ///////

// NUMBER BUTTONS
numbers.forEach((num) => num.addEventListener("click", function(e) {
    handleNumberButtons(e.target.textContent);
}))

// OPERATOR BUTTONS
operators.forEach((opr) => opr.addEventListener("click", function(e) {
    handleOperatorButtons(e.target.textContent);
}))



// EQUALS BUTTON
equals.addEventListener("click", () => {

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
        currentDisplay = oldNumConverted / newNumConverted;
    }

    displayText.textContent = currentDisplay;
    oldNum = currentDisplay.toString();
})

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




