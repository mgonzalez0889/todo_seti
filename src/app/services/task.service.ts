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
  private tasks: TodoTask[] = [];
  private taskIdCounter = 4;

  getTasks(): TodoTask[] {
    return [...this.tasks];
  }

  addTask(title: string, category: string): TodoTask {
    const trimmed = title.trim();
    if (!trimmed) {
      throw new Error('Task title cannot be empty');
    }

    const newTask: TodoTask = {
      id: String(this.taskIdCounter++),
      title: trimmed,
      category: category,
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

  updateTasksCategory(oldName: string, newName: string): void {
    this.tasks.forEach((task) => {
      if (task.category === oldName) {
        task.category = newName;
      }
    });
  }

  removeTasksByCategory(category: string): void {
    this.tasks = this.tasks.filter(
      task => task.category !== category
    );
  }
}
