# ⚠️ WICHTIG: VERWENDE GIT BASH, NICHT POWERSHELL!

## ❌ PROBLEM: PowerShell erkennt Git nicht

**PowerShell funktioniert NICHT mit Git!**

**LÖSUNG: Verwende Git Bash!**

---

## ✅ SO GEHT'S RICHTIG:

### Schritt 1: Git Bash öffnen

**NICHT PowerShell verwenden!**

1. **Gehe zu:** `C:\Users\nicom\Desktop\lucasnake`
2. **Rechtsklick** im Ordner (auf leeren Bereich, NICHT auf eine Datei!)
3. Wähle **"Git Bash Here"**
4. **Git Bash öffnet sich** (schwarzes Fenster mit grünem Text)

### Schritt 2: Befehle in Git Bash ausführen

**WICHTIG:** Diese Befehle in **Git Bash** ausführen, NICHT in PowerShell!

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

---

## 🔍 WIE ERKENNE ICH GIT BASH?

**Git Bash sieht so aus:**
- Schwarzes Fenster
- Grüner Text
- Prompt endet mit `$` (nicht `>`)
- Zeigt: `user@computer MINGW64 /c/Users/nicom/Desktop/lucasnake $`

**PowerShell sieht so aus:**
- Blaues Fenster
- Weißer Text
- Prompt endet mit `>`
- Zeigt: `PS C:\Users\nicom\Desktop\lucasnake>`

---

## 🎯 ALTERNATIVE: Git Bash über Startmenü

Falls "Git Bash Here" nicht funktioniert:

1. Drücke **Windows-Taste**
2. Suche nach **"Git Bash"**
3. Öffne **"Git Bash"**
4. Navigiere zum Ordner:
   ```bash
   cd /c/Users/nicom/Desktop/lucasnake
   ```
5. Dann die Befehle ausführen

---

## 💡 WARUM GIT BASH?

- ✅ Funktioniert IMMER nach Git-Installation
- ✅ Keine PATH-Probleme
- ✅ Gleiche Befehle
- ✅ Wird automatisch mit Git installiert

---

## ❌ NICHT VERWENDEN:

- ❌ PowerShell (erkennt Git nicht)
- ❌ CMD (erkennt Git nicht)
- ❌ Windows Terminal (kann funktionieren, aber Git Bash ist sicherer)

---

## ✅ VERWENDEN:

- ✅ **Git Bash** (empfohlen!)
- ✅ GitHub Desktop (GUI-Alternative)

---

## 🚀 SCHNELL-ANLEITUNG:

1. **Rechtsklick** in `C:\Users\nicom\Desktop\lucasnake`
2. **"Git Bash Here"** wählen
3. **Befehle ausführen** (siehe oben)
4. **FERTIG!**

---

**VERWENDE GIT BASH, NICHT POWERSHELL!** 🚀

