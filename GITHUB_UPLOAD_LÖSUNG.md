# 🚀 Lösung: GitHub Upload-Problem (>100 Dateien)

## ❌ Problem
GitHub erlaubt max. 100 Dateien pro Upload über das Web-Interface.

## ✅ LÖSUNG 1: Git CLI verwenden (BESTE LÖSUNG)

### Schritt 1: Git installieren (falls noch nicht)
- Download: https://git-scm.com/download/win
- Installieren und Terminal öffnen

### Schritt 2: Repository klonen
```bash
cd Desktop
git clone https://github.com/DEIN-USERNAME/lucasnake.git
cd lucasnake
```

### Schritt 3: Dateien kopieren
```bash
# Kopiere alle Dateien (außer puplic Ordner)
# Oder kopiere manuell per Windows Explorer:
# - index.html
# - css/
# - js/
# - assets/
# - Alle anderen Dateien
```

### Schritt 4: Alles committen
```bash
git add .
git commit -m "Initial commit: Luca's Snake Adventure"
git push origin main
```

✅ **Fertig!** Alle Dateien sind jetzt auf GitHub!

---

## ✅ LÖSUNG 2: Nur benötigte Assets (Schnell)

### Verwende das Script:
1. **Doppelklick auf:** `prepare-assets.bat`
2. Warte 2 Sekunden
3. Ein `assets-upload` Ordner wird erstellt (nur 7 Dateien!)
4. Ziehe diesen Ordner zu GitHub
5. ✅ Fertig!

**Vorteil:** Nur 7 Dateien, kein Problem mit 100er-Limit!

---

## ✅ LÖSUNG 3: Assets in Batches hochladen

### Batch 1: Snake (2 Dateien)
- `assets/images/snake/snake_green_head.png`
- `assets/images/snake/snake_green_blob.png`

### Batch 2: Food (3 Dateien)
- `assets/images/food/apple_green.png`
- `assets/images/food/Marijuana.png`
- `assets/images/food/bomb.png`

### Batch 3: Logo & UI (2 Dateien)
- `assets/images/logo/weedgame.png`
- `assets/images/ui/messages/Msg01.png`

**Jeweils einzeln hochladen!**

---

## 🎯 MEINE EMPFEHLUNG

**Option 1 (Git CLI):** Wenn du Git installiert hast
- ✅ Einfachste Lösung
- ✅ Alle Assets auf einmal
- ✅ Professionell

**Option 2 (Script):** Wenn du Git nicht verwenden willst
- ✅ Nur 7 Dateien
- ✅ Kein Limit-Problem
- ✅ Spiel funktioniert sofort

---

## 📝 Quick Start mit Git CLI

```bash
# 1. Terminal öffnen (PowerShell oder CMD)
cd C:\Users\nicom\Desktop\lucasnake

# 2. Git initialisieren (falls noch nicht)
git init

# 3. Alles hinzufügen
git add .

# 4. Commit
git commit -m "Initial commit: Luca's Snake Adventure"

# 5. Remote hinzufügen (ersetze DEIN-USERNAME)
git remote add origin https://github.com/DEIN-USERNAME/lucasnake.git

# 6. Hochladen
git push -u origin main
```

✅ **Fertig!** Alle Dateien sind auf GitHub!

---

## 💡 Tipp

**Falls Git zu kompliziert ist:**
- Verwende einfach das Script (`prepare-assets.bat`)
- Nur 7 Dateien hochladen
- Spiel funktioniert trotzdem perfekt!

