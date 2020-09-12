function createCalculator(n1) {
    let calc = {
        add: function (n2) {
            return n1 + n2;
        },
        sub: function (n2) {
            return n1 - n2;
        },
        divide: function (n2) {
            return n1 / n2;
        },
        mult: function (n2) {
            return n1 * n2;
        },
        set: function (n2) {
            return n1 = n2;
        },
    }
    return calc;
}

const calculator = createCalculator(10);
console.log(calculator.add(45)); // возвращает 55 
console.log(calculator.sub(45)); // возвращает -35 
console.log(calculator.divide(5)); // возвращает 2 
console.log(calculator.mult(5)); // возвращает 50 
console.log(calculator.set(100)); // устанавливает базовое значение в 100 
console.log(calculator.mult(5)); // возвращает 500
