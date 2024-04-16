import Game from './_game.js'

window.onload = function () {
	const startButton = document.getElementById('start-button')
	const restartButton = document.getElementById('restart-button')
	const restartWinButton = document.getElementById('restart-win-button')

	startButton.addEventListener('click', function () {
		startGame()
	})
	
	restartButton.addEventListener('click', function () {
		console.log("restart button called")
		window.location.reload()
		startGame()

		this.game.gameScreen.style.display = 'block'
		this.game.gameWinScreen.style.display = 'none'
		this.game.gameEndScreen.style.display = 'none'
	})
	
	restartWinButton.addEventListener('click', function () {
		console.log("restartWinButton button called")
		window.location.reload()
	})

	function startGame() {
		let game = new Game()

		game.start()

		function handleKeyDown(event) {
			const key = event.key
			event.preventDefault // default behaviour here would be scrolling up or down the page

			switch (key) {
				case 'ArrowLeft':
					game.player.moveLeft()
					game.player.character.style.transform = 'scaleX(-1)'
					break
				case 'ArrowRight':
					game.player.moveRight()
					game.player.character.style.transform = 'scaleX(1)'
					break
			}
		}

		function handleKeyUp(event) {
			const key = event.key

			switch (key) {
				case 'ArrowLeft':
				case 'ArrowRight':
					game.player.stopMoving() // Call stopMoving method when left or right arrow key is released
					break
			}
		}

		// event listeners for keydown and keyup events
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
	}
}
