const timeList = document.querySelector('#time-list');
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');

const COLORS = [  
    '#1affdb', '#ffdb1a',
    '#ff3355', '#33ff88',
    '#fff68f', '#fdfbfb',
];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    const { target } = e;

    if(target.classList.contains('time-btn')) {
        time = parseInt(target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

function startGame() {
    setTimerText(time);
    createRandomCircles();
    setInterval(decreaseTime, 1000);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if(current < 10){
            current = `0${current}`;
        }
        setTimerText(current);
    }
}

function setTimerText(value){
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    board.innerHTML = `
        <h1>
            Score
            <span class="primary">
                ${score}
            </span>
        </h1>
    `;

    timeEl.parentNode.style.display = 'none';
}

function createRandomCircles() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const { width, height } = board.getBoundingClientRect();

    const color = getRandomColor();
    const size = randomInRange(10, 60);
    const x = randomInRange(0, width - size);
    const y = randomInRange(0, height - size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.appendChild(circle);
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircles();
    }
});

function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = randomInRange(0, COLORS.length-1);
    return COLORS[index];
}
