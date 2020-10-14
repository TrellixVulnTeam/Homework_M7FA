class StoreService {
    store = [];
    constructor(initialStore = []) {
        this.shalter = initialStore;
    }

    setItem(item) {
        this.store.push(item);
    }
    getItems(key, value) {
        return this.store.filter(function (item, index) {
            item[key] === value;
        })
    }

    getItem(key, value) {
        return this.store.find(function (item, index) {
            item[key] === value;
        })
    }

    itemsChangeStatus(value, newStatus) {
        return this.store.filter(item => item.status == value).map(item => item.status = newStatus);
    }
}