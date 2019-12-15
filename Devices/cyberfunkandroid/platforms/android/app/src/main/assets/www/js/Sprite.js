class Sprite 
{
    constructor(context, imageOptions, fps)
    {
        //Image
        this.image = imageOptions.image;

        //Source Image
        this.offsetX = imageOptions.offsetX;
        this.offsetY = imageOptions.offsetY;

        //Source Width + Height
        this.sourceWidth = imageOptions.sourceWidth;
        this.sourceHeight = imageOptions.sourceHeight;

        //Position
        this.posX = imageOptions.posX;
        this.posY = imageOptions.posY;

        //Occupied canvas
        this.occupiedCanvasX = imageOptions.occupiedCanvasX;
        this.occupiedCanvasY = imageOptions.occupiedCanvasY;

        //Context
        this.ctx = context;

        //Fps
        this.delay = fps;

        this.frameIndexX = 0;
        this.ticksPerFrame = 1000 / this.fps; 
   }


   draw()
   {
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

   setPos(x,y)
   {
        this.posX = this.posX * x;
        this.posY = this.posY * y;
   }
}
