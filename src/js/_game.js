
import World from './_world.js';
import Enemy from './_enemy.js';
import Player from './_player.js';

export default class Game {
    constructor() {
        this.startScreen = null
        this.gameContainer = document.querySelector('#game-container')
		this.gameScreen = document.querySelector('#game-screen')
        this.gameEndScreen = document.querySelector('#game-end')

        this.height = '100%'
        this.width = '3000px'
        this.enemies = []
        this.score = 100
        this.lives = 3

        this.friction = 0.8
        this.gravity = 0.4

        this.gameIsOver = false
        this.gameIntervalId = null
        // this.gameLoopFrequency = Math.round(10000 / 60) 
        this.gameLoopFrequency = Math.round(1000 / 60) // 16 fps

        this.ground = new World(this.gameScreen, 100, this.player)
        this.player = new Player(this.gameScreen, this.ground.height, 20, 60, 60, this.friction, this.gravity);
    }
    
    start() {
        console.log('game has started!')
        
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

        // displaying score next to ⭐️
        const scoreNumber = document.createElement('p');
        scoreNumber.innerHTML = this.score;
        document.querySelector('.game-score').appendChild(scoreNumber);

        // displaying live points + updating them
        const livesContainer = document.querySelectorAll('.game-lives-thing');

        for (let i = 0; i < this.lives; i++) {
            livesContainer[i].src = './images/heart-fill.svg'
            livesContainer[i].classList.add('games-lives-full')
        }
    }

    gameLoop() {
        this.update()

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }

		// Create a new enemy based on a random probability
		// when there is no other enemies on the screen
		if (Math.random() > 0.98 && this.enemies.length < 1) {
			this.enemies.push(new Enemy(this.gameScreen, this.player))
		}
    }

    update() {
        this.player.move()

        // Check for collision and if an enemy is still on the screen
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i]
            enemy.move()

            if(enemy.top > this.gameScreen.offsetHeight) {
                this.enemies.splice(0, 1)
            }

            // If the player's car collides with an enemy
            if (this.player.didCollide(enemy)) {
                const livesContainer = document.querySelectorAll('.game-lives-thing');

                for (let i = 0; i < this.lives; i++) {
                    livesContainer[livesContainer.length - 1].src = './images/heart.svg'
                }
                // Remove the enemy element from the DOM
                enemy.character.remove()
                // Remove enemy object from the array
                this.enemies.splice(i, 1)
                // Reduce player's lives by 1
                this.lives--
                // Update the counter variable to account for the removed enemy
                i--
            } // If the enemy is off the screen (at the bottom)
            else if (enemy.top > this.height) {
                // Increase the score by 1
                this.score++
                // Remove the enemy from the DOM
                enemy.character.remove()
                // Remove enemy object from the array
                this.enemies.splice(i, 1)
                // Update the counter variable to account for the removed enemy
                i--
            }
        }


        // If the lives are 0, end the game
        if (this.lives === 0) {
            this.endGame()
        }
        if (this.player.endGame === true) {
            console.log('end game!!')
            this.endGame()
        }

        // Create a new enemy based on a random probability
        // when there is no other enemies on the screen
        if (Math.random() > 0.98 && this.enemies.length < 1) {
            this.enemies.push(new Enemy(this.gameScreen))
        }
    }

    endGame() {
        this.player.character.remove()
        // this.enemies.forEach((enemy) => enemy.character.remove())

        this.gameIsOver = true

        this.gameScreen.style.display = 'none'
        this.gameEndScreen.style.display = 'flex'
    }
}
    