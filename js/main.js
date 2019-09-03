var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    backgroundColor: 0xffffff,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    audio: {
        disableWebAudio: true,
        noAudio: false
    },
    scene: [
        SplashScene,
        MainMenuScene,
        HelpScene,
        PlayScene,
        AboutScene,
        PauseScene,
        MatchScene
    ]
};  
 
 TopDownGame.game = new Phaser.Game(config);

