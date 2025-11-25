/**
 * UI Assets Integration
 * Integriert Button-Assets, Icon-Assets, Progress-Bars, CheckBoxes
 * Rockstar Games Level
 */

class UIAssetsManager {
  constructor() {
    this.checkBoxImages = {};
    this.progressBarImages = {};
    this.loaded = false;
  }
  
  // Lade CheckBox-Assets
  async loadCheckBoxes() {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
      const num = i.toString().padStart(2, '0');
      const path = `assets/images/ui/buttons/CheckBox${num}.png`;
      promises.push(
        loadImage(path)
          .then(img => {
            this.checkBoxImages[i] = img;
          })
          .catch(() => {
            this.checkBoxImages[i] = null;
          })
      );
    }
    await Promise.all(promises);
  }
  
  // Lade Progress-Bar-Assets
  async loadProgressBars() {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
      const num = i.toString().padStart(2, '0');
      const path = `assets/images/ui/progress/Progress${num}.png`;
      promises.push(
        loadImage(path)
          .then(img => {
            this.progressBarImages[i] = img;
          })
          .catch(() => {
            this.progressBarImages[i] = null;
          })
      );
    }
    await Promise.all(promises);
  }
  
  // Initialisiere alle UI-Assets
  async init() {
    await Promise.all([
      this.loadCheckBoxes(),
      this.loadProgressBars()
    ]);
    this.loaded = true;
  }
  
  // Erstelle CheckBox mit Asset
  createCheckBox(id, checked = false, onChange) {
    const label = document.createElement('label');
    label.className = 'checkbox-asset-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = checked;
    
    const assetContainer = document.createElement('div');
    assetContainer.className = 'checkbox-asset-container';
    
    // Canvas für CheckBox-Asset
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    
    // Zeichne CheckBox-Asset (CheckBox01 = unchecked, CheckBox02 = checked)
    const updateCheckBox = () => {
      ctx.clearRect(0, 0, 40, 40);
      const assetId = checkbox.checked ? 2 : 1;
      const asset = this.checkBoxImages[assetId];
      if (asset) {
        ctx.drawImage(asset, 0, 0, 40, 40);
      } else {
        // Fallback
        ctx.fillStyle = checkbox.checked ? '#4CAF50' : '#555';
        ctx.fillRect(0, 0, 40, 40);
        if (checkbox.checked) {
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', 20, 20);
        }
      }
      assetContainer.style.backgroundImage = `url(${canvas.toDataURL()})`;
    };
    
    updateCheckBox();
    checkbox.addEventListener('change', () => {
      updateCheckBox();
      if (onChange) onChange(checkbox.checked);
    });
    
    label.appendChild(checkbox);
    label.appendChild(assetContainer);
    
    return label;
  }
  
  // Zeichne Progress-Bar mit Asset
  drawProgressBar(ctx, x, y, width, height, progress, variant = 1) {
    const asset = this.progressBarImages[variant] || this.progressBarImages[1];
    if (asset) {
      // Zeichne Progress-Bar-Asset
      const progressWidth = width * progress;
      ctx.drawImage(asset, x, y, progressWidth, height);
    } else {
      // Fallback
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(x, y, width * progress, height);
    }
  }
}

// Global verfügbar
let uiAssetsManager = null;

