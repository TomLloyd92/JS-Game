class TileSprite extends Sprite
{
    constructor(context, imageOptions, fps)
    {
        super(context, imageOptions, fps);

        this.CURRENT_TILE = "grill"

    }

    update()
    {
         //IDLE
         switch(this.CURRENT_TILE)
         {
             case "grill":
            
                 break;
             case "wall":
            
                 break;
        }
    }

}