/**
 * Game Controller - Rockstar Games Level
 * Haupt-Game-Loop und Game-Logik mit Premium-Effekten
 */

class Game {
  constructor() {
    // Canvas Setup (Performance-optimiert)
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d', {
      alpha: false, // Performance: kein Alpha-Kanal wenn nicht nötig
      desynchronized: true, // Performance: asynchrones Rendering
      willReadFrequently: false // Performance: optimiert für Schreiben
    });
    
    // Game State
    this.isRunning = false;
    this.isPaused = false;
    this.lastTime = 0;
    
    // Game Entities
    this.snake = null;
    this.food = null;
    this.powerUpItem = null; // Power-Up als Item auf Spielfeld
    this.powerUpManager = null;
    this.particles = new ParticleSystem();
    this.trails = new TrailSystem();
    this.effects = new VisualEffects(this.canvas);
    this.background = null; // Wird in init() initialisiert
    
    // Render Canvas (für Effekte)
    this.renderCanvas = document.createElement('canvas');
    this.renderCtx = this.renderCanvas.getContext('2d');
    
    // Game Stats
    this.score = 0;
    this.level = 1;
    this.itemsEaten = 0;
    this.highscore = 0;
    
    // Combo System
    this.combo = 0;
    this.comboTimer = 0;
    this.comboTimeLimit = 2000; // 2 Sekunden
    this.maxCombo = 0;
    
    // Game Statistics (für Game-Over)
    this.startTime = 0;
    this.gameTime = 0;
    this.powerUpsCollected = 0;
    this.foodTypesEaten = {
      normal: 0,
      apple_red: 0,
      special: 0,
      easter_egg: 0,
      oliebol: 0,
      bomb: 0
    };
    
    // Grid (Größer für bessere Sichtbarkeit)
    this.gridWidth = 0;
    this.gridHeight = 0;
    this.cellSize = 35; // Größer: von 20 auf 35 (75% größer!)
    
    // Difficulty
    this.difficulty = 'medium';
    
    // Setup
    this.setupCanvas();
    this.init();
  }
  
  // Canvas Setup
  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.resizeCanvas(), 100);
    });
  }
  
  // Canvas Größe anpassen (Größeres Spielfeld)
  resizeCanvas() {
    const container = document.getElementById('game-container');
    const header = document.querySelector('.game-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const dPad = document.getElementById('d-pad');
    const dPadHeight = dPad && !dPad.classList.contains('hidden') ? dPad.offsetHeight : 0;
    
    // Größeres Spielfeld - nutze mehr Platz
    const maxWidth = Math.min(window.innerWidth - 32, 1200); // Von 600 auf 1200
    const maxHeight = window.innerHeight - headerHeight - dPadHeight - 32; // Weniger Padding
    
    // Berechne optimale Zellgröße (größere Zellen)
    const cols = Math.floor(maxWidth / this.cellSize);
    const rows = Math.floor(maxHeight / this.cellSize);
    
    // Grid-Größe (mindestens 15x15 für spielbares Feld)
    this.gridWidth = Math.max(cols, 20);
    this.gridHeight = Math.max(rows, 20);
    
    // Canvas-Größe (nutze vollständigen Platz)
    this.canvas.width = this.gridWidth * this.cellSize;
    this.canvas.height = this.gridHeight * this.cellSize;
    
    // Render Canvas für Effekte
    this.renderCanvas.width = this.canvas.width;
    this.renderCanvas.height = this.canvas.height;
    
    // Effects resize
    this.effects.resize(this.canvas.width, this.canvas.height);
    
    // Wenn Spiel läuft, Snake neu positionieren
    if (this.snake && this.isRunning) {
      const centerX = Math.floor(this.gridWidth / 2);
      const centerY = Math.floor(this.gridHeight / 2);
      this.snake.reset(centerX, centerY);
    }
  }
  
  // Initialisierung
  async init() {
    // Entities erstellen
    this.snake = new Snake(
      Math.floor(this.gridWidth / 2),
      Math.floor(this.gridHeight / 2)
    );
    this.food = new Food();
    this.powerUpItem = new PowerUpItem();
    this.powerUpManager = new PowerUpManager();
    
    // Assets laden
    await this.loadAssets();
    
    // Background initialisieren
    this.background = new BackgroundSystem(this.canvas);
    await this.background.loadAssets();
    
    // Highscore laden
    this.highscore = Storage.get('highscore', 0);
  }
  
  // Assets laden
  async loadAssets() {
    try {
      await Promise.all([
        this.snake.loadAssets(),
        this.food.loadAssets(),
        this.powerUpItem.loadAssets()
      ]);
    } catch (error) {
      console.error('Fehler beim Laden der Assets:', error);
    }
  }
  
  // Spiel starten
  start() {
    if (this.isRunning) return;
    
    // Reset
    this.score = 0;
    this.level = 1;
    this.itemsEaten = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.maxCombo = 0;
    this.startTime = Date.now();
    this.gameTime = 0;
    this.powerUpsCollected = 0;
    this.foodTypesEaten = {
      normal: 0,
      apple_red: 0,
      special: 0,
      easter_egg: 0,
      oliebol: 0,
      bomb: 0
    };
    
    // Snake positionieren
    const centerX = Math.floor(this.gridWidth / 2);
    const centerY = Math.floor(this.gridHeight / 2);
    this.snake.reset(centerX, centerY);
    
    // Food spawnen
    this.food.spawn(this.gridWidth, this.gridHeight, this.snake.body);
    
    // Power-Ups zurücksetzen
    this.powerUpManager.reset();
    this.powerUpItem.reset();
    
    // Systems zurücksetzen
    this.particles.clear();
    this.trails.clear();
    // Effects haben kein reset, aber das ist OK
    
    // Game Loop starten
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.gameLoop();
    
    // Musik starten
    if (window.soundManager) {
      window.soundManager.playMusic();
    }
    
    // UI aktualisieren
    if (window.ui) {
      window.ui.updateScore(this.score);
      window.ui.updateLevel(this.level);
      window.ui.hidePauseOverlay();
    }
  }
  
  // Spiel stoppen
  stop() {
    this.isRunning = false;
    this.isPaused = false;
    
    // Musik stoppen
    if (window.soundManager) {
      window.soundManager.stopMusic();
    }
  }
  
  // Pause togglen
  togglePause() {
    if (!this.isRunning) return;
    
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      if (window.ui) {
        window.ui.showPauseOverlay();
      }
    } else {
      if (window.ui) {
        window.ui.hidePauseOverlay();
      }
      this.lastTime = performance.now();
      this.gameLoop();
    }
  }
  
  // Schwierigkeit setzen
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    if (this.snake) {
      switch (difficulty) {
        case 'easy':
          this.snake.speed = 200;
          break;
        case 'medium':
          this.snake.speed = 150;
          break;
        case 'hard':
          this.snake.speed = 100;
          break;
      }
    }
  }
  
  // Game Loop (Optimiert für 60 FPS)
  gameLoop(currentTime) {
    if (!this.isRunning) return;
    
    if (this.isPaused) {
      requestAnimationFrame((time) => this.gameLoop(time));
      return;
    }
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Cap deltaTime für Stabilität (max 100ms = 10 FPS minimum)
    const cappedDeltaTime = Math.min(deltaTime, 100);
    
    // Update (immer, für smooth Animationen)
    if (cappedDeltaTime > 0) {
      this.update(cappedDeltaTime);
    }
    
    // Render (immer, für 60 FPS)
    this.render();
    
    requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  // Update Game State (Optimiert)
  update(deltaTime) {
    // Snake updaten (wichtigste Logik zuerst)
    this.snake.update(deltaTime);
    
    // Kollisionsprüfung (früh prüfen für Performance)
    if (this.snake.checkCollision(this.gridWidth, this.gridHeight)) {
      this.gameOver();
      return;
    }
    
    // Food-Kollision
    if (this.food.checkCollision(this.snake.body[0])) {
      this.eatFood();
    }
    
    // Power-Up Item Kollision
    if (this.powerUpItem && this.powerUpItem.spawned && this.powerUpItem.checkCollision(this.snake.body[0])) {
      this.collectPowerUp();
    }
    
    // Power-Ups updaten
    this.powerUpManager.update(deltaTime);
    this.applyPowerUps();
    
    // Power-Up Item updaten (Animation)
    if (this.powerUpItem && this.powerUpItem.spawned) {
      this.powerUpItem.update(deltaTime);
    }
    
    // Power-Up Timer UI aktualisieren (alle 100ms für smooth Animation)
    if (window.ui && (!this.lastPowerUpUpdate || Date.now() - this.lastPowerUpUpdate > 100)) {
      const activePowerUps = this.powerUpManager.getActive();
      window.ui.updatePowerUpDisplay(activePowerUps);
      
      activePowerUps.forEach(type => {
        const remaining = this.powerUpManager.getRemainingTime(type);
        const config = PowerUpConfig[type];
        if (config && config.duration !== Infinity) {
          window.ui.updatePowerUpTimer(type, remaining, config.duration);
        }
      });
      
      this.lastPowerUpUpdate = Date.now();
    }
    
    // Combo Timer updaten
    if (this.comboTimer > 0) {
      this.comboTimer -= deltaTime;
      if (this.comboTimer <= 0) {
        if (this.combo > 1 && this.snake.body.length > 0) {
          const head = this.snake.body[0];
          const headX = head.x * this.cellSize + this.cellSize / 2;
          const headY = head.y * this.cellSize + this.cellSize / 2;
          this.particles.burst(headX, headY, 'combo_break', 5);
        }
        this.combo = 0;
      }
    }
    
    // Visual Effects updaten (nur wenn aktiv)
    if (this.effects.shakeIntensity > 0 || this.effects.flashAlpha > 0) {
      this.effects.update();
    }
    
    // Background updaten
    if (this.background) {
      this.background.update(deltaTime);
    }
    
    // Game Time aktualisieren
    if (this.startTime > 0) {
      this.gameTime = Date.now() - this.startTime;
    }
    
    // Trail für Snake-Kopf hinzufügen (nur wenn bewegt)
    if (this.snake.body.length > 0) {
      const head = this.snake.body[0];
      const headX = head.x * this.cellSize + this.cellSize / 2;
      const headY = head.y * this.cellSize + this.cellSize / 2;
      const trailColor = this.snake.shield ? '#FFD700' : '#4CAF50';
      this.trails.addTrail(headX, headY, trailColor, 6);
    }
    
    // Partikel updaten (immer, aber optimiert)
    this.particles.update();
    
    // Trails updaten
    this.trails.update();
  }
  
  // Power-Up Effekte anwenden
  applyPowerUps() {
    // Speed Boost / Slow Motion
    if (this.powerUpManager.isActive(PowerUpTypes.SPEED_BOOST)) {
      this.snake.speedMultiplier = PowerUpConfig[PowerUpTypes.SPEED_BOOST].speedMultiplier;
    } else if (this.powerUpManager.isActive(PowerUpTypes.SLOW_MOTION)) {
      this.snake.speedMultiplier = PowerUpConfig[PowerUpTypes.SLOW_MOTION].speedMultiplier;
    } else {
      this.snake.speedMultiplier = 1;
    }
    
    // Shield
    this.snake.shield = this.powerUpManager.isActive(PowerUpTypes.SHIELD);
  }
  
  // Food essen
  eatFood() {
    const points = this.food.getPoints();
    const multiplier = this.powerUpManager.isActive(PowerUpTypes.SCORE_MULTIPLIER) ? 2 : 1;
    const finalPoints = points * multiplier;
    
    this.score += Math.max(0, finalPoints); // Nicht unter 0
    this.itemsEaten++;
    
    // Food-Statistik aktualisieren
    if (this.foodTypesEaten[this.food.type] !== undefined) {
      this.foodTypesEaten[this.food.type]++;
    }
    
    // Partikel-Effekt beim Fressen
    const foodX = this.food.position.x * this.cellSize + this.cellSize / 2;
    const foodY = this.food.position.y * this.cellSize + this.cellSize / 2;
    
    // Sound-Effekte
    if (this.food.type === 'bomb') {
      // Explosion bei Bomb
      this.particles.explode(foodX, foodY, 'bomb', 15);
      if (window.soundManager) window.soundManager.playSound('bomb');
    } else if (this.food.type === 'special') {
      // Spezieller Effekt für Marijuana
      this.particles.burst(foodX, foodY, 'special', 20);
      if (window.soundManager) window.soundManager.playSound('cannabis'); // Neuer Cannabis-Sound!
    } else if (this.food.type === 'easter_egg') {
      // Mega-Bonus Effekt
      this.particles.explode(foodX, foodY, 'levelup', 25);
      this.effects.flash('#FFD700', 300);
      if (window.soundManager) window.soundManager.playSound('levelup');
    } else if (this.food.type === 'oliebol') {
      // Heilung-Effekt
      this.particles.burst(foodX, foodY, 'powerup', 15);
      if (window.soundManager) window.soundManager.playSound('powerup');
    } else {
      // Normaler Effekt (normal, apple_red)
      this.particles.burst(foodX, foodY, 'food', 10);
      if (window.soundManager) window.soundManager.playSound('eat');
    }
    
    // Spezial-Effekte
    const specialEffect = this.food.getSpecialEffect();
    if (specialEffect === 'heal' && this.snake.body.length > 3) {
      // Oliebol: Heilt 1 Segment (entfernt letztes Segment)
      this.snake.body.pop();
    }
    
    // Snake wachsen lassen (außer bei Bomb und Oliebol)
    if (this.food.type !== 'bomb' && this.food.type !== 'oliebol') {
      this.snake.grow();
    } else if (this.food.type === 'bomb') {
      // Bomb: Entferne letztes Segment
      if (this.snake.body.length > 3) {
        this.snake.body.pop();
      }
    }
    
    // Combo System
    this.combo++;
    this.comboTimer = this.comboTimeLimit; // Reset Timer
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    
    // Combo-Bonus bei hohen Combos
    if (this.combo > 1) {
      const comboBonus = Math.floor(this.combo / 2) * 5; // Bonus-Punkte
      this.score += comboBonus;
      
      // Partikel-Effekt bei hohen Combos
      if (this.combo >= 5) {
        this.particles.burst(foodX, foodY, 'combo', 15);
      }
    }
    
    // Level-Up prüfen
    const wasLevelUp = this.checkLevelUp();
    
    // Neues Food spawnen
    this.food.spawn(this.gridWidth, this.gridHeight, this.snake.body);
    
    // Power-Up Item spawnen (10% Chance nach jedem Food)
    if (!this.powerUpItem.spawned && Math.random() < 0.1) {
      this.powerUpItem.spawn(
        this.gridWidth, 
        this.gridHeight, 
        this.snake.body,
        this.food.position
      );
    }
    
    // UI aktualisieren
    if (window.ui) {
      window.ui.updateScore(this.score);
      window.ui.updateLevel(this.level);
    }
  }
  
  // Power-Up Item einsammeln
  collectPowerUp() {
    if (!this.powerUpItem || !this.powerUpItem.spawned) return;
    
    const type = this.powerUpItem.type;
    const config = PowerUpConfig[type];
    
    if (config) {
      // Power-Up aktivieren
      this.powerUpManager.activate(type, config.duration);
      
      // Partikel-Effekt
      const itemX = this.powerUpItem.position.x * this.cellSize + this.cellSize / 2;
      const itemY = this.powerUpItem.position.y * this.cellSize + this.cellSize / 2;
      this.particles.explode(itemX, itemY, 'powerup', 20);
      
      // Screen Flash (leicht)
      this.effects.flash('#9C27B0', 200);
      
      // Sound
      if (window.soundManager) {
        window.soundManager.playSound('powerup');
      }
      
      // Power-Up Item zurücksetzen
      this.powerUpItem.reset();
      
      // Statistik
      this.powerUpsCollected++;
    }
  }
  
  // Level-Up prüfen
  checkLevelUp() {
    const itemsNeeded = 10 + (this.level - 1) * 5; // Steigend
    if (this.itemsEaten >= itemsNeeded) {
      this.level++;
      
      // Geschwindigkeit erhöhen
      this.snake.speed = Math.max(50, this.snake.speed - 10);
      
      // Level-Up Partikel-Effekt
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      this.particles.explode(centerX, centerY, 'levelup', 30);
      
      // Screen Flash
      this.effects.flash('#9C27B0', 300);
      
      // Screen Shake
      this.effects.shake(5);
      
      // Level-Up Sound
      if (window.soundManager) window.soundManager.playSound('levelup');
      
      // Level-Up Animation
      if (window.ui) {
        window.ui.showLevelUpAnimation(this.level);
      }
      
      return true;
    }
    return false;
  }
  
  // Game Over
  gameOver() {
    this.isRunning = false;
    
    // Musik stoppen
    if (window.soundManager) window.soundManager.stopMusic();
    
    // Explosion-Effekt
    if (this.snake.body.length > 0) {
      const head = this.snake.body[0];
      const headX = head.x * this.cellSize + this.cellSize / 2;
      const headY = head.y * this.cellSize + this.cellSize / 2;
      this.particles.explode(headX, headY, 'bomb', 40);
    }
    
    // Screen Shake
    this.effects.shake(15);
    
    // Screen Flash
    this.effects.flash('#FF5722', 500);
    
    // Game Over Sound
    if (window.soundManager) window.soundManager.playSound('gameover');
    
    // Highscore prüfen
    const isNewHighscore = window.ui ? window.ui.saveHighscore(this.score) : false;
    
    // Game Over Screen anzeigen (mit Delay für Effekte)
    setTimeout(() => {
      if (window.ui) {
        const stats = {
          score: this.score,
          highscore: this.highscore,
          level: this.level,
          itemsEaten: this.itemsEaten,
          maxCombo: this.maxCombo,
          gameTime: Math.floor(this.gameTime / 1000), // Sekunden
          powerUpsCollected: this.powerUpsCollected,
          foodTypesEaten: this.foodTypesEaten,
          averageScorePerItem: this.itemsEaten > 0 ? Math.floor(this.score / this.itemsEaten) : 0
        };
        window.ui.showGameOver(stats, isNewHighscore);
      }
    }, 800);
  }
  
  // Get Game Statistics (für externe Zugriffe)
  getStats() {
    return {
      score: this.score,
      level: this.level,
      itemsEaten: this.itemsEaten,
      maxCombo: this.maxCombo,
      gameTime: Math.floor(this.gameTime / 1000),
      powerUpsCollected: this.powerUpsCollected,
      foodTypesEaten: this.foodTypesEaten
    };
  }
  
  // Rendering (Optimiert für 60 FPS)
  render() {
    // Clear Canvas (schnellste Methode)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Hintergrund zeichnen (zuerst, unter allem)
    if (this.background) {
      this.background.render(this.ctx, this.gridWidth, this.gridHeight, this.cellSize);
    }
    
    // Screen Shake Transform anwenden
    const shake = this.effects.getTransform();
    this.ctx.save();
    if (shake.x !== 0 || shake.y !== 0) {
      this.ctx.translate(shake.x, shake.y);
    }
    
    // Grid zeichnen (nur wenn gewünscht, kann auskommentiert werden für Performance)
    // this.drawGrid(this.ctx);
    
    // Trails zeichnen (unter allem)
    if (this.trails.trails.length > 0) {
      this.trails.draw(this.ctx);
    }
    
    // Food zeichnen
    if (this.food.spawned) {
      this.food.draw(this.ctx, this.cellSize);
    }
    
    // Power-Up Item zeichnen
    if (this.powerUpItem && this.powerUpItem.spawned) {
      this.powerUpItem.draw(this.ctx, this.cellSize);
    }
    
    // Snake zeichnen
    this.snake.draw(this.ctx, this.cellSize);
    
    // Partikel zeichnen (nur wenn vorhanden)
    if (this.particles.particles.length > 0) {
      this.particles.draw(this.ctx);
    }
    
    // Screen Flash zeichnen (nur wenn aktiv)
    if (this.effects.flashAlpha > 0) {
      this.effects.drawFlash(this.ctx);
    }
    
    this.ctx.restore();
    
    // Combo-Anzeige (wenn Combo aktiv)
    if (this.combo > 1) {
      this.drawCombo(this.ctx);
    }
  }
  
  // Grid zeichnen (subtil)
  drawGrid(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= this.gridWidth; x++) {
      ctx.beginPath();
      ctx.moveTo(x * this.cellSize, 0);
      ctx.lineTo(x * this.cellSize, this.canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= this.gridHeight; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * this.cellSize);
      ctx.lineTo(this.canvas.width, y * this.cellSize);
      ctx.stroke();
    }
  }
  
  // Combo-Anzeige zeichnen
  drawCombo(ctx) {
    const comboText = `COMBO x${this.combo}!`;
    const fontSize = 24 + Math.min(this.combo * 2, 20);
    const alpha = Math.min(this.comboTimer / 500, 1);
    
    ctx.save();
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
    ctx.strokeStyle = `rgba(255, 140, 0, ${alpha})`;
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 4;
    
    // Glow-Effekt
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    
    ctx.strokeText(comboText, x, y);
    ctx.fillText(comboText, x, y);
    
    ctx.restore();
  }
}
