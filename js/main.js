const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');


const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');


const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');

let timerInterval;
let isTimerRunning = false;

function checkInputs() {
  const isInputsEmpty = hoursInput.value === '' && minutesInput.value === '' && secondsInput.value === '';
  startButton.disabled = isInputsEmpty;
  resetButton.disabled = !isTimerRunning || isInputsEmpty;
}

function startTimer() {
  if (startButton.textContent === 'Start') {
    startButton.textContent = 'Stop';
    startButton.style.backgroundColor = '#0662f7';
    isTimerRunning = true;

    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    timerInterval = setInterval(() => {
      const hoursRemaining = Math.floor(totalSeconds / 3600);
      const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
      const secondsRemaining =Math.floor( totalSeconds % 60);

      hoursInput.value = hoursRemaining.toString().padStart(2, '0');
      minutesInput.value = minutesRemaining.toString().padStart(2, '0');
      secondsInput.value = secondsRemaining.toString().padStart(2, '0');

      totalSeconds--;

      if (totalSeconds < 0) {
        stopTimer();
      }
    }, 1000);

    resetButton.disabled = !isTimerRunning;
  } else {
    stopTimer();
  }
}

function stopTimer() {
  startButton.textContent = 'Start';
  startButton.style.backgroundColor = '#8ab4f8';
  clearInterval(timerInterval);
  isTimerRunning = false;
  resetButton.disabled = !isTimerRunning;
  checkInputs();
}

function resetTimer() {
  clearInterval(timerInterval);
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  displayHours.textContent = '00';
  displayMinutes.textContent = '00';
  displaySeconds.textContent = '00';
  startButton.textContent = 'Start';
  startButton.style.backgroundColor = '#8ab4f8';
  isTimerRunning = false;
  resetButton.disabled = !isTimerRunning;
  checkInputs();
}


function padNumber(number) {
  return number.toString().padStart(2, '0');
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
hoursInput.addEventListener('input', checkInputs);
minutesInput.addEventListener('input', checkInputs);
secondsInput.addEventListener('input', checkInputs);
checkInputs();

//-----------------------------------------------------------------
hoursInput.addEventListener('input', function() {
  if (hoursInput.value.length === 2) {
    hoursInput.blur();
    minutesInput.focus();
  }
});

minutesInput.addEventListener('input', function() {
  if (minutesInput.value.length === 2) {
    minutesInput.blur();
    secondsInput.focus();
  } else if (minutesInput.value.length === 0) {
    minutesInput.blur();
    hoursInput.focus();
  }
});

secondsInput.addEventListener('input', function() {
  if (secondsInput.value.length === 2) {
    secondsInput.blur();
    startButton.focus();
  } else if (secondsInput.value.length === 0) {
    secondsInput.blur();
    minutesInput.focus();
  }
});

startButton.blur();
//-----------------------------------------------------------------

hoursInput.addEventListener('keydown', function(event) {
  if (hoursInput.value.length >= 2 && event.key !== 'Backspace') {
    event.preventDefault();
  }
});

minutesInput.addEventListener('keydown', function(event) {
  if (minutesInput.value.length >= 2 && event.key !== 'Backspace') {
    event.preventDefault();
  }
});

secondsInput.addEventListener('keydown', function(event) {
  if (secondsInput.value.length >= 2 && event.key !== 'Backspace') {
    event.preventDefault();
  }
});
