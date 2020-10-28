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

    function createErrorSpan(nodeToAdd) {
        let errorSpan = document.createElement("span");
        errorSpan.classList.add("error");
        nodeToAdd.after(errorSpan);
        return errorSpan;
    }

    function changeText(span, massage) {
        span.innerHTML = massage;
    }

    let mailSpanInfo = createErrorSpan(inputEmail);
    let nameSpanInfo = createErrorSpan(inputName);
    let passSpanInfo = createErrorSpan(inputPassword);
    let passConfSpanInfo = createErrorSpan(inputPasswordConfirm);

    console.log(mailSpanInfo);

    function validation() {

        if (validEmail && validName && validPassword) {
            regBtn.removeAttribute("disabled");
        }
    }
    inputEmail.oninput = function () {
        let mailformat = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
        if (this.value.match(mailformat)) {
            this.classList.remove("invalid");
            validEmail = true;
            changeText(mailSpanInfo, "");
        } else {
            this.classList.add("invalid");
            validEmail = false;
            changeText(mailSpanInfo, "Invalid Email");
        }
        validation();
    }

    inputName.oninput = function () {
        if (!this.value.length) {
            this.classList.add("invalid");
            validName = false;
            changeText(nameSpanInfo, "Invalid Name");
        } else {
            this.classList.remove("invalid");
            validName = true;
            changeText(nameSpanInfo, "");
        }
        validation();
    }

    inputPassword.oninput = function () {
        if (!this.value.length) {
            this.classList.add("invalid");
            changeText(passSpanInfo, "Invalid Password");
        } else {
            this.classList.remove("invalid");
            changeText(passSpanInfo, "");
        }
        validation();
    }

    inputPasswordConfirm.oninput = function () {
        if (this.value !== inputPassword.value) {
            this.classList.add("invalid");
            validPassword = false;
            changeText(passConfSpanInfo, "Password not equal");
        } else {
            this.classList.remove("invalid");
            validPassword = true;
            changeText(passConfSpanInfo, "");
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