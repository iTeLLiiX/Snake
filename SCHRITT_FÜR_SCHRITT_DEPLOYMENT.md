# 🚀 SCHRITT-FÜR-SCHRITT: VERCEL DEPLOYMENT

## ✅ ALLES IST BEREIT! Jetzt musst du nur noch:

---

## 📋 SCHRITT 1: GITHUB REPOSITORY ERSTELLEN

### 1.1 GitHub Account (falls noch nicht vorhanden)
- Gehe zu [github.com](https://github.com)
- Erstelle einen Account oder logge dich ein

### 1.2 Neues Repository erstellen
1. Klicke auf **"+"** oben rechts → **"New repository"**
2. **Repository name:** `lucasnake` (oder wie du willst)
3. **Description:** "Luca's Snake Adventure - Snake Game"
4. **Public** oder **Private** (deine Wahl)
5. **NICHT** "Add README" oder andere Dateien anhaken!
6. Klicke **"Create repository"**

### 1.3 Repository-URL kopieren
- GitHub zeigt dir eine URL wie: `https://github.com/DEIN-USERNAME/lucasnake.git`
- **KOPIERE DIESE URL!** (brauchst du gleich)

---

## 💻 SCHRITT 2: CODE ZU GITHUB HOCHLADEN

### 2.1 PowerShell/Terminal öffnen
- Drücke `Windows + X`
- Wähle **"Windows PowerShell"** oder **"Terminal"**

### 2.2 Zum Projekt-Ordner navigieren
```powershell
cd C:\Users\nicom\Desktop\lucasnake
```

### 2.3 Git initialisieren (falls noch nicht geschehen)
```powershell
git init
```

### 2.4 Alle Dateien hinzufügen
```powershell
git add .
```

### 2.5 Ersten Commit erstellen
```powershell
git commit -m "Initial commit - Luca's Snake Adventure"
```

### 2.6 Branch umbenennen (zu "main")
```powershell
git branch -M main
```

### 2.7 GitHub Repository verbinden
```powershell
git remote add origin https://github.com/DEIN-USERNAME/lucasnake.git
```
**WICHTIG:** Ersetze `DEIN-USERNAME` mit deinem GitHub-Username!

### 2.8 Code hochladen
```powershell
git push -u origin main
```

**Falls du nach Username/Password gefragt wirst:**
- **Username:** Dein GitHub-Username
- **Password:** Erstelle ein **Personal Access Token** (siehe unten)

---

## 🔑 SCHRITT 2.5: PERSONAL ACCESS TOKEN (Falls nötig)

Falls Git nach Passwort fragt:

1. Gehe zu GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Klicke **"Generate new token"**
3. **Note:** "Lucasnake Deployment"
4. **Expiration:** 90 days (oder wie du willst)
5. **Scopes:** Hake **"repo"** an
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN!** (wird nur einmal angezeigt)
8. Verwende diesen Token als Passwort bei `git push`

---

## 🌐 SCHRITT 3: VERCEL VERBINDEN

### 3.1 Vercel Account erstellen
1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke **"Sign Up"**
3. Wähle **"Continue with GitHub"**
4. Erlaube Vercel Zugriff auf GitHub

### 3.2 Neues Projekt erstellen
1. Im Vercel Dashboard: Klicke **"Add New..."** → **"Project"**
2. Du siehst deine GitHub Repositories
3. **Finde "lucasnake"** (oder wie du es genannt hast)
4. Klicke **"Import"** neben dem Repository

### 3.3 Projekt konfigurieren
**WICHTIG:** Diese Einstellungen müssen so sein:

- **Framework Preset:** `Other` (oder "Other")
- **Root Directory:** `./` (Standard, nicht ändern)
- **Build Command:** (LEER LASSEN - nichts eintragen!)
- **Output Directory:** `./` (Standard, nicht ändern)
- **Install Command:** (LEER LASSEN - nichts eintragen!)

### 3.4 Environment Variables
- **KEINE nötig!** Einfach weiter

### 3.5 Deploy starten
1. Klicke **"Deploy"**
2. Warte 1-2 Minuten
3. **FERTIG!** 🎉

---

## ✅ SCHRITT 4: FERTIG!

### 4.1 Deine Website ist live!
- Vercel zeigt dir eine URL wie: `https://lucasnake-xyz.vercel.app`
- **Klicke darauf** um dein Spiel zu sehen!

### 4.2 Automatische Updates
- Jedes Mal wenn du `git push` machst, wird automatisch neu deployed!
- Keine manuelle Aktion nötig

### 4.3 Custom Domain (Optional)
- In Vercel Dashboard → **Settings** → **Domains**
- Füge deine eigene Domain hinzu (z.B. `lucasnake.de`)

---

## 📱 SCHRITT 5: AUF MOBILE TESTEN

### 5.1 Website öffnen
- Öffne die Vercel-URL auf deinem Handy
- Spiel sollte automatisch funktionieren!

### 5.2 Als App installieren (PWA)
**Android:**
1. Öffne Website in Chrome
2. Tippe auf **Menü** (3 Punkte)
3. **"Zum Startbildschirm hinzufügen"**

**iOS:**
1. Öffne Website in Safari
2. Tippe auf **Share-Button**
3. **"Zum Home-Bildschirm"**

---

## 🐛 BEI PROBLEMEN

### Problem: "Git push" funktioniert nicht
**Lösung:**
- Prüfe ob du eingeloggt bist: `git config --global user.name "DEIN-NAME"`
- Prüfe ob Repository-URL stimmt: `git remote -v`
- Verwende Personal Access Token als Passwort

### Problem: Vercel findet Repository nicht
**Lösung:**
- Prüfe ob Repository auf GitHub sichtbar ist
- Prüfe ob Vercel Zugriff auf GitHub hat
- Versuche Repository neu zu importieren

### Problem: Website lädt nicht
**Lösung:**
- Prüfe Vercel-Logs (im Dashboard)
- Prüfe Browser-Konsole (F12)
- Stelle sicher, dass alle Dateien im Repository sind

### Problem: Service Worker funktioniert nicht
**Lösung:**
- Prüfe ob `sw.js` im Root-Ordner ist
- Prüfe Browser-Konsole (F12)
- Stelle sicher, dass HTTPS aktiv ist (Vercel macht das automatisch)

---

## 📋 CHECKLISTE

Vor dem Deployment:
- [ ] GitHub Repository erstellt
- [ ] Code zu GitHub gepusht
- [ ] Vercel Account erstellt
- [ ] Vercel mit GitHub verbunden
- [ ] Projekt in Vercel importiert
- [ ] Deploy gestartet
- [ ] Website getestet
- [ ] Mobile getestet

---

## 🎯 ZUSAMMENFASSUNG

**Was du machen musst:**

1. ✅ **GitHub:** Repository erstellen + Code hochladen
2. ✅ **Vercel:** Account erstellen + Repository verbinden
3. ✅ **Deploy:** Klicke "Deploy" → Fertig!

**Das war's!** 🚀

---

## 💡 TIPPS

- **Automatische Deployments:** Jeder `git push` deployt automatisch
- **Preview Deployments:** Jeder Branch bekommt eine eigene URL
- **Rollback:** Alte Versionen können wiederhergestellt werden
- **Analytics:** Vercel zeigt dir Statistiken (optional)

---

**Viel Erfolg! Bei Fragen einfach fragen!** 🎮✨

