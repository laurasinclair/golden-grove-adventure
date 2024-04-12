
import World from './_world.js';
import Player from './_player.js';

export default class Game {
    constructor() {
        this.startScreen = null
		this.gameScreen = document.querySelector('#game-screen')
        this.gameEndScreen = document.querySelector('#game-end')

        this.height = '100%'
        this.width = '3000px'
        this.obstacles = []
        this.score = 0
        this.lives = 3

        this.friction = 0.8
        this.gravity = 0.4

        this.gameIsOver = false
        this.gameIntervalId = null
        // this.gameLoopFrequency = Math.round(100000 / 60) 
        this.gameLoopFrequency = Math.round(1000 / 60) // 16 fps

        this.ground = new World(this.gameScreen, 100, this.player)
        this.player = new Player(this.gameScreen, this.ground.height, 20, 60, 60, this.friction, this.gravity);
    }
    
    start() {
        console.log('game has started!')
        
        debugger;


        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

    }

    gameLoop() {
        this.update()

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move()

        /*
        // Check for collision and if an obstacle is still on the screen
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            obstacle.move()

            // If the player's car collides with an obstacle
            if (this.player.didCollide(obstacle)) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove()
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1)
                // Reduce player's lives by 1
                this.lives--
                // Update the counter variable to account for the removed obstacle
                i--
            } // If the obstacle is off the screen (at the bottom)
            else if (obstacle.top > this.height) {
                // Increase the score by 1
                this.score++
                // Remove the obstacle from the DOM
                obstacle.element.remove()
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1)
                // Update the counter variable to account for the removed obstacle
                i--
            }
        }
        */


        // If the lives are 0, end the game
        if (this.lives === 0) {
            this.endGame()
        }
        if (this.player.endGame === true) {
            console.log('end game!!')
            this.endGame()
        }

        /*
        // Create a new obstacle based on a random probability
        // when there is no other obstacles on the screen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen))
        }
        */
    }

    endGame() {
        this.player.character.remove()
        // this.obstacles.forEach((obstacle) => obstacle.element.remove())

        this.gameIsOver = true

        this.gameScreen.style.display = 'none'
        this.gameEndScreen.style.display = 'flex'
    }
}
    