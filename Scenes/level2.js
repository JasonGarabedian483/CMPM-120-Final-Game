class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'burger/alien_buns.png')
        this.load.image('alienburger', 'burger/alien_burger.png')
        this.load.image('alienpatty', 'burger/alien_patty.png')
        this.load.image('burgercheese', 'burger/alien_cheese.png')
        this.load.image('aliennori', 'sushi/alien_nori.png')
        this.load.image('alienrice', 'sushi/alien_rice.png')
        this.load.image('aliensushi', 'sushi/alien_sushi.png')
        this.load.image('fish', 'sushi/fish.png')
        this.load.image('pizzacheese', 'pizza/pizza_cheese.png')
        this.load.image('pizzadough', 'pizza/pizza_dough.png')
        this.load.image('pizzapep', 'pizza/pizza_pepperoni.png')
        this.load.image('pizza', 'pizza/pizza.png')
        this.load.image('trashcan', 'trashcan.png')
        this.load.image('crafting', 'craftingstation.png')
        this.load.image('menu', 'menu.png')
        this.load.image('arrow', 'arrow.png')
        this.load.image('insidebg', 'insidebg.png')
        this.load.image('bell', 'servicebell.png')
        this.load.image('bellpressed', 'servicebell_pressed.png')

    }

    create() {
        let background = this.add.image(1920 / 2, 540, 'insidebg');
            background.setScale(4);

        let bell = this.add.image(1920/2 + 200, 550, 'bell').setScale(1).setInteractive({useHandCursor: true});
            bell.on('pointerdown', () => {
                bell.setTexture('bellpressed');
                this.time.delayedCall(300, () => bell.setTexture('bell'));
            });
            
        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 60, levelkey: 2});
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, 100, "[Level 2]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // creating conveyor and adding physics to it
        let conveyor = this.add.rectangle(1000, 150, 2000, 40, 0x666666);
            this.physics.add.existing(conveyor, true);
            const conveyorSpeed = 225;
            conveyor.body.setSize(2000, 40);

        // creating item group for spawning
        this.items = this.physics.add.group();
        this.itemTypes = [
            {key: 'alienbuns'},
            {key: 'aliennori', scale: 0.4},
            {key: 'alienpatty'},
            {key: 'alienrice'},
            {key: 'fish'},
            {key: 'pizzacheese', scale: 2.0},
            {key: 'pizzadough', scale: 2.0},
            {key: 'pizzapep', scale: 3.0},
            {key: 'burgercheese', scale: .1},
        ];

         // variables of ingredients in crafting zone
        this.riceInBox = null;
        this.fishInBox = null;
        this.noriinBox = null;
        this.bunsinBox = null;
        this.burgercheeseinBox = null;
        this.pattyinBox = null;
        this.cheeseinBox = null;
        this.doughinBox = null;
        this.pepinBox = null;

        let turnedInSushi = 0;
        let turnedInBurger = 0;
        let turnedInPizza = 0;

        let requiredSushi = 2;
        let requiredBurger = 1;
        let requiredPizza = 3;

        // creation of items from the itemTypes list using the gameItem function
        this.spawnItem1 = () => {
            const data = Phaser.Utils.Array.GetRandom(this.itemTypes);
            const item = new gameItem(this, 20, 0, data.key);

            if (data.scale) {
                item.setScale(data.scale);
            }
            this.items.add(item);
        };

        // randomly spawns one of the items in the itemTypes list
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnItem1,
            callbackScope: this
        });

        // adding collider between items and conveyor
        this.physics.add.collider(conveyor, this.items, (conveyor, item) => {
            item.setVelocityX(conveyorSpeed);
        });
 
        // dragging of item
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.body.enable = false;
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY
        });
        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.body.enable = true;
        });

        // trashbin that deletes items when they overlap it at end of conveyor
        this.trashBin = this.add.image(2150, 200, 'trashcan').setScale(4);
            this.physics.add.existing(this.trashBin, true);

            this.physics.add.overlap(this.items, this.trashBin, (bin, item) => {
                item.destroy();
                console.log('destroyed');
            });

        let crafingText = this.add.text(300, 550, "Crafting").setOrigin(0.5);
        
        // creation of crafting station 1
        this.crafting1 = this.add.image(280 + 120, 838, 'crafting').setScale(3.25);
            this.physics.add.existing(this.crafting1, true);
            this.crafting1.body.setSize(550, 300);
            this.crafting1.body.setOffset(0, 290);
            let sushiImage = this.add.image(89 + 120, 690, 'aliensushi').setScale(.65);
            let burgerImage = this.add.image(468 + 120, 690, 'alienburger').setScale(.65);

        // creation of crafting station 2
        this.crafting2 = this.add.image(950 + 60, 838, 'crafting').setScale(3.25);
            this.physics.add.existing(this.crafting2, true);
            this.crafting2.body.setSize(550, 300);
            this.crafting2.body.setOffset(0, 290);
            let pizzaImage = this.add.image(820, 694, 'pizza').setScale(1.5);

        // Food crafting station 1 collision / crafting
        this.physics.add.collider(this.crafting1, this.items, (box, item) => {
            // Sushi
            if (item.texture.key === 'alienrice') {
                this.riceInBox = item;
            }
            if (item.texture.key === 'fish') {
                this.fishInBox = item;
            }
            if (item.texture.key === 'aliennori') {
                this.noriinBox = item;
            }
            // Burger
            if (item.texture.key === 'alienbuns') {
                this.bunsinBox = item;
            }
            if (item.texture.key === 'alienpatty') {
                this.pattyinBox = item;
            }
            if (item.texture.key === 'burgercheese') {
                this.burgercheeseinBox = item;
            }
            // crafting of sushi
            if (this.riceInBox && this.fishInBox && this.noriinBox) {
                this.riceInBox.destroy();
                this.fishInBox.destroy();
                this.noriinBox.destroy();
                this.riceInBox = null;
                this.fishInBox = null;
                this.noriinBox = null;

                const sushi = new gameItem(this, this.crafting1.x - 20, this.crafting1.y - 30, 'aliensushi');
                this.items.add(sushi);
            }
            // crafting of burger
            if (this.bunsinBox && this.pattyinBox && this.burgercheeseinBox) {
                this.bunsinBox.destroy();
                this.pattyinBox.destroy();
                this.burgercheeseinBox.destroy();
                this.bunsinBox = null;
                this.pattyinBox = null;
                this.burgercheeseinBox = null;

                const burger = new gameItem(this, this.crafting1.x + 20, this.crafting1.y - 30, 'alienburger');
                this.items.add(burger);
            }
        });
        // Food crafting station 2 collision / crafting
        this.physics.add.collider(this.crafting2, this.items, (box, item) => {
            // Pizza
            if (item.texture.key === 'pizzacheese') {
                this.cheeseinBox = item;
            }
            if (item.texture.key === 'pizzadough') {
                this.doughinBox = item;
            }
            if (item.texture.key === 'pizzapep') {
                this.pepinBox = item;
            }
            // crafting of pizza
            if (this.cheeseinBox && this.doughinBox && this.pepinBox) {
                this.cheeseinBox.destroy();
                this.doughinBox.destroy();
                this.pepinBox.destroy();
                this.cheeseinBox = null;
                this.doughinBox = null;
                this.pepinBox = null;

                const pizza = new gameItem(this, this.crafting2.x - 20, this.crafting2.y - 30, 'pizza').setScale(2);
                this.items.add(pizza);
            }
        });

        // Turn in station WIP
        let turnInStation = this.add.rectangle(1590, 575, 300, 40, 0xff0000).setAlpha(0);
        this.physics.add.existing(turnInStation, true);
        this.physics.add.collider(turnInStation, this.items, (box, item) => {
            if (item.texture.key === 'aliensushi' || item.texture.key === 'alienburger' || item.texture.key === 'pizza') {
                currentTurnInItem = item;
                turnInButton.setVisible(true);
            }
        });
        let turnInButton = this.add.text(1150, 400, "TURN IN", {
            fontSize: '24px',
            backgroundColor: '#00ff00',
            color: '#000'
        }).setInteractive().setVisible(false);
        let currentTurnInItem = null;

        turnInButton.on('pointerdown', () => {
            if (!currentTurnInItem) {
                return;
            };
            if (currentTurnInItem.texture.key === 'aliensushi') {
                turnedInSushi++;
                console.log("Sushi turned in:", turnedInSushi)
            };
            if (currentTurnInItem.texture.key === 'alienburger') {
                turnedInBurger++;
                console.log('Burgers turned in:', turnedInBurger);
            };
            if (currentTurnInItem.texture.key === 'pizza') {
                turnedInPizza++;
                console.log('Pizzas turned in:', turnedInPizza)
            }
            if(turnedInBurger >= requiredBurger && turnedInSushi >= requiredSushi && turnedInPizza >= requiredPizza) {
                this.time.delayedCall(1000, () => this.scene.get('timer').completed());
            };

            currentTurnInItem.destroy();
            currentTurnInItem = null;
            turnInButton.setVisible(false);
            menu.setText(`Sushi: ${turnedInSushi}\nBurgers: ${turnedInBurger}\nPizzas: ${turnedInPizza}`);
        });

        // menu
        let menu = this.add.text(200, 300, 'Sushi: 0\nBurgers: 0\nPizzas: 0', {
            fontSize: '36px',
            fill: '#ffffff'
        });

        // recipe board
        let menuImage = this.add.image(1700 - 110, 850, 'menu').setScale(5.4);
            this.add.text(1700 - 110, 670, "Recipes", {
                fontSize: '40px',
                fill: '#ff9327'
            }).setOrigin(0.5);
            // burger recipe
            this.add.image(1440, 720, 'alienbuns').setScale(.5);
            this.add.image(1515, 720, 'alienpatty').setScale(.5);
            this.add.image(1600, 720, 'burgercheese').setScale(.06);
            this.add.image(1670, 720, 'arrow').setScale(2);
            this.add.image(1740, 720, 'alienburger').setScale(.5);
            // sushi recipe
            this.add.image(1440, 800, 'alienrice').setScale(.5);
            this.add.image(1515, 800, 'fish').setScale(.5);
            this.add.image(1600, 800, 'aliennori').setScale(.2);
            this.add.image(1670, 800, 'arrow').setScale(2);
            this.add.image(1740, 800, 'aliensushi').setScale(.5);
            // pizza recipe
            this.add.image(1440, 890, 'pizzadough');
            this.add.image(1515, 890, 'pizzacheese');
            this.add.image(1600, 890, 'pizzapep').setScale(2);
            this.add.image(1670, 890, 'arrow').setScale(2);
            this.add.image(1740, 890, 'pizza')
    }

    update() {

    }
}