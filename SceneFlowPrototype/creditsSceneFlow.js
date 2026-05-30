class CreditsSceneFlow extends Phaser.Scene {
    constructor() {
        super('creditssceneflow');
    }
    
    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
    
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#003c73');

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
            this.time.delayedCall(1000, () => this.scene.start('mainmenusceneflow'));
        });
    }
}