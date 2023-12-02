/////// VARIABLE DECLARATIONS ///////

let isOn = false;

let displayText = document.querySelector(".display-text");
let onClear = document.querySelector("#on-c");
let displayInner = document.querySelector(".display-inner");
let solarPanel = document.querySelector(".solar-panel");


/////// FUNCTION DEFINITIONS ///////

function powerUpCalc() {
    displayInner.style.backgroundColor = "#728173";
    displayInner.style.color = "black";
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
        isOn === true;
    }
    displayText.textContent = "0.";
})






