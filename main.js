import { Player } from "./player.js"
import { InputHandler } from "./input.js"
import { Background } from "./background.js"
import{BatEnemy,BirdEnemy,WormEnemy, SnakeEnemy} from "./enemies.js"
import{UI}from'./UI.js'



window.addEventListener('load',gameCreation)

 function gameCreation(){
    const canvas = this.document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1800
    canvas.height = 800

    class Game {
        constructor(width, height){

            this.mainThemeSound = new Audio()
            this.frogSound = new Audio()
            this.frogSound.src ='./assets/mutant_frog.ogg'
            this.mainThemeSound.src = './assets/happy_adveture.mp3'

            this.width = width
            this.height = height
            this.groundMargin = 50
            
            this.speed = 0
            this.maxSpeed = 5
            this.speedIncrease = 1 
            this.score = 0
            this.lives = 3

            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.UI = new UI(this)

            this.enemies=[]
            this.enemyTimer = 0 
            this.enemyInterval = 1500
            this.collisions = []

            this.debug = false
            this.gameOver=false
           
            
            this.fontColor = "black"
            
        }
         

        update(deltaTime){//delta time will be used for slowing down our sprite animation
            this.player.update(this.input.keys, deltaTime );
            
            this.background.update()
            this.mainThemeSound.playbackRate = 1.0
             this.mainThemeSound.play()

            //handle enemies
            if(this.enemyTimer>this.enemyInterval){
                this.addEnemy()
                this.enemyTimer=0
            }else{
                this.enemyTimer+=deltaTime
            }

            

            this.enemies.forEach((enemy)=>{
                enemy.update(deltaTime)
                if(enemy.markedForDeletion){
                    this.enemies.splice(this.enemies.indexOf(enemy), 1 )
                }

            })

            //handle colision sprites
            this.collisions.forEach((collision, index)=>{
                collision.update(deltaTime)
                if(collision.markedForDeletion){
                    this.collision.splice(index, 1 )
                }
            })

        }
        draw(context){
            this.background.draw(context)
            this.player.draw(context)

            this.enemies.forEach((enemy)=>{
                enemy.draw(context)
               
            })
            this.collisions.forEach((colision)=>{
                colision.draw(context)
            })
            this.UI.draw(context)
        }
        addEnemy(){   

            if(this.speed > 0 && Math.random()<0.5){
                this.enemies.push(new SnakeEnemy(this))    
            }else if (this.speed > 0 && Math.random()>0.5){
                this.enemies.push(new WormEnemy(this))
            }else if (Math.random()<0.5){
                this.enemies.push(new BatEnemy(this))
            }
            else if (Math.random()<0.5){
                this.enemies.push(new BirdEnemy(this))
            }

        }
        
        restartGame(){
            this.player.restart()
            this.score = 0
            this.lives = 3
            this.enemies=[]
            this.gameOver=false
            animate(0) 
        }
    }

   


    const startbutton = document.getElementById('start')
    const startScreen = document.getElementById('start-screen')
    startbutton.addEventListener('click', loadGame)
    
    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    
    function animate(timeStamp){
        //usualy deltatime is 16mlSecs(depends of the calculation power of the computer and refresh rate of the screen)
        const deltaTime = timeStamp - lastTime//gives the value for how long the current frame stayed than previos frame
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width,canvas.height)
        game.update(deltaTime)
        game.draw(ctx)

        if(!game.gameOver){
            requestAnimationFrame(animate)//generates timeStamp by default but we still need to call it 
        }
    }
    function loadGame(){
        canvas.style.display = "block"
        startScreen.style.display = 'none';
        
        console.log(game)
        animate(0)
    }
}





