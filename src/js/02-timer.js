import flatpickr from "flatpickr";
// import { Russian } from "flatpickr/dist/l10n/ru";
// import { Ukrainian } from "flatpickr/dist/l10n/uk";
// import { Finnish } from "flatpickr/dist/l10n/fi";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const refs = {
    text: document.querySelector('#datetime-picker'),
    timerHtml: document.querySelector('.timer'),
    buttonStart: document.querySelector('button[data-start]'),
    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes]'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]'),
};

refs.buttonStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            // window.alert('Please choose a date in the future');
            Notify.failure('Please choose a date in the future');
            refs.buttonStart.disabled = true;
        } else {
            refs.buttonStart.disabled = false;
        }
    },
    // locale: Finnish,
};

flatpickr(refs.text, options);

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

refs.buttonStart.addEventListener('click', () => {
    let timer = setInterval(() => {
        let countdown = new Date(refs.text.value) - new Date();
        console.log(countdown);
        refs.buttonStart.disabled = true;
        if (countdown >= 0) {
            let timeObject = convertMs(countdown);
            refs.days.textContent = addLeadingZero(timeObject.days);
            refs.hours.textContent = addLeadingZero(timeObject.hours);
            refs.minutes.textContent = addLeadingZero(timeObject.minutes);
            refs.seconds.textContent = addLeadingZero(timeObject.seconds);
            if (countdown <= 10000) {
                refs.timerHtml.style.color = '#BE3455';
            }
        } else {
            // window.alert.success('Countdown finished');
            Notify.success('Countdown finished');
            refs.timerHtml.style.color = '#FFFFFF';
            clearInterval(timer);
        }
    }, 1000);
});