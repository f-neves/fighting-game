const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)  // 0,0 initial point is up left on the screen

const gravity = 1.2;

const shop = new Sprite({
    position: {
        x: 600,
        y: 161
    },
    imageSrc: './img/shop.png',
    scale: 2.5,
    framesMax: 6,
})

const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imageSrc: './img/background.png',
})

const player = new Fighter({
    width: 85,
    height: 150,
    position: {
        x: 100,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
        //player 1
    imageSrc: './img/wizard01/Idle.png',
    framesMax: 8, 
    scale: 2.5, 
    offset: {x:275, y:267},
    attackBox:{
        offset:{
            x: 70,
            y: -100
        },
        width: 230,
        height: 200,
    },
    sprites: {
        idle: {
            imageSrc: './img/wizard01/Idle.png',
            framesMax: 8, 
        },
        run: {
            imageSrc: './img/wizard01/Run.png',
            framesMax: 8, 
        },
        jump: {
            imageSrc: './img/wizard01/Jump.png',
            framesMax: 2, 
        },
        fall: {
            imageSrc: './img/wizard01/Fall.png',
            framesMax: 2, 
        },
        attack1: {
            imageSrc: './img/wizard01/Attack1.png',
            framesMax: 8, 
        },
        attack2: {
            imageSrc: './img/wizard01/Attack2.png',
            framesMax: 8, 
        },
        takeHit: {
            imageSrc: './img/wizard01/TakeHit.png',
            framesMax: 3, 
        },
        death: {
            imageSrc: './img/wizard01/Death.png',
            framesMax: 7, 
        },
    },


    // imageSrc: './img/samurai01/Idle.png',
    // framesMax: 8, 
    // scale: 2.5, 
    // offset: {x:215, y:157},
    // attackBox:{
    //     offset:{
    //         x: 0,
    //         y:0
    //     },
    //     width: 100,
    //     height: 20,
    // },
    // sprites: {
    //     idle: {
    //         imageSrc: './img/samurai01/Idle.png',
    //         framesMax: 8, 
    //     },
    //     run: {
    //         imageSrc: './img/samurai01/Run.png',
    //         framesMax: 8, 
    //     },
    //     jump: {
    //         imageSrc: './img/samurai01/Jump.png',
    //         framesMax: 2, 
    //     },
    //     fall: {
    //         imageSrc: './img/samurai01/Fall.png',
    //         framesMax: 2, 
    //     },
    //     attack1: {
    //         imageSrc: './img/samurai01/Attack1.png',
    //         framesMax: 8, 
    //     },
    //     attack2: {
    //         imageSrc: './img/samurai01/Attack2.png',
    //         framesMax: 8, 
    //     },
    // },
    
    // imageSrc: './img/martial01/Idle.png',
    // framesMax: 10, 
    // scale: 2.5, 
    // offset: {x:215, y:56},
    // attackBox:{
    //     offset:{
    //         x: 0,
    //         y:0
    //     },
    //     width: 100,
    //     height: 20,
    // },
    // sprites: {
    // idle: {
    //     imageSrc: './img/martial01/Idle.png',
    //     framesMax: 10, 
    // },
    // run: {
    //     imageSrc: './img/martial01/Run.png',
    //     framesMax: 8, 
    // },
    // jump: {
    //     imageSrc: './img/martial01/Jump.png',
    //     framesMax: 3, 
    // },
    // fall: {
    //     imageSrc: './img/martial01/Fall.png',
    //     framesMax: 2, 
    // },
    // attack1: {
    //     imageSrc: './img/martial01/Attack1.png',
    //     framesMax: 8, 
    // },
    // attack2: {
    //     imageSrc: './img/martial01/Attack2.png',
    //     framesMax: 8, 
    // },
    // },

})


const enemy = new Fighter({

    //martial artist
    width: 95,
    height: 150,
    position: {
        x: 600,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue',    
    imageSrc: './img/martial01/Idle.png',
    framesMax: 10, 
    scale: 2.5, 
    offset: {x:120, y:56},
    attackBox:{
        offset:{
            x: 25,
            y: -50
        },
        width: 170,
        height: 200,
    },
    sprites: {
    idle: {
        imageSrc: './img/martial01/Idle.png',
        framesMax: 10, 
    },
    run: {
        imageSrc: './img/martial01/Run.png',
        framesMax: 8, 
    },
    jump: {
        imageSrc: './img/martial01/Jump.png',
        framesMax: 3, 
    },
    fall: {
        imageSrc: './img/martial01/Fall.png',
        framesMax: 3, 
    },
    attack1: {
        imageSrc: './img/martial01/Attack1.png',
        framesMax: 7, 
    },
    attack2: {
        imageSrc: './img/martial01/Attack2.png',
        framesMax: 6, 
    },
    takeHit: {
        imageSrc: './img/martial01/TakeHit.png',
        framesMax: 3, 
    },
    death: {
        imageSrc: './img/martial01/Death.png',
        framesMax: 11, 
    },
},
})


console.log(player);

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
    j: {
        pressed: false
    },
    l: {
        pressed: false
    },
    i: {
        pressed: false
    },
}


function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )


}

decreaseTimer()

function animate () {
    window.requestAnimationFrame (animate)
    c.fillStyle = 'black'
    c.fillRect (0,0, canvas.width,canvas.height)
    background.update()
    shop.update()
    //produces a white layer to contrast the fighters with others elements
    c.fillStyle = 'rgba(255,255,255,0.2)'
    //the fourth number is the opacity level of the layer
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    
    //player movement left and right; 2 keys pressed at the same time
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -10
        player.switchSprite ('run')
    }   else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 10
        player.switchSprite ('run')
    }   else {
        player.switchSprite('idle')
    }
    // jump
    if (player.velocity.y < 0){
        player.switchSprite ('jump')
    } else if (player.velocity.y >0){
        player.switchSprite ('fall')
    }

    //enemy movement 
    if (keys.j.pressed && enemy.lastKey === 'j'){
        enemy.velocity.x = -10
        enemy.switchSprite ('run')
    } else if(keys.l.pressed && enemy.lastKey === 'l'){
        enemy.velocity.x = 10
        enemy.switchSprite ('run')
    }   else {
        enemy.switchSprite('idle')
    }

    // jump
    if (enemy.velocity.y < 0){
        enemy.switchSprite ('jump')
    } else if (enemy.velocity.y >0){
        enemy.switchSprite ('fall')
    }

    //detect collision & enemy take hit
    //player attack
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy})  
        && player.isAttacking 
        && player.framesCurrent === 4
        ){
            enemy.takeHit()
            player.isAttacking = false
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
    }

    // if player misses 
    if(player.isAttacking && player.framesCurrent === 4 ) {
        player.isAttacking = false
    }

    //enemy attack & player take hit
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    })  && enemy.isAttacking 
        && enemy.framesCurrent === 5
        ){
            player.takeHit()
            enemy.isAttacking = false
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
    }
    // if enemy misses
    if(enemy.isAttacking && enemy.framesCurrent === 5 ) {
        enemy.isAttacking = false
    }
    
    //end game based on health
    if(enemy.health<=0 || player.health <= 0){
        determineWinner({player,enemy, timerId})
    }
}

animate()

window.addEventListener('keydown',(event)=> {
    console.log(event.key)
    if (!player.dead){    
        switch(event.key){
            case 'd':
                keys.d.pressed = true  
                player.lastKey = 'd'          
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                keys.w.pressed = true
                player.velocity.y = -20
                break
            case 'e':
                player.attack()
                break
            }
        }
    if (!enemy.dead){
        switch(event.key){
            case 'l':
                keys.l.pressed = true  
                enemy.lastKey = 'l'
                break
            case 'j':
                keys.j.pressed = true  
                enemy.lastKey = 'j'
                break
            case 'i':
                keys.i.pressed = true 
                enemy.velocity.y = -20
                break
            case 'u':
                enemy.attack()
                break    
            }
        }
    console.log(event.key)
}
)
window.addEventListener('keyup',(event)=> {
    //player
        switch(event.key){
            case 'd':
                keys.d.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 'w':
                keys.w.pressed = false
                break
            }
        
    //enemy 
        switch(event.key){
            case 'l':
                keys.l.pressed = false  
                break
            case 'j':
                keys.j.pressed = false  
                break
            case 'i':
                keys.i.pressed = false
                break
            }
        
    console.log(event.key)

})









