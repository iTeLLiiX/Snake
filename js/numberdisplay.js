/**
 * Number Display System
 * Zeigt Zahlen mit Number-Sprites (Number01-45.png)
 * Rockstar Games Level UI
 */

class NumberDisplay {
  constructor() {
    this.numberImages = {};
    this.loaded = false;
  }
  
  // Lade alle Number-Sprites
  async loadAssets() {
    const promises = [];
    for (let i = 1; i <= 45; i++) {
      const num = i.toString().padStart(2, '0');
      const path = `assets/images/ui/numbers/Number${num}.png`;
      promises.push(
        loadImage(path)
          .then(img => {
            this.numberImages[i] = img;
          })
          .catch(() => {
            // Fallback: Zahl nicht verfügbar
            this.numberImages[i] = null;
          })
      );
    }
    
    await Promise.all(promises);
    this.loaded = true;
  }
  
  // Zeichne Zahl mit Sprites
  drawNumber(ctx, number, x, y, size = 30, spacing = 2) {
    if (!this.loaded) {
      // Fallback: Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${size}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), x, y);
      return;
    }
    
    const digits = number.toString().split('');
    let currentX = x;
    
    digits.forEach((digit, index) => {
      const num = parseInt(digit);
      if (num >= 0 && num <= 9 && this.numberImages[num + 1]) {
        const img = this.numberImages[num + 1];
        ctx.drawImage(img, currentX, y - size / 2, size, size);
        currentX += size + spacing;
      } else if (num === 0 && this.numberImages[1]) {
        // 0 = Number01
        const img = this.numberImages[1];
        ctx.drawImage(img, currentX, y - size / 2, size, size);
        currentX += size + spacing;
      }
    });
    
    return currentX - x; // Breite zurückgeben
  }
  
  // Zeichne Zahl in HTML-Element (für UI)
  drawToElement(elementId, number, size = 40) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Erstelle Canvas für Number-Sprites
    let canvas = element.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.style.display = 'block';
      canvas.style.imageRendering = 'pixelated';
      canvas.style.filter = 'drop-shadow(0 0 3px rgba(76, 175, 80, 0.8))';
      canvas.style.background = 'transparent';
      element.innerHTML = '';
      element.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    const digits = number.toString().split('');
    const digitWidth = size;
    const spacing = 2;
    const totalWidth = digits.length * (digitWidth + spacing) - spacing;
    
    canvas.width = totalWidth;
    canvas.height = size;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Zeichne jede Ziffer
    let currentX = 0;
    digits.forEach(digit => {
      const num = parseInt(digit);
      if (num >= 0 && num <= 9 && this.numberImages[num + 1]) {
        const img = this.numberImages[num + 1];
        ctx.drawImage(img, currentX, 0, digitWidth, size);
        currentX += digitWidth + spacing;
      }
    });
  }
}

// Globale Instanz
let numberDisplay;

