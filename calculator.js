const display = document.querySelector('#display');
const digits = document.querySelectorAll('button.digit');
const dot = document.querySelector('#dot');
const operations = document.querySelectorAll('button.operation');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const displayMaxDigit = 15;

let value;
let operator;
let apprendDigit = true;

dot.addEventListener('click', addDotToDisplay);
equal.addEventListener('click', addResultToDisplay);
clear.addEventListener('click', clearDisplay);
backspace.addEventListener('click', backspaceDisplay)
document.addEventListener('keypress', keysInput);

digits.forEach((digit) => 
    digit.addEventListener('click', () => addDigitToDisplay(digit.textContent))
);

operations.forEach(operation =>           
    operation.addEventListener('click', () => makeOperation(operation.textContent))
);

function addition(a, b){
    return a+b;
}

function substraction(a, b){
    return a-b;
}

function multiplication(a, b){
    return a*b;
}

function division(a, b){
    return a/b;
}

function operate(operator, a, b){
    return operator(a, b);
}

function computeResult(){
    if(!operator){
        value = parseFloat(display.textContent);
    }
    else if(apprendDigit)
        value = operate(operator, value, parseFloat(display.textContent));
    
    console.log(value);
}

function addDigitToDisplay(digitClicked){

    if(apprendDigit && display.textContent.length < displayMaxDigit)           
        display.textContent += digitClicked;       
    else{
        dot.disabled = false;
        display.textContent = digitClicked;                         
    }
    apprendDigit = true;

}

function addDotToDisplay(){

    display.textContent += dot.textContent;
    dot.disabled = true;

}

function makeOperation(operatorClicked){

    computeResult(); 

    if(operator)                                                                
        display.textContent = value;

    switch(operatorClicked){
        case '+':
            operator = addition;
            break;
        case '-':
            operator = substraction;
            break;
        case 'x':
            operator = multiplication;
            break;
        case '/':
            operator = division;
            break;
        default:
            console.log('Wrong operator !');
    } 
    apprendDigit = false; 
}

function addResultToDisplay(){

    if(value && operator){                                                      
        computeResult();
        display.textContent = value;  
        operator = 0;                                                             
    }
}

function clearDisplay(){

    display.textContent = '';
    value = 0;
    operator = 0;
    apprendDigit = false;
    dot.disabled = false;

}

function backspaceDisplay(){
    display.textContent = display.textContent.slice(0,-1);
    if(!display.textContent.includes('.'))
        dot.disabled = false;
}

function keysInput(event){
    let digit = event.key;
    if(!isNaN(digit) || (digit === '.'))
        addDigitToDisplay(digit); 
}