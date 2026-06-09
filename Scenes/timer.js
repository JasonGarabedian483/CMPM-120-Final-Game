class Timer extends Phaser.Scene{
    constructor(){
        super('timer')
    }

    preload(){
        this.load.audio('alarm', 'assets/audio/kitchen-timer-alarm.mp3');
    }

    init(data){
        window.levelData[data.levelkey].limit = data.totalSeconds
        this.total = data.totalSeconds; //the time limit
        this.elapsed = 0;   //counts up from zero
        this.levelkey = data.levelkey;
        this.finished = false;

        this.halfTriggered = false;
        this.quaterTriggered = false;

        this.tickAccum = 0; //counts ms between ticks
        this.tickInterval = 1000; //ms - speeds up at half/quarter
    }

    create(){
        const w = this.scale.width;

        this.redBar = this.add.rectangle(0, 0, 0, 5, 0xff2222)
            .setOrigin(0, 0)
            .setDepth(100);

        this.timerText = this.add.text(w / 2, 50, this.formatTime(0), {
            font: '30px Pixelify Sans',
            color: '#ffffff',
        })
            .setOrigin(0.5)
            .setDepth(101);
        
        //Tone.Synth generates a clean beep sound entirely in code
        //oscillator: 'sine' is the smoothes tone
        //decay controls how long each beep last before fading out
        //sustain: 0 means the sound doesn't hold - its a short blip
        //Tone.gainToDb converts our volume (0 to 1) into decibels for the synth's volume control
        this.tickSynth = new Tone.Synth({
            oscillator: {type: 'sine'},
            envelope: {attack: 0.001, decay: 0.08, sustain: 0, release: 0.05},
            volume: Tone.gainToDb(window.volume.ticker)
        }).toDestination();

        this.alarm = this.sound.add('alarm', {loop: true, volume: window.volume.alarm});

    }

    update(time, delta){
        //delta is the ms since the last frame
        if(this.finished) {
            return;
        };

        this.elapsed = Math.min(this.total, this.elapsed + (delta / 1000));

        //progress goes 0 to 1 as elapsed approaches the limit
        const progress = this.elapsed / this.total;
        const w = this.scale.width;

        this.redBar.width = w * progress;
        this.timerText.setText(this.formatTime(this.elapsed));

        //fire the tick synth on the current interval
        this.tickAccum += delta;
        if(this.tickAccum >= this.tickInterval){
            this.tickAccum = 0;
            this.tickSynth.triggerAttackRelease('A4', '16n');
        }

        //Speed up at half way - orange warning
        if(!this.halfTriggered && this.elapsed >= this.total * 0.50){
            this.halfTriggered = true;
            this.tickInterval = 600; //1.5x faster
            this.timerText.setTint(0xf27500);
        };
        //Speed up at quater time - red flashing
        if(!this.quaterTriggered && this.elapsed >= this.total * 0.75){
            this.quaterTriggered = true;
            this.tickInterval = 350; //3x faster
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

        if(this.elapsed >= this.total){
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
        //this.ticker.stop();
        this.tickSynth.disconnect(); //stop the synth cleanly
        this.tweens.killTweensOf(this.timerText);
        window.levelData[this.levelkey].time = this.elapsed;

        this.time.delayedCall(2000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.launch('summary', {level: this.levelkey}));
        });
    }

    //called when countdown hits zero
    timeUp(){
        this.finished = true;
        //this.ticker.stop();
        this.tickSynth.disconnect();
        this.alarm.play();
        this.tweens.killTweensOf(this.timerText);
        window.levelData[this.levelkey].time = this.total;
        this.time.delayedCall(2000, () => {
            this.alarm.stop();
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.launch('summary', {level: this.levelkey}));
        });
    }

    tempSummary(){
        const w = this.scale.width;
        const h = this.scale.height;

        this.add.rectangle(w / 2, h /2, 400, 200, 0x6b6b6b, 0.8)
            .setDepth(200);
        this.add.text(w / 2, h / 2, 
`Level ${this.levelkey} Complete!

Time: ${this.formatTime(window.levelData[this.levelkey].time)}`, {
    font: '24px Pixelify Sans',
    color: '#04d018'
})
    .setOrigin(0.5)
    .setDepth(201);
    }

}