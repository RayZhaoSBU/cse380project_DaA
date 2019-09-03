class SplashScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.LOAD
        });
    }

    init() {
        console.log("SplashScene init");
    }

    preload() {
        this.loadImages();
        this.loadTileMap();
        this.loadAudio();

        var loadingBar = this.add.graphics({
            fillStyple: {
                color: 0x000000
            }
        })
        this.load.on("progress", function (perc) {
            loadingBar.fillRect(0, TopDownGame.game.renderer.height/2, TopDownGame.game.renderer.width * perc, 50);
        })
    }

    create() {
        var logoScale = 0.6;
        var logo = this.add.image(TopDownGame.game.renderer.width / 2, TopDownGame.game.renderer.height / 2 - 100, NAME.IMAGE.LOGO);
        logo.setDisplaySize(Math.floor(logo.width * logoScale), Math.floor(logo.height * logoScale));

        var title = this.add.image(TopDownGame.game.renderer.width / 2, logo.y + logo.displayHeight / 2 + 20, NAME.IMAGE.TITLE);

        var touchScale = 0.3;
        var touch = this.add.image(TopDownGame.game.renderer.width / 2, title.y + title.displayHeight / 2 + 20, NAME.IMAGE.TOUCH);
        touch.setDisplaySize(Math.floor(touch.width * touchScale), Math.floor(touch.height * touchScale));
        
        var timedEvent = this.time.addEvent({ delay: 500, callback: function (){ touch.visible = !touch.visible }, callbackScope: this, loop: true }); 
        
        var sceneManage = this.scene;

        
        var sound = this.sound.add(NAME.AUDIO.MENU);

        sound.setLoop(true);
        sound.play();

        this.input.on('pointerup', function(){
            sound.stop();
            sceneManage.start(NAME.SCENES.MENU)
        });

    }

    loadImages(){
        this.load.setPath(NAME.PATH.WORDS)
        for (name in NAME.IMAGE){
            this.load.image(NAME.IMAGE[name], NAME.IMAGE[name]);
        }
        this.load.setPath(NAME.PATH.SPRITES);
        this.load.spritesheet(NAME.SPRITE.PAUSE, NAME.SPRITE.PAUSE, { frameWidth: 128, frameHeight: 128 });
       
        //melee
        this.load.spritesheet(NAME.SPRITE.MELEE_EARTH, NAME.SPRITE.MELEE_EARTH, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.MELEE_FIRE, NAME.SPRITE.MELEE_FIRE, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.MELEE_WATER, NAME.SPRITE.MELEE_WATER, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.MELEE_WIND, NAME.SPRITE.MELEE_WIND, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.MELEE_THUNDER, NAME.SPRITE.MELEE_THUNDER, { frameWidth: 128, frameHeight: 128 });

        //range
        this.load.spritesheet(NAME.SPRITE.RANGE_EARTH, NAME.SPRITE.RANGE_EARTH, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.RANGE_FIRE, NAME.SPRITE.RANGE_FIRE, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.RANGE_WATER, NAME.SPRITE.RANGE_WATER, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.RANGE_WIND, NAME.SPRITE.RANGE_WIND, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet(NAME.SPRITE.RANGE_THUNDER, NAME.SPRITE.RANGE_THUNDER, { frameWidth: 128, frameHeight: 128 });

        //spell
        this.load.spritesheet(NAME.SPRITE.SPELL_EARTH, NAME.SPRITE.SPELL_EARTH, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(NAME.SPRITE.SPELL_FIRE, NAME.SPRITE.SPELL_FIRE, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(NAME.SPRITE.SPELL_FIRE_A, NAME.SPRITE.SPELL_FIRE_A, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(NAME.SPRITE.SPELL_THUNDER, NAME.SPRITE.SPELL_THUNDER, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(NAME.SPRITE.SPELL_WATER, NAME.SPRITE.SPELL_WATER, { frameWidth: 32, frameHeight: 32 });
        
        //building
        this.load.spritesheet(NAME.SPRITE.BARRACK, NAME.SPRITE.BARRACK, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet(NAME.SPRITE.CASTLE, NAME.SPRITE.CASTLE, { frameWidth: 128, frameHeight: 128 });

        this.load.setPath(NAME.PATH.TILES);
        this.load.image(NAME.TILE.TILES, NAME.TILE.TILES);
    }

    loadTileMap(){
        this.load.setPath(NAME.PATH.JSON);
        this.load.tilemapTiledJSON(NAME.MAP.TILE_MAP, NAME.MAP.TILE_MAP);
    }


    loadAudio(){
        this.load.setPath(NAME.PATH.AUDIO)
        for (name in NAME.AUDIO){
            this.load.audio(NAME.AUDIO[name], [NAME.AUDIO[name] + '.ogg', NAME.AUDIO[name] + ".mp3"]);
        }
    }
}