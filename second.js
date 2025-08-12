let turn = "O";
let total_turn = 0;

let winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let board_array = new Array(9).fill("E");

const updateActivePlayer = () => {
    document.getElementById("playerO").classList.remove("active");
    document.getElementById("playerX").classList.remove("active");

    if (turn === "O") {
        document.getElementById("playerO").classList.add("active");
    } else {
        document.getElementById("playerX").classList.add("active");
    }
};

const printer = (event) => {
    const element = event.target;
    if (board_array[element.id] === "E") {
        total_turn++;
        if (turn === "O") {
            element.innerHTML = "O";
            board_array[element.id] = "O";
            if (checkwinner()) {
                document.getElementById('winningmessage').innerHTML = "Winner is O";
                board.removeEventListener('click', printer);
                return;
            }
            turn = "X";
        } else {
            element.innerHTML = "X";
            board_array[element.id] = "X";
            if (checkwinner()) {
                document.getElementById('winningmessage').innerHTML = "Winner is X";
                board.removeEventListener('click', printer);
                return;
            }
            turn = "O";
        }
        updateActivePlayer();
        if (total_turn == 9) {
            document.getElementById('winningmessage').innerHTML = "Match is draw";
        }
    }
};

function checkwinner() {
    for (let [i0, i1, i2] of winner) {
        if (board_array[i0] !== "E" && board_array[i0] === board_array[i1] && board_array[i1] === board_array[i2])
            return 1;
    }
    return 0;
}

const board = document.querySelector('.board');
board.addEventListener('click', printer);

const restart = document.getElementById("restartButton");
restart.addEventListener('click', () => {
    const cell = document.getElementsByClassName('cell');
    Array.from(cell).forEach(c => c.innerHTML = "");
    turn = "O";
    total_turn = 0;
    board_array = new Array(9).fill("E");
    document.getElementById('winningmessage').innerHTML = "";
    updateActivePlayer();
    board.addEventListener('click', printer);
});

updateActivePlayer();
