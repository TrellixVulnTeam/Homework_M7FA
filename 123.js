    // let listOfStudentsButton = document.querySelector('#list-of-students-button');
    // listOfStudentsButton.onclick = function () {
    //     let list = teacher.getListOfStudentsByAverageMark();
    //     console.log(list);
    // }

window.onload = init;

function init() {
    let describe = document.querySelector('#describe');
    let get = document.querySelector('#get');
    console.log(describe, get);

    describe.onclick = function () {

        let fillOutForm = document.getElementById('fill-out-form');
        let childForms = fillOutForm.children;
        let radioValue = fillOutForm.elements.who.value;
        
        let color = childForms.color.value,
            breed = childForms.breed.value,
            name = childForms.name.value;
            number = childForms.number.value;
        
        Animal.describeAnimal({
            cat: +radioValue == 0,
            dog: +radioValue == 1,
            color,
            breed,
            name,
            number: +number
        });
    }

}

class Animal {
    static shalter = [];

    constructor({
        cat,
        dog,
        color,
        breed,
        name,
        number
    }) {
            this.cat = cat,
            this.dog = dog,
            this.color = color,
            this.breed = breed,
            this.name = name,
            this.number = number
    }

    static describeAnimal(data) {
        Animal.setAnimal(new Animal(data))
    }

    static setAnimal(animal) {
        console.log(animal);
        Animal.shalter.push(animal);
        console.log(Animal.shalter);

    }
    static getAnimals(key, value) {
        return shalter.filter(function (animal, index) {
            animal[key] === value;
        })
    }

    static getAnimal(key, value) {
        return shalter.find(function (animal, index) {
            animal[key] === value;
        })
    }

    changeName(number, newName) {
        let findedAnimal = Animal.getAnimal('number', number);
        if(!findedAnimal) return;

        findedAnimal.name = newName;
    }

}