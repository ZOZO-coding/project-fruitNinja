const spawnDirections = [spawnTop, spawnBottom, spawnLeft, spawnRight];

const randNumGenerator = (num) => Math.floor(Math.random() * num) + 1
const randNumGenerator2 = (num) => Math.floor(Math.random() * num)

const scoreKeeper = document.querySelector('.score-keeper');
let currentScore = 0;
let currentPlayer = 'player1';

const player1StartBtn = document.querySelector('.player1-start-game');
const player2StartBtn = document.querySelector('.player2-start-game');
const restartBtn = document.getElementById('restart-button');
player1StartBtn.addEventListener('click', startGame);
player2StartBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => location.reload());

const winningMessageElement = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message-text');

function createFruit() {
    const fruit = document.createElement('img');
    fruit.setAttribute("src", "./fruit-img/apple.png")
    fruit.style.width = '75px';
    fruit.style.height = '75px';
    fruit.style.position = 'absolute';
    let randNum = randNumGenerator2(4);
    spawnDirections[randNum](fruit);
    fruit.style.animationDuration = '3s';
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
    bomb.style.animationDuration = '3s';
    document.body.appendChild(bomb);
    fruitDisappear(bomb);
    bomb.addEventListener('pointerover', gameOver)
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
    const spawnPoint = randNumGenerator2(30) + 30;
    fruit.style.marginTop = `${spawnPoint}vh`;
    fruit.style.animationName = 'right-to-left'
}

function fruitDisappear(fruit) {
    setTimeout(() => {
        fruit.style.display = 'none';
    }, 3000)
}

function sliceFruit(e) {
    // if you hit a target, then change the target src to a sliced version
    // create a timeout and then set it to disappar in 1s
    // otherwise, just set it to disappear in 3s
    if (e.target) {
        e.target.setAttribute("src", "https://mpng.subpng.com/20180310/pyq/kisspng-granny-smith-apple-manzana-verde-cut-in-half-green-apple-5aa483fe203f10.7816690915207311341321.jpg");
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

const shootFruits = async(num) => {
    for (let i = 0; i < num; i++) {
        await delaySpawn(1000);
    }
}

const shootBombs = async(num) => {
    for (let i = 0; i < num; i++) {
        await delaySpawnBomb(1000);
    }
}

function startGame() {
    scoreKeeper.innerText = "Current Score: 0";
    shootFruits(3);
    shootBombs(1);
    shootFruits(2);
}

function gameOver() {
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
    // alert(`Game over! ${currentPlayer} scored ${currentScore}.`)
    displayEndGameMsg();
    currentScore = 0;
    scoreKeeper.innerText = `Current Score: ${currentScore}`;
    swapPlayer();
    // location.reload();
}

function swapPlayer() {
    currentPlayer === 'player1' ? currentPlayer = 'player2' : currentPlayer = 'player1';
}

function displayEndGameMsg() {
    winningMessageText.innerText = `${currentPlayer} scored ${currentScore}!`
    winningMessageElement.style.display = 'flex';
}