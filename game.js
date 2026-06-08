'use strict';
//Global mute shared across all scenes
window.isMuted = localStorage.getItem('isMuted') === 'true';
window.volume = {
    music: 1, //background music
    alarm: 1, //alarm audio file
    ticker: 1,
}
window.levelData = {
    1: {time: 0, limit: 60, requiredSushi: 0, requiredBurger: 0, dishes: 0, currLevel: 'level1', nextLevel: 'level2'},
    2: {time: 0, limit: 45, requiredSushi: 0, requiredBurger: 0, requiredPizza: 0, dishes: 0, currLevel: 'level2', nextLevel: 'level3'},
    3: {time: 0, limit: 30, requiredSushi: 0, requiredBurger: 0, requiredPizza: 0, requiredParfait: 0, dishes: 0, currLevel: 'level3', nextLevel: 'finalscore'}
};
window.levelCompleted = {
    1: {completed: localStorage.getItem('level1Completed') === 'true'},
    2: {completed: localStorage.getItem('level2Completed') === 'true'},
    3: {completed: localStorage.getItem('level3Completed') === 'true'}
};
window.levelItemsCount = {
    1: {sushi: 0, burger: 0,},
    2: {sushi: 0, burger: 0, pizza: 0},
    3: {sushi: 0, burger: 0, pizza: 0, parfait: 0}
};
window.totalDishes = 0;

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        expandParent: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [logoScene, mainMenu, Level1, Level2, Level3, Credits, Audio, Timer, Summary, FinalScore, TestingUI, Options, LevelSelect],
    //scene: [FinalScore],
    title: "Galaxy Grub",
});
