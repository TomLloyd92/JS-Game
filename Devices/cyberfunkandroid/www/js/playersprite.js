class PlayerSprite extends Sprite
{
    constructor(context, imageOptions, fps)
    {
        super(context, imageOptions, fps)

        //Counter
        this.count = 1;
        this.CURRENT_STATE = "idle";
        this.velX = 0;
        this.velY = 3;
        this.MAX_VEL = 5;
        this.movementPressed = false;
        this.jumping = false;
        this.gravity = 1;
        this.wallHitbottomchecker = false;
        this.accumulatedTime = 0;
    }
 
    update(dt)
    {    
        switch(this.CURRENT_STATE)
        { 
            case "idle":
                this.idleAnimation();
                break;
            case "running":
                this.runningAnimation();
                break;
            case "falling":
                this.fallingAnimation();
                break;
            case "jumping":
                this.jumpingAnimation();
                break;
            case "climbingRight":
                this.climbingAnimation();
                this.wallHangHandler(dt);
                break;
            case "climbingLeft":
                this.climbingAnimation();
                this.wallHangHandler(dt);
                break;
        }



        //Handle Movement
        this.velXHandler();
        this.velYHandler();
        this.idleChecker();
    }

    //Animation Handlers
    idleChecker()
    {
        if (this.velX > -0.5 && this.velX < 0.5)
        {
            if(this.CURRENT_STATE != "climbingRight" && this.CURRENT_STATE != "climbingLeft")
            {
                this.CURRENT_STATE = "idle";
                
            }
        }
    }

    idleAnimation()
    {
        this.count;
        this.offsetY = 0;
        this.sourceWidth = 266;
        this.sourceHeight = 430;


        if(this.frameIndexX >2)
        {
            this.frameIndexX = 0;
        }

        if(this.count >= this.delay)
        {
            if(this.frameIndexX < 2)
            {
                this.frameIndexX++
            }
            else
            {
                this.frameIndexX = 0;
    
            }
            this.count = 0;
        }
    }

    runningAnimation()
    {
        this.offsetY = 450;
        this.sourceWidth = 228;
  
        this.count++;
        
        if(this.count >= this.delay)
        {
            if(this.frameIndexX < 5)
            {
                this.frameIndexX++
            }
            else
            {
                this.frameIndexX = 0;  
    
            }
            
            this.count = 0;
        }
    }
    jumpingAnimation()
    {
        this.offsetY = 900
        this.sourceWidth = 292;
        this.sourceHeight = 440;
        this.count++;

        if(this.frameIndexX >2)
        {
            this.frameIndexX = 0;
        }

        
        if(this.count >= this.delay)
        {
            if(this.frameIndexX < 2)
            {
                this.frameIndexX++
            }
            else
            {
    
            }
            this.count = 0;
        }
    }
    fallingAnimation()
    {
        this.offsetY = 900;
        this.sourceWidth = 294;
        this.sourceHeight = 440;
        this.count++;
    
        this.frameIndexX = 2; 

        if(this.count >= this.delay)
        {
            if(this.frameIndexX === 2)
            {
                this.frameIndexX++
            }
            else
            {
                this.frameIndexX = 0;
    
            }
            this.count = 0; 
        }
        this.count = 0;
    }
    climbingAnimation()
    {
        this.sourceWidth = 228;    
        this.frameIndexX = 5;
        this.offsetY = 450;
    } 
    //END Animation Handlers

    //Movement Handlers
    moveUp()
    {
        if(this.CURRENT_STATE == "climbingRight")
        {
            this.CURRENT_STATE = "jumping";
            this.posX += -1;
            this.velX += -10;
            this.velY += -20;
            this.frameIndexX = 0; 
        }
        else if(this.CURRENT_STATE == "climbingLeft")
        {
            this.CURRENT_STATE = "jumping";
            this.posX += 1;
            this.velX += 10;
            this.velY += -20;
            this.frameIndexX = 0;
        }
        else
        {
            if(this.CURRENT_STATE != "jumping")
            {
                this.posY -= 1;
                this.CURRENT_STATE = "jumping";
                this.velY -= 25;
            }
            /*
            if(this.velX > 0)
            {
                this.velX += 2;
            }
            if(this.velX < 0)
            {
                this.velX -=2;
            }
            */
        }
    }
    moveRight()
    {
        this.CURRENT_STATE = "running";
        if(this.velX < this.MAX_VEL)
        {
            this.velX = this.velX + 1;
        }        
    }
    moveLeft()
    {
        this.CURRENT_STATE = "running";
        if(this.velX > -this.MAX_VEL)
        {
            this.velX = this.velX - 0.5;
        }        
    }
    
    velXHandler()
    {
        this.posX += this.velX;
        if(this.CURRENT_STATE == "running")
        {       
            this.velX = this.velX * 0.98;
        }
    }
    velYHandler()
    {
        this.posY += this.velY;

        if(this.CURRENT_STATE != "climbingRight" && this.CURRENT_STATE != "climbingLeft")
        {
            this.velY += this.gravity;         
        }
    }

    wallHangHandler(dt)
    {
        this.accumulatedTime += dt;

        if(this.accumulatedTime > 500)
        {
            this.velY += 0.1;
            console.log("GRAVITY START!");
        }
    }
    //END Movement Handlers


    //Collision Handlers
    wallHitRight(tileX)
    {
        if(this.CURRENT_STATE == "jumping")
        {
            this.CURRENT_STATE = "climbingRight";
            this.velY = 0;
        }
        this.velX = 0;
        this.posX = tileX - this.occupiedCanvasX - 1;
    }
    wallHitLeft(tileX)
    {
        if(this.CURRENT_STATE == "jumping")
        {
            this.CURRENT_STATE = "climbingLeft";
            this.velY = 0;
        }

        this.velX = 0;
        this.posX = tileX + 101;
    }
    wallHitUp(tileY)
    {
        this.velY = 0;
        this.posY = tileY + 101;
    }
    wallHitBottom(tileY)
    {
        this.velY = 0;
        this.posY = tileY - this.occupiedCanvasY - 1;
        this.accumulatedTime = 0;
        //this.CURRENT_STATE = "idle";

    }
    noCollision()
    {
        this.wallHitbottomchecker = false;
    }
    //END Collision Handlers

    kill()
    {
        this.velX = 0;
        this.velY = 0;
        this.posX = 100;
        this.posY = 100;
    }
}