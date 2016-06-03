class WinStage extends Phaser.State{

  preload(){
    this.game.load.spritesheet('coin','Assets/Humans/coin.png',32,32);
  }
  create(){
    
    var background;
    this.game.stage.backgroundColor = "#000000";
    var titleStyle = {font:'Riffic', fill: 'White', align: 'center', fontSize: '64px'}; // estilo del texto
    var text = this.game.add.text(330, -100, "¡ YOU WIN !", titleStyle);

    this.game.add.tween(text).to( { y: 200 }, 2400, Phaser.Easing.Bounce.Out, true);

    var css = {font:'Riffic', fill: 'White', align: 'center', fontSize: '32px'}; // estilo del texto
    var input = this.game.add.text(370, 500, "PRESS X FOR END", css);
    input.alpha = 0;

    this.game.add.tween(input).to( { alpha: 1 }, 2000, Phaser.Easing.Bounce.in, true, 0, 1000, true);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.input.onDown.add(this.makeMoney, this);
    this.coin;

    // Si pulsamos la letra "L" el juego comenzara
    var X = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    X.onDown.addOnce(this.detect,this);
  }
  update(){
    
  }
  makeMoney(pointer){
    var px = pointer.x;
    var py = pointer.y;
    this.coin = this.game.add.sprite(px,py,'coin');
    this.coin.animations.add('play',[0,1,2,3,4,5,6,7],10,true);
    this.coin.animations.play('play');

  }
  detect(){
      // Transition 
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
              duration: 3500,
              ease: Phaser.Easing.Elastic.Out,
              properties: {
                alpha: 0,
                scale: {
                  x: 1.4,
                  y: 1.4
                }
              }
        });
        // End-Transition
         this.game.stateTransition.to('Menu');
    }
}
