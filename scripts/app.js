import { spawnDirections } from "./spawnDirection.js";
import { fruits } from "./fruit.js";
export const randNumGenerator2 = (num) => Math.floor(Math.random() * num)

// selectors
const scoreKeeper = document.querySelector('.score-keeper');
const player1RecordBoard = document.getElementById('player1-record');
player1RecordBoard.innerText = "Player 1 Best Score: " + localStorage.getItem('player1');
const player2RecordBoard = document.getElementById('player2-record');
player2RecordBoard.innerText = "Player 2 Best Score: " + localStorage.getItem('player2');
const player1StartBtn = document.querySelector('.player1-start-game');
const player2StartBtn = document.querySelector('.player2-start-game');
const restartBtn = document.getElementById('restart-button');
const continueBtn = document.getElementById('continue-button');
const resetScoreBtn = document.getElementById('reset-board');
const currentLevel = document.querySelector('.current-level');
const winningMessageElement = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message-text');
let zoeyImg = document.getElementById('zoey-img');


// variables:
let level = 1;
let countDownId;
let spawnItemsId;
let currentPlayer;
let player1Record = 0;
let player2Record = 0;
let currentScore = 0;
const sliceSound = document.createElement('AUDIO');
sliceSound.setAttribute('src', '../asset/slice.mp3');
const bombSound = document.createElement('AUDIO');
bombSound.setAttribute('src', '../asset/bomb.mp3');
const pre = '../../prezoey.png';
const post = '../../zoeypost.png';

// button event listenrs
player1StartBtn.addEventListener('click', startGame);
player2StartBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => location.reload());

// countdown timer module
let startingTime = 20;
const countdown = document.querySelector('.timer');
function updateCountdown() {
    startingTime--;
    countdown.innerText = `Time remaining: ${startingTime}s`;
    // when timer reached 0s, pop a page asking if you want to continue?
    if (startingTime === 0) {
        displayEndGameMsg();
        clearInterval(countDownId);
        clearInterval(spawnItemsId);
    }
}

// main section: create fruits, spawn fruits, slice fruits, and let fruits disappear, same for bombs
function createFruit() {
    const fruit = document.createElement('img');
    let randFruitSrc = fruits[randNumGenerator2(9)];
    fruit.setAttribute("src", randFruitSrc);
    fruit.style.width = '75px';
    fruit.style.height = '75px';
    fruit.style.position = 'absolute';
    let randNum = randNumGenerator2(4);
    spawnDirections[randNum](fruit);
    fruit.style.animationDuration = '2.5s';
    document.body.appendChild(fruit);
    fruitDisappear(fruit);
    fruit.addEventListener('pointerover', sliceFruit, {once: true})
}

function createBomb() {
    const bomb = document.createElement('img');
    bomb.setAttribute("src", "./fruit-img/Bomb.webp")
    bomb.style.width = '75px';
    bomb.style.height = '75px';
    // bomb.style.backgroundColor = 'red';
    bomb.style.position = 'absolute';
    let randNum = randNumGenerator2(4);
    spawnDirections[randNum](bomb);
    bomb.style.animationDuration = '2.5s';
    document.body.appendChild(bomb);
    fruitDisappear(bomb);
    bomb.addEventListener('pointerover', gameOver)
}

function createBonusFruit() {
    const fruit = document.createElement('img');
    fruit.setAttribute("src", "./fruit-img/Pumpkin.svg");
    fruit.setAttribute("id", "bonus");
    fruit.style.width = '125px';
    fruit.style.height = '125px';
    fruit.style.position = 'absolute';
    let randNum = randNumGenerator2(4);
    spawnDirections[randNum](fruit);
    fruit.style.animationDuration = '5s';
    document.body.appendChild(fruit);
    fruitDisappear(fruit);
    fruit.addEventListener('pointerover', sliceFruit)
}

function fruitDisappear(fruit) {
    setTimeout(() => {
        fruit.style.display = 'none';
    }, 2000)
}

const delaySpawn = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            createFruit();
            resolve();
        }, delay)
    })
}

const delaySpawnBomb = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            createBomb();
            resolve();
        }, delay)
    })
}

function sliceFruit(e) {
    // if you hit a target, then change the target src to a sliced version
    // create a timeout and then set it to disappar in 1s
    // otherwise, just set it to disappear in 3s
    if (e.target.id != 'bonus') {
        e.target.setAttribute("src", "../fruit-img/plus-one.svg");
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 500)
    } else {
        setTimeout(() => {
            e.target.style.delay = 'none'
        }, 1000)
    }
    sliceSound.play();
    zoeyImg.src = post;
    setTimeout(() => zoeyImg.src = pre, 200)
    currentScore += 1;
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
}

const delayBonusFruit = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            createBonusFruit();
            resolve();
        }, delay)
    })
}

// gamming mechanism:
const shootFruits = async(num) => {
    for (let i = 0; i < num; i++) {
        await delaySpawn(1000);
    }
}

const shootBombs = async(num) => {
    for (let i = 0; i < num; i++) {
        await delaySpawnBomb(500);
    }
}

const shootBonusFruit = async() => {
    await delayBonusFruit(1000);
}

function startGame(e) {
    countDownId = setInterval(updateCountdown, 1000);
    levelDifficult(level);
    currentPlayer = `${e.target.classList}`.slice(0, 7);
    scoreKeeper.innerText = "Current Score: 0";
}

const levelDifficult = (level) => {
    let timeInterval = 1000 - level * 100;
    spawnItemsId = setInterval(() => {
        let chance = Math.random();
        chance >= 0.8 ? shootBombs(level) : shootFruits(1);
        chance > 0.45 && chance < 0.5 ? shootBonusFruit() : shootFruits;
    }, timeInterval)
}

function gameOver() {
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
    continueBtn.style.display = 'none';
    bombSound.play();
    displayEndGameMsg();
    clearInterval(countDownId);
    clearInterval(spawnItemsId);

    updateRecordBoard();

    currentScore = 0;
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
}

function updateRecordBoard() {
    // check if record board needs update:
    if (currentPlayer === 'player1' && currentScore > player1Record) {
        localStorage.setItem(`${currentPlayer}`, currentScore);
        player1Record = parseInt(localStorage.getItem('player1'));
        player1RecordBoard.innerText = `Player 1 Best Score: ${player1Record}`;
    }
    if (currentPlayer === 'player2' && currentScore > player2Record) {
        localStorage.setItem(`${currentPlayer}`, currentScore);
        player2Record = parseInt(localStorage.getItem('player2'));
        player2RecordBoard.innerText = `Player 2 Best Score: ${player2Record}`;
    }
}

function displayEndGameMsg() {
    winningMessageText.innerText = `${currentPlayer} scored ${currentScore}!`
    winningMessageElement.style.display = 'flex';
}

// continue to play and increase level difficulties: 
const continuePlay = () => {
    // remove the winning message display
    winningMessageElement.style.display = 'none';
    // reset the timer
    startingTime = 20;
    countDownId = setInterval(updateCountdown, 1000);
    level++;
    levelDifficult(level);
    currentLevel.innerText = `Current Level: ${level}`;
}
continueBtn.addEventListener('click', continuePlay)

// reset scoreboard
resetScoreBtn.addEventListener('click', () => {
    localStorage.setItem('player1', '0');
    localStorage.setItem('player2', '0');
    location.reload();
})