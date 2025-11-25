# 🐍 LUCA'S SNAKE ADVENTURE - Finaler Entwicklungs-Prompt

## 🎯 PROJEKTZIEL

Entwickle ein cooles, modernes Snake-Spiel mit Adventure-Elementen für Luca. Das Spiel soll:
- **Mobile-first** sein (Touch-Steuerung, responsive)
- **Cannabis-Theme** haben (entspannt, grüne Farben, Marijuana-Items)
- **Adventure-Features** enthalten (Level, Power-Ups, Progression)
- **Cooler als normales Snake** sein (Animationen, Effekte, moderne Grafik)
- **Auf dem Handy perfekt funktionieren**

---

## 🛠️ TECHNOLOGIE-STACK

**EMPFEHLUNG: Vanilla JavaScript + HTML5 Canvas**

**Warum:**
- ✅ Leichtgewichtig, schnelle Ladezeiten
- ✅ Volle Performance-Kontrolle
- ✅ Keine Dependencies
- ✅ Perfekt für Mobile

**Alternative:** React + TypeScript (wenn gewünscht)

---

## 📂 PROJEKTSTRUKTUR

```
lucasnake/
├── index.html
├── css/
│   ├── style.css
│   └── mobile.css
├── js/
│   ├── main.js          # Entry Point
│   ├── game.js          # Game Controller & Loop
│   ├── snake.js         # Snake Entity
│   ├── food.js          # Food System
│   ├── powerups.js      # Power-Up System
│   ├── ui.js            # UI Management
│   ├── controls.js      # Touch & Keyboard Controls
│   └── utils.js         # Helper Functions
├── assets/
│   └── images/          # ✅ Alle Assets bereits sortiert!
│       ├── snake/       # 18 Dateien
│       ├── food/        # 15 Dateien (inkl. Marijuana.png)
│       ├── walls/        # 19 Dateien
│       ├── logo/         # weedgame.png
│       └── ui/           # 226 Dateien (Buttons, Icons, etc.)
├── PROJEKTSTATUS.md     # ToDo-Liste & Status
├── PROJEKTPLAN.md       # Detaillierter Plan
├── ASSETS_ÜBERSICHT.md  # Asset-Dokumentation
└── FINALER_PROMPT.md    # Diese Datei
```

---

## 🎮 CORE-FEATURES

### 1. Snake-Gameplay
- [ ] Grid-basierte Bewegung (20x20px Zellen, responsive)
- [ ] Kontinuierliche Bewegung (keine Sprünge)
- [ ] Wachstum beim Fressen
- [ ] Kollisionserkennung (Wände, Selbstkollision)
- [ ] Score-System
- [ ] Game-Over-Logik

**Assets:**
- `snake_green_head.png` - Kopf
- `snake_green_blob.png` - Körper
- `snake_green_eyes.png` - Alternative Variante

### 2. Food-System
- [ ] Normal Food: `apple_green.png`, `apple_red.png`
- [ ] Special Food: `Marijuana.png` (mehr Punkte!)
- [ ] Power-Up Food: `bomb.png` (negativer Effekt?)
- [ ] Zufälliges Spawnen (nicht auf Snake)
- [ ] Verschiedene Punktwerte

**Assets:**
- `assets/images/food/` - Alle Food-Items verfügbar

### 3. Power-Up-System
- [ ] **Speed Boost** - Temporär schneller (5 Sek)
- [ ] **Slow Motion** - Zeit verlangsamt (5 Sek)
- [ ] **Shield** - Einmalige Kollisionsimmunität
- [ ] **Score Multiplier** - 2x Punkte (10 Sek)
- [ ] Visuelle Effekte (Glow, Partikel)

### 4. Level-System
- [ ] Level-Progression (10 Items → Level 2, 15 → Level 3, etc.)
- [ ] Steigende Geschwindigkeit pro Level
- [ ] Level-Up-Animation
- [ ] Level-Anzeige im UI

### 5. Mobile-Steuerung
- [ ] **Swipe-Gesten** (min. 30px Bewegung)
  - Up, Down, Left, Right
  - Dead-Zone verhindert versehentliche Swipes
- [ ] **On-Screen D-Pad** (Alternative)
  - 4 Richtungs-Buttons
  - Große Touch-Targets (60x60px)
  - Visual Feedback
- [ ] **Keyboard-Steuerung** (Desktop)
  - Arrow Keys / WASD

**Assets:**
- `assets/images/ui/icons/` - Für D-Pad Buttons

### 6. UI-Screens
- [ ] **Start Screen**
  - Logo: `assets/images/logo/weedgame.png`
  - Play-Button
  - Settings-Button
  - Highscore-Anzeige
- [ ] **Game Screen**
  - Score (oben)
  - Level (oben)
  - Pause-Button
  - Game Canvas (zentral)
- [ ] **Game Over Screen**
  - Final Score
  - Highscore
  - "Play Again" Button
  - "Menu" Button
- [ ] **Settings Screen**
  - Schwierigkeit
  - Sound On/Off
  - Steuerung wählen (Swipe / D-Pad)

**Assets:**
- `assets/images/ui/buttons/` - Buttons (Btn01-10, Button01-25)
- `assets/images/ui/messages/` - Message-Boxen
- `assets/images/ui/numbers/` - Number-Sprites für Score

---

## 🎨 DESIGN-SPEZIFIKATIONEN

### Farbpalette
```css
--green-primary: #4CAF50;
--green-dark: #2E7D32;
--green-darker: #1B5E20;
--orange: #FF9800;
--yellow: #FFC107;
--bg-dark: #1A1A1A;
--bg-grid: #2D2D2D;
--text-primary: #FFFFFF;
```

### Responsive Grid
- **Mobile Portrait:** 15-18 Zellen breit
- **Mobile Landscape:** 20-25 Zellen breit
- **Desktop:** 25-30 Zellen breit
- **Zellgröße:** Automatisch berechnet basierend auf Bildschirmgröße

### Animationen
- Smooth Snake-Bewegung (60 FPS)
- Fade-in beim Food-Spawn
- Glow-Effekte bei Power-Ups
- Screen-Transitions (300ms Fade/Slide)

---

## 📱 MOBILE-OPTIMIERUNGEN

### HTML Meta-Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### Performance
- RequestAnimationFrame für Game Loop
- Object Pooling für Partikel
- Minimale Reflows/Repaints
- Touch-Events optimiert (passive listeners)

### Touch-Optimierungen
- `touch-action: none` für Canvas
- Prevent default (scroll, zoom)
- Große Touch-Targets (min. 44x44px)

---

## 🔧 IMPLEMENTIERUNGS-DETAILS

### Game Loop (60 FPS)
```javascript
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.lastTime = 0;
    this.isRunning = false;
  }
  
  gameLoop(currentTime) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (deltaTime >= 1000/60) {
      this.update(deltaTime);
      this.render();
    }
    
    if (this.isRunning) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
  
  update(deltaTime) {
    this.snake.update(deltaTime);
    this.checkCollisions();
    this.checkFood();
    this.updatePowerUps(deltaTime);
  }
  
  render() {
    this.clearCanvas();
    this.drawGrid();
    this.drawFood();
    this.drawSnake();
    this.drawPowerUps();
    this.drawUI();
  }
}
```

### Snake Entity
```javascript
class Snake {
  constructor(x, y) {
    this.body = [{x, y}];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.speed = 150; // ms pro Bewegung
    this.lastMove = 0;
  }
  
  update(deltaTime) {
    this.lastMove += deltaTime;
    if (this.lastMove >= this.speed) {
      this.move();
      this.lastMove = 0;
    }
  }
  
  move() {
    this.direction = this.nextDirection;
    const head = {...this.body[0]};
    
    switch(this.direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }
    
    this.body.unshift(head);
    this.body.pop();
  }
  
  grow() {
    const tail = {...this.body[this.body.length - 1]};
    this.body.push(tail);
  }
  
  checkCollision(gridWidth, gridHeight) {
    const head = this.body[0];
    
    // Wand-Kollision
    if (head.x < 0 || head.x >= gridWidth || 
        head.y < 0 || head.y >= gridHeight) {
      return true;
    }
    
    // Selbst-Kollision
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    
    return false;
  }
}
```

### Touch Controls
```javascript
class TouchControls {
  constructor(game) {
    this.game = game;
    this.startX = 0;
    this.startY = 0;
    this.minSwipeDistance = 30;
    
    this.setupEvents();
  }
  
  setupEvents() {
    const canvas = this.game.canvas;
    
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    }, {passive: false});
    
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - this.startX;
      const deltaY = endY - this.startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal
        if (Math.abs(deltaX) > this.minSwipeDistance) {
          this.game.changeDirection(deltaX > 0 ? 'right' : 'left');
        }
      } else {
        // Vertical
        if (Math.abs(deltaY) > this.minSwipeDistance) {
          this.game.changeDirection(deltaY > 0 ? 'down' : 'up');
        }
      }
    }, {passive: false});
  }
}
```

---

## 📋 ENTWICKLUNGS-PHASEN

### Phase 1: Foundation ✅
- [x] Projektplanung
- [x] Assets sortiert
- [ ] HTML-Struktur
- [ ] CSS Basis-Styling
- [ ] Canvas Setup

### Phase 2: Core Gameplay
- [ ] Snake Entity
- [ ] Food System
- [ ] Kollisionserkennung
- [ ] Score System
- [ ] Game Over

### Phase 3: Mobile Integration
- [ ] Touch Controls (Swipe)
- [ ] D-Pad Buttons
- [ ] Responsive Grid
- [ ] Mobile Testing

### Phase 4: Adventure Features
- [ ] Power-Up System
- [ ] Level System
- [ ] Special Items
- [ ] Progression

### Phase 5: Design & Polish
- [ ] Asset-Integration
- [ ] Animationen
- [ ] UI-Screens
- [ ] Effekte

### Phase 6: Testing & Launch
- [ ] Cross-Browser-Testing
- [ ] Mobile-Device-Testing
- [ ] Performance-Optimierung
- [ ] Bug-Fixes

---

## 🎯 ASSET-ZUORDNUNG

### Snake
- **Head:** `assets/images/snake/snake_green_head.png`
- **Body:** `assets/images/snake/snake_green_blob.png`
- **Alternative:** `snake_green_eyes.png` (mit Augen)

### Food
- **Normal:** `assets/images/food/apple_green.png`
- **Special:** `assets/images/food/Marijuana.png` 🌿
- **Negative:** `assets/images/food/bomb.png`

### UI
- **Logo:** `assets/images/logo/weedgame.png`
- **Buttons:** `assets/images/ui/buttons/Button01.png` - `Button25.png`
- **Icons:** `assets/images/ui/icons/Icon01.png` - `Icon105.png`
- **Numbers:** `assets/images/ui/numbers/Number01.png` - `Number45.png`
- **Messages:** `assets/images/ui/messages/Msg01.png` - `Msg20.png`

---

## ✅ QUALITÄTSSICHERUNG

### Performance-Ziele
- ✅ 60 FPS auf modernen Geräten
- ✅ 30+ FPS auf älteren Mobilgeräten
- ✅ < 2 Sekunden Ladezeit
- ✅ Smooth Animationen

### Browser-Kompatibilität
- ✅ Chrome/Edge (neueste)
- ✅ Firefox (neueste)
- ✅ Safari (iOS/macOS)
- ✅ Mobile Browser

### Mobile-Features
- ✅ Touch-Steuerung funktioniert perfekt
- ✅ Responsive auf allen Bildschirmgrößen
- ✅ Portrait & Landscape Support
- ✅ Battery-freundlich

---

## 🚀 START DER ENTWICKLUNG

**Bereit zum Start!**

Alle Assets sind sortiert, der Plan ist klar, die Struktur steht fest.

**Nächster Schritt:** Beginne mit Phase 1 - HTML-Struktur und Canvas-Setup!

---

**Version:** 1.0 Final
**Status:** ✅ Bereit für Entwicklung
**Letzte Aktualisierung:** Assets sortiert, Prompt finalisiert

