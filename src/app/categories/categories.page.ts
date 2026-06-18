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
  ModalController
} from '@ionic/angular/standalone';

import { TodoService } from '../services/todo.service';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
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

  private todoService = inject(TodoService);
  private modalCtrl = inject(ModalController);

  categories: string[] = [];


  constructor() {
    this.refreshCategories();
  }

  refreshCategories() {
    this.categories = this.todoService.getCategories();
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

    if (data?.category) {
      this.todoService.addCategory(data.category);
      this.refreshCategories();
    }
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
      this.todoService.editCategory(
        index,
        data.category
      );

      this.refreshCategories();
    }
  }

  removeCategory(index: number) {
    this.todoService.removeCategory(index);
    this.refreshCategories();
  }
}
