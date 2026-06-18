import { Injectable } from '@angular/core';

export interface TodoTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private categories = ['Personal', 'Trabajo', 'Urgente'];
  private tasks: TodoTask[] = [];
  private taskIdCounter = 4;

  getCategories(): string[] {
    return [...this.categories];
  }

  addCategory(name: string): void {
    const trimmed = name.trim();
    if (trimmed && !this.categories.includes(trimmed)) {
      this.categories.push(trimmed);
    }
  }

  removeCategory(index: number): void {
    if (index >= 0 && index < this.categories.length) {
      this.categories.splice(index, 1);
    }
  }

  editCategory(index: number, name: string): void {
    const trimmed = name.trim();
    if (!trimmed || index < 0 || index >= this.categories.length) {
      return;
    }

    const oldName = this.categories[index];
    if (oldName === trimmed || this.categories.includes(trimmed)) {
      return;
    }

    this.categories[index] = trimmed;
    this.tasks.forEach((task) => {
      if (task.category === oldName) {
        task.category = trimmed;
      }
    });
  }

  getTasks(): TodoTask[] {
    return [...this.tasks];
  }

  assignCategory(taskId: string, category: string): void {
    const task = this.tasks.find((item) => item.id === taskId);
    if (task) {
      task.category = category;
    }
  }

  filterTasks(category: string): TodoTask[] {
    if (!category) {
      return this.getTasks();
    }
    return this.tasks.filter((task) => task.category === category);
  }

  addTask(title: string, category: string): TodoTask {
    const trimmed = title.trim();
    if (!trimmed) {
      throw new Error('Task title cannot be empty');
    }

    const newTask: TodoTask = {
      id: String(this.taskIdCounter++),
      title: trimmed,
      category: category || 'Personal',
      completed: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId: string): void {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  toggleTaskComplete(taskId: string): void {
    const task = this.tasks.find((item) => item.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
}
