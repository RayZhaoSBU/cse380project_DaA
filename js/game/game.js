TEAM = {
    HOST:       'host',
    GUEST:      'guest'
}

const HOST_SPAWN_POINT = [
    {x: 14, y: 13},
    {x: 15, y: 13},
    {x: 14, y: 14},
    {x: 15, y: 14},
    {x: 14, y: 12},
    {x: 15, y: 12},
    {x: 14, y: 15},
    {x: 15, y: 15},
    {x: 16, y: 13},
    {x: 16, y: 14},
    {x: 13, y: 13},
    {x: 13, y: 14},
    {x: 16, y: 12},
    {x: 16, y: 15},
    {x: 13, y: 12},
    {x: 13, y: 15}
];

const GUEST_SPAWN_POINT = [
    {x: 33, y: 13},
    {x: 34, y: 13},
    {x: 33, y: 14},
    {x: 34, y: 14},
    {x: 33, y: 12},
    {x: 34, y: 12},
    {x: 33, y: 15},
    {x: 34, y: 15},
    {x: 32, y: 13},
    {x: 32, y: 14},
    {x: 35, y: 13},
    {x: 35, y: 14},
    {x: 35, y: 12},
    {x: 35, y: 15},
    {x: 32, y: 12},
    {x: 32, y: 15}
];

class Game {
    constructor(scene){
        this.round = 0;
        this.scene = scene;
        this.host = new PlayerData(this.scene)
        this.host.id = TEAM.HOST;
        this.guest = new PlayerData(this.scene);
        this.guest.id = TEAM.GUEST;
        this.host.enemy = this.guest;
        this.guest.enemy = this.host;
        this.spawnTimer = null;
        this.buiding = null;
        this.melee = null;
        this.range = null;
        this.time = 0;
    }

    init(){
        var scene = this.scene;
        var scale = 0.25
        this.melee = {
            fire:       null,
            water:      null,
            wind:       null,
            earth:      null,
            thunder:    null,
        }
        this.range = {
            fire:       null,
            water:      null,
            wind:       null,
            earth:      null,
            thunder:    null,
        }
        this.melee.fire = new CreepFactory(
            scene,
            NAME.SPRITE.MELEE_FIRE,
            scale,
            CREEP_TYPE.MELEE, 
            CREEP_ELEM_TYPE.FIRE).init();

        this.melee.water = new CreepFactory(
            scene,
            NAME.SPRITE.MELEE_WATER,
            scale,
            CREEP_TYPE.MELEE, 
            CREEP_ELEM_TYPE.WATER).init();

        this.melee.earth = new CreepFactory(
            scene,
            NAME.SPRITE.MELEE_EARTH,
            scale,
            CREEP_TYPE.MELEE, 
            CREEP_ELEM_TYPE.EARTH).init();

        this.melee.wind = new CreepFactory(
            scene,
            NAME.SPRITE.MELEE_WIND,
            scale,
            CREEP_TYPE.MELEE, 
            CREEP_ELEM_TYPE.WIND).init();

        this.melee.thunder = new CreepFactory(
            scene,
            NAME.SPRITE.MELEE_THUNDER,
            scale,
            CREEP_TYPE.MELEE, 
            CREEP_ELEM_TYPE.THUNDER).init();

        this.range.fire = new CreepFactory(
            scene,
            NAME.SPRITE.RANGE_FIRE,
            scale,
            CREEP_TYPE.RANGE, 
            CREEP_ELEM_TYPE.FIRE).init();

        this.range.water = new CreepFactory(
            scene,
            NAME.SPRITE.RANGE_WATER,
            scale,
            CREEP_TYPE.RANGE, 
            CREEP_ELEM_TYPE.WATER).init();

        this.range.earth = new CreepFactory(
            scene,
            NAME.SPRITE.RANGE_EARTH,
            scale,
            CREEP_TYPE.RANGE, 
            CREEP_ELEM_TYPE.EARTH).init();

        this.range.wind = new CreepFactory(
            scene,
            NAME.SPRITE.RANGE_WIND,
            scale,
            CREEP_TYPE.RANGE, 
            CREEP_ELEM_TYPE.WIND).init();

        this.range.thunder = new CreepFactory(
            scene,
            NAME.SPRITE.RANGE_THUNDER,
            scale,
            CREEP_TYPE.RANGE, 
            CREEP_ELEM_TYPE.THUNDER).init();
        scale = 1;

        this.castle = new BuildingFactory(
            scene,
            NAME.SPRITE.CASTLE,
            scale,
            BUILDING_TYPE.CASTLE).init();

        this.barrack = new BuildingFactory(
            scene,
            NAME.SPRITE.BARRACK,
            scale,
            BUILDING_TYPE.BARRACK).init();

        this.grid = this.createGrid();
    }

    start(){
        this.timeDisp = this.scene.add.text(800 - 64, 32, '00:00', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
        this.host.team = TEAM.HOST;
        this.host.barrack = this.barrack.create(15, 14, this.host).init(20);
        this.host.castle = this.castle.create(6, 14, this.host).init(30);

        this.team = TEAM.GUEST;
        this.guest.barrack = this.barrack.create(34, 14, this.guest).init(20);
        this.guest.castle = this.castle.create(43, 14, this.guest).init(30);
        this.timeDisplayCounter()
        this.createSpawnTimer();
        this.payoff();
    }

    timeDisplayCounter(){
        this.timeDisplayCounter = this.scene.time.addEvent({
            delay: 100,                // ms
            callback: (game)=>{
                game.time += 100;
            },
            args: [this],
            loop: true
        });
    }

    payoff(){
        this.payoffTimer = this.scene.time.addEvent({
            delay: 1000, 
            callback: (host, guest)=>{
                host.gold += 1;
                guest.gold += 1;
            },
            args: [this.host, this.guest],
            loop: true
        });
    }

    updateTimer(){
        var min = Math.floor(this.time / 60000);
        var sec = Math.floor(this.time % 60000 / 1000);
        var minT = min < 10 ? "0" + min: min;
        var sceT = sec < 10 ? "0" + sec : sec;
        this.timeDisp.setText(minT + ":" + sceT);
    }
    
    createSpawnTimer(){
        this.spawnTimer = this.scene.time.addEvent({
            delay: 20000, 
            callback: this.spawnCreeps,
            args: [this, this.grid, this.host, this.guest],
            loop: true
        });
    }
    
    spawnCreeps(creepFactory, grid, host, guest){
        var  minDmg = 11, maxDmg = 14;
        //host
        var hshift = host.barrack.isDied ? -10 : 0;
        var gshift = guest.barrack.isDied ? 10 : 0;
        if(host.castle.isDied || guest.castle.isDied)
            return;
        var maxHealth = 0;
        for(var i in host.line){
            if (host.line[i].type == CREEP_ELEM_TYPE.RANGE){
                minDmg = 9;
                maxDmg = 13;
                maxHealth = 50;
            }else{
                minDmg = 11;
                maxDmg = 14;
                maxHealth = 70
            }
            host.creepsList.push(creepFactory[host.line[i].type][host.line[i].elem]
                .create(
                    HOST_SPAWN_POINT[i].x + hshift,
                    HOST_SPAWN_POINT[i].y,
                    host, guest , maxHealth,  minDmg, maxDmg));
        }
        //guest
  
        for(var i in guest.line){
            if (guest.line[i].type == CREEP_ELEM_TYPE.RANGE){
                minDmg = 9;
                maxDmg = 13;
                maxHealth = 50;
            }else{
                minDmg = 11;
                maxDmg = 14;
                maxHealth = 70
            }
            guest.creepsList.push(creepFactory[guest.line[i].type][guest.line[i].elem]
                .create(
                    GUEST_SPAWN_POINT[i].x + gshift,
                    GUEST_SPAWN_POINT[i].y,
                    guest, host, maxHealth, minDmg, maxDmg));
        }
    }

    createGrid(){
        var blockLayer = this.scene[NAME.LAYER.BLOCK];
        var grid = [];
        var blockedLayerData = blockLayer.layer.data;
        grid.width = blockLayer.width/32;
        grid.height = blockLayer.height/32;
        for (var r = 0; r < grid.height; r++){
            var col =[];
            for (var c = 0; c < grid.width; c++){
                col[c] = {
                    pixelX : blockedLayerData[r][c].pixelX,
                    pixelY : blockedLayerData[r][c].pixelY,
                    isPassable: blockedLayerData[r][c].index == -1 ? true : false,
                    creep : null
                }
            }
            grid.push(col);
        }
        this.grid = grid;
        return grid;
    }
    
    startActionAll(){
        var h = this.host.creepsList;
        var g = this.guest.creepsList;
        for (var i = 0; i < h.length; i ++ ){
            h[i].startAction(this);
        }
        for (var i = 0; i< g.length; i ++){
            g[i].startAction(this);
        }
    }

    createSpellEffect(target, spell){
        var obj = this.scene.add.sprite(target.gridX * 32 + 16, target.gridY * 32 + 16, spell)
        obj.play(spell);
        this.scene.time.addEvent({ 
            delay: 500, 
            callback: (obj) => {
                obj.destroy();
            }, 
            args: [obj], 
            repeat: 0 
        });
    }
}
