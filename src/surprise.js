let counter = null;

function init(counterObj) {
    counter = counterObj;
}

// modal elements
const surpriseModal = document.getElementById("surpriseModal");
const surpriseModalButton = document.getElementById("surpriseBtn");
const modalClose = document.getElementsByClassName("close")[0];
// form elements
const form = document.getElementsByTagName("form")[0];
const input = document.querySelector("#bet");
const inputError = document.querySelector("#bet + span.error");
const winLabel = document.querySelector("#surpriseWin");

// helper to generate number from exponental distribution
function randomExponential(lambda) {
    return -Math.log(1 - Math.random()) / lambda;
}

function validate() {
    // set current max value
    input.max = counter._counter;
    // on each typing check input validity

    if (input.validity.valid) {
        // remove error message in case field is valid
        inputError.textContent = ""; // reset content
        inputError.className = "error"; // reset visual state
        return true;
    } else {
        // if there is still an error, show the correct error
        showError();
        return false;
    }
}

form.addEventListener("submit", function (event) {
    // prevent event default behaivor
    event.preventDefault();

    // test validity of field
    if (!validate()) {
        return;
    }

    const bet = input.value;
    // calculate the winning factor
    const factor = randomExponential(0.5);

    counter.decrement(bet);
    const win = Math.round(bet * factor * 10) / 10;
    counter.increment(win);
    showWin(win);
});

function showWin(win) {
    winLabel.innerHTML = "You won " + win;
}

function showError() {
    if (input.validity.valueMissing) {
        inputError.textContent = "You need to enter a number.";
    } else if (input.validity.rangeOverflow) {
        inputError.textContent = "You dont have that much.";
    } else if (input.validity.rangeUnderflow) {
        inputError.textContent = "That is not enough.";
    }

    // set styling
    inputError.className = "error active";
}

// open the modal
surpriseModalButton.onclick = function () {
    surpriseModal.style.display = "block";
};

// close the modal
modalClose.onclick = function () {
    surpriseModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == surpriseModal) {
        surpriseModal.style.display = "none";
    }
};

export default (counter) => {
    init(counter);
};
