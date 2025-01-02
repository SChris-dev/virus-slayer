// menus
const startBtn = document.getElementById('startBtn');
const InstructionPage = document.getElementById('instructionPage');
const gameContainer = document.getElementById('gameContainer');
const gameOverContainer = document.getElementById('gameOverPage');

// input name
const usernameInput = document.getElementById('usernameInput');

startBtn.addEventListener('click', () => {
    const username = usernameInput.value;

    if (username.trim() === '') {
        alert('Please enter username.')
        return;
    }

    InstructionPage.style.display = 'none';
    gameContainer.style.display = 'flex';

    usernameText.innerHTML = username;

    gameStart();
})