export default class Item {
    constructor(gameScreen) {
		this.gameScreen = document.querySelector('.game-background');
		this.left = Math.floor(Math.random() * 1200);
		this.bottom = 80;
		this.width = 50;
		this.height = 60;
		this.bg = document.querySelector('.game-background')

		this.item = document.createElement('img')
        this.item.src = './images/strawberry1.png'
		this.item.classList.add('game-strawberry')
		this.item.style.width = `${this.width}px`;
		this.item.style.height = `${this.height}px`;
		this.item.style.left = `${this.left}px`;
		this.item.style.bottom = `${this.bottom}px`;

		this.gameScreen.appendChild(this.item);
    }
  }