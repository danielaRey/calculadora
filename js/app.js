// This is the final source code file for a blog post "How to build a calculator". 
//You can follow the lesson at https://zellwk.com/blog/calculator-part-1
//copy from https://codepen.io/zellwk/pen/MVbVZV?ck_subscriber_id=230697241


const calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  if(result===666){
    document.documentElement.style.setProperty(`--base`, 'red');
  }
  return result
}

const calculator = document.querySelector('.calculadora')
const display = calculator.querySelector('.display')
const keys = calculator.querySelector('.keys')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
  
    // console.log(key);
    const action = key.dataset.action
    const keyContent = key.textContent
    // console.log("keyContent: " + keyContent)
    const displayedNum = display.textContent
    console.log("hola: "+displayedNum);
    const previousKeyType = calculator.dataset.previousKeyType
    // console.log(previousKeyType);
    // console.log(key.parentNode.children)
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
    }

    if (action === 'decimal') {
      display.textContent = displayedNum + '.'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
        document.documentElement.style.setProperty(`--base`, 'black');
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }


    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      display.textContent = calculate(firstValue, operator, secondValue)
    }
  }
})
