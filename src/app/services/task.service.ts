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
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';
  private tasks: TodoTask[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {

    const data = localStorage.getItem(
      this.STORAGE_KEY
    );

    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  private saveTasks(): void {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.tasks)
    );
  }


  getTasks(): TodoTask[] {
    return [...this.tasks];
  }

  addTask(title: string, category: string): TodoTask {
    const trimmed = title.trim();
    if (!trimmed) {
      throw new Error('Task title cannot be empty');
    }

    const newTask: TodoTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      category: category,
      completed: false,
    };

    this.tasks.push(newTask);

    this.saveTasks();

    return newTask;
  }

  deleteTask(taskId: string): void {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  toggleTaskComplete(taskId: string): void {
    const task = this.tasks.find((item) => item.id === taskId);

    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }

  }

  assignCategory(taskId: string, category: string): void {
    const task = this.tasks.find((item) => item.id === taskId);
    if (task) {
      task.category = category;

      this.saveTasks();
    }
  }

  filterTasks(category: string): TodoTask[] {
    if (!category) {
      return this.getTasks();
    }
    return this.tasks.filter((task) => task.category === category);
  }

  updateTasksCategory(oldName: string, newName: string): void {
    this.tasks.forEach((task) => {
      if (task.category === oldName) {
        task.category = newName;
      }
    });
    this.saveTasks();
  }

  removeTasksByCategory(category: string): void {
    this.tasks = this.tasks.filter(
      task => task.category !== category
    );

    this.saveTasks();
  }
}
