class level2Gameplay extends Phaser.Scene {
    constructor() {
        super('level2gameplay');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'alien_buns.png');
        this.load.image('alienrice', 'alien_rice.png');
    }

    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000');

        this.add.text(centerX, centerY, "[Level 2]", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

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
        let testItem1 = this.physics.add.image(20, 0, 'alienbuns'); // create test item
            testItem1.setInteractive({ draggable: true }) 
        
        let testItem2 = this.physics.add.image(20, 450, 'alienrice');
            testItem2.setInteractive({ draggable: true })

        // adding collider between testItem and conveyor, and making item move when colliding
        this.physics.add.collider(conveyor1, testItem1, () => {
            if (testItem1.body.touching.down) {
                testItem1.setVelocityX(conveyor1Speed);
            }
        });

        this.physics.add.collider(conveyor2, testItem2, () => {
            if (testItem2.body.touching.down) {
                testItem2.setVelocityX(conveyor2Speed);
            }
        })
        
        // dragging of item
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) { // enables test object to be dragged around
            gameObject.x = dragX
            gameObject.y = dragY
        });
    }

    update() {

    }
}