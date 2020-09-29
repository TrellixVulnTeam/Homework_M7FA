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
    constructor({
        name,
        surname,
        age,
        group
    }) {
        super({
            name,
            surname,
            age
        });
        this.group = group;
    }
    getListOfNamesByAverageMark() {
        let res = [];
        this.group.sort((stud1, stud2) => stud1.averageMark() - stud2.averageMark()).forEach(stud => res.push(stud.name));
        return res;
    }
    getListOfStudentsByAverageMark() {
        let res = [];
        this.group.sort((stud1, stud2) => stud1.averageMark() - stud2.averageMark()).forEach(stud => res.push(stud));
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
    addStudentInGroup(studentInfo) {
        this.group.push(new Student(studentInfo));
    }
}
class Student extends Human {
    constructor({
        name,
        surname,
        age,
        marks
    }) {
        super({
            name,
            surname,
            age
        });
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

let teacher = new Teacher({
    group: [],
    name: "Oleg",
    surname: "Olegovich",
    age: 66,
})

window.onload = init;

function init() {
    // первая кнопка
    let addStudentButton = document.querySelector('#add-student-button');

    addStudentButton.onclick = function () {
        let addStudentForm = document.getElementById('add-student-form');

        let childForm = addStudentForm.children;

        let name = addStudentForm.fName.value;
        let surname = addStudentForm.lName.value;
        let age = +addStudentForm.age.value;
        let marks = addStudentForm.marks.value.split(' ').map(Number);

        teacher.addStudentInGroup({
            name,
            surname,
            age,
            marks
        });
    }
    // вторая кнопка
    let listOfStudents = document.querySelector('#list-of-students-button');
    listOfStudents.onclick = function () {
        let Arrlist = teacher.getListOfStudentsByAverageMark();
        let str = "";
        Arrlist.forEach(item => {
            str += "<li>Имя:" + item.name + " Фамилия: " + item.surname + " Возраст: " + item.age + " Средний бал: " + item.averageMark() + "</li>";
        })
        document.getElementById('stud-list').innerHTML = str;
    }
}