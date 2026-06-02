'use strict';
//Global mute shared across all scenes
window.isMuted = false;
window.levelData = {
    1: {time: 0, limit: 60, currLevel: 'level1', nextLevel: 'level2'},
    2: {time: 0, limit: 45, currLevel: 'level2', nextLevel: 'level3'},
    3: {time: 0, limit: 30, currLevel: 'level3', nextLevel: 'credits'}
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
            //debug: true
        }
    },
    scene: [logoScene, loadingScene, mainMenu, Level1, Level2, Level3, Credits, ReplayScene, Audio, Timer, Summary, TestingUI],
    //scene: [Level2],
    title: "Placeholder Title",
});
