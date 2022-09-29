
    // if (!this.lastDirection){
    //     a = this.framesCurrent*(this.image.width/this.framesMax)
    // } else a = (this.framesMax-this.framesCurrent-1)*(this.image.width/this.framesMax)
    

class Sprite {
    constructor({
        width,
        height,
        position, 
        imageSrc,
        scale = 1, 
        framesMax = 1, 
        offset = {x:0, y:0}}){
            this.position = position;
            // this.width = 50;
            this.width = width;
            this.height = height;
            this.image = new Image()
            this.image.src = imageSrc
            this.scale = scale
            this.framesMax = framesMax
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 7
            this.offset = offset
    }


    draw(){
        if (!this.lastDirection){
                c.drawImage(
                    this.image,
                    //crop image to motion effect
                    this.framesCurrent*(this.image.width/this.framesMax),
                    0, 
                    this.image.width/this.framesMax, 
                    this.image.height,
                    
                    this.position.x - this.offset.x, 
                    this.position.y - this.offset.y, 
                    (this.image.width/this.framesMax)* this.scale, 
                    this.image.height * this.scale,
                    )
            } else
            c.drawImage(
                this.image,
                //crop image to motion effect
                (this.framesMax-this.framesCurrent-1)*(this.image.width/this.framesMax),
                0, 
                this.image.width/this.framesMax, 
                this.image.height,
                
                this.position.x - this.offset.x, 
                this.position.y - this.offset.y, 
                (this.image.width/this.framesMax)* this.scale, 
                this.image.height * this.scale,
                )
            
    }

    animateFrame () {
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold===0)
        if(this.framesCurrent < this.framesMax-1){
            this.framesCurrent++
        } else {
            this.framesCurrent = 0
        }
    }


    update(){
        this.draw()
        this.animateFrame ()
    }
}


class Fighter extends Sprite {
    constructor({
        width,
        height,
        position, 
        velocity, 
        color = 'red',
        imageSrc,
        scale = 1, 
        framesMax = 1,
        offset = {x:0, y:0},
        sprites,
        attackBox = {
            offset:{},
            width: undefined,
            height: undefined,
        },
    })
    {
    super({
        position,
        imageSrc, 
        scale, 
        framesMax, 
        offset,
    })
    
        this.velocity = velocity;
        // this.width = 50;
        this.width = width;
        this.height = height;
        this.lastKey;
        this.attackBox ={
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7
        this.sprites = sprites
        this.dead = false
        // this.lastDirection = lastDirection
        
        for (const sprite in this.sprites){
            sprites[sprite].image = new Image ()
            sprites[sprite].image.src = sprites[sprite].imageSrc           
        }
    }
    
    update(){
        //attack box and hit box
        // c.fillStyle = 'rgba(255,0,0,0.2)';
        //     c.fillRect (
        //         this.position.x,
        //         this.position.y,
        //         this.width, 
        //         this.height,
        //     )   
        // // if(this.isAttacking === true)  {
        //     c.fillRect (
        //         this.attackBox.position.x,
        //         this.attackBox.position.y,
        //         this.attackBox.width, 
        //         this.attackBox.height,
        //         )
        // // }
            
        this.draw()
        
        if (!this.dead) this.animateFrame ()

        // //attack boxes
        // this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        // this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        //gravity function
        if (this.position.y + this.height +this.velocity.y >= canvas.height-ground){
            this.velocity.y = 0
            this.position.y = canvas.height - ground - this.height
        }   else {
            this.velocity.y += gravity
        }   
        //left barrier
        if(this.position.x <= 0){
            this.position.x = 0;
        }
        //right barrier
        if(this.position.x + this.width >=canvas.width){
            this.position.x = canvas.width - this.width;
        }
        //top barrier
        //if(this.position.y <= 0) this.position.y = 0
        }
    
    attack(){

       //attack boxes
    //    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    //    this.attackBox.position.y = this.position.y + this.attackBox.offset.y


        if (!this.lastDirection){
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y
            this.switchSprite('attack1')
        } else {
            this.attackBox.position.x = 
            this.position.x - this.attackBox.width + (this.width - this.attackBox.offset.x);
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
            this.switchSprite('attack1Left')

        }



        this.isAttacking = true
        setTimeout(()=> {
            this.isAttacking = false
        }, 3000)
    }
    // attack(){
    //     this.switchSprite('attack1')
    //     this.isAttacking = true
    //     setTimeout(()=> {
    //         this.isAttacking = false
    //     }, 3000)
    // }
    
    takeHit(){
        this.health -=20
        // if(this.health <= 0){
        //     this.health = 0
        //     this.switchSprite('death')
        // } else this.switchSprite('takeHit')
        
        if (!this.lastDirection){
            if (this.health <= 0){
                this.health = 0
                this.switchSprite('death')
            } else this.switchSprite('takeHit')
            }   else {
            if (this.health <= 0){
                this.health = 0
                this.switchSprite('deathLeft')
                } else this.switchSprite('takeHitLeft')
            }
    }




    switchSprite (sprite){

        if (this.image === this.sprites.death.image || this.image === this.sprites.deathLeft.image){
            if (this.framesCurrent === this. sprites.death.framesMax-1)
                this.dead = true
            return
        }
        
        //overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image 
            && this.framesCurrent < this.sprites.attack1.framesMax -1
            ||
            this.image === this.sprites.attack1Left.image 
            && this.framesCurrent < this.sprites.attack1Left.framesMax -1) 
            return
            
        //override when fighter gets hit
        if (this.image === this.sprites.takeHit.image 
            && this.framesCurrent < this.sprites.takeHit.framesMax-1
            ||
            this.image === this.sprites.takeHitLeft.image 
            && this.framesCurrent < this.sprites.takeHitLeft.framesMax-1) 
            return
                
                
        // if (this.image === this.sprites.death.image){
        //     if (this.framesCurrent === this. sprites.death.framesMax-1)
        //         this.dead = true
        //     return
        // }
        // if (this.image === this.sprites.attack1Left.image 
        //     && this.framesCurrent < this.sprites.attack1Left.framesMax -1) 
        //     return
                

        switch (sprite){
        case 'idle':
            if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                //this.framesCurrent = 0
            } 
            break;            
        case 'run':
            if(this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                //this.framesCurrent = 0
            }
            break;
        case 'jump':
            if(this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'fall':
            if(this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'attack1':
            if(this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
            break;
            }
        case 'takeHit':
            if(this.image !== this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'death':
            if(this.image !== this.sprites.death.image) {
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'idleLeft':
            if(this.image !== this.sprites.idleLeft.image){
                this.image = this.sprites.idleLeft.image
                this.framesMax = this.sprites.idleLeft.framesMax
                //this.framesCurrent = 0
            } 
            break;            
        case 'runLeft':
            if(this.image !== this.sprites.runLeft.image) {
                this.image = this.sprites.runLeft.image
                this.framesMax = this.sprites.runLeft.framesMax
                //this.framesCurrent = 0
            }
            break;
        case 'jumpLeft':
            if(this.image !== this.sprites.jumpLeft.image) {
                this.image = this.sprites.jumpLeft.image
                this.framesMax = this.sprites.jumpLeft.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'fallLeft':
            if(this.image !== this.sprites.fallLeft.image) {
                this.image = this.sprites.fallLeft.image
                this.framesMax = this.sprites.fallLeft.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'attack1Left':
            if(this.image !== this.sprites.attack1Left.image) {
                this.image = this.sprites.attack1Left.image
                this.framesMax = this.sprites.attack1Left.framesMax
                this.framesCurrent = 0
            break;
            }
        case 'takeHitLeft':
            if(this.image !== this.sprites.takeHitLeft.image) {
                this.image = this.sprites.takeHitLeft.image
                this.framesMax = this.sprites.takeHitLeft.framesMax
                this.framesCurrent = 0
            }
            break;
        case 'deathLeft':
            if(this.image !== this.sprites.deathLeft.image) {
                this.image = this.sprites.deathLeft.image
                this.framesMax = this.sprites.deathLeft.framesMax
                this.framesCurrent = 0
            }
            break;

        }
    }
}