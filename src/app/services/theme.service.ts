import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'dark-mode';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(isDark: boolean): void {
    document.body.classList.toggle('dark', isDark);

    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    let isDark: boolean;

    if (savedTheme !== null) {
      isDark = JSON.parse(savedTheme);
    } else {
      isDark = false;
      localStorage.setItem(this.THEME_KEY, JSON.stringify(false));
    }

    document.body.classList.toggle('dark', isDark);
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
