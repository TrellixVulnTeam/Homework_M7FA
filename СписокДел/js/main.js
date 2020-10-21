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

    let ul = document.querySelector('#ulTaskListFirst');

    ul.addEventListener('mousedown', function (e) {
        e.preventDefault();
    });

    ul.addEventListener('click', function (e) {
        console.log(e);

        if (e.target == this) {
            return false;
        }
        if (!e.ctrlKey) {
            clearSelected(this.children);
        }
        removeOrAddSelected(e.target);
    });

// ---------------------------- Второе задание -----------------------------------

    function createLi(text) {
        let li = document.createElement("li");
        li.textContent = text;
        return li;
    }

    class taskListMenu {
        constructor(elem) {
            this._elem = elem;
            elem.onclick = this.onClick.bind(this); // (*)
        }

        addBegin() {
            ulTaskList.prepend(createLi("Begg"));
        }

        addEnd() {
            ulTaskList.append(createLi("Endddd"));
        }

        delete() {
            for (const elem of ulTaskList.children) {
                if(elem.classList.contains('selected')){
                    // ulTaskList.removeChild(elem);
                    elem.remove();
                }
            }
        }

        sort() {
        }
        onClick(event) {
            let action = event.target.dataset.action;
            if (action) {
                this[action]();
            }
        };
    }

    let divTasks = document.querySelector("#divTasks");
    let ulTaskList = document.querySelector("#ulTaskListSecond");
    ulTaskList.addEventListener("click", function (e) {
        console.log(e);

        if (e.target == this) {
            return false;
        }
        if (!e.ctrlKey) {
            clearSelected(this.children);
        }
        removeOrAddSelected(e.target);
    });
    new taskListMenu(divTasks);
}