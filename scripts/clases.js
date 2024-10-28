class Sprite {
    constructor({ position, imageSrc, isBackground = false, scale=1 , frames = 1}) {
        this.position = position;
       this.image = new Image();
       this.image.src = imageSrc;
        this.width = 50;
        this.height = 150;
        this.scale = scale
        this.isBackground = isBackground;
        this.frames = frames;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    draw() {
        if (this.isBackground) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                canvas.width,
                canvas.height
            )
        }else {
            c.drawImage(
                this.image,
                this.currentFrame * (this.image.width/this.frames),
                0,
                this.image.width/this.frames,
                this.image.height/this.frames,
                this.position.x,
                this.position.y,
                (this.image.width/this.frames) *this.scale,
                this.image.height *this.scale
            )
        }
        
    }

    update() {
        this.draw();
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            
        if (this.currentFrame<this.frames-1){
            this.currentFrame++
        }else {
            this.currentFrame = 0
        } 
        }
        
    }

    
}
class FighterSprite {
    constructor({ position, velocity, color, offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.isOnGround = false;
        this.jumped = false;     
        this.canPassPlatforms = false; 
        this.canLower = true;   
        this.isLowering = false; 
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            c.fillStyle = "chartreuse";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x < 0) this.position.x = 0; 
        if (this.position.x + this.width > canvas.width) this.position.x = canvas.width - this.width; 
        const groundLevel = canvas.height - 97;
        if (!this.canPassPlatforms) { 
            if (this.position.y + this.height + this.velocity.y >= groundLevel) {
                this.position.y = groundLevel - this.height; 
                this.velocity.y = 0;
                this.isOnGround = true;  
                this.jumped = false;     
            } else {
                this.velocity.y += gravity; 
                this.isOnGround = false;    
            }
        } else {
            this.velocity.y = 0; 
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}