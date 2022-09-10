# Project: Zoey Ninja
This is the project of a fruit ninja style game where a player can slice a randomly spawned fruit to score or a bomb to lose the game. 

# Motivation
This is the Mod-1 project at Per Scholas, we are asked to build a multiplayer DOM-based game. Since fruit ninja can involve alot of DOM manipulations, it's the main reason I choose to implement this game as my Mod-1 project.

# Screenshots
A screenshot of what the game looks like:
![project screenshot]()

# Language/framework used:
This is a frontend project so HTML/CSS/Javascript is used, no additional libraries/frameworks is used.

# Features:
The game has the following features:
- Spawning fruits and bombs.
- Players can slice fruits to score, and slice bomb to end the game.
- Scoreboard to keep track of the best score of 2 players.
- Information board: timer countdown, current level

# How to play the game?
Simply click either player1 or player2 button, the game will start with a 20 second timer, slice a normal fruit will give you 1 point, a halloween pumpkin allows you to slice multiple times and score more than 1 point based on the frequency of your slicing motion; when you survived in 20s without slicing a bomb, a pop up notice will ask you whether to continue, if you choose to continue, you will enter another level where the amount of the bombs will increase. When you accidentally sliced a bomb, the game will end and you have the option to restart.

# Below section is a development log which records the daily process of making this game:
## Development log:
### 9/2/2022:
- Create a simple test when I can use “pointerover” event to control the display over a fruit.
- Create 4 keyframes to simulate the directions where each fruit will move.
- Challenges left: how to spawn a fruit randomly

### 9/3/2022:
- Using async function to spawn xx amount of fruits, with xx time interval. Fruits can spawn from 4 directions, but need to specify a spawning point (such as a coordinate system).
- Challenges left: how to create a function so that fruits can spawn in a specific point? For example, if I want the fruit to be dropped from top between certain points. Avoiding fruits to be dropped from points close to edges.

### 9/4/2022:
- Solved challenge: spawn fruits from 4 directions, in random starting positions.
- Implement pointover event listener so that any spawned fruit, can be sliced.
- Simple score keeper: every time you slice a fruit, the score will add 1.
- Gameover mechanism set up.
- Challenges left: How to set up “split” effect when slice the fruits? How to create a mouse trail effect to mimic the slicing effect in fruit ninja?

### 9/5/2022:
- Customized knife cursor.
- Working on the slice effect.

### 9/6/2022:
- Per round: a count down of 20s; for every level, increase the amount of bombs.
- How to set up the spawn mechanism? Currently, I manually set up the spawns. (one solution: setInterval of 1s, for every second, spawn either a fruit or a bomb).

### 9/8/2022:
- Use clearInterval() to clear the setInterval function whenever time reached 0 or gameOver, to avoid time counting to negative numbers, and fruits keep spawning after gameOver.
- Add a level feature, every time clicks continue, and whenever it shoots bombs, it’ll shoot a level amount of bombs, with a 500ms interval.
- Implemented record board with localStorage object, so that whenever player reached the highest score, the board will update and will not reset on page refresh or new game.
- Restructure code layout.
- Implement with sound effect (slice, bomb).

# Challenges for future implementation:
- Cursor effect like the actual fruit ninja game.
- Fruit sliced effect (may include using Canvas?).
- A counter to indicate the amount of fruit a player missed, when reached limit, the game will also end.
