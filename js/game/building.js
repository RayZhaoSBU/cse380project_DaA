class BuildingFactory{
    constructor(scene, image, scale, type){
        this.scene = scene;
        this.image = image;
        this.type = type;
        this.scale = scale==null ? 1 : scale;
    }

    create(x, y, player, maxHealth){
        var pixel = 32; 
        var sprite = this.scene.add.sprite(x * pixel, y * pixel, this.image);
        sprite.setScale(this.scale);
        var building = new Building(this.scene, sprite, this.type, player, x, y);
        building.init(maxHealth);
        building.playAnim(this.type + BUILDING_STATUS.GOOD);
        return building;
    }

    init(){
        if(this.type == BUILDING_TYPE.CASTLE){
            this.scene.anims.create({
                key: 'castlegood',
                frames: [{key: this.image, frame: 1}],
                frameRate: 1,
            });
    
            this.scene.anims.create({
                key: 'castlebad',
                frames: [{key: this.image, frame: 0}],
                frameRate: 1,
            });
        }else{
            this.scene.anims.create({
                key: 'barrackgood',
                frames: [{key: this.image, frame: 1}],
                frameRate: 1,
            });
    
            this.scene.anims.create({
                key: 'barrackbad',
                frames: [{key: this.image, frame: 0}],
                frameRate: 1,
            });
        }
        return this;
    }
}

BUILDING_TYPE = {
    BARRACK:    'barrack',
    CASTLE:     'castle'
}

BUILDING_STATUS = {
    GOOD:      'good',
    BAD:       'bad'    
}


class Building{
    constructor(scene, sprite, type, player, gridX, gridY){;
        this.scene = scene;
        this.player = player;
        this.sprite = sprite;
        this.type = type;
        this.gridX = gridX;
        this.gridY = gridY;
        this.isDied = false;
    } 

    init(maxHealth){
        this.maxHealth = maxHealth
        this.health = maxHealth; 
        return this;
    } 
    playAnim(anims){
        this.sprite.play(anims);
    }

    damaged(game, fromTarget, damage){
        this.health = this.health - 1;
        fromTarget.die(game, this);
        if(this.health <= 0){
            this.health = 0;
            this.die(game, fromTarget);
        }
    }

    die(game, killer){
        this.isDied = true;
        var anims =  this.type + BUILDING_STATUS.BAD;
        this.playAnim(anims);

        if (this.type != BUILDING_TYPE.CASTLE) return;
        this.scene.sound.add(NAME.AUDIO.DESTROYED).play();
        this.scene.sound.add(NAME.AUDIO.STONEFALLING).play();
        this.scene.time.addEvent({
            delay: 2000,                // ms
            callback: (scene, player, type)=>{
                if(player.id == TEAM.HOST){
                    var tmp = this.scene.add.image(1600/2, 350, NAME.IMAGE.PLAYER_A);
                    tmp.setScale(.7)
                }else{
                    var tmp = this.scene.add.image(1600/2, 350, NAME.IMAGE.PLAYER_B)
                    tmp.setScale(.7)
                }
                this.scene.add.image(1600/2, 500, NAME.IMAGE.VICTORY);
                scene.sound.add(NAME.AUDIO.LOSE1).play();
                scene.sound.add(NAME.AUDIO.LOSE2).play();
            },
            args: [this.scene, this.player, this.type],
        });
    }

}