

class PlayScene extends Phaser.Scene{
    constructor() {
        super({
            key: NAME.SCENES.PLAY
        });
    }
    init() {

    }

    preload() {
        this.meleeAttackSound = new Array();
        this.meleeAttackSound.push(this.sound.add(NAME.AUDIO.CREEP1));
        this.meleeAttackSound.push(this.sound.add(NAME.AUDIO.CREEP2));
        this.meleeAttackSound.push(this.sound.add(NAME.AUDIO.CREEP3));
        this.clickSound = this.sound.add(NAME.AUDIO.CLICK);
        this.errorSound = this.sound.add(NAME.AUDIO.ERROR);
    }

    create() { 
        var click = this.clickSound;

        var sound=this.sound.add(NAME.AUDIO.BATTLE);
        sound.setLoop(true);
        sound.setVolume(.5);
        sound.play();

        this.createLayer();
        var sceneManage = this.scene;
       
        this.loadSpellsanims();
        var pause = this.add.sprite(TopDownGame.game.renderer.width /2, 836, NAME.SPRITE.PAUSE);

        this.anims.create({
            key: 'untouch',
            frames: [{key: NAME.SPRITE.PAUSE, frame: 2}],
            frameRate: 1,
        });

        this.anims.create({
            key: 'touch',
            frames: [{key: NAME.SPRITE.PAUSE, frame: 1}],
            frameRate: 1,
        });

        pause.setScale(0.5);
        
        pause.setInteractive().on('pointerover', function(pointer, localX, localY, event){
            click.play();
            pause.play("touch")
        });

        pause.setInteractive().on('pointerout', function(pointer, localX, localY, event){
            pause.play("untouch")
        });

        pause.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            pause.play("touch")
        });

        pause.setInteractive().on('pointerup', function(pointer, localX, localY, event){    
            click.play();
            pause.play("untouch");
            sceneManage.launch(NAME.SCENES.PAUSE, sound);
            sceneManage.bringToTop(NAME.SCENES.PAUSE);
            sceneManage.pause(NAME.SCENES.PLAY)
        });

        this.game = new Game(this);
        this.game.init();
        this.hostControl = new Control(this.game, this.game.host).initCreepBtn(this, 0.25, 0, -4, 48, 44,  25,-10);
        this.hostControl.initDisp(this, 0.25, 160, 45, 1600/10+100, 45, 190, 38, 290, 38);
        this.hostControl.initSpellBtn(this, 0.4, 900 - 72, -4, 80, 0,  -9, -8, -16, -50, -9, 32)

        this.guestControl = new Control(this.game, this.game.guest).initCreepBtn(this, 0.25, 0, 1600 + 4, -48, 44, -75,-10);
        this.guestControl.initDisp(this, 0.25, 1600 - 220, 45, 1600 - 332, 45, 1600 - 190, 38, 1600 - 306, 38);
        this.guestControl.initSpellBtn(this, 0.4, 900 - 72, 1600 + 4, -80, 0,  -9, -8, -16, -50, -9, 32);

        this.game.start();

        this.createHealthBar()
    }

    update() {
        this.game.startActionAll()
        this.hostControl.update();
        this.guestControl.update();
        this.updateHealthBar();
        this.game.updateTimer();
    }

    createLayer(){
        this.map = this.add.tilemap(NAME.MAP.TILE_MAP);
        var tiles = this.map.addTilesetImage(NAME.TILE.TILES);
        this[NAME.LAYER.BACKGROUND] = this.map.createStaticLayer(NAME.LAYER.BACKGROUND, tiles);
        this[NAME.LAYER.BLOCK]= this.map.createStaticLayer(NAME.LAYER.BLOCK, tiles);
        this.map.setCollisionBetween(1, 64, true, true, NAME.LAYER.BLOCK);
    }

    loadSpellsanims(){
        this.anims.create({
            key: NAME.SPRITE.SPELL_EARTH, 
            frames: this.anims.generateFrameNumbers( NAME.SPRITE.SPELL_EARTH, { start: 1, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: NAME.SPRITE.SPELL_FIRE, 
            frames: this.anims.generateFrameNumbers( NAME.SPRITE.SPELL_FIRE, { start: 1, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: NAME.SPRITE.SPELL_FIRE_A, 
            frames: this.anims.generateFrameNumbers( NAME.SPRITE.SPELL_FIRE_A, { start: 1, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: NAME.SPRITE.SPELL_THUNDER, 
            frames: this.anims.generateFrameNumbers( NAME.SPRITE.SPELL_THUNDER, { start: 1, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: NAME.SPRITE.SPELL_WATER, 
            frames: this.anims.generateFrameNumbers( NAME.SPRITE.SPELL_WATER, { start: 1, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }


    createHealthBar(){
        var x = 560;
        this.hostBHP = {
            icon : this.add.image(x, 40, NAME.IMAGE.BARRACK_ICON),
            background : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            backgroundFill : this.add.graphics({ fillStyle: { color: 0xe0e0e0 } }),
            hp : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            hpFill : this.add.graphics({ fillStyle: { color: 0x606060 } }),
            text : this.add.text(x + 32, 28, '00/00', { fontFamily: 'Arial', fontSize: 32, color: '#000000' })
        }
        this.hostBHP.icon.setScale(0.5)
        this.hostBHP.backgroundFill.fillRectShape(this.hostBHP.background);
        this.hostBHP.hpFill.fillRectShape(this.hostBHP.hp);


        x = 384;
        this.hostCHP = {
            icon : this.add.sprite(x, 40, NAME.IMAGE.CASTLE_ICON),
            background : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            backgroundFill : this.add.graphics({ fillStyle: { color: 0xe0e0e0 } }),
            hp : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            hpFill : this.add.graphics({ fillStyle: { color: 0x606060 } }),
            text : this.add.text(x + 32, 28, '00/00', { fontFamily: 'Arial', fontSize: 32, color: '#000000' })
        }
        this.hostCHP.icon.setScale(0.375)
        this.hostCHP.backgroundFill.fillRectShape(this.hostCHP.background);
        this.hostCHP.hpFill.fillRectShape(this.hostCHP.hp);
        
//================================================================================

        x = 936;
        this.guestBHP = {
            icon : this.add.sprite(x, 40, NAME.IMAGE.BARRACK_ICON),
            background : new Phaser.Geom.Rectangle(x - 16 , 64, 128, 16),
            backgroundFill : this.add.graphics({ fillStyle: { color: 0xe0e0e0 } }),
            hp : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            hpFill : this.add.graphics({ fillStyle: { color: 0x606060 } }),
            text : this.add.text(x + 32, 28, '00/00', { fontFamily: 'Arial', fontSize: 32, color: '#000000' })
        }
        this.guestBHP.icon.setScale(0.5)
        this.guestBHP.backgroundFill.fillRectShape(this.guestBHP.background);
        this.guestBHP.hpFill.fillRectShape(this.guestBHP.hp);


        x = 1112;
        this.guestCHP = {
            icon : this.add.sprite(x, 40, NAME.IMAGE.CASTLE_ICON),
            background : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            backgroundFill : this.add.graphics({ fillStyle: { color: 0xe0e0e0 } }),
            hp : new Phaser.Geom.Rectangle(x - 16, 64, 128, 16),
            hpFill : this.add.graphics({ fillStyle: { color: 0x606060 } }),
            text : this.add.text(x + 32, 28, '00/00', { fontFamily: 'Arial', fontSize: 32, color: '#000000' })
        }
        this.guestCHP.icon.setScale(0.375)
        this.guestCHP.backgroundFill.fillRectShape(this.guestCHP.background);
        this.guestCHP.hpFill.fillRectShape(this.guestCHP.hp);
    }
    updateHealthBar(){

        var obj = this.game.guest.barrack;
        var text = obj.health >= 10 ?  obj.health + "/" + obj.maxHealth : "0" + obj.health + "/" + obj.maxHealth;
        this.guestBHP.text.setText(text);
        this.guestBHP.hpFill.clear();
        this.guestBHP.hp.width = this.game.guest.barrack.health / this.game.guest.barrack.maxHealth * 128
        this.guestBHP.hpFill.fillRectShape(this.guestBHP.hp);

        obj = this.game.guest.castle;
        text = obj.health >= 10 ?  obj.health + "/" + obj.maxHealth : "0" + obj.health + "/" + obj.maxHealth;
        this.guestCHP.text.setText(text);
        this.guestCHP.hpFill.clear();
        this.guestCHP.hp.width = this.game.guest.castle.health / this.game.guest.castle.maxHealth * 128
        this.guestCHP.hpFill.fillRectShape(this.guestCHP.hp);

        obj = this.game.host.barrack;
        text = obj.health >= 10 ?  obj.health + "/" + obj.maxHealth : "0" + obj.health + "/" + obj.maxHealth;
        this.hostBHP.text.setText(text);
        this.hostBHP.hpFill.clear();
        this.hostBHP.hp.width = this.game.host.barrack.health / this.game.host.barrack.maxHealth * 128
        this.hostBHP.hpFill.fillRectShape(this.hostBHP.hp);

        obj = this.game.host.castle;
        text = obj.health >= 10 ?  obj.health + "/" + obj.maxHealth : "0" + obj.health + "/" + obj.maxHealth;
        this.hostCHP.text.setText(text);
        this.hostCHP.hpFill.clear();
        this.hostCHP.hp.width = this.game.host.castle.health / this.game.host.castle.maxHealth * 128
        this.hostCHP.hpFill.fillRectShape(this.hostCHP.hp);
    }
}

class Control{
    constructor(game, player){
        this.game = game;
        this.player = player;
        this.team = player.team;
    }

    initDisp(scene, scale, goldX, goldY, ppX, ppY, textGX, textGY, textPX, textPY){
        //display gold mount
        this.goldButton=new DAA_Button(scene, NAME.IMAGE.COIN, scale, goldX, goldY);
        this.popIcon=new DAA_Button(scene, NAME.IMAGE.POPULATION, scale, ppX, ppY);
        this.gold_value = scene.add.text(textGX,textGY,this.player.gold);
        this.poplution_value = scene.add.text(textPX,textPY,this.player.population+'/16');
        var player = this.player;
        this.popIcon.onClick(() => {
            player.castle.playAnim('castlebad');
            player.castle.health = 0;
            player.castle.die();
        });
        this.goldButton.onClick(()=>{
            player.gold += 10000;
        });


        return this;
    }

    initSpellBtn(scene, scale, topAlign, leftAlign, betweenW, betweenH,textEX, textEY, textGX, textGY, textCX, textCY){
        this.listSpellBtn ={
            fire : new DAA_Button(scene, NAME.IMAGE.STAR_FIRE, scale, leftAlign +betweenW * 1,  topAlign + betweenH),//.costDisplay(textX,textY,'00'),
            water : new DAA_Button(scene, NAME.IMAGE.STAR_WATER, scale, leftAlign +betweenW * 2,  topAlign + betweenH),//.costDisplay(textX,textY,'00'),
            earth : new DAA_Button(scene, NAME.IMAGE.STAR_EARTH, scale, leftAlign +betweenW * 3,  topAlign + betweenH),//.costDisplay(textX,textY,'00'),
            wind : new DAA_Button(scene, NAME.IMAGE.STAR_WIND, scale, leftAlign +betweenW * 4,  topAlign + betweenH),//.costDisplay(textX,textY,'00'),
            thunder : new DAA_Button(scene, NAME.IMAGE.STAR_THUNDER, scale, leftAlign + betweenW * 5,  topAlign + betweenH * 6)//.costDisplay(textX,textY,'00'),
        };

        this.listSpellBtn.fire.textDisplaySpell(textEX, textEY, textGX, textGY, textCX, textCY);
        this.listSpellBtn.water.textDisplaySpell(textEX, textEY, textGX, textGY, textCX, textCY);
        this.listSpellBtn.earth.textDisplaySpell(textEX, textEY, textGX, textGY, textCX, textCY);
        this.listSpellBtn.wind.textDisplaySpell(textEX, textEY, textGX, textGY, textCX, textCY);
        this.listSpellBtn.thunder.textDisplaySpell(textEX, textEY, textGX, textGY, textCX, textCY);



        var clickSound = this.game.scene.clickSound;  
        var errorSound = this.game.scene.errorSound;
        //当前所有敌方Creep添加火焰伤害5秒 伤害 = 当前已方火元素 * 0.5 + 5
        this.listSpellBtn.fire.onClick(()=>{

            var btn = this.listSpellBtn.fire;
            var p = player.bcg + player.fire * 10;
            if(p > player.gold || btn.cdCounter > 0){
                errorSound.play();
                return
            }
            clickSound.play();
            player.gold -= p;
            btn.cdCounter = 30;

            this.game.scene.time.addEvent({
                delay: 500,
                callback: (btn)=>{
                    btn.cdCounter -= 0.5;
                },
                args: [btn],
                repeat: 59
            });

            var enemyCreepsList = this.player.enemy.creepsList;
            for(var i = 0; i < enemyCreepsList.length; i++ ){
                var dps = Math.floor(this.player.fire * 0.5) + 5;
                TypeElemEffect.range.fire(this.game, this.player.castle, enemyCreepsList[i], dps);
            }  
        });

        var player = this.player;
        //当前所有已方Creep回复生命 回复 = 15 + 5 * 当前已方水元素

        this.listSpellBtn.water.onClick(()=>{
            var btn = this.listSpellBtn.water;
            var p = player.bcg + player.water * 25;
            if(p > player.gold || btn.cdCounter > 0){
                errorSound.play();
                return
            }
            clickSound.play();
            player.gold -= p;
            btn.cdCounter = 30;

            this.game.scene.time.addEvent({
                delay: 500,
                callback: (btn)=>{
                    btn.cdCounter -= 0.5;
                },
                args: [btn],
                repeat: 59
            });

            var creepsList = this.player.creepsList;
            for(var i = 0; i < creepsList.length; i++ ){
                var creep = creepsList[i];
                var heal = Math.floor(this.player.water * 5) + 10;
                creep.health = (creep.health + heal) < creep.maxHealth ? creep.health + heal : creep.maxHealth
                this.game.createSpellEffect(creep, NAME.SPRITE.SPELL_WATER);
            } 
            this.game.scene.time.addEvent({
                delay: 1000,
                callback: (btn)=>{
                    btn.cdCounter -= 1;
                },
                args: [btn],
                repeat: 29
            });
        });
        //所有单位获得额外伤害减免。    减免 = 土元素/4 + 4, 持续时间 = 7 + 土元素/2；
        this.listSpellBtn.earth.onClick(()=>{

            var btn = this.listSpellBtn.earth;
            var p = player.bcg + player.earth * 25;
            if(p > player.gold || btn.cdCounter > 0){
                errorSound.play();
                return
            }
            clickSound.play();
            player.gold -= p;
            btn.cdCounter = 30;

            this.game.scene.time.addEvent({
                delay: 500,
                callback: (btn)=>{
                    btn.cdCounter -= 0.5;
                },
                args: [btn],
                repeat: 59
            });

            var creepsList = this.player.creepsList;
            for(var i = 0; i < creepsList.length; i++ ){
                var creep = creepsList[i];
                var dmgReduce = Math.floor(this.player.earth / 4) + 3;
                var delay = Math.floor((this.player.earth / 2) + 6) * 1000
                creep.dmgReduce += dmgReduce;
                this.game.scene.time.addEvent({
                    delay: delay,
                    callback: (creep, dmgReduce)=>{
                        creep.dmgReduce -= dmgReduce;
                    },
                    args: [creep, dmgReduce],
                    repeat: 0
                });
            } 
        });
        //所有单位攻速加 200 + 风元素 / 2 * 50 持续时间 = 7 + 风元素 / 2
        this.listSpellBtn.wind.onClick(()=>{

            var btn = this.listSpellBtn.wind;
            var p = player.bcg + player.wind * 25;
            if(p > player.gold || btn.cdCounter > 0){
                errorSound.play();
                return
            }
            clickSound.play();
            player.gold -= p;
            btn.cdCounter = 30;

            this.game.scene.time.addEvent({
                delay: 500,
                callback: (btn)=>{
                    btn.cdCounter -= 0.5;
                },
                args: [btn],
                repeat: 59
            });

            var creepsList = this.player.creepsList;
            for(var i = 0; i < creepsList.length; i++ ){
                var creep = creepsList[i];
                var attackSpeed = this.player.wind * 2 + 100;
                var delay = Math.floor(this.player.wind / 2) + 7 * 1000
                creep.attackSpeed -= attackSpeed;
                this.game.scene.time.addEvent({
                    delay: delay,
                    callback: (creep, attackSpeed)=>{
                        creep.attackSpeed + attackSpeed;
                    },
                    args: [creep, attackSpeed],
                    repeat: 0
                });
            }
        });
        //对敌方一个随机单位造成80伤害， 间隔0.5秒然后 雷元素*5/ 100 的几率对随机对一个单位找出50点伤害，第三次 （雷元素-1）* 5/ 100 的几率。
        this.listSpellBtn.thunder.onClick(()=>{

            var btn = this.listSpellBtn.thunder;
            var p = player.bcg + player.thunder * 25;
            if(p > player.gold || btn.cdCounter > 0){
                errorSound.play();
                return
            }
            clickSound.play();
            player.gold -= p;
            btn.cdCounter = 30;
            this.game.scene.time.addEvent({
                delay: 500,
                callback: (btn)=>{
                    btn.cdCounter -= 0.5;
                },
                args: [btn],
                repeat: 59
            });
            
            var randomSelect = (game, player,enemyCreepsList, dmg, thunder, randomSelect) => {
                var chance = player.thunder == thunder ? 100 : thunder * 5 ;
                if(TypeElemEffect.random() > chance)
                    return;
                var index = Math.floor(Math.random() * enemyCreepsList.length)
                var creep = enemyCreepsList[index];
                game.createSpellEffect(creep, NAME.SPRITE.SPELL_THUNDER);
                creep.damaged(game, player.castle, dmg);
                thunder -= 1;
                game.scene.time.addEvent({
                    delay: 500,
                    callback: randomSelect,
                    args: [game, player,enemyCreepsList, dmg, thunder, randomSelect],
                    repeat: 0
                })
            }
            var enemyCreepsList = this.player.enemy.creepsList;
            randomSelect(this.game, this.player, enemyCreepsList, 80, this.player.thunder, randomSelect);
        });

    }    


    initCreepBtn(scene, scale, topAlign, leftAlign, betweenW, betweenH, textX, textY){

        var melee = new DAA_Button(scene, NAME.IMAGE.MELEE, scale, leftAlign +betweenW , topAlign + betweenH * 1);
        var range = new DAA_Button(scene, NAME.IMAGE.RANGE, scale, leftAlign +betweenW * 2, topAlign + betweenH * 1);
      
       
        this.listElemBtn = {
            fire : new DAA_Button(scene, NAME.IMAGE.FRIE, scale, leftAlign +betweenW + betweenW * 0.4,  topAlign + betweenH * 2, false).costDisplay(textX,textY,''),
            water : new DAA_Button(scene, NAME.IMAGE.WATER, scale, leftAlign +betweenW + betweenW * 0.4,  topAlign + betweenH * 3, false).costDisplay(textX,textY,''),
            earth : new DAA_Button(scene, NAME.IMAGE.EARTH, scale, leftAlign +betweenW + betweenW * 0.4,  topAlign + betweenH * 4, false).costDisplay(textX,textY,''),
            wind : new DAA_Button(scene, NAME.IMAGE.WIND, scale, leftAlign +betweenW + betweenW * 0.4,  topAlign + betweenH * 5, false).costDisplay(textX,textY,''),
            thunder : new DAA_Button(scene, NAME.IMAGE.THUNDER, scale, leftAlign +betweenW + betweenW * 0.4,  topAlign + betweenH * 6, false).costDisplay(textX,textY,''),
        }
        
        melee.onClick(()=>{
            if (melee.isSelect()) {
                melee.setSelect(false);
                melee.unmagnify();
                for(var btn in this.listElemBtn){
                    this.listElemBtn[btn].setVisible(false);
                }
            }else{
                melee.setSelect(true);
                melee.magnify();
                range.setSelect(false);
                range.unmagnify();
                for(var btn in this.listElemBtn){
                    this.listElemBtn[btn].setVisible(true);
                }
                 
            }
        });

        range.onClick(()=>{
           
            if (range.isSelect()) {
                range.setSelect(false);
                range.unmagnify();
                for(var btn in this.listElemBtn){
                    this.listElemBtn[btn].setVisible(false);
                }
            }else{
               
                range.setSelect(true);
                range.magnify();
                melee.setSelect(false);
                melee.unmagnify();
                for(var btn in this.listElemBtn){
                    this.listElemBtn[btn].setVisible(true);
                }
            };

        });
        var errorSound = this.game.scene.errorSound;
        var player = this.player;
        var bcg = 100;
        this.listElemBtn.fire.onClick(() => {

            var price = bcg  + 25 * player.fire;
            if(player.gold < price || player.population == 16){
                errorSound.play();
                return;
            }
            player.gold -= price;
            player.fire+=1;
            player.population+=1;

            player.line.push({type : melee.isSelect() ? CREEP_TYPE.MELEE : CREEP_TYPE.RANGE,
                elem: CREEP_ELEM_TYPE.FIRE});
        });

        this.listElemBtn.water.onClick(() => {

            var price = bcg  + 25 * player.water;
            if(player.gold < price || player.population == 16){
                errorSound.play();
                return;
            }
            player.gold-=price;
            player.water+=1;
            player.population+=1;

            player.line.push({type :  melee.isSelect() ? CREEP_TYPE.MELEE : CREEP_TYPE.RANGE,
                elem: CREEP_ELEM_TYPE.WATER});              
            });

        this.listElemBtn.earth.onClick(() => {

            var price = bcg  + 25 * player.earth;
            if(player.gold < price || player.population == 16){
                errorSound.play();
                return;
            }
            player.gold -= price;
            player.earth += 1;
            player.population += 1; 

            player.line.push({type :  melee.isSelect() ? CREEP_TYPE.MELEE : CREEP_TYPE.RANGE,
                elem: CREEP_ELEM_TYPE.EARTH});

        });

        this.listElemBtn.wind.onClick(() => {
            var price = bcg  + 25 * player.wind;
            if(player.gold < price || player.population == 16){
                errorSound.play();
                return;
            }
            player.gold -= price;
            player.wind += 1;
            player.population += 1;

            player.line.push({type :melee.isSelect() ? CREEP_TYPE.MELEE : CREEP_TYPE.RANGE,
                elem: CREEP_ELEM_TYPE.WIND});
        });

        this.listElemBtn.thunder.onClick(() => {
            var price = bcg  + 25 * player.thunder;
            if(player.gold < price || player.population == 16){
                errorSound.play();
                return;
            }
            player.gold -= price;
            player.thunder += 1;
            player.population += 1;

            player.line.push({type :melee.isSelect() ? CREEP_TYPE.MELEE : CREEP_TYPE.RANGE, 
                elem: CREEP_ELEM_TYPE.THUNDER});
        });
        return this;  
    }

    update (){
        this.poplution_value.setText(this.player.population+'/16');
        this.gold_value.setText(this.player.gold);
        this.listElemBtn.fire.update(this.player, 'fire');
        this.listElemBtn.water.update(this.player, 'water');
        this.listElemBtn.earth.update(this.player, 'earth');
        this.listElemBtn.wind.update(this.player, 'wind');
        this.listElemBtn.thunder.update(this.player, 'thunder');
        this.listSpellBtn.fire.updateSpell(this.player, 'fire');
        this.listSpellBtn.water.updateSpell(this.player, 'water');
        this.listSpellBtn.earth.updateSpell(this.player, 'earth');
        this.listSpellBtn.wind.updateSpell(this.player, 'wind');
        this.listSpellBtn.thunder.updateSpell(this.player, 'thunder');
    }


}
