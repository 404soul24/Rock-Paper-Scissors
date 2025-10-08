let humanScore = 0;
        let computerScore = 0;
        let gameOver = false;

        const humanScoreEl = document.getElementById('human-score');
        const computerScoreEl = document.getElementById('computer-score');
        const resultsEl = document.getElementById('results');
        const rockBtn = document.getElementById('rock-btn');
        const paperBtn = document.getElementById('paper-btn');
        const scissorsBtn = document.getElementById('scissors-btn');

        // Function to get a random computer choice
        function getComputerChoice() {
            const choices = ["rock", "paper", "scissors"];
            const index = Math.floor(Math.random() * choices.length);
            return choices[index];
        }

        // Function to update the score display
        function updateScore() {
            humanScoreEl.textContent = humanScore;
            computerScoreEl.textContent = computerScore;
        }

        // Function to display a message in the results div
        function displayMessage(message, isWinner = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = isWinner ? 'winner-announcement' : 'round-result';
            messageDiv.textContent = message;
            resultsEl.appendChild(messageDiv);
            
            // Keep only the last 5 messages if not game over
            if (!isWinner && resultsEl.children.length > 5) {
                resultsEl.removeChild(resultsEl.firstChild);
            }
        }

        // Function to disable all game buttons
        function disableButtons() {
            rockBtn.disabled = true;
            paperBtn.disabled = true;
            scissorsBtn.disabled = true;
        }

        // Function to create and display reset button
        function showResetButton() {
            const resetBtn = document.createElement('button');
            resetBtn.textContent = '🔄 Play Again';
            resetBtn.className = 'reset-btn';
            resetBtn.onclick = resetGame;
            resultsEl.appendChild(resetBtn);
        }

        // Function to reset the game
        function resetGame() {
            humanScore = 0;
            computerScore = 0;
            gameOver = false;
            updateScore();
            resultsEl.innerHTML = '';
            rockBtn.disabled = false;
            paperBtn.disabled = false;
            scissorsBtn.disabled = false;
        }

        // Function to check if someone has won the game
        function checkGameWinner() {
            if (humanScore === 5) {
                displayMessage('🏆 YOU WIN THE GAME! 🏆', true);
                disableButtons();
                showResetButton();
                gameOver = true;
                return true;
            } else if (computerScore === 5) {
                displayMessage('😭 COMPUTER WINS THE GAME! 😭', true);
                disableButtons();
                showResetButton();
                gameOver = true;
                return true;
            }
            return false;
        }

        // Function to play a single round
        function playRound(playerSelection) {
            if (gameOver) return;

            const computerSelection = getComputerChoice();
            
            if (playerSelection === computerSelection) {
                displayMessage(`It's a tie! Both chose ${playerSelection}`);
            } else if (
                (playerSelection === 'rock' && computerSelection === 'scissors') ||
                (playerSelection === 'paper' && computerSelection === 'rock') ||
                (playerSelection === 'scissors' && computerSelection === 'paper')
            ) {
                displayMessage(`You Win! ${playerSelection} beats ${computerSelection}`);
                humanScore++;
            } else {
                displayMessage(`You Lose! ${computerSelection} beats ${playerSelection}`);
                computerScore++;
            }

            updateScore();
            checkGameWinner();
        }

        // Add event listeners to buttons
        rockBtn.addEventListener('click', () => playRound('rock'));
        paperBtn.addEventListener('click', () => playRound('paper'));
        scissorsBtn.addEventListener('click', () => playRound('scissors'));

        // Initial message
        displayMessage('Make your choice! First to 5 points wins!');