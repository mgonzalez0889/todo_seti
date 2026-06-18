import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController, IonFab, IonFabButton, IonIcon, IonChip } from '@ionic/angular/standalone';

import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { NotificationService } from '../services/notification.service';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonChip, IonIcon, IonFabButton, IonFab,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class CategoriesPage {

  private categoryService = inject(CategoryService);
  private taskService = inject(TaskService);
  private modalCtrl = inject(ModalController);
  private notificationService = inject(NotificationService);

  categories: string[] = [];


  constructor() {
    addIcons({
      add,
      createOutline,
      trashOutline
    });
    this.refreshCategories();
  }

  refreshCategories() {
    this.categories = this.categoryService.getCategories();
  }

  async openAddModal() {

    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        mode: 'add',
        category: ''
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (!data?.category) {
      return;
    }

    const created =
      this.categoryService.addCategory(
        data.category
      );

    if (!created) {

      await this.notificationService.warning(
        'La categoría ya existe.'
      );

      return;
    }

    this.refreshCategories();

    await this.notificationService.success(
      'Categoría creada correctamente.'
    );
  }

  async openEditModal(index: number) {

    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: {
        mode: 'edit',
        category: this.categories[index]
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.category) {
      const result = this.categoryService.editCategory(
        index,
        data.category
      );

      if (result) {
        this.taskService.updateTasksCategory(result.oldName, result.newName);

        await this.notificationService.success(
        'Categoría actualizada correctamente.'
        );
      }

      this.refreshCategories();
    }
  }

  async removeCategory(index: number) {
    const removedCategory =
      this.categoryService.removeCategory(index);

    if (!removedCategory) {
      return;
    }

    this.taskService.removeTasksByCategory(
      removedCategory
    );


    this.refreshCategories();

    await this.notificationService.success(
    'Categoría eliminada correctamente'
    );
  }

}
