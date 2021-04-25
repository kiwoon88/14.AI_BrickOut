class Block {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  show(){
    stroke('gray');
    strokeWeight(3);
    fill(this.r, this.g, this.b, 150);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Paddle {
  constructor(x){
    this.x = x;
    this.y = backHeight-50;
    this.w = 150;
    this.h = 15;
  }
  
  move(a){
    this.x += a;
  }

  show(){
    fill('#FFFFFF');
    rect(this.x, this.y, this.w, this.h);
  }
}

