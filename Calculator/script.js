const display = document.getElementById("display");
let justCalculated = false;

function appendValue(value) {
  if (justCalculated && /[0-9.(]/.test(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
  justCalculated = false;
}

function clearDisplay() {
  display.value = "";
  justCalculated = false;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    if (display.value === "") return;

    const result = Function('"use strict";return (' + display.value + ")")();
    display.value = result;
    justCalculated = true;
  } catch (error) {
    display.value = "Error";
    justCalculated = true;
  }
}
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key) || key === ".") {
    appendValue(key);
  }
  else if (/[+\-*/]/.test(key)) {
    appendValue(key);
  }

  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  }

  else if (key === "Backspace") {
    deleteLast();
  }

  else if (key === "Escape") {
    clearDisplay();
  }

});