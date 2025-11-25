/**
 * Partikel-System
 * Erstellt coole visuelle Effekte
 */

class Particle {
  constructor(x, y, type = 'default') {
    this.x = x;
    this.y = y;
    this.type = type;
    
    // Bewegung
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    
    // Lebensdauer
    this.life = 1.0;
    this.decay = 0.02 + Math.random() * 0.03;
    
    // Größe & Farbe
    this.size = 3 + Math.random() * 4;
    this.color = this.getColorForType(type);
    
    // Rotation
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
  }
  
  getColorForType(type) {
    switch (type) {
      case 'food':
        return '#4CAF50';
      case 'special':
        return '#81C784';
      case 'bomb':
        return '#FF5722';
      case 'powerup':
        return '#FFD700';
      case 'levelup':
        return '#9C27B0';
      case 'combo':
        return '#FFC107';
      case 'combo_break':
        return '#F44336';
      default:
        return '#FFFFFF';
    }
  }
  
  update() {
    // Bewegung
    this.x += this.vx;
    this.y += this.vy;
    
    // Physik (Gravitation für manche Typen)
    if (this.type === 'food' || this.type === 'special') {
      this.vy += 0.1; // Schwerkraft
    }
    
    // Rotation
    this.rotation += this.rotationSpeed;
    
    // Lebensdauer reduzieren
    this.life -= this.decay;
    
    // Größe verringern
    this.size *= 0.98;
  }
  
  draw(ctx) {
    if (this.life <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Verschiedene Formen je nach Typ
    switch (this.type) {
      case 'levelup':
        // Stern
        this.drawStar(ctx, 0, 0, this.size, this.size * 0.5, 5);
        break;
      case 'powerup':
        // Glitzer
        this.drawSparkle(ctx, 0, 0, this.size);
        break;
      default:
        // Kreis
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
  }
  
  drawStar(ctx, x, y, outerRadius, innerRadius, points) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }
  
  drawSparkle(ctx, x, y, size) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Kreuz
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
    // Punkt in der Mitte
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  // Partikel-Burst erstellen
  burst(x, y, type, count = 10) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, type));
    }
  }
  
  // Explosion
  explode(x, y, type, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 3;
      const particle = new Particle(x, y, type);
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      this.particles.push(particle);
    }
  }
  
  // Update alle Partikel
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  // Rendering
  draw(ctx) {
    this.particles.forEach(particle => particle.draw(ctx));
  }
  
  // Alle Partikel löschen
  clear() {
    this.particles = [];
  }
}

