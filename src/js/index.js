import Game from "./_game.js";

window.onload = function () {
	startGame()

	function startGame() {
		let game = new Game()

		game.start()
		
		function handleKeyDown(event) {
			const key = event.key;
		
			switch (key) {
				case 'ArrowLeft':
					game.player.moveLeft();
					game.player.character.style.transform = 'scaleX(-1)'
					break;
				case 'ArrowRight':
					game.player.moveRight();
					game.player.character.style.transform = 'scaleX(1)'
					break;
			}
		}
		
		function handleKeyUp(event) {
			const key = event.key;
		
			switch (key) {
				case 'ArrowLeft':
				case 'ArrowRight':
					game.player.stopMoving(); // Call stopMoving method when left or right arrow key is released
					break;
				// Handle other keys as needed
			}
		}
		
		// Add event listeners for keydown and keyup events
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
	}
}
