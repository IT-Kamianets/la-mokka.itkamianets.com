import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="absolute right-0 top-full mt-2 w-72 bg-[#111111] border border-white/[0.06]
             shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-50 py-3"
      role="dialog"
      aria-label="Панель доступності">

      <!-- Header -->
      <div class="px-4 pb-2 mb-1 border-b border-white/[0.06]">
        <p class="text-[10px] tracking-[0.35em] uppercase text-[#C8A96E]/50 font-light">
          Доступність
        </p>
      </div>

      <!-- Large Text -->
      <button (click)="a11y.toggle('largeText')"
              [ngClass]="btnClass(a11y.largeText())"
              [attr.aria-pressed]="a11y.largeText()">
        <span [ngClass]="iconClass(a11y.largeText())"
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
            <text x="2" y="17" font-size="16" font-family="Georgia,serif">A</text>
            <text x="14" y="14" font-size="10" font-family="Georgia,serif">a</text>
          </svg>
        </span>
        <span class="flex-1 min-w-0">
          <span class="block text-[12px] tracking-[0.08em] font-light">Великий шрифт</span>
          <span class="block text-[10px] tracking-[0.05em] opacity-50 mt-0.5 font-light">Масштабує весь вміст сторінки</span>
        </span>
        <span [ngClass]="dotClass(a11y.largeText())"
              class="flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200"></span>
      </button>

      <!-- High Contrast -->
      <button (click)="a11y.toggle('highContrast')"
              [ngClass]="btnClass(a11y.highContrast())"
              [attr.aria-pressed]="a11y.highContrast()">
        <span [ngClass]="iconClass(a11y.highContrast())"
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 3v18" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="flex-1 min-w-0">
          <span class="block text-[12px] tracking-[0.08em] font-light">Високий контраст</span>
          <span class="block text-[10px] tracking-[0.05em] opacity-50 mt-0.5 font-light">Підвищує чіткість тексту</span>
        </span>
        <span [ngClass]="dotClass(a11y.highContrast())"
              class="flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200"></span>
      </button>

      <!-- No Animations -->
      <button (click)="a11y.toggle('noAnimations')"
              [ngClass]="btnClass(a11y.noAnimations())"
              [attr.aria-pressed]="a11y.noAnimations()">
        <span [ngClass]="iconClass(a11y.noAnimations())"
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
            <path d="M4 12h16" stroke-linecap="round"/>
            <path d="M8 8L4 12l4 4" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="5" y1="5" x2="19" y2="19" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="flex-1 min-w-0">
          <span class="block text-[12px] tracking-[0.08em] font-light">Без анімацій</span>
          <span class="block text-[10px] tracking-[0.05em] opacity-50 mt-0.5 font-light">Вимикає всі переходи та анімації</span>
        </span>
        <span [ngClass]="dotClass(a11y.noAnimations())"
              class="flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200"></span>
      </button>

      <!-- Enhanced Focus -->
      <button (click)="a11y.toggle('enhancedFocus')"
              [ngClass]="btnClass(a11y.enhancedFocus())"
              [attr.aria-pressed]="a11y.enhancedFocus()">
        <span [ngClass]="iconClass(a11y.enhancedFocus())"
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <rect x="8" y="8" width="8" height="8" rx="1"/>
          </svg>
        </span>
        <span class="flex-1 min-w-0">
          <span class="block text-[12px] tracking-[0.08em] font-light">Покращений фокус</span>
          <span class="block text-[10px] tracking-[0.05em] opacity-50 mt-0.5 font-light">Золота рамка для фокусованих елементів</span>
        </span>
        <span [ngClass]="dotClass(a11y.enhancedFocus())"
              class="flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200"></span>
      </button>
    </div>
  `,
})
export class AccessibilityPanelComponent {
  @Output() close = new EventEmitter<void>();

  a11y = inject(AccessibilityService);

  btnClass(active: boolean): string {
    const base = 'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-white/[0.03]';
    return active ? `${base} text-[#C8A96E]` : `${base} text-[#f0ece4]/50`;
  }

  iconClass(active: boolean): string {
    return active ? 'border-[#C8A96E]/40' : 'border-white/[0.08]';
  }

  dotClass(active: boolean): string {
    return active ? 'bg-[#C8A96E]' : 'bg-white/10';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
