const boxes = document.querySelectorAll('.box');

const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
// check game status -> Array
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// lets create a func to initialise the game
function initGame() {
    currentPlayer = 'O';
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // UI PR BHI EMPTY KARNA H 
    boxes.forEach((box, index) => {
        box.textContent = "";
        boxes[index].style.pointerEvents = "all";
        // Remove Green Color
        boxes[index].classList.remove('win');
    });

    newGameBtn.classList.remove('active');
}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });

});

function handleClick(index) {
    if (gameGrid[index] === '') {
        gameGrid[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        // console.log(gameGrid);

        boxes[index].style.pointerEvents = "none";

        // console.log(boxes[index]);

        // SWAP TURNS
        swapTurn();
        // Check koi jeet toh nhi gya
        checkGameOver();
    }
}

function swapTurn() {
    if (currentPlayer === 'X')
        currentPlayer = 'O';
    else
        currentPlayer = 'X';

    // UI UPDATE
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = '';

    winningPosition.forEach((position) => {
        // Non Empty & exactly same values
        if ((gameGrid[position[0]] !== '' && gameGrid[position[1]] !== '' && gameGrid[position[2]] !== '') && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // WINNER IS EITHER X OR O
            winner = gameGrid[position[0]];

            // Disable Pointer Events
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

    if (winner !== '') {
        gameInfo.textContent = `Winner Player - ${winner}`;
        newGameBtn.classList.add('active');
        return;
    }

    // Let's Check For Tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== '')
            fillCount++;
    });

    // Board is fille so game is tie
    if (fillCount === 9) {
        gameInfo.textContent = `Game Tied !`;
        newGameBtn.classList.add('active');
    }
}

newGameBtn.addEventListener('click', initGame);