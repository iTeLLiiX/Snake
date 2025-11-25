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
    // Start Screen - mit Micro Interactions
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', (e) => {
      if (window.soundManager) window.soundManager.playSound('button');
      if (window.animationSystem) {
        window.animationSystem.createRipple(e, playButton);
      }
      this.hideAllScreens();
      this.showScreen('game', 'scale');
      if (window.game) {
        window.game.start();
      }
    });
    
    const settingsButton = document.getElementById('settings-button');
    settingsButton.addEventListener('click', (e) => {
      if (window.soundManager) window.soundManager.playSound('button');
      if (window.animationSystem) {
        window.animationSystem.createRipple(e, settingsButton);
      }
      this.showScreen('settings', 'slide');
      // Achievements und Statistics laden
      setTimeout(() => {
        this.displayAchievements();
        this.displayStatistics();
        this.integrateCheckBoxes();
      }, 100);
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
  
  // Screen anzeigen (mit Premium Macro Animation)
  showScreen(screenName, transitionType = 'fade') {
    const currentScreen = Object.values(this.screens).find(s => s.classList.contains('active'));
    const targetScreen = this.screens[screenName];
    
    if (!targetScreen) return;
    
    // Experimental Navigation mit verschiedenen Transition-Typen
    if (window.animationSystem) {
      const transitionTypes = ['fade', 'slide', 'scale', 'rotate', 'blur'];
      const randomType = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];
      
      if (currentScreen) {
        window.animationSystem.experimentalTransition(
          currentScreen.id,
          targetScreen.id,
          transitionType === 'random' ? randomType : transitionType
        );
      } else {
        // Erster Screen - einfacher Fade
        targetScreen.style.display = 'flex';
        targetScreen.style.opacity = '0';
        targetScreen.classList.add('active');
        setTimeout(() => {
          targetScreen.style.opacity = '1';
        }, 50);
      }
    } else {
      // Fallback: Standard Fade
      Object.values(this.screens).forEach(screen => {
        if (screen.classList.contains('active')) {
          screen.classList.add('fade-out');
          setTimeout(() => {
            screen.classList.remove('active', 'fade-out');
          }, 300);
        }
      });
      
      setTimeout(() => {
        targetScreen.classList.add('fade-in', 'active');
        targetScreen.style.display = 'flex';
        setTimeout(() => {
          targetScreen.classList.remove('fade-in');
        }, 500);
      }, 300);
    }
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
  
  // Level-Progress aktualisieren
  updateLevelProgress(itemsEaten, itemsNeeded, level) {
    const progressContainer = document.getElementById('level-progress');
    const progressBar = document.getElementById('level-progress-bar');
    const progressText = document.getElementById('level-progress-text');
    
    if (!progressContainer || !progressBar || !progressText) return;
    
    // Zeige Progress-Bar wenn Level-Up naht (letzte 5 Items)
    if (itemsEaten >= itemsNeeded - 5) {
      progressContainer.classList.remove('hidden');
      
      const progress = Math.min(1, itemsEaten / itemsNeeded);
      const canvas = progressBar;
      const ctx = canvas.getContext('2d');
      
      // Canvas-Größe
      canvas.width = 200;
      canvas.height = 20;
      
      // Zeichne Progress-Bar mit Asset
      if (uiAssetsManager && uiAssetsManager.loaded) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const variant = Math.min(5, Math.max(1, Math.ceil(progress * 5)));
        uiAssetsManager.drawProgressBar(ctx, 0, 0, canvas.width, canvas.height, progress, variant);
      } else {
        // Fallback
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, canvas.width * progress, canvas.height);
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }
      
      // Text aktualisieren
      progressText.textContent = `${itemsEaten}/${itemsNeeded}`;
    } else {
      progressContainer.classList.add('hidden');
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
      // Verwende Icon-Assets statt Emojis
      let iconPath = null;
      switch (powerUp.type) {
        case PowerUpTypes.SPEED_BOOST:
          iconPath = 'assets/images/ui/icons/Icon01.png';
          break;
        case PowerUpTypes.SLOW_MOTION:
          iconPath = 'assets/images/ui/icons/Icon02.png';
          break;
        case PowerUpTypes.SHIELD:
          iconPath = 'assets/images/ui/icons/Icon03.png';
          break;
        case PowerUpTypes.SCORE_MULTIPLIER:
          iconPath = 'assets/images/ui/icons/Icon04.png';
          break;
      }
      
      if (iconPath) {
        const iconImg = document.createElement('img');
        iconImg.src = iconPath;
        iconImg.alt = powerUp.type;
        iconImg.style.width = '100%';
        iconImg.style.height = '100%';
        iconImg.style.objectFit = 'contain';
        iconImg.onerror = () => {
          // Fallback: Emoji
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
        };
        icon.appendChild(iconImg);
      } else {
        // Fallback: Emoji
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
      }
      
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
  
  // Achievements anzeigen (Settings)
  displayAchievements() {
    if (!achievementSystem || !achievementSystem.loaded) return;
    
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const achievements = achievementSystem.getAll();
    achievements.forEach(achievement => {
      const item = document.createElement('div');
      item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
      
      const icon = document.createElement('div');
      icon.className = 'achievement-item-icon';
      if (achievementSystem.iconImages[achievement.iconId]) {
        const img = document.createElement('img');
        img.src = achievementSystem.iconImages[achievement.iconId].src;
        img.alt = achievement.name;
        icon.appendChild(img);
      } else {
        icon.innerHTML = '<div class="achievement-icon-fallback">🏆</div>';
      }
      
      const name = document.createElement('div');
      name.className = 'achievement-item-name';
      name.textContent = achievement.name;
      
      const progress = document.createElement('div');
      progress.className = 'achievement-item-progress';
      const progressBar = document.createElement('div');
      progressBar.className = 'achievement-item-progress-bar';
      progressBar.style.width = `${achievement.getProgressPercent()}%`;
      progress.appendChild(progressBar);
      
      item.appendChild(icon);
      item.appendChild(name);
      if (!achievement.unlocked) {
        item.appendChild(progress);
      }
      
      grid.appendChild(item);
    });
  }
  
  // Statistics anzeigen (Settings)
  displayStatistics() {
    if (!statistics) return;
    
    const grid = document.getElementById('statistics-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const stats = statistics.getAll();
    const statItems = [
      { label: 'Gespielte Spiele', value: stats.totalGames },
      { label: 'Items gefressen', value: statistics.formatNumber(stats.totalItemsEaten) },
      { label: 'Gesamt-Score', value: statistics.formatNumber(stats.totalScore) },
      { label: 'Ø Score', value: Math.floor(stats.averageScore) },
      { label: 'Bestes Level', value: stats.bestLevel },
      { label: 'Spielzeit', value: statistics.formatTime(stats.totalPlayTime) },
      { label: 'Längste Combo', value: stats.bestCombo },
      { label: 'Power-Ups', value: statistics.formatNumber(stats.totalPowerUpsCollected) }
    ];
    
    statItems.forEach(item => {
      const statItem = document.createElement('div');
      statItem.className = 'stat-item';
      
      const label = document.createElement('div');
      label.className = 'stat-label';
      label.textContent = item.label;
      
      const value = document.createElement('div');
      value.className = 'stat-value';
      value.textContent = item.value;
      
      statItem.appendChild(label);
      statItem.appendChild(value);
      grid.appendChild(statItem);
    });
  }
  
  // CheckBoxes mit Assets integrieren
  integrateCheckBoxes() {
    if (!uiAssetsManager || !uiAssetsManager.loaded) return;
    
    // Sound Toggle
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      const label = soundToggle.parentElement;
      const newCheckBox = uiAssetsManager.createCheckBox('sound-toggle', soundToggle.checked, (checked) => {
        soundToggle.checked = checked;
        if (window.soundManager) {
          window.soundManager.setSoundEnabled(checked);
        }
      });
      label.innerHTML = '';
      label.appendChild(newCheckBox);
      const text = document.createElement('span');
      text.textContent = '🔊 Sound';
      text.style.marginLeft = '10px';
      label.appendChild(text);
    }
    
    // Music Toggle
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
      const label = musicToggle.parentElement;
      const newCheckBox = uiAssetsManager.createCheckBox('music-toggle', musicToggle.checked, (checked) => {
        musicToggle.checked = checked;
        if (window.soundManager) {
          window.soundManager.setMusicEnabled(checked);
        }
      });
      label.innerHTML = '';
      label.appendChild(newCheckBox);
      const text = document.createElement('span');
      text.textContent = '🎵 Musik';
      text.style.marginLeft = '10px';
      label.appendChild(text);
    }
  }
  
}

