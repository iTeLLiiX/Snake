/**
 * Achievement System
 * Rockstar Games Level - Langzeit-Motivation
 */

class Achievement {
  constructor(id, name, description, iconId, condition) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconId = iconId;
    this.condition = condition; // Function that checks if achievement is unlocked
    this.unlocked = false;
    this.progress = 0;
    this.maxProgress = 1;
    this.unlockedAt = null;
  }
  
  check(gameStats) {
    if (this.unlocked) return false;
    
    const result = this.condition(gameStats);
    if (typeof result === 'object') {
      this.progress = result.progress || 0;
      this.maxProgress = result.max || 1;
      if (result.unlocked) {
        this.unlock();
        return true;
      }
    } else if (result === true) {
      this.unlock();
      return true;
    }
    return false;
  }
  
  unlock() {
    this.unlocked = true;
    this.unlockedAt = Date.now();
    this.progress = this.maxProgress;
  }
  
  getProgressPercent() {
    return Math.min(100, Math.floor((this.progress / this.maxProgress) * 100));
  }
}

class AchievementSystem {
  constructor() {
    this.achievements = [];
    this.iconImages = {};
    this.loaded = false;
    this.setupAchievements();
  }
  
  setupAchievements() {
    // 1. Erster Highscore
    this.achievements.push(new Achievement(
      'firstHighscore',
      'Erster Highscore',
      'Setze deinen ersten Highscore!',
      1,
      (stats) => stats.highscore > 0
    ));
    
    // 2. Level 10
    this.achievements.push(new Achievement(
      'level10',
      'Level 10',
      'Erreiche Level 10!',
      2,
      (stats) => ({
        unlocked: stats.level >= 10,
        progress: Math.min(stats.level, 10),
        max: 10
      })
    ));
    
    // 3. 100 Items
    this.achievements.push(new Achievement(
      'items100',
      '100 Items',
      'Fresse 100 Items!',
      3,
      (stats) => ({
        unlocked: stats.totalItemsEaten >= 100,
        progress: Math.min(stats.totalItemsEaten, 100),
        max: 100
      })
    ));
    
    // 4. Combo Master
    this.achievements.push(new Achievement(
      'comboMaster',
      'Combo Master',
      'Erreiche eine 10er Combo!',
      4,
      (stats) => stats.maxCombo >= 10
    ));
    
    // 5. Perfekt
    this.achievements.push(new Achievement(
      'perfect',
      'Perfekt',
      'Spiele ein Spiel ohne Bomben!',
      5,
      (stats) => stats.currentBombsEaten === 0 && stats.itemsEaten >= 10
    ));
    
    // 6. Speed Demon
    this.achievements.push(new Achievement(
      'speedDemon',
      'Speed Demon',
      'Erreiche Level 5 in unter 2 Minuten!',
      6,
      (stats) => stats.level >= 5 && stats.gameTime < 120000
    ));
    
    // 7. Marijuana Lover
    this.achievements.push(new Achievement(
      'marijuanaLover',
      'Marijuana Lover',
      'Fresse 20x Marijuana!',
      7,
      (stats) => ({
        unlocked: stats.totalMarijuanaEaten >= 20,
        progress: Math.min(stats.totalMarijuanaEaten, 20),
        max: 20
      })
    ));
    
    // 8. Unsterblich
    this.achievements.push(new Achievement(
      'immortal',
      'Unsterblich',
      'Verwende 10x Shield!',
      8,
      (stats) => ({
        unlocked: stats.totalShieldsUsed >= 10,
        progress: Math.min(stats.totalShieldsUsed, 10),
        max: 10
      })
    ));
    
    // 9. Punkte-König
    this.achievements.push(new Achievement(
      'scoreKing',
      'Punkte-König',
      'Erreiche 1000+ Punkte!',
      9,
      (stats) => stats.score >= 1000
    ));
    
    // 10. Endlos
    this.achievements.push(new Achievement(
      'endless',
      'Endlos',
      'Erreiche Level 20+!',
      10,
      (stats) => ({
        unlocked: stats.level >= 20,
        progress: Math.min(stats.level, 20),
        max: 20
      })
    ));
  }
  
  // Lade Icon-Assets
  async loadIcons() {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
      const num = i.toString().padStart(2, '0');
      const path = `assets/images/ui/icons/Icon${num}.png`;
      promises.push(
        loadImage(path)
          .then(img => {
            this.iconImages[i] = img;
          })
          .catch(() => {
            this.iconImages[i] = null;
          })
      );
    }
    await Promise.all(promises);
  }
  
  // Lade Achievements aus LocalStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('achievements');
      if (stored) {
        const data = JSON.parse(stored);
        this.achievements.forEach(achievement => {
          if (data[achievement.id]) {
            achievement.unlocked = data[achievement.id].unlocked || false;
            achievement.progress = data[achievement.id].progress || 0;
            achievement.unlockedAt = data[achievement.id].unlockedAt || null;
          }
        });
      }
    } catch (error) {
      console.warn('Achievements konnten nicht geladen werden:', error);
    }
  }
  
  // Speichere Achievements in LocalStorage
  saveToStorage() {
    try {
      const data = {};
      this.achievements.forEach(achievement => {
        data[achievement.id] = {
          unlocked: achievement.unlocked,
          progress: achievement.progress,
          unlockedAt: achievement.unlockedAt
        };
      });
      localStorage.setItem('achievements', JSON.stringify(data));
    } catch (error) {
      console.warn('Achievements konnten nicht gespeichert werden:', error);
    }
  }
  
  // Prüfe alle Achievements
  checkAchievements(gameStats) {
    let newAchievements = [];
    
    this.achievements.forEach(achievement => {
      if (achievement.check(gameStats)) {
        newAchievements.push(achievement);
      }
    });
    
    if (newAchievements.length > 0) {
      this.saveToStorage();
      newAchievements.forEach(achievement => {
        this.showPopup(achievement);
      });
    }
  }
  
  // Zeige Achievement-Popup
  showPopup(achievement) {
    // Erstelle Popup-Element
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
      <div class="achievement-popup-content">
        <div class="achievement-icon">
          ${this.iconImages[achievement.iconId] ? 
            `<img src="${this.iconImages[achievement.iconId].src}" alt="${achievement.name}">` :
            `<div class="achievement-icon-fallback">🏆</div>`
          }
        </div>
        <div class="achievement-text">
          <div class="achievement-title">ACHIEVEMENT FREIGESCHALTET!</div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-description">${achievement.description}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animation
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
    
    // Sound
    if (window.soundManager) {
      window.soundManager.playSound('levelup');
    }
    
    // Partikel-Effekt
    if (window.game && window.game.particles) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      window.game.particles.explode(centerX, centerY, 'levelup', 30);
    }
    
    // Entferne nach 3 Sekunden
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }, 3000);
  }
  
  // Hole alle Achievements
  getAll() {
    return this.achievements;
  }
  
  // Hole freigeschaltete Achievements
  getUnlocked() {
    return this.achievements.filter(a => a.unlocked);
  }
  
  // Hole gesperrte Achievements
  getLocked() {
    return this.achievements.filter(a => !a.unlocked);
  }
  
  // Initialisiere System
  async init() {
    await this.loadIcons();
    this.loadFromStorage();
    this.loaded = true;
  }
}

// Global verfügbar
let achievementSystem = null;

