// Step 2: computer randomly picks rock, paper or scissors
function getComputerChoice() {
  const random = Math.random(); // 0 <= random < 1

  if (random < 1 / 3) {
    return "rock";
  } else if (random < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Step 3: human enters their choice via a prompt
function getHumanChoice() {
  return prompt("Rock, paper or scissors?");
}

// Small helper so messages read "Paper beats Rock"
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Step 6: play the entire game (5 rounds)
function playGame() {
  // Step 4: score variables (moved inside playGame)
  let humanScore = 0;
  let computerScore = 0;

  // Step 5: play a single round
  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase(); // case-insensitive

    if (humanChoice === computerChoice) {
      console.log(`It's a tie! You both chose ${capitalize(humanChoice)}.`);
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      humanScore++;
      console.log(
        `You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
      );
    } else {
      computerScore++;
      console.log(
        `You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
      );
    }
  }

  for (let round = 1; round <= 5; round++) {
    console.log(`--- Round ${round} ---`);
    // Call the choice functions again each round to get fresh choices
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  console.log(`Final score - You: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("You won the game!");
  } else if (computerScore > humanScore) {
    console.log("You lost the game!");
  } else {
    console.log("The game is a tie!");
  }
}

playGame();
