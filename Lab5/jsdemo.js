const textCheck = document.getElementById("inputCheck");
function isEmpty() {
    var text = textCheck.value;
    if (text==="") alert("nothing");
    else alert(text);
}
document.getElementById("buttonCheck").addEventListener("click", isEmpty);

const textGoto = document.getElementById("inputGoto")
function goto() {
    window.location.href="https://"+textGoto.value;
}
document.getElementById("buttonGoto").addEventListener("click", goto);

const textBrowser = document.getElementById("textBrowser");
function browser() {
    textBrowser.value=navigator.appName;
}
document.getElementById("buttonBrowser").addEventListener("click", browser);

const buttonUp = document.getElementById("buttonUp");
const buttonDown = document.getElementById("buttonDown");
const buttonRight = document.getElementById("buttonRight");
const buttonLeft = document.getElementById("buttonLeft");
const buttonHide = document.getElementById("buttonHide");
const buttonShow = document.getElementById("buttonShow");

const MoveButtonList = ["buttonUp", "buttonDown", "buttonRight", "buttonLeft"];
const floatingForm = document.getElementById("floatingForm");
const MOVE_AMOUNT = 10;

MoveButtonList.forEach(function(id) {
    document.getElementById(id).addEventListener("click", function() {
        let {top: topValue, left: leftValue} = getComputedStyle(floatingForm);
        topValue=parseInt(topValue.slice(0,-2));
        leftValue=parseInt(leftValue.slice(0,-2));
        switch (this.id) {
            case "buttonUp":
                floatingForm.style.top = topValue-MOVE_AMOUNT+'px';
                break;
            case "buttonDown":
                floatingForm.style.top = topValue+MOVE_AMOUNT+'px';
                break;
            case "buttonLeft":
                floatingForm.style.left = leftValue-MOVE_AMOUNT+'px';
                break;
            case "buttonRight":
                floatingForm.style.left = leftValue+MOVE_AMOUNT+'px';
                break;
        }
    });
});

buttonHide.addEventListener("click", function() {
    let {visibility: v} = getComputedStyle(floatingForm);
    floatingForm.style.visibility=(v=="hidden"?"visible":"hidden");
});