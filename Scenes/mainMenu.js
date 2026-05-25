class mainMenu extends Phaser.Scene {
    constructor() {
        super ('mainmenu')
    }

    preload() {
        this.load.path = 'Assets/';
        this.load.image('background', 'main menu.jpg')
        //this.load.image('menuicon', 'alien rice.png') <- change alien rice to menu icon
    }

    create() {
        let background = this.add.image(1920 / 2, 540, 'background');
            background.setScale(2);
        
        /*let menuIcon = this.add.image(1920 / 2, 200, 'menuicon').setOrigin(0.5);
            menuIcon.setScale(1.5);
            this.tweens.add({
                targets: menuIcon,
                scaleX: 1.75,
                scaleY: 1.75,
                duration: 2000,
                ease: 'Power1',
                yoyo: true,
                loop: -1
            }) */
        
    }

    update() {

    }
}