/**
 * Controls System
 * Verwaltet Touch- und Keyboard-Steuerung
 */

class Controls {
  constructor(game) {
    this.game = game;
    this.startX = 0;
    this.startY = 0;
    this.minSwipeDistance = 30;
    this.controlType = 'swipe'; // 'swipe' oder 'dpad'
    
    this.setupEvents();
  }
  
  // Event-Listener einrichten
  setupEvents() {
    const canvas = this.game.canvas;
    
    // Touch Events
    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    
    // Keyboard Events
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // D-Pad Buttons
    const dPadButtons = document.querySelectorAll('.d-pad-button');
    dPadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const direction = e.target.dataset.direction;
        this.handleDirection(direction);
      });
    });
  }
  
  // Touch Start
  handleTouchStart(e) {
    e.preventDefault();
    if (this.controlType !== 'swipe') return;
    
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  
  // Touch Move (verhindert Scroll)
  handleTouchMove(e) {
    if (this.controlType === 'swipe') {
      e.preventDefault();
    }
  }
  
  // Touch End (Swipe Detection)
  handleTouchEnd(e) {
    e.preventDefault();
    if (this.controlType !== 'swipe') return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    
    // Prüfe ob Swipe groß genug
    if (Math.abs(deltaX) < this.minSwipeDistance && 
        Math.abs(deltaY) < this.minSwipeDistance) {
      return; // Zu klein, ignoriere
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
  
  // Keyboard Input
  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        this.handleDirection('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        this.handleDirection('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        this.handleDirection('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        this.handleDirection('right');
        break;
      case ' ':
      case 'Escape':
        e.preventDefault();
        if (this.game.isRunning) {
          this.game.togglePause();
        }
        break;
    }
  }
  
  // Richtung verarbeiten
  handleDirection(direction) {
    if (!this.game.isRunning || this.game.isPaused) return;
    this.game.snake.changeDirection(direction);
  }
  
  // Steuerungstyp ändern
  setControlType(type) {
    this.controlType = type;
    const dPad = document.getElementById('d-pad');
    if (type === 'dpad') {
      dPad.classList.remove('hidden');
    } else {
      dPad.classList.add('hidden');
    }
  }
  
  // Cleanup
  destroy() {
    // Event-Listener werden automatisch entfernt wenn Elemente gelöscht werden
  }
}

