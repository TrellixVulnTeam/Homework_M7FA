export default class taskListMenu {
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