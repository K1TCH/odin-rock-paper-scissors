const choices = ["Rock", "Paper", "Scissors"];

// Helper function to check user input
function capitalizeString(str) {
    let firstLetter = str[0];
    let lowercaseString = str.toLowerCase();
    return firstLetter.toUpperCase() + lowercaseString.substring(1);
}

// Return "Rock", "Paper", or "Scissors" randomly
function computerPlay() {
    let choiceIndex = Math.floor(Math.random() * 3);
    return choices[choiceIndex];
}

// Compare the player's move with the computer's move and return the result
function playRound(playerSelection, computerSelection) {
    if (playerSelection === "Rock" && computerSelection === "Scissors" ||
        playerSelection === "Paper" && computerSelection === "Rock" ||
        playerSelection === "Scissors" && computerSelection === "Rock") {
            return [`You Win! ${playerSelection} beats ${computerSelection}`, 0];
    } else if (playerSelection === "Rock" && computerSelection === "Paper" ||
               playerSelection === "Paper" && computerSelection === "Scissors" ||
               playerSelection === "Scissors" && computerSelection === "Rock") {
                   return [`You Lose! ${computerSelection} beats ${playerSelection}`, 1];
    } else {
        return [`Tie! You both chose ${playerSelection}`, 2];
    }
}

// Individual gameloop
function game() {
    
    let playerScore = 0;
    let computerScore = 0;

    function updateScore(scoreCode) {
        if (scoreCode === 0) {
            playerScore++;
        } else if (scoreCode === 1) {
            computerScore++;
        }
        return `You ${playerScore} - ${computerScore} CPU`;
    }

    for(;;) {
        let playerSelection = prompt("Choose Rock, Paper, or Scissors: ");
        playerSelection = capitalizeString(playerSelection);
        if (choices.includes(playerSelection)) {
            const computerSelection = computerPlay();
            let [result, scoreCode] = playRound(playerSelection, computerSelection);
            let scoreString = updateScore(scoreCode);
            console.log(result);
            console.log(scoreString);
        } else {
            console.log("Invalid choice");
        }

        // Check endgame conditions
        if (playerScore >= 5) {
            return "Congratulations! You won the game!";
        } else if (computerScore >= 5) {
            return "You Lost! Try to suck less next time!";
        }
    }
}

// Main gameloop (Best of 5)
for(;;) {
    let gameResult = game();
    console.log(gameResult);
    playAgain = confirm("Play Again?");
    if(!playAgain) {
        break;
    }
}