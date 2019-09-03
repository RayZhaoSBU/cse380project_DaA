const TIME_OUT = 60000;

class MatchScene extends Phaser.Scene{
      
    constructor() {
        super({
            key: NAME.SCENES.MATCH
        });
    }

    init() {
        this.roomNumOptions = '1234567890';
        this.database = firebase.database();
        this.role = 'none';
        this.roomNum = '';
        console.log("MatchScence init");
    }

    setRole(role){
        this.role = role;
    }

    preload() {

    }

    create() {
        var sceneManage = this.scene;
        this.searchRoom(this.database).then(() => {
                var roomStart = this.database.ref('rooms/' + this.roomNum + '/start');
                roomStart.once("child_added", (snapshot)=>{
                    var start = snapshot.val();
                    console.log(start);
                    sceneManage.start(NAME.SCENES.PLAY, NAME.SCENES.MATCH);
                });
            }
        );
    }

    update() {

    }



    createRoom(database){
        return new Promise((resolve, reject) => {
            const num = this.generateRoomNum();
            const room = database.ref('rooms/' + num);
            room.once('value',).then((snapshot) => {
                const roomData = snapshot.val();
                if (roomData == null) {
                    // Room does not exist
                    this.roomNum = num;
                    this.role = 'host';
                    this.setRoomTime(room).then(resolve(this.roomNum));
                }
            });
        });
    }


    joinRoom(database, roomsData){
        return new Promise((resolve, reject) => {
            var roomList = Object.keys(roomsData)
            var rooms = database.ref('rooms/');
            rooms.once('value').then((snapshot) =>{
                const roomsData = snapshot.val();
                for (const key in roomsData){
                    const timeOut = 600000;
                    const now = Date.now();
                    const msSinceCreated = now - roomsData[key].createdAt;
                    const start = roomsData[key].start;
                    if (msSinceCreated > timeOut &&  start != true) {
                        // It is an old room so wipe it and create a new one
                        var room = database.ref('rooms/' + key);
                        room.remove();
                    }else if (start != true) {
                        this.roomNum = key;
                        this.role = 'guest';
                        break;
                    }
                }
                resolve(this.roomNum);  
            });
        });
    }

    searchRoom(database){
        return new Promise((resolve, reject) => {
            const rooms = database.ref('rooms');
            rooms.once('value',).then((snapshot) => {
                const roomsData = snapshot.val();
                console.log(roomsData);
                if (roomsData == null){
                    this.createRoom(database).then(() => {
                        this.uploadHost(database, this.roomNum);
                        resolve()
                    });
                }else{
                    this.joinRoom(database,roomsData).then(() => {
                        if(this.role == 'none'){
                            this.createRoom(database).then(() => {
                                this.uploadHost(database, this.roomNum);
                            });
                        }else if (this.role = 'guest'){
                            this.uploadGuest(database, this.roomNum);
                        }
                        resolve(this.role);
                    });
                }
            });
        })
    }

    uploadGuest(database, roomNum){
        var guest = database.ref('rooms/' + roomNum + '/guest');
        guest.set(
            {'lastTime': firebase.database.ServerValue.TIMESTAMP}
        );
    }

    uploadHost(database, roomNum){
        database.ref('rooms/' + roomNum + '/guest').once('child_added', () => {
            var host = database.ref('rooms/' + roomNum + '/host');
            host.set(
                {'lastTime': firebase.database.ServerValue.TIMESTAMP}
            );
            var roomStart = database.ref('rooms/' + roomNum + '/start');
            roomStart.set(
                 {'startAt': firebase.database.ServerValue.TIMESTAMP}
            );
        });
    }

    generateRoomNum() {
        var num = '';
        for(let i=0; i<4; i++){
            const ndx = Math.floor(Math.random() * this.roomNumOptions.length);
            num += this.roomNumOptions[ndx];
        }
        return num;
    }
    
    setRoomTime(room,){
        return room.set({
            'createdAt': firebase.database.ServerValue.TIMESTAMP
        });
    }
}