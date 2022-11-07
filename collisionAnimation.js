export class CollisionAnimation{
    constructor(game, x ,y){
        this.game=game
        this.image = document.getElementById('blood')
        this.splashSound = new Audio ()
        this.splashSound.src = "./assets/splash.wav"
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.sizeModifier = Math.random()+0.5
        this.width = this.spriteWidth * this.sizeModifier//randomize the size of destroy animation
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width*0.25//center the animation 
        this.y = y-this.height*0.25
        this.frameX =0
        this.maxFrame = 11
        this.markedForDeletion = false



    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.spriteWidth, 0, this.spriteWidth,this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update(){
        if (this.frameX === 1 ){
            this.splashSound.play()
        }
        this.x -= this.game.speed
        this.frameX++
    }
}