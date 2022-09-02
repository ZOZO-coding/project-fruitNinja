const fruit = document.querySelector('.fruit-container');
const keyframes = ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'];

fruit.addEventListener('pointerover', (e) => {
    e.target.style.display = "none";
})

const randNumGenerator = (num) => Math.floor(Math.random() * num) + 1

const totalNum = randNumGenerator(5);

function createFruit() {
    const fruit = document.createElement('div');
    fruit.style.width = '75px';
    fruit.style.height = '75px';
    fruit.style.backgroundColor = 'black';
    fruit.style.position = 'absolute';
    fruit.style.animationName = 'left-to-right';
    fruit.style.animationDuration = '3s';
    document.body.appendChild(fruit);
}

function spawnFruit() {
    createFruit();
}

spawnFruit();