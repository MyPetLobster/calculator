// First attempt below

// ///// VARIABLE DECLARATIONS ///////

// // Global Variables
// let oldNum = "";
// let newNum = "";
// let operator = "";
// let currentDisplay = "";
// let lastButtonPress = "";

// let isOn = false;
// let isFirstEquals = true;
// let isFirstOperator = true;
// let isFirstNum = true;

// let displayTimeout;

// // Buttons
// const onClear = document.querySelector("#on-c");
// const backspace = document.querySelector("#backspace");
// const mode = document.querySelector("#mode-toggle");
// const equals = document.querySelector("#equals")
// const numbers = document.querySelectorAll(".number");
// const operators = document.querySelectorAll(".operator");

// // Outputs etc.
// const displayText = document.querySelector(".display-text");
// const displayInner = document.querySelector(".display-inner");
// const solarPanel = document.querySelector(".solar-panel");


// // TIMEOUT FUNCTIONALITY
// const calculatorButtons = document.querySelectorAll('.button');
// calculatorButtons.forEach(button => {
//   button.addEventListener('click', handleButtonClick);
// });
// function handleButtonClick() {
//     resetTimeout(); // Reset the timeout on button click
// }


// /////// FUNCTION DEFINITIONS ///////
// function powerUpCalc() {
//     resetTimeout();
//     displayInner.style.transition = "all 0.5s ease-in-out";
//     displayInner.style.backgroundColor = "#728173";
//     displayInner.style.color = "black";
// }

// function powerDownCalc() {
//     displayInner.style.transition = "all 0.8s ease-in-out";
//     displayInner.style.backgroundColor = "#28393D";
//     displayInner.style.color = "#263638";
//     isOn = false;
// }

// function dimDisplay() {
//     displayInner.style.transition = "all 5s ease-in-out";
//     displayInner.style.backgroundColor = "#28393D";
//     displayInner.style.color = "#263638";
// }

// function brightenDisplay () {
//     displayInner.style.backgroundColor = "#728173";
//     displayInner.style.color = "black";
//     displayInner.style.transition = "all 5s ease-in-out";
// }

// function resetTimeout() {
//     clearTimeout(displayTimeout);
//     displayTimeout = setTimeout(powerDownCalc, 30000); // 30 seconds
// }


// backspace.addEventListener("click", () => {

//     if (newNum === "") {
//         if (operator === "") {
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


// function handleNumberButtons(input) {
//     if (lastButtonPress === "equals") {
//         isFirstNum = true;
//         oldNum = "";
//         newNum = "";
//     }

//     isFirstEquals = true;
//     lastButtonPress = "number";

//     if (isFirstNum) {
//         newNum += input;
//         if (newNum.includes(".")) {
//             displayText.textContent = newNum;
//         } else {
//             displayText.textContent = `${newNum}.0`
//         }

//     } else {
//         newNum += input;
//         if (newNum.includes(".")) {
//             displayText.textContent = currentDisplay + newNum;
//         } else {
//             displayText.textContent = `${currentDisplay + newNum}.0`;
//         }
//     }
// }

// function evaluate(prev, current, opr) {
//     newNumConverted = +current;
//     oldNumConverted = +prev;

//     if (opr === "+") {
//         return oldNumConverted + newNumConverted;
//     } else if (opr === "-") {
//         return oldNumConverted - newNumConverted;
//     } else if (opr === "×") {
//         return oldNumConverted * newNumConverted;
//     } else if (opr === "÷") {
//         return oldNumConverted / newNumConverted;
//     }
// }

// function handleOperatorButtons(input) {
//     lastButtonPress = "operator";

//     if (isFirstOperator) {
//         if (isFirstEquals) {
//             oldNum = newNum;
//         }   
//         operator = input;
//         newNum = "";
//         currentDisplay = `${oldNum} ${input} `;
//         displayText.textContent = currentDisplay;
//         isFirstNum = false;
//         isFirstOperator = false;
//     } else {


//         oldNum = evaluate(oldNum, newNum, operator);


//         operator = input;
//         newNum = "";
//         currentDisplay = `${oldNum} ${input} `;
//         displayText.textContent = currentDisplay;
//         isFirstNum = false;
//     }
// }

// function clearAll() {
//     currentDisplay = "0.";
//     displayText.textContent = currentDisplay;
//     oldNum = "";
//     newNum = "";
//     operator = "";
//     isFirstNum = true;
//     isFirstOperator = true;
//     isFirstEquals = true;
// }


// /////// EVENT LISTENERS and ACTIONS ///////

// // OPERATOR BUTTONS
// operators.forEach((opr) => opr.addEventListener("click", function(e) {
//     handleOperatorButtons(e.target.textContent);
// }))

// // NUMBER BUTTONS
// numbers.forEach((num) => num.addEventListener("click", function(e) {
//     handleNumberButtons(e.target.textContent);
// }))

// // EQUALS BUTTON
// equals.addEventListener("click", () => {

//     lastButtonPress = "equals";

//     isFirstEquals = false;
//     isFirstOperator = true;

//     newNumConverted = +newNum;
//     oldNumConverted = +oldNum;

//     if (operator === "+") {
//         currentDisplay = oldNumConverted + newNumConverted;
//     } else if (operator === "-") {
//         currentDisplay = oldNumConverted - newNumConverted;
//     } else if (operator === "×") {
//         currentDisplay = oldNumConverted * newNumConverted;
//     } else if (operator === "÷") {
//         currentDisplay = oldNumConverted / newNumConverted;
//     }

//     displayText.textContent = currentDisplay;
//     oldNum = currentDisplay.toString();
// })

// // Solar Easter Egg
// solarPanel.addEventListener("mouseover", () => {
//     if (isOn) {
//         dimDisplay();
//     }
// })
// solarPanel.addEventListener("mouseout", () => {
//     if (isOn) {
//         brightenDisplay();
//     }
// })

// // Clear Button
// onClear.addEventListener("click", () => {
//     if (isOn === false) {
//         powerUpCalc();
//         isOn = true;
//     }
//     clearAll();
// })














//////////////////////// Second attempt below


// let oldNum = "";
// let newNum = "";
// let operator = "";
// let currentDisplay = `${oldNum} ${operator} ${newNum}`;

// let displayTimeout;

// let isOn = false;


// let numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
// let operatorList = ['+', '-', '÷', '×', '='];
// let otherButtonList = ['ON/C', '⌫', 'MODE'];


// // Buttons
// const onClear = document.querySelector("#on-c");
// const backspace = document.querySelector("#backspace");
// const mode = document.querySelector("#mode-toggle");
// const equals = document.querySelector("#equals")
// const numbers = document.querySelectorAll(".number");
// const operators = document.querySelectorAll(".operator");

// // Outputs etc.
// const displayText = document.querySelector(".display-text");
// const displayInner = document.querySelector(".display-inner");
// const solarPanel = document.querySelector(".solar-panel");

// // Timeout functionality
// const calculatorButtons = document.querySelectorAll('.button');
// calculatorButtons.forEach(button => {
//   button.addEventListener('click', handleButtonClick);
// });
// function handleButtonClick() {
//     resetTimeout(); 
// }


// /////// FUNCTION DEFINITIONS ///////

// function powerUpCalc() {
//     resetTimeout();
//     displayInner.style.transition = "all 0.5s ease-in-out";
//     displayInner.style.backgroundColor = "#728173";
//     displayInner.style.color = "black";
// }

// function powerDownCalc() {
//     displayInner.style.transition = "all 0.8s ease-in-out";
//     displayInner.style.backgroundColor = "#28393D";
//     displayInner.style.color = "#263638";
//     isOn = false;
// }

// function dimDisplay() {
//     displayInner.style.transition = "all 5s ease-in-out";
//     displayInner.style.backgroundColor = "#28393D";
//     displayInner.style.color = "#263638";
// }

// function brightenDisplay () {
//     displayInner.style.backgroundColor = "#728173";
//     displayInner.style.color = "black";
//     displayInner.style.transition = "all 5s ease-in-out";
// }

// function resetTimeout() {
//     clearTimeout(displayTimeout);
//     displayTimeout = setTimeout(powerDownCalc, 30000); // 30 seconds
// }

// function clearAll() {
//     currentDisplay = "0.";
//     displayText.textContent = currentDisplay;
//     oldNum = "";
//     newNum = "";
//     operator = "";
// }



// // EVENT LISTENERS and ACTIONS

// // Solar Easter Egg
// solarPanel.addEventListener("mouseover", () => {
//     if (isOn) {
//         dimDisplay();
//     }
// })
// solarPanel.addEventListener("mouseout", () => {
//     if (isOn) {
//         brightenDisplay();
//     }
// })

// // Clear Button
// onClear.addEventListener("click", () => {
//     if (isOn === false) {
//         powerUpCalc();
//         isOn = true;
//     }
//     clearAll();
// })


// function handleAllButtons(input) {
//     if (numberList.includes(input)) {
//         // Handle number input
//     } else if (operatorList.includes(input)) {
//         // Handle operator input
//     } else if (otherButtonList.includes(input)) {
//         // Handle other buttons
//     }
// }

// function handleNumbers(input) {
    
// }