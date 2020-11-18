export default class AlertComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        if (checkMessage(this.message)) {
            this.innerHTML = `<p>${this.message}</p>`;
        } else {
            this.innerHTML = `<p>Вы не ввели message</p>`;
        }
    }

    static get observedAttributes() {
        return ["type", "message"];
    }

    attributeChangedCallback(name, prev, curr) {
        console.log(name, prev, curr);

        switch (name) {
            case 'message': {
                this.message = curr;
                break;
            }
            case 'type':
                switch (curr) {
                    case 'error': {
                        this.style.backgroundColor = 'red';
                        break;
                    }
                    case 'info': {
                        this.style.backgroundColor = 'blue';
                        break;
                    }
                    case 'success': {
                        this.style.backgroundColor = 'green';
                        break;
                    }
                    default: {
                        this.style.backgroundColor = "gray";
                    }
                    break;
                }
        }
    }
}

function checkMessage(message) {
    let valid = true;
    if (!message || 0 === message.length) {
        valid = false;
    }
    return valid;
}
