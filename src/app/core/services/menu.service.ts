import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);

  getMenuItems(): Observable<MenuItem[]> {
    return forkJoin([
      this.http.get<MenuItem[]>('menu.json'),
      this.http.get<MenuItem[]>('drinks.json'),
    ]).pipe(
      map(([menu, drinks]) => [...menu, ...drinks])
    );
  }
}
