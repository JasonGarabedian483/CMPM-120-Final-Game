class logoScene extends Phaser.Scene {
    constructor() {
        super ('logoscene')
    }
    
    preload() {
        this.load.path = 'assets/images/';
        this.load.image('titleLogo', 'titleLogo.png');

    }

    create() {
        //this.scene.launch('testingui');
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');

        //starry bacckground
        for(let i = 0; i < 100; i++) {
            let star = this.add.circle(
                Phaser.Math.Between(0, 1920),
                Phaser.Math.Between(0, 1080),
                Phaser.Math.Between(1, 3),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 1)
            );

            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: Phaser.Math.Between(500, 1500),
                yoyo: true,
                repeat: -1
            });
        }

        //fullscreen button
        const fullscreenButton = this.add.text(15, 1030, '⛶', {
            fontSize: '40px'
        });

        fullscreenButton.setInteractive();

        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        //logo starts invisible
        let logo = this.add.image(centerX - 60, centerY, 'titleLogo');
        logo.setScale(1).setOrigin(0.5);
        logo.setAlpha(0);

        this.cameras.main.fadeIn(1000);

        //logo animation -> scales up and fades in
        this.tweens.add({
            targets: logo,
            scale: 2,
            alpha: 1,
            duration: 4000,
            ease: 'Back.Out'
        });

        //pulsing effect for logo
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: logo,
                scale: 1.8,
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            this.cameras.main.shake(300, 0.002);
        });

        //end text
        let text = this.add.text(
            centerX,
            900,
            "PREPARE FOR LAUNCH...",
            {
                font: "48px Pixelify Sans",
                color: "#ffffff"
            }
        ).setOrigin(0.5).setAlpha(0);

        this.time.delayedCall(3500, () => {
            this.tweens.add({
                targets: text,
                alpha: 1,
                duration: 800
            });
        });

        // Rectangle frame: rectangle with no fill (centerX, centerY, width, height) border (width, color, opacity)
        this.add.rectangle(centerX - 10, centerY + 200, 600, 50).setStrokeStyle(8, 0xffffff);

        // Individual loading bars        
        let bars = [] // Array of loading bars

        //bar: rectangle(x, y, fade at x of bar, height, color).setOrigin(Left to Right)
        for(let i = 0; i < 10; i++){
            let bars = this.add.rectangle(centerX - 300 + i * 59, centerY + 200, 50, 30, 0xffffff)
            .setOrigin(0, 0.5) // set origin
            .setAlpha(0); // initalize rectangles as invisible

            // Load individual Bars
            this.tweens.add({
                targets: bars, 
                scaleX: 1, // make a loading bar visible horizontally
                scaleY: 1, // make a loading bar visible vertically
                alpha: 1, // Opacity: full
                duration: 100, //duration of action
                delay: i * 700, // delay in between bars
                ease: 'Power2', //rate of change of animation
            });
        }
       
        this.time.delayedCall(7000, () => {
             this.tweens.add({
                targets: text,
                alpha: 0,
                duration: 200
            });

            let tapText = this.add.text(
                centerX,
                900,
                "TAP TO TAKEOFF",
                {
                    font: "48px Pixelify Sans",
                }
            ).setOrigin(0.5).setAlpha(0);

            this.tweens.add({
                targets: tapText,
                alpha: 1,
                duration: 800
            });

            this.input.once('pointerdown', () => {
                this.cameras.main.fadeOut(1000);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('mainmenu');
                });
            });
        });
    }

}
