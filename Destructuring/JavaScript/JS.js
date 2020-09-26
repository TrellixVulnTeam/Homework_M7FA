// 1.Есть объект с ошибками в ключах.

let info = {
  neme: "Michael",
  surname: "Scofield",
  specializatin: "Architect"
}

// С помощью деструктуризации создайте правильный объект.
let {neme:name, surname:surname, specializatin:specialization} = info;

info = {
  name: "Michael",
  surname: "Scofield",
  specialization: "Architect"
}

//---------------2------------------

const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        maths: 74,
        english: 63,
        science: 85
    }
};

function showInfo({
    name,
    scores: {
        maths = 0,
        english = 0,
        science = 0
    }
}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}
showInfo(student);

// -----------------------------3---------------------------
// С помощью деструктуризации создайте новый массив (используйте rest и spread операторы)

// до
let rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
// ваш код ...
let [first, second, ...rest] = rainbow
rainbow = [rest , first, second];
// после
console.log(rainbow);