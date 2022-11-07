class Enemy{
    constructor(){
        this.frameX = 0
        this.frameY = 0
        this.fps = 10
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0 
        this.markedForDeletion = false
        this.sizeMagnifier = 2
        
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX
        this.y += this.speedY
        //setting animation to our fps
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0
            if (this.frameX<this.maxFrame){
                this.frameX++
            }else{
                this.frameX = 0 
            }

        }else{
            this.frameTimer+= deltaTime
        }
        //check if enemies are out of screen
        if(this.x< 0){
            this.markedForDeletion=true
        }

        
    }
    draw(context){
        if(this.game.debug ===true){
            context.strokeRect(this.x,this.y,this.sizeMagnifier*this.width,this.sizeMagnifier*this.height)
        }
         context.drawImage(this.image,this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.sizeMagnifier*this.width, this.sizeMagnifier*this.height)
        // this.lvlUp()
    }
    
    // lvlUp(){
    //     if (this.game.score>=1&& this.x < this.game.width){
    //         this.speedX++
    //     }
   // }
}

export class BatEnemy extends Enemy{
    constructor(game){
        super()
        this.game = game
        this.width = 32//size of the single frame on the sprite sheet
        this.height = 32
        this.x =this.game.width//starting position for the enemy
        this.y = Math.random()*(this.game.height-this.game.height/2)
        this.speedX = Math.random()*6// horizontal speed 
        this.speedY=0
        this.maxFrame = 5
        this.image = document.getElementById('enemy_bat')

        this.angle = 0
        this.va = Math.random()* 0.2

    }
    update(deltaTime){
        //wavy moovement
        super.update(deltaTime);
        this.angle+=this.va
        this.y+=Math.sin(this.angle)

    }
    

}



export class BirdEnemy extends Enemy{
    constructor(game){
        super()
        this.game = game
        this.width = 48
        this.height = 48
        this.x =this.game.width
        this.y = Math.random()*(this.game.height - this.game.height/2)
        this.speedX = Math.random()*4
        this.speedY=0
        this.maxFrame = 3
        this.image = document.getElementById('enemy_bird')

        this.angle = 0
        this.va = Math.random()* 0.2

    }
    update(deltaTime){
        //wavy moovement
        super.update(deltaTime);
        this.angle+=this.va
        this.y+=Math.sin(this.angle)


    }

}






export class SnakeEnemy extends Enemy{
    constructor(game){
        super()

        this.game = game
        this.width = 48//size of the single frame on the sprite sheet
        this.height = 48
        this.x =this.game.width//starting position for the enemy
        this.y = this.game.height - this.sizeMagnifier*this.height-this.game.groundMargin
        this.speedX = Math.random()*3//speed of the enemy horizontaly
        this.speedY=0
        this.maxFrame = 3
        this.image = document.getElementById('enemy_snake')



    }

}
export class WormEnemy extends Enemy{
    constructor(game){
        super()

        this.game = game
        this.width = 72//size of the single frame on the sprite sheet
        this.height = 72
        this.x =this.game.width//starting position for the enemy
        this.y = this.game.height - this.sizeMagnifier*this.height-this.game.groundMargin
        this.speedX = Math.random()*6//speed of the enemy horizontaly
        this.speedY=0
        this.maxFrame = 3
        this.image = document.getElementById('enemy_worm')



    }

}