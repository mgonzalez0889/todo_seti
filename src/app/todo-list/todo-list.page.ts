import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TodoService, TodoTask } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, FormsModule],
})
export class TodoListPage {
  selectedCategory = '';
  tasks: TodoTask[] = [];
  filteredTasks: TodoTask[] = [];
  categories: string[] = [];
  newTaskTitle = '';
  newTaskCategory = 'Personal';

  constructor(private todoService: TodoService) {
    this.categories = this.todoService.getCategories();
    this.tasks = this.todoService.getTasks();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredTasks = this.todoService.filterTasks(this.selectedCategory);
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.todoService.addTask(this.newTaskTitle, this.newTaskCategory);
      this.newTaskTitle = '';
      this.tasks = this.todoService.getTasks();
      this.applyFilter();
    }
  }

  deleteTask(taskId: string) {
    this.todoService.deleteTask(taskId);
    this.tasks = this.todoService.getTasks();
    this.applyFilter();
  }

  toggleComplete(taskId: string) {
    this.todoService.toggleTaskComplete(taskId);
    this.tasks = this.todoService.getTasks();
    this.applyFilter();
  }
}
