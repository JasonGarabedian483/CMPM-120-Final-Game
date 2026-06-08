class Options extends Phaser.Scene {
    constructor(){
        super('options')
    }
    preload(){
        this.load.path = 'assets/images/icons/';
        this.load.image('musicIcon', 'music.png');
        this.load.image('sfxIcon', 'volume.png');
        this.load.image('home', 'home.png');
        this.load.image('musicOff', 'music_off.png');
        this.load.image('sfxOff', 'volume_off.png');
    }

    create(){
        this.scene.stop('levelselect')
        const w = this.scale.width;
        const h = this.scale.height;

        this.music = window.volume.music;
        this.alarm = window.volume.alarm;
        this.ticker = window.volume.ticker;

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
            this.scene.stop('options');
        });

        //Title text options
        this.add.text(w / 2, 150, 'SETTINGS', {
            font: "70px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);


        //music volume slider
        this.musicBar = this.add.rectangle(w / 2 + 25, h / 2  - 150, 1000, 5, 0x0BE8F4);

        //music icon
        this.musicIcon =this.add.image(this.musicBar.x - 600, this.musicBar.y, 'musicIcon')
            .setScale(2);

        //music volume down button
        this.musicDownButton = this.add.text(this.musicBar.x - 550, this.musicBar.y - 17, '-', {
            fontSize: '42px',
            color: '#f7f2f2'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.music = Math.max(0, Math.round((this.music - 0.1) * 10) / 10);
            window.volume.music = this.music;
            this.sound.get('backgroundMusic').setVolume(this.music);
            this.musicBar.width = 1000 * this.music;
            this.updateIcons();
        });

        //music volume up button
        this.musicUpButton = this.add.text(this.musicBar.x + 530, this.musicBar.y - 19, '+', {
            fontSize: '42px',
            color: '#f6f8f6'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.music = Math.min(1, Math.round((this.music + 0.1) * 10) / 10);
            window.volume.music = this.music;
            this.sound.get('backgroundMusic').setVolume(this.music);
            this.musicBar.width = 1000 * this.music;
            this.updateIcons();
        });

         //sound/fx volume slider
        this.soundBar = this.add.rectangle(w / 2 + 25, h / 2  + 100, 1000, 5, 0xE637F6);

        //sound icon
        this.soundIcon = this.add.image(this.soundBar.x - 610, this.soundBar.y, 'sfxIcon')
            .setScale(2.5);

        //alarm and ticker sound volume
        this.SoundDownButton = this.add.text(this.soundBar.x - 550, this.soundBar.y - 17, '-', {
            fontSize: '42px',
            color: '#f7f2f2'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.alarm = Math.max(0, Math.round((this.alarm - 0.1) * 10) / 10);
            this.ticker = Math.max(-60, Math.round((this.ticker - 0.1) * 10) / 10);
            this.buttonSfx = Math.max(0, Math.round((this.buttonSfx - 0.1) * 10) / 10);
            window.volume.alarm = this.alarm;
            window.volume.ticker = this.ticker;
            this.scene.manager.scenes.forEach(scene => {
                if(scene.sound.get('alarm')){
                    scene.sound.get('alarm').setVolume(this.alarm);
                };
            });
            Tone.getDestination().volume.value = Tone.gainToDb(this.ticker);
            this.soundBar.width = 1000 * this.alarm;
            this.updateIcons();
        });

        this.SoundUpButton = this.add.text(this.soundBar.x + 530, this.soundBar.y - 19, '+', {
            fontSize: '42px',
            color: '#f6f8f6'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.alarm = Math.min(1, Math.round((this.alarm + 0.1) * 10) / 10);
            this.ticker = Math.min(1, Math.round((this.ticker + 0.1) * 10) / 10);
            this.buttonSfx = Math.min(1, Math.round((this.buttonSfx + 0.1) * 10) / 10);
            window.volume.alarm = this.alarm;
            window.volume.ticker = this.ticker;
            this.scene.manager.scenes.forEach(scene => {
                if(scene.sound.get('alarm')){
                    scene.sound.get('alarm').setVolume(this.alarm);
                };
            });
            Tone.getDestination().volume.value = Tone.gainToDb(this.ticker);
            this.updateIcons();
        });

        if(!this.scene.isActive('mainmenu')){
            this.homeButton = this.add.image(w / 2, h / 2 + 300, 'home')
                .setInteractive()
                .on('pointerdown', () => {
                    this.cameras.main.fade(1000, 0, 0, 0);
                    this.time.delayedCall(1000, () => {
                    this.scene.start('mainmenu');
                });
            });
        };

        this.updateIcons();
    }
    update(){
            this.soundBar.width = 1000 * window.volume.alarm;
            this.musicBar.width = 1000 * window.volume.music;
        }
    
    updateIcons(){
    this.musicIcon.setTexture(this.music <= 0 ? 'musicOff' : 'musicIcon');
    this.soundIcon.setTexture(this.alarm <= 0 ? 'sfxOff' : 'sfxIcon');
    }
}