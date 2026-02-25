import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer />

    <!-- Scroll to top button -->
    <button
      (click)="scrollToTop()"
      [class]="showScrollTop() ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'"
      class="fixed bottom-6 right-6 z-50 w-11 h-11 border border-[#C8A96E]/40 bg-[#0a0a0a]/90 backdrop-blur-sm text-[#C8A96E]/70 hover:text-[#C8A96E] hover:border-[#C8A96E]/70 hover:bg-[#0a0a0a] transition-all duration-300 flex items-center justify-center"
      aria-label="Вгору">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  `,
})
export class App {
  showScrollTop = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop.set(window.scrollY > 400);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
