import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import "flatpickr/dist/flatpickr.min.css";

// flatpickr(myElem, {
//     "locale": Russian // locale for this instance only
// });


const refs = {
    text: document.querySelector('#datetime-picker'),
    timerHtml: document.querySelector('.timer'),
    buttonStart: document.querySelector('button[data-start]'),
    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes]'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]'),
};
console.log(typeof refs.text.value);

refs.buttonStart.disabled = true;

const options = {
    enableITime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates){
        if (selectedDates[0] < new Date()) {
            window.alert('Please choose a date in the future');
            refs.buttonStart.disabled = true;
        } else {
            refs.buttonStart.disabled = false;
        }
    },
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
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

refs.buttonStart.addEventListener('click', onStart());

function onStart() {
    let timer = setInterval(()=>{
        // contdown=today-newDate 
        let contdown = new Date() - new Date(refs.text.value);
        // console.log(refs.text.value);
        // console.log(new Date());
        // console.log(contdown);
        refs.buttonStart.disabled = true;
        if (contdown >=0) {
            let timeObject = convertMs(contdown);
            refs.days.textContent = addLeadingZero(timeObject.days);
            refs.hours.textContent = addLeadingZero(timeObject.hours);
            refs.minutes.textContent = addLeadingZero(timeObject.minutes);
            refs.seconds.textContent = addLeadingZero(timeObject.seconds);
            if (contdown <=10000){
                refs.timerHtml.style.color = '#BE3455';
            };
        } else{
            // alert('');
            refs.timerHtml.style.color = '#FFFFFF';
            clearInterval(timer);
        }
    }, 1000)
};

// const text = document.querySelector('#datetime-picker');
// const timerHtml = document.querySelector('.timer');
// const btnStart = document.querySelector('button[data-start]');
// const seconds = document.querySelector('span[data-seconds]');
// const minutes = document.querySelector('span[data-minutes]');
// const hours = document.querySelector('span[data-hours]');
// const days = document.querySelector('span[data-days]');

// console.log(typeof text.value);

// btnStart.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] < new Date()) {
//       window.alert('Please choose a date in the future');
//       btnStart.disabled = true;
//     } else {
//       btnStart.disabled = false;
//     }
//   },
// };

// flatpickr(text, options);

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }

// btnStart.addEventListener('click', () => {
//   let timer = setInterval(() => {
//     let countdown = new Date(text.value) - new Date();
//     console.log(Date(text.value));
//     console.log(Date());
//     console.log(countdown);
//     btnStart.disabled = true;
//     if (countdown >= 0) {
//       let timeObject = convertMs(countdown);
//       days.textContent = addLeadingZero(timeObject.days);
//       hours.textContent = addLeadingZero(timeObject.hours);
//       minutes.textContent = addLeadingZero(timeObject.minutes);
//       seconds.textContent = addLeadingZero(timeObject.seconds);
//       if (countdown <= 10000) {
//         timerHtml.style.color = 'tomato';
//       }
//     } else {
//       window.alert('Countdown finished');
//       timerHtml.style.color = 'black';
//       clearInterval(timer);
//     }
//   }, 1000);
// })