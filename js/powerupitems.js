/**
 * Power-Up Items System
 * Power-Ups spawnen als Items auf dem Spielfeld
 */

class PowerUpItem {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.type = null; // 'speed_boost', 'slow_motion', 'shield', 'score_multiplier'
    this.spawned = false;
    this.rotation = 0;
    this.pulse = 0;
    this.assets = {};
  }
  
  // Assets laden
  async loadAssets() {
    // Verwende Icons aus UI-Assets
    try {
      this.assets.speed_boost = await loadImage('assets/images/ui/icons/Icon01.png');
      this.assets.slow_motion = await loadImage('assets/images/ui/icons/Icon02.png');
      this.assets.shield = await loadImage('assets/images/ui/icons/Icon03.png');
      this.assets.score_multiplier = await loadImage('assets/images/ui/icons/Icon04.png');
    } catch (error) {
      console.warn('Power-Up Item assets nicht geladen, verwende Fallback:', error);
      // Fallback: Assets bleiben null, wird in draw() gehandhabt
    }
  }
  
  // Spawnen an zufälliger Position
  spawn(gridWidth, gridHeight, snakeBody, foodPosition) {
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      this.position.x = randomInt(0, gridWidth - 1);
      this.position.y = randomInt(0, gridHeight - 1);
      attempts++;
    } while (
      (this.isOnSnake(this.position.x, this.position.y, snakeBody) || 
       this.isOnFood(this.position.x, this.position.y, foodPosition)) && 
      attempts < maxAttempts
    );
    
    // Zufälliger Typ (25% Chance für jeden)
    const rand = Math.random();
    if (rand < 0.25) {
      this.type = PowerUpTypes.SPEED_BOOST;
    } else if (rand < 0.5) {
      this.type = PowerUpTypes.SLOW_MOTION;
    } else if (rand < 0.75) {
      this.type = PowerUpTypes.SHIELD;
    } else {
      this.type = PowerUpTypes.SCORE_MULTIPLIER;
    }
    
    this.spawned = true;
    this.rotation = 0;
    this.pulse = 0;
  }
  
  // Prüft ob Position auf Snake ist
  isOnSnake(x, y, snakeBody) {
    return snakeBody.some(segment => segment.x === x && segment.y === y);
  }
  
  // Prüft ob Position auf Food ist
  isOnFood(x, y, foodPosition) {
    return foodPosition && foodPosition.x === x && foodPosition.y === y;
  }
  
  // Prüft Kollision mit Snake-Kopf
  checkCollision(snakeHead) {
    return (
      this.spawned &&
      this.position.x === snakeHead.x &&
      this.position.y === snakeHead.y
    );
  }
  
  // Update (für Animation)
  update(deltaTime) {
    if (!this.spawned) return;
    
    // Rotation
    this.rotation += deltaTime * 0.002; // Langsame Rotation
    
    // Pulse (für Glow-Effekt)
    this.pulse = (this.pulse + deltaTime * 0.005) % (Math.PI * 2);
  }
  
  // Rendering
  draw(ctx, cellSize) {
    if (!this.spawned) return;
    
    // Sicherstellen, dass cellSize gültig ist
    if (!cellSize || !isFinite(cellSize) || cellSize <= 0) {
      console.warn('PowerUpItem.draw: Invalid cellSize', cellSize);
      return;
    }
    
    // Sicherstellen, dass pulse gültig ist
    if (!isFinite(this.pulse)) {
      this.pulse = 0;
    }
    
    const x = this.position.x * cellSize + cellSize / 2;
    const y = this.position.y * cellSize + cellSize / 2;
    const size = cellSize * 0.8;
    
    // Sicherstellen, dass alle Werte endlich sind
    const sinPulse = Math.sin(this.pulse);
    if (!isFinite(sinPulse)) {
      this.pulse = 0;
    }
    
    const pulseSize = size * (1 + Math.sin(this.pulse) * 0.1);
    
    // Validierung: pulseSize muss endlich und positiv sein
    if (!isFinite(pulseSize) || pulseSize <= 0 || pulseSize > cellSize * 2) {
      console.warn('PowerUpItem.draw: Invalid pulseSize', pulseSize);
      return;
    }
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    
    // Glow-Effekt
    const glowIntensity = (Math.sin(this.pulse) + 1) * 0.5;
    
    // Sicherstellen, dass glowIntensity gültig ist
    const validGlowIntensity = isFinite(glowIntensity) ? Math.max(0, Math.min(1, glowIntensity)) : 0.5;
    
    // Farben basierend auf Typ
    let color = '#4CAF50';
    let glowColor = '#81C784';
    
    switch (this.type) {
      case PowerUpTypes.SPEED_BOOST:
        color = '#2196F3'; // Blau
        glowColor = '#64B5F6';
        break;
      case PowerUpTypes.SLOW_MOTION:
        color = '#9C27B0'; // Lila
        glowColor = '#BA68C8';
        break;
      case PowerUpTypes.SHIELD:
        color = '#FFD700'; // Gold
        glowColor = '#FFE082';
        break;
      case PowerUpTypes.SCORE_MULTIPLIER:
        color = '#FFC107'; // Gelb
        glowColor = '#FFD54F';
        break;
    }
    
    // Glow - nur wenn pulseSize gültig ist
    // Zusätzliche Sicherheitsprüfung direkt vor createRadialGradient
    const safePulseSize = isFinite(pulseSize) && pulseSize > 0 && pulseSize < 10000 ? pulseSize : size;
    
    try {
      // Nochmal prüfen, dass alle Werte endlich sind
      if (!isFinite(safePulseSize) || safePulseSize <= 0) {
        throw new Error('Invalid pulseSize: ' + safePulseSize);
      }
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, safePulseSize);
      const alphaHex = Math.floor(validGlowIntensity * 255).toString(16).padStart(2, '0');
      gradient.addColorStop(0, glowColor + alphaHex);
      gradient.addColorStop(1, glowColor + '00');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, safePulseSize, 0, Math.PI * 2);
      ctx.fill();
    } catch (error) {
      console.warn('PowerUpItem.draw: Gradient error', error, { 
        pulseSize, 
        safePulseSize, 
        size, 
        cellSize, 
        pulse: this.pulse,
        x, 
        y 
      });
      // Fallback: einfacher Kreis ohne Gradient
      const fallbackSize = isFinite(size) && size > 0 ? size : cellSize * 0.8;
      ctx.fillStyle = glowColor + '80';
      ctx.beginPath();
      ctx.arc(0, 0, fallbackSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Haupt-Form (Diamant für Power-Up) - Größer
    // Sicherstellen, dass safePulseSize verwendet wird
    const diamondSize = isFinite(safePulseSize) && safePulseSize > 0 ? safePulseSize : size;
    
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3; // Dickerer Rand
    
    ctx.beginPath();
    ctx.moveTo(0, -diamondSize / 2);
    ctx.lineTo(diamondSize / 2, 0);
    ctx.lineTo(0, diamondSize / 2);
    ctx.lineTo(-diamondSize / 2, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Icon oder Symbol in der Mitte
    let icon = null;
    switch (this.type) {
      case PowerUpTypes.SPEED_BOOST:
        icon = this.assets.speed_boost;
        break;
      case PowerUpTypes.SLOW_MOTION:
        icon = this.assets.slow_motion;
        break;
      case PowerUpTypes.SHIELD:
        icon = this.assets.shield;
        break;
      case PowerUpTypes.SCORE_MULTIPLIER:
        icon = this.assets.score_multiplier;
        break;
    }
    
    if (icon) {
      // Zeichne Icon-Asset
      const iconSize = diamondSize * 0.6;
      ctx.drawImage(icon, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
    } else {
      // Fallback: Emoji
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${pulseSize * 0.4}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let symbol = '⚡';
      switch (this.type) {
        case PowerUpTypes.SPEED_BOOST:
          symbol = '⚡';
          break;
        case PowerUpTypes.SLOW_MOTION:
          symbol = '⏱';
          break;
        case PowerUpTypes.SHIELD:
          symbol = '🛡';
          break;
        case PowerUpTypes.SCORE_MULTIPLIER:
          symbol = '✕';
          break;
      }
      ctx.fillText(symbol, 0, 0);
    }
    
    ctx.restore();
  }
  
  // Reset
  reset() {
    this.spawned = false;
    this.position = { x: 0, y: 0 };
    this.type = null;
    this.rotation = 0;
    this.pulse = 0;
  }
}

