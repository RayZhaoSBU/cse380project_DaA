class DAA_Button {
    constructor(scene, image, scale, x , y, visible) {
        this.x=x;
        this.y=y;
        this.scene = scene;
        this.image = this.scene.add.image(x, y, image);
        this.image.setDisplaySize(this.image.width * scale, this.image.height * scale);
        this.image.buttonSelect = false;
        this.image.fixedWidth = this.image.displayWidth;
        this.image.fixedHeight = this.image.displayHeight;
        this.image.magnifyWidth = 20;
        this.image.magnifyHeigth = 20;
        var buttonImage = this.image;
        this.image.visible = visible == null ? true : visible;

        var clickSound = scene.clickSound;
        buttonImage.setInteractive().on('pointerover' , function(pointer){
            clickSound.play();
            if (buttonImage.buttonSelect == true) return;
            buttonImage.setDisplaySize(
                buttonImage.fixedWidth + buttonImage.magnifyWidth, 
                buttonImage.fixedHeight + buttonImage.magnifyHeigth);
        });
        buttonImage.setInteractive().on('pointerout' , function(pointer){
            if (buttonImage.buttonSelect == true) return;
            buttonImage.setDisplaySize(
            buttonImage.fixedWidth, 
            buttonImage.fixedHeight);
        });
    }


    costDisplay(xPlus,yPlus,cost,type){
        this.type=type;
        this.text=this.scene.add.text(this.x+xPlus, this.y+yPlus, cost, { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
        this.text.setColor('#000000');
        return this;
    }

    getFixedWidth(){
        return this.image.fixedWidth;
    }

    getFixedHeight(){
        return this.image.fixedHeight;
    }

    getDisplayWidth(){
        return this.image.displayWidth;
    }

    getDisplayHeight(){
        return this.image.displayWidth;
    }

    setDisplaySize(width, height){
        this.image.setDisplaySize(width, height);
    }

    getX(){
        return this.image.x;
    }

    getY(){
        return this.image.y;
    }

    getImage(){
        return this.image;
    }

    setX(x){
        this.image.x = x;
    }

    setY(y){
        this.image.y = y;
    }

    setXY(x, y){
        this.image.x = x;
        this.image.y = y;
    }

    setMagnifySize(width, height){
        this.image.magnifyWidth = width == null ? this.image.magnifyWidth : width;
        this.image.magnifyHeigth = height == null ? this.image.magnifyHeigth : height;
    }

    magnify(){
        this.setDisplaySize(
            this.image.fixedWidth + this.image.magnifyWidth, 
            this.image.fixedHeight + this.image.magnifyHeigth);
    }

    unmagnify(){
        this.setDisplaySize(
            this.image.fixedWidth, 
            this.image.fixedHeight);
    }

    isSelect(){
        return this.image.buttonSelect;
    }

    setSelect(isSelect){
        this.image.buttonSelect = isSelect;
    }
    
    onClick(callback){
        this.image.setInteractive().on('pointerup', callback);
    }
    setVisible(visible){
        this.image.visible = visible;

    }
    update(player, elem){
        if(this.image.visible){
            var color = player.bcg+player[elem] * 25 <= player.gold ? '#000000' : '#ff0000'
            this.text.setColor(color);
            this.text.setText("$" + (player.bcg + player[elem] * 25));
        }
        else{
            this.text.setText('');
        }
    }

    textDisplaySpell (textEX, textEY, textGX, textGY, textCX, textCY) {
        this.cdCounter = 0;
        this.elemText = this.scene.add.text(this.x + textEX, this.y + textEY, '00', { fontFamily: 'Arial', fontSize: 16, color: '#000000' })
        this.costText = this.scene.add.text(this.x + textGX, this.y + textGY, '100', { fontFamily: 'Arial', fontSize: 16, color: '#000000' })
        this.cdText = this.scene.add.text(this.x + textCX, this.y + textCY, '00', { fontFamily: 'Arial', fontSize: 16, color: '#ff0000' })
    
    }

    updateSpell (player, elem)  {
        if(this.image.visible){
            var color = player.bcg+player[elem] * 25 <= player.gold ? '#000000' : '#ff0000'
            this.costText.setColor(color);
            this.costText.setText("$" + (player.bcg + player[elem] * 25));
        }
        else{
            this.costText.setText('');
        }

        if(this.cdCounter > 0){
            this.cdText.setText(Math.ceil(this.cdCounter < 10 ? '0' + this.cdCounter : this.cdCounter));
        }else{
            this.cdText.setText('');
        }

        var elem = player[elem];
        var elemT = elem < 10 ?  "0" + elem  :  elem;
        this.elemText.setText(elemT);
    }
    
}