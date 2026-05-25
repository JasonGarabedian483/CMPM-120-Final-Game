class mainMenu extends Phaser.Scene {
    constructor() {
        super ('mainmenu')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('background', 'main_menu.png')
        this.load.image('menuicon', 'alien rice.png')  //<- change alien rice to menu icon
        this.load.image('play', 'placeholder play.png') // <- change placeholder play to actual play button
        this.load.image('options', 'placeholder options.png') // <- change playholder options to actual options button
        this.load.image('quit', 'placeholder quit.png') // <- change placeholder quit to actual quit button
    }

    create() {
        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(2);
        
        let menuIcon = this.add.image(1920 / 2, 200, 'menuicon').setOrigin(0.5);
            menuIcon.setScale(1.5);
            this.tweens.add({
                targets: menuIcon,
                scaleX: 1.75,
                scaleY: 1.75,
                duration: 2000,
                ease: 'Power1',
                yoyo: true,
                loop: -1
            })

        let playButton = this.add.image(1920 / 2, 600, 'play').setScale(.5).setOrigin(.5);
            playButton.setInteractive({useHandCursor: true});
            playButton.on("pointerover", () => this.getBigger(playButton));
            playButton.on("pointerdown", () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('logoscene'));
            });
            playButton.on("pointerout", ()  => this.getSmaller(playButton))
        let optionsButton = this.add.image(1920 / 2, 750, 'options').setScale(0.5).setOrigin(0.5);
            optionsButton.setInteractive({useHandCursor: true});
            optionsButton.on("pointerover", () => this.getBigger(optionsButton));
            optionsButton.on("pointerdown", () => {
                
            });
            optionsButton.on("pointerout", () => this.getSmaller(optionsButton));
        let quitButton = this.add.image(1920 / 2, 900, 'quit').setScale(0.5).setOrigin(0.5);
            quitButton.setInteractive({useHandCursor: true});
            quitButton.on("pointerover", () => this.getBigger(quitButton));
            quitButton.on("pointerdown", () => {

            })
            quitButton.on("pointerout", () => this.getSmaller(quitButton));

    }

    getBigger(target) {
        this.tweens.add({
            targets: target,
            scaleX: target.scaleX + 0.1,
            scaleY: target.scaleY + 0.1,
            duration: 100,
            ease: 'Power1'
        });
    }
    getSmaller(target) {
        this.tweens.add({
            targets: target,
            scaleX: target.scaleX - 0.1,
            scaleY: target.scaleY - 0.1,
            duration: 100,
            ease: 'Power1'
        });
    }

    update() {

    }
}