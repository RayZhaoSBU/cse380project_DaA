class AboutScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.ABOUT
        });
    }
    init(back_key) {
        this.backScene = back_key;
    }

    preload() {

    }

    create() {
        var sound=this.sound.add(NAME.AUDIO.BGM);
        sound.setLoop(true);
        sound.play();

        var click =this.sound.add(NAME.AUDIO.CLICK);

        console.log("about create");
        var thisSence = this;
        var sceneManage = this.scene;

        var logoScale = 0.6;
        var logo = this.add.image(TopDownGame.game.renderer.width / 2, TopDownGame.game.renderer.height / 2 - 100, NAME.IMAGE.LOGO);
        logo.setDisplaySize(Math.floor(logo.width * logoScale), Math.floor(logo.height * logoScale));
        logo.setAlpha(0.2)

        var titleScale = 0.8;
        var titleAlign = 200;
        var tileSpacing = 100;
        var about = this.add.image(null, null, NAME.IMAGE.ABOUT_US);
        about.setDisplaySize(Math.floor(about.width * titleScale), Math.floor(about.height * titleScale));
        about.x = about.displayWidth / 2 + titleAlign;
        about.y = about.displayHeight / 2 + tileSpacing;

        var subTitleScale = 0.5;
        var subtitleAlign = titleAlign + 50;
        var subtileSpacing = 700;
        var back = this.add.image(null, null, NAME.IMAGE.BACK);
        var backWidth = back.width * subTitleScale;
        var backkHeight = back.height * subTitleScale;
        back.setDisplaySize(Math.floor(backWidth), Math.floor(backkHeight));
        back.x = back.displayWidth / 2 + subtitleAlign;
        back.y = subtileSpacing;
        back.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            sound.stop();
            sceneManage.start(thisSence.backScene);
        })
        back.on('pointerover' , function(pointer){
            click.play();
            back.setDisplaySize(Math.floor(backWidth + 16), Math.floor(backkHeight + 9));
        })
        back.on('pointerout' , function(pointer){
            back.setDisplaySize(Math.floor(backWidth), Math.floor(backkHeight));
        })

        var textX = 500;
        var textY = 275;
        this.text = this.add.text(textX, textY, HELP_TEXT.ABOUT_US, {
            font: '32px Arial',
            fill: '#000000'
        });
    }

    update() {
            
    }
}