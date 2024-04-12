export default class Player {
	constructor(gameScreen, bottom, left, width, height, friction, gravity) {
		this.gameScreen = gameScreen
		this.positionX = left
		this.left = this.positionX
		this.bottom = bottom
		this.width = width
		this.endGame = false
		this.height = height

		this.speed = 30
		this.velX = 0
		this.velY = 0
		this.isJumping = false

		this.velX *= friction
		this.velY += gravity

		this.directionX = 0
		this.directionY = 0

		this.character = document.createElement('div')

		this.character.classList.add('game-player')
		this.character.style.width = `${width}px`
		this.character.style.height = `${height}px`

		this.gameScreen.style.backgroundPositionX = 0

		this.character.style.left = `${this.positionX}px`
		this.character.style.bottom = `${bottom}px`

		this.bg = document.querySelector('.game-background')
		this.bg.style.left = `-${this.positionX}px`

		this.gameScreen.appendChild(this.character)
	}

	moveLeft() {
		this.velX = -3;
	}
	
	moveRight() {
		this.velX = 3;
	}
	
	stopMoving() {
		this.velX = 0;
	}

	move() {
		this.positionX += this.velX
		this.updatePosition()
	}

	updatePosition() {
		this.left = this.positionX // position on the game screen (width: 600px) ≠ position in the world (width: 3000px)

		if (this.left < 20) {
			// making sure player doesn't go beyond the left limit of the game
			this.positionX = 20
		}

		if (this.positionX <= 250) {
			// at the start of the level, player moves freely from its original position
			this.character.style.left = `${this.positionX}px`
		}

		if (this.positionX > 250) {
			// when player is at 2/3 of the screen it doesn't actually move anymore, but the background does
			this.left = 250
			this.bg.style.left = `-${this.positionX - 250}px`
		}

		if (this.positionX > 1000) {
			// when player reaches the end of the level, it can move freely from 2/3 of the screen to the very end
			this.character.style.left = `${this.positionX - 750}px`
		}

		if (this.positionX > 1360) {
			// when player reaches the very end of the level, it can't go past the screen edge
			this.positionX = 1361
		}

		if (this.positionX > 1360 && this.left > 679) {
			this.left = 620
			this.character.style.left = `${this.left}px`
			this.endGame = true
		}
	}

	didCollide(enemy) {
		// creates a box around the player, one around the enemy, and do something if they crash into each other
		const playerRect = this.character.getBoundingClientRect()
		const enemyRect = enemy.character.getBoundingClientRect()

		if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left && playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
			console.log('Crash!')
			return true
		} else {
			return false
		}
	}
}
