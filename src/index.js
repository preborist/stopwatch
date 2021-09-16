import './sass/main.scss';

import { interval, fromEvent } from 'rxjs';

let started = false;
let isStoped = false;
let time = 0;

function counterDraw(time) {
  return (counter.textContent =
    ('0' + Math.floor(time / 3600)).slice(-2) +
    ':' +
    ('0' + Math.floor(time / 60)).slice(-2) +
    ':' +
    ('0' + Math.floor(time % 60)).slice(-2));
}

function changeBtnStyles(btnLink, classNameAdd, classNameRemove) {
  btnLink.textContent = classNameAdd.toUpperCase();
  btnLink.classList.remove(classNameRemove);
  btnLink.classList.add(classNameAdd);
}

function querySelector(el) {
  return document.querySelector(el);
}

// Elements
const startStopButton = querySelector('#start');
const pauseButton = querySelector('#pause');
const resetutton = querySelector('#reset');
const counter = querySelector('#counter');

// Observables
const second$ = interval(1000);
const startStopClick$ = fromEvent(startStopButton, 'click');
const pauseClick$ = fromEvent(pauseButton, 'dblclick');
const resetClick$ = fromEvent(resetutton, 'click');

const subscription = second$.subscribe(x => {
  counterDraw(time);
  if (!started) return;
  time += 1;
});

startStopClick$.subscribe(e => {
  started = !started;
  if (started) {
    changeBtnStyles(startStopButton, 'stop', 'start');
    pauseButton.classList.remove('wait');
  } else {
    changeBtnStyles(startStopButton, 'start', 'stop');
  }
});

pauseClick$.subscribe(e => {
  started = false;
  changeBtnStyles(startStopButton, 'start', 'stop');
  pauseButton.classList.add('wait');
});

resetClick$.subscribe(e => {
  time = 0;
  pauseButton.classList.remove('wait');
});
