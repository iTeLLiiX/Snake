# 🚀 Deployment-Anleitung für Vercel

## ✅ Vorbereitung

Das Projekt ist bereits für Vercel vorbereitet:
- ✅ `vercel.json` - Vercel Konfiguration
- ✅ `package.json` - Projekt-Metadaten
- ✅ `.gitignore` - Git-Konfiguration
- ✅ Alle Pfade sind relativ (funktionieren auf Vercel)

## 📦 GitHub Setup

### 1. Repository erstellen

1. Gehe zu [GitHub](https://github.com) und erstelle ein neues Repository
2. Name: `lucasnake` (oder wie du willst)
3. **WICHTIG:** Repository als **Public** oder **Private** erstellen (je nach Wunsch)

### 2. Code hochladen

**Option A: GitHub Desktop / Git GUI**
```bash
# Repository klonen (wenn noch nicht lokal)
git clone https://github.com/dein-username/lucasnake.git

# Dateien hinzufügen
git add .

# Commit
git commit -m "Initial commit: Luca's Snake Adventure"

# Push
git push origin main
```

**Option B: GitHub Web Interface**
1. Gehe zu deinem neuen Repository
2. Klicke auf "uploading an existing file"
3. Ziehe alle Dateien (außer `puplic/` Ordner) in den Browser
4. Commit Message: "Initial commit: Luca's Snake Adventure"
5. Klicke auf "Commit changes"

## 🌐 Vercel Deployment

### Schritt 1: Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "Sign Up"
3. Wähle "Continue with GitHub"
4. Autorisiere Vercel

### Schritt 2: Projekt importieren

1. Klicke auf "Add New..." → "Project"
2. Wähle dein GitHub Repository (`lucasnake`)
3. Vercel erkennt automatisch:
   - ✅ Framework: Other (Static Site)
   - ✅ Build Command: (kein Build nötig)
   - ✅ Output Directory: `.` (Root)

### Schritt 3: Konfiguration prüfen

Vercel sollte automatisch erkennen:
- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** (leer)
- **Output Directory:** `./`

**Falls nicht automatisch erkannt:**
- Framework Preset: **Other**
- Build Command: (leer lassen)
- Output Directory: `.`

### Schritt 4: Deploy!

1. Klicke auf "Deploy"
2. Warte ~30 Sekunden
3. ✅ Fertig! Du bekommst eine URL wie: `https://lucasnake.vercel.app`

## 🔄 Updates deployen

Nach jedem Push zu GitHub:
1. Vercel deployt automatisch (wenn Auto-Deploy aktiviert)
2. Oder manuell: Vercel Dashboard → Deployments → Redeploy

## 📝 Wichtige Hinweise

### Asset-Pfade
Alle Pfade sind relativ und funktionieren auf Vercel:
- ✅ `assets/images/...` - Funktioniert
- ✅ `css/style.css` - Funktioniert
- ✅ `js/main.js` - Funktioniert

### Caching
- Assets werden 1 Jahr gecacht (optimale Performance)
- HTML wird 1 Stunde gecacht

### Custom Domain (Optional)
1. Vercel Dashboard → Settings → Domains
2. Füge deine Domain hinzu
3. Folge den DNS-Anweisungen

## 🐛 Troubleshooting

### Problem: Assets werden nicht geladen
**Lösung:** Prüfe Browser-Konsole auf 404-Fehler. Stelle sicher, dass alle Pfade relativ sind (beginnen mit `/` oder ohne `/`).

### Problem: 404 auf Vercel
**Lösung:** Die `vercel.json` sollte korrekt sein. Prüfe ob `index.html` im Root-Verzeichnis ist.

### Problem: Build-Fehler
**Lösung:** Da wir keine Build-Steps haben, sollte es keine Build-Fehler geben. Falls doch, prüfe die Vercel-Logs.

## ✅ Checkliste vor Deployment

- [x] Alle Dateien sind im Repository
- [x] `vercel.json` ist vorhanden
- [x] `package.json` ist vorhanden
- [x] `.gitignore` ist vorhanden
- [x] Alle Asset-Pfade sind relativ
- [x] `index.html` ist im Root-Verzeichnis
- [x] Repository ist auf GitHub

## 🎉 Fertig!

Nach dem Deployment:
- ✅ Spiel ist live auf Vercel
- ✅ Funktioniert auf allen Geräten
- ✅ Mobile-optimiert
- ✅ Automatische Deployments bei Git Push

**Viel Erfolg beim Deployment!** 🚀

