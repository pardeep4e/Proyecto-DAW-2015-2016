class MapLoader {
  constructor(game,index) {
    this.game = game;
    this.map;
    this.layer1;
    this.layer2;
    this.layer3;
    this.layer4;
    this.layer5;
    this.layer6;
  }
  lvl1(){

    this.map = this.game.add.tilemap('map1');

    this.map.addTilesetImage('terrain','tilesBase');
    this.map.addTilesetImage('mountain','tilesMountain');
    this.map.addTilesetImage('castle','tilesCastle');
    this.map.addTilesetImage('fences','tilesFances');
    this.map.addTilesetImage('obj1','tilesSignpost');
    this.map.addTilesetImage('elements','tilesTerrain');
    this.map.addTilesetImage('obj2','tilesObjeto');
    this.map.addTilesetImage('dirt','tilesDirt');
    /*
      Creamos los layers con json
     */
    this.layer1 = this.map.createLayer('Base');
    this.layer2 = this.map.createLayer('Base1');
    this.layer3 = this.map.createLayer('Base2');
    this.layer4 = this.map.createLayer('Physics');
    this.layer5 = this.map.createLayer('obj1');
    /*
      Escalamos todos los layers
     */
    this.layer1.setScale(1.6,1.6);
    this.layer2.setScale(1.6,1.6);
    this.layer3.setScale(1.6,1.6);
    this.layer4.setScale(1.6,1.6);
    /*
      Adapta los layers
     */
    this.layer1.resizeWorld();
    this.layer2.resizeWorld();
    this.layer3.resizeWorld();
    this.layer4.resizeWorld();

    return this.map;
  }
  lvl2(){
    this.map = this.game.add.tilemap('map2');

    this.map.addTilesetImage('Terrain','tilesBase');
    this.map.addTilesetImage('mountain','tilesMountain');
    this.map.addTilesetImage('Base','tilesCastle');
    this.map.addTilesetImage('fences','tilesFances');
    this.map.addTilesetImage('Global','tilesObjeto');
    this.map.addTilesetImage('Base2','terrain_atlas');

    //this.map.addTilesetImage('obj1','tilesSignpost');
    //this.map.addTilesetImage('elements','tilesTerrain');
    //this.map.addTilesetImage('dirt','tilesDirt');

    /*
      Creamos los layers con json
     */
    this.layer1 = this.map.createLayer('Terrain');
    this.layer2 = this.map.createLayer('Base');
    this.layer3 = this.map.createLayer('Decorative1');
    this.layer5 = this.map.createLayer('Decorative2');
    this.layer4 = this.map.createLayer('Physics');
    this.layer6 = this.map.createLayer('Decorative3');
    /*
      Escalamos todos los layers
     */
    this.layer1.setScale(1.6,1.6);
    this.layer2.setScale(1.6,1.6);
    this.layer3.setScale(1.6,1.6);
    this.layer4.setScale(1.6,1.6);
    this.layer5.setScale(1.6,1.6);
    this.layer6.setScale(1.6,1.6);
    /*
      Adapta los layers
     */
    this.layer1.resizeWorld();
    this.layer2.resizeWorld();
    this.layer3.resizeWorld();
    this.layer4.resizeWorld();
    this.layer5.resizeWorld();
    this.layer6.resizeWorld();

    return this.map;
  }
  lvl3(){
    this.map = this.game.add.tilemap('map3');

    this.map.addTilesetImage('wood_tileset','tilesBase');
    this.map.addTilesetImage('Variado','tilesObjeto');
    this.map.addTilesetImage('cave','tilescave');

    /*
      Creamos los layers con json
     */
    this.layer1 = this.map.createLayer('Terrain');
    this.layer2 = this.map.createLayer('Base');
    this.layer3 = this.map.createLayer('Base2');
    this.layer4 = this.map.createLayer('Physics');

    /*
      Escalamos todos los layers
     */
    this.layer1.setScale(1.6,1.6);
    this.layer2.setScale(1.6,1.6);
    this.layer3.setScale(1.6,1.6);
    this.layer4.setScale(1.6,1.6);
    /*
      Adapta los layers
     */
    this.layer1.resizeWorld();
    this.layer2.resizeWorld();
    this.layer3.resizeWorld();
    this.layer4.resizeWorld();

    return this.map;
  }
  getLayer(){
    return this.layer4;
  }

}

/* map */
/*  this.map = new Map(this.game);
this.map.prealoader(0);
var tilesArray = this.map.Tiles(0);
this.map.addTileset(tilesArray);
this.map.createLayer(['Base','Base1','Base2','Physics','obj1']);
this.map.layerOptions();*/

/*this.map.addTileset('terrain','tilesBase');
this.map.addTileset('mountain','tilesMountain');
this.map.addTileset('castle','tilesCastle');
this.map.addTileset('fences','tilesFances');
this.map.addTileset('elements','tilesTerrain');
this.map.addTileset('obj2','tilesObjeto');
this.map.addTileset('dirt','tilesDirt');

this.map.createLayer('Base');
this.map.createLayer('Base1');
this.map.createLayer('Base2');
this.map.createLayer('Physics');
this.map.createLayer('obj1');
this.map.scaleLayer();*/

//this.map = this.game.add.tilemap('map');
/*
  Asignamos las images a los json
 */
/*this.map.addTilesetImage('terrain','tilesBase');
this.map.addTilesetImage('mountain','tilesMountain');
this.map.addTilesetImage('castle','tilesCastle');
this.map.addTilesetImage('fences','tilesFances');
this.map.addTilesetImage('obj1','tilesSignpost');
this.map.addTilesetImage('elements','tilesTerrain');
this.map.addTilesetImage('obj2','tilesObjeto');
this.map.addTilesetImage('dirt','tilesDirt');*/
/*
  Creamos los layers con json
 */
/*this.layer1 = this.map.createLayer('Base');
this.layer2 = this.map.createLayer('Base1');
this.layer3 = this.map.createLayer('Base2');
this.layer4 = this.map.createLayer('Physics');
this.layer5 = this.map.createLayer('obj1');*/
/*
  Escalamos todos los layers
 */
/*this.layer1.setScale(1.6,1.6);
this.layer2.setScale(1.6,1.6);
this.layer3.setScale(1.6,1.6);
this.layer4.setScale(1.6,1.6);*/
/*
  Adapta los layers
 */
/*this.layer1.resizeWorld();
this.layer2.resizeWorld();
this.layer3.resizeWorld();
this.layer4.resizeWorld();*/

/*set collision*/
