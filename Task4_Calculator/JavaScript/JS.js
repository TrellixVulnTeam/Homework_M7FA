var firstNumber = +prompt("Введите первое число:");
var secondNumber = +prompt("Введите второе число:");
var result;

if(isNaN(firstNumber) || isNaN(secondNumber))
{
    do{
        alert("Вы ввели не число повторите попытку")
        var firstNumber = +prompt("Введите первое число:");
        var secondNumber = +prompt("Введите второе число:");
    }while(isNaN(firstNumber) || isNaN(secondNumber))
}

var sign = prompt("Введите знак нужной вам операции ('+' '-' '*' '/'):");

if(sign !== "+" && sign !== "-" && sign !== "*" && sign !== "/") {
    do{
        var sign = prompt("Введите знак нужной вам операции ('+' '-' '*' '/'):");
    }while(sign !== "+" && sign !== "-" && sign !== "*" && sign !== "/")
} 

alert(result = calculate(firstNumber,secondNumber,sign));

 
function calcSum(numb1,numb2) {
    return numb1 + numb2;
}

function calcSub(numb1,numb2) {
    return numb1 - numb2;
}

function calcMultiplication(numb1,numb2) {
    return numb1 * numb2;
}
function calcDivision(numb1,numb2) {
    return numb1 / numb2;
}
function calculate (n1,n2, sign) {
    switch(sign) {
        case '+':
            return calcSum(n1,n2);
        case '-':
            return calcSub(n1,n2);
        case '*':
            return calcMultiplication(n1,n2);
        case '/':
            return calcDivision(n1,n2);
    }
}