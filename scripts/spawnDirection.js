import { randNumGenerator2 } from "./app.js";

export function spawnTop(fruit) {
    const spawnPoint = randNumGenerator2(50) + 25;
    fruit.style.marginLeft = `${spawnPoint}vw`;
    fruit.style.animationName = 'top-to-bottom';
}

export function spawnBottom(fruit) {
    const spawnPoint = randNumGenerator2(25);
    fruit.style.marginLeft = `${spawnPoint}vw`;
    fruit.style.animationName = 'bottom-to-top';
}

export function spawnLeft(fruit) {
    const spawnPoint = randNumGenerator2(30) + 10;
    fruit.style.marginTop = `${spawnPoint}vh`;
    fruit.style.animationName = 'left-to-right';
}

export function spawnRight(fruit) {
    const spawnPoint = randNumGenerator2(30) + 10;
    fruit.style.marginTop = `${spawnPoint}vh`;
    fruit.style.animationName = 'right-to-left'
}

export const spawnDirections = [spawnTop, spawnBottom, spawnLeft, spawnRight];