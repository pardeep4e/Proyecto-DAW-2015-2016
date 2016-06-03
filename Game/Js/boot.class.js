
class boot extends Phaser.State{

    preload(){
      this.load.image('preloadBar','Assets/load/loader.png');
    }
    create(){
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('prealoader', true, false);
    }
    getScore(){
        return 1;
    }
}
