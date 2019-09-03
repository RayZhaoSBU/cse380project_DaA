class HelpScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.HELP
        });
    }
    init(back_key) {
        this.backScene = back_key;
    }

    preload() {

    }

    create() {

        
        var click=this.sound.add(NAME.AUDIO.CLICK);


        var sound=this.sound.add(NAME.AUDIO.BGM);
        sound.setLoop(true);
        sound.play();

        var thisSence = this;
        var sceneManage = this.scene;

        //LOGO
        var logoScale = 0.6;
        var logo = this.add.image(null, null, NAME.IMAGE.LOGO);
        logo.setDisplaySize(Math.floor(logo.width * logoScale), Math.floor(logo.height * logoScale));
        logo.x = TopDownGame.game.renderer.width - logo.displayWidth / 2 - 200;
        logo.y = TopDownGame.game.renderer.height / 2;
        logo.setAlpha(0.2)
        
        //HELP
        var titleScale = 0.8;
        var titleAlign = 200;
        var tileSpacing = 100;
        var help = this.add.image(null, null, NAME.IMAGE.HELP);
        help.setDisplaySize(Math.floor(help.width * titleScale), Math.floor(help.height * titleScale));
        help.x = help.displayWidth / 2 + titleAlign;
        help.y = help.displayHeight / 2 + tileSpacing;
        
        //STORY
        var subTitleScale = 0.5;
        var subtitleAlign = titleAlign + 50;
        var subtileSpacing = 60;
        var story = this.add.image(null, null, NAME.IMAGE.STORY);
        var storyWidth = story.width * subTitleScale;
        var storyHeight = story.height * subTitleScale;
        story.setDisplaySize(Math.floor(storyWidth), Math.floor(storyHeight));
        story.x = story.displayWidth / 2 + subtitleAlign;
        story.y = help.y + help.displayHeight / 2 + story.displayHeight / 2 + subtileSpacing;
        story.setScrollFactor(0);
        story.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            thisSence.text.setText(HELP_TEXT.STORY).style;
        });
        story.on('pointerover' , function(pointer){
            click.play();
            story.setDisplaySize(Math.floor(storyWidth + 16), Math.floor(storyHeight + 9));
        })
        story.on('pointerout' , function(pointer){
            story.setDisplaySize(Math.floor(storyWidth), Math.floor(storyHeight));
        })

        //CASTLE
        var castle = this.add.image(null, null, NAME.IMAGE.CASTLE);
        var castleWidth = castle.width * subTitleScale;
        var castleHeight = castle.height * subTitleScale;
        castle.setDisplaySize(Math.floor(castleWidth), Math.floor(castleHeight));
        castle.x = castle.displayWidth / 2 + subtitleAlign;
        castle.y = story.y + story.displayHeight / 2 + castle.displayHeight / 2 + subtileSpacing;
        castle.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            thisSence.text.setText(HELP_TEXT.CASTLE);
        });
        castle.on('pointerover' , function(pointer){
            click.play();
            castle.setDisplaySize(Math.floor(castleWidth + 16), Math.floor(castleHeight + 9));
        })
        castle.on('pointerout' , function(pointer){
            castle.setDisplaySize(Math.floor(castleWidth), Math.floor(castleHeight));
        })

        //BARRACK
        var barrack = this.add.image(null, null, NAME.IMAGE.BARRACK);
        var barrackWidth = barrack.width * subTitleScale;
        var barrackHeight = barrack.height * subTitleScale;
        barrack.setDisplaySize(Math.floor(barrackWidth), Math.floor(barrackHeight));
        barrack.x = barrack.displayWidth / 2 + subtitleAlign;
        barrack.y = castle.y + castle.displayHeight / 2 + barrack.displayHeight / 2 + subtileSpacing;
        barrack.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            thisSence.text.setText(HELP_TEXT.BARRACK);
        })
        barrack.on('pointerover' , function(pointer){
            click.play();
            barrack.setDisplaySize(Math.floor(barrackWidth + 16), Math.floor(barrackHeight + 9));
        })
        barrack.on('pointerout' , function(pointer){
            barrack.setDisplaySize(Math.floor(barrackWidth), Math.floor(barrackHeight));
        })
  
        //SPELL
        var spells = this.add.image(null, null, NAME.IMAGE.SPELLS);
        var spellsWidth = spells.width * subTitleScale;
        var spellskHeight = spells.height * subTitleScale;
        spells.setDisplaySize(Math.floor(spellsWidth), Math.floor(spellskHeight));
        spells.x = spells.displayWidth / 2 + subtitleAlign;
        spells.y = barrack.y + barrack.displayHeight / 2 + spells.displayHeight / 2 + subtileSpacing;
        spells.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            thisSence.text.setText(HELP_TEXT.SPELLS);
        })
        spells.on('pointerover' , function(pointer){
            click.play();
            spells.setDisplaySize(Math.floor(spellsWidth + 16), Math.floor(spellskHeight + 9));
        })
        spells.on('pointerout' , function(pointer){
            spells.setDisplaySize(Math.floor(spellsWidth), Math.floor(spellskHeight));
        })

        //CREEPS
        var creeps = this.add.image(null, null, NAME.IMAGE.CREEPS);
        var creepsWidth = creeps.width * subTitleScale;
        var creepskHeight = creeps.height * subTitleScale;
        creeps.setDisplaySize(Math.floor(creepsWidth), Math.floor(creepskHeight));
        creeps.x = creeps.displayWidth / 2 + subtitleAlign;
        creeps.y = spells.y + spells.displayHeight / 2 + creeps.displayHeight / 2 + subtileSpacing;
        creeps.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            click.play();
            thisSence.text.setText(HELP_TEXT.CREEPS);
        })
        creeps.on('pointerover' , function(pointer){
            click.play();
            creeps.setDisplaySize(Math.floor(creepsWidth + 16), Math.floor(creepskHeight + 9));
        })
        creeps.on('pointerout' , function(pointer){
            creeps.setDisplaySize(Math.floor(creepsWidth), Math.floor(creepskHeight));
        })

        //BACK
        var back = this.add.image(null, null, NAME.IMAGE.BACK);
        var backWidth = back.width * subTitleScale;
        var backkHeight = back.height * subTitleScale;
        back.setDisplaySize(Math.floor(backWidth), Math.floor(backkHeight));
        back.x = back.displayWidth / 2 + subtitleAlign;
        back.y = creeps.y + creeps.displayHeight / 2 + back.displayHeight / 2 + subtileSpacing;
        back.setInteractive().on('pointerup', function(pointer, localX, localY, event){
            console.log(thisSence.backScene);
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


        var textX = 800;
        var textY = 250;
        this.text = this.add.text(textX, textY, null, {
            font: '35px Arial',
            fill: '#000000'
        });

    }

    update() {
        
    }


}