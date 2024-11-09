class Sprite {
    constructor({ position, imageSrc, isBackground = false, scale = 1, frames = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 50;
        this.height = 150;
        this.scale = scale;
        this.isBackground = isBackground;
        this.frames = frames;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
        
        // Marcar como no cargado inicialmente
        this.loaded = false;
        
        // Evento que cambia el estado cuando la imagen se carga
        this.image.onload = () => {
            this.loaded = true;
        };
    }

    draw() {
        // Solo dibujar si la imagen está completamente cargada
        if (!this.loaded) return;

        if (this.isBackground) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                canvas.width,
                canvas.height
            );
        } else {
            c.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.frames),
                0,
                this.image.width / this.frames,
                this.image.height,
                this.position.x-this.offset.x,
                this.position.y-this.offset.y,
                (this.image.width / this.frames) * this.scale,
                this.image.height * this.scale
            );
        }
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.currentFrame < this.frames - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }
    update() {
        this.draw();
       this.animateFrames();
    }
}
class FighterSprite extends Sprite {
    constructor({ position, velocity, color, imageSrc, isBackground = false, scale = 1, frames = 1, offset = { x: 0, y: 0 }, sprites, attackBox = { offset: { }, width: undefined, height: undefined } }) {
        // Llamamos a super solo con los argumentos esperados por Sprite
        super({ position, imageSrc, isBackground, scale, frames, offset });

        // Propiedades específicas de FighterSprite
        this.velocity = velocity;
        this.color = color;
        this.offset = offset;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.isAttacking = false;
        this.health = 100;
        this.isOnGround = false;
        this.jumped = false;
        this.canPassPlatforms = false;
        this.canLower = true;
        this.isLowering = false;

        // Inicialización de propiedades de animación
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites=sprites;


        for (const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    update() {
        super.update();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // Dibujar el atkbox
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

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
        this.switchSprite('attack1');
        this.isAttacking = true;
        
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.frames - 1) return;
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.frames=this.sprites.idle.frames;
                    this.currentFrame = 0;
                }
                
                break;
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.frames=this.sprites.run.frames;
                    this.currentFrame = 0;
                }
                
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.frames=this.sprites.jump.frames;
                    this.currentFrame = 0;
                }
                
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.frames=this.sprites.fall.frames;
                    this.currentFrame = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image;
                    this.frames=this.sprites.attack1.frames;
                    this.currentFrame = 0;
                }
                break;
        }
    }
}