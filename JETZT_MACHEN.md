# 🚀 WAS JETZT? - Nach Git-Installation

## ✅ GIT IST INSTALLIERT!

Jetzt musst du nur noch diese **7 Schritte** machen:

---

## 📋 SCHRITT-FÜR-SCHRITT ANLEITUNG

### ⚠️ WICHTIG: PowerShell NEU STARTEN!

1. **Schließe alle PowerShell-Fenster**
2. **Öffne PowerShell NEU**
3. **Navigiere zum Projekt:**
   ```powershell
   cd C:\Users\nicom\Desktop\lucasnake
   ```

---

## 🔧 SCHRITT 1: GIT KONFIGURIEREN (Einmalig)

Führe diese Befehle aus (ersetze die Email!):

```powershell
git config --global user.name "iTeLLiiX"
git config --global user.email "deine-email@example.com"
```

**WICHTIG:** Ersetze `deine-email@example.com` mit deiner echten Email-Adresse!

---

## 📤 SCHRITT 2: CODE ZU GITHUB PUSHEN

Führe diese Befehle **nacheinander** aus:

### 2.1 Git Repository initialisieren
```powershell
git init
```

### 2.2 Alle Dateien hinzufügen
```powershell
git add .
```

### 2.3 Ersten Commit erstellen
```powershell
git commit -m "Initial commit - Luca's Snake Adventure"
```

### 2.4 Branch umbenennen (zu "main")
```powershell
git branch -M main
```

### 2.5 GitHub Repository verbinden
```powershell
git remote add origin https://github.com/iTeLLiiX/Snake.git
```

### 2.6 Code hochladen
```powershell
git push -u origin main
```

---

## 🔑 SCHRITT 3: AUTHENTIFIZIERUNG

### Falls nach Username/Password gefragt:

**Username:** `iTeLLiiX`

**Password:** Personal Access Token (NICHT dein GitHub-Passwort!)

### Personal Access Token erstellen:

1. Gehe zu: **https://github.com/settings/tokens**
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Lucasnake Deployment"
4. **Expiration:** 90 days (oder länger)
5. **Scopes:** Hake **"repo"** an (alle repo-Berechtigungen)
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN!** (wird nur einmal angezeigt)
8. Verwende diesen Token als **Passwort** bei `git push`

---

## ✅ SCHRITT 4: VERIFIZIEREN

1. Gehe zu: **https://github.com/iTeLLiiX/Snake**
2. Du solltest jetzt alle deine Dateien sehen!
3. ✅ **FERTIG!**

---

## 🎯 ALLE BEFEHLE AUF EINMAL (Copy & Paste)

Führe diese Befehle **nacheinander** in PowerShell aus:

```powershell
# 1. Zum Projekt-Ordner
cd C:\Users\nicom\Desktop\lucasnake

# 2. Git konfigurieren (einmalig - ERsetze Email!)
git config --global user.name "iTeLLiiX"
git config --global user.email "DEINE-EMAIL@example.com"

# 3. Git initialisieren
git init

# 4. Dateien hinzufügen
git add .

# 5. Commit erstellen
git commit -m "Initial commit - Luca's Snake Adventure"

# 6. Branch umbenennen
git branch -M main

# 7. Repository verbinden
git remote add origin https://github.com/iTeLLiiX/Snake.git

# 8. Code hochladen
git push -u origin main
```

**Falls nach Passwort gefragt:**
- Username: `iTeLLiiX`
- Password: Personal Access Token (siehe oben)

---

## 🐛 BEI PROBLEMEN

### Problem: "git: command not found"
**Lösung:** 
- PowerShell **NEU STARTEN** (nach Git-Installation)
- Oder Git Bash verwenden (Rechtsklick → "Git Bash Here")

### Problem: "Authentication failed"
**Lösung:**
- Verwende Personal Access Token statt Passwort
- Prüfe ob Token "repo" Berechtigung hat

### Problem: "Repository not found"
**Lösung:**
- Prüfe ob du Zugriff auf das Repository hast
- Prüfe ob die URL stimmt: `https://github.com/iTeLLiiX/Snake.git`

---

## 🌐 NACH DEM PUSH: VERCEL VERBINDEN

1. Gehe zu: **https://vercel.com**
2. **Sign Up** / **Login** (mit GitHub)
3. **Add New Project**
4. Wähle: **iTeLLiiX/Snake**
5. Klicke **"Import"**
6. **Framework Preset:** `Other`
7. **Build Command:** (LEER lassen)
8. **Output Directory:** `./`
9. Klicke **"Deploy"**
10. **FERTIG!** 🚀

---

## 📋 CHECKLISTE

- [ ] PowerShell NEU gestartet
- [ ] Git konfiguriert (Name + Email)
- [ ] `git init` ausgeführt
- [ ] `git add .` ausgeführt
- [ ] `git commit` ausgeführt
- [ ] `git branch -M main` ausgeführt
- [ ] `git remote add origin` ausgeführt
- [ ] `git push` ausgeführt
- [ ] Code auf GitHub sichtbar
- [ ] Vercel verbunden

---

## ✅ FERTIG!

Nach erfolgreichem Push:
1. ✅ Code ist auf GitHub
2. ✅ Kannst Vercel verbinden
3. ✅ Spiel ist deploybar!

**Viel Erfolg!** 🚀

