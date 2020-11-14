class User {
    constructor({
        name,
        email,
        password
    }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
// get & post - users
// put & delete - users/idUSer
class UserApi {
    static baseUrl = 'users';

    static getUsers() {
        return fetch(UserApi.baseUrl);
    }

    static sendUser(user) {
        return fetch(UserApi.baseUrl, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
    }


    static deleteUser(usersId) {
        return fetch(UserApi.baseUrl, {
            method: 'delete',
            body: JSON.stringify({
                usersId: usersId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
    }

    static updateUser(usersId, user) {
        return fetch(UserApi.baseUrl, {
            method: "put",
            body: JSON.stringify({
                ...user,
                usersId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
    }
}
document.addEventListener('DOMContentLoaded', () => {

    let formReg = document.querySelector('#regForm');
    let usersContainer = document.querySelector('#users');

    let formUbd = document.querySelector('#updForm');
    let elemOfForm = formUbd.elements;

    formUbd.addEventListener('submit', (e) => {
        e.preventDefault();
        let user = new User({
            name: elemOfForm.name.value,
            email: elemOfForm.email.value,
            password: elemOfForm.password.value,
        });
        let usersId = elemOfForm.idUbd.value;

        UserApi.updateUser(usersId, user).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        });
        formUbd.reset();
    })


    formReg.addEventListener('submit', (e) => {
        e.preventDefault();

        let {
            name,
            email,
            password
        } = formReg.elements;
        let user = new User({
            name: name.value,
            email: email.value,
            password: password.value
        });
        console.log(user);

        UserApi.sendUser(user)
            .then(response => {
                console.log(response);
                formReg.style.display = "none";
                usersContainer.style.display = "block";
            })
    })



    let controls = document.querySelector('#controls');
    controls.addEventListener('click', (e) => {
        if (e.target.id == "add") {
            formReg.style.display = "block";
            usersContainer.style.display = "none";

        }
        if (e.target.id == "get") {
            usersContainer.style.display = "block";
            formReg.style.display = "none";

            renderUserList()
        }
    })

    let delbtn = document.querySelector('#delbtn');
    delbtn.addEventListener('click', (e) => {
        let inputDel = document.querySelector("#inputDel");
        let id = inputDel.value;
            UserApi.deleteUser(id);

    })

    function renderUserList() {
        UserApi.getUsers()
            .then(res => res.json())
            .then(data => data.data)
            .then(users => {
                usersContainer.innerHTML = '';
                users.forEach(user => {
                    usersContainer.innerHTML += `
                            <h1 class="name">${user.name}</h1>
                            <p class="email">${user.email}</p>
                        `
                })
            })
    }
})
