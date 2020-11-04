const url = 'https://jsonplaceholder.typicode.com/';
const photoUrl = 'photos';
let photoHistory = [];

let photContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let photoInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
photoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main()
    } else {
        event.preventDefault()
    }
});


async function main() {
    let id = photoInput.value;
    if (!isNaN(id)) {
        photoInput.disabled = true;
        let response = await fetch(`${url}${photoUrl}/${id}`);
        let json = await response.json();
        let img = await loadImage(json);
        await apend(img);
    }
}

function apend(obj) {
    photContainer.append(obj.image);
    photoHistory.push(obj.data);
    console.log(photoHistory);
    photoInput.disabled = false;
    photoInput.focus();
}

function loadImage(data) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.src = data.url;
        image.onload = () => resolve({
            image,
            data
        });
        image.onerror = () => reject();
    })
}