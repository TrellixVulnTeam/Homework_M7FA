// примеры для деструкторизации 
let user1 = {
    name: 'John',
    age: 20,
    surname: 'Fishman',
}
let { name, ...all} = user1;

let newO =  {...all, name: 'Name'};

// console.log(name, all);

// let {name: n, age: a} = user1;
// console.log(n, a);


// let arr = [1,2];
// let [first, ...all] = arr;
// console.log(first);
let newarr = [...all,3,5,6]