export default class AlertComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });
        if (checkMessage(this.message)) {
            this.shadowRoot.innerHTML = `
            <p>${this.message}</p>
            <style>
            :host {
                display: block;
                border: 2px black solid;
                border-radius: 5px;
                text-align: center;
                margin: 5px;
                background-color: gray;
                padding:5px;
                font-size:16px;
            }
            </style>
            `;
        } else {
            this.shadowRoot.innerHTML = `
            <p>Вы не ввели message</p>
            <style>
            :host {
                display: block;
                border: 2px black solid;
                border-radius: 5px;
                text-align: center;
                margin: 5px;
                background-color: gray;
                padding:5px;
                font-size:16px;
            }
            </style>`;
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
