/**
 * Utility Functions für Luca's Snake Adventure
 */

// Asset Loading
function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
    img.src = path;
  });
}

// Preload mehrere Assets
async function loadAssets(assetPaths) {
  const promises = assetPaths.map(path => loadImage(path));
  try {
    const images = await Promise.all(promises);
    const assetMap = {};
    assetPaths.forEach((path, index) => {
      const key = path.split('/').pop().replace('.png', '');
      assetMap[key] = images[index];
    });
    return assetMap;
  } catch (error) {
    console.error('Error loading assets:', error);
    throw error;
  }
}

// LocalStorage Helper
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Clamp Funktion
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Random Integer
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Grid-Berechnung für responsive Canvas
function calculateGridSize(canvasWidth, canvasHeight, cellSize = 20) {
  const cols = Math.floor(canvasWidth / cellSize);
  const rows = Math.floor(canvasHeight / cellSize);
  return { cols, rows, cellSize };
}

// Debounce Funktion
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle Funktion
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format Number für Score-Anzeige
function formatNumber(num) {
  return num.toLocaleString('de-DE');
}

// Export für Module (falls später benötigt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadImage,
    loadAssets,
    Storage,
    clamp,
    randomInt,
    calculateGridSize,
    debounce,
    throttle,
    formatNumber
  };
}

