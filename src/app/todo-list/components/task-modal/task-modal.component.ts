import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
  ],
  templateUrl: './task-modal.component.html'
})
export class TaskModalComponent {

  @Input() categories: string[] = [];

  title = '';
  category = '';

  private modalCtrl = inject(ModalController);

  save() {

    if (!this.title.trim()) {
      return;
    }

    this.modalCtrl.dismiss({
      title: this.title,
      category: this.category
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
