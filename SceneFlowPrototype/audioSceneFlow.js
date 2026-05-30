class AudioSceneFlow extends Phaser.Scene{
    constructor(){
        super('audiosceneflow');
    }

    preload(){
        this.load.image('soundOn', 'assets/images/volume.png');
        this.load.image('soundOff', 'assets/images/mute.png');
    }

    create(){
        //window.isMuted to show the correct icon
        //this ensure the button reflects the saved state when relaunched
        let soundBtn = this.add.image(25, 1055, window.isMuted ? 'soundOff' : 'soundOn')
            soundBtn.setInteractive({useHandCursor: true});
            soundBtn.setScale(0.1);
            soundBtn.setDepth(67);
            //swap the button image to match the new mute state
            soundBtn.on('pointerdown', () => {
                window.isMuted = !window.isMuted;
                soundBtn.setTexture(window.isMuted ? 'soundOff' : 'soundOn');

                //this loops though every active Phaser scene and applies the mute state
                //scene.sound is Phaser's sound manager for that scene
                //setting .mute = true, mutes all sounds in that scene instantly
                this.scene.manager.scenes.forEach(scene => {
                    if(scene.sound) {
                        scene.sound.mute = window.isMuted;
                    }
                });
            });
    }
}