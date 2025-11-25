/**
 * Wall System
 * Wände ab Level 5 als Hindernisse
 * Rockstar Games Level
 */

class Wall {
  constructor(x, y, variant = 0) {
    this.x = x;
    this.y = y;
    this.variant = variant; // 0-6 für verschiedene Varianten
  }
  
  checkCollision(snakeHead) {
    return snakeHead.x === this.x && snakeHead.y === this.y;
  }
}

class WallSystem {
  constructor() {
    this.walls = [];
    this.assets = {};
    this.loaded = false;
  }
  
  // Lade Wall-Assets
  async loadAssets() {
    const promises = [];
    
    // Lade wall_block_0.png bis wall_block_6.png
    for (let i = 0; i <= 6; i++) {
      const path = `assets/images/walls/wall_block_${i}.png`;
      promises.push(
        loadImage(path)
          .then(img => {
            this.assets[i] = img;
          })
          .catch(() => {
            // Fallback: Verwende wall_block.png
            if (i === 0) {
              loadImage('assets/images/walls/wall_block.png')
                .then(img => {
                  this.assets[i] = img;
                })
                .catch(() => {
                  this.assets[i] = null;
                });
            } else {
              this.assets[i] = null;
            }
          })
      );
    }
    
    await Promise.all(promises);
    this.loaded = true;
  }
  
  // Spawne Wände basierend auf Level
  spawnWalls(level, gridWidth, gridHeight, snakeBody, foodPosition, powerUpPosition) {
    this.walls = [];
    
    // Wände nur ab Level 5
    if (level < 5) return;
    
    // Anzahl der Wände basierend auf Level
    let wallCount = 0;
    if (level >= 5 && level < 10) {
      wallCount = 2 + Math.floor((level - 5) / 2); // 2-4 Wände
    } else if (level >= 10 && level < 15) {
      wallCount = 4 + Math.floor((level - 10) / 2); // 4-6 Wände
    } else {
      wallCount = 6 + Math.floor((level - 15) / 3); // 6-8+ Wände
    }
    
    // Spawne Wände
    let attempts = 0;
    const maxAttempts = 200;
    
    while (this.walls.length < wallCount && attempts < maxAttempts) {
      attempts++;
      
      const x = randomInt(2, gridWidth - 3); // Nicht am Rand
      const y = randomInt(2, gridHeight - 3);
      
      // Prüfe ob Position frei ist
      if (this.isValidPosition(x, y, snakeBody, foodPosition, powerUpPosition)) {
        const variant = randomInt(0, 6);
        this.walls.push(new Wall(x, y, variant));
      }
    }
  }
  
  // Prüfe ob Position frei ist
  isValidPosition(x, y, snakeBody, foodPosition, powerUpPosition) {
    // Nicht auf Snake
    if (snakeBody.some(segment => segment.x === x && segment.y === y)) {
      return false;
    }
    
    // Nicht auf Food
    if (foodPosition && foodPosition.x === x && foodPosition.y === y) {
      return false;
    }
    
    // Nicht auf Power-Up
    if (powerUpPosition && powerUpPosition.x === x && powerUpPosition.y === y) {
      return false;
    }
    
    // Nicht auf bereits existierender Wand
    if (this.walls.some(wall => wall.x === x && wall.y === y)) {
      return false;
    }
    
    // Mindestens 2 Zellen Abstand zu anderen Wänden
    if (this.walls.some(wall => {
      const dx = Math.abs(wall.x - x);
      const dy = Math.abs(wall.y - y);
      return dx + dy < 2;
    })) {
      return false;
    }
    
    return true;
  }
  
  // Prüfe Kollision mit Snake
  checkCollision(snakeHead) {
    return this.walls.some(wall => wall.checkCollision(snakeHead));
  }
  
  // Rendering
  draw(ctx, cellSize) {
    if (!this.loaded) return;
    
    this.walls.forEach(wall => {
      const x = wall.x * cellSize;
      const y = wall.y * cellSize;
      
      const asset = this.assets[wall.variant] || this.assets[0];
      
      if (asset) {
        // Zeichne Wall-Asset
        ctx.drawImage(asset, x, y, cellSize, cellSize);
      } else {
        // Fallback: Einfaches Rechteck
        ctx.fillStyle = '#555555';
        ctx.fillRect(x, y, cellSize, cellSize);
        
        // Rand
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    });
  }
  
  // Reset
  reset() {
    this.walls = [];
  }
  
  // Initialisiere System
  async init() {
    await this.loadAssets();
  }
}

// Global verfügbar
let wallSystem = null;

