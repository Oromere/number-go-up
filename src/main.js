let counter = null;
let activeIncrement = 1;
let activeUpgradePrice = 1;
let activeUpgrades = 1;
let passiveIncrement = 0.1;
let passiveUpgrades = 1;
let passiveUpgradePrice = 1;

const activeUpgradePriceElement = document.querySelector(
    "#upgradeActivePrice"
);
const passiveUpgradePriceElement = document.querySelector(
    "#upgradePassivePrice"
);
const activeCurrentElement = document.querySelector(
    "#currentActiveIncome"
);
const passiveCurrentElement = document.querySelector(
    "#currentPassiveIncome"
);

function init(counterObj) {
    counter = counterObj;
    activeUpgradePriceElement.innerHTML = "Price: " + activeUpgradePrice;
    passiveUpgradePriceElement.innerHTML = "Price: " + passiveUpgradePrice;
    activeCurrentElement.innerHTML = "Current: " + activeIncrement;
    passiveCurrentElement.innerHTML = "Current: " + passiveIncrement;
}

// increments counter every second
function loop() {
    setInterval(function () {
        counter.increment(passiveIncrement);
        checkUpgradePrice();
    }, 1000);
}

// go up button
const plusButton = document.querySelector("#plusBtn");
plusButton.addEventListener(
    "click",
    function () {
        counter.increment(activeIncrement);
        checkUpgradePrice;
    },
    false
);

// passive upgrade button handling
const passiveUpgradeButton = document.querySelector("#upgradePassiveBtn");
passiveUpgradeButton.addEventListener(
    "click",
    function () {
        counter.decrement(passiveUpgradePrice);
        // update passive upgrade price
        passiveUpgrades++;
        passiveUpgradePrice = Math.pow(passiveUpgrades, 2);
        passiveIncrement = roundToOneDecimal(passiveIncrement += 0.1)
        checkUpgradePrice();
        // update html element
        passiveUpgradePriceElement.innerHTML = "Price: " + passiveUpgradePrice;
        passiveCurrentElement.innerHTML = "Current: " + passiveIncrement;
    },
    false
);

// active upgrade button handling
const activeUpgradeButton = document.querySelector("#upgradeActiveBtn");
activeUpgradeButton.addEventListener(
    "click",
    function () {
        counter.decrement(activeUpgradePrice);
        // update price for active upgrades
        activeUpgrades++;
        activeUpgradePrice = Math.pow(activeUpgrades, 2);
        activeIncrement = roundToOneDecimal(activeIncrement += 0.1);
        checkUpgradePrice();
        // update html elements
        activeUpgradePriceElement.innerHTML = "Price: " + activeUpgradePrice;
        activeCurrentElement.innerHTML = "Current: " + activeIncrement;
    },
    false
);

// tests if price for upgrades are bigger than current count
function checkUpgradePrice() {
    // check active upgrades
    if (counter.isBigger(activeUpgradePrice)) {
        activeUpgradeButton.disabled = false;
    } else {
        activeUpgradeButton.disabled = true;
    }
    // check passive upgrades
    if (counter.isBigger(passiveUpgradePrice)) {
        passiveUpgradeButton.disabled = false;
    } else {
        passiveUpgradeButton.disabled = true;
    }
}

// HELPER Functions
function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
}

export default (counter) => {
    init(counter);
    loop();
};