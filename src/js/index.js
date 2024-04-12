import Game from "./_game.js";

window.onload = function () {
	startGame()

	function startGame() {
		let game = new Game()

		game.start()
		
		function handleKeydown(event) {
			const key = event.key
			const possibleKeystrokes = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', '32']

			if (possibleKeystrokes.includes(key)) {
				// event.preventDefault()

				switch (key) {
					
					case 'ArrowLeft':
                        console.log('keydown - ArrowLeft');
						// game.player.directionX = 30;

						if (game.player.velX < game.player.speed) {
							game.player.velX--;
						}

						break
					case 'ArrowUp':
                        console.log('keydown - ArrowUp');
						// game.player.directionY = -1
						break
					case 'ArrowRight':
                        console.log('keydown - ArrowRight');
						// game.player.directionX = -30

						if (game.player.velX < game.player.speed) {
							game.player.velX++;
						}

						break
					case 'ArrowDown':
                        console.log('keydown - ArrowDown');
						// game.player.directionY = 1
						break
					case '32':
                        console.log('keydown - Space bar');
						// game.player.directionY = 1
						break
				}
			}
		}

		// Add the handleKeydown function as an event listener for the keydown event
		window.addEventListener('keydown', handleKeydown)
	}
}
