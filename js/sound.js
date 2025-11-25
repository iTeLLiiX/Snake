/**
 * Sound System
 * Verwaltet alle Sounds und Musik
 */

class SoundManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.musicVolume = 0.5;
    this.soundVolume = 0.7;
    this.musicEnabled = true;
    this.soundsEnabled = true;
    this.musicPlaying = false;
    
    // Audio Context für bessere Performance
    this.audioContext = null;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext nicht unterstützt');
    }
  }
  
  // Alle Sounds laden
  async loadSounds() {
    const soundFiles = {
      eat: 'assets/sounds/effects/eat.wav',
      powerup: 'assets/sounds/effects/powerup.wav',
      gameover: 'assets/sounds/effects/gameover.wav',
      levelup: 'assets/sounds/effects/levelup.wav',
      button: 'assets/sounds/effects/button.mp3',
      bomb: 'assets/sounds/effects/bomb.flac'
    };
    
    // Fallback: Versuche auch andere Formate
    const soundFallbacks = {
      bomb: ['assets/sounds/effects/bomb.flac', 'assets/sounds/effects/bomb.wav', 'assets/sounds/effects/bomb.mp3']
    };
    
    // Lade alle Sound-Effekte
    for (const [key, path] of Object.entries(soundFiles)) {
      try {
        const audio = new Audio(path);
        audio.volume = this.soundVolume;
        audio.preload = 'auto';
        this.sounds[key] = audio;
      } catch (error) {
        console.warn(`Sound ${key} konnte nicht geladen werden:`, error);
        this.sounds[key] = null;
      }
    }
    
    // Lade Hintergrundmusik
    try {
      this.music = new Audio('assets/sounds/music/background.mp3');
      this.music.volume = this.musicVolume;
      this.music.loop = true;
      this.music.preload = 'auto';
    } catch (error) {
      console.warn('Hintergrundmusik konnte nicht geladen werden:', error);
      this.music = null;
    }
    
    // Fallback: Versuche auch .wav/.flac wenn .mp3 fehlt
    if (!this.music) {
      try {
        this.music = new Audio('assets/sounds/music/background.wav');
        this.music.volume = this.musicVolume;
        this.music.loop = true;
        this.music.preload = 'auto';
      } catch (e) {
        // Ignoriere
      }
    }
  }
  
  // Sound abspielen
  playSound(soundName) {
    if (!this.soundsEnabled) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      try {
        // Erstelle neue Instanz für gleichzeitiges Abspielen
        const audio = sound.cloneNode();
        audio.volume = this.soundVolume;
        audio.play().catch(e => {
          // Ignoriere Fehler (z.B. wenn User noch nicht interagiert hat)
          console.debug('Sound konnte nicht abgespielt werden:', e);
        });
      } catch (error) {
        console.debug('Sound-Fehler:', error);
      }
    }
  }
  
  // Hintergrundmusik starten
  playMusic() {
    if (!this.musicEnabled || !this.music || this.musicPlaying) return;
    
    try {
      this.music.play().then(() => {
        this.musicPlaying = true;
      }).catch(e => {
        // Musik kann erst nach User-Interaktion gestartet werden
        console.debug('Musik kann erst nach User-Interaktion gestartet werden');
      });
    } catch (error) {
      console.debug('Musik-Fehler:', error);
    }
  }
  
  // Hintergrundmusik stoppen
  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.musicPlaying = false;
    }
  }
  
  // Musik-Volume setzen
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.music) {
      this.music.volume = this.musicVolume;
    }
  }
  
  // Sound-Volume setzen
  setSoundVolume(volume) {
    this.soundVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      if (sound) sound.volume = this.soundVolume;
    });
  }
  
  // Musik aktivieren/deaktivieren
  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    } else if (this.music && !this.musicPlaying) {
      this.playMusic();
    }
  }
  
  // Sounds aktivieren/deaktivieren
  setSoundsEnabled(enabled) {
    this.soundsEnabled = enabled;
  }
  
  // User-Interaktion Handler (für Browser-Autoplay-Policy)
  enableAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    // Versuche Musik zu starten
    this.playMusic();
  }
}

