class FinalScore extends Phaser.Scene{
    constructor(){
        super('finalscore');
    }

    preload(){
        this.load.path = 'assets/images/';
        this.load.image('home', 'icons/home.png');
    }

    create(){
        this.scene.stop('options');
        this.scene.stop('levelselect');
        //make sure audio scene is running so the mute button is available
        if(!this.scene.isActive('audio')){
            this.scene.launch('audio');
        } else {
            this.scene.bringToTop('audio');
        }

        this.cameras.main.setBackgroundColor('#000000');

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.totalTime = window.levelData[1].time + window.levelData[2].time + window.levelData[3].time;

        this.MaxTime = window.levelData[1].limit + window.levelData[2].limit + window.levelData[3].limit;

        this.bestTime = localStorage.getItem('bestTime');
        

        if(this.bestTime === null){
            localStorage.setItem('bestTime', this.MaxTime);
            this.bestTime = this.MaxTime;
        };
        
        if(this.totalTime < Number(this.bestTime)) {
            localStorage.setItem('bestTime', this.totalTime);
            this.bestTime = this.totalTime;
        };


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

        //score background
        this.add.rectangle(centerX, centerY, 600, 800, 0x1111111, 0.8);

         //Final Score title
        this.add.text(centerX, centerY - 290, 'Final Score', {
            font: "48px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //level 1 time finish
        this.add.text(centerX, centerY - 200, `Level 1 Time: ${this.formatTime(window.levelData[1].time)}`, {
            font: "38px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //level 2 time finish
        this.add.text(centerX, centerY - 120, `Level 2 Time: ${this.formatTime(window.levelData[2].time)}`, {
            font: "38px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //level 3 time finish
        this.add.text(centerX, centerY - 40, `Level 3 Time: ${this.formatTime(window.levelData[3].time)}`, {
            font: "38px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //total time finish
        this.add.text(centerX, centerY + 50, `Total Time: ${this.formatTime(this.totalTime)}`, {
            font: "38px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //total dishes
        this.add.text(centerX, centerY + 120, `Total Dishes Made: ${window.totalDishes}`, {
            font: "38px Pixelify Sans",
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //best Time
         this.add.text(centerX, centerY + 200, `Best Time: ${this.formatTime(this.bestTime)}`, {
            font: "38px Pixelify Sans",
            color: '#ffd502'
        })
        .setOrigin(0.5, 0.5);

        //  //menu
        // this.add.text(centerX - 200, centerY + 280, 'Menu', {
        //     font: "38px Pixelify Sans",
        //     color: '#f70909'
        // })
        // .setInteractive()
        // .on('pointerdown', () => {
        //     this.scene.stop('finalscore');
        //     this.scene.start('mainmenu');
        // });

        //home icon for menu
         this.add.image(centerX - 160, centerY + 290, 'home')
        .setInteractive()
        .on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.stop('finalscore');
                this.scene.start('mainmenu');  
            });
        });

        //continue to credits
        this.add.text(centerX + 50, centerY + 280, 'Continue', {
            font: "38px Pixelify Sans",
            color: '#09f709'
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.stop('finalscore');
                this.scene.start('credits');
            });
        });

        //resets local storage - best time and mute state
        this.add.text(1400, 50, 'Reset local storage', {
            font: "38px Pixelify Sans",
            color: '#f70303'
        })
        .setInteractive()
        .on('pointerdown', () => {
            localStorage.clear();
        });
    }

    formatTime(seconds){
        const minute = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minute}:${secs.toString().padStart(2, 0)}`;
    }
}