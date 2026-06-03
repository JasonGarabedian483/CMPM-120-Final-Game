class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
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

        let levelText = this.add.text(centerX, 100, "[Level 3]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
 /*
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
 */
        // creating conveyor and adding physics to it
        let conveyor1 = this.add.rectangle(1000, 150, 2000, 40, 0x666666);
            this.physics.add.existing(conveyor1, true);
            const conveyor1Speed = 225;
            conveyor1.body.setSize(2000, 40);

        // creating item group for spawning
        this.items = this.physics.add.group();
        this.itemTypes = [
            {key: 'alienbuns'},
            {key: 'aliennori', scale: 0.4},
            {key: 'alienpatty'},
            {key: 'burgercheese', scale: .1},
            {key: 'alienrice'},
            {key: 'fish'},
            {key: 'pizzacheese', scale: 2.0},
            {key: 'pizzadough', scale: 2.0},
            {key: 'pizzapep', scale: 3.0},
            {key: 'parfaitcream', scale: 6},
            {key: 'parfaitfruit', scale: 7.5},
            {key: 'parfaitwaffer', scale: 7}
        ];

         // variables of ingredients in crafting zone
        this.riceInBox = null;
        this.fishInBox = null;
        this.noriinBox = null;
        this.bunsinBox = null;
        this.pattyinBox = null;
        this.burgercheeseinBox = null;
        this.cheeseinBox = null;
        this.doughinBox = null;
        this.pepinBox = null;
        this.parfaitCreamInBox = null;
        this.parfaitFruitInBox = null;
        this.parfaitWafferInBox = null;

        let turnedInSushi = 0;
        let turnedInBurger = 0;
        let turnedInPizza = 0;
        let turnedInParfait = 0;

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

        // adding collider between alienBuns and conveyor, and making item move when colliding
        this.physics.add.collider(conveyor1, this.items, (conveyor, item) => {
            item.setVelocityX(conveyor1Speed);
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

        // trashbin that deletes items when they overlap it
        this.trashBin = this.add.image(2150, 200, 'trashcan').setScale(4);
            this.physics.add.existing(this.trashBin, true);

            this.physics.add.overlap(this.items, this.trashBin, (bin, item) => {
                item.destroy();
                console.log('destroyed');
            });

        // creation of crafting station 1
        let crafingText = this.add.text(300, 550, "Crafting").setOrigin(0.5);
        this.crafting1 = this.add.image(300, 838, 'crafting').setScale(3.5);
            this.physics.add.existing(this.crafting1, true);
            this.crafting1.body.setSize(550, 300);
            this.crafting1.body.setOffset(22, 290);
            let sushiImage = this.add.image(93, 675, 'aliensushi').setScale(.75);
            let burgerImage = this.add.image(503, 675, 'alienburger').setScale(.75);

        this.crafting2 = this.add.image(950, 838, 'crafting').setScale(3.5);
            this.physics.add.existing(this.crafting2, true);
            this.crafting2.body.setSize(550, 300);
            this.crafting2.body.setOffset(22, 290);
            let pizzaImage = this.add.image(745, 680, 'pizza').setScale(1.75);
            let parfaitImage = this.add.image(1160, 680, 'parfait').setScale(3);

        // Food crafting station 1 collision
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
                this.bunsinBox = null
                this.pattyinBox = null;
                this.burgercheeseinBox = null;

                const burger = new gameItem(this, this.crafting1.x + 20, this.crafting1.y - 30, 'alienburger');
                this.items.add(burger);
            }
        });

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
            // Parfait
            if (item.texture.key === 'parfaitcream') {
                this.parfaitCreamInBox = item;
            }
            if (item.texture.key === 'parfaitfruit') {
                this.parfaitFruitInBox = item;
            }
            if (item.texture.key === 'parfaitwaffer') {
                this.parfaitWafferInBox = item;
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
            // crafting of parfait
            if (this.parfaitCreamInBox && this.parfaitFruitInBox && this.parfaitWafferInBox) {
                this.parfaitCreamInBox.destroy();
                this.parfaitFruitInBox.destroy();
                this.parfaitWafferInBox.destroy();
                this.parfaitCreamInBox = null;
                this.parfaitFruitInBox = null;
                this.parfaitWafferInBox = null;


                const parfait = new gameItem(this, this.crafting2.x + 20, this.crafting2.y - 30, 'parfait').setScale(4);
                this.items.add(parfait);
            }
        });

        // Turn in station WIP
        let turnInStation = this.add.rectangle(1000, 400, 200, 40, 0xff0000);
        this.physics.add.existing(turnInStation, true);
        this.physics.add.collider(turnInStation, this.items, (box, item) => {
            if (item.texture.key === 'aliensushi' || item.texture.key === 'alienburger' || item.texture.key === 'pizza' || item.texture.key === 'parfait') {
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

            if (currentTurnInItem.texture.key === 'parfait') {
                turnedInParfait++;
                console.log('Parfaits turned in:', turnedInParfait)
            }

            if(turnedInBurger >= 2 && turnedInSushi >= 2 && turnedInPizza >= 2 && turnedInParfait >= 2) {
                this.time.delayedCall(1000, () => this.scene.get('timer').completed());
            };

            currentTurnInItem.destroy();
            currentTurnInItem = null;
            turnInButton.setVisible(false);
            menu.setText(`Sushi: ${turnedInSushi}\nBurgers: ${turnedInBurger}\nPizzas: ${turnedInPizza}\nParfaits: ${turnedInParfait}`);
        });

        let menu = this.add.text(200, 300, 'Sushi: 0\nBurgers: 0\nPizzas: 0\nParfaits: 0', {
            fontSize: '36px',
            fill: '#ffffff'
        });

        let menuImage = this.add.image(1500, 830, 'menu').setScale(5.8);
            this.add.text(1500, 625, "Recipes", {
                fontSize: '40px',
                fill: '#ff9327'
            }).setOrigin(0.5);
            // burger recipe
            this.add.image(1350, 680, 'alienbuns').setScale(.5);
            this.add.image(1425, 680, 'alienpatty').setScale(.5);
            this.add.image(1510, 675, 'burgercheese').setScale(.06);
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