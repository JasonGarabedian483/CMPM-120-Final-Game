class Audio extends Phaser.Scene{
    constructor(){
        super('audio')
    }

    preload(){
        this.load.path = 'assets/images/'
        this.load.image('soundOn', 'icons/volume.png');
        this.load.image('soundOff', 'icons/volume_off.png');
        this.load.image('settingsIcon', 'icons/settings.png');
    }

    create(){
        //window.isMuted to show the correct icon
        //this ensure the button reflects the saved state when relaunched
        let soundBtn = this.add.image(1795, 1042, window.isMuted ? 'soundOff' : 'soundOn')
            soundBtn.setInteractive({useHandCursor: true});
            soundBtn.setScale(2);
            soundBtn.setDepth(67);
            //swap the button image to match the new mute state
            soundBtn.on('pointerdown', () => {
                window.isMuted = !window.isMuted;
                localStorage.setItem('isMuted', window.isMuted);

                soundBtn.setTexture(window.isMuted ? 'soundOff' : 'soundOn');

                if(window.bgMusic){
                    window.bgMusic.mute = window.isMuted;
                };

                //this loops though every active Phaser scene and applies the mute state
                //scene.sound is Phaser's sound manager for that scene
                //setting .mute = true, mutes all sounds in that scene instantly
                // this.scene.manager.scenes.forEach(scene => {
                //     if(scene.sound) {
                //         scene.sound.mute = window.isMuted;
                //     }
                // });

                //mute Tone.js separately since it is not part of Phaser's sound system
                //Tone.getDestination().mute = window.isMuted;
            });

        let settingBtn = this.add.image(1880, 1040, 'settingsIcon')
            settingBtn.setInteractive({useHandCursor: true});
            settingBtn.setScale(2);
            settingBtn.setDepth(67);
            settingBtn.on('pointerdown', () => {
                this.scene.launch('options');
        });

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
    }
}