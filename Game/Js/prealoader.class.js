class prealoader extends Phaser.State{

  preload(){

    /*
     Plugins
    */

    this.preloadBar = this.add.sprite(320, 300, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);
    /*
      Tilemaps
    */
    this.game.load.tilemap('map1', 'Assets/Map/map001[FINAL].json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('map2', 'Assets/Map/map002[FINAL].json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('map3', 'Assets/Map/map003[FINAL].json', null, Phaser.Tilemap.TILED_JSON);


    /*
    Lvl 1 tiles
     */
    this.game.load.image('tilesBase', 'Assets/Map/wood_tileset.png');
    this.game.load.image('tilesMountain','Assets/Map/mountain_landscape.png');
    this.game.load.image('tilesCastle','Assets/Map/Castle.png');
    this.game.load.image('tilesFances','Assets/Decorative/rpg_maker_vx___fences_by_ayene_chan-d6gfbfd.png');
    this.game.load.image('tilesSignpost','Assets/Decorative/signpost-outsidestuff.png');
    this.game.load.image('tilesTerrain','Assets/Decorative/terrain.png');
    this.game.load.image('tilesObjeto','Assets/Decorative/rpg_maker_vx_rtp_tileset_by_telles0808.png');
    this.game.load.image('tilesDirt','Assets/Map/16oga.png');

    /*
    Lvl 2 tiles
     */
     this.game.load.image('terrain_atlas','Assets/Decorative/terrain_atlas.png');

     /*
     Lvl 3 tiles
      */
     this.game.load.image('tilescave','Assets/Map/cave.png');
    /*
      End Tilemaps
    */

    /*
      Jugadors
    */
    //this.game.load.spritesheet('player','Assets/Humans/dude.png', 32,48);
    //this.game.load.spritesheet('player','Assets/Humans/femaleleatherpreview_0.png',64,64);
    this.game.load.spritesheet('player','Assets/Humans/screen_2_72.png',32,48);


    /*
    Enemigos
     */
    this.game.load.spritesheet('enemigo1','Assets/Humans/big_worm.png',35,49);
    this.game.load.spritesheet('enemigo2','Assets/Humans/pumpking.png',45,46);
    this.game.load.spritesheet('enemigo3','Assets/Humans/bee.png',32,32);
    /*
    Bullets
     */
    this.game.load.spritesheet('bullet','Assets/Weapons/bullet.png');
    /*
    Explosion
     */
    this.game.load.spritesheet('explosion','Assets/Weapons/explosion.png',64, 64, 23);

    /*
    items
     */
    this.game.load.spritesheet('item','Assets/Decorative/items_by_reidyaro.png',32,32);
    this.game.load.image('ammo','Assets/UI/bullet.png');
    /*
    Effects
     */
    this.game.load.spritesheet('effectRing','Assets/effects/ring_magic.png',128,128,40);
    /*
    Menus
    */

    /*
    sound
     */
    this.game.load.audio('epl','Sound/fireball.mp3');
  }
  create(){

    var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startCall, this);
  }
  startCall(){
    this.state.start('Menu');
  }

}
