'use strict';
//Global mute shared across all scenes
window.isMuted = false;
window.levelData = {
    1: {time: 0},
    2: {time: 0},
    3: {time: 0}
};

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [logoScene, loadingScene, mainMenu, Level1, Credits, ReplayScene, Audio, Timer],
    //scene: [Level1],
    title: "Placeholder Title",
});
