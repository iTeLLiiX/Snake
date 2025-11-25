/**
 * Button Integration
 * Integriert Button-Assets in alle HTML-Buttons
 * Rockstar Games Level
 */

class ButtonIntegration {
  constructor() {
    this.buttonMappings = {
      'play-button': 1,
      'settings-button': 2,
      'play-again-button': 3,
      'menu-button': 4,
      'pause-button': 5,
      'back-button': 6,
      'resume-button': 7,
      'pause-menu-button': 8
    };
  }
  
  // Integriere Button-Assets in alle Buttons
  async integrateButtons() {
    if (!buttonAssetManager || !buttonAssetManager.loaded) {
      console.warn('Button-Assets noch nicht geladen');
      return;
    }
    
    // Alle Buttons mit Assets versorgen
    Object.keys(this.buttonMappings).forEach(buttonId => {
      const button = document.getElementById(buttonId);
      if (button) {
        this.applyButtonAsset(button, this.buttonMappings[buttonId]);
      }
    });
    
    // Difficulty-Buttons
    document.querySelectorAll('.difficulty-button').forEach((btn, index) => {
      this.applyButtonAsset(btn, 9 + index); // Button09, Button10, Button11
    });
    
    // Control-Buttons
    document.querySelectorAll('.control-button').forEach((btn, index) => {
      this.applyButtonAsset(btn, 12 + index); // Button12, Button13
    });
  }
  
  // Wende Button-Asset auf Button an
  applyButtonAsset(button, buttonId) {
    const buttonAsset = buttonAssetManager.getButton(buttonId);
    if (!buttonAsset || !buttonAsset.loaded) {
      return; // Fallback: CSS-Styling bleibt
    }
    
    // Speichere Original-Text
    const originalText = button.textContent;
    
    // Erstelle Canvas für Button-Asset
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(button.offsetWidth || 200, 200);
    canvas.height = Math.max(button.offsetHeight || 60, 60);
    const ctx = canvas.getContext('2d');
    
    // Zeichne Button-Asset
    const drawButton = (state = 'normal') => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      buttonAsset.draw(ctx, 0, 0, canvas.width, canvas.height, state);
      
      // Text über Button
      if (originalText) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${canvas.height * 0.3}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(originalText, canvas.width / 2, canvas.height / 2);
      }
      
      button.style.backgroundImage = `url(${canvas.toDataURL()})`;
      button.style.backgroundSize = 'cover';
      button.style.backgroundPosition = 'center';
      button.style.backgroundRepeat = 'no-repeat';
    };
    
    // Initial zeichnen
    drawButton('normal');
    
    // Hover-Effekt
    button.addEventListener('mouseenter', () => {
      drawButton('hover');
    });
    
    button.addEventListener('mouseleave', () => {
      drawButton('normal');
    });
    
    button.addEventListener('mousedown', () => {
      drawButton('pressed');
    });
    
    button.addEventListener('mouseup', () => {
      drawButton('hover');
    });
    
    // Touch-Events für Mobile (passive für Performance)
    button.addEventListener('touchstart', () => {
      drawButton('pressed');
    }, { passive: true });
    
    button.addEventListener('touchend', () => {
      drawButton('normal');
    }, { passive: true });
  }
}

// Global verfügbar
let buttonIntegration = null;

