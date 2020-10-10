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
    orderBySize(value) {
        return this.store.fing(item => item.size = value);
    }
    itemsChangeStatus(value, newStatus) {
        return this.store.filter(item => item.status == value).map(item => item.status = newStatus);
    }
}


class Order {
    orders = [];
    constructor(config) {
        this.size = config.size;
        this.ingridients = config.ingridients;
        this.status = config.status;
    }
    addOrder(data) {
        OrdersList.setItem(new Order(data))
    }
    changeStatus(newValue) {
        let order = OrdersList.itemGetStatus()
    }
}



window.onload = init;

function init() {
    let ordersList = new StoreService();
    function SayThankYou() {
        InfoSpan.innerHTML = "Спасибо за ваш ответ!";
    }

    // создание спанов об для ошибок и информации о заказе
    let errorSpan = document.createElement('span');
    let InfoSpan = document.createElement('span');
    errorSpan.classList.add('message');
    InfoSpan.classList.add('infiSpan');

    // создание кнопок и изображений для окна "Оценки сервиса"
    let likeBtn = document.createElement('button');
    likeBtn.classList.add("likeBtn");
    let likeImg = document.createElement("img");
    likeImg.setAttribute("src", "Photo/Likee.png");
    likeImg.setAttribute("height", "30");
    likeImg.setAttribute("width", "30");
    likeImg.setAttribute("alt", "like");
    likeBtn.append(likeImg);
    let disLikeBtn = document.createElement('button');
    disLikeBtn.classList.add("disLikeBtn");
    let dislikeImg = document.createElement("img");
    dislikeImg.setAttribute("src", "Photo/dislike_PNG19.png");
    dislikeImg.setAttribute("height", "30");
    dislikeImg.setAttribute("width", "30");
    dislikeImg.setAttribute("alt", "like");
    disLikeBtn.append(dislikeImg);

    likeBtn.onclick = SayThankYou;
    disLikeBtn.onclick = SayThankYou;
    // Событие кнопки заказа
    btnMakeOrder = document.querySelector("#orderBtn");
    btnMakeOrder.onclick = function () {
        let section = document.querySelector("#OrderCol");
        let makeOrderForm = document.querySelector("#MakeOrderForm");
        let listOfCheckBoxes = document.querySelectorAll(".IngridientsCb");
        let listOfRadioBtn = document.querySelectorAll(".radioBtn");

        // Валидация
        if (!validate(listOfCheckBoxes)) {
            errorSpan.classList.add('error');
            errorSpan.textContent = 'Выберете минимум 3 ингридиентов!';
            makeOrderForm.append(errorSpan);
            return false;
        } else {
            errorSpan.classList.remove('error');
        }

        //Сбор данных
        let size;
        let ingridients = [];
        let status = "Ordered";
        for (const radio of listOfRadioBtn) {
            if (radio.checked) {
                size = radio.value;
            }
        }
        for (const ChecBox of listOfCheckBoxes) {
            if (ChecBox.checked) {
                ingridients.push(ChecBox.value);
            }
        }

        //Оплата
        var payment = confirm("Подвердить оплату?")
        if (!payment) {
            errorSpan.classList.add('error');
            errorSpan.textContent = 'Оплата не прошла!';
            makeOrderForm.append(errorSpan);
            return false;
        } else {
            errorSpan.classList.remove('error');
            ordersList.setItem({
                size,
                ingridients,
                status
            })
            makeOrderForm.classList.add('hidden');
            InfoSpan.innerHTML = "Ваш заказ готовиться...";
            section.innerHTML += ``;
            section.append(InfoSpan);
            setTimeout(function () {
                InfoSpan.innerHTML = "Мы приготовили ваш заказ. Наш курьер уже спешит вам ее доставить"
                ordersList.itemsChangeStatus("Ordered", "Coocked");
            }, 3000);
            setTimeout(function () {
                InfoSpan.innerHTML = "Доставка..."
            }, 6000);
            setTimeout(function () {
                InfoSpan.innerHTML = "Заказ доставлен."
                ordersList.itemsChangeStatus("Coocked", "Delivered");
            }, 9000);
            setTimeout(function () {
                InfoSpan.innerHTML = "Вам все понравилось?"
                InfoSpan.append(likeBtn);
                InfoSpan.append(disLikeBtn);
            }, 12000);

        }
    }

}

function validate(elements) {
    let valid = false;
    let count = 0;
    for (const checkBox of elements) {
        if (checkBox.checked) {
            count++
        }
        if (count > 2) {
            valid = true;
        }
    }
    return valid;
}