class Summary extends Phaser.Scene{
    constructor(){
        super('summary')
    }

    init(data){
        this.levelkey = Number(data.level);
    }

    preload(){
        this.load.path = 'assets/images/';
        this.load.image('retry', 'icons/retry.png');
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

        this.totalDishesLevel1 = window.levelItemsCount[1].sushi + window.levelItemsCount[1].burger;
        this.totalDishesLevel2 = window.levelItemsCount[2].sushi + window.levelItemsCount[2].burger + window.levelItemsCount[2].pizza;
        this.totalDishesLevel3 = window.levelItemsCount[3].sushi + window.levelItemsCount[3].burger + window.levelItemsCount[3].pizza + window.levelItemsCount[3].parfait;

        window.totalDishes = this.totalDishesLevel1 + this.totalDishesLevel2 + this.totalDishesLevel3;

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

        //level food items required and total dishes
        if(this.levelkey === 1){
            this.add.text(centerX, centerY - 90, `
Dishes Needed:

${window.levelData[this.levelkey].requiredSushi} Alien Sushi
${window.levelData[this.levelkey].requiredBurger} Alien Burger`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

            //total dishes made
            this.add.text(centerX, centerY + 170, `Dishes Made: ${this.totalDishesLevel1}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);
        };

        if(this.levelkey === 2){
            this.add.text(centerX, centerY - 90, `
Dishes Needed:

${window.levelData[this.levelkey].requiredSushi} Alien Sushi
${window.levelData[this.levelkey].requiredBurger} Alien Burger
${window.levelData[this.levelkey].requiredPizza} Alien Pizza`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

            //total dishes made
            this.add.text(centerX, centerY + 170, `Dishes Made: ${this.totalDishesLevel2}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);
        };

        if(this.levelkey === 3){
            this.add.text(centerX, centerY - 70, `
Dishes Needed:

${window.levelData[this.levelkey].requiredSushi} Alien Sushi
${window.levelData[this.levelkey].requiredBurger} Alien Burger
${window.levelData[this.levelkey].requiredPizza} Alien Pizza
${window.levelData[this.levelkey].requiredParfait} Alien Parfait`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);

            //total dishes made
            this.add.text(centerX, centerY + 170, `Dishes Made: ${this.totalDishesLevel3}`, {
                fontSize: '38px',
                color: '#ffffff'
            })
            .setOrigin(0.5, 0.5);
        };

        //Time finish
        this.add.text(centerX, centerY + 110, `Time: ${this.formatTime(window.levelData[this.levelkey].time)}`, {
            fontSize: '38px',
            color: '#ffffff'
        })
        .setOrigin(0.5, 0.5);

        //retry - always show
        this.add.image(centerX - 150, centerY + 280, 'retry')
        .setScale(3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.stop('summary');
            this.scene.start(window.levelData[this.levelkey].currLevel);
        });

        //continue to next level if under time limit
        if(window.levelData[this.levelkey].time < window.levelData[this.levelkey].limit){
            this.add.text(centerX + 40, centerY + 260, 'Continue', {
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