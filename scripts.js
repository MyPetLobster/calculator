let isOn = false;



let displayText = document.querySelector(".display-text");
let onClear = document.querySelector("#on-c");
let displayInner = document.querySelector(".display-inner");


onClear.addEventListener("click", () => {
    if (isOn === false) {
        powerUpCalc();
        isOn === true;
        
    }
    displayText.innerHTML = "0.";
})



function powerUpCalc() {
    displayInner.style.backgroundColor = "#728173";
    displayText.style.color = "black";
}