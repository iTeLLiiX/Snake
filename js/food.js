/**
 * Food System
 * Verwaltet Futter-Spawning und verschiedene Food-Typen
 */

class Food {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.type = 'normal'; // 'normal', 'special', 'bomb'
    this.spawned = false;
    this.assets = {};
  }
  
  // Assets laden
  async loadAssets() {
    try {
      this.assets.normal = await loadImage('assets/images/food/apple_green.png');
      this.assets.special = await loadImage('assets/images/food/Marijuana.png');
      this.assets.bomb = await loadImage('assets/images/food/bomb.png');
      // Mehr Food-Varianten
      this.assets.easter_egg = await loadImage('assets/images/food/easter_egg.png');
      this.assets.oliebol = await loadImage('assets/images/food/oliebol.png');
      this.assets.apple_red = await loadImage('assets/images/food/apple_red.png');
    } catch (error) {
      console.warn('Food assets nicht geladen, verwende Fallback:', error);
    }
  }
  
  // Spawnen an zufälliger Position
  spawn(gridWidth, gridHeight, snakeBody) {
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      this.position.x = randomInt(0, gridWidth - 1);
      this.position.y = randomInt(0, gridHeight - 1);
      attempts++;
    } while (
      this.isOnSnake(this.position.x, this.position.y, snakeBody) && 
      attempts < maxAttempts
    );
    
    // Zufälliger Typ mit verschiedenen Wahrscheinlichkeiten
    const rand = Math.random();
    if (rand < 0.5) {
      this.type = 'normal'; // 50% - Standard Apple Green
    } else if (rand < 0.65) {
      this.type = 'apple_red'; // 15% - Red Apple
    } else if (rand < 0.75) {
      this.type = 'special'; // 10% - Marijuana
    } else if (rand < 0.85) {
      this.type = 'easter_egg'; // 10% - Easter Egg (Bonus)
    } else if (rand < 0.95) {
      this.type = 'oliebol'; // 10% - Oliebol (Heilung)
    } else {
      this.type = 'bomb'; // 5% - Bomb (Gefahr)
    }
    
    this.spawned = true;
  }
  
  // Prüft ob Position auf Snake ist
  isOnSnake(x, y, snakeBody) {
    return snakeBody.some(segment => segment.x === x && segment.y === y);
  }
  
  // Prüft Kollision mit Snake-Kopf
  checkCollision(snakeHead) {
    return (
      this.spawned &&
      this.position.x === snakeHead.x &&
      this.position.y === snakeHead.y
    );
  }
  
  // Punktwert basierend auf Typ
  getPoints() {
    switch (this.type) {
      case 'normal':
        return 1; // 1 Punkt pro Item
      case 'apple_red':
        return 1; // 1 Punkt (gleich wie normal)
      case 'special':
        return 2; // Marijuana gibt 2 Punkte
      case 'easter_egg':
        return 5; // Easter Egg gibt 5 Punkte (Bonus)
      case 'oliebol':
        return 1; // 1 Punkt + Heilung
      case 'bomb':
        return -1; // -1 Punkt (negativ)
      default:
        return 1;
    }
  }
  
  // Spezial-Effekt (z.B. Heilung)
  getSpecialEffect() {
    if (this.type === 'oliebol') {
      return 'heal'; // Heilt 1 Segment
    }
    return null;
  }
  
  // Rendering
  draw(ctx, cellSize) {
    if (!this.spawned) return;
    
    const x = this.position.x * cellSize;
    const y = this.position.y * cellSize;
    
    let image = null;
    let fallbackColor = '#4CAF50';
    
    switch (this.type) {
      case 'normal':
        image = this.assets.normal;
        fallbackColor = '#4CAF50';
        break;
      case 'apple_red':
        image = this.assets.apple_red;
        fallbackColor = '#F44336';
        break;
      case 'special':
        image = this.assets.special;
        fallbackColor = '#81C784';
        break;
      case 'easter_egg':
        image = this.assets.easter_egg;
        fallbackColor = '#FFD700';
        break;
      case 'oliebol':
        image = this.assets.oliebol;
        fallbackColor = '#FF9800';
        break;
      case 'bomb':
        image = this.assets.bomb;
        fallbackColor = '#FF5722';
        break;
    }
    
    if (image) {
      // Größeres Food - 90% der Zellgröße für bessere Sichtbarkeit
      const foodSize = cellSize * 0.9;
      const offset = (cellSize - foodSize) / 2;
      ctx.drawImage(image, x + offset, y + offset, foodSize, foodSize);
    } else {
      // Fallback: Größeres Rechteck
      const foodSize = cellSize * 0.9;
      const offset = (cellSize - foodSize) / 2;
      ctx.fillStyle = fallbackColor;
      ctx.fillRect(x + offset, y + offset, foodSize, foodSize);
      
      // Spezielle Markierung für Special Food
      if (this.type === 'special' || this.type === 'easter_egg') {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.strokeRect(x + offset, y + offset, foodSize, foodSize);
        ctx.shadowBlur = 0;
      }
    }
  }
  
  // Reset
  reset() {
    this.spawned = false;
    this.position = { x: 0, y: 0 };
    this.type = 'normal';
  }
}

