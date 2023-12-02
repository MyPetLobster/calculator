/////// VARIABLE DECLARATIONS ///////
let oldNum = "";
let newNum = "";
let operator = "";

let isOn = false;

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



let displayTimeout;


// Attach the event listener to your calculator buttons
const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});


// Event listener for button clicks
function handleButtonClick() {
  // Your code to handle button click
  console.log("Button clicked");
  resetTimeout(); // Reset the timeout on button click
}








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
})






