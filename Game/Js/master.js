
class Game extends Phaser.Game{
  constructor(){
    super(1024,720,Phaser.AUTO,'game_div',null);
    this.state.add('ChangeLvl',ChangeLvl,false);
    this.state.add('GameOver',GameOver,false);
    this.state.add('prealoader',prealoader,false);
    this.state.add('Menu',Menu,false);
    this.state.add('create',create,false);
    this.state.add('WinStage',WinStage,false);
    this.state.add('boot',boot,false);


    this.state.start('boot');
  }
}
new Game();
