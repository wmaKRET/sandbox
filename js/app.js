// DECLARATIONS
const button = document.querySelector('#math-button')
const actionBtns = document.querySelectorAll('[data-function-name]')

// JS MATH FUNCTIONS
function sum(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

// EXECUTE FUNCTION 
function executeFunctionByName(callback, ...args){
    return window[callback](...args)
}

// OTHER FUNCTIONS
function toggleActiveButton(){
    const oldActiveButton = document.querySelector('.container-list-item-active')
    const newActiveButton = this
    oldActiveButton.classList.remove('container-list-item-active')
    newActiveButton.classList.add('container-list-item-active')
}

function getInputValues(){
    const valuesInput = document.querySelector('#values')
    const values = valuesInput.value.split(',').map(value => parseFloat(value))
    return [...values]
}

function clearInput(){
    const valuesInput = document.querySelector('#values')
    valuesInput.value = ''
}

// EVENT LISTENERS
button.addEventListener('click', function(){
    const whichBoxIsActive = document.querySelector('.container-list-item-active')
    const result = document.querySelector('#math-result')
    const values = getInputValues()
    result.innerText = executeFunctionByName(whichBoxIsActive.dataset.functionName, ...values)
})

actionBtns.forEach(button => {
    button.addEventListener('click', toggleActiveButton)
})