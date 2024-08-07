import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  setItem(key: string, data: any, duration: number): void {
    const expiry = new Date().getTime() + duration;
    const item = {
      data,
      expiry,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string): any | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
