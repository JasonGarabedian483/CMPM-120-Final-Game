class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
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
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, centerY, "[Level 2]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let level3Button = this.add.text(centerX, centerY + 300, "Passed score threshold!\nGo to Level 3", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#0000ff',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();
        level3Button.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('level3'));
        });

        // creating conveyor and adding physics to it
        let conveyor1 = this.add.rectangle(450, 300, 900, 40, 0x666666);
            this.physics.add.existing(conveyor1, true);
            const conveyor1Speed = 100;
            conveyor1.body.setSize(900, 40);

        let conveyor2 = this.add.rectangle(250, 700, 500, 40, 0x666666);
            this.physics.add.existing(conveyor2, true);
            const conveyor2Speed = 250;
            conveyor2.body.setSize(500, 40);

        // creating test icon
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
        this.spawnItem1 = () => {
            const data = Phaser.Utils.Array.GetRandom(this.itemTypes);
            const item = new gameItem(this, 20, 0, data.key);

            if (data.scale) {
                item.setScale(data.scale);
            }
            this.items.add(item);
        };

        this.spawnItem2 = () => {
            const data = Phaser.Utils.Array.GetRandom(this.itemTypes);
            const item = new gameItem(this, 20, 400, data.key);

            if (data.scale) {
                item.setScale(data.scale);
            }
            this.items.add(item);
        };

        // randomly spawns one of the items in the itemTypes list
        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: this.spawnItem1,
            callbackScope: this
        });

        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: this.spawnItem2,
            callbackScope: true
        });
        // adding collider between alienBuns and conveyor, and making item move when colliding
        this.physics.add.collider(conveyor1, this.items, (conveyor, item) => {
            item.setVelocityX(conveyor1Speed);
        });

        this.physics.add.collider(conveyor2, this.items, (conveyor, item) => {
            item.setVelocityX(conveyor2Speed);
        })

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
    }

    update() {

    }
}