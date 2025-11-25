/**
 * Background System
 * Parallax-Hintergrund mit verschiedenen Layern
 */

class BackgroundSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Hintergrund-Layer
    this.layers = [];
    this.backgroundImage = null;
    this.parallaxOffset = { x: 0, y: 0 };
    
    // Animation
    this.animationTime = 0;
    this.scrollSpeed = 0.5;
  }
  
  // Assets laden
  async loadAssets() {
    try {
      // Versuche Hintergrund-Bild zu laden (wenn vorhanden)
      // Unterstützt: .png, .jpg, .jpeg
      // Sucht nach: background.png, background.jpg, background.jpeg
      // ODER: Erstes Bild im Ordner (z.B. wallpaperflare.com_wallpaper.jpg)
      const imageExtensions = ['png', 'jpg', 'jpeg'];
      let imageLoaded = false;
      
      // Zuerst: Versuche background.*
      for (const ext of imageExtensions) {
        try {
          this.backgroundImage = await loadImage(`assets/images/background/background.${ext}`);
          console.log(`✅ Hintergrund-Bild geladen: background.${ext}`);
          imageLoaded = true;
          break;
        } catch (error) {
          // Versuche nächste Extension
          continue;
        }
      }
      
      // Falls background.* nicht gefunden: Versuche wallpaperflare.com_wallpaper.jpg
      if (!imageLoaded) {
        try {
          this.backgroundImage = await loadImage('assets/images/background/wallpaperflare.com_wallpaper.jpg');
          console.log('✅ Hintergrund-Bild geladen: wallpaperflare.com_wallpaper.jpg');
          imageLoaded = true;
        } catch (error) {
          // Fallback: Kein Bild vorhanden, verwende Gradient
          this.backgroundImage = null;
          console.log('ℹ️ Kein Hintergrund-Bild gefunden, verwende Gradient-Fallback');
        }
      }
      
      // Wenn Bild geladen wurde, aktiviere Image-Layer
      if (this.backgroundImage) {
        this.layers = [
          {
            type: 'image',
            image: this.backgroundImage,
            parallax: 0.1, // Hintergrund (langsam)
            opacity: 0.8
          },
          {
            type: 'overlay', // Overlay für Tiefe
            parallax: 0.2,
            opacity: 0.2,
            color: '#000000'
          }
        ];
      }
      
      // Erstelle Layer-System (Fallback, wenn kein Bild geladen)
      if (!this.backgroundImage) {
        this.layers = [
          {
            type: 'gradient', // Fallback
            color1: '#1B5E20',
            color2: '#2E7D32',
            parallax: 0.1, // Langsamster Layer (hinten)
            opacity: 1
          },
          {
            type: 'pattern', // Muster-Layer
            parallax: 0.3,
            opacity: 0.3
          }
        ];
      }
    } catch (error) {
      console.error('Fehler beim Laden des Hintergrunds:', error);
    }
  }
  
  // Hintergrund-Bild setzen (vom User hochgeladen)
  setBackgroundImage(image) {
    this.backgroundImage = image;
    
    // Erstelle zusätzliche Layer für Parallax
    if (image) {
      this.layers = [
        {
          type: 'image',
          image: image,
          parallax: 0.1, // Hintergrund (langsam)
          opacity: 0.8
        },
        {
          type: 'overlay', // Overlay für Tiefe
          parallax: 0.2,
          opacity: 0.2,
          color: '#000000'
        }
      ];
    }
  }
  
  // Update (wird vom Game Loop aufgerufen)
  update(deltaTime) {
    this.animationTime += deltaTime * this.scrollSpeed;
    
    // Parallax-Offset basierend auf Snake-Position (optional)
    // Kann später erweitert werden
  }
  
  // Render Hintergrund
  render(ctx, gridWidth, gridHeight, cellSize) {
    const canvasWidth = gridWidth * cellSize;
    const canvasHeight = gridHeight * cellSize;
    
    // Clear mit dunklem Hintergrund
    ctx.fillStyle = '#0F0F0F';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Render Layer (von hinten nach vorne)
    this.layers.forEach(layer => {
      ctx.save();
      ctx.globalAlpha = layer.opacity || 1;
      
      switch (layer.type) {
        case 'image':
          if (layer.image) {
            // Parallax-Offset
            const offsetX = this.parallaxOffset.x * layer.parallax;
            const offsetY = this.parallaxOffset.y * layer.parallax;
            
            // Bild skalieren und zentrieren
            const scale = Math.max(
              canvasWidth / layer.image.width,
              canvasHeight / layer.image.height
            );
            const scaledWidth = layer.image.width * scale;
            const scaledHeight = layer.image.height * scale;
            
            ctx.drawImage(
              layer.image,
              offsetX - (scaledWidth - canvasWidth) / 2,
              offsetY - (scaledHeight - canvasHeight) / 2,
              scaledWidth,
              scaledHeight
            );
          }
          break;
          
        case 'gradient':
          // Fallback: Gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
          gradient.addColorStop(0, layer.color1 || '#1B5E20');
          gradient.addColorStop(1, layer.color2 || '#2E7D32');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          break;
          
        case 'pattern':
          // Grid-Pattern (subtile)
          ctx.strokeStyle = 'rgba(76, 175, 80, 0.1)';
          ctx.lineWidth = 1;
          
          const gridSize = cellSize;
          for (let x = 0; x < canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
          }
          for (let y = 0; y < canvasHeight; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth, y);
            ctx.stroke();
          }
          break;
          
        case 'overlay':
          // Dunkles Overlay für Tiefe
          ctx.fillStyle = layer.color || '#000000';
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          break;
      }
      
      ctx.restore();
    });
    
    // Subtile Animation (optional)
    if (this.animationTime > 0) {
      // Kann für bewegte Effekte verwendet werden
    }
  }
  
  // Parallax-Offset setzen (basierend auf Snake-Position)
  setParallaxOffset(x, y) {
    this.parallaxOffset.x = x;
    this.parallaxOffset.y = y;
  }
  
  // Reset
  reset() {
    this.animationTime = 0;
    this.parallaxOffset = { x: 0, y: 0 };
  }
}

