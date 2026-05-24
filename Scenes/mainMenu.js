class mainMenu extends Phaser.Scene {
    constructor() {
        super ('mainmenu')
    }

    preload() {
        this.load.path = 'Assets/';
        this.load.image('background', 'main menu.jpg')
    }

    create() {
        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(2);
        
        //let menuIcon = this.add.image(1920 / 2, 400, 'menuicon');
    }

    update() {

    }
}