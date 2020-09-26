class Human {
    constructor(config) {
        this.name = config.name;
        this.surname = config.surname;
        this.age = config.age;
    }
    getFullName() {
        return this.name + " " + this.surname;
    }
    setFullName(fullName) {
        let splitedFullName = fullName.split(' ');
        this.name = splitedFullName[0];
        this.surname = splitedFullName[1];
    }
    static createNewHuman() {
        return new Human({
            name: '',
            surname: '',
            age: ''
        });
    }
}
class Teacher extends Human {
    constructor({name, surname, age, group}) {
        super({name, surname, age});
        this.group = group;
    }
    getListOfNamesByAverageMark() {
        let res = [];
        this.group.sort((stud1, stud2) => stud1.averageMark() - stud2.averageMark()).forEach(stud => res.push(stud.name));
        return res;
    }
    getStudentByName(name) {
        return this.group.find(stud => stud.name == name);
    }
    removeStudentByName(name) {
        this.group.forEach((stud, index, arr) => {
            if (stud.name == name) {
                arr.splice(index, 1);
            }
        })
    }
    updateStudentByName(student, name) {
        this.group.find((stud, index, arr) => {
            if (stud.name == name) {
                arr.splice(index, 1, student);
            }
        })
    }
}
class Student extends Human {
    constructor({name, surname, age, marks}) {
        super({name, surname, age});
        this.marks = marks;
    }
    getFullName() {
        let str;
        return str = "-student " + this.name + " " + this.surname;
    }
    averageMark() { // averageMark() - возвращает среднюю оценку
        return this.marks.reduce((sum, item) => sum + item) / this.marks.length;
    }
    minMark() { // minMark() - возвращает минимальную оценку
        return Math.min(...this.marks);
    }
    maxMark() { // maxMark() - возвращает максимальную оценку
        return Math.max(...this.marks);
    }
}

let stud1 = new Student({
    name: "Jaden",
    surname: "Rock",
    age: 42,
    marks: [100, 100, 99]
});
let stud2 = new Student({
    name: "Mike",
    surname: "GGG",
    age: 61,
    marks: [95, 13, 64]
});
let stud3 = new Student({
    name: "Drake",
    surname: "Dre",
    age: 43,
    marks: [22, 65, 100]
});
let stud4 = new Student({
    name: "Ivan",
    surname: "Ivanov",
    age: 53,
    marks: [86, 45, 33]
});
let stud5 = new Student({
    age: 68,
    marks: [78, 69, 95],
    name: "Bob",
    surname: "Trc",
});

let teacher = new Teacher({
    group: [stud1, stud2, stud3, stud4, stud5],
    name: "Oleg",
    surname: "Olegovich",
    age: 66,
})

let studByName = teacher.getStudentByName("Ivan");
console.log("Найденный студент: ",studByName);

teacher.removeStudentByName("Ivan"); // Удалили студента

let studNew = new Student({
    age: 118,
    marks: [11, 53, 100],
    name: "NEW",
    surname: "NEW",
})

teacher.updateStudentByName(studNew, "Bob") // Заменили студента

let list = teacher.getListOfNamesByAverageMark();
console.log("отсортированный список студентов: ", list);
