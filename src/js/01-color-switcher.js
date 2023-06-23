"use strict";

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
// console.log(buttonStart.disabled);
// console.log(buttonStop.disabled);
buttonStop.disabled = true;
let timerId = 0;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

buttonStart.addEventListener('click', onStart);

function onStart() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;

    timerId = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

buttonStop.addEventListener('click', onStop);

function onStop() {
    clearInterval(timerId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
};

