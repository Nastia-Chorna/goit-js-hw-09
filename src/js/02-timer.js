import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let userDate = null;

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { //було дано в ТЗ
        userDate = selectedDates[0];
        if (userDate > Date.now()) {
            startBtn.removeAttribute('disabled');
        } else {
            Notify.failure("Please choose a date in the future");
            startBtn.setAttribute('disabled', true);
        }

  },
};

flatpickr(input#datetime - picker, options);

function onStartBtnClick() {
    setInterval(() => {
        if (userDate <= Date.now()) return;
        const currentTime = convertMs(userDate - Date.now());

        const secondsEl.textContent = addLeadingZero(currentTime.seconds);
        const minutesEl.textContent = addLeadingZero(currentTime.minutes);
        const hoursEl.textContent = addLeadingZero(currentTime.hours);
        const daysEl.textContent = addLeadingZero(currentTime.days);
        
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
//було дано в ТЗ