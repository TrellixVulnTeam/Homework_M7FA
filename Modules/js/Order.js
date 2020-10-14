class Order {
    constructor(config) {
        this.size = config.size;
        this.ingridients = config.ingridients;
        this.status = config.status;
    }
    addOrder(data) {
        OrdersList.setItem(new Order(data))
    }
    static getOrderBySize(value) {
        return ordersList.getItem('size', value);
    }

    static getOrderByStatus(value) {
        return ordersList.getItem('status', value);
    }
}