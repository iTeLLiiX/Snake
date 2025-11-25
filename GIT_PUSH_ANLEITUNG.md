# 🚀 Git Push Anleitung

## ⚠️ WICHTIG: Git Bash verwenden!

PowerShell erkennt Git nicht. Du musst **Git Bash** verwenden!

---

## 📋 Schritt-für-Schritt Anleitung

### 1. Git Bash öffnen
- Rechtsklick im Projektordner → **"Git Bash Here"**
- ODER: Git Bash öffnen und `cd` zum Projektordner:
  ```bash
  cd /c/Users/nicom/Desktop/lucasnake
  ```

### 2. Git Status prüfen
```bash
git status
```

### 3. Alle Dateien hinzufügen
```bash
git add .
```

### 4. Commit erstellen
```bash
git commit -m "Rockstar Games Level Design + Moderne Design-Trends implementiert"
```

### 5. Auf GitHub pushen
```bash
git push origin main
```

Falls der Branch anders heißt (z.B. `master`):
```bash
git push origin master
```

---

## 🔧 Falls Git noch nicht initialisiert ist

### Git initialisieren
```bash
git init
```

### Remote Repository hinzufügen
```bash
git remote add origin https://github.com/iTeLLiiX/Snake.git
```

### Branch erstellen/umbenennen
```bash
git branch -M main
```

### Erster Commit
```bash
git add .
git commit -m "Initial commit - Luca's Snake Adventure"
git push -u origin main
```

---

## 📝 Commit-Nachricht (optional, detaillierter)

```bash
git commit -m "✨ Rockstar Games Level Design + Moderne Design-Trends

- Premium Visual Effects (Bloom, Motion Blur, Screen Flash)
- Micro & Macro Animations
- Expressive Typography (Google Fonts)
- Bento Grid Layout für Settings
- 3D Transforms & Effects
- Experimental Navigation
- Blending Graphics (Mix Blend Modes)
- Negative Space Design
- Modern Color Trends 2024/2025
- Glassmorphism & Neumorphism
- Power-Up Item Bug Fix
- Adaptive Touch Controls
- Premium Sound System"
```

---

## ✅ Nach dem Push

Das Spiel wird automatisch auf Vercel deployed (wenn Vercel mit GitHub verbunden ist)!

---

## 🆘 Bei Problemen

### "Permission denied" oder Authentifizierung
- GitHub Personal Access Token verwenden
- Oder: GitHub Desktop App verwenden (einfacher!)

### "Branch nicht gefunden"
```bash
git branch
# Zeigt alle Branches
git checkout -b main
# Erstellt neuen Branch
```

### "Remote bereits vorhanden"
```bash
git remote remove origin
git remote add origin https://github.com/iTeLLiiX/Snake.git
```

