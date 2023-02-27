// Rule of thumb: if you only ever need ONE of something (gameBoard, 
// displayController), use a module. If you need multiples of something (players!), 
// create them with factories.

// TIC TAC TOE BOARD

let gameBoard = [
    '', '', '', 
    '', '', '',
    '', '', ''
]

const boardContainer = document.querySelector(".boardContainer");

const boardSpace = (id, content) => {
    const makeBox = () => {
        const box = document.createElement("div")
        box.classList.add("box")
        box.setAttribute("id", `box-${id}`)
        box.setAttribute("grid-area", `box-${id}`)
        boardContainer.appendChild(box)
    }
    return {id, content, makeBox}
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        box = boardSpace(i, "")
        box.makeBox()
    }
    addBoxListeners();
}

function addBoxListeners() {
    const boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            // console.log(box.getAttribute('id'))
            makeMove(box.getAttribute('id'));
        })
    })
}

function clearBoard() {
    boardContainer.innerHTML = ''
    for (let i = 0; i < 9; i++) {
        gameBoard[i] = ""
    }
}

// PLAYERS

const playerFactory = (name, marker, isComputer) => {
    return {name, marker, isComputer}
}

const player1 = playerFactory("kevin", "X", false)
const player2 = playerFactory("chris", "O", true)

let turns = 0

function turnTracker(turns) {
    if (turns % 2 === 0) {
        return player1
    } else {
        return player2
    } 
}

function makeMove(boxId) {
    const box = document.getElementById(`${boxId}`)
    const boardIndex = (box.getAttribute('id'))[4]
    let turn = turnTracker(turns)
    // console.log(turnTracker(turns))
    if (box.textContent !== "") {
        alert("Taken!")
    }
    else {
        (turn === player1) 
            ? (box.textContent = `${player1.marker}`) 
            : (box.textContent = `${player2.marker}`)
        updateBoard(gameBoard, boardIndex, turn)
    }
}

function updateBoard(gameBoard, boxId, turn) {
    (turn === player1) 
    ? (gameBoard[boxId] = "X") 
    : (gameBoard[boxId] = "O")
    console.log(gameBoard)
    // console.log(turnTracker(turns))
    checkWin(gameBoard, turnTracker(turns))
    turns += 1
    // console.log(turns)
}

function checkWin(gameBoard, turn) {
    if (
        (gameBoard[0] !== "") &&
            (gameBoard[0] === gameBoard[1]) && (gameBoard[1] === gameBoard[2])
        || (gameBoard[3] !== "") &&
            (gameBoard[3] === gameBoard[4]) && (gameBoard[4] === gameBoard[5])
        || (gameBoard[6] !== "") && 
            (gameBoard[6] === gameBoard[7]) && (gameBoard[7] === gameBoard[8])
        || (gameBoard[0] !== "") && 
            (gameBoard[0] === gameBoard[3]) && (gameBoard[3] === gameBoard[6])
        || (gameBoard[1] !== "") && 
            (gameBoard[1] === gameBoard[4]) && (gameBoard[4] === gameBoard[7])
        || (gameBoard[2] !== "") && 
            (gameBoard[2] === gameBoard[5]) && (gameBoard[5] === gameBoard[8])
        || (gameBoard[0] !== "") && 
            (gameBoard[0] === gameBoard[4]) && (gameBoard[4] === gameBoard[8])
        || (gameBoard[2] !== "") && 
            (gameBoard[2] === gameBoard[4]) && (gameBoard[4] === gameBoard[6])
    ){
            alert(`${turn.name} wins`) 
    }
} 

// PLAY AGAINST COMPUTER

// function computerMove() {
//     let openBox = gameBoard.filter((value) => value !== "")
//     let pick = Math.floor(Math.random() * openBox.length)
//     makeMove(`box-${pick}`)
// }

function computerMove() {
    // let openBox = gameBoard.filter((value) => value !== "")
    let pick = Math.floor(Math.random() * gameBoard)
    makeMove(`box-${pick}`)
}


function startGame() {
    createBoard();
    // const player1 = playerFactory("kevin", "X")
    // const player2 = playerFactory("chris", "O")
}


const startBtn = document.querySelector("#startBtn")
startBtn.setAttribute("onclick", "startGame()")

const clearBtn = document.querySelector("#clearBtn")
clearBtn.setAttribute("onclick", "clearBoard()")
