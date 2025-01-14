const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation');
let currentInput = '';
let operator = '';
let operand1 = '';
let operand2 = '';

function updateDisplay(value) {
    display.textContent = value;
}

function updateOperationDisplay(value) {
    operationDisplay.textContent = value;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    operand1 = '';
    operand2 = '';
    updateDisplay('0');
    updateOperationDisplay('');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
    if (operator) {
        updateOperationDisplay(operand1 + ' ' + operator + ' ' + currentInput);
    } else {
        updateOperationDisplay(currentInput);
    }
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (operator) calculate();
    operator = op;
    operand1 = currentInput;
    currentInput = '';
    updateOperationDisplay(operand1 + ' ' + operator);
}

function calculate() {
    operand2 = currentInput;
    let result;
    const num1 = parseFloat(operand1.replace('÷', '/').replace('×', '*'));
    const num2 = parseFloat(operand2.replace('÷', '/').replace('×', '*'));

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '×':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                updateDisplay("You can't divide with 0! I mean, you can, but this is simple calculator");
                updateOperationDisplay('');
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    if (result.toString().length > 10) {
        updateDisplay(result.toFixed(5));
        updateOperationDisplay('');
    } else {
        updateDisplay(result.toString());
        updateOperationDisplay('');
    }
    currentInput = result.toString();
    operator = '';
}

document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('delete').addEventListener('click', deleteLast);
document.getElementById('divide').addEventListener('click', function() { appendOperator('÷'); });
document.getElementById('seven').addEventListener('click', function() { appendNumber('7'); });
document.getElementById('eight').addEventListener('click', function() { appendNumber('8'); });
document.getElementById('nine').addEventListener('click', function() { appendNumber('9'); });
document.getElementById('multiply').addEventListener('click', function() { appendOperator('×'); });
document.getElementById('four').addEventListener('click', function() { appendNumber('4'); });
document.getElementById('five').addEventListener('click', function() { appendNumber('5'); });
document.getElementById('six').addEventListener('click', function() { appendNumber('6'); });
document.getElementById('subtract').addEventListener('click', function() { appendOperator('-'); });
document.getElementById('one').addEventListener('click', function() { appendNumber('1'); });
document.getElementById('two').addEventListener('click', function() { appendNumber('2'); });
document.getElementById('three').addEventListener('click', function() { appendNumber('3'); });
document.getElementById('add').addEventListener('click', function() { appendOperator('+'); });
document.getElementById('decimal').addEventListener('click', function() { appendNumber('.'); });
document.getElementById('zero').addEventListener('click', function() { appendNumber('0'); });
document.getElementById('equals').addEventListener('click', calculate);