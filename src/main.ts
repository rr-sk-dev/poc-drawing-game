import './style.css';

import { User } from './users';

const playersElem = <HTMLDivElement>document.getElementById('players');

const createUserUI = (user: User) => {
  console.log(user);

  const playerElem = <HTMLDivElement>document.createElement('div');
  playerElem.classList.add('player');

  const idEmojiElem = <HTMLDivElement>document.createElement('div');
  playerElem.classList.add('id-emoji');

  const idElem = <HTMLSpanElement>document.createElement('span');
  idElem.innerHTML = user.avatar;

  idEmojiElem.appendChild(idElem);
  playerElem.appendChild(idEmojiElem);

  playersElem.appendChild(playerElem);
};

// users.forEach((user) => createUserUI(user));

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.4; // 40%

const context = <CanvasRenderingContext2D>canvas.getContext('2d', { willReadFrequently: true });
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const drawSettings = {
  backgroundColor: 'white',
  color: 'pink',
  penWidth: 2,
};

let isDrawing = false;

let restoreArr: any = [];
let index = -1;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

const undoBtn = <HTMLSpanElement>document.getElementById('undo-btn');
undoBtn.addEventListener('click', undoLast);

const clearBtn = <HTMLSpanElement>document.getElementById('clear-btn');
clearBtn.addEventListener('click', clearCanvas);

const colorFieldElems = document.querySelectorAll('.color');
colorFieldElems.forEach((elem) => elem.addEventListener('click', changeColor));

const colorPickerElem = <HTMLInputElement>document.getElementById('color-picker');
colorPickerElem.onchange = (event: any) => {
  drawSettings.color = event.target.value;
};

const colorRangeElem = <HTMLInputElement>document.getElementById('color-range');
colorRangeElem.addEventListener('change', (event: any) => {
  drawSettings.penWidth = event.target.value;
});

const getX = (event: any) => event.clientX || event.touches[0].clientX;

const getY = (event: any) => event.clientY || event.touches[0].clientY;

function start(event: any) {
  isDrawing = true;

  context.beginPath();
  context.moveTo(getX(event) - canvas.offsetLeft, getY(event) - canvas.offsetTop);

  if (event.cancelable) {
    event.preventDefault();
  }
}

function draw(event: any) {
  if (isDrawing) {
    context.lineTo(getX(event) - canvas.offsetLeft, getY(event) - canvas.offsetTop);
    context.strokeStyle = drawSettings.color;
    context.lineWidth = drawSettings.penWidth;
    context.lineCap = 'round';
    (context as any).lineJoin = '';
    context.stroke();
  }

  if (event.cancelable) {
    event.preventDefault();
  }
}

function stop(event: any) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  if (event.type !== 'mouseout' || event.type !== 'touchend') {
    restoreArr.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function changeColor(event: any) {
  drawSettings.color = window.getComputedStyle(event.target).getPropertyValue('background-color');
}

function undoLast() {
  if (index <= 0) {
    clearCanvas();
  } else {
    index -= 1;
    restoreArr.pop();
    context.putImageData(restoreArr[index], 0, 0);
  }
}

function clearCanvas() {
  context.fillStyle = drawSettings.backgroundColor;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restoreArr = [];
  index = -1;
}
