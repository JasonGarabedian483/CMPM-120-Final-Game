class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
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
        this.load.image('trashcan', 'trashcan.png')
        this.load.image('crafting', 'craftingstation.png')
        this.load.image('menu', 'menu.png')
        this.load.image('arrow', 'arrow.png')
        this.load.image('insidebg', 'insidebg.png')
        this.load.image('bell', 'servicebell.png')
        this.load.image('bellpressed', 'servicebell_pressed.png')
        this.load.image('sparkle', 'sparkle.png')
    }

    create() {
        let background = this.add.image(1920 / 2, 540, 'insidebg');
            background.setScale(4);
        
        this.add.image(1070, 265, 'alienburger').setScale(.25);
        this.add.image(1175, 265, 'aliensushi').setScale(.25);

        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 90, levelkey: 1});
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, 100, "[Level 1]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let bell = this.add.image(1920/2 + 200, 550, 'bell').setScale(1).setInteractive({useHandCursor: true});

        let bellSparkles = this.add.particles(bell.x, bell.y,'sparkle', {
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

        // creating conveyor and adding physics to it
        let conveyor = this.add.rectangle(1000, 150, 2000, 40, 0x666666);
        this.physics.add.existing(conveyor, true);
        const conveyorSpeed = 150;
        conveyor.body.setSize(2000, 40);

        // Creating key for each item and group
        this.items = this.physics.add.group();
        this.itemTypes = [
            {key: 'alienbuns'},
            {key: 'aliennori', scale: 0.4},
            {key: 'alienpatty'},
            {key: 'alienrice'},
            {key: 'fish'},
            {key: 'burgercheese', scale: .1},
        ];

        // variables of ingredients in crafting zone
        this.riceInBox = null;
        this.fishInBox = null;
        this.noriinBox = null;
        this.bunsinBox = null;
        this.pattyinBox = null;
        this.burgercheeseinBox = null;

        let turnedInSushi = 0;
        let turnedInBurger = 0;

        let requiredSushi = 2;
        let requiredBurger = 2;

        let neededBurgerText = this.add.text(1070, 270, `x${requiredBurger - turnedInBurger}`, { fontSize: '24px', stroke: '#0000000', strokeThickness: 3 });
        let neededSushiText = this.add.text(1175, 270, `x${requiredSushi - turnedInSushi}`, { fontSize: '24px', stroke: '#0000000', strokeThickness: 3 });

        window.levelData[1].requiredSushi = requiredSushi;
        window.levelData[1].requiredBurger = requiredBurger;

        // creation of items from the itemTypes list using the gameItem function
        this.spawnItem = () => {
            const data = Phaser.Utils.Array.GetRandom(this.itemTypes);
            const item = new gameItem(this, 60, 0, data.key);

            if (data.scale) {
                item.setScale(data.scale);
            }
            this.items.add(item);
        };

        // randomly spawns one of the items in the itemTypes list
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.spawnItem,
            callbackScope: this
        });
        // adding collider between items and conveyor
        this.physics.add.collider(conveyor, this.items, (conveyor, item) => {
            item.setVelocityX(conveyorSpeed);
        });
        
        // trashbin that deletes items when they overlap it at end of conveyor
        this.trashBin = this.add.image(2150, 200, 'trashcan').setScale(4);
            this.physics.add.existing(this.trashBin, true);

            this.physics.add.overlap(this.items, this.trashBin, (bin, item) => {
                item.destroy();
                console.log('destroyed');
            });

        // creation of crafting station 1
        this.crafting1 = this.add.image(280 + 120, 838, 'crafting').setScale(3.25);
            this.physics.add.existing(this.crafting1, true);
            this.crafting1.body.setSize(550, 300);
            this.crafting1.body.setOffset(0, 270);
            let sushiImage = this.add.image(89 + 120, 690, 'aliensushi').setScale(.65);
            let burgerImage = this.add.image(468 + 120, 690, 'alienburger').setScale(.65);

        // Food crafting and collision
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
                this.bunsinBox = null;
                this.pattyinBox = null;
                this.burgercheeseinBox = null;

                const burger = new gameItem(this, this.crafting1.x + 150, this.crafting1.y - 30, 'alienburger');
                this.items.add(burger);
            }
        });

        let turnInStation = this.add.rectangle(1590, 585, 300, 40, 0xff0000).setAlpha(0);
        this.physics.add.existing(turnInStation, true);
        this.physics.add.collider(turnInStation, this.items, (box, item) => {
            if (item.texture.key === 'aliensushi' || item.texture.key === 'alienburger') {
                currentTurnInItem = item;
                bellSparkles.start();
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
                window.levelItemsCount[1].sushi = turnedInSushi;
                console.log("Sushi turned in:", turnedInSushi)
                bellSparkles.stop();
            };
            if (currentTurnInItem.texture.key === 'alienburger') {
                turnedInBurger++;
                window.levelItemsCount[1].burger = turnedInBurger;
                console.log('Burgers turned in:', turnedInBurger);
                bellSparkles.stop();
            };
            if(turnedInBurger >= requiredBurger && turnedInSushi >= requiredSushi) {
                window.levelCompleted[1].completed = true;
                localStorage.setItem('level1Completed', true);
                this.time.delayedCall(1000, () => this.scene.get('timer').completed());
            };

            currentTurnInItem.destroy();
            currentTurnInItem = null;
            neededBurgerText.setText(`x${Math.max(0, requiredBurger - turnedInBurger)}`);
            neededSushiText.setText(`x${Math.max(0, requiredSushi - turnedInSushi)}`);
            });

        let menuImage = this.add.image(1590, 850, 'menu').setScale(5.4);
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

        // dragging of item
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.body.enable = false;
            if (gameObject.texture.key === 'alienbuns' || gameObject.texture.key === 'alienpatty' || gameObject.texture.key === 'burgercheese') {
                burgerSparkles.start();
            }
            if (gameObject.texture.key === 'alienrice' || gameObject.texture.key === 'fish' || gameObject.texture.key === 'aliennori') {
                sushiSparkles.start();
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
        });

    }

    update() {

    }
}

//Alien Bun prefab object
class gameItem extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, imagename) {
    super(scene, x, y, imagename);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({ draggable: true });

    scene.input.setDraggable(this);

    this.on('drag', (pointer, dragX, dragY) => {
      this.setPosition(dragX, dragY);
      this.body.setVelocity(0);
    });
  }
}
