class LevelSelect extends Phaser.Scene{
    constructor(){
        super('levelselect');
    }

    create(){
        this.scene.stop('options')
        const w = this.scale.width;
        const h = this.scale.height;

        //background
        this.add.rectangle(w / 2, h / 2, w, h, 0x160d2e, 0.9)
            .setInteractive();

        //starry background
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

        this.closeButton = this.add.text(w - 120, 50, 'X', {
            fontSize: '72px',
            color: '#f62f2f'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.stop('levelselect');
        });

        //Title text Levels
        this.add.text(w / 2, 200, 'LEVEL SELECT', {
            font: "75px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //level 1
        this.add.text(w / 2, h / 2 - 150, 'Level 1', {
            font: "70px Pixelify Sans",
            color: '#0bdce0',
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if(window.levelCompleted[1].completed){
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {this.scene.start('level1')});
            };
        });
        //level 2
        this.add.text(w / 2, h / 2, 'Level 2', {
            font: "70px Pixelify Sans",
            color: '#0bdce0',
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if(window.levelCompleted[2].completed){
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {this.scene.start('level2')});
            };
        });

        //level 3
        this.add.text(w / 2, h / 2 + 150, 'Level 3', {
            font: "70px Pixelify Sans",
            color: '#0bdce0',
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if(window.levelCompleted[3].completed){
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {this.scene.start('level3')});
            };
        });


    }
}