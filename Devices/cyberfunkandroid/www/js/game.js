class Game
{
    constructor()
    {
        
        // Canvas
        var canvas = document.createElement("canvas");
        // set display size as css pixels
     
        canvas.id = "mycanvas";

        // var scale = window.devicePixelRatio;

        canvas.width = window.innerWidth;
        canvas.height =  window.innerHeight;
        document.body.appendChild(canvas);

        // CHANGE ASPECT RATIO FOR MOBILE 
        //const DEFAULT_HEIGHT = 768;
      // const DEFAULT_WIDTH = (window.innerWidth / window.innerHeight);
        //canvas.width = DEFAULT_WIDTH;
     //   canvas.height = DEFAULT_HEIGHT;
        
        this.ctx =  canvas.getContext("2d");
	  
        this.canvas = document.getElementById('mycanvas');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // NEED DELTA TIME FOR MOVEMENT 
      
        this.previousTime = 0;
        this.fps = 60,  // number of frames per second 
        this.framesThisSecond = 0,
        this.lastFpsUpdate = 0;

        this.level = 1;
        // is touch device true?
        // var touch =  is_touch_device(); 
        // console.log(touch);

        
        // Event listener prints out x and y coordinates of mouse click 
        //document.addEventListener("touchstart", () => this.onTouchStart(event));

        // Disable Scrolling
        //document.addEventListener('touchstart', function(e) {e.preventDefault();}, {passive: false}); 

        //Recursive Update
        this.boundRecursiveUpdate = () => this.update(this);
    }


    init()
    {
        //this listens for keydown events
        document.addEventListener("keydown", () => this.keyDownHandler(event));

        //Stop moving the screen
        window.addEventListener("keydown", e => {
            // Space and arrow keys
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);


        //Setting up level tiles
        this.imgTile = new Image();   
        this.imgTile.src = "img/maptiles.png"; 

        //Setting Up alien
        this.imgAlien = new Image();   
        this.imgAlien.src = "img/greenalienspritesheet.png"; 

        this.alienSprite = new PlayerSprite(this.ctx, {
            image: this.imgAlien,
            offsetX:0,
            offsetY:0,
            sourceWidth: 266,
            sourceHeight: 430,
            posX:100,
            posY:500,
            occupiedCanvasX:40,
            occupiedCanvasY:65
        }, 5);

        //Right button
        this.imgButton = new Image();
        this.imgButton.src = "img/neonarrows.png";
        this.buttonSpriteRight = new ControllerSprite(this.ctx, {
            image: this.imgButton,
            offsetX:0,
            offsetY:32 * 2,
            sourceWidth: 32,
            sourceHeight: 32,
            posX:200,
            posY:800,
            occupiedCanvasX:100,
            occupiedCanvasY:100
        }, 5);
        
        //Left Button
        this.buttonSpriteLeft = new ControllerSprite(this.ctx, {
            image: this.imgButton,
            offsetX:0,
            offsetY:32 * 1,
            sourceWidth: 32,
            sourceHeight: 32,
            posX:50,
            posY:800,
            occupiedCanvasX:100,
            occupiedCanvasY:100
        }, 5);

        // up button
        this.buttonSpriteUp = new ControllerSprite(this.ctx, {
            image: this.imgButton,
            offsetX:0,
            offsetY:32 * 3,
            sourceWidth: 32,
            sourceHeight: 32,
            posX:1700,
            posY:800,
            occupiedCanvasX:100,
            occupiedCanvasY:100
        }, 5);



        this.mapH = 11;
        this.mapW = 20;
        this.tileW = 100;
        this.tileH = 100;


        //Level 1
       if(this.level == 1)
       { 
           this.gameMap = [
            [0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0],
            [1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
            [1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
        ]
        }

        // Level 2
        else if(this.level == 2)
        {
            this.gameMap = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
            ]
        }
        // Level 3
        else if(this.level == 3)
        {
            this.gameMap = [
                [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
                [0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,2,0,0,1],
                [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
            ]
        }

    }


    update()
    {
        this.draw();
        var currentTime = Date.now();
        var deltaTime = (currentTime - this.previousTime);
        this.previousTime = currentTime; 
        


        this.alienSprite.update(deltaTime);  

        window.requestAnimationFrame(this.boundRecursiveUpdate);
    }

    draw()
    {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        
        for(var y = 0; y < this.mapH; y++)
        {
            for(var x = 0; x < this.mapW; x++)
            {
                switch(this.gameMap[y][x])
                {
                    case 0:

                        break;
                    case 1:
                        var tile = new Sprite(this.ctx, {
                            image: this.imgTile,
                            offsetX:0,
                            offsetY:35,
                            sourceWidth: 62,
                            sourceHeight: 60,
                            posX:this.tileW * x,
                            posY:this.tileH * y,
                            occupiedCanvasX:100,
                            occupiedCanvasY:100
                        }, 10);    
                        tile.draw();
                        this.collision(tile);
                        break;
                    case 2:
                        var tile = new Sprite(this.ctx, {
                            image: this.imgTile,
                            offsetX:100,
                            offsetY:100,
                            sourceWidth: 62,
                            sourceHeight: 60,
                            posX:this.tileW * x,
                            posY:this.tileH * y,
                            occupiedCanvasX:100,
                            occupiedCanvasY:100
                        }, 10);    
                        tile.draw();
                        this.basicCollision(tile, "winning" );
                        break;

                    case 3:
                        var tile = new Sprite(this.ctx, {
                            image: this.imgTile,
                            offsetX:100,
                            offsetY:200,
                            sourceWidth: 62,
                            sourceHeight: 60,
                            posX:this.tileW * x,
                            posY:this.tileH * y,
                            occupiedCanvasX:100,
                            occupiedCanvasY:100
                        }, 10);    
                        tile.draw();
                        this.basicCollision(tile, "death" );
                        break;
                    }
                }
            
            }
        this.alienSprite.draw();
        this.buttonSpriteRight.draw();
        this.buttonSpriteLeft.draw();
        this.buttonSpriteUp.draw();
       
        }

    //Controller
    keyDownHandler (e)
    {
        var that = this;
        
        if(e.keyCode === 39)
        {	
            this.alienSprite.moveRight();   
        }
        if(e.keyCode === 37)
        {	
            this.alienSprite.moveLeft();
        }
        if(e.keyCode === 32)
        {
            this.alienSprite.moveUp();
        }
    }

    collision(tile)
    {
        var w = 0.5 * (this.alienSprite.occupiedCanvasX + tile.occupiedCanvasX );
        var h = 0.5 * (this.alienSprite.occupiedCanvasY + tile.occupiedCanvasY);
        var dx = (this.alienSprite.posX + this.alienSprite.occupiedCanvasX/2)  - (tile.posX + tile.occupiedCanvasX/2);
        var dy =( this.alienSprite.posY + this.alienSprite.occupiedCanvasY/2) - (tile.posY + tile.occupiedCanvasY/2);
   
        if (Math.abs(dx) <= w && Math.abs(dy) <= h)
        {
            var wy = w * dy;
            var hx = h * dx;
        
            if (wy < hx)
            {
                if (wy > -hx)
                {
                    this.alienSprite.wallHitLeft(tile.posX);
                }
                else
                {
                    this.alienSprite.wallHitBottom(tile.posY);
                }
            }
            else
            {
                if (wy > -hx)
                {
                    this.alienSprite.wallHitUp(tile.posY);
                }
                else
                {
                    this.alienSprite.wallHitRight(tile.posX);
                }
            }
    
        }
    }
    else()
    {
        this.alienSprite.noCollision();
    }

    basicCollision(tile, checking)
    {
        if(this.alienSprite.posX + this.alienSprite.occupiedCanvasX < tile.posX)
        {
            //Not hit
        }
        else if(this.alienSprite.posX > tile.posX + tile.occupiedCanvasX)
        {
            //No Hit
        }
        else if(this.alienSprite.posY + this.alienSprite.occupiedCanvasY < tile.posY)
        {
            //Not Hit
        }
        else if(this.alienSprite.posY > tile.posY + tile.occupiedCanvasY)
        {
            //Not Hit
        }
        else
        {
            // win condition
            if(checking === "winning")
            {
                console.log("WINNER!");
                if(this.level == 1 )
                {
                    this.level = 2;
                    console.log(this.level);
                    this.init();
                
                }
               else if(this.level == 2)
                {
                    this.level = 3;
                    this.init();
                }
            }
            else if(checking === "death")
            {
                this.alienSprite.kill();
            }      
        }
    }
}