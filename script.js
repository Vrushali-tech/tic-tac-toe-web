const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;

const winPatterns = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];

cells.forEach(cell =>
    cell.addEventListener("click", handleClick)
);

function handleClick(e){

    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive)
        return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    if(gameActive)
        statusText.textContent =
            `Player ${currentPlayer} Turn`;
}

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            highlightWin(pattern);

            statusText.textContent =
                `🎉 Player ${board[a]} Wins`;

            gameActive = false;

            if(board[a] === "X"){
                xScore++;
                scoreX.textContent = xScore;
            }else{
                oScore++;
                scoreO.textContent = oScore;
            }

            return;
        }
    }

    if(!board.includes("")){
        statusText.textContent = "Draw!";
        gameActive = false;
    }
}

function highlightWin(pattern){
    pattern.forEach(index=>{
        cells[index].classList.add("win");
    });
}

function restartGame(){

    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent =
        "Player X Turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("win");
    });
}