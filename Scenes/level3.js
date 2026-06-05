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
        this.load.image('insidebg', 'insidebg3.png')
        this.load.image('bell', 'servicebell.png')
        this.load.image('bellpressed', 'servicebell_pressed.png')
        this.load.image('sparkle', 'sparkle.png')
    }

    create() {
        this.scene.stop('level2');
        let background = this.add.image(1920 / 2, 540, 'insidebg');
            background.setScale(4);

        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 145, levelkey: 3});
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        let levelText = this.add.text(centerX, 100, "[Level 3]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let bell = this.add.image(1920/2 + 200, 550, 'bell').setScale(1).setInteractive({useHandCursor: true});

        let sparkleParticles = this.add.particles(bell.x, bell.y,'sparkle', {
            speed: { min: 100, max: 150 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            frequency: 100,
            emitting: false
        });
        
        let burgerSparkles = this.add.particles(468 + 120, 690,'sparkle', {
            speed: { min: 100, max: 150 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            frequency: 100,
            emitting: false
        }).setDepth(1).setAlpha(0.8);

        let sushiSparkles = this.add.particles(89 + 120, 690,'sparkle', {
            speed: { min: 100, max: 150 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            frequency: 100,
            emitting: false
        }).setDepth(1).setAlpha(0.8);

        let pizzaSparkles = this.add.particles(820, 694,'sparkle', {
            speed: { min: 100, max: 150 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            frequency: 100,
            emitting: false
        }).setDepth(1).setAlpha(0.8);

        let parfaitSparkles = this.add.particles(1205, 690,'sparkle', {
            speed: { min: 100, max: 150 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            frequency: 100,
            emitting: false
        }).setDepth(1).setAlpha(0.8);

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

        let requiredSushi = 1
        let requiredBurger = 3;
        let requiredPizza = 2;
        let requiredParfait = 2;

        window.levelData[3].requiredSushi = requiredSushi;
        window.levelData[3].requiredBurger = requiredBurger;
        window.levelData[3].requiredPizza = requiredPizza;
        window.levelData[3].requiredParfait = requiredParfait;

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
        this.physics.add.collider(conveyor1, this.items, (conveyor, item) => {
            item.setVelocityX(conveyor1Speed);
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
            this.crafting1.body.setOffset(0, 270);
            let sushiImage = this.add.image(89 + 120, 690, 'aliensushi').setScale(.65);
            let burgerImage = this.add.image(468 + 120, 690, 'alienburger').setScale(.65);

        // creation of crafting station 2
        this.crafting2 = this.add.image(950 + 60, 838, 'crafting').setScale(3.25);
            this.physics.add.existing(this.crafting2, true);
            this.crafting2.body.setSize(550, 300);
            this.crafting2.body.setOffset(0, 270);
            let pizzaImage = this.add.image(820, 694, 'pizza').setScale(1.5);
            let parfaitImage = this.add.image(1205, 690, 'parfait').setScale(3);

        // Food crafting station 1 collision and crafting
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

                const sushi = new gameItem(this, this.crafting1.x - 150, this.crafting1.y - 30, 'aliensushi');
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

                const burger = new gameItem(this, this.crafting1.x + 150, this.crafting1.y - 30, 'alienburger');
                this.items.add(burger);
            }
        });
        // Food crafting station 2 collision and crafting
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

                const pizza = new gameItem(this, this.crafting2.x - 150, this.crafting2.y - 30, 'pizza').setScale(2);
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

                const parfait = new gameItem(this, this.crafting2.x + 150, this.crafting2.y - 30, 'parfait').setScale(4);
                this.items.add(parfait);
            }
        });

        // Turn in station WIP
        let turnInStation = this.add.rectangle(1590, 585, 300, 40, 0xff0000).setAlpha(0);
        this.physics.add.existing(turnInStation, true);
        this.physics.add.collider(turnInStation, this.items, (box, item) => {
            if (item.texture.key === 'aliensushi' || item.texture.key === 'alienburger' || item.texture.key === 'pizza' || item.texture.key === 'parfait') {
                currentTurnInItem = item;
                sparkleParticles.start();
            }
        });

        let currentTurnInItem = null;
            bell.on('pointerdown', () => {
                bell.setTexture('bellpressed');
                this.time.delayedCall(300, () => bell.setTexture('bell'));
                if (!currentTurnInItem) {
                    return;
                };
                if (currentTurnInItem.texture.key === 'aliensushi') {
                    turnedInSushi++;
                    console.log("Sushi turned in:", turnedInSushi)
                    sparkleParticles.stop();
                };
                if (currentTurnInItem.texture.key === 'alienburger') {
                    turnedInBurger++;
                    console.log('Burgers turned in:', turnedInBurger);
                    sparkleParticles.stop();
                }
                if (currentTurnInItem.texture.key === 'pizza') {
                    turnedInPizza++;
                    console.log('Pizzas turned in:', turnedInPizza)
                    sparkleParticles.stop();
                }
                if (currentTurnInItem.texture.key === 'parfait') {
                    turnedInParfait++;
                    console.log('Parfaits turned in:', turnedInParfait)
                    sparkleParticles.stop();
                }
                if(turnedInBurger >= requiredBurger && turnedInSushi >= requiredSushi && turnedInPizza >= requiredPizza && turnedInParfait >= requiredParfait) {
                    window.levelCompleted[3].completed = true;
                    localStorage.setItem('level3completed', true);
                    this.time.delayedCall(1000, () => this.scene.get('timer').completed());
                };
                currentTurnInItem.destroy();
                currentTurnInItem = null;
                menu.setText(`Sushi: ${turnedInSushi}\nBurgers: ${turnedInBurger}\nPizzas: ${turnedInPizza}\nParfaits: ${turnedInParfait}`);
            });

        let menu = this.add.text(200, 300, 'Sushi: 0\nBurgers: 0\nPizzas: 0\nParfaits: 0', {
            fontSize: '36px',
            fill: '#ffffff'
        });

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
            // parfait recipe
            this.add.image(1440, 980, 'parfaitcream').setScale(3.25);
            this.add.image(1515, 980, 'parfaitfruit').setScale(4.25);
            this.add.image(1600, 980, 'parfaitwaffer').setScale(4.75);
            this.add.image(1670, 980, 'arrow').setScale(2);
            this.add.image(1744, 980, 'parfait').setScale(2.5);
        
        // dragging of item
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.body.enable = false;
            if (gameObject.texture.key === 'alienbuns' || gameObject.texture.key === 'alienpatty' || gameObject.texture.key === 'burgercheese') {
                burgerSparkles.start();
            }
            if (gameObject.texture.key === 'alienrice' || gameObject.texture.key === 'fish' || gameObject.texture.key === 'aliennori') {
                sushiSparkles.start();
            }
            if (gameObject.texture.key === 'pizzacheese' || gameObject.texture.key === 'pizzadough' || gameObject.texture.key === 'pizzapep') {
                pizzaSparkles.start();
            }
            if (gameObject.texture.key === 'parfaitcream' || gameObject.texture.key === 'parfaitfruit' || gameObject.texture.key === 'parfaitwaffer') {
                parfaitSparkles.start();
            }
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY
        });
        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.body.enable = true;
            burgerSparkles.stop();
            sushiSparkles.stop();
            pizzaSparkles.stop();
            parfaitSparkles.stop();
        });
    }

    update() {
        
    }
    
}