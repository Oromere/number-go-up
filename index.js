window.onload = function () {
    init();
    loop();
};

class Counter {
    constructor() {
        this._counter = 0;
        this.counterElement = document.querySelector("#counter");
    }

    increment(value) {
        this._counter += value;
        this._counter = Math.round(this._counter * 10) / 10;
        this.updateElement();
    }

    decrement(value) {
        this._counter -= value;
        this._counter = Math.round(this._counter * 10) / 10;
        this.updateElement();
    }

    updateElement() {
        this.counterElement.innerHTML = this._counter;
    }

    isBigger(value) {
        return this._counter >= value;
    }
}

let counter = null;
let activeIncrement = 1;
let activeUpgradePrice = 1;
let activeUpgrades = 1;
let passiveIncrement = 0.1;
let passiveUpgrades = 1;
let passiveUpgradePrice = 1;

const activeUpgradePriceElement = document.querySelector("#upgradeActivePrice");
const passiveUpgradePriceElement = document.querySelector(
    "#upgradePassivePrice"
);

function init() {
    counter = new Counter();
    activeUpgradePriceElement.innerHTML = activeUpgradePrice;
    passiveUpgradePriceElement.innerHTML = passiveUpgradePrice;
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
        passiveIncrement += 0.1;
        checkUpgradePrice();
        // update html element
        passiveUpgradePriceElement.innerHTML = passiveUpgradePrice;
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
        activeIncrement += 0.1;
        checkUpgradePrice();
        // update html elements
        activeUpgradePriceElement.innerHTML = activeUpgradePrice;
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

// generate number from exponental distribution
function randomExponential(lambda) {
    return - Math.log(1 - Math.random()) / lambda;
}

const supriseModal = document.getElementById("supriseModal");
const supriseModalButton = document.getElementById("supriseBtn");
// Get the element that closes the modal
const modalClose = document.getElementsByClassName("close")[0];

// open the modal
supriseModalButton.onclick = function() {
  supriseModal.style.display = "block";
}

// close the modal
modalClose.onclick = function() {
  supriseModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == supriseModal) {
    supriseModal.style.display = "none";
  }
} 

