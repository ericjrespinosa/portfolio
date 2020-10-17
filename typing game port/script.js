const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "hello",
  "goodbye",
  "nobody",
  "somebody",
  "boy",
  "girl",
  "man",
  "woman",
  "food",
  "angry"
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//difficulty level
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
 

// focus on text on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//genereate random word from array 'words'
function getRandomWord () {
  return words[Math.floor(Math.random()*words.length)];
}

//add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord; //we have a handle .word up above and connectged to html, then we dynamically add the random word
}

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


//update time
function updateTime () {
  time--;
  timeEl.innerHTML = time + "s";

  if (time == 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//gamve over function
function gameOver() {
  endgameEl.innerHTML = `
    <h1>time ran out</h1>
    <p>your final score is ${score}</p>
    <button onclick="location.reload()>Reload"</button>
    
    `;
  endgameEl.style.display = "flex";
}

addWordToDom();

//event listener for text
text.addEventListener("input", e => {
  const insertedText = e.target.value;
 
  if (insertedText === randomWord){
    addWordToDom();
    e.target.value = "";
    updateScore();

    if(difficulty === 'hard') {
      time += 3;
      console.log(difficulty);
    } else if (difficulty === 'medium') {
      time += 5;
    } else if (difficulty === 'easy') {
      time += 6;
    }

    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle('hide');
});

//settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});