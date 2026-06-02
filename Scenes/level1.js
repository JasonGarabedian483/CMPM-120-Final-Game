class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'alien_buns.png')
        this.load.image('alienburger', 'alien_burger.png')
        this.load.image('aliennori', 'alien_nori.png')
        this.load.image('alienpatty', 'alien_patty.png')
        this.load.image('alienrice', 'alien_rice.png')
        this.load.image('aliensushi', 'alien_sushi.png')
        this.load.image('fish', 'fish.png')
        this.load.image('trashcan', 'trashcan.png')
        this.load.image('crafting', 'craftingstation.png')
    }

    create() {
        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 60, levelkey: 1});
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, 100, "[Level 1]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        /*
        //placeholder buttons for if the player dosen't pass score threshold and needs to go to replay scene or if they do pass score threshold and can go to next level or main menu
        //these placeholder buttons are to showcase the possible outcomes of a level that will be implemented later
        let replayButton = this.add.text(centerX, centerY + 100, "Didn't pass score threshold.\nGo to Replay Scene", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        replayButton.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('replayScene'));
        });

        //go to main menu if they pass score threshold
        let menuButton = this.add.text(centerX, centerY + 200, "Passed score threshold!\nGo to Main Menu", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        menuButton.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('mainmenu'));
        });

        //or go to level2
        let level2Button = this.add.text(centerX, centerY + 300, "Passed score threshold!\nGo to Level 2", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        level2Button.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('level2'));
        });
        */
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
        ];

        // variables of ingredients in crafting zone
        this.riceInBox = null;
        this.fishInBox = null;
        this.noriinBox = null;
        this.bunsinBox = null;
        this.pattyinBox = null;

        let turnedInSushi = 0;
        let turnedInBurger = 0;


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
        // adding collider between alienBuns and conveyor, and making item move when colliding
        this.physics.add.collider(conveyor, this.items, (conveyor, item) => {
            item.setVelocityX(conveyorSpeed);
        });
        
        // dragging of item
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.body.enable = false;
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) { // enables test object to be dragged around
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
            this.add.image(93, 675, 'alienrice').setScale(.75);
            this.add.image(215, 675, 'aliennori').setScale(.3);
            this.add.image(337, 675, 'fish').setScale(.75).setAngle(-45);
            this.add.image(503, 675, 'aliensushi').setScale(.75);

        // Food crafting
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
            if (this.bunsinBox && this.pattyinBox) {
                this.bunsinBox.destroy();
                this.pattyinBox.destroy();
                this.bunsinBox = null
                this.pattyinBox = null;

                const burger = new gameItem(this, this.crafting1.x + 20, this.crafting1.y - 30, 'alienburger');
                this.items.add(burger);
            }
        });

        let turnInStation = this.add.rectangle(1000, 400, 200, 40, 0xff0000);
        this.physics.add.existing(turnInStation, true);
        this.physics.add.collider(turnInStation, this.items, (box, item) => {
            if (item.texture.key === 'aliensushi' || item.texture.key === 'alienburger') {
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

            if(turnedInBurger >= 2 && turnedInSushi >= 2) {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.get('timer').completed());
            };

            currentTurnInItem.destroy();
            currentTurnInItem = null;
            turnInButton.setVisible(false);
            menu.setText(`Sushi: ${turnedInSushi}\nBurgers: ${turnedInBurger}`);
        });

        let menu = this.add.text(200, 300, 'Sushi: 0\nBurgers: 0', {
            fontSize: '36px',
            fill: '#ffffff'
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
