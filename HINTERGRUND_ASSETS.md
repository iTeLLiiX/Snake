# 🎨 HINTERGRUND-ASSETS FÜR LUCA'S SNAKE ADVENTURE

## 📋 BENÖTIGTE ASSETS

### Haupt-Hintergrund-Bild
**Pfad:** `assets/images/background/background.png` (oder `.jpg`)

**Anforderungen:**
- **Format:** PNG oder JPG
- **Größe:** Mindestens 1920x1080px (Full HD)
  - Ideal: 2560x1440px (2K) oder größer
  - Das Bild wird automatisch skaliert
- **Stil:** 
  - Cannabis-Theme (grün, entspannt)
  - Dunkel genug, damit Snake & Food gut sichtbar sind
  - Kann subtile Muster/Texturen haben
  - Keine zu hellen Bereiche (Kontrast für Gameplay wichtig)
- **Farben:** 
  - Primär: Dunkelgrün (#1B5E20, #2E7D32)
  - Sekundär: Schwarz/Grau (#0F0F0F, #1A1A1A)
  - Akzente: Grün-Töne (#4CAF50, #81C784)

### Optionale Assets (für Parallax-Effekt)

#### Layer 1: Hintergrund (langsam, hinten)
- `assets/images/background/layer1_background.png`
- Sehr dunkel, subtil

#### Layer 2: Overlay (mittel, Mitte)
- `assets/images/background/layer2_overlay.png`
- Transparentes Overlay für Tiefe

#### Layer 3: Vordergrund (schnell, vorne)
- `assets/images/background/layer3_foreground.png`
- Sehr subtil, fast transparent

---

## 🎯 EMPFOHLENE BILDER

### Option 1: Gradient-Hintergrund (einfach)
- Dunkelgrüner Gradient von oben nach unten
- Sehr subtil, kein Ablenkung

### Option 2: Cannabis-Blätter-Muster (mittel)
- Subtile Cannabis-Blätter im Hintergrund
- Sehr dunkel, fast transparent
- Wiederholbares Muster

### Option 3: Dschungel/Urwald-Atmosphäre (fortgeschritten)
- Dunkler Wald/Dschungel-Hintergrund
- Cannabis-Theme integriert
- Parallax-Layer für Tiefe

### Option 4: Abstrakt/Geometrisch (modern)
- Geometrische Formen
- Cannabis-inspiriert
- Modern, clean

---

## 📁 ORDNER-STRUKTUR

```
assets/
└── images/
    └── background/
        ├── background.png          (HAUPT-BILD - WICHTIG!)
        ├── layer1_background.png   (optional)
        ├── layer2_overlay.png      (optional)
        └── layer3_foreground.png   (optional)
```

---

## ✅ WIE DU DIE ASSETS HOCHLÄDST

1. **Erstelle den Ordner:**
   ```
   assets/images/background/
   ```

2. **Lade das Haupt-Bild hoch:**
   - Name: `background.png` (oder `.jpg`)
   - Pfad: `assets/images/background/background.png`

3. **Optional:** Lade weitere Layer-Bilder hoch für Parallax-Effekt

4. **Das Spiel lädt automatisch:**
   - Fallback: Gradient-Hintergrund (wenn kein Bild vorhanden)
   - Wenn Bild vorhanden: Wird automatisch verwendet

---

## 🎨 DESIGN-TIPPS

- **Kontrast:** Stelle sicher, dass die Snake (grün) gut sichtbar ist
- **Dunkelheit:** Hintergrund sollte dunkel sein (#0F0F0F bis #2E7D32)
- **Fokus:** Nicht zu ablenkend, Gameplay steht im Vordergrund
- **Performance:** PNG mit Kompression oder optimiertes JPG
- **Größe:** Max. 2-3 MB für gute Performance

---

## 🚀 NACH DEM HOCHLADEN

Das Spiel erkennt automatisch das Bild und verwendet es als Hintergrund!

**Falls kein Bild hochgeladen:**
- Fallback: Schöner Gradient-Hintergrund
- Grid-Pattern für subtile Struktur
- Funktioniert perfekt ohne Assets

---

**Bereit zum Hochladen!** 🎮

