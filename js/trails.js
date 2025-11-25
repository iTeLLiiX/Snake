/**
 * Trail-System für Snake
 * Erstellt coole Bewegungs-Spuren
 */

class Trail {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.life = 1.0;
    this.decay = 0.05;
  }
  
  update() {
    this.life -= this.decay;
    this.size *= 0.95;
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class TrailSystem {
  constructor() {
    this.trails = [];
  }
  
  addTrail(x, y, color = '#4CAF50', size = 8) {
    this.trails.push(new Trail(x, y, color, size));
  }
  
  update() {
    for (let i = this.trails.length - 1; i >= 0; i--) {
      this.trails[i].update();
      if (this.trails[i].isDead()) {
        this.trails.splice(i, 1);
      }
    }
  }
  
  draw(ctx) {
    this.trails.forEach(trail => trail.draw(ctx));
  }
  
  clear() {
    this.trails = [];
  }
}

