/**
 * Функция generateChessBoard создает строку из # в шахматном порядке. 
 * @param {number} size - размер доски, стандартно number = 8
 * @returns {string}
 */

function generateChessBoard(size = 8) {
    let str = "";
    for (let i = 0; i < size * size; i++) {
        if (i % (size + 1) == 0) {
            str += "\n";
        } else if (i % 2 != 0) {
            str += "#";
        } else {
            str += " ";
        }
    }
    return str;
}
let board = generateChessBoard();
alert(board);