class ChangeLvl extends Phaser.State{
  preload(){
      this.preloadBar = this.add.sprite(320, 350, 'preloadBar');
      this.load.setPreloadSprite(this.preloadBar);

  }
  create(){
    this.JsonFile('Write',1); // Escritura de Mapa
//    this.JsonFile('Point',10); // Escritura de Mapa
    this.game.stage.backgroundColor = "#000000";
    var titleStyle = {font:'Riffic', fill: 'White', align: 'center', fontSize: '32px'}; // estilo del texto
    var text = this.game.add.text(370, 500, "Change level", titleStyle); // Texto
    var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startCall, this);
}
  JsonFile(method,lvl){
        jQuery.ajax({
        type: "POST",
        url: 'Js/lvl.master.php',
        dataType: 'json',
        async: true,
        data: {functionname: method, arg: lvl},
        success: function (data) {
            alert(data);
        }
    });
  }
  startCall(){
     // Transition
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
              duration: 3200,
              ease: Phaser.Easing.Elastic.in,
              properties: {
                alpha: 0,
                scale: {
                  x: 1.4,
                  y: 1.4
                }
              }
        });
        // End-Transition
        this.game.stateTransition.to('create');
  }
}
