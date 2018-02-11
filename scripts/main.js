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
      let keyText = e.target.innerText.toLowerCase()
      
      if (keyText == 'clear') {
        clearAll()
      } 
      else if (operators.test(keyText)) {
        addToMemory(keyText)
      } 
      else if (keyText == '.') {
        addDecimal(keyText)
      } 
      else if (keyText == '=') {
        let currentMemory = display.textContent.split(' ')
        let newNumber = parseInt(currentMemory.pop())

        memory.push(newNumber)
        result = operate(memory[1], memory[0], memory[2])
        
        display.textContent = result
        memory = []
      } 
      else {
        addDigit(keyText)
      }
    })
  });
}

function clearAll() {
  display.textContent = '';
  memory = []
}

function addToMemory(keyText) {
  // Add the last number on screen, then the operator
  memory.push(parseInt(display.textContent))
  memory.push(keyText)
  display.textContent += (' ' + keyText + ' ')
}

function addDecimal(keyText) {
  if (!decimal.test(display.textContent)) display.textContent += keyText
}

function addDigit(keyText) {
  if (operators.test(memory[-1])) {
    display.textContent += ' ' + keyText
  }
  else {
    display.textContent += keyText 
  }
}

sendToDisplay();