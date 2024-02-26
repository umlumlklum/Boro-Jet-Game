/*
-added statbox class with opacity parameter
*/ 

/*
______Hierachy________
component
    -player
	-text
	-background
	-image # maybe
	-obstacles
	    -movingSquare
		-crushSquares # incomplete
		-columns
		-spinningPin # incomplete
	-enemy
		-missile # incomplete
		-bug # incomplete
		-turret # incomplete
	-collectable
		-barellRoll # incomplete
		-healthPoint # incomplete
________________________
*/
class component{
	constructor(x, y){
        this.x = x;
        this.y = y;
	}
}

class statbox extends component{
	constructor(x,y,width,height,color,opacity){
    	super(x,y)
		this.width = width
		this.height = height
		this.color = color
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

class player extends component{
	constructor(x,y,width,height,color){ 
		super(x, y);
		this.obj='player';
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
		
        this.update = function(){
            let ctx = gameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);  
        }
		
		this.newPos = function(){
			this.x += this.speedX;
			this.y += this.speedY;
		}
		
		this.crashWith = function(obj){
			let left = this.x;
			let right = this.x + this.width;
			let top = this.y;
			let bottom = this.y + this.height;
			let otherLeft = obj.x;
			let otherRight = obj.x + obj.width;
			let otherTop = obj.y;
			let otherBottom = obj.y + obj.height;
			let crash = true;
			if((bottom < otherTop) ||
			   (top > otherBottom) ||
			   (right < otherLeft) ||
			   (left > otherRight)){
				crash = false;
			}
			return crash;
		}
	}
}

class text extends component{
	constructor(x,y,width,height,color,type){ 
		super(x,y);
		this.obj='text'
        this.type = type;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
        this.update = function(){
            let ctx = gameArea.context;
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
            
        }
	}
}

class background extends component{
	constructor(x, y,width,height,color){
		super(x, y);
		this.obj='background';
		this.image = new Image();
		this.image.src = color;

		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
	
		this.update = function(){
			let ctx = gameArea.context;
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
		}
		this.newPos = function(){
			this.x += this.speedX;
			this.y += this.speedY;
			if(this.x == -(this.width)){
				this.x = 0;
			}
		}
	}
}

class image  extends component{
	constructor(x, y,width,height, color){
		super(x, y);
		this.obj='image';
		this.image = new Image();
		this.image.src = color;

		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
	
		this.update = function(){
			let ctx = gameArea.context;
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	
		this.newPos = function(){
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}
}

class obstacle extends component{
	constructor(x, y,width,height,color){
		super(x, y);
		this.obj='obstacle';
	}
}

class column extends obstacle{
	constructor(x,y,width,height,color){ 
		super(x,y);
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
		
        this.update = function(){
            let ctx = gameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);  
        }
		
		this.newPos = function(){
			this.x += this.speedX;
			this.y += this.speedY;
		}
		
	}
}

class enemy extends component{
	constructor(x, y){
		super(x, y);
		this.obj='enemy';
	}
}

class collectable extends component{
	constructor(x, y){
		super(x, y);
		this.obj='collectable';
	}
}
