import { Component, OnInit, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item.model';

type TabKey = 'breakfasts' | 'menu' | 'drinks';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);

  activeTab = signal<TabKey>('menu');
  allItems = signal<MenuItem[]>([]);
  isLoading = signal(true);
  scrollY = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY.set(window.scrollY);
  }

  tabs: { key: TabKey; label: string }[] = [
    { key: 'breakfasts', label: 'Сніданки' },
    { key: 'menu', label: 'Меню' },
    { key: 'drinks', label: 'Напої' },
  ];

  filteredItems = computed(() =>
    this.allItems().filter(item => item.category === this.activeTab())
  );

  ngOnInit() {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.allItems.set(items);
        this.isLoading.set(false);
        this.initTabByTime(items);
      },
      error: () => this.isLoading.set(false),
    });
  }

  private initTabByTime(items: MenuItem[]) {
    const hour = new Date().getHours();
    const hasBreakfasts = items.some(item => item.category === 'breakfasts');
    this.activeTab.set(hour < 12 && hasBreakfasts ? 'breakfasts' : 'menu');
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }
}
