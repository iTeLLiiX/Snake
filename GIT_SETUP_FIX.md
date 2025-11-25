# 🔧 GIT SETUP - PowerShell erkennt Git nicht

## ⚠️ PROBLEM: Git wird nicht erkannt

Das passiert, wenn:
- Git gerade installiert wurde
- PowerShell noch nicht neu gestartet wurde
- PATH noch nicht aktualisiert wurde

---

## ✅ LÖSUNG 1: PowerShell NEU STARTEN (Einfachste Methode)

1. **Schließe alle PowerShell-Fenster**
2. **Öffne PowerShell NEU**
3. **Teste:** `git --version`
4. Sollte jetzt funktionieren!

---

## ✅ LÖSUNG 2: Git Bash verwenden (Alternative)

Falls PowerShell weiterhin Probleme macht:

1. **Git Bash öffnen:**
   - Suche nach "Git Bash" im Startmenü
   - Oder Rechtsklick im Ordner → "Git Bash Here"

2. **Befehle sind die gleichen:**
   ```bash
   cd /c/Users/nicom/Desktop/lucasnake
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/iTeLLiiX/Snake.git
   git push -u origin main
   ```

---

## ✅ LÖSUNG 3: PATH manuell prüfen

Falls Git installiert ist, aber nicht gefunden wird:

1. **Git-Installationspfad finden:**
   - Normalerweise: `C:\Program Files\Git\cmd\`
   - Oder: `C:\Program Files (x86)\Git\cmd\`

2. **PATH prüfen:**
   ```powershell
   $env:PATH -split ';' | Select-String -Pattern "Git"
   ```

3. **Falls nicht gefunden, manuell hinzufügen:**
   ```powershell
   $env:PATH += ";C:\Program Files\Git\cmd"
   ```

---

## 🎯 EMPFOHLENE METHODE: Git Bash

**Git Bash ist oft einfacher:**
- ✅ Funktioniert immer nach Git-Installation
- ✅ Keine PATH-Probleme
- ✅ Gleiche Befehle

### Git Bash öffnen:
1. Rechtsklick im Ordner `C:\Users\nicom\Desktop\lucasnake`
2. Wähle **"Git Bash Here"**
3. Führe die Befehle aus (siehe unten)

---

## 📋 BEFEHLE FÜR GIT BASH

```bash
# 1. Git konfigurieren (einmalig)
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
- Password: Personal Access Token

---

## 🔑 PERSONAL ACCESS TOKEN ERSTELLEN

Falls nach Passwort gefragt:

1. Gehe zu: https://github.com/settings/tokens
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Lucasnake Deployment"
4. **Expiration:** 90 days
5. **Scopes:** Hake **"repo"** an
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN!**
8. Verwende diesen Token als **Passwort**

---

## ✅ NACH DEM PUSH

1. Gehe zu: https://github.com/iTeLLiiX/Snake
2. Du solltest alle Dateien sehen!
3. ✅ **FERTIG!**

---

## 💡 TIPP

**Git Bash ist oft zuverlässiger als PowerShell für Git!**

Rechtsklick im Ordner → "Git Bash Here" → Befehle ausführen

---

**Viel Erfolg!** 🚀

