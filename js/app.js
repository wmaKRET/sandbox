const computeBtn = document.querySelector('#compute-btn')
const actionBtns = document.querySelectorAll('[data-action-name]')
const valuesInput = document.querySelector('#values')

/**
 * math functions wrapped inside outer function
 * @returns {object} add / subtract / multiply / divide / gcd / lcm
 */
const mathFunction = (function(){
    // adds two numbers
    function add(a, b){
        return a + b
    }
    
    // subtract two numbers
    function subtract(a, b){
        return a - b
    }
    
    // multiply two numbers
    function multiply(a, b){
        return a * b
    }

    // divide two numbers
    function divide(a, b){
        return a / b
    }

    /**
     * returns Set of divisors(without remainder) of a number
     * used in 'greatest common divisor' function
     * @param {number} number
     * @returns {Array}
     */
    function divisibleWithoutRemainder(number){
        const absNumber = Math.abs(number)
        return Array(absNumber).fill()
                            .map((elem,i) => i + 1)
                            .filter(elem => absNumber % elem === 0)
                            .sort((a,b) => b - a)
    }

    /**
     * greatest common divisor of two numbers
     * @param {number} a 
     * @param {number} b 
     * @returns {number}
     */
    function gcd(a, b){ 
        if (a === 0 && b === 0) return 0
        if (a === 0) return Math.abs(b)
        if (b === 0) return Math.abs(a)

        const firstNumberDivisors = new Set(divisibleWithoutRemainder(a))
        const secondNumberDivisors = new Set(divisibleWithoutRemainder(b))
        for (const value of firstNumberDivisors) {
            if (secondNumberDivisors.has(value)) return value
        }
    }

    /**
     * least common multiple of two numbers
     * @param {number} a 
     * @param {number} b 
     * @returns {number}
     */
    function lcm(a, b){ 
        return (a * b) / gcd(a, b)
    }

    return {
        add,
        subtract,
        multiply,
        divide,
        gcd,
        lcm
    }
})()

/**
 * takes data-attribute value(string) from active button and invokes correct math function
 * @param {string} callback 
 * @param {...number} args 
 * @returns {function} chosen math function
 */
function executeFunctionByName(callback, ...args){
    return mathFunction[callback](...args)
}

/**
 * makes chosen button active and makes old active button not active anymore
 */
function toggleActiveButton(){
    const oldActiveButton = document.querySelector('.container-list-item-active')
    const newActiveButton = this
    oldActiveButton.classList.remove('container-list-item-active')
    newActiveButton.classList.add('container-list-item-active')
}

/**
 * takes values from input HTML tag and converts them to integers
 * @returns {array} of values
 */
function getInputValues(){
    const values = valuesInput.value.split(',').map(value => parseInt(value))
    return [...values]
}

// clears input value
function clearInput(){
    valuesInput.value = ''
}

/**
 * checks if user entered values the correct way (integer,integer)
 * @returns {boolean}
 */
function checkIfInputIsValid(){
    const regularExpression = /^-?\d+(,-?\d+)$/
    const values = getInputValues().join(',')
    return regularExpression.test(values)
}

/**
 * displays message to user 
 * @param {string} message 
 * @param {string} action in CSS there are different colors for different actions
 */
function displayAlert(message, action){
    const info = document.querySelector('#math-values-info')
    info.textContent = message
    info.classList.add(action)
    setTimeout(() => {
        info.textContent = 'Please enter values like so: a,b'
        info.classList.remove(action)
    }, 2000)
}

// disables compute button and input - so far it is used when displaying message to user
function disableInputAndButton(){
    computeBtn.disabled = true
    valuesInput.disabled = true
    computeBtn.classList.add('disabled')
    valuesInput.classList.add('disabled')
    setTimeout(() => {
        computeBtn.disabled = false
        valuesInput.disabled = false
        computeBtn.classList.remove('disabled')
        valuesInput.classList.remove('disabled')
    }, 2000)
}


computeBtn.addEventListener('click', function(){
    /**
     * checks if user typed values properly,
     * if false: disable interface, display message, clear input, return
     */
    if (!checkIfInputIsValid()){
        disableInputAndButton()
        displayAlert('Please enter two values separated by comma. (a,b)', 'failure')
        clearInput()
        return
    }
    const whichBoxIsActive = document.querySelector('.container-list-item-active')
    const values = getInputValues()
    /**
     * checks if action to compute is divide and second value = 0,
     * if true: disable interface, display message, clear input, return
     */
    if (whichBoxIsActive.dataset.actionName === 'divide' && values[1] === 0){
        disableInputAndButton()
        displayAlert(`You can't divide by 0! Please enter two values separated by comma. (a,b)`, 'failure')
        clearInput()
        return
    }
    /**
     * checks if action to compute is lcm(least common multiple) and if values <= 0,
     * if true: disable interface, display message, clear input, return
     */
    if (whichBoxIsActive.dataset.actionName === 'lcm' && (values[0] <= 0 || values[1] <= 0)){
        disableInputAndButton()
        displayAlert(`Please provide positive integers!! Please enter two values separated by comma. (a,b)`, 'failure')
        clearInput()
        return
    }
    const result = document.querySelector('#math-result')
    // computes values and displays result
    result.innerText = executeFunctionByName(whichBoxIsActive.dataset.actionName, ...values)
})

actionBtns.forEach(btn => {
    btn.addEventListener('click', toggleActiveButton)
})