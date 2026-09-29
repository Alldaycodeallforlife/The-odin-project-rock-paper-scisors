// ----- Math functions -----
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
  return b === 0 ? null : a / b; // null signals divide-by-zero
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// ----- State -----
let firstNumber = null; // first part of the operation
let operator = null; // second part
let current = "0"; // the number being typed (second part), also what is shown
let waitingForSecond = false; // an operator was just pressed
let resultShown = false; // a result is currently on the display
let error = false;

const display = document.querySelector("#display");
const decimalButton = document.querySelector("#decimal");

function updateDisplay() {
  display.textContent = current;
  decimalButton.disabled =
    !error && !resultShown && !waitingForSecond && current.includes(".");
}

function clearAll() {
  firstNumber = null;
  operator = null;
  current = "0";
  waitingForSecond = false;
  resultShown = false;
  error = false;
}

function round(number) {
  // Keeps long decimals from overflowing the display
  return Number(number.toPrecision(10));
}

function showError() {
  clearAll();
  current = "Nice try. You can't divide by 0!";
  error = true;
}

// ----- Input handlers -----
function inputDigit(digit) {
  if (error) clearAll();
  if (resultShown) {
    // Start a brand new calculation
    firstNumber = null;
    operator = null;
    current = digit;
    resultShown = false;
  } else if (waitingForSecond) {
    current = digit;
    waitingForSecond = false;
  } else {
    current = current === "0" ? digit : current + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (error) clearAll();
  if (resultShown) {
    firstNumber = null;
    operator = null;
    current = "0.";
    resultShown = false;
  } else if (waitingForSecond) {
    current = "0.";
    waitingForSecond = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay();
}

function chooseOperator(newOperator) {
  if (error) return;

  // Consecutive operator presses: just swap the operator, don't evaluate
  if (operator !== null && waitingForSecond) {
    operator = newOperator;
    return;
  }

  if (operator !== null) {
    // 12 + 7 then "-": evaluate the pair first
    const result = operate(operator, firstNumber, parseFloat(current));
    if (result === null) {
      showError();
      updateDisplay();
      return;
    }
    firstNumber = round(result);
    current = String(firstNumber);
  } else {
    firstNumber = parseFloat(current);
  }

  operator = newOperator;
  waitingForSecond = true;
  resultShown = false;
  updateDisplay();
}

function equals() {
  // Ignore "=" unless we have a first number, an operator and a second number
  if (error || operator === null || waitingForSecond) return;

  const result = operate(operator, firstNumber, parseFloat(current));
  if (result === null) {
    showError();
    updateDisplay();
    return;
  }

  current = String(round(result));
  firstNumber = null;
  operator = null;
  resultShown = true;
  updateDisplay();
}

function backspace() {
  if (error || resultShown || waitingForSecond) return;
  if (current.length <= 1 || (current.length === 2 && current[0] === "-")) {
    current = "0";
  } else {
    current = current.slice(0, -1);
  }
  updateDisplay();
}

function clearPressed() {
  clearAll();
  updateDisplay();
}

// ----- Button clicks -----
document.querySelector("#keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const { digit, op, action } = button.dataset;
  if (digit !== undefined) inputDigit(digit);
  else if (op !== undefined) chooseOperator(op);
  else if (action === "decimal") inputDecimal();
  else if (action === "equals") equals();
  else if (action === "backspace") backspace();
  else if (action === "clear") clearPressed();
});

// ----- Keyboard support -----
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") inputDigit(key);
  else if (key === ".") inputDecimal();
  else if ("+-*/".includes(key)) chooseOperator(key);
  else if (key === "Enter" || key === "=") {
    event.preventDefault(); // stops Enter from re-clicking a focused button
    equals();
  } else if (key === "Backspace") backspace();
  else if (key === "Escape") clearPressed();
});

updateDisplay();
