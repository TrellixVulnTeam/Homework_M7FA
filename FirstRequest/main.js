const url = 'https://jsonplaceholder.typicode.com/';
const postUrl = 'posts';
let postsHistory = [];
let br = document.createElement("br");
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
                },
                reject => {
                    console.log(new Error("error"));
                })
            .then(data => {
                    console.log(data);
                    return loadPost(data);
                },
                reject => {
                    console.log(new Error("error"));
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
                },
                reject => {
                    console.log(new Error("error"));
                })
    }

}

function loadComent(data, div) {
    for (let index = 0; index < data.length; index++) {
        let p = document.createElement("p");
        p.innerHTML = `<h4>Comment</h4> <span>Name:</span> ${data[index].name}<br> <span>Email:</span> ${data[index].email}<br> <span>Body:</span> ${data[index].body}`;
        div.append(p);
    }
}

function loadPost(data) {
    return new Promise(function (resolve, reject) {
        let div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = ` <h2>Post</h2> <h3>Title:</h3> ${data.title}\n <h3>Body:</h3> ${data.body}`;
        resolve({
            div,
            data
        });
        reject("Error");
    })
}