# 🐍 LUCA'S SNAKE ADVENTURE - Detaillierter Projektplan

## 🎯 PROJEKTÜBERSICHT

### Vision
Ein modernes, cooles Snake-Spiel mit Adventure-Elementen, das speziell für Luca entwickelt wurde. Das Spiel kombiniert klassisches Snake-Gameplay mit einem entspannten Cannabis-Theme und innovativen Features, die es zu einem einzigartigen Mobile-Gaming-Erlebnis machen.

### Zielgruppe
- Primär: Luca (Cannabis-Enthusiast, Mobile-Gamer)
- Sekundär: Alle, die coole Mobile-Games mögen

### Plattformen
- **Primär**: Mobile (iOS & Android Browser)
- **Sekundär**: Desktop (Browser)

---

## 🎮 GAMEPLAY-KONZEPT

### Core-Mechanik
1. **Klassisches Snake-Gameplay**
   - Schlange bewegt sich kontinuierlich
   - Futter sammeln = Wachstum
   - Kollision = Game Over
   - Score steigt mit jedem gefressenen Item

2. **Adventure-Elemente**
   - Level-basiertes System
   - Verschiedene Schwierigkeitsgrade
   - Power-Ups und Special Items
   - Progression-System

3. **Cannabis-Theme Integration**
   - Thematische Items (z.B. "Blätter" statt normalem Futter)
   - Entspannte Farbpalette
   - Coole visuelle Effekte
   - Entspannte Atmosphäre

### Spielmodi (Optional für später)
- **Classic Mode**: Reines Snake-Spiel
- **Adventure Mode**: Mit Leveln und Power-Ups
- **Endless Mode**: Unendlich lange spielbar

---

## 🛠️ TECHNISCHE ARCHITEKTUR

### Technologie-Entscheidung

#### Option A: Vanilla JavaScript + Canvas (EMPFOHLEN)
**Vorteile:**
- ✅ Leichtgewichtig, schnelle Ladezeiten
- ✅ Volle Kontrolle über Performance
- ✅ Keine Dependencies
- ✅ Perfekt für Mobile

**Nachteile:**
- ⚠️ Mehr manueller Code nötig
- ⚠️ Keine vorgefertigten Game-Features

#### Option B: React + TypeScript
**Vorteile:**
- ✅ Moderne, skalierbare Architektur
- ✅ Type-Safety
- ✅ Component-basiert
- ✅ Einfach erweiterbar

**Nachteile:**
- ⚠️ Größere Bundle-Size
- ⚠️ Overkill für einfaches Snake-Spiel

#### Option C: Phaser.js
**Vorteile:**
- ✅ Game-Framework mit vielen Features
- ✅ Schnelle Entwicklung
- ✅ Viele Plugins verfügbar

**Nachteile:**
- ⚠️ Größere Dependency
- ⚠️ Lernkurve

**EMPFEHLUNG: Option A (Vanilla JS + Canvas)** für beste Performance auf Mobile

### Architektur-Design

```
┌─────────────────────────────────────┐
│         UI Layer (ui.js)            │
│  (Menüs, Score, Game Over Screen)   │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Game Controller (game.js)       │
│  (Game Loop, State Management)      │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   Entity Layer                      │
│  ┌──────────┐  ┌──────────┐        │
│  │ snake.js │  │ food.js   │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │powerups  │  │particles │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│    Input Layer (controls.js)        │
│  (Touch, Keyboard, Buttons)         │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Render Layer (Canvas)          │
│  (Drawing, Animation)               │
└─────────────────────────────────────┘
```

---

## 📐 DETAILLIERTE FEATURE-SPEZIFIKATIONEN

### 1. Snake-Entity
```javascript
Properties:
- position: {x, y}
- body: Array<{x, y}>
- direction: 'up' | 'down' | 'left' | 'right'
- length: number
- speed: number

Methods:
- move()
- grow()
- checkCollision()
- draw(ctx)
```

### 2. Food-System
```javascript
Types:
- Normal Food (Standard-Punkte)
- Special Food (Cannabis-Theme, mehr Punkte)
- Power-Up Food (Spezielle Effekte)

Spawn-Logic:
- Zufällige Position
- Nicht auf Snake-Körper
- Respawn nach Fressen
```

### 3. Power-Up-System
```javascript
Power-Up Types:
1. Speed Boost
   - Effekt: Temporär schneller
   - Dauer: 5 Sekunden
   - Visuell: Glow-Effekt

2. Slow Motion
   - Effekt: Zeit verlangsamt
   - Dauer: 5 Sekunden
   - Visuell: Blur-Effekt

3. Shield
   - Effekt: Einmalige Kollisionsimmunität
   - Visuell: Schild um Snake

4. Score Multiplier
   - Effekt: 2x Punkte
   - Dauer: 10 Sekunden
   - Visuell: Goldene Partikel
```

### 4. Level-System
```javascript
Level Progression:
- Level 1: Speed 1, 10 Items zum nächsten Level
- Level 2: Speed 1.2, 15 Items
- Level 3: Speed 1.5, 20 Items
- etc.

Level Features:
- Steigende Geschwindigkeit
- Mehr Power-Ups
- Spezielle Challenges
```

### 5. Mobile-Steuerung
```javascript
Touch Controls:
- Swipe Detection (min. 30px Bewegung)
- 4 Richtungen: Up, Down, Left, Right
- Dead-Zone verhindert versehentliche Swipes

Button Controls:
- On-Screen D-Pad
- 4 Richtungs-Buttons
- Große Touch-Targets (60x60px)
- Visual Feedback bei Touch
```

### 6. UI-Komponenten
```javascript
Screens:
1. Start Screen
   - Logo/Branding
   - "Play" Button
   - "Settings" Button
   - Highscore Anzeige

2. Game Screen
   - Score (oben)
   - Level (oben)
   - Pause Button
   - Game Canvas

3. Game Over Screen
   - Final Score
   - Highscore
   - "Play Again" Button
   - "Menu" Button

4. Settings Screen
   - Schwierigkeit
   - Sound On/Off
   - Steuerung wählen
```

---

## 🎨 DESIGN-SPEZIFIKATIONEN

### Farbpalette
```css
/* Primärfarben */
--green-primary: #4CAF50;
--green-dark: #2E7D32;
--green-darker: #1B5E20;
--green-light: #81C784;

/* Akzentfarben */
--orange: #FF9800;
--yellow: #FFC107;
--purple: #9C27B0;

/* Hintergrund */
--bg-dark: #1A1A1A;
--bg-darker: #0F0F0F;
--bg-grid: #2D2D2D;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #B0B0B0;
```

### Typografie
- **Headings**: Moderne Sans-Serif (z.B. 'Inter', 'Poppins')
- **Body**: Lesbare Sans-Serif
- **Game UI**: Monospace für Score (z.B. 'Courier New')

### Spacing & Layout
- **Grid Size**: 20x20px pro Zelle (anpassbar je nach Screen)
- **Padding**: 16px Mobile, 24px Desktop
- **Touch Targets**: Min. 44x44px (Apple HIG)

### Animationen
- **Snake Movement**: Smooth, 60 FPS
- **Food Spawn**: Fade-in Animation
- **Power-Up Activation**: Glow + Scale Animation
- **Game Over**: Fade-out + Score Animation
- **Screen Transitions**: Slide/Fade (300ms)

---

## 📱 MOBILE-OPTIMIERUNGEN

### Viewport & Meta-Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### Touch-Optimierungen
- Prevent default touch behaviors (scroll, zoom)
- Touch-action: none für Game-Canvas
- Passive event listeners für Performance
- Vibration API für Feedback (optional)

### Responsive Grid
```javascript
// Grid passt sich Bildschirmgröße an
function calculateGridSize() {
  const minSize = 15;
  const maxSize = 25;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Berechne optimale Grid-Größe
  // Berücksichtige Portrait/Landscape
}
```

### Performance-Optimierungen
- RequestAnimationFrame für Game Loop
- Object Pooling für Partikel
- Dirty Rectangle Rendering (nur geänderte Bereiche)
- Debouncing für Touch Events
- Minimale Reflows/Repaints

---

## 🔧 IMPLEMENTIERUNGS-DETAILS

### Game Loop
```javascript
class Game {
  constructor() {
    this.lastTime = 0;
    this.deltaTime = 0;
    this.isRunning = false;
  }
  
  gameLoop(currentTime) {
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (this.deltaTime > 1000/60) { // Cap at 60 FPS
      this.update(this.deltaTime);
      this.render();
    }
    
    if (this.isRunning) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
  
  update(deltaTime) {
    // Update game state
    this.snake.update(deltaTime);
    this.checkCollisions();
    this.checkFood();
  }
  
  render() {
    // Clear canvas
    // Draw grid
    // Draw entities
    // Draw UI
  }
}
```

### Kollisionserkennung
```javascript
// Grid-basierte Kollision (schnell)
function checkCollision(snake, food) {
  return snake.head.x === food.x && snake.head.y === food.y;
}

// Wand-Kollision
function checkWallCollision(snake, gridWidth, gridHeight) {
  return snake.head.x < 0 || 
         snake.head.x >= gridWidth ||
         snake.head.y < 0 ||
         snake.head.y >= gridHeight;
}

// Selbst-Kollision
function checkSelfCollision(snake) {
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.head.x === snake.body[i].x && 
        snake.head.y === snake.body[i].y) {
      return true;
    }
  }
  return false;
}
```

### Touch-Steuerung
```javascript
class TouchControls {
  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.minSwipeDistance = 30;
  }
  
  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  
  handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > this.minSwipeDistance) {
        game.changeDirection(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > this.minSwipeDistance) {
        game.changeDirection(deltaY > 0 ? 'down' : 'up');
      }
    }
  }
}
```

---

## 📊 PROGRESS-TRACKING

### Entwicklungs-Phasen
1. **Foundation** (Tag 1-2)
   - Setup, Grundstruktur
   - Canvas Setup
   - Basis-Rendering

2. **Core Gameplay** (Tag 3-5)
   - Snake Movement
   - Food System
   - Kollisionserkennung
   - Score System

3. **Mobile Integration** (Tag 6-7)
   - Touch Controls
   - Responsive Design
   - Mobile Testing

4. **Adventure Features** (Tag 8-10)
   - Power-Ups
   - Level System
   - Special Items

5. **Design & Polish** (Tag 11-13)
   - Visuelles Design
   - Animationen
   - UI/UX

6. **Testing & Launch** (Tag 14)
   - Bug-Fixes
   - Performance
   - Finale Optimierungen

---

## 🎯 SUCCESS METRICS

### Technische Metriken
- ✅ 60 FPS auf modernen Geräten
- ✅ < 2 Sekunden Ladezeit
- ✅ Funktioniert auf allen gängigen Browsern
- ✅ Keine Memory Leaks

### Gameplay-Metriken
- ✅ Smooth, responsive Steuerung
- ✅ Klare visuelle Feedback
- ✅ Spaßiges Gameplay
- ✅ Gute Balance (nicht zu leicht/schwer)

### Mobile-Metriken
- ✅ Touch-Steuerung funktioniert perfekt
- ✅ Responsive auf allen Bildschirmgrößen
- ✅ Portrait & Landscape Support
- ✅ Battery-freundlich

---

## 🚀 NEXT STEPS

1. **Technologie-Stack finalisieren** (Vanilla JS empfohlen)
2. **Projekt-Struktur erstellen**
3. **Erste Prototyp-Version** (Minimal Viable Product)
4. **Iterative Verbesserungen** basierend auf Testing
5. **Finale Polish & Launch**

---

**Erstellt**: Projektstart
**Version**: 1.0
**Status**: 📋 Planungsphase abgeschlossen - Bereit für Entwicklung

