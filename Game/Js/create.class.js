
class create extends Phaser.State{
  preload(){
    /*
    Interfaz usuario
    */
    this.game.load.image('boton','Assets/UI/playpausebtn.png');
    this.game.load.image('help','Assets/UI/help.png');

    /*
    Sonido
    */
    this.game.load.audio('music', ['Sound/bso.mp3', 'Sound/bso.ogg']);
  }
  create(){
    this.valid = 1;
    this.music;
    this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.tileSize = 16; // tile is 16x16
    this.tilePerScreen = 12; // height/tileSize
    this.battleEncounter = 0;
    /* physics*/
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    /* input and listener */
    this.cursor = this.game.input.keyboard.createCursorKeys();
    /* map */
    //this.cc = new contador();

    this.lvl = this.readJsonFile(1);

    this.mp = new MapLoader(this.game,0);
    if(this.lvl == 1){
      this.map = this.mp.lvl1();
    }
    if(this.lvl == 2){
      this.map = this.mp.lvl2();
    }
    if(this.lvl == 3){
      this.map = this.mp.lvl3();
    }
    this.layer4 = this.mp.getLayer();


    /*set collision*/
    /*
    Habilitamos las  al layer4
    */
    this.game.physics.arcade.enable(this.layer4);

    this.map.setTileIndexCallback([7410], this.inBattlezone(), this, this.layer4); //if hit, battlezone is entered
    this.map.setCollisionByExclusion([],true,this.layer4);
    /*
      Fijamos la camara 3, 4, 5],[9, 10, 11],[0, 1, 2],[6, 7, 8]);a
     */
    this.camera = {x:0, y:0, direction:'', isMoving:false};

    /*this.player = new Player(this.game,'player',this.cursor);
    this.player.animate([0, 1, 2,3],[5, 6, 7,8],null,null);
    this.player.setBullet(10);*/

    this.items = []; //array de items
    this.createItem();

    this.enemig = []; //array de enemigos
    this.createEnemy();
    this.enemyCount = 0; //Contador de enemigos muertos.

    this.ammo = []; //array de recarga de bullets
    this.createAmmo();
    /*
    Añadimos al player en el game
     */
    //this.player = new Player(this.game,'enemigo3',this.cursor);
    //this.player.animate([3, 4, 5],[9, 10, 11],[0, 1, 2],[6, 7, 8]);
    //this.player.setBullet(10);
     /*
      disparo
      */
    //this.key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    //this.key.onDown.add(this.fireBullet, this);
    //this.svGHp = new svgHp(this.player);

    this.player;
    this.svGHp;
    this.createPlayer();
  }
  /*
  Logica del juego.
   */
  update(){
    this.searchItems();
    this.searchEnemy();//Busca a los enemigos
    this.collide(); // Todas las collisiones
    this.moveCamera();
    this.player.movePlayer();
    this.levelCheck();
    this.pauseSystem();
    this.statusPlayer();//Comprueba el estado del jugador
    this.searchAmmo();//busca si hay colisiones de jugador y proyectiles
    this.Soundcfg();

  }
  createPlayer(){
    /*
    Añadimos al player en el game
     */
    this.player = new Player(this.game,'player',this.cursor,3);
    this.player.animate([4,5,6,7],[8,9,10,11],[12,13,14,15],[0,1,2,3],null);
    //this.player.animate([3, 4, 5],[9, 10, 11],[0, 1, 2],[6, 7, 8]);
    //this.player.animate([117,118,119,120,121,122,123,124,125],[143,144,145,146,147,148,149,150,151],[104,105,106,107,108,109,110,111,112],[130,131,132,133,134,135,136,137,138],[26,27]);
    //this.player.attack([66,67,68,69,70,71,72]);
    this.player.setBullet(10);
     /*
      disparo
      */
    this.key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.key.onDown.add(this.fireBullet, this);
    this.svGHp = new svgHp(this.player);
    this.svGHp.addbullet(this.player.getBullet());
    this.svGHp.addpoint(0);
  }
  /*
  Comprueba el estado del player y reinicia el contador de enemigos muertos
   */
  statusPlayer(){
    if(this.player.getHp() == 0){
      this.JsonFile('Reset',0);
    }
  }
  /*
  Creacio de bala
   */
  createBullet(){
    if(this.player.getBullet() != 0){
      this.bullet = new Bullet(this.game,this.player,'bullet');
      //this.bullet.animate([0,1,2,3,4,5,6,7],[7,6,5,4,3,2,1,0],[0,1,2,3,4,5,6,7],[7,6,5,4,3,2,1,0]);
    }
  }
  /*
  Creacio,disparo de bala y resta.
   */
  fireBullet(){
    this.svGHp.addbullet(this.player.getBullet()-1);
    if(this.player.getBullet() > 0){
      this.createBullet();
      this.bullet.shoot(this.cursor);
      this.player.restBullet();
      this.player.attackEffects();
    }
    else{
      alert('No Bullets');
    }
    this.playEnemy();
  }
   /*
   Añadimos los enemigos
    */
  createEnemy(){
    for(var i=0;i< 20;i++){
      var r = Math.floor((Math.random()*3)+1);
      this.enemig.push(new Enemy(i,this.game,'enemigo'+r));
      this.enemig[i].animate([3, 4, 5],[9, 10, 11],[0, 1, 2],[6, 7, 8]);
      this.enemig[i].play();
    }
  }
  /*
  Busca a los enemigos i detecta si hay Colisione
   */
  searchEnemy(){
    for(var i=0;i<20;i++){
      if(this.game.physics.arcade.collide(this.bullet, this.enemig[i])){
        this.killEnemy(i);
      }
      if(this.game.physics.arcade.collide(this.layer4, this.enemig[i])){
        this.playOneEnemy(i);
      }
    }
  }
  /*
  Elimina a los enemigos
   */
  killEnemy(i){
    this.enemyCount++;
    this.bullet.dieBullet();
    this.enemig[i].die();
    this.JsonFile('Point',this.enemyCount);// cuenta los enemigos muertos
    this.svGHp.addpoint(this.readJsonFile(2));
      if(this.readJsonFile(2) >= 30){
        this.state.start('WinStage');
    }
  }
  /*
  Movimiento de camara.
   */
  moveCamera(){
    if (this.camera.isMoving)return;

    this.camera.isMoving = true;
    var mustMove = false;

    if (this.player.y > this.game.camera.y + this.game.height) {
        this.camera.y += 1;
        mustMove = true;
    }
    else if (this.player.y < this.game.camera.y) {
        this.camera.y -= 1;
        mustMove = true;
    }
    else if (this.player.x > this.game.camera.x + this.game.width) {
        this.camera.x += 1;
        mustMove = true;
    }
    else if (this.player.x < this.game.camera.x) {
        this.camera.x -= 1;
        mustMove = true;
    }

    if (mustMove) {
        var t = this.game.add.tween(this.game.camera).to({x:this.camera.x*this.game.width, y:this.camera.y*this.game.height}, 600);
        t.start();
        t.onComplete.add(function(){this.camera.isMoving = false;}, this);
    }
    else {
        this.camera.isMoving = false;
    }
  }
  inBattlezone(){
    if (this.cursor.up.isDown || this.cursor.down.isDown || this.cursor.left.isDown || this.cursor.right.isDown) {
        this.battleEncounter++;
        console.log('random battle tick');
        if (Math.floor((this.battleEncounter/1000)*Math.random()) >= 1) {
            console.log('random battle occured');
            this.battleEncounter = 0;
        }
    }
  }
  /*
  Colisiones.
   */
  collide(){
    if(this.game.physics.arcade.collide(this.player, this.enemig)){
       this.player.hit();
       this.svGHp.hpDown();
       this.JsonFile('Write',1);
     }else this.player.tint = 0xFFFFFF;

    if(this.game.physics.arcade.collide(this.bullet, this.enemig)){ this.enemig.die(); this.bullet.dieBullet();}
    if(this.game.physics.arcade.collide(this.layer4, this.bullet)) this.bullet.dieBullet();


    this.game.physics.arcade.collide(this.player, this.layer4);
    this.game.physics.arcade.collide(this.player, this.enemig);
    this.game.physics.arcade.collide(this.layer4, this.enemig);
  }
  /*
  Anima al array de enemigos
   */
  playEnemy(){
    for(var i=0;i<20;i++){
      this.enemig[i].play();
    }
  }
  /*
  anima a un enemigo en concreto
   */
  playOneEnemy(i){
    this.enemig[i].playOne(this.enemig[i].animations.name);
  }
  /*
  Comprueba el nivel
   */
  levelCheck(){
    if(this.readJsonFile(2) == 10){
      this.JsonFile('Write',2);
      this.state.start('ChangeLvl');
      this.music.stop();
    }
    if(this.readJsonFile(2) == 20){
      this.JsonFile('Write',3);
      this.state.start('ChangeLvl');
      this.music.stop();
    }
  }
  startCall(){
    this.createPlayer();
  }
  /*
  crea los items
   */
  createItem(){
    for(var i=0;i<3;i++){
      this.items[i] = new Items(this.game,'item');
    }
  }
  /*
  Busca los items y Comprueba si hay Colisiones
   */
  searchItems(){
    for(var i=0;i<this.items.length;i++){
      if(this.game.physics.arcade.collide(this.player, this.items[i])){
        this.reloads(i);
      }
    }
  }
  /*
  elimina, y aumenta la vida
   */
  reloads(i){
    this.items[i].die();
    this.player.setHp();
    this.svGHp.hpUp();
  }
  /*
  lee el arcivo Json y devuelve los datos
   */
  readJsonFile(method){
    var data;
    var type;
    var peticio = new XMLHttpRequest();
        peticio.open("GET", "Js/testClass/lvl.json", false);
        peticio.send(null);
        var estat = peticio.status;
        if (estat == 200) {
          data = JSON.parse(peticio.responseText);
          if(method == 1){
            type = data.ID;
          }
          if(method == 2){
            type = data.PO;
          }
        }
    return type;
  }
  /*
  Escribe en el arcivo json, con ajax y php
   */
  JsonFile(method,lvl){
        jQuery.ajax({
        type: "POST",
        url: 'Js/testClass/lvl.master.php',
        dataType: 'json',
        data: {functionname: method, arg: lvl},
        success: function (data) {
            alert(data);
        }
    });
  }
  /*PAUSE*/
  pauseSystem(){

    var titleStyle;
    var text;
    var btn;
    var help;
    var p = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        p.onDown.addOnce(function(){
            this.game.paused = true;
            btn = this.game.add.sprite(470,300,'boton');
            btn.scale.setTo(2.0,2.0);
            this.music.stop();
            help = this.game.add.sprite(350,450,'help');

        },this);
    var o = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
        o.onDown.addOnce(function(){
            this.game.paused = false;
            btn.kill();
            help.kill();
        },this);
  }
  /*
  creaion de proyectiles
   */
  createAmmo(){
    for(var i=0;i<2;i++){
      this.ammo[i] = new Items(this.game,'ammo');
    }
  }
  searchAmmo(){
    for(var i=0;i<this.ammo.length;i++){
      if(this.game.physics.arcade.collide(this.player, this.ammo[i])){
        this.reloadsAmoo(i);
      }
    }
  }
  reloadsAmoo(i){
    this.ammo[i].die();
    this.player.setBullet(5);
    this.svGHp.addbullet(this.player.getBullet());
  }
  Soundcfg(){
    var titleStyle;
    var text;
    this.music = this.game.add.audio('music');
    this.music.loop = true;
    this.music.volume = 1;
    this.music.play();

    titleStyle = {font:'Riffic', fill: 'White', align: 'center', fontSize: '32px'}; // estilo del texto
    var S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    S.onDown.addOnce(function(){
           this.music.stop();
            text = this.game.add.text(330, 500, "silence", titleStyle);
        },this);
  }

}
