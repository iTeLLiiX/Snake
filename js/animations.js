/**
 * Modern Design Animations System
 * Micro & Macro Interactions, Experimental Navigation
 */

class AnimationSystem {
  constructor() {
    this.animations = new Map();
    this.init();
  }
  
  init() {
    // Micro Interactions für alle Buttons
    this.setupMicroInteractions();
    
    // Macro Animations für Screens
    this.setupMacroAnimations();
    
    // Experimental Navigation
    this.setupExperimentalNav();
  }
  
  // Micro Interactions - Premium Hover/Touch Effects
  setupMicroInteractions() {
    // Alle Buttons bekommen Micro Interactions
    const buttons = document.querySelectorAll('.game-button, .d-pad-button, .pause-button');
    
    buttons.forEach(button => {
      // Hover Effect mit Scale & Glow
      button.addEventListener('mouseenter', (e) => {
        this.animateMicroInteraction(e.target, 'enter');
      });
      
      button.addEventListener('mouseleave', (e) => {
        this.animateMicroInteraction(e.target, 'leave');
      });
      
      // Touch Feedback
      button.addEventListener('touchstart', (e) => {
        this.animateMicroInteraction(e.target, 'press');
      });
      
      button.addEventListener('touchend', (e) => {
        this.animateMicroInteraction(e.target, 'release');
      });
    });
  }
  
  // Micro Interaction Animation
  animateMicroInteraction(element, type) {
    switch (type) {
      case 'enter':
        element.style.transform = 'translateY(-2px) scale(1.02)';
        element.style.boxShadow = '0 8px 24px rgba(76, 175, 80, 0.7), 0 0 40px rgba(76, 175, 80, 0.5)';
        element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        break;
      case 'leave':
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
        break;
      case 'press':
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        break;
      case 'release':
        element.style.transform = 'scale(1)';
        setTimeout(() => {
          element.style.transform = '';
        }, 100);
        break;
    }
  }
  
  // Macro Animations - Screen Transitions
  setupMacroAnimations() {
    // Wird von UIManager aufgerufen
  }
  
  // Experimental Navigation - Kreative Transitions
  experimentalTransition(fromScreen, toScreen, type = 'slide') {
    const from = document.getElementById(fromScreen);
    const to = document.getElementById(toScreen);
    
    if (!from || !to) return;
    
    switch (type) {
      case 'slide':
        this.slideTransition(from, to);
        break;
      case 'fade':
        this.fadeTransition(from, to);
        break;
      case 'scale':
        this.scaleTransition(from, to);
        break;
      case 'rotate':
        this.rotateTransition(from, to);
        break;
      case 'blur':
        this.blurTransition(from, to);
        break;
      case 'glitch':
        this.glitchTransition(from, to);
        break;
    }
  }
  
  slideTransition(from, to) {
    from.style.transform = 'translateX(-100%)';
    from.style.opacity = '0';
    to.style.transform = 'translateX(100%)';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    setTimeout(() => {
      from.style.display = 'none';
      to.style.transform = 'translateX(0)';
      to.style.opacity = '1';
    }, 50);
  }
  
  fadeTransition(from, to) {
    from.style.opacity = '0';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    setTimeout(() => {
      from.style.display = 'none';
      to.style.opacity = '1';
    }, 300);
  }
  
  scaleTransition(from, to) {
    from.style.transform = 'scale(0.8)';
    from.style.opacity = '0';
    to.style.transform = 'scale(1.2)';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    setTimeout(() => {
      from.style.display = 'none';
      to.style.transform = 'scale(1)';
      to.style.opacity = '1';
    }, 50);
  }
  
  rotateTransition(from, to) {
    from.style.transform = 'rotateY(90deg)';
    from.style.opacity = '0';
    to.style.transform = 'rotateY(-90deg)';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    setTimeout(() => {
      from.style.display = 'none';
      to.style.transform = 'rotateY(0deg)';
      to.style.opacity = '1';
    }, 50);
  }
  
  blurTransition(from, to) {
    from.style.filter = 'blur(20px)';
    from.style.opacity = '0';
    to.style.filter = 'blur(20px)';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    setTimeout(() => {
      from.style.display = 'none';
      to.style.filter = 'blur(0)';
      to.style.opacity = '1';
    }, 50);
  }
  
  glitchTransition(from, to) {
    // Glitch-Effekt mit mehreren Frames
    const glitchFrames = [
      { transform: 'translateX(0)', filter: 'hue-rotate(0deg)' },
      { transform: 'translateX(-2px)', filter: 'hue-rotate(90deg)' },
      { transform: 'translateX(2px)', filter: 'hue-rotate(180deg)' },
      { transform: 'translateX(0)', filter: 'hue-rotate(0deg)' }
    ];
    
    from.style.opacity = '0';
    to.style.opacity = '0';
    to.style.display = 'flex';
    
    let frame = 0;
    const glitchInterval = setInterval(() => {
      if (frame < glitchFrames.length) {
        to.style.transform = glitchFrames[frame].transform;
        to.style.filter = glitchFrames[frame].filter;
        frame++;
      } else {
        clearInterval(glitchInterval);
        from.style.display = 'none';
        to.style.transform = 'translateX(0)';
        to.style.filter = 'none';
        to.style.opacity = '1';
      }
    }, 50);
  }
  
  // Experimental Navigation Setup
  setupExperimentalNav() {
    // Wird später erweitert
  }
  
  // Parallax Scrolling Effect (für Settings Screen)
  parallaxScroll(element, speed = 0.5) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
  
  // 3D Card Flip Animation
  cardFlip(card, duration = 600) {
    card.style.transform = 'rotateY(180deg)';
    card.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    setTimeout(() => {
      card.style.transform = 'rotateY(0deg)';
    }, duration);
  }
  
  // Morphing Animation (für Buttons)
  morphButton(button, targetShape = 'circle') {
    const currentBorderRadius = getComputedStyle(button).borderRadius;
    const targetRadius = targetShape === 'circle' ? '50%' : '16px';
    
    button.style.transition = 'border-radius 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    button.style.borderRadius = targetRadius;
    
    setTimeout(() => {
      button.style.borderRadius = currentBorderRadius;
    }, 500);
  }
  
  // Ripple Effect (Material Design)
  createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Global verfügbar machen
let animationSystem;
window.animationSystem = animationSystem;

