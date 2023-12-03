/////// VARIABLE DECLARATIONS ///////
let oldNum = "";
let newNum = "";

let currentDisplay = "";

let operator = "";

let isOn = false;

let isFirstEquals = true;

let lastButtonPress = "";

let isFirstOperator = true;


let displayTimeout;






// Buttons
let onClear = document.querySelector("#on-c");
let backspace = document.querySelector("#backspace");
let mode = document.querySelector("#mode-toggle");
let equals = document.querySelector("#equals")
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator")

// Outputs etc.
let displayText = document.querySelector(".display-text");
let displayInner = document.querySelector(".display-inner");
let solarPanel = document.querySelector(".solar-panel");


//////// TIMEOUT FUNCTION
// Attach the event listener to your calculator buttons
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
function handleButtonClick() {
    resetTimeout(); // Reset the timeout on button click

}



let isFirstNum = true;

// NUMBER BUTTONS
numbers.forEach((num) => num.addEventListener("click", function(e) {
    handleMathButtons(e.target.textContent);
}))

function handleMathButtons(input) {
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


// OPERATOR BUTTONS
operators.forEach((opr) => opr.addEventListener("click", function(e) {
    handleOperatorButtons(e.target.textContent);
}))

function handleOperatorButtons(input) {

    console.log(`oldNum = ${oldNum}`);
    console.log(`newNum = ${newNum}`);
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
        console.log(`oldNum before eval = ${oldNum}`);
        console.log(`newNum before eval = ${newNum}`);
        console.log(`operator before eval = ${operator}`);

        oldNum = evaluate(oldNum, newNum, operator);

        console.log(`oldNum after eval = ${oldNum}`);

        operator = input;
        newNum = "";
        currentDisplay = `${oldNum} ${input} `;
        displayText.textContent = currentDisplay;
        isFirstNum = false;
    }
}




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


/////// FUNCTION DEFINITIONS ///////
function powerUpCalc() {
    // Initial setup of the timeout
    resetTimeout();

    

    displayInner.style.transition = "all 0.5s ease-in-out";
    displayInner.style.backgroundColor = "#728173";
    displayInner.style.color = "black";
}
// Function to fade the display
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
// Function to reset the timeout
function resetTimeout() {
    clearTimeout(displayTimeout);
    displayTimeout = setTimeout(powerDownCalc, 30000); // 30 seconds
  }

/////// EVENT LISTENERS and ACTIONS ///////




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
    displayText.textContent = "0.";
    
    isFirstOperator = true;

    isFirstEquals = true;
    oldNum = "";
    newNum = "";
    operator = "";
    isFirstNum = true;
})






