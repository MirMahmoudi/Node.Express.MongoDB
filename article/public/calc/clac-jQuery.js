// Beginning of the Calculating functions----------------
const clearAll = () => {
    currentOperand = '';
    previousOperand = '';
    globOperation = '';
}

const deleteNumber = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
}

const appendNumbers = (number) => {
    if(number == '.' && currentOperand.includes('.')) return;
    currentOperand += number.toString();
}

const setOperation = (operation) => {
    if(!currentOperand && !currentOperandText.text()) return;
    currentOperand = currentOperandText.text().toString().split(',').join('');
    if(previousOperand) computing();
    previousOperand = currentOperand;
    currentOperand = '';
    globOperation = operation;
}

const computing = () => {
    let resComputation;
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (!isNaN(current) && !isNaN(previous) && globOperation){
        switch (globOperation) {
            case '+':
                resComputation = previous + current;
                break;
            case '-':
                resComputation = previous - current;
                break;
            case '✕':
                resComputation = previous * current;
                break;
            case '÷':
                resComputation = previous / current;
                break;
            default:
                break;
        }
        currentOperand = resComputation;
        previousOperand = '';
        globOperation = '';
    };
}

const numberFormat = (number) => {
    number = parseFloat(number);
    let integer = parseFloat(number.toString().split('.')[0]);
    let decimal = number.toString().split('.')[1] ? number.toString().split('.')[1] : '';
    integer = integer.toLocaleString('en', {maximumFractionDigits: 0});
    return decimal ? `${integer}.${decimal}` : `${integer}`
}

const updateDisplay = () => {
    currentOperandText.text(currentOperand ? numberFormat(currentOperand) : '');
    previousOperandText.text(previousOperand ? `${numberFormat(previousOperand)} ${globOperation}` : '');
}

function equalsFunctionSetting(){
    previousOperand = currentOperand;
    currentOperand = '';
}

// Ending of the Calculating functions----------------

// Global variables
let currentOperand = '';
let previousOperand = '';
let globOperation = '';

// Accessing the html elements
const numberButtons = $('[number]')
const operationButtons = $('[operation]')
const previousOperandText = $('[previous-operand]')
const currentOperandText = $('[current-operand]')
const equalsButton = $('[equalsBtn]')
const clearButton = $('[clearBtn]')
const deleteButton = $('[deleteBtn]')

// add event listener
$.each(numberButtons, (i, button) => {
    $(button).click(() => {
        appendNumbers(button.innerText);
        updateDisplay();
    })
})

$.each(operationButtons, (i, button) => {
    $(button).click(() => {
        setOperation(button.innerText);
        updateDisplay();
    })
})

$(equalsButton).click(() => {
    computing();
    updateDisplay();
    equalsFunctionSetting();
})

$(clearButton).click(() => {
    clearAll();
    updateDisplay();
})

$(deleteButton).click(() => {
    deleteNumber();
    updateDisplay();
})
