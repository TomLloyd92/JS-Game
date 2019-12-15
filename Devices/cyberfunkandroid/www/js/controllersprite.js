class ControllerSprite extends Sprite
{
    constructor(context, imageOptions, fps)
    {
        super(context, imageOptions, fps)

        //Counter
        this.count = 0;
    }


    Animation()
    {
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
}