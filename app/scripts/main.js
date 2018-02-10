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
      return "Please try again";
  }
}

const keys = Array.from(document.querySelectorAll('.key'))
const display = document.querySelector('#display')
const operators = /x|\+|-|\//
const equals = /\=/
const decimal = /\./
let calculation = []

function sendToDisplay() {
  keys.forEach((key) => {
    key.addEventListener('click', (e) => {
      let keyText = e.target.innerText.toLowerCase()
      
      if (keyText == 'clear') {
        clearAll()
      } else if (operators.test(keyText)) {
        calculation.push(parseInt(display.textContent))
        calculation.push(keyText)

        display.textContent = ''
      } else if (keyText == '.') {
        addDecimal(keyText)
      } else if (keyText == '=') {
        calculation.push(parseInt(display.textContent))
        result = operate(calculation[1], calculation[0], calculation[2])
        
        display.textContent = result
      } else {
        display.textContent += keyText 
      }

      console.log(calculation)
    })
  });
}

function clearAll() {
  display.textContent = '';
  calculation = []
}

function addDecimal(keyText) {
  if (!decimal.test(display.textContent)) display.textContent += keyText
}

sendToDisplay();