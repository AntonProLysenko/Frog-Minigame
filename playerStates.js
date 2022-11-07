const states = {
    SITTING:0,
    RUNNING:1,
    JUMPING:2,
    FALLING:3,
    ATTACK:4,
    HIT:5
}

class State{
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING')
        this.player = player

    }
    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 5
        this.player.frameY = 2

    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING, 1)
        }else if (input. includes('ArrowUp')){
            this.player.setState(states.JUMPING, 0.5)
        }else if (input. includes('1')){
            this.player.setState(states.ATTACK, 1)
        }    
    }
}

export class Running extends State{
    constructor(player){
        super('RUNNING')
        this.player = player
    }

    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 7
        this.player.frameY = 0
    }

    handleInput(input){
        if(input.includes('ArrowDown')){//remove sitting, add fighting
            this.player.setState(states.SITTING, 0)
        }else if (input. includes('ArrowUp')){
            this.player.setState(states.JUMPING, 0.5)
        }else if (input. includes('1')){
            this.player.setState(states.ATTACK, 1)
        }  
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING')
        this.player = player
    }

    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 5
        this.player.frameY = 9

        //jumping vertical movement 
        if (this.player.onGround()){
            this.player.vy -=35
        }
    }

    handleInput(input){
        if(this.player.vy > this.player.weight){
            this.player.setState(states.FALLING, 0.5)
         } else if (input. includes('1')){
                this.player.setState(states.ATTACK, 1)
            }  

        
    }
}

export class Falling extends State{
    constructor(player){
        super('FALLING')
        this.player = player
    }

    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 5
        this.player.frameY = 1
    }

    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING, 1)
        }else if (input. includes('1')){
                this.player.setState(states.ATTACK, 1)
        }  
        
    }
}

export class Attack extends State{
    constructor(player){
        super('ATTACK')
        this.player = player
    }

    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 6
        this.player.frameY = 3
    }

    handleInput(input){
        if(!input.includes('1') && this.player.onGround()){
                this.player.setState(states.RUNNING, 1)
        }else if (!input.includes('1') && !this.player.onGround()){
            this.player.setState(states.FALLING, 1)
        }
    }
}

export class Hit extends State{
    constructor(player){
        super('HIT')
        this.player = player
    }

    enter(){
        this.player.frameX = 0
        this.player.maxFrame = 6//here and in if statement need frames of our hit animation
        this.player.frameY = 4

    }
    handleInput(input){
        if (this.player.frameX >= 5 && this.player.onGround()){
            this.player.setState(states.RUNNING, 1)
        }else if ( this.player.frameX >= 5 && !this.player.onGround()){
            this.player.setState(states.FALLING, 1)
        }
        
    }
}



