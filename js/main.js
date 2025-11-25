/**
 * Main Entry Point
 * Initialisiert das Spiel
 */

// Globale Variablen (für einfachen Zugriff)
let game;
let ui;
let controls;
let soundManager;

// Initialisierung wenn DOM geladen
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Animation System initialisieren (muss zuerst geladen werden)
    animationSystem = new AnimationSystem();
    window.animationSystem = animationSystem; // Global verfügbar
    
    // Sound Manager initialisieren
    soundManager = new SoundManager();
    await soundManager.loadSounds();
    window.soundManager = soundManager; // Global verfügbar
    
    // Statistics initialisieren
    statistics = new Statistics();
    window.statistics = statistics; // Global verfügbar
    
    // Achievement System initialisieren
    achievementSystem = new AchievementSystem();
    await achievementSystem.init();
    window.achievementSystem = achievementSystem; // Global verfügbar
    
    // Button Assets Manager initialisieren
    buttonAssetManager = new ButtonAssetManager();
    await buttonAssetManager.loadAssets();
    window.buttonAssetManager = buttonAssetManager; // Global verfügbar
    
    // UI Assets Manager initialisieren
    uiAssetsManager = new UIAssetsManager();
    await uiAssetsManager.init();
    window.uiAssetsManager = uiAssetsManager; // Global verfügbar
    
    // Button Integration initialisieren
    buttonIntegration = new ButtonIntegration();
    await buttonIntegration.integrateButtons();
    window.buttonIntegration = buttonIntegration; // Global verfügbar
    
    // UI Manager initialisieren (lädt Number-Sprites)
    ui = new UIManager();
    window.ui = ui; // Global verfügbar
    // Warte auf Number-Sprites Laden
    await ui.initNumberDisplay();
    
    // Button-Integration nach UI-Initialisierung
    if (buttonIntegration) {
      await buttonIntegration.integrateButtons();
    }
    
    // Game initialisieren
    game = new Game();
    window.game = game; // Global verfügbar
    
    // Game vollständig initialisieren (Assets laden, etc.)
    await game.initialize();
    
    // Controls initialisieren (nach Game, da Game Canvas braucht)
    controls = new Controls(game);
    window.controls = controls; // Global verfügbar
    
    // Audio nach User-Interaktion aktivieren
    const enableAudio = () => {
      soundManager.enableAudio();
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    
    // Start Screen anzeigen
    ui.showScreen('start');
    
    // Service Worker registrieren (für PWA)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registriert:', registration.scope);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 Neues Update verfügbar! Seite neu laden für Update.');
                  // Optional: Zeige Update-Benachrichtigung
                }
              });
            });
          })
          .catch((error) => {
            console.warn('⚠️ Service Worker Registrierung fehlgeschlagen:', error);
          });
      });
    }
    
    console.log('✅ Luca\'s Snake Adventure geladen!');
    
  } catch (error) {
    console.error('❌ Fehler beim Initialisieren:', error);
    alert('Fehler beim Laden des Spiels. Bitte Seite neu laden.');
  }
});

