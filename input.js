
export class InputHandler{
    constructor(game){
        this.game=game
        this.keys = []
        window.addEventListener('keydown', (evt)=>{
      
            if( (evt.key === 'ArrowDown'||
                evt.key === 'ArrowUp'||
                evt.key === 'ArrowLeft' ||
                evt.key === 'ArrowRight'||
                evt.key === '1')
                && this.keys.indexOf(evt.key)=== -1
             ){
                this.keys.push(evt.key);  
            }else if (evt.key === 'd'){
                this.game.debug = !this.game.debug
            }
            else if (evt.key === 'Enter' && this.game.gameOver){
               this.game.restartGame()
            }
            
        })
        window.addEventListener('keyup', (evt)=>{
            if( evt.key === 'ArrowDown'||
                evt.key === 'ArrowUp'||
                evt.key === 'ArrowLeft'||
                evt.key === 'ArrowRight'||
                evt.key === '1'
            ){
                this.keys.splice(this.keys.indexOf(evt.key),1)
            }

        })
    }
    // restartGame(){
    //     this.game.player.restart()
    //     this.game.score = 0
    //     this.game.lives = 3
    //     this.game.enemies=[]
    //     this.game.gameOver=false
    //    animate(0)
    // }

    
}


