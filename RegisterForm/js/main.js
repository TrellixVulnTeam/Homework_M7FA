document.addEventListener('DOMContentLoaded', init);

function init() {

    let form = document.querySelector("#reg-form");
    let inputs = document.querySelectorAll('#reg-form input');

    let formElements = form.elements;

    let inputEmail = formElements.mail;
    let inputName = formElements.name;
    let inputPassword = formElements.password;
    let inputPasswordConfirm = formElements.passwordConfirm;

    let regBtn = document.querySelector("#registerBtn");

    function changeText(span, massage) {
        span.innerHTML = massage;
    }

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


    function changeAtributeDisplayToNone(elem) {
        elem.style.display = "none";
    }

    function changeAtributeDisplayToBlock(elem) {
        elem.style.display = "block";
    }

    function checkAccesToBtn(inputs) {
        let acces = true
        for (const input of inputs) {
            if (!input.classList.contains("valid")) {
                acces = false;
            }
        }
        return acces;
    }

    form.oninput = function (event) {
        validationForm(event);
        if (checkAccesToBtn(inputs)) {
            regBtn.removeAttribute("disabled");
        } else {
            regBtn.setAttribute("disabled", "disabled");
        }
    }

    function validationForm(event) {
        switch (event.target.name) {
            case 'mail': {
                if (!CheckInputEmail(event.target.value)) {
                    event.target.classList.add("invalid");
                    event.target.classList.remove("valid");

                    changeText(mailSpanInfo, "Invalid email");
                    changeAtributeDisplayToBlock(mailSpanInfo);
                } else {
                    changeAtributeDisplayToNone(mailSpanInfo);

                    event.target.classList.remove("invalid");
                    event.target.classList.add("valid");
                }
                break;
            }
            case 'name': {
                if (!checkInputName(event.target.value)) {
                    event.target.classList.add("invalid");
                    event.target.classList.remove("valid");

                    changeText(nameSpanInfo, "Invalid name");
                    changeAtributeDisplayToBlock(nameSpanInfo);
                } else {
                    changeAtributeDisplayToNone(nameSpanInfo);

                    event.target.classList.remove("invalid");
                    event.target.classList.add("valid");
                }

                break;
            }
            case 'password': {
                if (!checkInputPassword(event.target.value)) {
                    event.target.classList.add("invalid");
                    event.target.classList.remove("valid");

                    changeText(passSpanInfo, "Invalid password");
                    changeAtributeDisplayToBlock(passSpanInfo);
                } else {
                    changeAtributeDisplayToNone(passSpanInfo);

                    event.target.classList.remove("invalid");
                    event.target.classList.add("valid");
                }

                break;
            }
            case 'passwordConfirm': {
                if (!checkInputPasswordConfirm(event.target.value)) {
                    event.target.classList.add("invalid");
                    event.target.classList.remove("valid");

                    changeText(passConfSpanInfo, "Passwords are not equal");
                    changeAtributeDisplayToBlock(passConfSpanInfo);
                } else {
                    changeAtributeDisplayToNone(passConfSpanInfo);

                    event.target.classList.remove("invalid");
                    event.target.classList.add("valid");
                }

                break;
            }
        }

        function checkInputName(nameValue) {
            let valid = true;
            if (!nameValue.length) {
                valid = false;
            }
            return valid;
        }

        function checkInputPassword(passValue) {
            let valid = true;
            if (!passValue.length || passValue !== formElements.passwordConfirm.value) {
                valid = false;
            }
            return valid;
        }

        function checkInputPasswordConfirm(passvalueThis) {
            let valid = true;
            if (!passvalueThis.length || passvalueThis !== formElements.password.value) {
                valid = false;
            }
            return valid;
        }

        function CheckInputEmail(mailValue) {
            let valid = true;
            let mailformat = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
            if (!mailValue.match(mailformat) || !mailValue.length) {
                valid = false;
            }
            return valid;
        }

        form.addEventListener('submit', submit);

        function submit(event) {
            event.preventDefault();
            let Obj = {
                Email: inputEmail.value,
                Name: formElements.name.value,
                Password: formElements.password.value
            }
            console.log(Obj);
            form.reset();
        }

    }
}