class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    
    create() {
        this.scene.stop('timer');
        this.scene.stop('level1');
        this.scene.stop('level2');
        this.scene.stop('level3');
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
    
        this.cameras.main.fadeIn(1000, 0, 0, 0);
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

        this.add.text(centerX, centerY, "[Credits go here]", {
            fontSize: '32px',
            fill: '#ffffff'
        });

        //return to main menu
         let menuButton = this.add.text(centerX, centerY + 100, "Return to Main Menu", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        menuButton.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('mainmenu'));
        });
    }
}