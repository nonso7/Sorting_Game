const wordsWithHints = [
    { word: "javascript", hint: "A popular programming language for the web." },
    { word: "developer", hint: "Someone who writes software." },
    { word: "browser", hint: "Software used to access websites." },
    { word: "keyboard", hint: "An input device with keys." },
    { word: "algorithm", hint: "A step-by-step process to solve a problem." }
  ];

  let score = 0;
  let timeLeft = 30;
  let currentWord = "";
  let timerInterval;
  let highscore = 0;
  

  const scrambledWordElement = document.querySelector(".guess");
  const hintElement = document.getElementById("hint");
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("time-left");
  const guessInput = document.getElementById("guess");
  const submitButton = document.getElementById("guess-btn");
  const againButton = document.querySelector(".again");

 

  // Function to shuffle the letters of a word
  function scrambleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
  }

  // Function to pick a random word
  function pickRandomWord() {
    if (wordsWithHints.length === 0) {
      scrambledWordElement.textContent = "No more words available!";
      hintElement.textContent = "";
      submitButton.disabled = true;
      return null;
    }
    const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    const { word, hint } = wordsWithHints.splice(randomIndex, 1)[0];
    return { word, hint };
  }

  // Start a new round
  function startRound() {
    const pickedWord = pickRandomWord();
    if (!pickedWord) return;
    currentWord = pickedWord.word;
    scrambledWordElement.textContent = scrambleWord(currentWord);
    hintElement.textContent = `Hint: ${pickedWord.hint}`;
    feedbackElement.textContent = "";
    guessInput.value = "";
  }

  // Start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      timerElement.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  // End the game
  function endGame() {
    scrambledWordElement.textContent = "Game Over!";
    feedbackElement.textContent = `Your final score is ${score}.`;
    hintElement.textContent = "";
    submitButton.disabled = true;
    if(score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  // Check the player's guess
  function checkGuess() {
    const playerGuess = guessInput.value.trim().toLowerCase();
    if (!playerGuess) {
      feedbackElement.textContent = "Please enter a guess.";
      return;
    }
    if (playerGuess === currentWord) {
      feedbackElement.textContent = "Correct! 🎉";
      document.querySelector('body').style.backgroundColor = "aliceblue";
      score += 10;
      scoreElement.textContent = score;
      startRound();
    } else {
      feedbackElement.textContent = "Incorrect. Try again!";
      score -= 5;
      scoreElement.textContent = score;
      document.querySelector('body').style.backgroundColor = "red";
    }
  }

  // Event listener for the submit button
  submitButton.addEventListener("click", checkGuess);

  againButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElement.textContent = timeLeft;

    score = 0;
    scoreElement.textContent = score;



    scrambledWordElement.textContent = "";
    hintElement.textContent="";
    feedbackElement.textContent = "";

    startRound();
    startTimer();
    submitButton.disabled = false;


  })
 
  startRound();
  startTimer();

  