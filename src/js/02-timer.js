import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const checkDate = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const selectedDate = null;
const intervalID = null;

const deadline = 1000;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
        // window.alert('Please choose a date in the future');
      Notify.failure('Please choose  a date in the future');
    } else {
      startBtn.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

const calendar = flatpickr(checkDate, options);

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  startBtn.disabled = true;
  checkDate.disabled = true;
  getTimerTime();
  intervalID = setInterval(getTimerTime, 1000);
}


function getTimerTime() {
  const targetTime = selectedDate;
  const currentTime = Date.now();
  const deltaTime = targetTime - currentTime;
  const timeOptions = convertMs(deltaTime);

  if (deltaTime < deadline) {
    clearInterval(intervalID);
  }
  updateTimerInterface(timeOptions);
}


function updateTimerInterface({ days, hours, minutes, seconds }) {
  days.textContent = `${days}`;
  hours.textContent = `${hours}`;
  minutes.textContent = `${minutes}`;
  seconds.textContent = `${seconds}`;
}


function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  days = addZero(Math.floor(ms / day));
  // Remaining hours
  hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
   seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}