const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
let n1 = 0;
let n2 = 0;
let o1 = "";
let o2 = "";
let clear = true;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function clean() {
    n1 = 0;
    n2 = 0;
    o1 = "";
    o2 = "";
    clear = true;
    display.innerHTML = "0";
}

function back() {
    let d = (display.innerHTML).split("");
    if (d.length >= 1 && d[0] != 0) {
        d.pop();
        let output = d.join("");
        if (output === "") {
            display.innerHTML = "0";
        } else {
            display.innerHTML = output;
        }

    }
}

function operate(operator, n1, n2) {
    let output = 0;
    switch (operator) {
        case "+":
            output = add(n1, n2);
            break;
        case "-":
            output = subtract(n1, n2);
            break;
        case "×":
            output = multiply(n1, n2);
            break;
        case "÷":
            output = divide(n1, n2);
            break;
        default:
            break;
    }
    return output;
}

function answer(operator, n1, n2) {
    output = operate(operator, n1, n2);
    n1 = 0;
    n2 = 0;
    o1 = "";
    o2 = "";
    clear = true;
    display.innerHTML = output;
}

function digitsEvent(element) {
    number = element.innerHTML;
    if (clear) {
        if (number === ".") {
            display.innerHTML = display.innerHTML + number;
        } else {
            display.innerHTML = number;
        }
        clear = false;
    } else {
        if (number === ".") {
            if (display.innerHTML.split("").includes(".")) {
                display.innerHTML = display.innerHTML;
            } else {
                display.innerHTML = display.innerHTML + number;
            }
        } else {
            display.innerHTML = display.innerHTML + number;
        }
    }
}

function operatorsEvent(element) {
    const operator = element.innerHTML;
    if (operator === "AC") {
        clean();
    }
    if (operator === "⇐") {
        back();
    }
    if (operator === "=") {
        answer(o1, n1, parseFloat(display.innerHTML));
    }
    if (operator === "+" || operator === "-" || operator === "×" || operator === "÷") {
        let cn = parseFloat(display.innerHTML);
        if (cn != 0) {
            if (n1 === 0) {
                n1 = cn;
                o1 = operator;
                clear = true;
            } else {
                if (n1 && o1 && n2 == 0 && clear == true) {
                    o1 = operator;
                } else {
                    n2 = cn;
                    output = operate(o1, n1, n2);
                    display.innerHTML = output;
                    o1 = operator;
                    n1 = output;
                    n2 = 0;
                    clear = true;
                }

            }
        }
    }
}

digits.forEach((element) => {
    element.addEventListener("click", () => digitsEvent(element));
});

operators.forEach((element) => {
    element.addEventListener("click", () => operatorsEvent(element));
});

window.addEventListener("keydown", (e) => {
    console.log(e);
    e.preventDefault();
    let element = document.querySelector(`button[data-key="${e.key}"]`);
    if (element) {
        if (element.classList.contains('digit')) {
            digitsEvent(element);
        } else {
            operatorsEvent(element);
        }
    }
});