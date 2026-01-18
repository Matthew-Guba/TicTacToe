import './style.css'; 

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""]; 

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];
const app = document.querySelector('#app') || document.body;

const container = document.createElement('div');
container.className = 'game-container';

const title = document.createElement('h1');
title.textContent = 'Крестики-Нолики';

const statusDisplay = document.createElement('div');
statusDisplay.className = 'status';
updateStatusMessage(`Ход игрока: <span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span>`);

const board = document.createElement('div');
board.className = 'board';

const cells = [];
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i; 
    
    cell.addEventListener('click', handleCellClick);
    
    board.appendChild(cell);
    cells.push(cell); 
}

const restartBtn = document.createElement('button');
restartBtn.className = 'restart-btn';
restartBtn.textContent = 'Начать заново';
restartBtn.addEventListener('click', restartGame);

container.appendChild(title);
container.appendChild(statusDisplay);
container.appendChild(board);
container.appendChild(restartBtn);
app.appendChild(container);



function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handlePlayerPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handlePlayerPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); 
    clickedCell.classList.add('taken'); 
    clickedCell.classList.add('pop');   
}

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateStatusMessage(`Победа игрока <span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span>! 🎉`);
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        updateStatusMessage('Ничья! 🤝');
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusMessage(`Ход игрока: <span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span>`);
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    updateStatusMessage(`Ход игрока: <span class="x">X</span>`);

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell"; 
    });
}

function updateStatusMessage(html) {
    statusDisplay.innerHTML = html;
}