// ФК Human принимает в аргументы объект и создает свойства name, surname и age. Human содержит методы:
// getFullName() (получает в строку полное имя из name, surname ),
// setFullName(fullName) (разбивает строку на name, surname )
// Свойства surname, name и age должны быть во всех ФК. Избавьтесь от дублирования с помощью подмены контекста.

function Human(config) {
    this.name = config.name;
    this.surname = config.surname;
    this.age = config.age;
}

Human.createNewHuman = function () {
    return new Human({
        name: '',
        surname: '',
        age: ''
    });
};

Human.prototype = Object.assign(Human.prototype, {
    getFullName() {
        let str;
        return str = this.name + " " + this.surname;
    },
    setFullName(fullName) {
        let splitedFullName = fullName.split(' ');
        this.name = splitedFullName[0];
        this.surname = splitedFullName[1];
    }
})

// ФК Teacher принимает в аргументы объект и создает свойство group (массив не меньше 5-и студентов) и содержит методы
// getListOfNamesByAverageMark() - отдает массив имен студентов отсортированный по наивысшей средней оценке.
// getStudentByName(name) - получить один объект студента по имени.
// removeStudentByName(name) - удалить объект студена, найденного по имени.
// updateStudentByName(student, name) - найти объект студента по name и заменить на student (новый экземпляр ФК Student)

function Teacher(config) {
    Human.call(this, config);
    this.group = config.group;
    this._id = config._id;
    this.setId = function(id) {
            _id = id;
    };
    this.getId = function() {
        throw('access to id is locked');
    };
}

Teacher.prototype = Object.create(Human.prototype);
Teacher.prototype.constructor = Teacher;
Teacher.prototype = Object.assign(Teacher.prototype, {
    getListOfNamesByAverageMark() {
        let res = [];
        this.group.sort((item, item2) => item.averageMark() - item2.averageMark()).forEach(item => res.push(item.name));
        return res;
    },
    getStudentByName(name) {
        return this.group.find(item => item.name == name);
    },
    removeStudentByName(name) {
        this.group.forEach((item, index, arr) => {
            if (item.name == name) {
                arr.splice(index, 1);
            }
        })
    },
    updateStudentByName(student, name) {
        this.group.find((item, index, arr) => {
            if (item.name == name) {
                arr.splice(index, 1, student);
            }
        })
    }
})

// Student
// берем класс с прошлого дз. Меняем свойства, если нужно, но оставляем все методы
// Переопределить метод getFullName() который помимо полного имени добавляет приставку "-student"
// Все "дети" конструкторы должны наследовать getFullName и setFullName.
// Все "дети" конструкторы не должны дублировать создание полей в конструкторе.
// Все конструкторы принимают объект в аргументы, а не аргументы через запятую
// Следите, чтобы ваш код не повторялся - если нужно создавайте дополнительные методы и не забывайте пользоваться уже готовыми.
// Проверяйте ваш код несколько раз
// Читайте внимательно условие.


function Student(config) { // функция конструктор Student(имя, оценки)
    Human.call(this, config);
    this.marks = config.marks;
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype = Object.assign(Student.prototype, {
    getFullName() {
        let str;
        return str = "-student " + this.name + " " + this.surname;
    },
    averageMark() { // averageMark() - возвращает среднюю оценку
        return this.marks.reduce((sum, item) => sum + item) / this.marks.length;
    },
    minMark() { // minMark() - возвращает минимальную оценку
        return Math.min(...this.marks);
    },
    maxMark() { // maxMark() - возвращает максимальную оценку
        return Math.max(...this.marks);
    }
})

let stud1 = new Student({
    name: "Jaden",
    surname: "Rock",
    age: 42,
    marks: [100, 100, 99]
})
let stud2 = new Student({
    name: "Mike",
    surname: "GGG",
    age: 61,
    marks: [95, 13, 64]
})
let stud3 = new Student({
    name: "Drake",
    surname: "Dre",
    age: 43,
    marks: [22, 65, 100]
})
let stud4 = new Student({
    name: "Ivan",
    surname: "Ivanov",
    age: 53,
    marks: [86, 45, 33]
})
let stud5 = new Student({
    age: 68,
    marks: [78, 69, 95],
    name: "Bob",
    surname: "Trc",
})

let teacher = new Teacher({
    group: [stud1, stud2, stud3, stud4, stud5],
    name: "Oleg",
    surname: "Olegovich",
    age: 66,
    _id:11142
})

let studByName = teacher.getStudentByName("Ivan");
console.log(studByName);

teacher.removeStudentByName("Ivan");

let studNew = new Student({
    age: 118,
    marks: [11, 53, 100],
    name: "NEW",
    surname: "NEW",
})

teacher.updateStudentByName(studNew, "Bob")

let list = teacher.getListOfNamesByAverageMark();
console.log(list);

console.log(teacher);
let namee = stud3.getFullName();
console.log(namee);