/**
 * Snake Entity Class
 * Verwaltet die Schlange (Position, Bewegung, Wachstum)
 */

class Snake {
  constructor(x, y, initialLength = 3) {
    // Startposition und Körper
    this.body = [];
    for (let i = 0; i < initialLength; i++) {
      this.body.push({ x: x - i, y: y });
    }
    
    // Richtung
    this.direction = 'right';
    this.nextDirection = 'right';
    
    // Geschwindigkeit (ms pro Bewegung)
    this.speed = 150;
    this.lastMove = 0;
    this.interpolationFactor = 0; // Für smooth Movement
    
    // Assets
    this.headImage = null;
    this.bodyImage = null;
    
    // Power-Up States
    this.shield = false;
    this.speedMultiplier = 1;
  }
  
  // Richtung ändern (verhindert 180°-Wendungen)
  changeDirection(newDirection) {
    const opposite = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };
    
    // Verhindere direkte Umkehrung
    if (newDirection !== opposite[this.direction]) {
      this.nextDirection = newDirection;
    }
  }
  
  // Update (wird vom Game Loop aufgerufen) - Mit Interpolation für smooth Movement
  update(deltaTime) {
    this.lastMove += deltaTime;
    const moveInterval = this.speed / this.speedMultiplier;
    
    if (this.lastMove >= moveInterval) {
      this.move();
      this.lastMove = 0;
    }
    
    // Interpolation-Faktor für smooth Rendering zwischen Moves
    this.interpolationFactor = Math.min(1, this.lastMove / moveInterval);
  }
  
  // Get interpolated position (für smooth Rendering)
  getInterpolatedPosition(segmentIndex) {
    if (segmentIndex === 0 && this.body.length > 1) {
      // Head: Interpoliere zwischen aktueller und nächster Position
      const current = this.body[0];
      const next = this.body[1] || current;
      
      return {
        x: current.x + (next.x - current.x) * (1 - this.interpolationFactor),
        y: current.y + (next.y - current.y) * (1 - this.interpolationFactor)
      };
    }
    return this.body[segmentIndex] || { x: 0, y: 0 };
  }
  
  // Bewegung
  move() {
    this.direction = this.nextDirection;
    const head = { ...this.body[0] };
    
    // Neue Position basierend auf Richtung
    switch (this.direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }
    
    // Neuen Kopf hinzufügen
    this.body.unshift(head);
    // Schwanz entfernen (außer beim Wachstum)
    this.body.pop();
  }
  
  // Wachstum (beim Fressen)
  grow() {
    const tail = { ...this.body[this.body.length - 1] };
    this.body.push(tail);
  }
  
  // Kollisionserkennung
  checkCollision(gridWidth, gridHeight) {
    const head = this.body[0];
    
    // Wenn Shield aktiv, keine Kollision
    if (this.shield) {
      return false;
    }
    
    // Wand-Kollision
    if (head.x < 0 || head.x >= gridWidth || 
        head.y < 0 || head.y >= gridHeight) {
      return true;
    }
    
    // Selbst-Kollision
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    
    return false;
  }
  
  // Prüft ob Position auf Snake-Körper ist
  isOnBody(x, y) {
    return this.body.some(segment => segment.x === x && segment.y === y);
  }
  
  // Assets laden
  async loadAssets() {
    try {
      this.headImage = await loadImage('assets/images/snake/snake_green_head.png');
      this.bodyImage = await loadImage('assets/images/snake/snake_green_blob.png');
    } catch (error) {
      console.warn('Snake assets nicht geladen, verwende Fallback:', error);
    }
  }
  
  // Rendering
  draw(ctx, cellSize) {
    this.body.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (index === 0) {
        // Kopf mit Glow-Effekt
        ctx.save();
        
        // Glow-Effekt für Shield
        if (this.shield) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#FFD700';
        } else {
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#4CAF50';
        }
        
        if (this.headImage) {
          // Rotiere Bild basierend auf Richtung
          ctx.translate(x + cellSize / 2, y + cellSize / 2);
          
          let rotation = 0;
          switch (this.direction) {
            case 'up': rotation = -Math.PI / 2; break;
            case 'down': rotation = Math.PI / 2; break;
            case 'left': rotation = Math.PI; break;
            case 'right': rotation = 0; break;
          }
          ctx.rotate(rotation);
          
          // Größere Snake - 110% der Zellgröße für bessere Sichtbarkeit
          const snakeSize = cellSize * 1.1;
          ctx.drawImage(
            this.headImage,
            -snakeSize / 2,
            -snakeSize / 2,
            snakeSize,
            snakeSize
          );
        } else {
          // Fallback: Größeres Rechteck mit Glow
          const snakeSize = cellSize * 1.1;
          ctx.fillStyle = this.shield ? '#FFD700' : '#4CAF50';
          ctx.fillRect(-snakeSize / 2, -snakeSize / 2, snakeSize, snakeSize);
        }
        
        ctx.restore();
        
        // Shield-Effekt (Ring)
        if (this.shield) {
          ctx.save();
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 3;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFD700';
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2 + 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      } else {
        // Körper mit Gradient
        ctx.save();
        
        if (this.bodyImage) {
          // Größere Snake-Körper-Segmente
          const snakeSize = cellSize * 1.05;
          const offset = (cellSize - snakeSize) / 2;
          ctx.drawImage(this.bodyImage, x + offset, y + offset, snakeSize, snakeSize);
        } else {
          // Fallback: Größeres Rechteck mit Gradient
          const snakeSize = cellSize * 1.05;
          const offset = (cellSize - snakeSize) / 2;
          const gradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
          gradient.addColorStop(0, '#2E7D32');
          gradient.addColorStop(1, '#1B5E20');
          ctx.fillStyle = gradient;
          ctx.fillRect(x + offset, y + offset, snakeSize, snakeSize);
        }
        
        ctx.restore();
      }
    });
  }
  
  // Reset für neues Spiel
  reset(x, y, initialLength = 3) {
    this.body = [];
    for (let i = 0; i < initialLength; i++) {
      this.body.push({ x: x - i, y: y });
    }
    this.direction = 'right';
    this.nextDirection = 'right';
    this.speed = 150;
    this.lastMove = 0;
    this.shield = false;
    this.speedMultiplier = 1;
  }
}

