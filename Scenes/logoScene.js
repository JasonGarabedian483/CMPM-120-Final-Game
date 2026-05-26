class logoScene extends Phaser.Scene {
    constructor() {
        super ('logoscene')
    }
    
    preload() {
        this.load.path = 'assets/images/';
        this.load.image('titleLogo', 'titleLogo.png');

    }

    create() {
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
                repeat: 2
            });

            // camera shake
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

       
        this.time.delayedCall(8000, () => {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('loadingscene'); 
            });
        });
    }

}