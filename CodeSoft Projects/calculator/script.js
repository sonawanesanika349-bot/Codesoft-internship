let display = document.getElementById("display");

// Append value to the display
function append(value) {
  display.value += value;
}

// Clear all input
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Perform calculation
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    alert("Invalid Input!");
  }
}
