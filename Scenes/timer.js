class Timer extends Phaser.Scene{
    constructor(){
        super('timer')
    }

    preload(){
        this.load.audio('ticker', 'assets/audio/timer-ticks.mp3');
        this.load.audio('alarm', 'assets/audio/kitchen-timer-alarm.mp3');
    }

    init(data){
        this.total = data.totalSeconds;
        this.remaining = data.totalSeconds;
        this.levelkey = data.levelkey;
        this.finished = false;
        this.halfTriggered = false;
        this.quaterTriggered = false;
    }

    create(){
        const w = this.scale.width;

        this.redBar = this.add.rectangle(0, 0, w, 5, 0xff2222)
            .setOrigin(0, 0)
            .setDepth(100);

        this.timerText = this.add.text(w / 2, 50, this.formatTime(this.total), {
            fontSize: '24px',
            color: '#ffffff',
        })
            .setOrigin(0.5)
            .setDepth(101);

        this.ticker = this.sound.add('ticker', {loop: true, volume: 0.5});
        this.ticker.addMarker({
            name: 'tick-loop',
            start: 0,
            duration: 1,
            config: {loop: true, volume: 0.3}
        });
        this.ticker.play('tick-loop');
        this.alarm = this.sound.add('alarm', {loop: true, volume: 0.3});

        //force stop
        this.add.text(w / 2, 100, 'STOP', {
            fontSize: '42px',
            color: '#f80202',
        })
        .setOrigin(0.5)
        .setDepth(101)
        .setInteractive()
        .on('pointerdown', () => {
            this.timeUp();
        });
    }

    update(time, delta){
        if(this.finished) {
            return;
        };

        this.remaining = Math.max(0, this.remaining - (delta / 1000));

        const progress = this.remaining / this.total;
        const w = this.scale.width;

        this.redBar.width = w * progress;
        this.timerText.setText(this.formatTime(this.remaining));

        //Speed up at half way - orange warning
        if(!this.halfTriggered && this.remaining <= this.total / 2){
            this.halfTriggered = true;
            this.tweens.add({
                targets: this.ticker,
                rate: 1.2,
                duration: 100, 
                ease: 'linear'
            });
            this.timerText.setTint(0xf27500);
        };
        //Speed up at quater time - red flashing
        if(!this.quaterTriggered && this.remaining <= this.total / 4){
            this.quaterTriggered = true;
            this.tweens.add({
                targets: this.ticker,
                rate: 1.4,
                duration: 100, 
                ease: 'linear'
            });
            this.timerText.setTint(0xf20000);
            this.tweens.add({
                targets: this.timerText,
                alpha: 0.5, 
                duration: 400, 
                ease:'linear',
                yoyo: true,
                loop: -1
            });
        };

        if(this.remaining <= 0){
                this.timeUp();
            };
    }

    formatTime(seconds){
        const minute = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minute}:${secs.toString().padStart(2, 0)}`;
    }

    //called from the game scene when player completes win condition
    completed(){
        this.finished = true;
        this.ticker.stop();
        this.tweens.killTweensOf(this.timerText);
        window.levelData[this.levelkey].time = this.remaining;
        this.tempSummary();
    }

    //called when countdown hits zero
    timeUp(){
        this.finished = true;
        this.ticker.stop();
        this.alarm.play();
        this.tweens.killTweensOf(this.timerText);
        window.levelData[this.levelkey].time = this.remaining;
        this.time.delayedCall(3000, () => {
            this.alarm.stop();
        });
        this.tempSummary();
    }

    tempSummary(){
        const w = this.scale.width;
        const h = this.scale.height;

        this.add.rectangle(w / 2, h /2, 400, 200, 0x6b6b6b, 0.8)
            .setDepth(200);
        this.add.text(w / 2, h / 2, 
`Level ${this.levelkey} Complete!

Time: ${this.formatTime(this.remaining)}`, {
    fontSize: '24px',
    color: '#04d018'
})
    .setOrigin(0.5)
    .setDepth(201);
    }

}