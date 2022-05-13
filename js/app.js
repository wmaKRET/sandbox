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

function checkIfInputIsValid(){
    const re = /^\d+(,\d+)$/    // REGULAR EXPRESSION TO CHECK IF INPUT IS CORRECT (number,number)
    const values = getInputValues().join(',')
    return re.test(values)
}

function displayInfo(message, action){
    const info = document.querySelector('#math-values-info')
    info.textContent = message
    info.classList.add(action)
    setTimeout(() => {
        info.textContent = 'Please enter values like so: a,b'
        info.classList.remove(action)
    }, 2000)
}

function disableInputAndButton(){
    const valuesInput = document.querySelector('#values')
    button.disabled = true
    valuesInput.disabled = true
    button.classList.toggle('disabled')
    valuesInput.classList.toggle('disabled')
    setTimeout(() => {
        button.disabled = false
        valuesInput.disabled = false
        button.classList.toggle('disabled')
        valuesInput.classList.toggle('disabled')
    }, 2000)
}

// EVENT LISTENERS
button.addEventListener('click', function(){
    if (checkIfInputIsValid()){
        const whichBoxIsActive = document.querySelector('.container-list-item-active')
        const result = document.querySelector('#math-result')
        const values = getInputValues()
        result.innerText = executeFunctionByName(whichBoxIsActive.dataset.functionName, ...values)
    } else {
        disableInputAndButton()
        displayInfo('Please enter two values separated by comma. (a,b)', 'failure')
    }
    clearInput()
})

actionBtns.forEach(button => {
    button.addEventListener('click', toggleActiveButton)
})