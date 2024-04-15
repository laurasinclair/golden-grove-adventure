export default class Enemy {
    constructor(gameScreen) {
		this.gameScreen = gameScreen;
		this.left = Math.floor(Math.random() * 300 + 70);
		this.top = 0;
		this.width = 60;
		this.height = 60;
		this.bg = document.querySelector('.game-background')
		this.character = document.createElement('div')

		this.character.classList.add('game-enemy')

		this.character.style.position = "absolute";
		this.character.style.width = `${this.width}px`;
		this.character.style.height = `${this.height}px`;
		this.character.style.left = `${this.left}px`;
		this.character.style.top = `${this.top}px`;

		this.gameScreen.appendChild(this.character);
    }
  
    updatePosition() {

      // Update the obstacle's position based on the properties left and top
      this.character.style.left = `${this.left}px`;
      this.character.style.top = `${this.top}px`;

	  if (this.bg.offsetLeft < -250) {
		console.log('this.bg.offsetLeft < -250')
		this.character.left = `-${this.bg.offsetLeft}px`
	  }

    }
  
    move() {
      // Move the obstacle down by 3px
      this.top += 3;

	// if (this.player.left > 250) {
	// 	// when player is at 2/3 of the screen it doesn't actually move anymore, but the background does
	// 	this.character.style.left = `-${this.positionX}px`
	// }

      // Update the obstacle's position on the screen
      this.updatePosition();
    }
  }