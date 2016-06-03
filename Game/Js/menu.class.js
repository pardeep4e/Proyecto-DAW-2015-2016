class Menu extends Phaser.State{
    preload(){
        this.game.load.image('bg','Assets/menu/bg3.png');
        this.game.load.image('phjs','Assets/menu/phaserlogo.png');
        this.game.load.image('logo', 'Assets/menu/Logo.png');
 //       this.game.load.spritesheet('campfire','Assets/menu/CampFire.png',64,64);

    }
    create(){
        this.JsonFile('Reset',0);
        var transitionPlugin;
        var bg = this.game.add.sprite(0, 0, 'bg'); // Background
        var logo = this.game.add.sprite(1300,50,'logo'); // Logo
        this.game.stage.backgroundColor = '#FFFFFF'; // Color de fondo
        var titleStyle = {font:'Riffic', fill: '#FFFFFF', align: 'center', fontSize: '32px'}; // estilo del texto
        var text = this.game.add.text(370, 500, "PRESS X TO START", titleStyle); // Texto
        text.alpha = 0;
        // Decoration
        var phlogo = this.game.add.image(820, 550, 'phjs');
        phlogo.scale.setTo(0.3, 0.3);
        this.game.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Bounce.in, true, 0, 1000, true);
        this.game.add.tween(logo).to({x:150},2400, Phaser.Easing.Elastic.in,10,true);

        // Decoration end
        // Si pulsamos la letra "L" el juego comenzara
        var X = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        X.onDown.addOnce(this.detect,this);
    }
    update(){
    }
    detect(){
        // Transition
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
              duration: 3500,
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
    JsonFile(method,lvl){
          jQuery.ajax({
          type: "POST",
          url: 'Js/lvl.master.php',
          dataType: 'json',
          data: {functionname: method, arg: lvl},
          success: function (data) {
              alert(data);
          }
      });
    }
}
