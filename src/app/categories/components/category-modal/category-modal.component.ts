import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton
  ],
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent {

  @Input() category = '';
  @Input() mode: 'add' | 'edit' = 'add';

  private modalCtrl = inject(ModalController);

  save() {
    const value = this.category.trim();

    if (!value) {
      return;
    }

    this.modalCtrl.dismiss({
      category: value
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
