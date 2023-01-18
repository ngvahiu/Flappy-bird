const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const bg = new Image(); bg.src = '../assets/background.png';
const bird = new Image();
const topTube = new Image(); topTube.src = '../assets/top-tube.png';
const botTube = new Image(); botTube.src = '../assets/bottom-tube.png';

let isPlaying = false;
const gravity = 0.5;
const speed = 3.5;
const birdSize = {
    width: 40,
    height: 30
};
const jump = -10.5;

let index = 0;
let bestScore = 0;
let flight;
let flyHeight = canvas.height / 2 - birdSize.height / 2; // initial
let birdX = canvas.width / 2 - birdSize.width / 2;
let currentScore;
let tube;
let pass = false;

// tube settings
const tubeWidth = 58;
const tubeHeight = 378;
const tubeGap = 180;
const tubeLoc = () => {
    let i = Math.random();
    while(i < 0.3)
        i = Math.random();
    return i*tubeHeight;
}

// sounds settings
let dieSound = new Audio(); dieSound.src = '../sounds/die.mp3';
let hitSound = new Audio(); hitSound.src = '../sounds/hit.mp3';
let pointSound = new Audio(); pointSound.src = '../sounds/point.mp3';
let swooshSound = new Audio(); swooshSound.src = '../sounds/swoosh.mp3';
let wingSound = new Audio(); wingSound.src = '../sounds/wing.mp3';