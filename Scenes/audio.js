class Audio extends Phaser.Scene{
    constructor(){
        super('audio')
    }

    preload(){
        this.load.path = 'assets/images/'
        this.load.image('musicOn', 'icons/music.png');
        this.load.image('musicOff', 'icons/music_off.png');
        this.load.image('settingsIcon', 'icons/settings.png');
    }

    create(){
        //window.isMuted to show the correct icon
        //this ensure the button reflects the saved state when relaunched
        let soundBtn = this.add.image(1795, 1042, window.isMuted ? 'musicOff' : 'musicOn')
            soundBtn.setInteractive({useHandCursor: true});
            soundBtn.setScale(2);
            soundBtn.setDepth(67);
            //swap the button image to match the new mute state
            soundBtn.on('pointerdown', () => {
                window.isMuted = !window.isMuted;
                localStorage.setItem('isMuted', window.isMuted);

                soundBtn.setTexture(window.isMuted ? 'musicOff' : 'musicOn');

                if(window.bgMusic){
                    window.bgMusic.mute = window.isMuted;
                };

                if(window.isMuted){
                    window.savedMusicVolume = window.volume.music;
                    localStorage.setItem('savedMusicVolume', window.savedMusicVolume);
                    window.volume.music = 0;
                } else {
                    window.volume.music = window.savedMusicVolume;
                };
<<<<<<< HEAD

=======
>>>>>>> b36c588 (Cleaned up code, replaced button sfx, refined readMe and ASSETS.md, organized assets, fixed how to play video, refined logo scene, removed credits.)
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