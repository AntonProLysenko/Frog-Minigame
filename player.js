import{ Sitting, Running, Jumping, Falling, Attack, Hit }from './playerStates.js'
import { CollisionAnimation } from './collisionAnimation.js'
export class Player{
    constructor(game){
        this.game = game
        this.width = 96
        this.height = 96
        this.x = 0
        this.y= this.game.height - this.height-this.game.groundMargin
        this.image = document.getElementById('player')
        this.speed = 0
        this.maxSpeed = 0.5//for horiz speed
        this.vy =0 //using as a vertical speed
        this.weight = 1
        this.frameX=0
        this.frameY=0
        this.maxFrame
        this.fps = 10
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.states=[new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Attack(this), new Hit(this)]
        this.currentState = this.states[0]
        this.currentState.enter()
        
    }
    restart(){
        this.x = 0 
        this.y= this.game.height - this.height-this.game.groundMargin
        this.frameY=0
       

    }

    update(input, deltaTime){
        this.checkCollisions()
        this.currentState.handleInput(input);
        
        //horizontal movement
        this.x+= this.speed
       if (input.includes('ArrowRight')){
        this.speed = this.maxSpeed
       }else if (input.includes('ArrowLeft')){
        this.speed = - this.maxSpeed
       }else{
        this.speed = 0
       }
       //preventing movement outside the field
       if(this.x < 0){
        this.x=0
       }
       if (this.x> this.game.width - this.width){
        this.x = this.game.width - this.width
       }
       

       //vertical movement 
       
    //    if (input.includes('ArrowUp')&& this.onGround()){
    //     this.vy -= 20
    //    }

       this.y += this.vy 

       if (!this.onGround()){
        this.vy+=this.weight
       }else{
        this.vy = 0
       }

       //sprite animation 

        //need different framex+3 for attac animation (y=3)
        if (this.frameY === 3 || this.frameY === 7){
            if (this.frameTimer > this.frameInterval){//slowing down sprite animation by setting it's personal fps(whiout this statement it is 60 fps)
                this.frameTimer = 0
                if(this.frameX<this.maxFrame){
                    this.frameX+=3
                }else{
                    this.frameX = 0
                    this.frameY = 0
                }
           }else {
            this.frameTimer += deltaTime
           }

        }else{
            
            if (this.frameTimer > this.frameInterval){//slowing down sprite animation by setting it's personal fps(whiout this statement it is 60 fps)
            this.frameTimer = 0
            if(this.frameX<this.maxFrame){
                this.frameX++
            }else{
                this.frameX = 0
                // this.frameY = 2

            }
       }else {
        this.frameTimer += deltaTime
       }}

       


    }
    draw(context){
       

        if (this.frameY === 3 || this.frameY === 7 ){//different size of frog when Y=2(attaking animation) 
            let playerAttckWidth = 3*this.width
            if (this.game.debug){
                context.strokeRect(this.x,this.y,3*this.width,this.height)
            }
            context.drawImage(this.image, this.frameX*this.width, this.frameY*this.height,3*this.width,this.height, this.x, this.y, playerAttckWidth, this.height)
            
        }else{
            if (this.game.debug){
                context.strokeRect(this.x,this.y,this.width,this.height)
            }
            context.drawImage(this.image, this.frameX*this.width, this.frameY*this.height,this.width,this.height, this.x, this.y, this.width, this.height)

        }
    }

    onGround(){
        return this.y >= this.game.height - this.height -this.game.groundMargin
    }
    setState(state, speed){
        this.currentState = this.states[state]
        this.game.speed =  this.game.maxSpeed*speed
        this.currentState.enter()
    }
    checkCollisions(){
        this.game.enemies.forEach((enemy) => {
            if(this.currentState === this.states[4] ){
                if(enemy.x<this.x+ 3*this.width&&
                    enemy.x+enemy.width>this.x&&
                    enemy.y<this.y+this.height&&
                    enemy.y+enemy.height>this.y
                    ){
                        enemy.markedForDeletion = true
                        this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width/2, enemy.y+enemy.height/2))
                        this.game.score++

                        // this.game.enemies.forEach(enemy=>{//not working
                            
                        //     enemy.speedX+=0.1
                        // })
                    }

                
            }else{
                if(enemy.x<this.x+this.width&&
                    enemy.x+enemy.width>this.x&&
                    enemy.y<this.y+this.height&&
                    enemy.y+enemy.height>this.y
                    ){
                        this.game.frogSound.play()
                        this.setState(5,0)

                        enemy.markedForDeletion = true
                        // this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width/2, enemy.y+enemy.height/2))
                        

                        this.game.lives--
                        if(this.game.lives<=0){
                            this.game.gameOver=true
                        }
                        
    
                }

            }
          
        });
    }
}