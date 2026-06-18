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
  ModalController, IonFabButton, IonFab, IonIcon, IonChip } from '@ionic/angular/standalone';

import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { TaskService, TodoTask } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';
import { addIcons } from 'ionicons';
import { add, arrowUndoOutline, checkmarkCircleOutline, checkmarkOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [IonChip, IonIcon, IonFab, IonFabButton,
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

  private modalCtrl = inject(ModalController);
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  constructor() {
    addIcons({
      add,
      trashOutline,
      checkmarkOutline,
      arrowUndoOutline
  });

    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.categories = this.categoryService.getCategories();
    this.tasks = this.taskService.getTasks();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredTasks =
      this.taskService.filterTasks(this.selectedCategory);
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

    this.taskService.addTask(
      data.title,
      data.category
    );


    this.loadData();

    await this.notificationService.success(
      'Tarea creada correctamente'
    );
  }

  async deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadData();
    await this.notificationService.success(
    'Tarea eliminada correctamente'
    );
  }

  async toggleComplete(taskId: string) {
    this.taskService.toggleTaskComplete(taskId);
    this.loadData();
    await this.notificationService.success(
    'Tarea completada correctamente'
    );
  }
}
