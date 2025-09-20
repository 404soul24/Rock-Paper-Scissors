// Function to get a random computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

// Function to get a validated human choice
function getHumanChoice() {
    let choice = window.prompt("Choose rock, paper, or scissors:");
    while (!choice || !['rock', 'paper', 'scissors'].includes(choice.toLowerCase())) {
        choice = window.prompt("Invalid choice. Please enter rock, paper, or scissors:");
    }
    return choice.toLowerCase();
}

let humanScore = 0;
let computerScore = 0;

// Function to play a single round and update scores
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        console.log("It's a tie!");
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
        humanScore++;
    } else {
        console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
        computerScore++;
    }
}

// Main function to play the entire game
function playGame(rounds) {
    // Reset scores at the start of the game
    humanScore = 0;
    computerScore = 0;

    for (let i = 0; i < rounds; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
    }

    // Determine and display the final winner
    console.log("\n--- Final Results ---");
    console.log(`Final Score: Human: ${humanScore}, Computer: ${computerScore}`);

    if (humanScore > computerScore) {
        console.log("🏆 You are the final winner! 🏆");
    } else if (computerScore > humanScore) {
        console.log("😭 The computer is the final winner! 😭");
    } else {
        console.log("🤝 The game is a tie! 🤝");
    }
}

// Call the function to start a 5-round game
playGame(5);