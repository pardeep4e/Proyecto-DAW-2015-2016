class Enemy extends Phaser.Sprite {
  constructor(index,game,enemigo) {
    var arrEnemyX = [300,400,600,800,500,1500,1800,700,1300,1400,1900,2200,2500,1701,2250];
    var arrEnemyY = [790,800,750,900,980,1200,1400,2000,2100,1000,1250,1650,1450,2101,2021];

    var vx = Math.floor((Math.random()*16));
    var vy = Math.floor((Math.random()*16));


    super(game, arrEnemyX[vx],arrEnemyY[vy], enemigo);
    this.scale.setTo(1.1, 1.1);
    this.frame = 6;

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    game.add.existing(this);
    this.hp = 2;
    this.body.allowGravity = false;
  }
  hit(){
    this.hp -= 1;
  }
  animate(l,r,u,d){
    this.animations.add('left', l, 10, true);
    this.animations.add('right',r, 10, true);
    this.animations.add('up',   u, 10, true);
    this.animations.add('down', d, 10, true);
  }
  die(){
    this.kill();
  }
  play(){
      var spedd = 20;
      var c = Math.floor((Math.random()*4));
      if(c == 1){
        this.body.velocity.x = -spedd;
        this.animations.play('left');
      }
      if(c == 2){
        this.body.velocity.x = spedd;
        this.animations.play('right');
      }
      if(c == 3){
        this.body.velocity.y = -spedd;
        this.animations.play('up');
      }
      if(c == 4){
        this.body.velocity.y += spedd;
        this.animations.play('down');
      }
  }
  playOne(direction){
    var spedd = 20;
    if(direction == 'left'){
      this.body.velocity.x = spedd;
      this.animations.play('right');
    }
    if(direction == 'right'){
      this.body.velocity.x = -spedd;
      this.animations.play('left');
    }
    if(direction == 'up'){
      this.body.velocity.y += spedd;
      this.animations.play('down');
    }
    if(direction == 'down'){
      this.body.velocity.y = -spedd;
      this.animations.play('up');
    }
  }
}
