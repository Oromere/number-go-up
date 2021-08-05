let counter = null;

function init(counterObj) {
    counter = counterObj;
}

// generate number from exponental distribution
function randomExponential(lambda) {
    return -Math.log(1 - Math.random()) / lambda;
}

// get all relevant elements
const supriseModal = document.getElementById("supriseModal");
const supriseModalButton = document.getElementById("supriseBtn");
const modalClose = document.getElementsByClassName("close")[0];
const submit = document.querySelector("#supriseSubmit");
const input = document.querySelector("#supriseInput");
const winLabel = document.querySelector("#supriseWin");

// open the modal
supriseModalButton.onclick = function () {
    supriseModal.style.display = "block";
};

// close the modal
modalClose.onclick = function () {
    supriseModal.style.display = "none";
};

// submit handler
submit.onclick = function (event) {
    event.preventDefault();
    
    const bet = input.value;
    const factor = randomExponential(0.5);

    if (bet) {
        counter.decrement(bet);
        const win = Math.round(bet * factor * 10) / 10;
        counter.increment(win);

        winLabel.innerHTML = "You won " + win;
    }
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == supriseModal) {
        supriseModal.style.display = "none";
    }
};

export default (counter) => {
    init(counter);
};
