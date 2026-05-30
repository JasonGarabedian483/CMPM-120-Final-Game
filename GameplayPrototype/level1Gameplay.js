class level1Gameplay extends Phaser.Scene {
    constructor() {
        super('level1gameplay');
    }

    preload() {
        this.load.path = 'assets/images/';
        this.load.image('alienbuns', 'alien_buns.png')

    }

    create() {
        this.scene.stop('timergameplay');
        this.scene.launch('timergameplay', {totalSeconds: 60, levelkey: 1});
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
            this.time.delayedCall(1000, () => this.scene.start('replaygameplay'));
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
            this.time.delayedCall(1000, () => this.scene.start('mainmenugameplay'));
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
            this.time.delayedCall(1000, () => this.scene.start('level2gameplay'));
        });

        // creating conveyor and adding physics to it
        this.conveyor = this.add.rectangle(450, 300, 900, 40, 0x666666);
        this.physics.add.existing(this.conveyor, true);
        this.conveyorSpeed = 100;
        this.conveyor.body.setSize(900, 40);

        // creating test icon
        let testItem = new AlienBun(this, 20, 0, 'alienbuns'); 

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

//Alien Bun prefab object
class AlienBun extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'alienbuns');

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
