/*
______Hierachy________
component
	text
	statBox 
	movable   < Has x and y speed >
		background
		obstacles
			movingSquare
			crushSquares # incomplete
			columns
			spinningPin # incomplete
		collectable
			barellRoll # incomplete
			healthPoint # incomplete
		living   < Has health and damage >
			player
			enemy
				missile # incomplete
				bug # incomplete
				turret # incomplete
________________________
*/
class Component{
	constructor(id, x, y, width, height, color){
		this.id = id;
        this.x = x;
        this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	update(){
		let ctx = gameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Text extends Component{
	constructor(x, y, width, height, color){ 
		super('text', x, y, width, height, color);
		this.update = function(){
			let ctx = gameArea.context;
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
		}
	}

}

class StatBox extends Component{
	constructor(x,y,width,height,color,opacity){
    	super('statbox',x,y,width,height,color)
		this.opacity = opacity
		this.update = function(){
            let ctx = gameArea.context;
            ctx.fillStyle = color;
			ctx.globalAlpha = this.opacity;
            ctx.fillRect(this.x, this.y, this.width, this.height); 
			ctx.globalAlpha = 1;
        }
	}

}

class MovableComponent extends Component{
	constructor(id, x, y, width, height, speedX, speedY, color){
		super(id, x, y, width, height, color);
		this.speedX = speedX;
		this.speedY = speedY;
	}

	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

class Background extends MovableComponent{
	constructor(x, y, width, height, speedX, speedY, color){
		super('background', x, y, width, height, speedX, speedY, color);
		this.image = new Image();
		this.image.src = color;
	}

	update(){
		this.move();

		let ctx = gameArea.context;
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
	}
}

class Obstacle extends MovableComponent{
	constructor(id, x, y, width, height, speedX, speedY, color){
		super(id, x, y, width, height, speedX, speedY, color);
	}
}

class Column extends Obstacle{
	constructor(x, y, width, height, speedX, speedY, color){ 
		super('column', x, y, width, height, speedX, speedY, color);
	}

	update(){
		super.update();
	}
}

class Collectable extends MovableComponent{
	constructor(id, x, y, width, height, speedX, speedY, color){
		super(id, x, y, width, height, speedX, speedY, color);
	}
}

class LivingComponent extends MovableComponent{
	constructor(id, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(id, x, y, width, height, speedX, speedY, color);
		this.health = maxHealth;
		this.maxHealth = maxHealth;
		this.damage = damage;
	}

	heal(health){
		this.health += health;

		if (this.health > this.maxHealth){
			this.health = this.maxHealth;
		}
	}

	takeDamage(damage){
		this.health -= damage;

		if (this.health <= 0){
			gameArea.stop(); // Death
		}
	}
}

class Player extends LivingComponent{
	constructor(x, y, width, height, speedX, speedY, maxHealth, damage, color){ 
		super('player', x, y, width, height, speedX, speedY, maxHealth, damage, color);
	}

	update(){
		this.move();
		super.update();
	}

	isOverlapping(obj){
		let left = this.x;
		let right = this.x + this.width;
		let top = this.y;
		let bottom = this.y + this.height;
		let otherLeft = obj.x;
		let otherRight = obj.x + obj.width;
		let otherTop = obj.y;
		let otherBottom = obj.y + obj.height;

		let overlap = true;
		if ((bottom < otherTop) ||
		   (top > otherBottom) ||
		   (right < otherLeft) ||
		   (left > otherRight)){
			overlap = false;
		}

		return overlap;
	}
}

class Enemy extends LivingComponent{
	constructor(id, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(id, x, y, width, height, speedX, speedY, maxHealth, damage, color);
	}
}
