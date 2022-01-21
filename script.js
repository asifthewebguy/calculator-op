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
    console.log(a - b);
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
        console.log("back button pressed");
    } else {
        console.log("back button pressed but disabled");
    }
}

function operate(operator, n1, n2) {
    console.log(operator);
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
    console.log(operator, n1, n2);
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
        console.log(operator, "eqalto operator pressed");
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
                    console.log(o1, 'updated to', operator);
                    o1 = operator;
                } else {
                    n2 = cn;
                    output = operate(o1, n1, n2);
                    console.log(operate(o1, n1, n2));
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

// console.log(operators);
operators.forEach((element) => {
    element.addEventListener("click", () => operatorsEvent(element));
});