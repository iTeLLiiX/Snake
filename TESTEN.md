# 🧪 SPIEL TESTEN - Einfache Anleitung

## ✅ Option 1: Direkt im Browser öffnen (EINFACHSTE)

1. Öffne den Windows Explorer
2. Navigiere zu: `C:\Users\nicom\Desktop\lucasnake`
3. Doppelklick auf `index.html`
4. Das Spiel öffnet sich im Browser!

**Hinweis:** Manche Browser blockieren lokale Dateien. Falls Probleme:
- Verwende Chrome oder Edge
- Oder nutze Option 2 (Python Server)

---

## ✅ Option 2: Python Server (Falls Python installiert)

Öffne PowerShell/Terminal im Projekt-Ordner und führe aus:

```powershell
cd c:\Users\nicom\Desktop\lucasnake
python -m http.server 8000
```

Dann öffne im Browser: **http://localhost:8000**

---

## ✅ Option 3: Live Server (VS Code Extension)

Falls du VS Code verwendest:
1. Installiere Extension "Live Server"
2. Rechtsklick auf `index.html`
3. "Open with Live Server"

---

## 🎮 Was testen?

### Grundfunktionen
- ✅ Spiel startet (Play-Button)
- ✅ Snake bewegt sich (Pfeiltasten oder Touch)
- ✅ Food wird gefressen
- ✅ Score erhöht sich

### Neue Features
- ✅ **Power-Ups als Items** - Spawnen auf Spielfeld (10% Chance)
- ✅ **Combo-System** - Schnelles Fressen = Combos!
- ✅ **Visual Effects** - Partikel, Trails, Glow

### Sounds
- ✅ Sounds beim Fressen
- ✅ Hintergrundmusik

---

## 🐛 Falls Fehler auftreten

1. **Browser-Konsole öffnen** (F12)
2. **Fehler kopieren** (rot)
3. **Mir mitteilen**

---

**Viel Erfolg beim Testen!** 🚀

