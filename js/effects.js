/**
 * Premium Visual Effects System
 * Rockstar Games Level Effekte
 */

class VisualEffects {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Bloom-Effekt (Glow)
    this.bloomCanvas = document.createElement('canvas');
    this.bloomCtx = this.bloomCanvas.getContext('2d');
    
    // Motion Blur
    this.motionBlurFrames = [];
    this.maxMotionBlurFrames = 3;
    
    // Screen Shake
    this.shakeOffset = { x: 0, y: 0 };
    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;
    
    // Screen Flash
    this.flashAlpha = 0;
    this.flashColor = '#FFFFFF';
    
    // Chromatic Aberration
    this.chromaticOffset = 0;
  }
  
  // Resize
  resize(width, height) {
    this.bloomCanvas.width = width;
    this.bloomCanvas.height = height;
  }
  
  // Screen Shake
  shake(intensity = 10) {
    this.shakeIntensity = intensity;
  }
  
  updateShake() {
    if (this.shakeIntensity > 0.1) {
      this.shakeOffset.x = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeOffset.y = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeOffset.x = 0;
      this.shakeOffset.y = 0;
      this.shakeIntensity = 0;
    }
  }
  
  // Screen Flash
  flash(color = '#FFFFFF', duration = 200) {
    this.flashColor = color;
    this.flashAlpha = 1.0;
    setTimeout(() => {
      this.flashAlpha = 0;
    }, duration);
  }
  
  updateFlash() {
    if (this.flashAlpha > 0) {
      this.flashAlpha *= 0.9;
    }
  }
  
  // Bloom-Effekt (Glow) - Premium Version
  applyBloom(sourceCtx, sourceCanvas) {
    // Kopiere auf Bloom-Canvas
    this.bloomCtx.clearRect(0, 0, this.bloomCanvas.width, this.bloomCanvas.height);
    this.bloomCtx.drawImage(sourceCanvas, 0, 0);
    
    // Mehrschichtiger Glow-Effekt
    this.bloomCtx.globalCompositeOperation = 'screen';
    
    // Layer 1: Starker Blur
    this.bloomCtx.filter = 'blur(20px) brightness(1.5)';
    this.bloomCtx.drawImage(sourceCanvas, 0, 0);
    
    // Layer 2: Mittlerer Blur
    this.bloomCtx.filter = 'blur(10px) brightness(1.3)';
    this.bloomCtx.globalAlpha = 0.6;
    this.bloomCtx.drawImage(sourceCanvas, 0, 0);
    
    // Layer 3: Leichter Blur
    this.bloomCtx.filter = 'blur(5px) brightness(1.2)';
    this.bloomCtx.globalAlpha = 0.4;
    this.bloomCtx.drawImage(sourceCanvas, 0, 0);
    
    // Reset
    this.bloomCtx.filter = 'none';
    this.bloomCtx.globalCompositeOperation = 'source-over';
    this.bloomCtx.globalAlpha = 1.0;
    
    // Kombiniere mit Original (Premium Blend)
    sourceCtx.globalCompositeOperation = 'screen';
    sourceCtx.globalAlpha = 0.4;
    sourceCtx.drawImage(this.bloomCanvas, 0, 0);
    sourceCtx.globalCompositeOperation = 'source-over';
    sourceCtx.globalAlpha = 1.0;
  }
  
  // Motion Blur - Premium Version
  addMotionBlurFrame(canvas) {
    // Erstelle Kopie des Canvas
    const frameCanvas = document.createElement('canvas');
    frameCanvas.width = canvas.width;
    frameCanvas.height = canvas.height;
    const frameCtx = frameCanvas.getContext('2d');
    frameCtx.drawImage(canvas, 0, 0);
    
    this.motionBlurFrames.push({
      image: frameCanvas,
      alpha: 0.5,
      timestamp: Date.now()
    });
    
    if (this.motionBlurFrames.length > this.maxMotionBlurFrames) {
      this.motionBlurFrames.shift();
    }
    
    // Alpha reduzieren (smooth fade)
    this.motionBlurFrames.forEach(frame => {
      frame.alpha *= 0.75;
    });
  }
  
  drawMotionBlur(ctx) {
    // Zeichne Frames von hinten nach vorne für besseren Effekt
    for (let i = this.motionBlurFrames.length - 1; i >= 0; i--) {
      const frame = this.motionBlurFrames[i];
      if (frame.alpha > 0.01) {
        ctx.globalAlpha = frame.alpha;
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(frame.image, 0, 0);
      }
    }
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  }
  
  // Chromatic Aberration
  applyChromaticAberration(ctx, canvas, offset = 2) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Verschiebe RGB-Kanäle leicht
    for (let i = 0; i < data.length; i += 4) {
      // Rot-Kanal nach rechts
      if (i + offset * 4 < data.length) {
        data[i] = data[i + offset * 4] || data[i];
      }
      // Blau-Kanal nach links
      if (i - offset * 4 >= 0) {
        data[i + 2] = data[i - offset * 4 + 2] || data[i + 2];
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  // Screen Flash zeichnen - Premium Version
  drawFlash(ctx) {
    if (this.flashAlpha > 0) {
      // Radialer Flash-Effekt
      const gradient = ctx.createRadialGradient(
        this.canvas.width / 2,
        this.canvas.height / 2,
        0,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.max(this.canvas.width, this.canvas.height) * 0.7
      );
      gradient.addColorStop(0, this.flashColor);
      gradient.addColorStop(0.5, this.flashColor + '80');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = this.flashAlpha * 0.5;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Zusätzlicher Screen-Fill für intensiveren Effekt
      ctx.fillStyle = this.flashColor;
      ctx.globalAlpha = this.flashAlpha * 0.2;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Update
  update() {
    this.updateShake();
    this.updateFlash();
  }
  
  // Get Transform für Shake
  getTransform() {
    return {
      x: this.shakeOffset.x,
      y: this.shakeOffset.y
    };
  }
}

