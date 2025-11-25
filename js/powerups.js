/**
 * Power-Up System
 * Verwaltet verschiedene Power-Ups und ihre Effekte
 */

class PowerUpManager {
  constructor() {
    this.activePowerUps = [];
  }
  
  // Power-Up aktivieren
  activate(type, duration) {
    // Entferne gleichen Typ wenn bereits aktiv
    this.activePowerUps = this.activePowerUps.filter(p => p.type !== type);
    
    // Füge neues Power-Up hinzu
    this.activePowerUps.push({
      type: type,
      duration: duration,
      startTime: Date.now()
    });
  }
  
  // Update (wird vom Game Loop aufgerufen)
  update(deltaTime) {
    const now = Date.now();
    this.activePowerUps = this.activePowerUps.filter(powerUp => {
      const elapsed = now - powerUp.startTime;
      return elapsed < powerUp.duration;
    });
  }
  
  // Prüft ob Power-Up aktiv ist
  isActive(type) {
    return this.activePowerUps.some(p => p.type === type);
  }
  
  // Gibt verbleibende Zeit zurück
  getRemainingTime(type) {
    const powerUp = this.activePowerUps.find(p => p.type === type);
    if (!powerUp) return 0;
    const elapsed = Date.now() - powerUp.startTime;
    return Math.max(0, powerUp.duration - elapsed);
  }
  
  // Alle aktiven Power-Ups
  getActive() {
    return this.activePowerUps.map(p => p.type);
  }
  
  // Reset
  reset() {
    this.activePowerUps = [];
  }
}

// Power-Up Typen
const PowerUpTypes = {
  SPEED_BOOST: 'speed_boost',
  SLOW_MOTION: 'slow_motion',
  SHIELD: 'shield',
  SCORE_MULTIPLIER: 'score_multiplier'
};

// Power-Up Konfiguration
const PowerUpConfig = {
  [PowerUpTypes.SPEED_BOOST]: {
    duration: 5000, // 5 Sekunden
    speedMultiplier: 1.5
  },
  [PowerUpTypes.SLOW_MOTION]: {
    duration: 5000, // 5 Sekunden
    speedMultiplier: 0.5
  },
  [PowerUpTypes.SHIELD]: {
    duration: Infinity, // Einmalig
    uses: 1
  },
  [PowerUpTypes.SCORE_MULTIPLIER]: {
    duration: 10000, // 10 Sekunden
    multiplier: 2
  }
};

