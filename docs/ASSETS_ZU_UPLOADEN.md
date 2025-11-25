# 📦 Assets die du hochladen musst

## ✅ MINIMAL BENÖTIGTE ASSETS (Aktuell verwendet)

Diese Assets werden **aktuell im Code verwendet** und müssen hochgeladen werden:

### 🐍 Snake (2 Dateien)
```
assets/images/snake/
├── snake_green_head.png      ✅ WIRD VERWENDET
└── snake_green_blob.png      ✅ WIRD VERWENDET
```

### 🍎 Food (3 Dateien)
```
assets/images/food/
├── apple_green.png           ✅ WIRD VERWENDET
├── Marijuana.png             ✅ WIRD VERWENDET
└── bomb.png                  ✅ WIRD VERWENDET
```

### 🎯 Logo (1 Datei)
```
assets/images/logo/
└── weedgame.png              ✅ WIRD VERWENDET
```

### 💬 UI Messages (1 Datei)
```
assets/images/ui/messages/
└── Msg01.png                 ✅ WIRD VERWENDET (Game Over)
```

**GESAMT MINIMAL: 7 Dateien** ✅

---

## 📋 OPTIONALE ASSETS (Für zukünftige Features)

Diese Assets sind **vorhanden aber noch nicht verwendet**. Du kannst sie später hochladen:

### 🎨 UI Buttons (für bessere Buttons)
```
assets/images/ui/buttons/
├── Button01.png bis Button25.png  (25 Dateien)
└── Btn01.png bis Btn10.png        (10 Dateien)
```

### 🔢 Numbers (für Score-Anzeige mit Sprites)
```
assets/images/ui/numbers/
└── Number01.png bis Number45.png   (45 Dateien)
```

### 🎯 Icons (für D-Pad, Power-Ups, etc.)
```
assets/images/ui/icons/
└── Icon01.png bis Icon105.png     (105 Dateien)
```

### 📊 Progress Bars (für Level-Progress)
```
assets/images/ui/progress/
└── Progress01.png bis Progress05.png (5 Dateien)
```

### 🎚️ Sliders (für Settings)
```
assets/images/ui/sliders/
└── Slider01.png bis Slider05.png  (5 Dateien)
```

---

## 🎯 EMPFOHLENE UPLOAD-STRATEGIE

### Option 1: Minimal (Schnell) ⚡
**Nur die 7 benötigten Dateien hochladen:**
- Spiel funktioniert sofort
- Schneller Upload
- Weniger Traffic

### Option 2: Vollständig (Empfohlen) 🚀
**Alle Assets hochladen:**
- Bereit für zukünftige Features
- Buttons sehen besser aus
- Score-Anzeige mit Sprites möglich
- Mehr Flexibilität

---

## 📂 GENAUER UPLOAD-PFAD

### Für GitHub/Vercel:

1. **Erstelle diese Ordnerstruktur:**
```
lucasnake/
└── assets/
    └── images/
        ├── snake/
        ├── food/
        ├── logo/
        └── ui/
            └── messages/
```

2. **Lade diese Dateien hoch:**

**MINIMAL (7 Dateien):**
```
assets/images/snake/snake_green_head.png
assets/images/snake/snake_green_blob.png
assets/images/food/apple_green.png
assets/images/food/Marijuana.png
assets/images/food/bomb.png
assets/images/logo/weedgame.png
assets/images/ui/messages/Msg01.png
```

**VOLLSTÄNDIG (alle Assets):**
- Lade einfach den kompletten `assets/` Ordner hoch
- Alle Unterordner bleiben erhalten

---

## 🔍 WELCHE GRÖSSE-VARIANTEN?

**WICHTIG:** Verwende die **Original-Größen** (ohne `_32` oder `_64`):
- ✅ `snake_green_head.png` (Original)
- ❌ NICHT: `snake_green_head_32.png`
- ❌ NICHT: `snake_green_head_64.png`

**Warum?** Der Code skaliert die Bilder automatisch basierend auf der Canvas-Größe.

---

## ✅ CHECKLISTE

### Minimal Upload:
- [ ] `assets/images/snake/snake_green_head.png`
- [ ] `assets/images/snake/snake_green_blob.png`
- [ ] `assets/images/food/apple_green.png`
- [ ] `assets/images/food/Marijuana.png`
- [ ] `assets/images/food/bomb.png`
- [ ] `assets/images/logo/weedgame.png`
- [ ] `assets/images/ui/messages/Msg01.png`

### Vollständig Upload:
- [ ] Kompletter `assets/` Ordner (alle Unterordner)

---

## 🚀 QUICK START

**Schnellste Methode:**
1. Kopiere den kompletten `assets/` Ordner
2. Lade ihn in dein GitHub Repository hoch
3. Fertig! ✅

**Oder nur minimal:**
1. Erstelle die Ordnerstruktur
2. Lade nur die 7 Dateien hoch
3. Spiel funktioniert! ✅

---

**Tipp:** Für den Start reichen die 7 minimalen Dateien. Du kannst später immer noch mehr Assets hinzufügen!

