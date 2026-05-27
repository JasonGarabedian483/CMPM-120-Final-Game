class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'alien_buns.png')
    }

    create() {
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
        this.conveyor = this.add.rectangle(450, 300, 900, 40, 0x666666);
        this.physics.add.existing(this.conveyor, true);
        this.conveyorSpeed = 100;
        this.conveyor.body.setSize(900, 40);

        // creating test icon
        let testItem = this.physics.add.image(20, 0, 'alienbuns'); // create test item
            testItem.setInteractive({ draggable: true }) 

        // adding collider between testItem and conveyor, and making item move when colliding
        this.physics.add.collider(this.conveyor, testItem, () => {
            if (testItem.body.touching.down) {
                testItem.setVelocityX(this.conveyorSpeed);
            }
        });
        
        // dragging of item
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) { // enables test object to be dragged around
            gameObject.x = dragX
            gameObject.y = dragY
        });
    }
    
    update() {

    }
}