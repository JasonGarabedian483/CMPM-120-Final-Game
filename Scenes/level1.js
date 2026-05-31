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
    }

    create() {
        this.scene.stop('timer');
        this.scene.launch('timer', {totalSeconds: 60, levelkey: 1});
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, centerY, "[Level 1]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

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

        // creating conveyor and adding physics to it
        let conveyor = this.add.rectangle(600, 300, 1200, 40, 0x666666);
        this.physics.add.existing(conveyor, true);
        const conveyorSpeed = 100;
        conveyor.body.setSize(1200, 40);

        // Creating key for each item and group
        this.items = this.physics.add.group();
        this.itemTypes = [
            {key: 'alienbuns'},
            {key: 'alienburger'},
            {key: 'aliennori', scale: 0.4},
            {key: 'alienpatty'},
            {key: 'alienrice'},
            {key: 'aliensushi'},
            {key: 'fish'},
        ];

        // creation of items from the itemTypes list using the gameItem function
        this.spawnItem = () => {
            const data = Phaser.Utils.Array.GetRandom(this.itemTypes);
            const item = new gameItem(this, 20, 0, data.key);

            if (data.scale) {
                item.setScale(data.scale);
            }
            this.items.add(item);
        };

        // randomly spawns one of the items in the itemTypes list
        this.time.addEvent({
            delay: 3000,
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
        this.trashBin = this.add.rectangle(1400, 800, 200, 200, 0xff0000, 0.5);
            this.physics.add.existing(this.trashBin, true);

            this.physics.add.overlap(this.items, this.trashBin, (bin, item) => {
                item.destroy();
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
