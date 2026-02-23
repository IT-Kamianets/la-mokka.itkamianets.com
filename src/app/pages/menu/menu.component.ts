import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item.model';
import { HttpClientModule } from '@angular/common/http';

type TabKey = 'breakfasts' | 'menu' | 'drinks';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  providers: [MenuService],
})
export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);

  activeTab = signal<TabKey>('breakfasts');
  allItems = signal<MenuItem[]>([]);
  isLoading = signal(true);

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
      },
      error: () => this.isLoading.set(false),
    });
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }
}
