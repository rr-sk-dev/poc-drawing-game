import './style.css';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.4; // 40%

const context = <CanvasRenderingContext2D>canvas.getContext('2d', { willReadFrequently: true });
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

export { };

