class Bullet extends Phaser.Sprite {
  constructor(game,player,bullet) {
    super(game,0,0, bullet);
    this.game = game;
    this.scale.setTo(0.5,0.5);
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.game.add.existing(this);
    this.slot = 0;
    this.player = player;

    //Creamos las explosion
    this.items = game.add.group();
    for (var i = 0; i < 10; i++)
    {
        this.item = this.items.create(0, 0, 'explosion', [0], false);
        this.item.anchor.setTo(0.5, 0.5);
        this.item.animations.add('explosion');
    }
  }
  //Shoot des de la pocicion del player y sentido
  shoot(cursor){
    var speed = 400;
    this.cursor = cursor;
    this.x = this.player.x;
    this.y = this.player.y;

      if (this.cursor.left.isDown) {
          if (this.tween){
            this.body.velocity.x = -5;
            this.animations.play('left');
            this.angle = 180;
          }
          else{
            this.body.velocity.x = -speed;
            this.animations.play('left');
            this.angle = 180;
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
               this.angle = 270;
           }
          else{
            this.body.velocity.y = -speed;
            this.animations.play('up');
            this.angle = 270;
          }
      }
      else if (this.cursor.down.isDown) {
          if (this.tween){
            this.body.velocity.y = 5;
            this.animations.play('down');
            this.angle = 90;
          }
          else{
            this.body.velocity.y = speed;
            this.animations.play('down');
            this.angle = 90;
          }
      }
      else{
        this.body.velocity.y = speed;
        this.animations.play('down');
        this.angle = 90;
      }
  }
  //Animations de las balas
  animate(l,r,u,d){
    this.animations.add('left', l, 10, true);
    this.animations.add('right',r, 10, true);
    this.animations.add('up',   u, 10, true);
    this.animations.add('down', d, 10, true);
  }
  setSlot(q){
    //asignacion de balas inicial
    this.slot = q;
  }
  getSlot(){
    return this.slot;
  }
  dieBullet(){
    //Elimina la bala, crea explosion
    this.kill();
    this.item = this.items.getFirstExists(false);
    this.item.reset(this.x, this.y);
    this.item.play('explosion', 30, false, true);

  }
}
