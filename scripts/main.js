let add = (a, b) => { return a + b }
let multiply = (a, b) => { return a * b }
let subtract = (a, b) => { return a - b }
let divide = (a, b) => { return a / b }

let operate = (string, a, b) => {
  let operator = string

  switch(operator){
    case '+':
      return add(a, b);
      break;
    case 'x':
      return multiply(a, b);
      break;
    case '-':
      return subtract(a, b);
      break;
    case '/':
      return divide(a, b);
      break;
    default:
      return "";
  }
}

const keys = Array.from(document.querySelectorAll('.key'))
const display = document.querySelector('#display__text')
const operators = /x|\+|-|\//
const equals = /\=/
const decimal = /\./
let memory = []

function sendToDisplay() {
  keys.forEach((key) => {
    key.addEventListener('click', (e) => {
      let key = e.target.innerText.toLowerCase()
      
      if (key == 'clear') {
        clearAll()
      } 
      else if (operators.test(key)) {
        addNumberToMemory(key)
      } 
      else if (key == '.') {
        addDecimal(key)
      } 
      else if (key == '=') {
        calculateFromMemory()
      } 
      else {
        addDigit(key)
      }
    })
  });
}

function clearAll() {
  display.textContent = '';
  memory = []
}

function addNumberToMemory(key) {
  // Add the last number on screen, then the operator
  memory.push(parseFloat(display.textContent))
  memory.push(key)
  display.textContent += (' ' + key + ' ')
}

function addDecimal(key) {
  if (!decimal.test((display.textContent).match(/\d+\.\d+$/))) {
    display.textContent += key
  }
}

function addDigit(key) {
  if (operators.test(memory[-1])) {
    display.textContent += ' ' + key
  }
  else {
    display.textContent += key 
  }
}

function calculateFromMemory() {
  let currentMemory = display.textContent.split(' ')
  let newNumber = parseFloat(currentMemory.pop())

  memory.push(newNumber)
  result = operate(memory[1], memory[0], memory[2])
  
  display.textContent = result
  memory = []
}

sendToDisplay();