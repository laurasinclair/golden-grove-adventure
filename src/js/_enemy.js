export default class Enemy {
	constructor(gameScreen) {
		this.gameScreen = gameScreen
		this.left = Math.floor(Math.random() * 1300)
		this.top = 0
		this.width = 60
		this.height = 60

		this.character = document.createElement('div')
		this.character.classList.add('game-enemy')
		this.character.style.position = 'absolute'
		this.character.style.width = `${this.width}px`
		this.character.style.height = `${this.height}px`
		this.character.style.left = `${this.left}px`
		this.character.style.top = `${this.top}px`

		this.bg = document.querySelector('#game-background')
		this.bg.appendChild(this.character)
	}

	updatePosition(left) {
		// Update the obstacle's position based on the properties left and top
		this.character.style.left = `${this.left}px`
		this.character.style.top = `${this.top}px`

		this.character.style.left = `-${this.bg.style.left}px`
	}

	move() {
		// Move the obstacle down by 3px
		this.top += 6

		this.updatePosition()
	}
}
