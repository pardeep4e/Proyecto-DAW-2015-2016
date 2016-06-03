class svgHp {
  constructor(plyaer) {
    this.player = plyaer;
    this.s = Snap("#svg");
    this.bg;
    this.items = [];
    this.createObjects();
    this.cloneObjects();
    this.i = 2;
    this.v = 1;
    this.points;
    this.bullets;
  }
  createObjects(){
     this.bg = this.s.rect(0,200,170,720)
    .attr({fill:"rgb(43, 171, 72)"})
    .animate({transform:'t0,-500r0'},2000,mina.bounce);
    return this.bg;
  }
  cloneObjects(){
    for(var i=0;i<3;i++){
      this.items[i] = this.s.image("Assets/UI/love-35696_960_720.png",15,200,30,30)
      .animate({transform:'t'+25*2.2*i+',-170r0'},2000,mina.bounce);
    }
    //Gost
    this.s.image("Assets/UI/gost.png",15,200,30,30)
    .animate({transform:'t'+30+',-100r0'},2000,mina.bounce);
    //Text Points
    this.points = this.s.text(15, 200, []);
    //Bullet
    this.s.image("Assets/UI/bullet.png",15,200,30,30)
    .animate({transform:'t'+30+',-40r0'},2000,mina.bounce);
    //Text Bullets
    this.bullets = this.s.text(15, 200, []);

    //Text puase
     this.s.text(15, 200, ["P"," = ","P","A","U","S","E"])
     .attr({'font-family':'Riffic'})
     .animate({transform:'t'+30+',40r0'},2000,mina.bounce);
     //Text UnPause
     this.s.text(15, 200, ["O"," = ","U","N","P","A","U","S","E"])
     .attr({'font-family':'Riffic'})
     .animate({transform:'t'+30+',80r0'},2000,mina.bounce);
  }
  hpDown(){
    this.items[this.i].attr({opacity:0});
    this.i -= 1;
  }
  hpUp(){
    if(this.i < 2){
      this.i += 1;
      this.items[this.i].attr({opacity:1});
    }
  }
  addpoint(p){
    //Update text points
    this.points.attr({text:"x "+p,'font-family':'Riffic'})
    .animate({transform:'t'+60+',-80r0'},2000,mina.bounce);
  }
  addbullet(p){
    //Update text bullet
    this.bullets.attr({text:"x "+p,'font-family':'Riffic'})
    .animate({transform:'t'+60+',-15r0'},2000,mina.bounce);
  }

}
