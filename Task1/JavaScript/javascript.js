window.onload = init;
function init() {
    let p = document.querySelector("#123");

    p.addEventListener("keydown", function(e) {
        console.log(e.keyCode);
    })
}