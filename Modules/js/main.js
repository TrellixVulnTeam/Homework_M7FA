import {
    Order,
    ordersList
} from "./components/Order.js";

import {
    validate
} from "./components/validation.js";

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

    let form = document.querySelector("#MakeOrderForm");
    form.onsubmit = function (event) {
        event.preventDefault();
    }

    // Событие кнопки заказа
    let btnMakeOrder = document.querySelector("#orderBtn");
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
                resolve("Ваш заказ готовиться...");
            } else {
                reject(new Error("Оплата не прошла"));
            }
        }).then(function (messege) {
                errorSpan.classList.remove('error');
                ordersList.setItem({
                    size,
                    ingridients,
                    status
                })
                makeOrderForm.classList.add('hidden');
                InfoSpan.innerHTML = messege;
                section.innerHTML += ``;
                section.append(InfoSpan);
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve("Мы приготовили ваш заказ. Наш курьер уже спешит вам его доставить"), 2000);
                });
            },
            function (error) {
                console.log(error);
                errorSpan.classList.add('error');
                errorSpan.textContent = 'Оплата не прошла!';
                makeOrderForm.append(errorSpan);
                return false;
            }).then(function (messege) {
            InfoSpan.innerHTML = messege;
            ordersList.itemsChangeStatus("Ordered", "Coocked");
            let coockedOrder = Order.getOrderByStatus("Coocked")
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve("Доставка..."), 4000);
            });
        }).then(function (messege) {
            InfoSpan.innerHTML = messege;
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve("Заказ доставлен."), 6000);
            });
        }).then(function (messege) {
            InfoSpan.innerHTML = messege;
            ordersList.itemsChangeStatus("Coocked", "Delivered");
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve("Вам все понравилось?"), 8000);
            });
        }).then(function (messege) {
            InfoSpan.innerHTML = messege;
            InfoSpan.append(likeBtn);
            InfoSpan.append(disLikeBtn);
        })
    }
}