class mainMenu extends Phaser.Scene {
    constructor() {
        super ('mainmenu')
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('background', 'newMenuBg.png')
        this.load.image('menuicon', 'titleLogo.png')  //<- change alien rice to menu icon
        this.load.image('play', 'placeholder_play.png') // <- change placeholder play to actual play button
        this.load.image('options', 'placeholder_options.png') // <- change playholder options to actual options button
        this.load.image('quit', 'placeholder_quit.png') // <- change placeholder quit to actual quit button
        this.load.image('press', 'buttonPress.png');
        this.load.image('base', 'buttonBase.png');
        this.load.image('rest', 'buttonRest.png');
        
        this.load.path = 'assets/audio/';
        this.load.audio('backgroundMusic', 'alien-invasion.mp3');
        this.load.audio('button', 'button.mp3');
    }

    create() {
        this.scene.stop('level1');
        this.scene.stop('level2');
        this.scene.stop('level3');
        //launch the persistent audio scene as an overlay on top of this scene
        //the audio scene runs independently and persists even when this scene tranistions to another
        if(!this.scene.isActive('audio')){
            this.scene.launch('audio');
        };
        if(!this.sound.get('backgroundMusic')){
           window.bgMusic = this.sound.add('backgroundMusic', {loop: true, volume: window.volume.music});
           window.bgMusic.play();
           window.bgMusic.mute = window.isMuted;
        };
        this.scene.stop('timer');

        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(4);
        
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
            });

        //Add buttons
        let playButton = new Button(this, 960, 490, 'Play', () => {
            this.sound.play('button');
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('level1')); 
        });

        let optionButton = new Button(this, 960, 650, 'Options', () => {
            this.sound.play('button');
            this.scene.launch('options');
        });

        let levelSelectButton = this.add.text(1200, 1080 / 2, 'LEVEL SELECT', {
            fontSize: '64px',
            color: '#1ea629'
        });
            levelSelectButton.setInteractive({useHandCursor: true});
            levelSelectButton.on('pointerdown', () => {
                this.scene.launch('levelselect');
            });
            
        let quitButton = new Button(this, 960, 810, 'Quit', () => {
            this.sound.play('button');
            window.close();
        });

        let creditsButton = new Button(this, 960, 970, 'Credits', () => {
            this.sound.play('button');
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('credits'));
        });

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

// Shape for button
class ButtonShape extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        // Shapes
        let baseButton = scene.add.image(0, 0, 'base').setScale(7, 4);
        let pressButton = scene.add.image(0, 0, 'press').setScale(7, 4);
        let restButton = scene.add.image(0, 0, 'rest').setScale(7, 4);

        // Container of shapes
        this.add([baseButton, pressButton, restButton]);

        // Add the container to the scene's display list
        scene.add.existing(this);
    }
}

//Interactive Button
class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, callback) {
        super(scene, x, y);

        // Interactive button        
        let pressButton = new ButtonShape(scene, 0, 0);

        // Add label text: text(x,y,text,size, color).orgin(x, y)
        let label = scene.add.text(0, -30, text, { 
            font: "40px Pixelify Sans",
            fill: '#1e3a8a' });

        // center text inside button
        label.setOrigin(0.5, 0.5);

        // Add components to the container
        this.add([pressButton, label]);
        
        // Make the whole container interactive // define interaction area
        this.setSize(174, 103);
        this.setInteractive();

        // Add events (Hover effects and click)
        this.on('pointerover', () => {this.setScale(1.2)});
        this.on('pointerout', () => {this.setScale(1)});
        this.on('pointerdown', () => {this.setScale(0.95)});
        this.on('pointerup', () => {
            callback();
        }); 

        // Add the container to the scene
        scene.add.existing(this);
    }
}
