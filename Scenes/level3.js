class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }

    preload() {
        this.load.path = 'assets/images/';
    }

    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        let levelText = this.add.text(centerX, centerY, "[Level 3]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let winText = this.add.text(centerX, centerY, "You win! :)", {
            fontSize: '150px',
            fill: '#42f55a'
        }).setOrigin(0.5).setAlpha(0);

        let loseText = this.add.text(centerX, centerY, "You lose! :(", {
            fontSize: '150px',
            fill: '#f54242'
        }).setOrigin(0.5).setAlpha(0);
        // win button
        let winButton = this.add.text(centerX, centerY + 300, "Press this button to win!", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        winButton.on('pointerdown', () => {
            this.time.delayedCall(200, () => {
                winButton.destroy();
                loseButton.destroy();
                levelText.destroy();
                winText.setAlpha(1);
            });
        });

        let loseButton = this.add.text(centerX, centerY + 400, "Press this button to lose :(", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        loseButton.on('pointerdown', () => {
            this.time.delayedCall(200, () => {
                winButton.destroy();
                loseButton.destroy();
                levelText.destroy();
                loseText.setAlpha(1);
            });
        });
    }

    update() {

    }
    
}