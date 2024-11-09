const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const gravity = 0.7;
let playerBottom = 0;

canvas.width = 1024
canvas.height = 560
const background=new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "../assets/trialback.png",
    isBackground: true
})

function resizeCanvasAndPlatforms() {
    
    const platformWidth = canvas.width * 0.2;
    const platformHeight = canvas.height * 0.05;
    const jumpHeight = canvas.height * 0.25;

    const centerX = canvas.width / 2 - platformWidth / 2;
    const centerY = canvas.height / 2 - platformHeight / 2;

    platforms = [
        { x: centerX, y: centerY, width: platformWidth, height: platformHeight }, // Central
        { x: centerX - platformWidth - 50, y: centerY - jumpHeight, width: platformWidth, height: platformHeight }, // Izquierda Superior
        { x: centerX + platformWidth + 50, y: centerY - jumpHeight, width: platformWidth, height: platformHeight }, // Derecha Superior
        { x: centerX - platformWidth - 50, y: centerY + jumpHeight, width: platformWidth, height: platformHeight }, // Izquierda Inferior
        { x: centerX + platformWidth + 50, y: centerY + jumpHeight, width: platformWidth, height: platformHeight }  // Derecha Inferior
    ];
}


function colisionConPlataforma(player) {
    for (let platform of platforms) {
        if (
            player.position.x + player.width >= platform.x &&
            player.position.x <= platform.x + platform.width &&
            player.position.y + player.height + player.velocity.y >= platform.y &&
            player.position.y + player.height <= platform.y + player.velocity.y
        ) {
            player.position.y = platform.y - player.height; 
            player.velocity.y = 0; 
            player.isOnGround = true; 
            player.jumped = false; 
        }
    }
    
}

const player = new FighterSprite({
    position: {
        x: 20,
        y: 620
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: "red",
    offset: {
        x: 215,
        y: 150
    },
    imageSrc: "../assets/player1/Idle.png",
    frames:8,
    scale:2.5,
    sprites: {
        idle: {
            imageSrc: "../assets/player1/Idle.png",
            frames: 8
        },
        run: {
            imageSrc: "../assets/player1/Run.png",
            frames: 8
        }
    }
});

const enemy = new FighterSprite({
    position: {
        x: 1230,
        y: 620
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "blue",
    offset: {
        x: -50,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: { 
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: { 
        pressed: false
    },
    Enter: { 
        pressed: false
    }
};

function colisionRectangulo({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determineWinner ({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector("#displayText").style.display = 'flex'
    if (player.health === enemy.health) {
       
        document.querySelector("#displayText").innerHTML = 'Empate'
    }
    else if (player.health > enemy.health) {
    
        document.querySelector("#displayText").innerHTML = 'Gana J1'
    }
    else if (player.health < enemy.health) {
        
        document.querySelector("#displayText").innerHTML = 'Gana J2'
    }
}

let timer=60
let timerId
function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000);
    if (timer > 0) {
        timer--;
        document.querySelector("#timer").innerHTML = timer;
    }

   if (timer === 0) {
        determineWinner({ player, enemy, timerId });
       }

}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    c.fillStyle = "#3498db"; // Color para las plataformas
    platforms.forEach(platform => {
        c.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
   
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    player.image = player.sprites.idle.image;
    if (keys.a.pressed && player.lastKey === 'a' && !player.isLowering) {
        player.velocity.x = -5;
        player.image = player.sprites.run.image;
    } else if (keys.d.pressed && player.lastKey === 'd' && !player.isLowering) {
        player.velocity.x = 5;
        player.image = player.sprites.run.image;
    }

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && !enemy.isLowering) {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && !enemy.isLowering) {
        enemy.velocity.x = 5;
    }
    
    colisionConPlataforma(player);
    colisionConPlataforma(enemy); 

    if (colisionRectangulo({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#vida2').style.width = enemy.health + '%';
    }

    if (colisionRectangulo({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#vida1').style.width = player.health + '%';
    }

    if (keys.Enter.pressed) { 
        enemy.attack();
        keys.Enter.pressed = false; 
    }
    //terminar juego por vida
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
    
}
resizeCanvasAndPlatforms();
animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            if (player.isOnGround && !player.jumped) {  
                player.velocity.y = -15; 
                player.isOnGround = false;  
                player.jumped = true;       
            }
            break;
        case 's':
            if (player.isOnGround && player.canLower) { 
                player.canLower = false; 
                player.canPassPlatforms = true; 
                player.position.y += 5; 
                player.isLowering = true; 
            }
            break;
        case ' ':
            player.attack();
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            if (enemy.isOnGround && !enemy.jumped) {  
                enemy.velocity.y = -15; 
                enemy.isOnGround = false;  
                enemy.jumped = true;       
            }
            break;
        case 'ArrowDown':
            if (enemy.isOnGround && enemy.canLower) { 
                enemy.canLower = false; 
                enemy.canPassPlatforms = true; 
                enemy.position.y += 5; 
                enemy.isLowering = true; 
            }
            break;
        case 'Enter': 
            enemy.attack();
            break;
    }
});


window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            break;
        case 's':
            player.canLower = true; 
            player.canPassPlatforms = false; 
            player.isLowering = false; 
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowDown':
            enemy.canLower = true; 
            enemy.canPassPlatforms = false; 
            enemy.isLowering = false;
            break;
    }
});
