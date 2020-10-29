window.onload = init;

function init() {

    function clearSelected(elems) {
        for (let elem of elems) {
            console.log(elem.classList.remove('selected'));
        }
    }

    function removeOrAddSelected(target) {
        target.classList.toggle('selected');
    }

    function removeSelected(target) {
        target.classList.remove('selected');
    }

    function addSelected(target) {
        target.classList.add('selected');
    }

    function createLi(text) {
        let li = document.createElement("li");
        text = arrtask[Math.floor(Math.random() * arrtask.length)];
        li.textContent = text;
        return li;
    }

    class taskListMenu {
        constructor(elem) {
            this._elem = elem;
            elem.onclick = this.onClick.bind(this); // (*)
        }

        addBegin() {
            ulTaskList.prepend(createLi());
        }

        addEnd() {
            ulTaskList.append(createLi());
        }

        delete() {
            let selected = document.querySelectorAll('.selected');
            selected.forEach((item) => {
                item.remove();
            })
        }

        sort() {
            [].forEach.call(ulTaskList.children, (item) => {
                if (item.classList.contains('selected')) {
                    ulTaskList.prepend(item);
                }
            })
        }


        onClick(event) {
            let action = event.target.dataset.action;
            if (action) {
                this[action]();
            }
        };
    }

    var arrtask = ["Сходить в магазин", "Проситать книгу", "Позвонить другу", "Поработать", "Принять гостей"]

    let divTasks = document.querySelector("#divTasks");
    let ulTaskList = document.querySelector("#ulTaskListSecond");

    ulTaskList.addEventListener("click", function (e) {

        if (e.target == this) {
            return false;
        }

        if (e.ctrlKey) {
            removeOrAddSelected(e.target);
            return false;
        } else if (e.target.classList.contains("selected")) {
            removeSelected(e.target);
            return false;
        } else {
            clearSelected(this.children);
        }
        removeOrAddSelected(e.target);


    });

    new taskListMenu(divTasks);
}