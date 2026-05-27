'use strict';
//Global mute shared across all scenes
window.isMuted = false;

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [logoScene, loadingScene, mainMenu, Level1, Credits, ReplayScene, Audio],
    //scene: [mainMenu, Level1, ReplayScene, Credits],
    title: "Placeholder Title",
});
