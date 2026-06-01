class Summary extends Phaser.Scene{
    constructor(){
        super('summary')
    }

    init(data){
        this.levelkey = Number(data.level);
    }

    create(){
        //make sure audio scene is running so the mute button is available
        if(!this.scene.isActive('audio')){
            this.scene.launch('audio');
        } else {
            this.scene.bringToTop('audio');
        }

        this.cameras.main.setBackgroundColor('#000000');

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        //starry bacckground
        for(let i = 0; i < 100; i++) {
            let star = this.add.circle(
                Phaser.Math.Between(0, 1920),
                Phaser.Math.Between(0, 1080),
                Phaser.Math.Between(1, 3),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 1)
            );

            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: Phaser.Math.Between(500, 1500),
                yoyo: true,
                repeat: -1
            });
        };

        this.add.rectangle(centerX, centerY, 600, 800, 0x1111111, 0.8);

        this.totalTime = window.levelData[1].time + window.levelData[2].time + window.levelData[3].time;


        //level title
        this.add.text(centerX, centerY - 280, `level ${this.levelkey}`, {
            fontSize: '48px',
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //Level time limit
            this.add.text(centerX, centerY - 200, `Time Limit: ${this.formatTime(window.levelData[this.levelkey].limit)}`, {
                fontSize: '38px', 
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

        if(this.levelkey === 3){
            //level 1 time finish
            this.add.text(centerX, centerY - 100, `Level 1 Time: ${this.formatTime(window.levelData[1].time)}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

            //level 2 time finish
            this.add.text(centerX, centerY, `Level 2 Time: ${this.formatTime(window.levelData[2].time)}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);
            //level 3 time finish
            this.add.text(centerX, centerY + 100, `Level 3 Time: ${this.formatTime(window.levelData[3].time)}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

            //total time finish
            this.add.text(centerX, centerY + 200, `Total Time: ${this.formatTime(this.totalTime)}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

        } else {
            //Time finish
            this.add.text(centerX, centerY + 40, `Time: ${this.formatTime(window.levelData[this.levelkey].time)}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);
        }

        //retry - always show
        this.add.text(centerX - 200, centerY + 280, 'Retry', {
            fontSize: '38px', 
            color: '#f70909'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.stop('summary');
            this.scene.start(window.levelData[this.levelkey].currLevel);
        })

        //continue to next level if under time limit
        if(window.levelData[this.levelkey].time < window.levelData[this.levelkey].limit){
            this.add.text(centerX + 50, centerY + 280, 'Continue', {
                fontSize: '38px', 
                color: '#09f709'
            })
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.stop('summary');
                    this.scene.start(window.levelData[this.levelkey].nextLevel);
                });
            });
        };
    }

    formatTime(seconds){
        const minute = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minute}:${secs.toString().padStart(2, 0)}`;
    }
}