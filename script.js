// Return "Rock", "Paper", or "Scissors" randomly
function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    let choiceIndex = Math.floor(Math.random() * 3);
    return choices[choiceIndex];
}

// Compare the player's move with the computer's move and return the result
function playRound(playerSelection, computerSelection) {
    if (playerSelection === "Rock" && computerSelection === "Scissors" ||
        playerSelection === "Paper" && computerSelection === "Rock" ||
        playerSelection === "Scissors" && computerSelection === "Rock") {
            return [`You Win! ${playerSelection} beats ${computerSelection}`, PLAYER_WIN];
    } else if (playerSelection === "Rock" && computerSelection === "Paper" ||
               playerSelection === "Paper" && computerSelection === "Scissors" ||
               playerSelection === "Scissors" && computerSelection === "Rock") {
                   return [`You Lose! ${computerSelection} beats ${playerSelection}`, COMPUTER_WIN];
    } else {
        return [`Tie! You both chose ${playerSelection}`, TIE];
    }
}

let playerScore = 0;
let computerScore = 0;

// Score Codes
const PLAYER_WIN = 0;
const COMPUTER_WIN = 1;
const RESET = 2;
const TIE = 3;

function updateScore(scoreCode) {
    if (scoreCode === PLAYER_WIN) {
        playerScore++;
    } else if (scoreCode === COMPUTER_WIN) {
        computerScore++;
    } else if (scoreCode === RESET) {
        playerScore = 0;
        computerScore = 0;
    }
    let score = document.querySelector("#score");
    score.textContent = `You ${playerScore} - ${computerScore} CPU`;
    return;
}

function updateResult(result) {
    let info = document.querySelector("#info");
    info.textContent = result
    return;
}

function checkEndgame() {
    let endgame = document.querySelector("#endgame");
    if (playerScore >= 5) {
        endgame.textContent = "Congratulations! You won the game!";
        return true;
    } else if (computerScore >= 5) {
        endgame.textContent = "You Lost! Better luck next time.";
        return true;
    } else {
        return false;
    }
}

function askToPlayAgain() {
    let replayButton = document.createElement("button");
    replayButton.textContent = "Play Again?";
    replayButton.id = "play-again";
    const body = document.querySelector("body");
    body.appendChild(replayButton);
}

let body = document.querySelector("body");
body.addEventListener("click", e => {
    const buttons = document.querySelectorAll("button");
    if(e.target && e.target.classList.contains("choice")) {
        console.log(e.target.innerText);
        let [result, scoreCode] = playRound(e.target.innerText, computerPlay());
        updateScore(scoreCode);
        updateResult(result);
        if(checkEndgame()) {
            buttons.forEach(button => {
                button.disabled = true;
            });
            askToPlayAgain();
        }
    } else if (e.target && e.target.id === "play-again") {
        buttons.forEach(button => {
            button.disabled = false;
        });
        updateScore(RESET);
        updateResult("");
        endgame.textContent = "";
        let replayButton = document.querySelector("#play-again");
        replayButton.remove();
    }
});