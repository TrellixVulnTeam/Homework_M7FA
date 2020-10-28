document.addEventListener('DOMContentLoaded', init);

function init() {

    let form = document.querySelector("#reg-form");


    let formElements = form.elements;
    let inputEmail = formElements.mail;
    let inputName = formElements.name;
    let inputPassword = formElements.password;
    let inputPasswordConfirm = formElements.passwordConfirm;
    let regBtn = document.querySelector("#registerBtn");


    let validEmail = false;
    let validName = false;
    let validPassword = false;

    function createErrorSpan() {
        let errorSpan = document.createElement("span");
        errorSpan.classList.add("error");
        return errorSpan;
    }

    function changeText(span, massage) {
        span.innerHTML = massage;
    }

    function validation() {
        console.log(validEmail, validName, validPassword);
        if (validEmail && validName && validPassword) {
            regBtn.removeAttribute("disabled");
        }
    }
    inputEmail.oninput = function () {
        let mailformat = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
        if (this.value.match(mailformat)) {
            this.classList.remove("invalid");
            validEmail = true;
        } else {
            this.classList.add("invalid");
            validEmail = false;
        }
        validation();
    }

    inputName.oninput = function () {
        if (!this.value.length) {
            this.classList.add("invalid");
            validName = false;
        } else {
            this.classList.remove("invalid");
            validName = true;
        }
        validation();
    }

    inputPassword.oninput = function () {
        if (!this.value.length) {
            this.classList.add("invalid");
        } else {
            this.classList.remove("invalid");
        }
        validation();
    }

    inputPasswordConfirm.oninput = function () {
        if (this.value !== inputPassword.value) {
            this.classList.add("invalid");
            validPassword = false;
        } else {
            this.classList.remove("invalid");
            validPassword = true;
        }
        validation();
    }

    form.addEventListener('submit', submit);

    function submit() {
        let Obj = {
            Email: inputEmail.value,
            Name: inputName.value,
            Password: inputPassword.value
        }
        console.log(Obj);
    }

}