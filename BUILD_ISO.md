# 🎮 ISO/EXE ERSTELLUNG - Anleitung

## 📦 Was wird erstellt?

- **Portable EXE** - Läuft ohne Installation
- **Setup EXE** - Installer für Windows
- **ISO** - Kann gebrannt/verteilt werden

## 🚀 SCHRITT 1: Dependencies installieren

```bash
npm install
```

Dies installiert:
- Electron (für Desktop-App)
- Electron-Builder (für Build/ISO)

## 🚀 SCHRITT 2: Build erstellen

### Option A: Portable EXE (Empfohlen)
```bash
npm run build:iso
```

Erstellt: `dist/LucasSnakeAdventure-1.0.0-Portable.exe`

### Option B: Setup Installer
```bash
npm run build:electron
```

Erstellt: 
- `dist/LucasSnakeAdventure-1.0.0-Setup.exe` (Installer)
- `dist/LucasSnakeAdventure-1.0.0-Portable.exe` (Portable)

## 📦 SCHRITT 3: ISO erstellen (Optional)

### Mit ImgBurn oder ähnlichem Tool:

1. **ImgBurn öffnen**
2. **"Create image file from files/folders"**
3. **Ordner auswählen:** `dist/`
4. **ISO speichern als:** `LucasSnakeAdventure.iso`
5. **Brennen oder verteilen**

### Oder mit PowerShell:

```powershell
# Erstelle ISO aus dist Ordner
New-IsoFile -Source "dist" -Destination "LucasSnakeAdventure.iso"
```

## ✅ FERTIG!

Du hast jetzt:
- ✅ Portable EXE (läuft überall)
- ✅ Setup Installer (für Installation)
- ✅ ISO (für Distribution)

## 📝 HINWEISE

- **Portable EXE:** Kann direkt ausgeführt werden, keine Installation nötig
- **Setup EXE:** Installiert das Spiel wie normale Software
- **ISO:** Kann auf CD/DVD gebrannt oder als Image verteilt werden

## 🎯 DISTRIBUTION

### Für Freunde/Familie:
- **Portable EXE** - Einfach per USB/Download teilen

### Für professionelle Distribution:
- **Setup EXE** - Professioneller Installer
- **ISO** - Für physische Medien

---

**Viel Erfolg!** 🚀

