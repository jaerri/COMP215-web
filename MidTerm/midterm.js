let priceEl = document.getElementById("WidgetPriceTextbox");
let numberEl = document.getElementById("NumberWidgetsSoldTextbox");
let commissionEl = document.getElementById("CommissionRateTextbox");
let resultEl = document.getElementById("CommissionEarnedTextbox");
function check() {
    if (
        priceEl.value === "" ||
        numberEl.value === "" ||
        commissionEl.value === ""
    ) alert("All input values are required");
}
function calculate() {
    let price = priceEl.value;
    let number_sold = numberEl.value;
    let commission_rate = commissionEl.value / 100;
    let commissionEarned = price*number_sold*commission_rate;
    resultEl.value = commissionEarned.toFixed(2);
}