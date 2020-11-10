const url = 'https://jsonplaceholder.typicode.com/';
const postUrl = 'posts';
let postsHistory = [];

let postsContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let add = document.querySelector('#add');
let postsInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
postsInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main()
    } else {
        event.preventDefault()
    }
});

function main() {

    let id = postsInput.value;
    if (!isNaN(id)) {
        postsInput.disabled = true;

        fetch(`${url}${postUrl}/${id}`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                return loadPost(data);
            })
            .then(({
                div,
                data
            }) => {
                postsContainer.append(div);
                postsHistory.push(data);
                console.log(postsHistory);
                postsInput.disabled = false;
                postsInput.focus();
                fetch(`${url}${postUrl}/${id}/comments`)
                    .then(response => {
                        console.log(response);
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        loadComent(data, div);
                    })
            })
    }

}

function loadComent(data, div) {
    for (let index = 0; index < data.length; index++) {
        let p = document.createElement("p");
        p.innerHTML = `Name: ${data[index].name}\n Email: ${data[index].email}\n Body: ${data[index].body}`;
        div.append(p);
    }
}

function loadPost(data) {
    return new Promise(function (resolve, reject) {
        let div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = `Title: ${data.title}\n Body: ${data.body}`;
        resolve({
            div,
            data
        });
        reject("Error");
    })
}