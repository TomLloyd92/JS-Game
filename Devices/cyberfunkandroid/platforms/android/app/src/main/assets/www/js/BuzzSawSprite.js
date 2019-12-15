class BuzzSawSprite extends Sprite
{
    constructor(context, imageOptions, fps)
    {
        super(context, imageOptions, fps)

        //Counter
        this.count = 1;
        this.angle = 10;
    }

    update()
    {
        {
           this.ctx.save(); 
           //this.ctx.translate(this.posX + this.sourceWidth/2, this.posY + this.sourceHeight / 2);
            this.ctx.rotate(this.angle * 3.14 / 180);
            this.ctx.drawImage(this.image,
                this.sourceWidth * this.frameIndexX,  //Source image X
                this.offsetY, //Source image Y
                this.sourceWidth, //Source Width X
                this.sourceHeight, //Source Height Y
                this.posX, //Position X
                this.posY, //Position Y
                this.occupiedCanvasX, //Canavas X
                this.occupiedCanvasY); //Canvas Y
                
       }
       this.ctx.restore(); 
            
            /*
            this.ctx.drawImage(
                 this.image,
                 this.posX, 
                 this.posY, 
                 this.sourceWidth, 
                 this.sourceHeight,
                 -this.sourceWidth / 2, 
                 -this.sourceHeight /2, 
                 this.occupiedCanvasX, 
                 this.occupiedCanvasY);

            this.ctx.restore(); 
        }*/
    }

    draw()
    {    


        



    }

 


}