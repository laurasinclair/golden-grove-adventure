export default class World {
	constructor(gameScreen, height, player) {
		this.gameScreen = gameScreen
		this.height = height
		this.player = player

		this.ground = document.createElement('div')
		this.ground.classList.add('game-ground')
		this.ground.style.height = `${height}px`

		this.bg = document.querySelector('#game-background')
		this.bg.style.left = 0

		this.gameScreen.appendChild(this.ground)
	}

	move() {
		this.positionX += this.velX
		this.updatePosition()
	}

	updatePosition() {
		if (this.player.positionX > 250) {
			// when player is at 2/3 of the screen it doesn't actually move anymore, but the background does
			this.bg.style.left = `-${this.player.positionX - 250}px`
		}
	}
}
