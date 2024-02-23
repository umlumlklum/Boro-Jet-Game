/*
______Hierachy________
component
	text
	statBox 
	movable   < Has x and y speed >
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

const Components = {
	Text: Symbol("Text"),
	StatBox: Symbol("StatBox"),
	Column: Symbol("Column"),
	HealthPack: Symbol("HealthPack"),
	Player: Symbol("Player")
}

class Component{
	constructor(type, x, y, width, height, color){
		this.type = type;
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
		super(Components.Text, x, y, width, height, color);
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
    	super(Components.StatBox,x,y,width,height,color)
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
	constructor(type, x, y, width, height, speedX, speedY, color){
		super(type, x, y, width, height, color);
		this.speedX = speedX;
		this.speedY = speedY;
	}

	update(){
		this.move();
		super.update();
	}

	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

class Obstacle extends MovableComponent{
	constructor(type, x, y, width, height, speedX, speedY, color){
		super(type, x, y, width, height, speedX, speedY, color);
	}

	collide(){}
}

class Column extends Obstacle{
	constructor(x, y, width, height, speedX, speedY, color, damage){ 
		super(Components.Column, x, y, width, height, speedX, speedY, color);
		this.damage = damage;
	}

	collide(obj){
		obj.takeDamage(this.damage);
	}
}

class Collectable extends MovableComponent{
	constructor(type, x, y, width, height, speedX, speedY, color){
		super(type, x, y, width, height, speedX, speedY, color);
	}

	collect(){}
}

class HealthPack extends Collectable{
	constructor(x, y, width, height, speedX, speedY, color, healValue){
		super(Components.HealthPack, x, y, width, height, speedX, speedY, color);
		this.healValue = healValue;
	}

	collect(){
		player.heal(this.healValue);
	}
}

class LivingComponent extends MovableComponent{
	constructor(type, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(type, x, y, width, height, speedX, speedY, color);
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

	attack(obj){
		obj.takeDamage(this.damage);
	}
}

class Player extends LivingComponent{
	constructor(x, y, width, height, speedX, speedY, maxHealth, damage, color){ 
		super(Components.Player, x, y, width, height, speedX, speedY, maxHealth, damage, color);
		this.powerUps = [];
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
	constructor(type, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(type, x, y, width, height, speedX, speedY, maxHealth, damage, color);
	}
}
