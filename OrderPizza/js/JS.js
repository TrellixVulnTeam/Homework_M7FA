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

let ordersList = new StoreService();

window.onload = init;

function init() {

    function SayThankYou() {
        InfoSpan.innerHTML = "Спасибо за ваш ответ!";
    }

    function createImg(src, height, width, alt) {
        let img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("height", height);
        img.setAttribute("width", width);
        img.setAttribute("alt", alt);
        return img
    }

    // создание спанов об для ошибок и информации о заказе
    let form = document.querySelector("#MakeOrderForm");
    form.onsubmit = function(event) {
        event.preventDefault();
    }

    let errorSpan = document.createElement('span');
    let InfoSpan = document.createElement('span');
    errorSpan.classList.add('message');
    InfoSpan.classList.add('infiSpan');

    // создание кнопок и изображений для окна "Оценки сервиса"
    //Кнопка лайк
    let likeBtn = document.createElement('button');
    likeBtn.classList.add("likeBtn");
    let likeImg = createImg("Photo/Likee.png", "30", "30", "like");
    likeBtn.append(likeImg);
    //Кнопка дизлайк
    let disLikeBtn = document.createElement('button');
    disLikeBtn.classList.add("disLikeBtn");
    let dislikeImg = createImg("Photo/dislike_PNG19.png", "30", "30", "dislLike");
    disLikeBtn.append(dislikeImg);

    // Добавляем событие на кнопки оставить отзыв
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
        let payment = new Promise(function (resolve, reject) {
            let paumantStarus = confirm("Подвердить оплату?");
            if (paumantStarus) {
                resolve("Оплата прошла!");
            } else {
                reject(new Error("Оплата не прошла"));
            }
        })

        payment.then(
            function () {
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
                    let coockedOrder = Order.getOrderByStatus("Coocked")
                    console.log(coockedOrder);
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

            },
            function () {
                errorSpan.classList.add('error');
                errorSpan.textContent = 'Оплата не прошла!';
                makeOrderForm.append(errorSpan);
                return false;
            }
        )
    }
}