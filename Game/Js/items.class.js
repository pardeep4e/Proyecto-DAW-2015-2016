class Items extends Phaser.Sprite {
  constructor(game,sprite) {
    var arrEnemyX = [500,1500,1800,1300,1400,1900,2200,2500,1701,2250];
    var arrEnemyY = [1200,1400,2000,2100,1000,1250,1650,1450,2101,2021];

    var vx = Math.floor((Math.random()*10)+0);
    var vy = Math.floor((Math.random()*10)+0);
    super(game,arrEnemyX[vx],arrEnemyY[vy],sprite);
    this.scale.setTo(1.1, 1.1);
    this.frame = 9;

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    game.add.existing(this);
    this.body.allowGravity = false;

    this.effects = game.add.group();
    for (var i = 0; i < 20; i++)
    {
        this.effect = this.effects.create(0, 0, 'effectRing', [0], false);
        this.effect.anchor.setTo(0.4,0.4);
        this.effect.animations.add('effectRing');
    }
  }
  animate(l,r,u,d){
    this.animations.add('left', l, 10, true);
    this.animations.add('right',r, 10, true);
    this.animations.add('up',   u, 10, true);
    this.animations.add('down', d, 10, true);
  }
  play(){
    this.animations.play('left');
  }
  die(){
    this.kill();
    this.effect = this.effects.getFirstExists(false);
    this.effect.reset(this.x, this.y);
    this.effect.play('effectRing', 40, false, true);
  }
}
