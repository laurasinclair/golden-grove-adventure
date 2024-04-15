
export default class World {
	constructor(gameScreen, height, player) {
		this.gameScreen = gameScreen
		this.height = height
        this.player = player

        this.ground = document.createElement('div')
        this.ground.classList.add('game-ground')
        this.ground.style.height = `${height}px`

		this.bg = document.querySelector('.game-background')
		this.bg.style.left = 0

        this.gameScreen.appendChild(this.ground)
    }
}