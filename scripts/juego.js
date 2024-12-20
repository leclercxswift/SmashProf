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

let gameOver = false;
function determineWinner ({ player, enemy, timerId }) {
    clearTimeout(timerId);
    gameOver = true;
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
    document.querySelector("#reloadButton").style.display = "flex";
    document.querySelector("#SelectButton").style.display = "flex";
    document.querySelector("#menuButton").style.display = "flex";
}
document.querySelector("#reloadButton").addEventListener("click", () => {
    location.reload(); // Recargar la página
});
document.querySelector("#SelectButton").addEventListener("click", () => {
    window.location.href = "select.html";
});
document.querySelector("#menuButton").addEventListener("click", () => {
    window.location.href = "index.html";
});
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
    colisionConPlataforma(player);
    colisionConPlataforma(enemy); 
    //movimiento jugador 1
    
    if (keys.a.pressed && player.lastKey === 'a' && !player.isLowering) {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd' && !player.isLowering) {
        player.velocity.x = 5;
        player.switchSprite('run');
    }else{
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0 && !player.isOnGround) {
        player.switchSprite('fall');
    } 

    //movimeinto enemigo
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && !enemy.isLowering) {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && !enemy.isLowering) {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }else{  
        enemy.switchSprite('idle');
    }
    
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0 && !enemy.isOnGround) {
        enemy.switchSprite('fall');
    } 

    if (colisionRectangulo({ rectangle1: player, rectangle2: enemy }) && player.isAttacking && player.currentFrame === player.sprites.attack1.frames/2) {
        enemy.switchSprite('takeHit');
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#vida2').style.width = enemy.health + '%';
    }
    //cuando el j1 falla
    if(player.isAttacking && player.currentFrame === 2) {
        player.isAttacking = false;
    }

    if (colisionRectangulo({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking && enemy.currentFrame === 2) {
        player.switchSprite('takeHit');
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#vida1').style.width = player.health + '%';
    }
    //cuando el j2 falla
    if(enemy.isAttacking && enemy.currentFrame === 2) {
        enemy.isAttacking = false;
    }


    //terminar juego por vida
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
    
}
resizeCanvasAndPlatforms();
animate();

window.addEventListener("keydown", (event) => {
    if (gameOver) return;
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
    if (gameOver) return;
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
