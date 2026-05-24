'use strict';

const game = new Phaser.Game({
    width: 1920,
    height: 1080,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [mainMenu],
    title: "Placeholder Title",
});