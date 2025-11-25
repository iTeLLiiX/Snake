# 📋 VOLLSTÄNDIGE ANFORDERUNGEN - Luca's Snake Adventure

## 🎯 PROJEKT-ÜBERSICHT

**Projektname:** Luca's Snake Adventure  
**Ziel:** Cooles, modernes Snake-Spiel mit Adventure-Features für Mobile  
**Theme:** Cannabis-inspiriert (entspannt, grüne Farben, Marijuana-Items)  
**Tech:** Vanilla JavaScript ES6+ + HTML5 Canvas (keine Frameworks!)

---

## 🎨 DESIGN-SPEZIFIKATIONEN

### Farbpalette
```css
--green-primary: #4CAF50;
--green-dark: #2E7D32;
--green-darker: #1B5E20;
--green-light: #81C784;
--orange: #FF9800;
--yellow: #FFC107;
--purple: #9C27B0;
--bg-dark: #1A1A1A;
--bg-darker: #0F0F0F;
--bg-grid: #2D2D2D;
--text-primary: #FFFFFF;
--text-secondary: #B0B0B0;
```

### Animationen
- **Snake Movement:** Smooth, 60 FPS
- **Food Spawn:** Fade-in (300ms)
- **Power-Up Activation:** Glow + Scale Animation
- **Game Over:** Fade-out + Score Animation
- **Screen Transitions:** Slide/Fade (300ms)

### Typografie
- **Headings:** Moderne Sans-Serif (z.B. 'Inter', 'Poppins' via Google Fonts)
- **Body:** System Font Stack
- **Game UI:** Monospace für Score (z.B. 'Courier New')

---

## 🎮 GAMEPLAY-SPEZIFIKATIONEN

### Grid-System
- **Basis-Größe:** 20x20px pro Zelle (responsive anpassbar)
- **Mobile Portrait:** 15-18 Zellen breit
- **Mobile Landscape:** 20-25 Zellen breit
- **Desktop:** 25-30 Zellen breit
- **Berechnung:** Automatisch basierend auf Bildschirmgröße

### Snake-Bewegung
- **Geschwindigkeit:** Start bei 150ms pro Bewegung
- **Richtungen:** Up, Down, Left, Right
- **Verhindere:** 180°-Wendungen (nicht direkt umkehren)
- **Wachstum:** +1 Segment pro gefressenem Item

### Food-System (ANGEPASST: 1 Item = 1 Punkt)
- **Normal Food (apple_green):** 1 Punkt (50% Chance)
- **Apple Red:** 1 Punkt (15% Chance)
- **Marijuana (Special):** 2 Punkte (10% Chance)
- **Easter Egg:** 5 Punkte (10% Chance) - Mega-Bonus!
- **Oliebol:** 1 Punkt + **Heilt 1 Segment** (10% Chance)
- **Bomb:** -1 Punkt (5% Chance) - Negativ!
- **Spawn-Logic:** Zufällig, nicht auf Snake-Körper
- **Respawn:** Sofort nach Fressen

### Power-Ups
1. **Speed Boost:** +50% Geschwindigkeit, 5 Sekunden
2. **Slow Motion:** -50% Geschwindigkeit, 5 Sekunden
3. **Shield:** Einmalige Kollisionsimmunität
4. **Score Multiplier:** 2x Punkte, 10 Sekunden

### Level-System
- **Level 1:** 10 Items → Level 2
- **Level 2:** 15 Items → Level 3
- **Level 3:** 20 Items → Level 4
- **Geschwindigkeit:** +20% pro Level
- **Max Level:** Unbegrenzt

### Score-System
- **Normal Food:** 1 Punkt
- **Marijuana:** 2 Punkte
- **Easter Egg:** 5 Punkte
- **Multiplier:** Verdoppelt alle Punkte
- **Combo-Bonus:** +1 Punkt ab Combo 3
- **Highscore:** LocalStorage speichern

---

## 📱 MOBILE-OPTIMIERUNGEN

### Touch-Steuerung
- **Swipe-Gesten:** Min. 30px Bewegung erforderlich
- **Dead-Zone:** Verhindere versehentliche Swipes
- **Alternative:** On-Screen D-Pad (4 Buttons, 60x60px)
- **Touch-Targets:** Min. 44x44px (Apple HIG)

### Viewport & Meta-Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### Performance
- **Game Loop:** requestAnimationFrame (60 FPS Ziel)
- **Touch Events:** Passive listeners wo möglich
- **Canvas:** `touch-action: none` für Canvas-Element
- **Rendering:** Nur geänderte Bereiche neu zeichnen (wenn möglich)

### Responsive Design
- **Portrait & Landscape:** Beide unterstützen
- **Flexible Grid:** Passt sich automatisch an
- **UI-Skalierung:** Buttons und Text skalieren mit Bildschirmgröße

---

## 🎨 UI-SCREENS

### 1. Start Screen
- Logo: `weedgame.png`
- Play-Button: `Button01.png` oder ähnlich (SOLLTE ASSETS VERWENDEN!)
- Settings-Button: `Button02.png` oder ähnlich (SOLLTE ASSETS VERWENDEN!)
- Highscore-Anzeige (aus LocalStorage)
- **Design:** Premium, modern, Cannabis-Theme

### 2. Game Screen
- Score (oben links): Number-Sprites verwenden (`Number01.png` bis `Number45.png`) ✅
- Level (oben rechts): Number-Sprites verwenden ✅
- Power-Up-Timer-Anzeige (oben) ✅
- Combo-Meter (oben) ✅
- Pause-Button (oben rechts)
- Game Canvas (zentral, responsive)
- Optional: D-Pad Buttons (unten, wenn aktiviert)

### 3. Game Over Screen
- Message-Box: `Msg01.png` oder ähnlich ✅
- Final Score: Number-Sprites ✅
- Highscore: Number-Sprites ✅
- Erweiterte Statistiken:
  - Level erreicht ✅
  - Items gefressen ✅
  - Längste Combo ✅
  - Spielzeit ✅
  - Power-Ups gesammelt ✅
  - Ø Punkte pro Item ✅
- "Play Again" Button: `Button03.png` oder ähnlich (SOLLTE ASSETS VERWENDEN!)
- "Menu" Button: `Button04.png` oder ähnlich (SOLLTE ASSETS VERWENDEN!)

### 4. Settings Screen
- Schwierigkeit: Slider oder Buttons
- Sound On/Off: CheckBox (`CheckBox01.png` bis `CheckBox10.png`)
- Musik On/Off: CheckBox
- Steuerung: Swipe / D-Pad Auswahl
- Zurück-Button

---

## 🚀 FEATURE-ANFORDERUNGEN

### ✅ BEREITS IMPLEMENTIERT

#### Core Gameplay
- ✅ Snake-Bewegung und Wachstum
- ✅ Food-System mit 6 Varianten
- ✅ Power-Up-System (4 Typen)
- ✅ Power-Ups als Items auf dem Spielfeld
- ✅ Combo-System mit visueller Anzeige
- ✅ Level-System mit steigender Schwierigkeit
- ✅ Score-System mit Highscore (LocalStorage)
- ✅ Game-Over-Screen mit erweiterten Statistiken

#### Visual Effects
- ✅ Partikel-System
- ✅ Trail-System
- ✅ Screen Shake & Flash
- ✅ Bloom/Glow-Effekte
- ✅ Level-Up-Animation

#### UI/UX
- ✅ Number-Sprites für Score & Level
- ✅ Power-Up-Timer-Anzeige im UI
- ✅ Combo-Meter-Visualisierung
- ✅ Responsive Design (Mobile & Desktop)
- ✅ Touch-Steuerung (Swipe)
- ✅ D-Pad Buttons

#### Sound
- ✅ Sound-Effekte
- ✅ Hintergrundmusik
- ✅ Volume-Control

---

### ❌ NOCH NICHT IMPLEMENTIERT

#### 1. 🎨 BUTTON-ASSETS VERWENDEN ⭐⭐⭐
**Status:** ❌ Fehlt komplett
**Was:** Buttons verwenden noch CSS-Styling, nicht die echten Button-Sprites
**Benötigt:**
- `Button01.png` bis `Button25.png` für alle Buttons
- Play-Button, Settings-Button, Pause-Button, etc. sollten Assets verwenden
**Impact:** Hoch - Nutzt vorhandene Assets, sieht professioneller aus

#### 2. 🏆 ACHIEVEMENT-SYSTEM ⭐⭐⭐⭐⭐
**Status:** ❌ Fehlt komplett
**Was:** Belohnungen für Meilensteine
**Benötigt:**
- Achievement-Definitionen:
  - "Erster Highscore" - Erster Highscore gesetzt
  - "Level 10" - Level 10 erreicht
  - "100 Items" - 100 Items gefressen
  - "Combo Master" - 10er Combo erreicht
  - "Perfekt" - Spiel ohne Bomben
  - "Speed Demon" - Level 5 in unter 2 Minuten
  - "Marijuana Lover" - 20x Marijuana gefressen
  - "Unsterblich" - 10x Shield verwendet
  - "Punkte-König" - 1000+ Punkte
  - "Endlos" - Level 20+
- Achievement-Popup mit Animation
- Achievement-Übersicht im Settings
- LocalStorage für gesammelte Achievements
**Impact:** Sehr hoch - Langzeit-Motivation, Gamification

#### 3. 🧱 WALL-SYSTEM ⭐⭐⭐
**Status:** ❌ Fehlt komplett
**Was:** Wände ab Level 5 als Hindernisse
**Benötigt:**
- Wall-Assets laden (`wall_block_*.png`)
- Wall-Spawning-Logic (ab Level 5)
- Kollisionserkennung mit Wänden
- Wall-Rendering
**Impact:** Mittel - Mehr Herausforderung, nutzt vorhandene Assets

#### 4. 🎯 ICON-ASSETS FÜR POWER-UPS ⭐⭐
**Status:** ⚠️ Teilweise (verwendet Emojis statt Icons)
**Was:** Power-Up-Icons sollten `Icon01.png` bis `Icon105.png` verwenden
**Benötigt:**
- Icon-Assets laden
- Power-Up-Items verwenden Icons statt Emojis
- Power-Up-Timer im UI verwendet Icons
**Impact:** Niedrig - Visuelle Verbesserung

#### 5. 📊 PROGRESS-BARS FÜR LEVEL ⭐⭐
**Status:** ❌ Fehlt komplett
**Was:** Level-Progress mit `Progress01.png` bis `Progress05.png`
**Benötigt:**
- Progress-Bar-Assets laden
- Level-Progress-Bar im UI
- Visualisierung: "5/10 Items für Level 2"
**Impact:** Niedrig - Visuelles Feedback

#### 6. 🎚️ SLIDER-ASSETS FÜR SETTINGS ⭐
**Status:** ❌ Fehlt komplett
**Was:** Settings-Slider verwenden `Slider01.png` bis `Slider05.png`
**Benötigt:**
- Slider-Assets laden
- Volume-Slider verwendet Assets
- Difficulty-Slider verwendet Assets
**Impact:** Sehr niedrig - Visuelle Verbesserung

#### 7. 💬 MEHR MESSAGE-ASSETS ⭐
**Status:** ⚠️ Teilweise (nur Msg01.png verwendet)
**Was:** Verschiedene Messages für verschiedene Events
**Benötigt:**
- `Msg02.png` bis `Msg20.png` für verschiedene Events
- Level-Up-Message
- Achievement-Message
- Special-Event-Messages
**Impact:** Sehr niedrig - Visuelle Abwechslung

#### 8. 📊 STATISTIK-SYSTEM ⭐⭐⭐
**Status:** ❌ Fehlt komplett
**Was:**
- Gesamt gespielte Spiele
- Gesamt gefressene Items
- Durchschnittliche Score
- Bestes Level
- Gesamt-Spielzeit
- Gesamt-Combos
**Impact:** Mittel - Spieler können Fortschritt sehen

#### 9. 🎨 SKIN-SYSTEM FÜR SNAKE ⭐⭐
**Status:** ❌ Fehlt komplett
**Was:**
- Verschiedene Snake-Farben (grün, gelb)
- Verschiedene Styles (blob, eyes)
- Freischaltbar durch Achievements
**Impact:** Mittel - Personalisierung, nutzt vorhandene Assets

#### 10. 📳 VIBRATION-FEEDBACK (Mobile) ⭐⭐
**Status:** ❌ Fehlt komplett
**Was:**
- Vibration beim Fressen (kurz, sanft)
- Vibration bei Power-Ups (länger, stärker)
- Vibration bei Game Over (lang, stark)
- Optional in Settings
**Impact:** Mittel - Haptisches Feedback auf Mobile

#### 11. ⏳ LOADING-SCREEN MIT PROGRESS ⭐⭐
**Status:** ❌ Fehlt komplett
**Was:**
- Loading-Animation beim Start
- Asset-Loading-Progress
- Tipps während Loading
- Smooth Transition
**Impact:** Mittel - Professioneller, nutzt Wartezeit

---

## 📦 ASSET-PFADE & VERWENDUNG

### Snake Assets
- **Head:** `assets/images/snake/snake_green_head.png` (Standard) ✅
- **Body:** `assets/images/snake/snake_green_blob.png` (Standard) ✅
- **Alternative:** `snake_green_eyes.png` (mit Augen) - Noch nicht verwendet
- **Größen:** Verwende Original-Größe, skaliere im Code

### Food Assets
- **Normal Food:** `assets/images/food/apple_green.png` ✅
- **Apple Red:** `assets/images/food/apple_red.png` ✅
- **Special Food:** `assets/images/food/Marijuana.png` ✅
- **Easter Egg:** `assets/images/food/easter_egg.png` ✅
- **Oliebol:** `assets/images/food/oliebol.png` ✅
- **Negative Item:** `assets/images/food/bomb.png` ✅

### UI Assets
- **Logo:** `assets/images/logo/weedgame.png` ✅
- **Buttons:** `assets/images/ui/buttons/Button01.png` bis `Button25.png` ❌ (NOCH NICHT VERWENDET!)
- **Icons:** `assets/images/ui/icons/Icon01.png` bis `Icon105.png` ⚠️ (TEILWEISE - Emojis statt Icons)
- **Numbers:** `assets/images/ui/numbers/Number01.png` bis `Number45.png` ✅ (WIRD VERWENDET!)
- **Messages:** `assets/images/ui/messages/Msg01.png` bis `Msg20.png` ⚠️ (NUR Msg01.png VERWENDET)
- **Progress:** `assets/images/ui/progress/Progress01.png` bis `Progress05.png` ❌ (NOCH NICHT VERWENDET!)
- **Sliders:** `assets/images/ui/sliders/Slider01.png` bis `Slider05.png` ❌ (NOCH NICHT VERWENDET!)
- **CheckBoxes:** `assets/images/ui/buttons/CheckBox01.png` bis `CheckBox10.png` ❌ (NOCH NICHT VERWENDET!)

### Wall Assets
- **Walls:** `assets/images/walls/wall_block_*.png` ❌ (NOCH NICHT VERWENDET!)

---

## 🎯 PRIORITÄTEN

### Priorität 1: Sofort umsetzen ⭐⭐⭐⭐⭐
1. **Button-Assets verwenden** - Nutzt vorhandene Assets, hoher visueller Impact
2. **Achievement-System** - Langzeit-Motivation, Gamification

### Priorität 2: Bald umsetzen ⭐⭐⭐
3. **Wall-System** - Mehr Herausforderung, nutzt vorhandene Assets
4. **Statistik-System** - Spieler können Fortschritt sehen

### Priorität 3: Optional ⭐⭐
5. **Icon-Assets für Power-Ups** - Visuelle Verbesserung
6. **Progress-Bars** - Visuelles Feedback
7. **Skin-System** - Personalisierung

### Priorität 4: Nice-to-have ⭐
8. **Slider-Assets** - Visuelle Verbesserung
9. **Mehr Message-Assets** - Visuelle Abwechslung
10. **Vibration-Feedback** - Haptisches Feedback
11. **Loading-Screen** - Professioneller

---

## 📝 ZUSAMMENFASSUNG

**Was bereits gut ist:**
- ✅ Core Gameplay vollständig
- ✅ Visual Effects auf hohem Niveau
- ✅ Number-Sprites implementiert
- ✅ Power-Ups als Items implementiert
- ✅ Combo-System implementiert
- ✅ Score-System angepasst (1 Item = 1 Punkt)

**Was hauptsächlich fehlt:**
1. ❌ **Button-Assets** - Buttons verwenden noch CSS, nicht Assets
2. ❌ **Achievement-System** - Komplett fehlend
3. ❌ **Wall-System** - Wände ab Level 5 fehlen
4. ⚠️ **Icon-Assets** - Power-Ups verwenden Emojis statt Icons
5. ❌ **Progress-Bars** - Level-Progress fehlt

**Nächste Schritte:**
1. Button-Assets integrieren
2. Achievement-System implementieren
3. Wall-System hinzufügen

---

**Version:** 1.0  
**Letzte Aktualisierung:** Vollständige Anforderungen dokumentiert

