import World from './_world.js'
import Enemy from './_enemy.js'
import Player from './_player.js'
import Item from './_items.js'

export default class Game {
	constructor() {
		this.startScreen = null
		this.gameContainer = document.querySelector('#game-container')
		this.gameScreen = document.querySelector('#game-screen')
		this.gameStart = document.querySelector('#game-start')
		this.gameLoseScreen = document.querySelector('#game-lose')
		this.gameWinScreen = document.querySelector('#game-win')
		this.livesContainer = document.querySelectorAll('.game-lives-thing')

		this.height = '100%'
		this.width = '3000px'
		this.enemies = []
		this.items = []
		this.score = 100
		this.lives = 4

		this.friction = 0.8
		this.gravity = 0.4

		this.gameIsOver = false
		this.gameIntervalId = null
		this.gameLoopFrequency = Math.round(1000 / 60) // 16 fps

		this.ground = new World(this.gameScreen, 100, this.player)
		this.player = new Player(this.gameScreen, this.ground.height, 20, 60, 60, this.friction)
	}

	start() {
		console.log('game has started!')

		this.gameScreen.style.display = 'block'
		this.gameStart.style.display = 'none'
		document.querySelector('.game-stats').style.display = 'flex'
		document.querySelector('.bg-branches').style.display = 'block'

		this.gameIntervalId = setInterval(() => {
			this.gameLoop()
		}, this.gameLoopFrequency)

		// displaying score next to ⭐️
		const scoreNumber = document.createElement('p')
		scoreNumber.innerHTML = this.score
		document.querySelector('.game-score').appendChild(scoreNumber)

		// displaying live points + full by default
		/*
        4 lives ♥♥♥
        3 lives ♥♥♡
        2 lives ♥♡♡
        1 lives ♡♡♡
        */
		for (let i = 0; i < this.lives - 1; i++) {
			this.livesContainer[i].classList.remove('game-lives-empty')
			this.livesContainer[i].classList.add('game-lives-full')
		}
	}

	gameLoop() {
		this.update()

		if (this.gameIsOver) {
			clearInterval(this.gameIntervalId)
		}

		if (Math.random() > 0.98 && this.items.length < 3) {
			this.items.push(new Item(document.querySelector('#game-background')))
		}

		// Create a new enemy based on a random probability
		// when there is no other enemies on the screen
		if (Math.random() > 0.98 && this.enemies.length < 1) {
			this.enemies.push(new Enemy(this.gameScreen, this.player))
		}
	}

	update() {
		this.player.move()

		setInterval(
			this.score += 50, 
			1000
		)

		// check for collision and if an item is still on the screen
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]
			// item.move()

			if (this.player.didCollideItem(item)) {
				item.remove()
				this.items.splice(i, 1)
				this.score += 100
				i--
			}
		}

		// check for collision and if an enemy is still on the screen
		for (let i = 0; i < this.enemies.length; i++) {
			const enemy = this.enemies[i]
			enemy.move()

			if (enemy.top > this.gameScreen.offsetHeight) {
				// if enemy gets out of the screen (at the bottom)
				enemy.character.remove()
				this.enemies.splice(0, 1)
			}

			if (this.player.didCollideEnemy(enemy)) {
				enemy.character.remove() // Remove the enemy element from the DOM
				this.enemies.splice(i, 1)
				this.lives--
				// Update the counter variable to account for the removed enemy
				i--

                // UPDATING LIVES ♥♡
                // every time player is hit by an enemy, loop through the ❤️ to make them look empty
                for (i = 0; i < this.livesContainer.length; i++) {
                    this.livesContainer[i].classList.remove('game-lives-full')
                    this.livesContainer[i].classList.add('game-lives-empty')
                }
                
                // add as many live points as the remaining lives
				for (let i = 0; i < this.lives - 1; i++) {
					this.livesContainer[i].classList.remove('game-lives-empty')
					this.livesContainer[i].classList.add('game-lives-full')
				}
			}
		}

		// If the lives are 0, end the game
		if (this.lives === 0) {
			this.loseGame()
		}
		if (this.player.winGame === true) {
			console.log('end game!!')
			this.winGame()
		}

		// create a new enemy based on a random probability
		// when there is no other enemies on the screen
		if (Math.random() > 0.3 && this.enemies.length < 1) {
			this.enemies.push(new Enemy(this.gameScreen))
		}
	}

	loseGame() {
		this.player.character.remove()
		this.gameIsOver = true

		this.gameScreen.style.display = 'none'
		this.gameLoseScreen.style.display = 'flex'

		document.querySelector('.game-score p').remove()
		this.items = []
	}

	winGame() {
		this.player.character.remove()
		this.gameIsOver = true

		this.gameScreen.style.display = 'none'
		this.gameWinScreen.style.display = 'flex'

		document.querySelector('.game-score p').remove()
		this.items = []
	}
}
