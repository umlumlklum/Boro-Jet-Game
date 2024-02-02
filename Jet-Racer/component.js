class component{
    constructor(width, height, color, x, y, type){
        this.type = type;
        if(type == "image" || type == "background"){
            this.image = new Image();
            this.image.src = color;
        }
        
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;

        this.update = function(){
            let ctx = gameArea.context;
            if(this.type == "text"){
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            }else if(this.type == "image" || this.type == "background"){
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                if(this.type == "background"){
                    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
                }
            }else{
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        this.newPos = function(){
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.type == "background"){
                if(this.x == -(this.width)){
                    this.x = 0;
                }
            }
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
};