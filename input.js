
export class InputHandler{
    constructor(game){
        this.game=game
        this.keys = []
        this.touchY = ''
        this.touchX = ''
        this.touchTreshold = 100
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
               console.log(evt)
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


        window.addEventListener('touchstart',(evt)=>{
            this.touchY = evt.changedTouches[0].pageY
            this.touchX = evt.changedTouches[0].pageX
            console.log(this.touchY)

            console.log(this.touchX+" X");
            
        })

        window.addEventListener('touchmove',(evt)=>{
            
            const swipeYDistance = evt.changedTouches[0].pageY - this.touchY
            const swipeXDistance = evt.changedTouches[0].pageX - this.touchX

            if (swipeYDistance < -this.touchTreshold && this.keys.indexOf("ArrowUp") === -1){
                this.keys.push("ArrowUp")
            }
            else if (swipeYDistance > this.touchTreshold && this.keys.indexOf("ArrowDown") === -1){
                this.keys.push("ArrowDown")
                console.log(evt)
            }



            if (swipeXDistance < -this.touchTreshold && this.keys.indexOf("Enter") === -1&& this.game.gameOver){
                this.keys.push("Enter")
                console.log(evt)
                this.game.restartGame()
            }    else if (swipeXDistance > this.touchTreshold && this.keys.indexOf("1") === -1){
                this.keys.push("1")
                console.log(evt)
            }
           
        })
        window.addEventListener('touchend',(evt)=>{
            this.keys.splice(this.keys.indexOf('Enter'),1)
            this.keys.splice(this.keys.indexOf('1'),1)
            this.keys.splice(this.keys.indexOf('ArrowDown'),1)
            this.keys.splice(this.keys.indexOf('ArrowUp'),1)
        })
    }
    
}


