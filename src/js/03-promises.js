"use strict";

import { Notify } from "notiflix";

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
            resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
    return promise;
}

btnCreatePromise.addEventListener('click', evt => {
    evt.preventDefault();
    let firstDelay = Number(delay.value);
    let delayStep = Number(step.value);
    for (let i = 0; i < amount.value; i++) {
        createPromise(1 + i, firstDelay + i * delayStep)
        .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
});

// const refs = {
//     delay: document.querySelector('input[name="delay"]'),
//     step: document.querySelector('input[name="delay"]'),
//     amount: document.querySelector('input[name="amount"]'),
//     buttonPromise: document.querySelector('button[type="submit"]'),
// };

// function createPromise(position, delay) {
//     const promise = new Promise ((resolve, reject) =>{
//         setTimeout(() =>{
//             const shouldResolve = Math.random() > 0.3;
//             if (shouldResolve) {
//                 resolve({position, delay})
//             } else {
//                 reject({position, delay})
//             }
//         }, refs.delay);
//     });

//     return promise;
// };

// refs.buttonPromise.addEventListener('click', onStart());

// function onStart(evt) {
//     evt.preventDefault();
//     let firstDelay = Number(refs.delay.value);
//     let delayStep = Number(refs.step.value);
//     console.log(firstDelay);
//     console.log(delayStep);
//     for (let i = 0; i < refs.amount.value; i++) {
//         createPromise(1 + i, firstDelay + i*delayStep).then(({position, delay}) => {
//             Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         }).catch(({position, delay})=>{
//             Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         });
        
//     }
// };


