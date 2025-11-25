# 🎨 ASSETS-LISTE für Luca's Snake Adventure

## 📋 ÜBERSICHT

Diese Liste enthält alle benötigten Assets für das Spiel. Du kannst sie nach und nach hochladen - wir können auch erstmal mit Platzhaltern starten und später die echten Assets einbauen.

---

## 🖼️ GRAFIKEN / BILDER

### 1. Snake-Sprites
**Benötigt:**
- [ ] **Snake Head** (verschiedene Richtungen)
  - `snake-head-up.png` - 40x40px, transparent
  - `snake-head-down.png` - 40x40px, transparent
  - `snake-head-left.png` - 40x40px, transparent
  - `snake-head-right.png` - 40x40px, transparent
  - **Alternative**: Ein rotierbares Sprite (dann nur 1 Datei)

- [ ] **Snake Body Segments**
  - `snake-body.png` - 40x40px, transparent
  - `snake-body-corner.png` - 40x40px (für Kurven), transparent
  - `snake-tail.png` - 40x40px, transparent (optional)

**Format:** PNG mit Transparenz
**Stil:** Cannabis-inspiriert (Grüntöne, entspannt, cool)

---

### 2. Food Items
**Benötigt:**
- [ ] **Normal Food** (Standard-Punkte)
  - `food-normal.png` - 30x30px, transparent
  - **Idee:** Cannabis-Blatt, grüner Punkt, oder thematisches Item

- [ ] **Special Food** (mehr Punkte)
  - `food-special.png` - 35x35px, transparent
  - **Idee:** Glänzendes/goldenes Cannabis-Blatt, oder spezielles Item

- [ ] **Power-Up Food** (verschiedene Typen)
  - `food-speed.png` - 35x35px, transparent (Speed Boost)
  - `food-slow.png` - 35x35px, transparent (Slow Motion)
  - `food-shield.png` - 35x35px, transparent (Shield)
  - `food-multiplier.png` - 35x35px, transparent (Score Multiplier)

**Format:** PNG mit Transparenz
**Stil:** Cannabis-Theme, erkennbar unterschiedlich

---

### 3. UI-Elemente
**Benötigt:**
- [ ] **Buttons**
  - `button-play.png` / `button-play-hover.png` - 200x60px
  - `button-pause.png` / `button-pause-active.png` - 60x60px
  - `button-settings.png` - 60x60px
  - `button-restart.png` - 200x60px
  - `button-menu.png` - 200x60px

- [ ] **Steuerungs-Buttons** (für Mobile)
  - `arrow-up.png` - 60x60px, transparent
  - `arrow-down.png` - 60x60px, transparent
  - `arrow-left.png` - 60x60px, transparent
  - `arrow-right.png` - 60x60px, transparent
  - **Alternative:** D-Pad als ein Sprite-Sheet

- [ ] **UI-Hintergründe**
  - `bg-menu.png` - 1920x1080px (für Start-Screen)
  - `bg-game-over.png` - 1920x1080px (für Game-Over-Screen)
  - `panel-score.png` - 300x80px (für Score-Panel, optional)

**Format:** PNG
**Stil:** Modern, Cannabis-Theme, passend zur Farbpalette

---

### 4. Power-Up Effekte
**Benötigt:**
- [ ] **Shield-Effekt**
  - `shield-effect.png` - 50x50px, transparent (Glow um Snake)

- [ ] **Partikel/Effekte** (optional, können auch programmatisch erstellt werden)
  - `particle-glow.png` - 10x10px, transparent
  - `particle-star.png` - 15x15px, transparent

**Format:** PNG mit Transparenz

---

### 5. Logo & Branding
**Benötigt:**
- [ ] **Logo**
  - `logo.png` - 400x200px, transparent (für Start-Screen)
  - `logo-small.png` - 200x100px, transparent (für Game-Over, etc.)
  - **Idee:** "Luca's Snake Adventure" oder ähnlicher Name mit Cannabis-Elementen

- [ ] **Icon** (für Browser-Tab, PWA)
  - `favicon.png` - 32x32px
  - `icon-192.png` - 192x192px (für PWA)
  - `icon-512.png` - 512x512px (für PWA)

**Format:** PNG
**Stil:** Coole, moderne Typografie mit Cannabis-Elementen

---

### 6. Hintergrund-Elemente
**Benötigt:**
- [ ] **Grid-Hintergrund** (optional, kann auch programmatisch erstellt werden)
  - `grid-pattern.png` - 100x100px, transparent (wiederholbares Muster)

- [ ] **Dekorative Elemente** (optional)
  - Verschiedene Cannabis-Blätter als Hintergrund-Deko
  - Partikel-Effekte für Atmosphäre

**Format:** PNG mit Transparenz

---

## 🔊 SOUNDS / AUDIO (OPTIONAL)

### 1. Sound-Effekte
**Benötigt:**
- [ ] `sound-eat.mp3` - Kurzer Sound beim Fressen (0.3-0.5 Sekunden)
- [ ] `sound-powerup.mp3` - Sound beim Power-Up sammeln (0.5 Sekunden)
- [ ] `sound-gameover.mp3` - Sound bei Game Over (1 Sekunde)
- [ ] `sound-levelup.mp3` - Sound beim Level-Up (0.5-1 Sekunde)
- [ ] `sound-button-click.mp3` - Sound für Button-Klicks (0.2 Sekunden)

**Format:** MP3 oder OGG (OGG für bessere Browser-Kompatibilität)
**Qualität:** 44.1kHz, 128kbps (ausreichend für Game-Sounds)

---

### 2. Hintergrundmusik (OPTIONAL)
**Benötigt:**
- [ ] `music-background.mp3` - Entspannte, loopbare Hintergrundmusik (2-3 Minuten)
  - **Stil:** Chill, entspannt, Cannabis-Theme passend
  - **Format:** MP3 oder OGG
  - **Qualität:** 44.1kHz, 192kbps

---

## 🔤 FONTS / SCHRIFTARTEN (OPTIONAL)

**Benötigt:**
- [ ] **Display-Font** (für Logo, Titel)
  - Cannabis-inspirierte oder moderne, coole Schriftart
  - **Formate:** WOFF2, WOFF, TTF
  - **Beispiele:** "Bungee", "Righteous", oder Custom-Font

- [ ] **UI-Font** (für Buttons, Score)
  - Lesbare, moderne Sans-Serif
  - **Formate:** WOFF2, WOFF, TTF
  - **Beispiele:** "Inter", "Poppins", "Roboto"

**Hinweis:** Falls keine Custom-Fonts vorhanden, verwenden wir Google Fonts oder System-Fonts.

---

## 📐 TECHNISCHE SPEZIFIKATIONEN

### Bildformate
- **Primär:** PNG mit Transparenz (Alpha-Kanal)
- **Alternative:** SVG (für skalierbare Grafiken)
- **Komprimierung:** Optimiert für Web (TinyPNG, ImageOptim)

### Größen-Richtlinien
- **Sprites:** 2x größer als benötigt (für Retina-Displays)
  - Beispiel: 40x40px Sprite → 80x80px Datei
- **UI-Elemente:** Responsive, verschiedene Größen möglich
- **Hintergründe:** Mindestens 1920x1080px (für Full-HD)

### Farbpalette (für Assets)
- **Primär:** Grüntöne (#4CAF50, #2E7D32, #1B5E20)
- **Akzent:** Warme Töne (#FF9800, #FFC107)
- **Hintergrund:** Dunkle Töne (#1A1A1A, #2D2D2D)
- **Transparenz:** Wo möglich, für bessere Integration

---

## 🎨 DESIGN-RICHTLINIEN

### Stil
- **Cannabis-Theme:** Grüntöne, entspannte Atmosphäre
- **Modern:** Clean, minimalistisch, aber mit Charakter
- **Coole Effekte:** Glow, Shader, Partikel (können auch programmatisch erstellt werden)

### Konsistenz
- Einheitlicher Stil über alle Assets
- Passende Farbpalette
- Ähnliche Linienstärken/Details

---

## 📦 ORDNERSTRUKTUR FÜR ASSETS

```
assets/
├── images/
│   ├── snake/
│   │   ├── head-up.png
│   │   ├── head-down.png
│   │   ├── head-left.png
│   │   ├── head-right.png
│   │   ├── body.png
│   │   └── tail.png
│   ├── food/
│   │   ├── normal.png
│   │   ├── special.png
│   │   ├── speed.png
│   │   ├── slow.png
│   │   ├── shield.png
│   │   └── multiplier.png
│   ├── ui/
│   │   ├── buttons/
│   │   ├── controls/
│   │   └── backgrounds/
│   ├── effects/
│   │   ├── shield.png
│   │   └── particles/
│   ├── logo/
│   │   ├── logo.png
│   │   └── logo-small.png
│   └── icons/
│       ├── favicon.png
│       ├── icon-192.png
│       └── icon-512.png
├── sounds/
│   ├── effects/
│   │   ├── eat.mp3
│   │   ├── powerup.mp3
│   │   ├── gameover.mp3
│   │   ├── levelup.mp3
│   │   └── button-click.mp3
│   └── music/
│       └── background.mp3
└── fonts/
    ├── display-font.woff2
    └── ui-font.woff2
```

---

## ✅ PRIORITÄTEN

### Phase 1: Essentiell (für MVP)
1. ✅ Snake Head (mindestens 1 Richtung, rotierbar)
2. ✅ Snake Body Segment
3. ✅ Normal Food
4. ✅ Logo/Icon (mindestens Favicon)
5. ✅ Basis-Buttons (Play, Pause)

### Phase 2: Wichtig (für vollständiges Spiel)
6. ✅ Alle Snake-Richtungen
7. ✅ Special Food
8. ✅ Power-Up Sprites
9. ✅ Alle UI-Buttons
10. ✅ Steuerungs-Buttons (Mobile)

### Phase 3: Nice-to-Have (für Polish)
11. ✅ Sound-Effekte
12. ✅ Hintergrundmusik
13. ✅ Custom Fonts
14. ✅ Partikel-Effekte
15. ✅ Dekorative Elemente

---

## 💡 HINWEISE

### Was du NICHT brauchst (kann ich programmatisch erstellen):
- ❌ Grid-Hintergrund (wird im Code gezeichnet)
- ❌ Partikel-Effekte (können programmatisch erstellt werden)
- ❌ Einfache geometrische Formen (Kreise, Rechtecke)
- ❌ Score-Anzeige (wird als Text gerendert)

### Was du BRAUCHST (kann ich nicht gut erstellen):
- ✅ Logo mit Text (wenn du einen bestimmten Stil willst)
- ✅ Cannabis-inspirierte Grafiken (wenn du spezifische Designs hast)
- ✅ Custom Fonts (wenn du eine bestimmte Schriftart willst)
- ✅ Sound-Effekte (wenn du bestimmte Sounds willst)

---

## 🚀 NÄCHSTE SCHRITTE

1. **Starte mit den essentiellen Assets** (Phase 1)
2. **Lade sie in den `assets/` Ordner hoch**
3. **Ich integriere sie ins Spiel**
4. **Dann können wir nach und nach die anderen Assets hinzufügen**

**Tipp:** Falls du noch keine Assets hast, kann ich das Spiel erstmal mit programmatisch erstellten Grafiken starten, und wir tauschen sie später aus!

---

**Letzte Aktualisierung:** Erstellt
**Status:** 📋 Bereit für Asset-Upload

