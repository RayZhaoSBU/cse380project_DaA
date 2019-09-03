class PauseScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.PAUSE,
        });
    }

    init(sound) {
        this.bgsound = sound;
    }

    create() {

        var click=this.sound.add(NAME.AUDIO.CLICK);
        var sound = this.bgsound;
        var rect = new Phaser.Geom.Rectangle(0, 0, TopDownGame.game.renderer.width/2, TopDownGame.game.renderer.height);
        var graphics = this.add.graphics({ fillStyle: { color: 0x808080 } });
        graphics.fillRectShape(rect);
        graphics.setAlpha(0.3);


        var sceneManage = this.scene;

        
        //MENU
        var subTitleScale = 0.6;
        var subtitleAlign = 200;
        var subtileSpacing = 80;
        var menu = this.add.image(null, null, NAME.IMAGE.MAIN_MENU);
        var menuWidth = menu.width * subTitleScale;
        var menuHeight = menu.height * subTitleScale;
        menu.setDisplaySize(Math.floor(menu.width * subTitleScale), Math.floor(menu.height * subTitleScale));
        menu.x = menu.displayWidth / 2 + subtitleAlign;
        menu.y = TopDownGame.game.renderer.height/5 + menu.displayHeight / 2 + subtileSpacing;
        menu.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sound.stop();
            sceneManage.stop(NAME.SCENES.PLAY);
            sceneManage.start(NAME.SCENES.MENU);

        })
        menu.on('pointerover' , function(pointer){
            click.play();
            menu.setDisplaySize(Math.floor(menuWidth + 16), Math.floor(menuHeight + 9));
        })
        menu.on('pointerout' , function(pointer){
            menu.setDisplaySize(Math.floor(menuWidth), Math.floor(menuHeight));
        })
        
        //NEW GAME

        var newGame = this.add.image(null, null, NAME.IMAGE.NEW_GAME);
        var newWidth = newGame.width * subTitleScale;
        var newHeight = newGame.height * subTitleScale;
        newGame.setDisplaySize(Math.floor(newGame.width * subTitleScale), Math.floor(newGame.height * subTitleScale));
        newGame.x = newGame.displayWidth / 2 + subtitleAlign;
        newGame.y = menu.y + menu.displayHeight / 2 + newGame.displayHeight / 2 + subtileSpacing;
        newGame.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sound.stop();
            sceneManage.start(NAME.SCENES.PLAY, NAME.SCENES.PAUSE)
        })
        newGame.on('pointerover' , function(pointer){
            click.play();
            newGame.setDisplaySize(Math.floor(newWidth + 16), Math.floor(newHeight + 9));
        })
        newGame.on('pointerout' , function(pointer){
            newGame.setDisplaySize(Math.floor(newWidth), Math.floor(newHeight));
        })
        
        //PAUSE -RESUME
        var resume = this.add.image(null, null, NAME.IMAGE.BACK);
        var resumeWidth = resume.width * subTitleScale;
        var resumekHeight = resume.height * subTitleScale;
        resume.setDisplaySize(Math.floor(resume.width * subTitleScale), Math.floor(resume.height * subTitleScale));
        resume.x = resume.displayWidth / 2 + subtitleAlign;
        resume.y = newGame.y + newGame.displayHeight / 2 + resume.displayHeight / 2 + subtileSpacing;
        resume.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sceneManage.bringToTop(NAME.SCENES.PLAY);
            sceneManage.resume(NAME.SCENES.PLAY)
        })


        resume.on('pointerover' , function(pointer){
            click.play();
            resume.setDisplaySize(Math.floor(resumeWidth + 16), Math.floor(resumekHeight + 9));
        })
        resume.on('pointerout' , function(pointer){
            resume.setDisplaySize(Math.floor(resumeWidth), Math.floor(resumekHeight));
        })

        
    }

    update() {

    }
}