# 🚀 CODE ZU GITHUB PUSHEN - https://github.com/iTeLLiiX/Snake

## ✅ DEIN REPOSITORY IST BEREIT!

Dein Repository: **https://github.com/iTeLLiiX/Snake**

---

## 📋 SCHRITT 1: GIT INSTALLIEREN (Falls noch nicht installiert)

### Option A: Git für Windows installieren
1. Gehe zu: https://git-scm.com/download/win
2. Lade **Git for Windows** herunter
3. Installiere es (Standard-Einstellungen sind OK)
4. **WICHTIG:** Wähle "Git from the command line and also from 3rd-party software"
5. Starte PowerShell/Terminal **NEU** nach Installation

### Option B: GitHub Desktop (Einfacher, mit GUI)
1. Gehe zu: https://desktop.github.com/
2. Installiere **GitHub Desktop**
3. Logge dich mit deinem GitHub-Account ein
4. Öffne das Repository direkt in GitHub Desktop

---

## 💻 SCHRITT 2: CODE ZU GITHUB PUSHEN

### Option A: Via PowerShell/Terminal (Git CLI)

#### 2.1 Zum Projekt-Ordner navigieren
```powershell
cd C:\Users\nicom\Desktop\lucasnake
```

#### 2.2 Git initialisieren (falls noch nicht geschehen)
```powershell
git init
```

#### 2.3 Alle Dateien hinzufügen
```powershell
git add .
```

#### 2.4 Ersten Commit erstellen
```powershell
git commit -m "Initial commit - Luca's Snake Adventure"
```

#### 2.5 Branch umbenennen
```powershell
git branch -M main
```

#### 2.6 GitHub Repository verbinden
```powershell
git remote add origin https://github.com/iTeLLiiX/Snake.git
```

#### 2.7 Code hochladen
```powershell
git push -u origin main
```

**Falls nach Username/Password gefragt:**
- **Username:** `iTeLLiiX`
- **Password:** Personal Access Token (siehe unten)

---

### Option B: Via GitHub Desktop (Einfacher!)

1. **GitHub Desktop öffnen**
2. **File** → **Add Local Repository**
3. Wähle: `C:\Users\nicom\Desktop\lucasnake`
4. Klicke **"Publish repository"**
5. Repository-Name: `Snake` (oder lass es so)
6. **Account:** `iTeLLiiX`
7. Klicke **"Publish Repository"**
8. **FERTIG!** 🎉

---

## 🔑 PERSONAL ACCESS TOKEN ERSTELLEN

Falls Git nach Passwort fragt (GitHub erlaubt kein Passwort mehr):

1. Gehe zu: https://github.com/settings/tokens
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Lucasnake Deployment"
4. **Expiration:** 90 days (oder länger)
5. **Scopes:** Hake **"repo"** an (alle repo-Berechtigungen)
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN!** (wird nur einmal angezeigt)
8. Verwende diesen Token als **Passwort** bei `git push`

---

## ✅ SCHRITT 3: VERIFIZIEREN

1. Gehe zu: https://github.com/iTeLLiiX/Snake
2. Du solltest jetzt alle deine Dateien sehen!
3. ✅ **FERTIG!**

---

## 🌐 SCHRITT 4: VERCEL VERBINDEN

Jetzt kannst du Vercel mit diesem Repository verbinden:

1. Gehe zu: https://vercel.com
2. **Sign Up** / **Login** (mit GitHub)
3. **Add New Project**
4. Wähle: **iTeLLiiX/Snake**
5. Klicke **"Import"**
6. **Framework Preset:** `Other`
7. **Build Command:** (LEER)
8. **Output Directory:** `./`
9. Klicke **"Deploy"**
10. **FERTIG!** 🚀

---

## 🐛 BEI PROBLEMEN

### Problem: "git: command not found"
**Lösung:** Git ist nicht installiert → Installiere Git (siehe Schritt 1)

### Problem: "Repository not found"
**Lösung:** 
- Prüfe ob du Zugriff auf das Repository hast
- Prüfe ob die URL stimmt: `https://github.com/iTeLLiiX/Snake.git`

### Problem: "Authentication failed"
**Lösung:**
- Verwende Personal Access Token statt Passwort
- Prüfe ob Token "repo" Berechtigung hat

### Problem: "Permission denied"
**Lösung:**
- Stelle sicher, dass du Owner/Collaborator des Repositories bist
- Prüfe GitHub-Berechtigungen

---

## 📋 ALTERNATIVE: GITHUB WEB INTERFACE

Falls Git nicht funktioniert, kannst du auch über GitHub Web Interface hochladen:

1. Gehe zu: https://github.com/iTeLLiiX/Snake
2. Klicke **"uploading an existing file"**
3. Ziehe alle Dateien aus `C:\Users\nicom\Desktop\lucasnake` rein
4. **Commit message:** "Initial commit"
5. Klicke **"Commit changes"**

**ACHTUNG:** Bei vielen Dateien kann das lange dauern!

---

## 🎯 ZUSAMMENFASSUNG

**Schnellste Methode:**
1. ✅ Installiere **GitHub Desktop**
2. ✅ Öffne Repository in GitHub Desktop
3. ✅ Klicke **"Publish repository"**
4. ✅ Fertig!

**Oder:**
1. ✅ Installiere **Git for Windows**
2. ✅ Führe die PowerShell-Befehle aus
3. ✅ Fertig!

---

**Viel Erfolg!** 🚀

