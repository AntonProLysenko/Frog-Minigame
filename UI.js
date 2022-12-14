export class UI{
    constructor(game){
        this.game = game
        this.livesImg = document.getElementById('lives')

     
    }
    draw(context){
        context.font = '40px Wallpoet'
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor

        //score
        context.fillText(`Score: ${this.game.score}`, 20, 50)
        //lives
        for(let i = 0 ; i < this.game.lives; i++){
            context.drawImage(this.livesImg,32*i+10, 75, 32,32)
        }
        //game over
        if (this.game.gameOver){
            context.fillText(`Game Over!` , this.game.width*0.5-200,this.game.height*0.25)
            context.fillText(`Your score:${this.game.score}`,this.game.width*0.5-220,(this.game.height+140)*0.25)
            context.fillText(`press ENTER` , this.game.width*0.5-210,(this.game.height+200)*0.5)
            context.fillText(`or` , this.game.width*0.5-100,(this.game.height+300)*0.5)
            context.fillText(`SWIPE LEFT` , this.game.width*0.5-200,(this.game.height+400)*0.5)
            context.fillText(`to Restart!` , this.game.width*0.5-190,(this.game.height+500)*0.5)
        }
    }
}