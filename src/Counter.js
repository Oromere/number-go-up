class Counter {
    constructor() {
        this._counter = 0;
        this.counterElement = document.querySelector("#count");
    }

    increment(value) {
        this._counter += value;
        this._counter = roundToOneDecimal(this._counter);
        this.updateElement();
    }

    decrement(value) {
        this._counter -= value;
        this._counter = roundToOneDecimal(this._counter);
        this.updateElement();
    }

    updateElement() {
        this.counterElement.innerHTML = this._counter;
    }

    isBigger(value) {
        return this._counter >= value;
    }
}

function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
}

export default Counter;