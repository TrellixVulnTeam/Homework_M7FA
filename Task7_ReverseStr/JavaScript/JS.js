/**
 * Функция reverseNumber переварачивает число наоборот. 
 * Например: reverseNumber(1234) // 4321
 * @param {number} number
 * @returns {number} перевернутое число
 */
let numb = +prompt("Введите число");

function reverseNumber(number) {
    number = String(number);
    let numberStr = "";
    for (let i = number.length - 1; i >= 0; i--) {
        numberStr += number[i]
    }
    number = numberStr;
    return +number;
}
alert(reverseNumber(numb));