/**
 * Typewriter Effect for Ink Dialogue
 * Gradually reveals text character by character
 * Can be applied to any element with `data-typewriter` attribute
 */

class Typewriter {
  /**
   * @param {HTMLElement} element - Element to apply typewriter effect
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.textContent;
    this.speed = options.speed || 30; // ms per character
    this.delay = options.delay || 0; // ms before starting
    this.loop = options.loop || false;
    this.loopDelay = options.loopDelay || 1000; // ms between loops
    this.cursor = options.cursor !== false; // show cursor
    this.onComplete = options.onComplete || null;
    
    // Preserve original text but hide it
    element.textContent = '';
    element.classList.add('typewriter-text');
    
    if (this.cursor) {
      element.classList.add('typewriter-cursor');
    }
    
    this.chars = this.text.split('');
    this.currentIndex = 0;
    this.isRunning = false;
    this.timeoutId = null;
    this.loopTimeoutId = null;
  }
  
  /**
   * Start the typewriter effect
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    setTimeout(() => {
      this.typeNext();
    }, this.delay);
  }
  
  /**
   * Type the next character
   */
  typeNext() {
    if (this.currentIndex < this.chars.length) {
      this.element.textContent += this.chars[this.currentIndex];
      this.currentIndex++;
      
      // Randomize speed slightly for natural feel
      const speed = this.speed + Math.random() * 10 - 5;
      this.timeoutId = setTimeout(() => this.typeNext(), speed);
    } else {
      this.isRunning = false;
      
      if (this.loop) {
        this.loopTimeoutId = setTimeout(() => this.reset(), this.loopDelay);
      }
      
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  
  /**
   * Reset to beginning
   */
  reset() {
    this.stop();
    this.currentIndex = 0;
    this.element.textContent = '';
    this.isRunning = false;
    
    if (this.loop) {
      this.start();
    }
  }
  
  /**
   * Stop the effect
   */
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.loopTimeoutId) {
      clearTimeout(this.loopTimeoutId);
      this.loopTimeoutId = null;
    }
    this.isRunning = false;
  }
  
  /**
   * Skip to end instantly
   */
  skip() {
    this.stop();
    this.element.textContent = this.text;
    this.currentIndex = this.chars.length;
    this.isRunning = false;
    
    if (this.onComplete) {
      this.onComplete();
    }
  }
  
  /**
   * Destroy the instance
   */
  destroy() {
    this.stop();
    this.element.textContent = this.text;
    this.element.classList.remove('typewriter-text', 'typewriter-cursor');
  }
  
  /**
   * Initialize all elements with data-typewriter attribute
   * @param {Object} globalOptions - Options to apply to all typewriters
   */
  static initAll(globalOptions = {}) {
    const elements = document.querySelectorAll('[data-typewriter]');
    const instances = [];
    
    elements.forEach(el => {
      // Parse options from data attributes
      const speed = parseInt(el.dataset.typewriterSpeed) || globalOptions.speed || 30;
      const delay = parseInt(el.dataset.typewriterDelay) || globalOptions.delay || 0;
      const loop = el.dataset.typewriterLoop === 'true' || globalOptions.loop || false;
      const cursor = el.dataset.typewriterCursor !== 'false' && (globalOptions.cursor !== false);
      
      const instance = new Typewriter(el, {
        speed,
        delay,
        loop,
        cursor,
        onComplete: globalOptions.onComplete
      });
      
      instances.push(instance);
      instance.start();
    });
    
    return instances;
  }
}

// ES6 export
export { Typewriter };

