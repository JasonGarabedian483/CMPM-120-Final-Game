class loadingScene extends Phaser.Scene{
    constructor(){
        super('loading');
    }
    init(data){
        this.nextScene = data.next || 'mainmenu';
    }
    preload(){
        this.load.path = 'assets/';
        this.load.image('background', 'main_menu.png')
    }
    create(){  
        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(2).setTint(0x7f7f7f);
        
        let screenCenterX = this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.height / 2;

        // Rectangle frame: rectangle with no fill (centerX, centerY, width, height) border (width, color, opacity)
        this.add.rectangle(screenCenterX, screenCenterY + 50, 600, 50).setStrokeStyle(8, 0xffffff).setScale(2).setOrigin(0.5);
        
        // Loading Text
        this.textObject = this.add.text(
            screenCenterX - 340,     // x
            screenCenterY - 200,    // y
            "Loading...", // text
            { 
                font: "125px Courier", // size and font family
                color: "#ffffff", // text color
            } 
        );

        // Fade in Scene
        this.cameras.main.fadeIn(500);

        // Loading Bar
        this.tweens.chain({ //bar: rectangle(x, y, fade at x of bar, height, color).setOrigin(Left to Right)
            targets: this.add.rectangle(screenCenterX - 580, screenCenterY + 50, 0, 30, 0xffffff).setScale(2).setOrigin(0, 0.5), 
            tweens: [
                {
                    width: 580, 
                    alpha: 1, // Opacity: full
                    duration: 2000, //duration of action
                    delay: 200, // delay start
                    ease: 'Power2', //rate of change of animation
                },
                {
                    duration: 2000,
                    delay: 200, // delay start
                    ease: 'Sine.easeOut', //rate of change of animation
                }
            ],
            onComplete: () => {
                this.cameras.main.fadeOut(300);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start(this.nextScene);
                });
            },
        });
    }
    update(){}
}
