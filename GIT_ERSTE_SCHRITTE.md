# 🚀 GIT ERSTE SCHRITTE - Code zu GitHub pushen

## ✅ GIT IST INSTALLIERT!

Jetzt musst du nur noch ein paar Schritte machen:

---

## 📋 SCHRITT 1: GIT KONFIGURIEREN (Einmalig)

### 1.1 Git konfigurieren
Öffne PowerShell und führe aus:

```powershell
git config --global user.name "iTeLLiiX"
git config --global user.email "deine-email@example.com"
```

**WICHTIG:** Ersetze `deine-email@example.com` mit deiner GitHub-Email!

---

## 📤 SCHRITT 2: CODE ZU GITHUB PUSHEN

### 2.1 Zum Projekt-Ordner navigieren
```powershell
cd C:\Users\nicom\Desktop\lucasnake
```

### 2.2 Git Repository initialisieren
```powershell
git init
```

### 2.3 Alle Dateien hinzufügen
```powershell
git add .
```

### 2.4 Ersten Commit erstellen
```powershell
git commit -m "Initial commit - Luca's Snake Adventure"
```

### 2.5 Branch umbenennen (zu "main")
```powershell
git branch -M main
```

### 2.6 GitHub Repository verbinden
```powershell
git remote add origin https://github.com/iTeLLiiX/Snake.git
```

### 2.7 Code hochladen
```powershell
git push -u origin main
```

---

## 🔑 SCHRITT 3: AUTHENTIFIZIERUNG

### Falls nach Username/Password gefragt:

**Username:** `iTeLLiiX`

**Password:** Personal Access Token (NICHT dein GitHub-Passwort!)

### Personal Access Token erstellen:

1. Gehe zu: https://github.com/settings/tokens
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Lucasnake Deployment"
4. **Expiration:** 90 days (oder länger)
5. **Scopes:** Hake **"repo"** an (alle repo-Berechtigungen)
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN!** (wird nur einmal angezeigt)
8. Verwende diesen Token als **Passwort** bei `git push`

---

## ✅ SCHRITT 4: VERIFIZIEREN

1. Gehe zu: https://github.com/iTeLLiiX/Snake
2. Du solltest jetzt alle deine Dateien sehen!
3. ✅ **FERTIG!**

---

## 🐛 BEI PROBLEMEN

### Problem: "git: command not found"
**Lösung:** 
- PowerShell **NEU STARTEN** (nach Git-Installation)
- Oder Git Bash verwenden

### Problem: "Authentication failed"
**Lösung:**
- Verwende Personal Access Token statt Passwort
- Prüfe ob Token "repo" Berechtigung hat

### Problem: "Repository not found"
**Lösung:**
- Prüfe ob du Zugriff auf das Repository hast
- Prüfe ob die URL stimmt: `https://github.com/iTeLLiiX/Snake.git`

### Problem: "Permission denied"
**Lösung:**
- Stelle sicher, dass du Owner des Repositories bist
- Prüfe GitHub-Berechtigungen

---

## 🎯 SCHNELL-BEFEHLE (Copy & Paste)

Führe diese Befehle **nacheinander** in PowerShell aus:

```powershell
# 1. Git konfigurieren (einmalig)
git config --global user.name "iTeLLiiX"
git config --global user.email "DEINE-EMAIL@example.com"

# 2. Zum Projekt-Ordner
cd C:\Users\nicom\Desktop\lucasnake

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
- Password: Personal Access Token

---

## ✅ FERTIG!

Nach erfolgreichem Push:
1. ✅ Code ist auf GitHub
2. ✅ Kannst Vercel verbinden
3. ✅ Spiel ist deploybar!

**Viel Erfolg!** 🚀

