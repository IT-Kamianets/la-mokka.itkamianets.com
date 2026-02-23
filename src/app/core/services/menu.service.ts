import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('assets/data/menu.json');
  }
}
