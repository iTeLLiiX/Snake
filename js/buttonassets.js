/**
 * Button Assets System
 * Verwaltet Button-Sprites (Button01.png bis Button25.png)
 * Rockstar Games Level UI
 */

class ButtonAsset {
  constructor(path, id) {
    this.path = path;
    this.id = id;
    this.image = null;
    this.loaded = false;
  }
  
  async load() {
    try {
      this.image = await loadImage(this.path);
      this.loaded = true;
    } catch (error) {
      console.warn(`Button-Asset ${this.id} konnte nicht geladen werden:`, error);
      this.loaded = false;
    }
  }
  
  draw(ctx, x, y, width, height, state = 'normal') {
    if (!this.loaded || !this.image) {
      // Fallback: Einfacher Button
      this.drawFallback(ctx, x, y, width, height, state);
      return;
    }
    
    // Zeichne Button-Asset
    ctx.drawImage(this.image, x, y, width, height);
    
    // State-Effekte
    if (state === 'hover') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(x, y, width, height);
    } else if (state === 'pressed') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x, y, width, height);
    }
  }
  
  drawFallback(ctx, x, y, width, height, state) {
    // Fallback: CSS-ähnlicher Button
    const isHover = state === 'hover';
    const isPressed = state === 'pressed';
    
    // Hintergrund
    ctx.fillStyle = isPressed ? '#2E7D32' : (isHover ? '#4CAF50' : '#1B5E20');
    ctx.fillRect(x, y, width, height);
    
    // Rand
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }
}

class ButtonAssetManager {
  constructor() {
    this.buttons = {};
    this.loaded = false;
  }
  
  // Lade alle Button-Assets
  async loadAssets() {
    const promises = [];
    
    // Lade Button01 bis Button25
    for (let i = 1; i <= 25; i++) {
      const num = i.toString().padStart(2, '0');
      const path = `assets/images/ui/buttons/Button${num}.png`;
      const button = new ButtonAsset(path, i);
      this.buttons[i] = button;
      promises.push(button.load());
    }
    
    await Promise.all(promises);
    this.loaded = true;
    console.log('Button-Assets geladen:', Object.keys(this.buttons).length);
  }
  
  // Hole Button-Asset
  getButton(id) {
    return this.buttons[id] || null;
  }
  
  // Zeichne Button auf Canvas
  drawButton(ctx, buttonId, x, y, width, height, state = 'normal') {
    const button = this.getButton(buttonId);
    if (button) {
      button.draw(ctx, x, y, width, height, state);
    } else {
      // Fallback
      const fallback = new ButtonAsset(null, buttonId);
      fallback.drawFallback(ctx, x, y, width, height, state);
    }
  }
  
  // Erstelle Button-Element mit Asset
  createButtonElement(buttonId, text, onClick) {
    const button = document.createElement('button');
    button.className = 'game-button-asset';
    button.dataset.buttonId = buttonId;
    button.textContent = text;
    
    // Canvas für Button-Asset
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');
    
    // Zeichne Button-Asset
    const buttonAsset = this.getButton(buttonId);
    if (buttonAsset && buttonAsset.loaded) {
      buttonAsset.draw(ctx, 0, 0, 200, 60, 'normal');
      
      // Text über Button
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 100, 30);
      
      button.style.backgroundImage = `url(${canvas.toDataURL()})`;
      button.style.backgroundSize = 'cover';
      button.style.backgroundPosition = 'center';
    }
    
    // Event-Listener
    button.addEventListener('click', onClick);
    button.addEventListener('mouseenter', () => {
      if (buttonAsset && buttonAsset.loaded) {
        ctx.clearRect(0, 0, 200, 60);
        buttonAsset.draw(ctx, 0, 0, 200, 60, 'hover');
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 100, 30);
        button.style.backgroundImage = `url(${canvas.toDataURL()})`;
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (buttonAsset && buttonAsset.loaded) {
        ctx.clearRect(0, 0, 200, 60);
        buttonAsset.draw(ctx, 0, 0, 200, 60, 'normal');
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 100, 30);
        button.style.backgroundImage = `url(${canvas.toDataURL()})`;
      }
    });
    
    return button;
  }
}

// Global verfügbar
let buttonAssetManager = null;

