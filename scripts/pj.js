const j1Character = JSON.parse(localStorage.getItem("J1"));
const j2Character = JSON.parse(localStorage.getItem("J2"));
function createCharacter1(characterData) {
    
    switch (characterData.name) {
        case "David jajalol":
            return new FighterSprite({
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
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/David/Idle.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/David/Idle.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/David/Run.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/David/Jump.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/David/Attack1.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: 40,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "Pablo johelista":
            return new FighterSprite({
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
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Pablo/Idle.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Pablo/Idle.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Pablo/Run.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Pablo/Jump.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Pablo/Attack1.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: 40,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "Pedro Chau":
            return new FighterSprite({
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
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Pedro/Idle.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Pedro/Idle.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Pedro/Run.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Pedro/Jump.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Pedro/Attack1.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: 40,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "mauricio xd":
            return new FighterSprite({
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
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Mauricio/Idle.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Mauricio/Idle.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Mauricio/Run.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Mauricio/Jump.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Mauricio/Attack1.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: 40,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });
            case "rodrigo xd":
            return new FighterSprite({
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
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Rodrigo/Idle.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Rodrigo/Idle.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Rodrigo/Run.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Rodrigo/Jump.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Rodrigo/Attack1.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: 40,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        default:
            console.error("Personaje no encontrado");
            return null;
    }
}
function createCharacter2(characterData) {
    
    switch (characterData.name) {
        case "David jajalol":
            return new FighterSprite({
                position: {
                    x: 1230,
                    y: 620
                },
                velocity: {
                    x: 0,
                    y: 10
                },
                color: "red",
                offset: {
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/David/IdleLeft.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/David/IdleLeft.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/David/RunLeft.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/David/JumpLeft.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/David/Attack1Left.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: -20,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "Pablo johelista":
            return new FighterSprite({
                position: {
                    x: 1230,
                    y: 620
                },
                velocity: {
                    x: 0,
                    y: 10
                },
                color: "red",
                offset: {
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Pablo/IdleLeft.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Pablo/IdleLeft.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Pablo/RunLeft.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Pablo/JumpLeft.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Pablo/Attack1Left.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: -20,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "Pedro Chau":
            return new FighterSprite({
                position: {
                    x: 1230,
                    y: 620
                },
                velocity: {
                    x: 0,
                    y: 10
                },
                color: "red",
                offset: {
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Pedro/IdleLeft.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Pedro/IdleLeft.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Pedro/RunLeft.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Pedro/JumpLeft.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Pedro/Attack1Left.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: -20,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        case "mauricio xd":
            return new FighterSprite({
                position: {
                    x: 1230,
                    y: 620
                },
                velocity: {
                    x: 0,
                    y: 10
                },
                color: "red",
                offset: {
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Mauricio/IdleLeft.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Mauricio/IdleLeft.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Mauricio/RunLeft.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Mauricio/JumpLeft.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Mauricio/Attack1Left.png",
                        frames: 5
                    }
                },
                attackBox: {
                    offset: {
                        x: -20,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });
            case "rodrigo xd":
            return new FighterSprite({
                position: {
                    x: 1230,
                    y: 620
                },
                velocity: {
                    x: 0,
                    y: 10
                },
                color: "red",
                offset: {
                    x: 50,
                    y: -15
                },
                imageSrc: "../assets/Rodrigo/IdleLeft.png",
                frames:1,
                scale:1.5,
                sprites: {
                    idle: {
                        imageSrc: "../assets/Rodrigo/IdleLeft.png",
                        frames: 1
                    },
                    run: {
                        imageSrc: "../assets/Rodrigo/RunLeft.png",
                        frames: 9
                    },
                    jump: {
                        imageSrc: "../assets/Rodrigo/JumpLeft.png",
                        frames: 3
                    },
                    attack1: {
                        imageSrc: "../assets/Rodrigo/Attack1Left.png",
                        frames: 4
                    }
                },
                attackBox: {
                    offset: {
                        x: -20,
                        y: 50
                    },
                    width: 30,
                    height: 50
                }
            });

        default:
            console.error("Personaje no encontrado");
            return null;
    }
}
const player = createCharacter1(j1Character);
const enemy = createCharacter2(j2Character);

