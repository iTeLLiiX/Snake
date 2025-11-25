# 🚀 GIT BASH VERWENDEN - Einfachste Lösung!

## ✅ PROBLEM: PowerShell erkennt Git nicht

**Lösung:** Verwende **Git Bash** statt PowerShell!

---

## 📋 SCHRITT 1: GIT BASH ÖFFNEN

### Methode 1: Über den Ordner (Einfachste!)

1. **Gehe zu:** `C:\Users\nicom\Desktop\lucasnake`
2. **Rechtsklick** im Ordner (auf leeren Bereich)
3. Wähle **"Git Bash Here"**
4. Git Bash öffnet sich automatisch!

### Methode 2: Über Startmenü

1. Drücke **Windows-Taste**
2. Suche nach **"Git Bash"**
3. Öffne **"Git Bash"**
4. Navigiere zum Ordner:
   ```bash
   cd /c/Users/nicom/Desktop/lucasnake
   ```

---

## 🔧 SCHRITT 2: GIT KONFIGURIEREN

Führe diese Befehle in **Git Bash** aus:

```bash
git config --global user.name "iTeLLiiX"
git config --global user.email "deine-email@example.com"
```

**WICHTIG:** Ersetze `deine-email@example.com` mit deiner echten Email!

---

## 📤 SCHRITT 3: CODE ZU GITHUB PUSHEN

Führe diese Befehle **nacheinander** in Git Bash aus:

```bash
# 1. Git initialisieren
git init

# 2. Alle Dateien hinzufügen
git add .

# 3. Commit erstellen
git commit -m "Initial commit - Luca's Snake Adventure"

# 4. Branch umbenennen
git branch -M main

# 5. Repository verbinden
git remote add origin https://github.com/iTeLLiiX/Snake.git

# 6. Code hochladen
git push -u origin main
```

---

## 🔑 SCHRITT 4: AUTHENTIFIZIERUNG

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

## ✅ SCHRITT 5: VERIFIZIEREN

1. Gehe zu: **https://github.com/iTeLLiiX/Snake**
2. Du solltest jetzt alle deine Dateien sehen!
3. ✅ **FERTIG!**

---

## 🎯 ALLE BEFEHLE AUF EINMAL (Copy & Paste)

Führe diese Befehle **nacheinander** in Git Bash aus:

```bash
# 1. Git konfigurieren (einmalig - ERsetze Email!)
git config --global user.name "iTeLLiiX"
git config --global user.email "DEINE-EMAIL@example.com"

# 2. Git initialisieren
git init

# 3. Dateien hinzufügen
git add .

# 4. Commit erstellen
git commit -m "Initial commit - Luca's Snake Adventure"

# 5. Branch umbenennen
git branch -M main

# 6. Repository verbinden
git remote add origin https://github.com/iTeLLiiX/Snake.git

# 7. Code hochladen
git push -u origin main
```

**Falls nach Passwort gefragt:**
- Username: `iTeLLiiX`
- Password: Personal Access Token (siehe oben)

---

## 💡 UNTERSCHIED: PowerShell vs Git Bash

### PowerShell:
- ❌ Erkennt Git manchmal nicht (PATH-Problem)
- ✅ Windows-native

### Git Bash:
- ✅ Funktioniert immer nach Git-Installation
- ✅ Keine PATH-Probleme
- ✅ Gleiche Befehle
- ✅ **EMPFOHLEN!**

---

## 🐛 BEI PROBLEMEN

### Problem: "Git Bash Here" fehlt im Kontextmenü
**Lösung:**
- Git neu installieren
- Oder Git Bash über Startmenü öffnen
- Dann manuell zum Ordner navigieren: `cd /c/Users/nicom/Desktop/lucasnake`

### Problem: "Authentication failed"
**Lösung:**
- Verwende Personal Access Token statt Passwort
- Prüfe ob Token "repo" Berechtigung hat

### Problem: "Repository not found"
**Lösung:**
- Prüfe ob du Zugriff auf das Repository hast
- Prüfe ob die URL stimmt: `https://github.com/iTeLLiiX/Snake.git`

---

## ✅ FERTIG!

Nach erfolgreichem Push:
1. ✅ Code ist auf GitHub
2. ✅ Kannst Vercel verbinden
3. ✅ Spiel ist deploybar!

**Viel Erfolg!** 🚀

