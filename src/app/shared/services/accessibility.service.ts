import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  largeText     = signal(localStorage.getItem('a11y-large')    === 'true');
  highContrast  = signal(localStorage.getItem('a11y-contrast') === 'true');
  noAnimations  = signal(localStorage.getItem('a11y-motion')   === 'true');
  enhancedFocus = signal(localStorage.getItem('a11y-focus')    === 'true');

  constructor() {
    effect(() => {
      const h = document.documentElement;
      h.classList.toggle('a11y-large',    this.largeText());
      h.classList.toggle('a11y-contrast', this.highContrast());
      h.classList.toggle('a11y-motion',   this.noAnimations());
      h.classList.toggle('a11y-focus',    this.enhancedFocus());
    });
  }

  toggle(key: 'largeText' | 'highContrast' | 'noAnimations' | 'enhancedFocus') {
    this[key].update(v => !v);
    const lsKey = {
      largeText:     'a11y-large',
      highContrast:  'a11y-contrast',
      noAnimations:  'a11y-motion',
      enhancedFocus: 'a11y-focus',
    }[key];
    localStorage.setItem(lsKey, String(this[key]()));
  }
}
