let isOn = false;


let displayText = document.querySelector(".display-text");
let onClear = document.querySelector("#on-c");
let displayInner = document.querySelector(".display-inner");
let solarPanel = document.querySelector(".solar-panel");


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


solarPanel.addEventListener("mouseover", () => {
    dimDisplay();
})
solarPanel.addEventListener("mouseout", () => {
    brightenDisplay();
})



onClear.addEventListener("click", () => {
    if (isOn === false) {
        powerUpCalc();
        isOn === true;
        
    }
    displayText.innerHTML = "0.";
})




