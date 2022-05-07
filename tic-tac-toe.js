/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({ sigint: true });

let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input

function markBoard(position, mark) {

    board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton

function printBoard() {

    console.log('Updated Board: \n\n ' +
        (board[1] === ' ' ? 1 : board[1]) + ' | ' + (board[2] === ' ' ? 2 : board[2]) + ' | ' + (board[3] === ' ' ? 3 : board[3]) + '\n' +
        ' --------- \n ' +
        (board[4] === ' ' ? 4 : board[4]) + ' | ' + (board[5] === ' ' ? 5 : board[5]) + ' | ' + (board[6] === ' ' ? 6 : board[6]) + '\n' +
        ' --------- \n ' +
        (board[7] === ' ' ? 7 : board[7]) + ' | ' + (board[8] === ' ' ? 8 : board[8]) + ' | ' + (board[9] === ' ' ? 9 : board[9]) + '\n');
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String

function validateMove(position) {

    let arrBoardkeys = Object.keys(board)    

    if ((Number(position) < 1) || (Number(position) > 9)) {
        console.log("Please enter number between 1 to 9 only.")
        console.log("")
        return false
    } else if ((board[Number(position)] === 'X') || (board[Number(position)] === 'O')) {
        console.log("The position is already occupied")
        console.log("")
        return false
    } else if (position === arrBoardkeys[Number(position) - 1]) {        
        return true
    } else {
        console.log("Wrong Input")
        console.log("")
        return false
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you

let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false

function checkWin(player) {

    let arrValue = []
    for (let element in board) {
        arrValue.push(board[element])
    }

    let result = []

    for (let n = 0; n < winCombinations.length; n++) {
        let winValue = ""

        for (let i = 0; i < winCombinations[n].length; i++) {
            let shortWin = winCombinations[n][i] - 1
            winValue += arrValue[shortWin]
        }
        checkResult = winValue === (player + player + player)
        result.push(checkResult)
    }

    let final = result.indexOf(true) >= 0
    return final
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean

function checkFull() {

    let arrValue2 = []
    for (let element in board) {
        arrValue2.push(board[element])
    }
    let checkSpace = arrValue2.indexOf(' ') === -1
    return checkSpace
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

function playTurn(player) {

    let userInput = false

    while (!userInput) {        
        
        console.log("Player " + player + " turn: ")
        console.log("")
        const position = prompt("Position?: ");
        console.log("")               

        if (validateMove(position) === true) {
            console.clear()
            markBoard(position, player)
            printBoard()
            if (checkWin(player) === true) {
                console.log("")
                console.log("######################################")
                console.log("# Congratulation player " + player + " ! You Win! #")
                console.log("######################################")
                console.log("")
                console.log("")
                return true
            } else if (checkFull() === true) {
                console.log("It's a tie game!")
                console.log("")
                return true
            } return
        }
    }
}

function intro() {
    // entry point of the whole program

    console.clear()
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified) {
        
        let switchTurnPlayer = 'O'

        if (playTurn(currentTurnPlayer) === true) {
            restartGame()
            return
        }
        if (playTurn(switchTurnPlayer) === true) {
            restartGame()
            return
        }
    }
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

function restartGame() {

    const newGame = prompt("Do you want to play again? (Y/N): ");
    console.log("")

    if (newGame.toLowerCase() === "n") {
        console.log("")
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
        console.log("Thank You for playing!")
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
        console.log("")
        console.log("")
    } else if (newGame.toLowerCase() === "y") {
        resetBoard()
        intro()
    } else {
        console.log("Please answer Y or N only")
        console.log("")
        return restartGame()
    }
}

function resetBoard() {
    for (let i = 1; i < 10; i++) {
        board[i] = ' '
    }
}

intro()