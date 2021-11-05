const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerID = null;
stopBtn.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    timerID = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
};

function onStopBtnClick() {
    clearInterval(timerID);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
};