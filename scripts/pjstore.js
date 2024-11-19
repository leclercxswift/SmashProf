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
        },
        jump: {
            imageSrc: "../assets/player1/Jump.png",
            frames: 2
        },
        fall: {
            imageSrc: "../assets/player1/Fall.png",
            frames: 2
        },
        attack1: {
            imageSrc: "../assets/player1/Attack1.png",
            frames: 6
        },
        takeHit: {
            imageSrc: "../assets/player1/Take Hit.png",
            frames: 4
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
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
        x: 215,
        y: 167
    },
    imageSrc: "../assets/enemy/Idle.png",
    frames:4,
    scale:2.5,
    sprites: {
        idle: {
            imageSrc: "../assets/enemy/Idle.png",
            frames: 4
        },
        run: {
            imageSrc: "../assets/enemy/Run.png",
            frames: 8
        },
        jump: {
            imageSrc: "../assets/enemy/Jump.png",
            frames: 2
        },
        fall: {
            imageSrc: "../assets/enemy/Fall.png",
            frames: 2
        },
        attack1: {
            imageSrc: "../assets/enemy/Attack1.png",
            frames: 4
        },
        takeHit: {
            imageSrc: "../assets/enemy/Take hit.png",
            frames: 3
        }
        
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
});

