class MainMenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.MENU
        });
    }

    init(data) {
        console.log("MainMenuScene init")

    }

    create() {

        var sound=this.sound.add(NAME.AUDIO.BGM);
        sound.setLoop(true);
        sound.play();

        var click=this.sound.add(NAME.AUDIO.CLICK);

        var sceneManage = this.scene;

        var logoScale = 0.6;
        var logo = this.add.image(null, null, NAME.IMAGE.LOGO);
        logo.setDisplaySize(Math.floor(logo.width * logoScale), Math.floor(logo.height * logoScale));
        logo.x = TopDownGame.game.renderer.width - logo.displayWidth / 2 - 200;
        logo.y = TopDownGame.game.renderer.height / 2;
        
        //MENU
        var titleScale = 0.8;
        var titleAlign = 200;
        var tileSpacing = 100;
        var menu = this.add.image(null, null, NAME.IMAGE.MENU);
        menu.setDisplaySize(Math.floor(menu.width * titleScale), Math.floor(menu.height * titleScale));
        menu.x = menu.displayWidth / 2 + titleAlign;
        menu.y = menu.displayHeight / 2 + tileSpacing;
        
        //NEW GAME
        var subTitleScale = 0.6;
        var subtitleAlign = titleAlign + 50;
        var subtileSpacing = 80;
        var newGame = this.add.image(null, null, NAME.IMAGE.NEW_GAME);
        var newGameWidth = newGame.width * subTitleScale;
        var newGameHeight = newGame.height * subTitleScale;
        newGame.setDisplaySize(Math.floor(newGameWidth), Math.floor(newGameHeight));
        newGame.x = newGame.displayWidth / 2 + subtitleAlign;
        newGame.y = menu.y + menu.displayHeight / 2 + newGame.displayHeight / 2 + subtileSpacing + subtileSpacing;
        newGame.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            // sceneManage.start(NAME.SCENES.MATCH, NAME.SCENES.MENU)
            click.play();
            sound.stop();
            sceneManage.start(NAME.SCENES.PLAY, NAME.SCENES.MENU)
        })
        newGame.setInteractive().on('pointerover' , function(pointer){
            click.play();
            newGame.setDisplaySize(Math.floor(newGameWidth + 16), Math.floor(newGameHeight + 9));
        })
        newGame.setInteractive().on('pointerout' , function(pointer){
            newGame.setDisplaySize(Math.floor(newGameWidth), Math.floor(newGameHeight));
        })

        //HELP
        var help = this.add.image(null, null, NAME.IMAGE.HELP);
        var helpWidth = help.width * subTitleScale;
        var helpHeight = help.height * subTitleScale;
        help.setDisplaySize(Math.floor(helpWidth), Math.floor(helpHeight));
        help.x = help.displayWidth / 2 + subtitleAlign;
        help.y = newGame.y + newGame.displayHeight / 2 + help.displayHeight / 2 + subtileSpacing;
        help.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sound.stop();
            sceneManage.start(NAME.SCENES.HELP, NAME.SCENES.MENU)
        })
        help.setInteractive().on('pointerover' , function(pointer){
            click.play();
            help.setDisplaySize(Math.floor(helpWidth + 16), Math.floor(helpHeight + 9));
        })
        help.setInteractive().on('pointerout' , function(pointer){
            help.setDisplaySize(Math.floor(helpWidth), Math.floor(helpHeight));
        })

        //ABOUT
        var aboutUs = this.add.image(null, null, NAME.IMAGE.ABOUT_US);
        var aboutUsWidth = aboutUs.width * subTitleScale;
        var aboutUsHeight = aboutUs.height * subTitleScale;
        aboutUs.setDisplaySize(Math.floor(aboutUsWidth), Math.floor(aboutUsHeight));
        aboutUs.x = aboutUs.displayWidth / 2 + subtitleAlign;
        aboutUs.y = help.y + help.displayHeight / 2 + aboutUs.displayHeight / 2 + subtileSpacing;
        aboutUs.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sound.stop();
            sceneManage.start(NAME.SCENES.ABOUT, NAME.SCENES.MENU)
        })
        aboutUs.setInteractive().on('pointerover' , function(pointer){
            click.play();
            aboutUs.setDisplaySize(Math.floor(aboutUsWidth + 16), Math.floor(aboutUsHeight + 9));
        })
        aboutUs.setInteractive().on('pointerout' , function(pointer){
            aboutUs.setDisplaySize(Math.floor(aboutUsWidth), Math.floor(aboutUsHeight));
        })
    }

    update() {

    }
}