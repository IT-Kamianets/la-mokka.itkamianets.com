import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'La Mokka — Меню',
  },
  {
    path: 'menu',
    redirectTo: '',
    pathMatch: 'full',
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
    title: 'Контакти — La Mokka',
  },
  {
    path: 'reservation',
    loadComponent: () =>
      import('./pages/reservation/reservation.component').then(m => m.ReservationComponent),
    title: 'Бронювання — La Mokka',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
