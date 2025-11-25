/**
 * Controls System - Fresh Build
 * Keyboard (WASD + Arrow Keys) und Touch-Steuerung
 */

class Controls {
  constructor(game) {
    this.game = game;
    
    // Touch-Steuerung
    this.startX = 0;
    this.startY = 0;
    this.minSwipeDistance = 30;
    this.controlType = 'swipe';
    
    // Keyboard State (verhindert Key-Repeat-Probleme)
    this.keyState = {};
    this.lastKeyTime = {};
    
    this.setupEvents();
  }
  
  // Event-Listener einrichten
  setupEvents() {
    // Keyboard Events - WICHTIG: Auf window, nicht auf canvas!
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    
    // Touch Events (nur auf Canvas)
    const canvas = this.game.canvas;
    if (canvas) {
      canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
      canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
      canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    }
    
    // D-Pad Buttons
    const dPadButtons = document.querySelectorAll('.d-pad-button');
    dPadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const direction = e.target.dataset.direction;
        if (direction) {
          this.handleDirection(direction);
        }
      });
    });
  }
  
  // Keyboard Input - FRISCH & EINFACH
  handleKeyDown(e) {
    // Verhindere Key-Repeat (nur einmal pro Key-Press)
    const now = Date.now();
    if (this.lastKeyTime[e.key] && now - this.lastKeyTime[e.key] < 50) {
      return; // Zu schnell, ignoriere
    }
    this.lastKeyTime[e.key] = now;
    
    // Prüfe ob Spiel läuft
    if (!this.game || !this.game.isRunning || this.game.isPaused) {
      return;
    }
    
    // Prüfe ob Snake existiert
    if (!this.game.snake) {
      return;
    }
    
    let direction = null;
    
    // WASD + Arrow Keys
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        e.preventDefault();
        direction = 'up';
        break;
      case 's':
      case 'arrowdown':
        e.preventDefault();
        direction = 'down';
        break;
      case 'a':
      case 'arrowleft':
        e.preventDefault();
        direction = 'left';
        break;
      case 'd':
      case 'arrowright':
        e.preventDefault();
        direction = 'right';
        break;
      case ' ':
      case 'escape':
        e.preventDefault();
        if (this.game.isRunning) {
          this.game.togglePause();
        }
        return;
    }
    
    // Richtung ändern wenn gültig
    if (direction) {
      this.handleDirection(direction);
    }
  }
  
  // Key Up (für Key-State)
  handleKeyUp(e) {
    delete this.keyState[e.key];
  }
  
  // Richtung verarbeiten - DIREKT & EINFACH
  handleDirection(direction) {
    // Prüfungen
    if (!this.game) {
      console.warn('Controls: Game nicht verfügbar');
      return;
    }
    
    if (!this.game.isRunning) {
      console.warn('Controls: Spiel läuft nicht');
      return;
    }
    
    if (this.game.isPaused) {
      console.warn('Controls: Spiel ist pausiert');
      return;
    }
    
    if (!this.game.snake) {
      console.warn('Controls: Snake nicht verfügbar');
      return;
    }
    
    // DIREKT Richtung ändern
    try {
      this.game.snake.changeDirection(direction);
    } catch (error) {
      console.error('Controls: Fehler beim Richtungswechsel', error);
    }
  }
  
  // Touch Start
  handleTouchStart(e) {
    if (this.controlType !== 'swipe') return;
    if (e.target !== this.game.canvas) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }
  
  // Touch Move
  handleTouchMove(e) {
    if (this.controlType === 'swipe' && e.target === this.game.canvas) {
      e.preventDefault();
    }
  }
  
  // Touch End (Swipe Detection)
  handleTouchEnd(e) {
    if (this.controlType !== 'swipe') return;
    if (e.target !== this.game.canvas) return;
    
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    
    // Prüfe ob Swipe groß genug
    if (Math.abs(deltaX) < this.minSwipeDistance && 
        Math.abs(deltaY) < this.minSwipeDistance) {
      return;
    }
    
    // Bestimme Hauptrichtung
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal
      this.handleDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      // Vertikal
      this.handleDirection(deltaY > 0 ? 'down' : 'up');
    }
  }
  
  // Steuerungstyp ändern
  setControlType(type) {
    this.controlType = type;
    const dPad = document.getElementById('d-pad');
    if (dPad) {
      if (type === 'dpad') {
        dPad.classList.remove('hidden');
      } else {
        dPad.classList.add('hidden');
      }
    }
  }
  
  // Cleanup
  destroy() {
    // Event-Listener werden automatisch entfernt
  }
}
