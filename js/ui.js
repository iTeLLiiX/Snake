/**
 * UI Management
 * Verwaltet alle Screens und UI-Elemente
 */

class UIManager {
  constructor() {
    this.screens = {
      start: document.getElementById('start-screen'),
      game: document.getElementById('game-screen'),
      gameOver: document.getElementById('game-over-screen'),
      settings: document.getElementById('settings-screen')
    };
    
    // Number Display System
    this.numberDisplay = new NumberDisplay();
    numberDisplay = this.numberDisplay; // Global verfügbar
    
    this.setupEventListeners();
    this.loadHighscore();
    // Number Display wird asynchron geladen
    this.initNumberDisplay();
  }
  
  // Number Display initialisieren
  async initNumberDisplay() {
    try {
      await this.numberDisplay.loadAssets();
      // Initial Score & Level anzeigen
      this.updateScore(0);
      this.updateLevel(1);
    } catch (error) {
      console.warn('Number-Sprites konnten nicht geladen werden, verwende Fallback:', error);
    }
  }
  
  // Event-Listener einrichten
  setupEventListeners() {
    // Start Screen
    document.getElementById('play-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.hideAllScreens();
      this.showScreen('game');
      if (window.game) {
        window.game.start();
      }
    });
    
    document.getElementById('settings-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.showScreen('settings');
    });
    
    // Game Over Screen
    document.getElementById('play-again-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.hideAllScreens();
      this.showScreen('game');
      if (window.game) {
        window.game.start();
      }
    });
    
    document.getElementById('menu-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.showScreen('start');
      if (window.game) {
        window.game.stop();
      }
    });
    
    // Settings Screen
    document.getElementById('back-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.showScreen('start');
    });
    
    // Pause
    document.getElementById('pause-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      if (window.game) {
        window.game.togglePause();
      }
    });
    
    document.getElementById('resume-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      if (window.game) {
        window.game.togglePause();
      }
    });
    
    document.getElementById('pause-menu-button').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playSound('button');
      this.showScreen('start');
      if (window.game) {
        window.game.stop();
      }
    });
    
    // Settings
    this.setupSettings();
  }
  
  // Settings einrichten
  setupSettings() {
    // Schwierigkeit
    document.querySelectorAll('.difficulty-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.difficulty-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const difficulty = e.target.dataset.difficulty;
        if (window.game) {
          window.game.setDifficulty(difficulty);
        }
      });
    });
    
    // Steuerung
    document.querySelectorAll('.control-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.control-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const control = e.target.dataset.control;
        if (window.controls) {
          window.controls.setControlType(control);
        }
      });
    });
  }
  
  // Screen anzeigen (mit Cinematic Transition)
  showScreen(screenName) {
    // Fade Out alle Screens
    Object.values(this.screens).forEach(screen => {
      if (screen.classList.contains('active')) {
        screen.classList.add('fade-out');
        setTimeout(() => {
          screen.classList.remove('active', 'fade-out');
        }, 300);
      }
    });
    
    // Fade In neuer Screen
    setTimeout(() => {
      if (this.screens[screenName]) {
        this.screens[screenName].classList.add('fade-in', 'active');
        setTimeout(() => {
          this.screens[screenName].classList.remove('fade-in');
        }, 500);
      }
    }, 300);
  }
  
  // Alle Screens verstecken
  hideAllScreens() {
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('active');
    });
  }
  
  // Pause Overlay
  showPauseOverlay() {
    document.getElementById('pause-overlay').classList.remove('hidden');
  }
  
  hidePauseOverlay() {
    document.getElementById('pause-overlay').classList.add('hidden');
  }
  
  // Score aktualisieren (mit Number-Sprites)
  updateScore(score) {
    if (this.numberDisplay && this.numberDisplay.loaded) {
      this.numberDisplay.drawToElement('score-value', score, 35);
    } else {
      // Fallback: Text
      const element = document.getElementById('score-value');
      if (element) {
        element.textContent = formatNumber(score);
      }
    }
  }
  
  // Level aktualisieren (mit Number-Sprites)
  updateLevel(level) {
    if (this.numberDisplay && this.numberDisplay.loaded) {
      this.numberDisplay.drawToElement('level-value', level, 35);
    } else {
      // Fallback: Text
      const element = document.getElementById('level-value');
      if (element) {
        element.textContent = level;
      }
    }
  }
  
  // Power-Up Display aktualisieren
  updatePowerUpDisplay(activePowerUps) {
    const display = document.getElementById('powerup-display');
    if (!display) return;
    
    display.innerHTML = '';
    
    activePowerUps.forEach(powerUp => {
      const container = document.createElement('div');
      container.className = 'powerup-item';
      
      const icon = document.createElement('div');
      icon.className = `powerup-icon powerup-${powerUp.type}`;
      
      // Symbol für Power-Up
      let symbol = '⚡';
      switch (powerUp.type) {
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
      icon.textContent = symbol;
      
      const timer = document.createElement('div');
      timer.className = 'powerup-timer';
      timer.id = `powerup-timer-${powerUp.type}`;
      
      container.appendChild(icon);
      container.appendChild(timer);
      display.appendChild(container);
    });
  }
  
  // Power-Up Timer aktualisieren
  updatePowerUpTimer(type, remainingTime, totalTime) {
    const timer = document.getElementById(`powerup-timer-${type}`);
    if (!timer) return;
    
    const percentage = (remainingTime / totalTime) * 100;
    timer.style.width = `${percentage}%`;
    
    // Farbwechsel bei niedriger Zeit
    if (percentage < 20) {
      timer.style.background = '#F44336'; // Rot
    } else if (percentage < 50) {
      timer.style.background = '#FFC107'; // Gelb
    } else {
      timer.style.background = '#4CAF50'; // Grün
    }
  }
  
  // Game Over Screen aktualisieren (mit erweiterten Statistiken)
  showGameOver(stats, isNewHighscore = false) {
    // Score & Highscore mit Number-Sprites
    if (this.numberDisplay && this.numberDisplay.loaded) {
      this.numberDisplay.drawToElement('final-score-value', stats.score, 40);
      this.numberDisplay.drawToElement('final-highscore-value', stats.highscore, 40);
    } else {
      document.getElementById('final-score-value').textContent = formatNumber(stats.score);
      document.getElementById('final-highscore-value').textContent = formatNumber(stats.highscore);
    }
    
    // New Highscore Badge
    const badge = document.getElementById('new-highscore-badge');
    if (badge) {
      if (isNewHighscore) {
        badge.classList.remove('hidden');
        // Animation
        badge.style.animation = 'pulse 1s ease-in-out infinite';
      } else {
        badge.classList.add('hidden');
      }
    }
    
    // Erweiterte Statistiken
    document.getElementById('final-level-value').textContent = stats.level;
    document.getElementById('final-items-value').textContent = stats.itemsEaten;
    document.getElementById('final-combo-value').textContent = stats.maxCombo;
    document.getElementById('final-time-value').textContent = `${stats.gameTime}s`;
    document.getElementById('final-powerups-value').textContent = stats.powerUpsCollected;
    document.getElementById('final-avg-value').textContent = stats.averageScorePerItem;
    
    this.showScreen('gameOver');
  }
  
  // Level-Up Animation
  showLevelUpAnimation(level) {
    // Erstelle Level-Up Overlay
    let overlay = document.getElementById('levelup-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'levelup-overlay';
      overlay.className = 'levelup-overlay';
      overlay.innerHTML = `
        <div class="levelup-content">
          <div class="levelup-title">LEVEL UP!</div>
          <div class="levelup-level">Level <span id="levelup-level-value">${level}</span></div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    
    document.getElementById('levelup-level-value').textContent = level;
    overlay.classList.add('show');
    
    // Nach 2 Sekunden ausblenden
    setTimeout(() => {
      overlay.classList.remove('show');
    }, 2000);
  }
  
  // Combo Meter aktualisieren
  updateComboMeter(combo, timer, timeLimit) {
    const meter = document.getElementById('combo-meter');
    const bar = document.getElementById('combo-bar');
    const value = document.getElementById('combo-value');
    
    if (!meter || !bar || !value) return;
    
    if (combo > 1) {
      meter.classList.remove('hidden');
      const percentage = (timer / timeLimit) * 100;
      bar.style.width = `${percentage}%`;
      value.textContent = `x${combo}`;
      
      // Farbwechsel bei hohen Combos
      if (combo >= 10) {
        bar.style.background = '#F44336'; // Rot
        meter.style.borderColor = '#F44336';
      } else if (combo >= 5) {
        bar.style.background = '#FFC107'; // Gelb
        meter.style.borderColor = '#FFC107';
      } else {
        bar.style.background = '#4CAF50'; // Grün
        meter.style.borderColor = '#4CAF50';
      }
    } else {
      meter.classList.add('hidden');
    }
  }
  
  // Highscore laden
  loadHighscore() {
    const highscore = Storage.get('highscore', 0);
    document.getElementById('highscore-value').textContent = formatNumber(highscore);
    return highscore;
  }
  
  // Highscore speichern
  saveHighscore(score) {
    const currentHighscore = Storage.get('highscore', 0);
    if (score > currentHighscore) {
      Storage.set('highscore', score);
      document.getElementById('highscore-value').textContent = formatNumber(score);
      document.getElementById('final-highscore-value').textContent = formatNumber(score);
      return true; // Neuer Highscore!
    }
    return false;
  }
  
}

