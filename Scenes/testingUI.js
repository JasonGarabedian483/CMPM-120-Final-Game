// TO BE DELETED, THIS IS JUST A TESTING SCENE FOR QUICKLY ACCESSING OTHER SCENES IN THE GAME
class TestingUI extends Phaser.Scene {
    constructor(){
        super('testingui');
    }

    create(){
        const w = this.scale.width;
        const h = this.scale.height;

        this.add.text(w - 190, h - 300, 'mainMenu', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('mainmenu');
        });

        this.add.text(w - 190, h - 250, 'level1', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('level1');
        });

        this.add.text(w - 190, h - 200, 'level2', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('level2');
        });

        this.add.text(w - 190, h - 150, 'level3', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('level3');
        });

        this.add.text(w - 190, h - 100, 'credits', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('credits');
        });

        this.add.text(w - 220, h - 50, 'finalscore', {
            fontSize: '32px',
            color: '#ffffff',
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.launch('finalscore');
        });


        

        

    }

}