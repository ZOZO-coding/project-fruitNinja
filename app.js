const spawnDirections = [spawnTop, spawnBottom, spawnLeft, spawnRight];

const randNumGenerator = (num) => Math.floor(Math.random() * num) + 1
const randNumGenerator2 = (num) => Math.floor(Math.random() * num)

const scoreKeeper = document.querySelector('.score-keeper');
let currentScore = 0;
let currentPlayer = 'player1';

let level = 1;
const currentLevel = document.querySelector('.current-level');
currentLevel.innerText = `Current Level: ${level}`;

let countDownId;
let spawnItemsId;

const player1StartBtn = document.querySelector('.player1-start-game');
const player2StartBtn = document.querySelector('.player2-start-game');
const restartBtn = document.getElementById('restart-button');
const continueBtn = document.getElementById('continue-button');
player1StartBtn.addEventListener('click', startGame);
player2StartBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => location.reload());

const winningMessageElement = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message-text');

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

function createFruit() {
    const fruit = document.createElement('img');
    fruit.setAttribute("src", "./fruit-img/apple.png")
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
    bomb.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd1P6gQPNNugzu-rURQzQ_mXtBzwwW-W1VeJtCdao1KxTxgr49HNYIyMAdIH0TPrLj&usqp=CAU")
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
    fruit.setAttribute("src", "https://icon2.cleanpng.com/20180510/olw/kisspng-watermelon-computer-icons-fruit-5af4494f7c3d72.6103602815259589915089.jpg")
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

function spawnTop(fruit) {
    const spawnPoint = randNumGenerator2(50) + 25;
    fruit.style.marginLeft = `${spawnPoint}vw`;
    fruit.style.animationName = 'top-to-bottom';
}

function spawnBottom(fruit) {
    const spawnPoint = randNumGenerator2(25);
    fruit.style.marginLeft = `${spawnPoint}vw`;
    fruit.style.animationName = 'bottom-to-top';
}

function spawnLeft(fruit) {
    const spawnPoint = randNumGenerator2(30) + 10;
    fruit.style.marginTop = `${spawnPoint}vh`;
    fruit.style.animationName = 'left-to-right';
}

function spawnRight(fruit) {
    const spawnPoint = randNumGenerator2(30) + 10;
    fruit.style.marginTop = `${spawnPoint}vh`;
    fruit.style.animationName = 'right-to-left'
}

function fruitDisappear(fruit) {
    setTimeout(() => {
        fruit.style.display = 'none';
    }, 2000)
}

function sliceFruit(e) {
    // if you hit a target, then change the target src to a sliced version
    // create a timeout and then set it to disappar in 1s
    // otherwise, just set it to disappear in 3s
    if (e.target) {
        e.target.setAttribute("src", "./fruit-img/watermelon.jpg");
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 500)
    } 
    currentScore += 1;
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
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

const delayBonusFruit = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            createBonusFruit();
            resolve();
        }, delay)
    })
}

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

function gameOver() {
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
    continueBtn.style.display = 'none';
    displayEndGameMsg();
    clearInterval(countDownId);
    clearInterval(spawnItemsId);
    currentScore = 0;
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
}

function displayEndGameMsg() {
    winningMessageText.innerText = `${currentPlayer} scored ${currentScore}!`
    winningMessageElement.style.display = 'flex';
}

const continuePlay = () => {
    // remove the winning message display
    winningMessageElement.style.display = 'none';
    // reset the timer
    startingTime = 20;
    countDownId = setInterval(updateCountdown, 1000);
    level++;
    levelDifficult(level);
}

continueBtn.addEventListener('click', continuePlay)

const levelDifficult = (level) => {
    let timeInterval = 1000 - level * 100;
    spawnItemsId = setInterval(() => {
        let chance = Math.random();
        chance >= 0.8 ? shootBombs(level) : shootFruits(1);
        chance > 0.4 && chance < 0.5 ? shootBonusFruit() : shootFruits;
    }, timeInterval)
}