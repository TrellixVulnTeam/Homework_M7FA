function cleanArr(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        item = array[i];
        if (isEmpty(item)) {
            array.splice(i, 1);
        }
    }
}

function isEmpty(obj) {
    for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
    }
    return true;
}

let arr = [{}, { name: "Jhon"}, {age: 16}, {}, {}, {isAdmin: true}];

cleanArr(arr);
console.log(arr);