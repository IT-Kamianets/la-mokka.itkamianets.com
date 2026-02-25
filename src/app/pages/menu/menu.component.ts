import { Component, OnInit, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item.model';

type TabKey = 'menu' | 'drinks';
type FilterKey = 'popular' | 'vegetarian' | 'glutenFree' | 'withMeat' | 'spicy' | 'quick';

interface FilterDef {
  key: FilterKey;
  label: string;
  tabs: TabKey[];
  fn: (item: MenuItem) => boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  cursorX: WritableSignal<number> = signal(0);
  cursorY: WritableSignal<number> = signal(0);

  private menuService = inject(MenuService);

  activeTab = signal<TabKey>('menu');
  activeSubcategory = signal<string | null>(null);
  allItems = signal<MenuItem[]>([]);
  isLoading = signal(true);
  scrollY = signal(0);
  loadedImages = signal<Set<number>>(new Set());
  selectedItem = signal<MenuItem | null>(null);
  activeFilters = signal<Set<FilterKey>>(new Set());
  searchQuery = signal('');

  readonly menuSubcategories: { key: string; label: string }[] = [
    { key: 'breakfasts', label: 'Сніданки' },
    { key: 'salads',     label: 'Салати' },
    { key: 'soups',      label: 'Супи' },
    { key: 'pasta',      label: 'Пасти' },
    { key: 'burgers',    label: 'Бургери і хотдоги' },
    { key: 'bowls',      label: 'Боули' },
    { key: 'mains',      label: 'Основні страви' },
    { key: 'croissants', label: 'Круасани-гриль' },
    { key: 'snacks',     label: 'Гарніри' },
    { key: 'desserts',   label: 'Десерти' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY.set(window.scrollY);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeModal();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX.set(e.clientX);
    this.cursorY.set(e.clientY);
  }

  filterDefs: FilterDef[] = [
    {
      key: 'popular',
      label: 'Популярне',
      tabs: ['menu', 'drinks'],
      fn: item => !!item.popular,
    },
    {
      key: 'vegetarian',
      label: 'Вегетаріанське',
      tabs: ['menu', 'drinks'],
      fn: item => !!item.vegetarian,
    },
    {
      key: 'glutenFree',
      label: 'Без глютену',
      tabs: ['menu', 'drinks'],
      fn: item => !!item.glutenFree,
    },
    {
      key: 'withMeat',
      label: 'З м\'ясом',
      tabs: ['menu'],
      fn: item => !item.vegetarian,
    },
    {
      key: 'spicy',
      label: 'Гостре',
      tabs: ['menu', 'drinks'],
      fn: item => !!item.spicy,
    },
    {
      key: 'quick',
      label: 'До 10 хв',
      tabs: ['menu', 'drinks'],
      fn: item => {
        const minutes = parseInt(item.prepTime);
        return !isNaN(minutes) && minutes <= 10;
      },
    },
  ];

  tabs: { key: TabKey; label: string }[] = [
    { key: 'menu', label: 'Меню' },
    { key: 'drinks', label: 'Напої' },
  ];

  visibleFilters = computed(() =>
    this.filterDefs.filter(f => f.tabs.includes(this.activeTab()))
  );

  private tabCategories(tab: TabKey): string[] {
    return tab === 'menu' ? ['menu', 'breakfasts'] : [tab];
  }

  popularItems = computed(() => {
    const cats = this.tabCategories(this.activeTab());
    return this.allItems()
      .filter(item => cats.includes(item.category) && item.popular && item.rating)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
  });

  socialTitle = computed(() =>
    this.activeTab() === 'drinks' ? 'Найчастіше замовляють до кави' : 'Найчастіше замовляють'
  );

  filteredItems = computed(() => {
    const cats = this.tabCategories(this.activeTab());
    const filters = this.activeFilters();
    const sub = this.activeSubcategory();
    let items = this.allItems().filter(item => cats.includes(item.category));
    if (sub) {
      items = items.filter(item => {
        const itemSub = item.category === 'breakfasts' ? 'breakfasts' : item.subcategory;
        return itemSub === sub;
      });
    }
    if (filters.size === 0) return items;
    return items.filter(item =>
      [...filters].every(key => {
        const def = this.filterDefs.find(f => f.key === key);
        return def ? def.fn(item) : true;
      })
    );
  });

  searchResults = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return this.allItems().filter(item =>
      item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
  });

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

  private initTabByTime(_items: MenuItem[]) {
    this.activeTab.set('menu');
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
    this.activeFilters.set(new Set());
    this.activeSubcategory.set(null);
    this.searchQuery.set('');
  }

  setSubcategory(key: string | null) {
    this.activeSubcategory.set(key);
    this.activeFilters.set(new Set());
  }

  getTabCount(key: TabKey): number {
    const cats = this.tabCategories(key);
    return this.allItems().filter(item => cats.includes(item.category)).length;
  }

  toggleFilter(key: FilterKey) {
    const next = new Set(this.activeFilters());
    next.has(key) ? next.delete(key) : next.add(key);
    this.activeFilters.set(next);
  }

  isFilterActive(key: FilterKey): boolean {
    return this.activeFilters().has(key);
  }

  clearFilters() {
    this.activeFilters.set(new Set());
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  imageLoaded(id: number) {
    const next = new Set(this.loadedImages());
    next.add(id);
    this.loadedImages.set(next);
  }

  isImageLoaded(id: number): boolean {
    return this.loadedImages().has(id);
  }

  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  }

  openModal(item: MenuItem) {
    this.selectedItem.set(item);
  }

  closeModal() {
    this.selectedItem.set(null);
  }
}
