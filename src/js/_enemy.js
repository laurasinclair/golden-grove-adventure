export default class Enemy {
	constructor(x, y, width, height, context, start, end) {
		this.width = width
		this.height = height
		this.speedX = 0
		this.x = x
		this.y = y
		this.context = context
		this.counter = 0
		this.setVelocity(1.5)
		this.cameraMov = 0
		this.start = start
		this.end = end
	}
}
