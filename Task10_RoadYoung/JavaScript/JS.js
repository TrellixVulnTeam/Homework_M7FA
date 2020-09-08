let vasia = { name: "Вася", age: 25 };
let petia = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };
let egor = { name: "Егор", age: 40 };
let dima = { name: "Дима", age: 35 };
let lena = { name: "Лена", age: 18 };

let users = [ vasia, petia, masha, egor, dima, lena ];
let sortedArr = [];


function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function checkKey (arr,key) {
    let res = false;
    arr.forEach(item => {
        if(item.hasOwnProperty(key)) {
            res = true;
        }
    });
    return res;
}
function sortByKey(arr, field) {
    if(checkKey(arr,field)) {
        return arr.slice().sort(byField(field));
    } else {
        console.log('Errrrr')
    }
}

function getAverageAge(arr) {
     let res =  arr.reduce((prev,item) => prev + item.age,0) / arr.length;
     return res;
}

sortedArr = sortByKey(users,'age');
console.log(sortedArr);
console.log(users);
let Averege = getAverageAge(users);
console.log("Средний возраст = " + Averege);