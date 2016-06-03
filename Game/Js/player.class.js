class Player extends Phaser.Sprite {


  constructor(game,player,cursor,hp) {
    super(game, 160, 140, player);
    this.anchor.setTo(0.5, 0.5); //Redimencionar el pj
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    game.add.existing(this);


    this.hp = hp; // 3
    this.cursor = cursor;
    this.bullet = null;
  }
  animate(l,r,u,d,h){
    this.animations.add('left', l, 10, true);
    this.animations.add('right',r, 10, true);
    this.animations.add('up',   u, 10, true);
    this.animations.add('down', d, 10, true);
    this.animations.add('stop', h, 2, true);
    //[117,118,119,120,121,122,123,124,125],[143,144,145,146,147,148,149,150,151],[104,105,106,107,108,109,110,111,112],[130,131,132,133,134,135,136,137,138],[26,27]
  }
  attack(q){
    this.animations.add('attack', q, 15, true);
  }
  attackEffects(){
    this.animations.play('attack');
  }
  movePlayer(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    var speed = 210; //Definimos la velocidad inical del jugador
    if (this.cursor.left.isDown) {
        if (this.tween){
          this.body.velocity.x = -5;
          this.animations.play('left');
        }
        else{
          this.body.velocity.x = -speed;
          this.animations.play('left');
        }
    }
    else if (this.cursor.right.isDown) {
        if (this.tween){
          this.body.velocity.x = 5;
          this.animations.play('right');
        }
        else{
          this.body.velocity.x = speed;
          this.animations.play('right');
        }
    }
    else if (this.cursor.up.isDown) {
        if (this.tween){
           this.body.velocity.y = -5;
           this.animations.play('up');
         }
        else{
          this.body.velocity.y = -speed;
          this.animations.play('up');
        }
    }
    else if (this.cursor.down.isDown) {
        if (this.tween){
          this.body.velocity.y = 5;
          this.animations.play('down');
        }
        else{
          this.body.velocity.y = speed;
          this.animations.play('down');
        }
    }
    else{
      this.animations.stop();
      //this.animations.play('stop');
      this.frame =2;
    }

  }
  hit(){
    this.hp >= 0 ? this.hp -= 1 : null;
    if(this.hp != 0){
      this.tint = Math.random() * 0xFF3300;
      this.x -= 25;
    }
    else{
      this.kill();
      alert("¡Has Muerto!\n vidas: "+this.hp);
      this.game.state.start('GameOver');
    }
//    document.getElementById('result').innerHTML = "HP: "+this.hp;
  }
  setBullet(ammo){
    this.bullet += ammo;
  }
  getBullet(){
    return this.bullet;
  }
  restBullet(){
    this.bullet -= 1;
  }
  getHp(){
    return this.hp;
  }
  setHp(){
    if(this.hp < 3){
      this.hp += 1;
    }
  }
}


/*
  Comentario
 */
     /*this.player = this.game.add.sprite(160, 160, 'player');
     this.player.scale.x = 0.5;
     this.player.scale.y = 0.5;
     this.player.anchor.setTo(0.5, 0.5);
     this.game.physics.arcade.enable(this.player);

     this.player.body.bounce.y = 0.2;
     this.player.body.gravity.y = 6; //gravedad
     this.player.body.collideWorldBounds = true; //choque con los bordes del juego

     this.player.animations.add('left', [0, 1, 2], 10, true);
     this.player.animations.add('right', [5, 6, 7], 10, true);
     this.player.scale.set(1.1,1.1);*/
