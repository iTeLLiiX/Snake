/**
 * Controls System
 * Verwaltet Touch- und Keyboard-Steuerung
 */

class Controls {
  constructor(game) {
    this.game = game;
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    
    // Adaptive Swipe-Distanz basierend auf Bildschirmgröße
    this.updateSwipeDistance();
    
    this.controlType = 'swipe'; // 'swipe' oder 'dpad'
    
    // Device-Erkennung
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Swipe-Timeout (verhindert versehentliche Swipes)
    this.swipeTimeout = 300; // ms
    this.lastSwipeTime = 0;
    
    this.setupEvents();
    
    // Swipe-Distanz bei Resize aktualisieren
    window.addEventListener('resize', () => this.updateSwipeDistance());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.updateSwipeDistance(), 100);
    });
  }
  
  // Swipe-Distanz basierend auf Bildschirmgröße anpassen
  updateSwipeDistance() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const minDimension = Math.min(screenWidth, screenHeight);
    
    // Adaptive Distanz: 3-5% der kleineren Bildschirmdimension
    this.minSwipeDistance = Math.max(20, Math.min(50, minDimension * 0.04));
    
    // Für sehr kleine Geräte: größere Distanz
    if (minDimension < 400) {
      this.minSwipeDistance = 25;
    }
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
    if (this.controlType !== 'swipe') return;
    
    // Verhindere Scroll nur auf Canvas
    if (e.target === this.game.canvas) {
      e.preventDefault();
    }
    
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
  }
  
  // Touch Move (verhindert Scroll nur auf Canvas)
  handleTouchMove(e) {
    if (this.controlType === 'swipe' && e.target === this.game.canvas) {
      e.preventDefault();
    }
  }
  
  // Touch End (Swipe Detection) - Verbessert für alle Geräte
  handleTouchEnd(e) {
    if (this.controlType !== 'swipe') return;
    
    // Verhindere Scroll nur auf Canvas
    if (e.target === this.game.canvas) {
      e.preventDefault();
    }
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;
    
    // Swipe-Geschwindigkeit (px/ms)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / Math.max(deltaTime, 1);
    
    // Prüfe ob Swipe groß genug UND schnell genug (verhindert versehentliche Swipes)
    if (distance < this.minSwipeDistance) {
      return; // Zu klein, ignoriere
    }
    
    // Prüfe Swipe-Timeout (verhindert zu schnelle Swipes)
    if (endTime - this.lastSwipeTime < 100) {
      return; // Zu schnell hintereinander
    }
    
    // Prüfe minimale Geschwindigkeit (optional, für bessere Erkennung)
    // if (velocity < 0.1) return; // Zu langsam
    
    // Bestimme Hauptrichtung (mit Winkel-Toleranz)
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Mindestens 30% Unterschied für klare Richtung
    if (absDeltaX > absDeltaY * 1.3) {
      // Horizontal
      this.handleDirection(deltaX > 0 ? 'right' : 'left');
      this.lastSwipeTime = endTime;
    } else if (absDeltaY > absDeltaX * 1.3) {
      // Vertikal
      this.handleDirection(deltaY > 0 ? 'down' : 'up');
      this.lastSwipeTime = endTime;
    }
    // Sonst: Zu diagonal, ignoriere
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

