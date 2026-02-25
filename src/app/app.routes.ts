import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'La Mokka — Меню | Кам\'янець-Подільський',
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Галерея — La Mokka',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Контакти — La Mokka | Адреса, телефон, години роботи',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
