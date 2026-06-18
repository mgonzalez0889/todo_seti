import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';

import { TodoService, TodoTask } from '../services/todo.service';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton
  ]
})
export class TodoListPage {

  selectedCategory = '';

  tasks: TodoTask[] = [];
  filteredTasks: TodoTask[] = [];
  categories: string[] = [];

  private todoService = inject(TodoService);
  private modalCtrl = inject(ModalController);

  constructor() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.categories = this.todoService.getCategories();
    this.tasks = this.todoService.getTasks();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredTasks =
      this.todoService.filterTasks(this.selectedCategory);
  }

  async openTaskModal() {

    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: {
        categories: this.categories
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (!data) {
      return;
    }

    this.todoService.addTask(
      data.title,
      data.category
    );

    this.loadData();
  }

  deleteTask(taskId: string) {
    this.todoService.deleteTask(taskId);
    this.loadData();
  }

  toggleComplete(taskId: string) {
    this.todoService.toggleTaskComplete(taskId);
    this.loadData();
  }
}
