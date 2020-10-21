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

    function sortList(list) {
        var i, switching, b, shouldSwitch;
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            b = list.getElementsByTagName("LI");
            //Loop through all list-items:
            for (i = 0; i < (b.length - 1); i++) {
                if (b[i].classList.contains("selected")) {
                    //start by saying there should be no switching:
                    shouldSwitch = false;
                    /*check if the next item should
                    switch place with the current item:*/
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                        /*if next item is alphabetically
                        lower than current item, mark as a switch
                        and break the loop:*/
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark the switch as done:*/
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
        }
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
            for (const elem of ulTaskList.children) {
                if (elem.classList.contains('selected')) {
                    // ulTaskList.removeChild(elem);
                    elem.remove();
                }
            }
        }

        sort() {
            sortList(ulTaskList);
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