let boxSize = 32;
let borderSize = 2;
let gridCount = 13;
let speed = 300;
let processGame;
let snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), 5);
let food = createFood();
let direction = 'left';
let gridContainer;


console.log(snake);
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', snakeHandler);

function snakeHandler(event) {
    updateDirection(event);
}

function updateDirection(event) {
    if (event.keyCode == 37 && direction != 'right')
        direction = 'left';
    if (event.keyCode == 38 && direction != 'down')
        direction = 'up';
    if (event.keyCode == 39 && direction != 'left')
        direction = 'right';
    if (event.keyCode == 40 && direction != 'up')
        direction = 'down';
}




function init() {
    gridContainer = find('#snake-container');


    initGrid(gridCount, gridContainer);


    let startBtn = document.querySelector("#start-game");
    let endBtn = document.querySelector("#end-game");

    function startHandler() {
        startGame(startBtn, endBtn);
    }

    function endHandler() {
        endGame(startBtn, endBtn);
    }


    // ----------------------------------------------
    startBtn.addEventListener('click', startHandler);
    endBtn.addEventListener('click', endHandler);
    // игра должнв стартовать и заканчиватся по клику на кнопки 
    // ----------------------------------------------


}

function createSnakeData(cell, row, count) {
    let arr = [];

    for (let index = 0; index < count; index++) {
        arr.push({
            cell: cell + index,
            row
        })
    }

    return arr;
}

function createFood() {
    let food = new Image(boxSize - 7, boxSize - 7);
    food.setAttribute('src', './img/apple.png');
    food.classList.add('snake-food');

    return food;
}

function startGame(startBtn, endBtn) {
    startBtn.style.display = "none";
    endBtn.style.display = "inline";
    let messageBox = find("#message");
    messageBox.textContent = "Good Luck!";
    let score = find(".score b");
    let count = 0;
    score.innerHTML = `${count}`
    let randomBox = generateBoxForEat();

    updateSnake(startBtn, endBtn);
    processGame = setInterval(() => {
        // let {
        //     cell,
        //     row
        // } = snake[0];

        function noWallMode({
            cell,
            row
        }) {
            if (cell == 0 && direction == "left") {
                cell = 13;
            } else if (cell == 12 && direction == "right") {
                cell = -1;
            }

            if (row == 0 && direction == "up") {
                row = 13;
            } else if (row == 12 && direction == "down") {
                row = -1;
            }
            return {
                cell,
                row
            };
        }

        // ----------------------------------
        // Нужно чтобы ф-ция noWallMode (реализует возможность змейки проходить через стены) работала так
        let {
            cell,
            row
        } = noWallMode(snake[0]);
        // ----------------------------------

        switch (direction) {
            case 'left': {
                snake.unshift({
                    cell: cell - 1,
                    row
                })
            };
            break;
        case 'up': {
            snake.unshift({
                cell,
                row: row - 1
            })
        };
        break;
        case 'right': {
            snake.unshift({
                cell: cell + 1,
                row
            })
        };
        break;
        case 'down': {
            snake.unshift({
                cell,
                row: row + 1
            })
        };
        break;
        }

        console.log(snake[0].cell, snake[0].row, snake.length);
        updateSnake(startBtn, endBtn);
    }, speed);


    function checkOnEated() {
        if (randomBox.dataset.cell == snake[0].cell && randomBox.dataset.row == snake[0].row) {
            food.remove();
            randomBox = generateBoxForEat();
            ++count;
            score.innerHTML = `${count}`;
        } else {
            snake.pop()
        }
    }

    function checkOnTailCrush(startBtn, endBtn) {
        for (let index = 1; index < snake.length; index++) {
            if (snake[0].row == snake[index].row && snake[0].cell == snake[index].cell) {
                endGame(startBtn, endBtn);
            }
        }
    }

    function updateSnake(startBtn, endBtn) {
        clearSnake();
        // ---------------------------------------
        // написать ф-цию checkOnEated, которая проверяет съела ли змейка еду,
        // если да - убираем фрукт добавляет +1 в хвост и в score, а также генерируем новые координаты для еды
        checkOnEated();
        // ----------------------------------

        // ----------------------------------
        // написать ф-цию checkOnTailCrush, которая проверяет врезалась ли голова змейки в себя же, если да - завершить игру

        // ---------------------------------------

        for (const [index, snakePart] of snake.entries()) {
            let cell = findByCoords(snakePart.cell, snakePart.row);
            if (index == 0) {
                cell.classList.add('snake-head', 'snake');
            } else {
                cell.classList.add('snake-body', 'snake');
            }
        }
        checkOnTailCrush(startBtn, endBtn);
    }



    function generateBoxForEat() {
        let cell = getRandomInt(0, gridCount);
        let row = getRandomInt(0, gridCount);
        let randomBox = findByCoords(cell, row);
        randomBox.append(food);
        return randomBox
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

function clearSnake() {
    let cells = gridContainer.querySelectorAll('.snake');
    for (const cell of cells) {
        cell.className = 'snake-cell';
    }
}
// ----------------------------------
// дополнить эту функцию - вернуть все данные в начальное состояние
// и использовать функцию во всех случаях. где игра завершается
function endGame(startBtn, endBtn) {
    clearTimeout(processGame);
    snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), 5);
    food.remove();
    clearSnake();
    let score = document.querySelector(".score b");
    score.innerHTML = "0";
    direction = 'left';
    startBtn.style.display = "inline";
    endBtn.style.display = "none";
    let messageBox = find("#message");
    messageBox.textContent = "Game over!";
}
// ----------------------------------


function initGrid(gridCount, target) {
    target.style.width = target.style.height = (boxSize * gridCount) + 'px';

    for (let index = 0; index < gridCount; index++) {
        target.append(createSnakeRow('snake-cell', gridCount, index));
    }
}

function createSnakeRow(snakeClass, gridCount, row) {
    let fragment = new DocumentFragment();

    for (let index = 0; index < gridCount; index++) {
        fragment.append(createSnakeCell(snakeClass, row, index))
    }

    return fragment;
}

function createSnakeCell(snakeClass, row, cell) {
    let div = document.createElement('div');
    div.classList.add(snakeClass);
    div.setAttribute('data-cell', cell);
    div.setAttribute('data-row', row);
    div.style.width = div.style.height = boxSize + 'px';
    return div;
}

function find(selector) {
    return document.querySelector(selector);
}

function findByCoords(cell, row) {
    return document.querySelector(`[data-cell = "${cell}"][data-row = "${row}"]`);
}