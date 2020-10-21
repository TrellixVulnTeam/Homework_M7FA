import StoreService from './Store.js';

export const ordersList = new StoreService();


export class Order {
    constructor(config) {
        this.size = config.size;
        this.ingridients = config.ingridients;
        this.status = config.status;
    }
    addOrder(data) {
        ordersList.setItem(new Order(data))
    }
    static getOrderBySize(value) {
        return ordersList.getItem('size', value);
    }

    static getOrderByStatus(value) {
        return ordersList.getItem('status', value);
    }
}