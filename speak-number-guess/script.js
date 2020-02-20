const msgElement = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Write what user speaks
function writeMessage(msg) {
  msgElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number;
  if (Number.isNaN(num)) {
    msgElement.innerHTML += '<div>That is not a valid number!</div>';
    return;
  }

  // Check if in range
  if (num > 100 || num < 1) {
    msgElement.innerHTML += '<div>Number must be between 1 and 100!</div>';
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML += `
      <h2>Congrats! You have guessed the Number!</h2><br/><br/>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgElement.innerHTML += '<div>Go Lower!</div>';
  } else {
    msgElement.innerHTML += '<div>Go Higher!</div>';
  }
}

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
