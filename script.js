// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 600;

// player stats
const usernameText = document.getElementById('usernameText');
const scoreText = document.getElementById('scoreText');
const timerText = document.getElementById('timerText');
const failText = document.getElementById('failText');

// game over stats
const usernameTextOver = document.getElementById('usernameTextOver');
const scoreTextOver = document.getElementById('scoreTextOver');
const timerTextOver = document.getElementById('timerTextOver');
const resetGameOverBtn = document.getElementById('resetGameOver');

// variables
let running = false;
let countdown = 3;
let timer = null;
let timerInterval;
let spawnInterval;
let score = 0;
let fails = 0;

// timer functions
let miliseconds = 0;
function formatTime(totalMs) {
    const minutes = String(Math.floor(totalMs / 60000)).padStart(2, '0');
    const seconds = String(Math.floor(totalMs / 1000)).padStart(2, '0');
}

function updateTimer() {
    timerText.textContent = formatTime(miliseconds)
}

function startTimer() {
    if (!timer) {
        const startTime = Date.now() - miliseconds;
        timer = setInterval(() => {
            miliseconds = Date.now() - startTime;
            updateTimer();
        }, 10);
    }
}
 
// images
const virusImage = new Image();
virusImage.src = 'images/corona.png';

const keysImage = new Image();
keysImage.src = 'images/d.png';

// key presses
const keys = ['D', 'F', 'J', 'K'];

// viurses
let viruses = [];

const lanes = [0, 80, 160, 240];

function createVirus() {
    let randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    return {
        x: randomLane,
        y: 0,
        speedY: 5,
        lane: lanes.indexOf(randomLane)
    }
}

function spawnVirus() {
    spawnInterval = setInterval(() => {
        viruses.push(createVirus());
    }, 1000);
}

function drawVirus() {
    viruses.forEach((virus, index) => {
        if (virusImage.complete) {
            ctx.drawImage(virusImage, virus.x, virus.y, 80, 80);
            virus.y += virus.speedY;
    
            if (virus.y > 350) {
                viruses.splice(index, 1);
                fails += 1;
                failText.innerHTML = fails;
            }
        }
    })
}

document.addEventListener('keydown', (e) => {
    const pressedKey = e.key.toUpperCase();
    const keyIndex = keys.indexOf(pressedKey);

    if (keyIndex !== -1) {
        viruses.forEach((virus, index) => {
            if (virus.lane === keyIndex && virus.y >= 250 && virus.y <= 450) {
                viruses.splice(index, 1);
                score += 1;
                scoreText.innerHTML = score;
            }
        })
    }
})

function drawBackground() {
    ctx.beginPath();
    ctx.fillStyle = 'gray';
    ctx.fillRect(80, 0, 2, 600);
    ctx.fillRect(160, 0, 2, 600);
    ctx.fillRect(240, 0, 2, 600);
    ctx.fillRect(320, 0, 2, 600);
}

function drawBackgroundInvis() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawCatchZone() {
    ctx.beginPath();
    ctx.fillStyle = '#ff000083'
    ctx.fillRect(0, 250, 320, 200);
}

function drawKeysBackground1() {
    ctx.beginPath();
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 450, 80, 200);
    ctx.fillRect(160, 450, 80, 200);
}
function drawKeysBackground2() {
    ctx.beginPath();
    ctx.fillStyle = '#268fff';
    ctx.fillRect(80, 450, 80, 200);
    ctx.fillRect(240, 450, 80, 200);
}

function drawKeys() {
    if (keysImage.complete) {
        ctx.drawImage(keysImage, 10, 475, 300, 100);
    }
}

function startCountdown() {
    
}

function gameLoop() {
    if (running) {
        drawBackgroundInvis();
        drawBackground();
        drawCatchZone();
        drawKeysBackground1();
        drawKeysBackground2();
        drawKeys();
        drawVirus();
        requestAnimationFrame(gameLoop);
    }

    if (fails === 5) {
        gameOver();
    }
}

function gameOver() {
    running = false;

    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    gameContainer.style.display = 'none';
    gameOverContainer.style.display = 'flex';

    timerTextOver.innerHTML = timer;
    scoreTextOver.innerHTML = score;
    usernameTextOver.innerHTML = usernameInput.value;
}

resetGameOverBtn.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    gameOverContainer.style.display = 'none';

    gameStart();
})

function gameStart() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);

    running = true;
    viruses = [];
    score = 0;
    timer = null;
    spawnVirus();
    startTimer();
    gameLoop();
}

function resetGame() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);

    
    gameStart();
}