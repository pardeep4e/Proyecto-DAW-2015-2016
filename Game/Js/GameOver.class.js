class GameOver extends Phaser.State{

    preload(){
        this.game.load.image('go','Assets/Gameover/newGameOver.png');
        this.game.load.image('bg','Assets/Gameover/gmover.png');

    }
    create(){
        var background;
        var bg = this.game.add.sprite(0, 0, 'bg'); // Background
        this.game.stage.backgroundColor = '#F0F0F0';
         var logo = this.game.add.sprite(210,75,'go');
         logo.alpha = 0;

        var titleStyle = {font:'Riffic', fill: 'white', align: 'center', fontSize: '32px'}; // estilo del texto
        var text = this.game.add.text(350, 500, "PRESS X TO MENU", titleStyle);
        // Texto
        text.alpha = 0;
        // Texto
        this.game.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Circular.In, true, 0, 1000, true);
        this.game.add.tween(logo).to( { alpha: 1 }, 2400, Phaser.Easing.Bounce.In, true, 0, 1000, true);
        // Si pulsamos la letra "X" el juego comenzara
        var x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        x.onDown.addOnce(this.detect,this);

    }
     detect(){
        // Transition
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
              duration: 3500,
              ease: Phaser.Easing.Circular.Out,
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
