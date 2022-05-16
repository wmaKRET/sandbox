// DECLARATIONS
const button = document.querySelector('#math-button')
const actionBtns = document.querySelectorAll('[data-function-name]')
const valuesInput = document.querySelector('#values')

// JS MATH FUNCTIONS
const mathFunction = (function(){
    function add(a, b){
        return a + b
    }
    
    function subtract(a, b){
        return a - b
    }
    
    function multiply(a, b){
        return a * b
    }

    function divide(a,b){
        return a / b
    }

    function nwd(a,b){ // greatest common divisor (największy wspólny dzielnik)
        if (a === 0 && b === 0) return 0
        if (a === 0) return Math.abs(b)
        if (b === 0) return Math.abs(a)

        function dividedBy(number){
            let array = []
            for (let i = 1; i <= Math.abs(number); i++){
                if (number % i === 0) array.push(i)
            }
            return array.sort((x,y) => y - x)
        }
        const secondArray = dividedBy(b)
        return dividedBy(a).find(elem => secondArray.includes(elem))
    }

    function nww(a,b){
        return (a * b) / nwd(a,b)
    }

    return {
        add,
        subtract,
        multiply,
        divide,
        nwd,
        nww
    }
})()

// EXECUTE FUNCTION 
function executeFunctionByName(callback, ...args){
    return mathFunction[callback](...args)
}

// OTHER FUNCTIONS
function toggleActiveButton(){
    const oldActiveButton = document.querySelector('.container-list-item-active')
    const newActiveButton = this
    oldActiveButton.classList.remove('container-list-item-active')
    newActiveButton.classList.add('container-list-item-active')
}

function getInputValues(){
    const values = valuesInput.value.split(',').map(value => parseInt(value))
    return [...values]
}

function clearInput(){
    valuesInput.value = ''
}

function checkIfInputIsValid(){
    const regularExpression = /^-?\d+(,-?\d+)$/    // CHECKING IF INPUT IS CORRECT (number,number)
    const values = getInputValues().join(',')
    return regularExpression.test(values)
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
    button.disabled = true
    valuesInput.disabled = true
    button.classList.add('disabled')
    valuesInput.classList.add('disabled')
    setTimeout(() => {
        button.disabled = false
        valuesInput.disabled = false
        button.classList.remove('disabled')
        valuesInput.classList.remove('disabled')
    }, 2000)
}

// EVENT LISTENERS
button.addEventListener('click', function(){
    // CHECKING IF INPUT VALUES ARE GIVEN PROPERLY
    if (!checkIfInputIsValid()){
        disableInputAndButton()
        displayInfo('Please enter two values separated by comma. (a,b)', 'failure')
        clearInput()
        return
    }
    const whichBoxIsActive = document.querySelector('.container-list-item-active')
    const result = document.querySelector('#math-result')
    const values = getInputValues()
    // DIVISION CONDITION, SECOND VALUE = 0
    if (whichBoxIsActive.dataset.functionName === 'divide' && values[1] === 0){
        disableInputAndButton()
        displayInfo(`You can't divide by 0! Please enter two values separated by comma. (a,b)`, 'failure')
        clearInput()
        return
    }
    // LCM CONDITION, FIRST OR SECOND VALUE < 0
    if (whichBoxIsActive.dataset.functionName === 'nww' && (values[0] <= 0 || values[1] <= 0)){
        disableInputAndButton()
        displayInfo(`Please provide positive integers!! Please enter two values separated by comma. (a,b)`, 'failure')
        clearInput()
        return
    }
    result.innerText = executeFunctionByName(whichBoxIsActive.dataset.functionName, ...values)
})

actionBtns.forEach(button => {
    button.addEventListener('click', toggleActiveButton)
})