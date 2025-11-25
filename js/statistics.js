/**
 * Statistics System
 * Gesamt-Statistiken für Langzeit-Motivation
 * Rockstar Games Level
 */

class Statistics {
  constructor() {
    this.stats = {
      totalGames: 0,
      totalItemsEaten: 0,
      totalScore: 0,
      averageScore: 0,
      bestLevel: 1,
      totalPlayTime: 0, // in Sekunden
      totalCombos: 0,
      totalPowerUpsCollected: 0,
      totalMarijuanaEaten: 0,
      totalShieldsUsed: 0,
      totalBombsEaten: 0,
      longestSnake: 3,
      bestCombo: 0
    };
    
    this.loadFromStorage();
  }
  
  // Lade Statistiken aus LocalStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('statistics');
      if (stored) {
        const data = JSON.parse(stored);
        Object.assign(this.stats, data);
      }
    } catch (error) {
      console.warn('Statistiken konnten nicht geladen werden:', error);
    }
  }
  
  // Speichere Statistiken in LocalStorage
  saveToStorage() {
    try {
      localStorage.setItem('statistics', JSON.stringify(this.stats));
    } catch (error) {
      console.warn('Statistiken konnten nicht gespeichert werden:', error);
    }
  }
  
  // Update Statistiken nach einem Spiel
  updateFromGame(gameStats) {
    this.stats.totalGames++;
    this.stats.totalItemsEaten += gameStats.itemsEaten || 0;
    this.stats.totalScore += gameStats.score || 0;
    this.stats.averageScore = this.stats.totalScore / this.stats.totalGames;
    this.stats.bestLevel = Math.max(this.stats.bestLevel, gameStats.level || 1);
    this.stats.totalPlayTime += Math.floor((gameStats.gameTime || 0) / 1000);
    this.stats.totalCombos += gameStats.maxCombo || 0;
    this.stats.totalPowerUpsCollected += gameStats.powerUpsCollected || 0;
    this.stats.totalMarijuanaEaten += gameStats.foodTypesEaten?.special || 0;
    this.stats.totalShieldsUsed += gameStats.shieldsUsed || 0;
    this.stats.totalBombsEaten += gameStats.foodTypesEaten?.bomb || 0;
    this.stats.longestSnake = Math.max(this.stats.longestSnake, gameStats.snakeLength || 3);
    this.stats.bestCombo = Math.max(this.stats.bestCombo, gameStats.maxCombo || 0);
    
    this.saveToStorage();
  }
  
  // Hole alle Statistiken
  getAll() {
    return this.stats;
  }
  
  // Formatiere Zeit
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }
  
  // Formatiere Zahl
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

// Global verfügbar
let statistics = null;

