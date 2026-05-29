class mainMenu extends Phaser.Scene {
    constructor() {
        super ('mainmenu')
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('background', 'main_menu.png')
        this.load.image('menuicon', 'titleLogo.png')  //<- change alien rice to menu icon
        this.load.image('play', 'placeholder_play.png') // <- change placeholder play to actual play button
        this.load.image('options', 'placeholder_options.png') // <- change playholder options to actual options button
        this.load.image('quit', 'placeholder_quit.png') // <- change placeholder quit to actual quit button

        this.load.path = 'assets/audio/';
        this.load.audio('backgroundMusic', 'alien-invasion.mp3');
        this.load.audio('button', 'button.mp3');
    }

    create() {
        //launch the persistent audio scene as an overlay on top of this scene
        //the audio scene runs independently and persists even when this scene tranistions to another
        if(!this.scene.isActive('audio')){
            this.scene.launch('audio');
        };
        if(!this.sound.get('backgroundMusic')){
            this.sound.add('backgroundMusic', {loop: true, volume: 0.3}).play();
        };

        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(2);
        
        let menuIcon = this.add.image(1920 / 2 - 60, 300, 'menuicon');
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
                this.sound.play('button');
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('level1'));
            });
            playButton.on("pointerout", ()  => this.getSmaller(playButton))
        let optionsButton = this.add.image(1920 / 2, 750, 'options').setScale(0.5).setOrigin(0.5);
            optionsButton.setInteractive({useHandCursor: true});
            optionsButton.on("pointerover", () => this.getBigger(optionsButton));
            optionsButton.on("pointerdown", () => {
                this.sound.play('button');
            });
            optionsButton.on("pointerout", () => this.getSmaller(optionsButton));
        let quitButton = this.add.image(1920 / 2, 900, 'quit').setScale(0.5).setOrigin(0.5);
            quitButton.setInteractive({useHandCursor: true});
            quitButton.on("pointerover", () => this.getBigger(quitButton));
            quitButton.on("pointerdown", () => {
                this.sound.play('button');
                window.close();
            })
            quitButton.on("pointerout", () => this.getSmaller(quitButton));

        let creditsButton = this.add.rectangle(1920 / 2, 1010, 100, 40, 0xffffff).setScale(2).setOrigin(0.5);
            creditsButton.setInteractive({useHandCursor: true});
            creditsButton.on("pointerover", () => this.getBigger(creditsButton));
            creditsButton.on("pointerdown", () => {
                this.sound.play('button');
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('credits'));
            });
            creditsButton.on("pointerout", () => this.getSmaller(creditsButton));
        let creditsText = this.add.text(1920 / 2, 1010, "Credits", {
            fontSize: '32px',
            fill: '#000000'
        }).setOrigin(0.5);


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