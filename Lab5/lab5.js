let productTypeSelect = document.getElementById("productType-select");
let form = document.forms["calculator"];
let productLineRadios = form.elements["productLine"];
let mainCont = document.getElementById("main");
let img = document.getElementById("image");
let linearFootage = document.getElementById("linearFootage");
let cornerUnits = document.getElementById("cornerUnits");
let resultTotal = document.getElementById("resultTotal");

const productType2Img = {
    "BC": "base.png",
    "WC": "wall.png",
    "CT": "counters.png",
    "Corner": "corners.png"
}
const productLine2Color = {
    "ES": "blue",
    "KE": "palevioletred",
    "GSP": "gold",
    "none": "black"
}
const productTypePriceTable = {
    "WC": {"ES": 99.99, "KE": 179, "GSP": 200.99},
    "BC": {"ES": 69.99, "KE": 79, "GSP": 99.99},
    "CT": {"ES": 30.99, "KE": 189.99, "GSP": 212.99},
}
const cornerPriceTable = {
    "ES": 50.99, "KE": 79.99, "GSP": 89.99
}

function changeBorder(productLineValue) {
    mainCont.style.borderColor = productLine2Color[productLineValue];
}
let lastSrc;
function changeImage(selectedValue) {
    let src = selectedValue === "llo" ? (productType2Img[selectedValue]) : "";
    if (src==lastSrc) return;
    lastSrc=src
    img.classList.add("fade");
    setTimeout(function(){
        img.src = src;
        img.addEventListener("load", img.classList.remove("fade"));
    }, 200);
}
function toggleCornerUnitsInput() {
    if (productTypeSelect.selectedIndex === 0) {
        // corner mode
        linearFootage.disabled = true;
        linearFootage.required = false;

        cornerUnits.disabled = false;
        cornerUnits.required = true;

        productTypeSelect.required = false;
        cornerMode=true;
    }
    else {
        // footage mode
        cornerUnits.disabled = true;
        cornerUnits.required = false;

        linearFootage.disabled = false;
        linearFootage.required = true;

        productTypeSelect.required = false;
        cornerMode=false;
    } 
}
function imageCheck() {
    /*
    3 types: yes product type
    corner: no product type, yes product line, yes input 4
    empty: no product type, no product line
    */
    if (selectedValue!=0) changeImage(selectedValue);
    else if (checkedRadio!==null && cornerUnits.value>=0) changeImage("Corner");
    else changeImage("");
}
// select: image
let selectedValue;
function onSelectChange() {
    selectedValue = productTypeSelect.options[productTypeSelect.selectedIndex].value;
    toggleCornerUnitsInput();
    imageCheck();
    if (this.selectedIndex!==0) changeImage(selectedValue);
}
productTypeSelect.addEventListener("change", onSelectChange);

// radio: border + image
let checkedRadio=null;
for (let i=0;i<productLineRadios.length;i++) {
    let current=productLineRadios[i];
    if (current.checked) checkedRadio=current;
    current.addEventListener("change", function() {
        checkedRadio=current;
        changeBorder(current.value);
        imageCheck();
    });
}
// cornerUnits (input 4): image
cornerUnits.addEventListener("change", imageCheck);

// calculate
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let quantity, unitPrice, e=false; 
    if (cornerMode) {
        unitPrice = cornerPriceTable[checkedRadio.value];
        quantity = cornerUnits.value;
        if (quantity < 0 || quantity > 5) {
            e = true;
            alert("The number of Corner Units must be from 0 to 5");
        }
    } else {
        unitPrice = productTypePriceTable[selectedValue][checkedRadio.value];
        quantity = linearFootage.value;
        if (quantity < 3 || quantity > 50) {
            e = true;
            alert("Linear footage must be between 3 to 50 feet.")
        }
    }
    let total = quantity*unitPrice;
    resultTotal.value = e?"":`$${total} ($${unitPrice}x${quantity})`;
});

// startup
onSelectChange();
changeBorder("none");
/* todo
- [X] productType change -> image
- [X] productLine change -> border
- [X] productType select -> disable corner
- [X] more image handling
- [ ] calculate logic
*/