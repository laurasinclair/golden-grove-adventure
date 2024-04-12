
export default class World {
	constructor(gameScreen, height) {
		this.gameScreen = gameScreen
		this.height = height
        this.ground = document.createElement('div')
        this.ground.classList.add('game-ground')
        this.ground.style.height = `${height}px`

        this.gameScreen.appendChild(this.ground)
    }
}