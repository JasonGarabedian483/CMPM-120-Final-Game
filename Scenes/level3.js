class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'burger/alien_buns.png')
        this.load.image('alienburger', 'burger/alien_burger.png')
        this.load.image('alienpatty', 'burger/alien_patty.png')
        this.load.image('aliennori', 'sushi/alien_nori.png')
        this.load.image('alienrice', 'sushi/alien_rice.png')
        this.load.image('aliensushi', 'sushi/alien_sushi.png')
        this.load.image('fish', 'sushi/fish.png')
        this.load.image('pizzacheese', 'pizza/pizza_cheese.png')
        this.load.image('pizzadough', 'pizza/pizza_dough.png')
        this.load.image('pizzapep', 'pizza/pizza_pepperoni.png')
        this.load.image('pizza', 'pizza/pizza.png')
        this.load.image('parfaitcream', 'parfait/parfait_cream.png')
        this.load.image('parfaitfruit', 'parfait/parfait_fruit.png')
        this.load.image('parfaitwaffer', 'parfait/parfait_waffer.png')
        this.load.image('parfait', 'parfait/parfait.png')
        this.load.image('trashcan', 'trashcan.png')
        this.load.image('crafting', 'craftingstation.png')
        this.load.image('menu', 'menu.png')
        this.load.image('arrow', 'arrow.png')
    }

    create() {
        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 30, levelkey: 3});
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

        let menuImage = this.add.image(1500, 830, 'menu').setScale(5.8);
            this.add.text(1500, 625, "Recipes", {
                fontSize: '40px',
                fill: '#ff9327'
            }).setOrigin(0.5);
            // burger recipe
            this.add.image(1350, 680, 'alienbuns').setScale(.5);
            this.add.image(1425, 680, 'alienpatty').setScale(.5);
            this.add.image(1580, 680, 'arrow').setScale(2);
            this.add.image(1650, 680, 'alienburger').setScale(.5);
            // sushi recipe
            this.add.image(1350, 780, 'alienrice').setScale(.5);
            this.add.image(1425, 780, 'fish').setScale(.5);
            this.add.image(1510, 780, 'aliennori').setScale(.2);
            this.add.image(1580, 780, 'arrow').setScale(2);
            this.add.image(1650, 780, 'aliensushi').setScale(.5);
            // pizza recipe
            this.add.image(1350, 880, 'pizzadough');
            this.add.image(1425, 880, 'pizzacheese');
            this.add.image(1510, 880, 'pizzapep').setScale(2);
            this.add.image(1580, 880, 'arrow').setScale(2);
            this.add.image(1650, 880, 'pizza')
            // parfait recipe
            this.add.image(1350, 980, 'parfaitcream').setScale(3.5);
            this.add.image(1425, 980, 'parfaitfruit').setScale(4.5);
            this.add.image(1510, 980, 'parfaitwaffer').setScale(5);
            this.add.image(1580, 980, 'arrow').setScale(2);
            this.add.image(1650, 980, 'parfait').setScale(3);
    }

    update() {

    }
    
}