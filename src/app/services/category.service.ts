import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly STORAGE_KEY = 'categories';
  private categories: string[] = [];

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (data) {
      this.categories = JSON.parse(data);
    }
  }

  private saveCategories(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.categories));
  }

  getCategories(): string[] {
    return [...this.categories];
  }

  addCategory(name: string): boolean {
    const trimmed = name.trim();

    if (!trimmed) {
      return false;
    }

    if (this.categories.includes(trimmed)) {
      return false;
    }

    this.categories.push(trimmed);

    this.saveCategories();

    return true;
  }

  removeCategory(index: number): string | null {
    if (index < 0 || index >= this.categories.length) {
      return null;
    }

    const removedCategory = this.categories[index];

    this.categories.splice(index, 1);

    this.saveCategories();

    return removedCategory;
  }

  editCategory(index: number, name: string): { oldName: string; newName: string } | null {
    const trimmed = name.trim();

    if (!trimmed || index < 0 || index >= this.categories.length) {
      return null;
    }

    const oldName = this.categories[index];

    if (oldName === trimmed || this.categories.includes(trimmed)) {
      return null;
    }

    this.categories[index] = trimmed;

    this.saveCategories();

    return {
      oldName,
      newName: trimmed,
    };
  }

  getCategoryByIndex(index: number): string | undefined {
    if (index >= 0 && index < this.categories.length) {
      return this.categories[index];
    }
    return undefined;
  }

  getCategoryIndex(name: string): number {
    return this.categories.indexOf(name);
  }
}
