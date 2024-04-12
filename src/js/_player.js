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
		// this.directionY = 0

		this.character = document.createElement('div')

		this.character.classList.add('game-character')
		this.character.style.width = `${width}px`
		this.character.style.height = `${height}px`

		this.gameScreen.style.backgroundPositionX = -250

		this.character.style.left = `${this.positionX}px`
		this.character.style.bottom = `${bottom}px`

		this.gameScreen.appendChild(this.character)
	}

	test() {
		console.log('player exists!!!!!!')
	}

	move() {
		this.positionX += this.velX

		if (this.positionX < 21) {
			this.left = 20
			if (this.velX < 0) {
				this.velX = 0
			}
		}

		if (this.velX > 2) {
			this.velX = 3
		}

		if (this.positionX > 250) {
			console.log("hey you're at this.positionX > 250")
			this.character.style.left = '350px'
		}

		// this.left += this.directionX
		// this.top += this.directionY

		// if (this.left < 10) {
		// 	this.left = 10
		// }

		// console.log(`left: ${this.left}px`)

		// if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
		// 	this.left = this.gameScreen.offsetWidth - this.width - 10
		// }

		// if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
		// 	this.top = this.gameScreen.offsetHeight - this.height - 10
		// }

		this.updatePosition()
	}

	updatePosition() {
		this.left = this.positionX

		if (this.positionX > 250) {
			this.character.style.left = '250px'

			this.gameScreen.style.backgroundPositionX = `-${this.left}px`
		} else {
			this.character.style.left = `${this.positionX}px`
		}

		if (this.positionX > 1000) {
			this.character.style.left = `${this.positionX - 750}px`
		}


		if (this.positionX > 1360) {
			this.positionX = 1361
		}

		//

		if (this.positionX > 1360 && this.left > 679) {
			this.left = 620
			this.character.style.left = `${this.left}px`
			this.endGame = true
		}
		//

		console.log(`this.velX = ${this.velX}, left = ${this.left}px, positionX = ${this.positionX}px`)
	}
}
