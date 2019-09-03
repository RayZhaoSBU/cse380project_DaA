class PlayerData{
    constructor(scene){
        this.scene = scene;
        this.enemy = null;
        this.spawnPoint = {x : 0, y : 0};
        this.line = new Array();
        this.creepsList = new Array();
        this.spellList = new Array();
        this.castle = null;
        this.barrack = null;
        this.gold=300;
        this.bcg=100;
        this.fire=0;
        this.water=0;
        this.earth=0;
        this.wind=0;
        this.thunder=0;
        this.population=0;
        this.id = null;
    }

    removeCreep(creep){
        for (var i = 0; i < this.creepsList.length; i++ ){
            if (this.creepsList[i] == creep){
                this.creepsList.splice(i, 1);
                break;
            }
        }
    }
  

}