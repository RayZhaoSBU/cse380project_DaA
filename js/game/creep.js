class CreepFactory {
    constructor(scene, image, scale, type, elem) {
        this.scene = scene;
        this.image = image;
        this.type = type;
        this.elem = elem;
        this.scale = scale==null ? 1 : scale;
    }

    create(x, y, player, enemy, maxHealth, minDmg, maxDmg ){
        var pixelX = this.scene.game.grid[y][x].pixelX + 16;
        var pixelY = this.scene.game.grid[y][x].pixelY + 16;
        var sprite = this.scene.add.sprite(pixelX, pixelY, this.image);
        var creep = new Creep(this.scene, sprite, this.type, this.elem, player, enemy, x, y);
        sprite.creep = creep;
        var damage = 15;
        sprite.setScale(this.scale);
        creep.init(maxHealth, damage, minDmg, maxDmg);
        if(player.team == TEAM.HOST){
            creep.playAnim("idle_right" + '_' + this.type + '_' + this.elem);
        }else{
            creep.playAnim("idle_left" + '_' + this.type + '_' + this.elem);
        }
        return creep;
    }

    init(){
        //-------------------------------------------------- melee left ----------------------------------------------------------------------
        this.scene.anims.create({
            key: 'idle_left'+ '_' + this.type + '_' + this.elem,
            frames: [{ key: this.image, frame: 8 },
            { key: this.image, frame: 7 },
            { key: this.image, frame: 6 },
            { key: this.image, frame: 5 }],
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'walk_left' + '_' + this.type + '_' + this.elem,
            frames: [{ key: this.image, frame: 18 },
            { key: this.image, frame: 17 },
            { key: this.image, frame: 16 },
            { key: this.image, frame: 15 }],
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'attack_left' + '_' + this.type + '_' + this.elem,
            frames: [{ key: this.image, frame: 29 },
            { key: this.image, frame: 28 },
            { key: this.image, frame: 27 },
            { key: this.image, frame: 26 },
            { key: this.image, frame: 25 }],
            frameRate: 10,
            repeat: 0,
        });

//-------------------------------------------------- melee right ----------------------------------------------------------------------

        this.scene.anims.create({
            key: 'idle_right'+ '_' + this.type + '_' + this.elem,
            frames: this.scene.anims.generateFrameNumbers(this.image, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'walk_right'+ '_' + this.type + '_' + this.elem,
            frames: this.scene.anims.generateFrameNumbers(this.image, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'attack_right' + '_' + this.type + '_' + this.elem,
            frames: this.scene.anims.generateFrameNumbers(this.image, { start: 20, end: 24 }),
            frameRate: 10,
            repeat: 0,
        });

//-------------------------------------------------- top ----------------------------------------------------------------------

        this.scene.anims.create({
            key: 'walk_top' + '_' + this.type + '_' + this.elem,
            frames: [{ key: this.image, frame: 58 },
            { key: this.image, frame: 57 },
            { key: this.image, frame: 56 },
            { key: this.image, frame: 55 }],
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'attack_top' + '_' + this.type + '_' + this.elem,
            frames: [{ key: NAME.SPRITE.MELEE_CREEPS, frame: 69 },
            { key: this.image, frame: 68 },
            { key: this.image, frame: 67 },
            { key: this.image, frame: 66 },
            { key: this.image, frame: 65 }],
            frameRate: 10,
            repeat: 0,
        })

//-------------------------------------------------- bot ----------------------------------------------------------------------

        this.scene.anims.create({
            key: 'walk_bot'+ '_' + this.type + '_' + this.elem,
            frames: this.scene.anims.generateFrameNumbers(this.image, { start: 50, end: 53 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'attack_bot' + '_' + this.type + '_' + this.elem,
            frames: this.scene.anims.generateFrameNumbers(this.image, { start: 60, end: 64 }),
            frameRate: 10,
            repeat: 0,
        });

//-------------------------------------------------- melee d_v ----------------------------------------------------------------------
        if(this.type == CREEP_TYPE.MELEE){
            this.scene.anims.create({
                key: 'die_right' + '_' + this.type + '_' + this.elem,
                frames: this.scene.anims.generateFrameNumbers(this.image, { start: 30, end: 34 }),
                frameRate: 10,
                repeat: 0,
            });

            this.scene.anims.create({
                key: 'victory_right' + '_' + this.type + '_' + this.elem,
                frames: this.scene.anims.generateFrameNumbers( this.image, { start: 40, end: 44 }),
                frameRate: 10,
                repeat: -1,
            })
        
            this.scene.anims.create({
                key: 'die_left' + '_' + this.type + '_' + this.elem,
                frames: [{ key: this.image, frame: 39 },
                { key: this.image, frame: 38 },
                { key: this.image, frame: 37 },
                { key: this.image, frame: 36 },
                { key: this.image, frame: 35 }],
                frameRate: 10,
                repeat: 0,
            });

            this.scene.anims.create({
                key: 'victory_left' + '_' + this.type + '_' + this.elem,
                frames: [{ key: NAME.SPRITE.MELEE_CREEPS, frame: 49 },
                { key: this.image, frame: 48 },
                { key: this.image, frame: 47 },
                { key: this.image, frame: 46 },
                { key: this.image, frame: 45 }],
                frameRate: 10,
                repeat: -1,
            })
        }else{
            //-------------------------------------------------- range d_v ----------------------------------------------------------------------
            this.scene.anims.create({
                key: 'die_left' + '_' + this.type + '_' + this.elem,
                frames: [{ key: this.image, frame: 38 },
                { key: this.image, frame: 37 },
                { key: this.image, frame: 36 },
                { key: this.image, frame: 35 }],
                frameRate: 10,
                repeat: 0,
            });

            this.scene.anims.create({
                key: 'victory_left' + '_' + this.type + '_' + this.elem,
                frames: [{ key: this.image, frame: 48 },
                { key: this.image, frame: 47 },
                { key: this.image, frame: 46 },
                { key: this.image, frame: 45 }],
                frameRate: 10,
                repeat: -1,
            })

            this.scene.anims.create({
                key: 'die_right' + '_' + this.type + '_' + this.elem,
                frames: this.scene.anims.generateFrameNumbers(this.image, { start: 30, end: 33 }),
                frameRate: 10,
                repeat: 0,
            });

            this.scene.anims.create({
                key: 'victory_right' + '_' + this.type + '_' + this.elem,
                frames: this.scene.anims.generateFrameNumbers( this.image, { start: 40, end: 43 }),
                frameRate: 10,
                repeat: -1,
            })
        }
        return this;
    }
}




CREEP_TYPE = {
    RANGE:      'range',
    MELEE:      'melee'
}

CREEP_TARGET_TYPE = {
    BUILDING:   'buiding',
    CREEPS:     'creeps',
    POINT:      'point'
}

CREEP_ELEM_TYPE = {
    FIRE:       'fire',
    WATER:      'water',
    EARTH:      'earth',
    THUNDER:    'thunder',
    WIND:       'wind' 
}

CREEP_ACTION_TYPE = {
    NONE:       -1,
    MOVE:       0,
    FIND_PATH:  1,
    ATTACK:     2
}

CREEP_ATTACK_RANGE = {
    RANGE:      2,
    MELEE:      1
}



TypeElemEffect = {
    melee : {
        fire: (game, target, dmg)=>{ //10%的几率300%伤害
            if (TypeElemEffect.random() <= 10){
                game.createSpellEffect(target, NAME.SPRITE.SPELL_FIRE);
                return dmg * 3
            }
            return dmg;
        }, 
        water: (game, creep)=>{ //攻击50%回复生命 10 点。
            if (TypeElemEffect.random() <= 50){
                creep.health = (creep.health + 5) < creep.maxHealth ? creep.health + 5 : creep.maxHealth
                game.createSpellEffect(creep, NAME.SPRITE.SPELL_WATER);
            } 
        }, 
        earth: (creep)=>{//生命增加70，伤害减少4， 攻击下降4，攻速降低500
            creep.maxHealth = creep.maxHealth + 70;
            creep.health = creep.maxHealth;
            creep.dmgReduce = 4;
            creep.minDmg -= 4;
            creep.maxDmg -= 4;
            creep.attackSpeed += 500;
        }, 
        thunder: (game, source, target)=>{ //受到伤害有35%几率对来源造成15点伤害
            if (source instanceof Building){
                return;
            }
            if (TypeElemEffect.random() <= 35){
                source.damaged(game, target, 15);
                game.createSpellEffect(source, NAME.SPRITE.SPELL_THUNDER);
            }
        }, 
        wind: (creep)=>{ //攻速提升 -500, 
            creep.attackSpeed -= 500;
        } 
    },
    range : {//每秒2点灼烧，叠加，5s
        fire: (game, source, target, dps)=>{
            game.scene.time.addEvent({ 
                delay: 1000, 
                callback: (game, source, target) => {
                    if(target.isDied){
                        return;
                    }
                    game.createSpellEffect(target, NAME.SPRITE.SPELL_FIRE_A);
                    target.damaged(game, source, dps);
                }, 
                args: [game, source, target], 
                repeat: 4 
            });
        }, 
        water: (game, creep)=>{//攻击35%回复生命 5 点。
            if (TypeElemEffect.random() <= 35){
                creep.health = (creep.health + 5) < creep.maxHealth ? creep.health + 5 : creep.maxHealth
                game.createSpellEffect(creep, NAME.SPRITE.SPELL_WATER);
            } 
        }, 
        earth: (creep)=>{// 攻速降低 500， 最大伤害 + 8
            creep.attackSpeed += 500;
            creep.maxDmg += 8;
        },
        thunder: (creep)=>{ // 稳定输出 15, 40血量， 1300的攻速
            creep.attackSpeed -= 200;
            creep.maxDmg = 15;
            creep.minDmg = 15;
            creep.maxHealth -= 10
            creep.health -= 10
        },
        wind: (creep)=>{ //攻击距离+1
            creep.attackRange += 1;
        } 
    },
    random:() => { return Math.floor(Math.random() * 100) + 1}
}


class Creep {
    constructor (scene, sprite, type, elem, player, enemy, gridX, gridY){
        this.scene = scene;
        this.sprite = sprite;
        this.type = type;
        this.elem = elem;
        this.player = player;
        this.enemy = enemy;
        this.gridX = gridX;
        this.gridY = gridY;
        this.searchRange = 4;
        this.status = new Array();
        this.path = [];
        this.target = null;
        this.action = CREEP_ACTION_TYPE.NONE;
        this.isAttacting = false;
        this.isMoving = false;
        this.isDied = false;
        this.actionAllow = true;
        this.aaCounter = 0;
    }

    init(maxHealth , damage, minDmg, maxDmg){
        this.maxHealth = maxHealth
        this.health = maxHealth;
        this.damage = damage;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.dmgReduce = 0;
        this.attackSpeed = 1500;
        this.attackRange = this.type == CREEP_TYPE.RANGE ? CREEP_ATTACK_RANGE.RANGE : CREEP_ATTACK_RANGE.MELEE;
        this.target = this.enemy.barrack.isDied ? this.enemy.castle : this.enemy.barrack;
        this.action = CREEP_ACTION_TYPE.FIND_PATH;
        this.scene.game.grid[this.gridY][this.gridX].isPassable = false;
        this.scene.game.grid[this.gridY][this.gridX].creep = this;
        switch(this.elem){
            case CREEP_ELEM_TYPE.EARTH:  
                TypeElemEffect[this.type].earth(this);
            break;
            case CREEP_ELEM_TYPE.WIND:
                TypeElemEffect[this.type].wind(this);
            break;
            case CREEP_ELEM_TYPE.THUNDER:
                if(this.type == CREEP_TYPE.MELEE){
                    return;
                }
                TypeElemEffect[this.type].thunder(this);
        }
    }

    addStatus(state){
        this.push(state);
    }

    playAnim(anim){
        if(this.sprite == null){
            return
        }
        this.sprite.play(anim);
    }

    setTarget(target, action){
        this.target = target;
        this.action = action;
    }

    findTarget(grid){
        var newTarget = this.findEnemy(grid);
        if (this.target.isDied){
            this.target = null;
        }
        if (newTarget != null){
            if (this.target != newTarget ) {
                this.target = newTarget;
            }else{

                var path = this.path;
                var lastIndex = this.path.length - 1;
                if (lastIndex >= 0 && path[lastIndex].x == this.target.gridX && path[lastIndex].y == this.target.gridY)
                    newTarget = null;
            }
            if(newTarget != null){
                this.target = newTarget;
                var distX = Math.abs(newTarget.gridX - this.gridX);
                var distY = Math.abs(newTarget.gridY - this.gridY);
                if (distX > this.attackRange || distY > this.attackRange){
                    this.setTarget(newTarget, CREEP_ACTION_TYPE.FIND_PATH);
                }
            }
        }        
        if (newTarget == null && this.target == null){
            if (!this.enemy.barrack.isDied){
                this.setTarget(this.enemy.barrack, CREEP_ACTION_TYPE.FIND_PATH);
            }else{
                this.setTarget(this.enemy.castle, CREEP_ACTION_TYPE.FIND_PATH);
            }
        }
    }

    setAction(action){
        this.action = action;
    }

    startAction(game){
        if(this.isMoving || this.isAttacting || this.isDied || !this.actionAllow){
            return;
        }
        var grid = game.grid;
        this.findTarget(grid);
        switch(this.action) {
            case CREEP_ACTION_TYPE.MOVE:
                var nextPoint = this.path.shift();
                var distX = Math.abs(this.target.gridX - this.gridX);
                var distY = Math.abs(this.target.gridY - this.gridY);
                if(nextPoint == null || nextPoint ==undefined ){
                    this.setTarget(this.target, CREEP_ACTION_TYPE.FIND_PATH);
                    return;
                }
                if(this.type == CREEP_TYPE.MELEE && nextPoint.x == this.target.gridX && nextPoint.y == this.target.gridY){
                    this.setAction(CREEP_ACTION_TYPE.ATTACK);
                }else if(this.type == CREEP_TYPE.RANGE && distX <= this.attackRange && distY <= this.attackRange){
                    this.setAction(CREEP_ACTION_TYPE.ATTACK);
                }else if (!grid[nextPoint.y][nextPoint.x].isPassable && grid[nextPoint.y][nextPoint.x].creep != null){
                    this.setAction(CREEP_ACTION_TYPE.FIND_PATH)
                }else{
                    this.move(nextPoint.x, nextPoint.y, game);
                }
                break;
            case CREEP_ACTION_TYPE.ATTACK:
                if(Math.abs(this.gridX - this.target.gridX) > this.attackRange){
                    this.setAction(CREEP_ACTION_TYPE.FIND_PATH);
                    return;
                }
                this.attack(game, this, this.target);
                break;
            case CREEP_ACTION_TYPE.FIND_PATH:
                this.path = PathFinder.findPath(grid, this, this.target);
                if(this.path.length == 0){
                    this.setAction(CREEP_ACTION_TYPE.ATTACK);
                }else{
                    this.setAction(CREEP_ACTION_TYPE.MOVE);
                }
                break;
            default:
          } 
    }

    damaged(game, fromTarget, damage){
        damage -=  this.dmgReduce;
        if (this.dmgReduce > 0){
            game.createSpellEffect(this, NAME.SPRITE.SPELL_EARTH);
        }
        if (damage < 0 ) damage = 0;
        if(this.type == CREEP_TYPE.MELEE && this.elem == CREEP_ELEM_TYPE.THUNDER){
            TypeElemEffect.melee.thunder(game, fromTarget, this)
        }
        this.health = this.health - damage;
        console.log(this.elem + '_' + this.type +
             "(" + this.health + '\\' + this.maxHealth + 
             ") damage by " + fromTarget.elem + '_' + fromTarget.type + "(" + damage + ")" ) ;
        if(this.health <= 0){
            this.die(game, fromTarget);
        }
    }

    attack(game, source, target){
        if(source.player == target.player) return;
        source.isAttacting = true;
        var anims = null;
        //TOP
        if (source.gridY > target.gridY ){
            anims = 'attack_top' + '_' + this.type + '_' + this.elem;
        //BOT
        }else if (source.gridY < target.gridY ){
            anims = 'attack_bot' + '_' + this.type + '_' + this.elem;
        //RIGHT
        }else if (source.gridX > target.gridX){
            anims = 'attack_left' + '_' + this.type + '_' + this.elem;
        //LEFT
        }else if (source.gridX < target.gridX){
            anims = 'attack_right' + '_' + this.type + '_' + this.elem;
        }

        var dmg = Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1)) + this.minDmg;
        var soundIndex = Math.floor(Math.random() * 2) + 1;
        game.scene.time.addEvent({ 
            delay: this.attackSpeed, 
            callback: function onEvent(game, source, target, dmg){ 
                if(source.isDied || target.isDied){
                    source.isAttacting = false;
                    return
                }

                source.playAnim(anims);
                source.isAttacting = false;

                if(source.type == CREEP_TYPE.RANGE){
                    var pixelX = game.grid[source.gridY][source.gridX].pixelX + 16;
                    var pixelY = game.grid[source.gridY][source.gridX].pixelY + 16;
                    var toPixelX = game.grid[target.gridY][target.gridX].pixelX + 16;
                    var toPixelY = game.grid[target.gridY][target.gridX].pixelY + 16;

                    //设置箭的朝向
                    var arrow = game.scene.add.image(pixelX, pixelY, NAME.IMAGE.ARROW);
                    arrow.setScale(0.2);
                    game.scene.tweens.add({
                        targets: arrow,
                        x: toPixelX,
                        y: toPixelY,
                        duration: Math.ceil(pixelX > pixelY  ? pixelX / 32 : pixelY / 32) * 15,
                        onComplete: (tween, images, game, source, target, arrow, dmg) => {
                            arrow.destroy()
                            if(source.isDied || target.isDied){
                                return 
                            }
                            switch(source.elem){
                                case CREEP_ELEM_TYPE.FIRE:
                                    TypeElemEffect.range.fire(game, source, target, 2);
                                    break;
                                case CREEP_ELEM_TYPE.WATER:
                                    TypeElemEffect.range.water(game, source);
                                    break;
                            }
                            var ts = game.scene.sound.add(NAME.AUDIO['RANGE' + soundIndex]);
                            ts.setVolume(1);
                            ts.play();
                            target.damaged(game, source, dmg);
                        },
                        onCompleteParams: [game, source, target, arrow, dmg]
                    });
                }else{
                    switch(source.elem){
                        case CREEP_ELEM_TYPE.FIRE:
                            dmg = TypeElemEffect.melee.fire(game, target, dmg);
                            break;
                        case CREEP_ELEM_TYPE.WATER:
                            TypeElemEffect.melee.water(game, source);
                            break;
                    }
                    var ts = game.scene.sound.add(NAME.AUDIO['CREEP' + soundIndex]);
                    ts.setVolume(.5);
                    ts.play();

                    target.damaged(game, source, dmg); 
                }
            }, 
            args: [game, source, target, dmg], 
            repeat: 0 
        });
    }

    move(toX, toY, game){

        this.scene.game.grid[this.gridY][this.gridX].isPassable = true;
        this.scene.game.grid[this.gridY][this.gridX].creep = null;

        this.scene.game.grid[toY][toX].isPassable = false;
        this.scene.game.grid[toY][toX].creep = this;

        this.isMoving = true;

        var pixelX = game.grid[toY][toX].pixelX;
        var pixelY = game.grid[toY][toX].pixelY;
        var creep = this;

        var anims = null;
        //TOP
        if (this.gridY > toY){
            anims = 'walk_top' + '_' + this.type + '_' + this.elem;
        //BOT
        }else if (this.gridY < toY){
            anims = 'walk_bot' + '_' + this.type + '_' + this.elem;
        //RIGHT
        }else if (this.gridX > toX){
            anims = 'walk_left' + '_' + this.type + '_' + this.elem;
        //LEFT
        }else if (this.gridX < toX){
            anims = 'walk_right' + '_' + this.type + '_' + this.elem;
        }

        game.scene.tweens.add({
            targets: creep.sprite,
            x: pixelX + 16,
            y: pixelY + 16,
            duration: 400,
            onStart:    function(){
                creep.playAnim(anims);
            },
            onComplete: function(){
                creep.isMoving = false;
            }
        });
        this.gridX = toX;
        this.gridY = toY;
    }

    die(game, killer){
        this.isDied = true;
        var anims = null;

        if(killer.gridX > this.gridX){
            anims = 'die_left' + '_' + this.type + '_' + this.elem;
        }else{
            anims = 'die_right' + '_' + this.type + '_' + this.elem;
        }

        if(killer.type != BUILDING_TYPE.BARRACK && killer.type != BUILDING_TYPE.CASTLE ){

            killer.player.gold += Math.floor(Math.random() * 10) + 1;
        }

        this.playAnim(anims);
        game.scene.time.addEvent({ 
            delay: 1000, 
            callback: (scene, creep) => {
                if(creep.sprite == null) 
                    return;
                scene.game.grid[creep.gridY][creep.gridX].isPassable = true;
                scene.game.grid[creep.gridY][creep.gridX].creep = null;
                creep.player.removeCreep(creep)
                creep.sprite.destroy();
                creep.sprite = null;
            }, 
            args: [ this.scene, this], 
            repeat: 0 
        });
    }

    findEnemy(grid){
        var range = this.searchRange;
        var left = -1
        var right = 1;
        var top = -1
        var bottom = 1;
        var notVisited = new Point();
        var mark = Array.matrix(grid.height, grid.width, notVisited);
        var queuePoint = [];
        var startP = new Point(this.gridX, this.gridY)

        queuePoint.push(startP);
        mark[startP.y][startP.x] = startP;
        while (queuePoint.length != 0){
            var point = queuePoint.shift();

            //是否超出警戒范围
            if (Math.abs(point.x - startP.x) > range || Math.abs(point.y - startP.y) > range)
                return null;

            //判断 Point 上面是否有敌方单位，如果有返回单位
            if(grid[point.y][point.x].creep != null && grid[point.y][point.x].creep.player == this.enemy && !grid[point.y][point.x].creep.isDied)
                return grid[point.y][point.x].creep;
            
            //check top block
            if (point.y + top >= 0 ){//&& grid[point.y + top][point.x].isPassable){
                if(mark[point.y + top][point.x].isEqualTo(notVisited)){
                    mark[point.y + top][point.x] = point;
                    var nextPoint = new Point(point.x, point.y + top);
                    queuePoint.push(nextPoint);
                }
            }

            //check bottom block
            if (point.y + bottom < grid.height ){//&& grid[point.y + bottom][point.x].isPassable){
                if(mark[point.y + bottom][point.x].isEqualTo(notVisited)){
                    mark[point.y + bottom][point.x] = point;
                    var nextPoint = new Point(point.x, point.y + bottom);
                    queuePoint.push(nextPoint);
                }
            }

            //check left block
            if (point.x + left >= 0 ){//&& grid[point.y][point.x + left].isPassable){
                if(mark[point.y][point.x + left].isEqualTo(notVisited)){
                    mark[point.y][point.x + left]  = point;
                    var nextPoint = new Point(point.x + left, point.y);
                    queuePoint.push(nextPoint);
                }
            }

            //check right block
            if (point.x + right < grid.width ){//&& grid[point.y][point.x + right].isPassable){
                if(mark[point.y][point.x + right].isEqualTo(notVisited)){
                    mark[point.y][point.x + right] = point;
                    var nextPoint = new Point(point.x + right, point.y);
                    queuePoint.push(nextPoint);
                }
            }
        }
    }


}

