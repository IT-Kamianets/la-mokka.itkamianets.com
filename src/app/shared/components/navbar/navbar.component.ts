import { Component, signal, HostListener, inject, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { AccessibilityService } from '../../services/accessibility.service';
import { AccessibilityPanelComponent } from '../accessibility/accessibility-panel.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgClass, AccessibilityPanelComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  showA11yPanel = signal(false);
  showMobileA11y = signal(false);

  a11y = inject(AccessibilityService);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showA11yPanel() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleA11yPanel() {
    this.showA11yPanel.update(v => !v);
  }

  toggleMobileA11y() {
    this.showMobileA11y.update(v => !v);
  }

  mobileA11yBtnClass(active: boolean): string {
    const base = 'w-full flex items-center px-6 py-3.5 text-[11px] tracking-[0.3em] uppercase font-light transition-colors duration-200';
    return active ? `${base} text-[#C8A96E]` : `${base} text-[#f0ece4]/40`;
  }

  mobileDotClass(active: boolean): string {
    return active ? 'bg-[#C8A96E]' : 'bg-white/10';
  }
}
