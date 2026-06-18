import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
   private toastCtrl = inject(ToastController);

   private async present(
    message: string,
    color: string
  ) {

    const toast = await this.toastCtrl.create({
      message,
      duration: 2700,
      position: 'bottom',
      color
    });

    await toast.present();
  }

  success(message: string) {
    return this.present(message, 'success');
  }

  warning(message: string) {
    return this.present(message, 'warning');
  }

  error(message: string) {
    return this.present(message, 'danger');
  }

  info(message: string) {
    return this.present(message, 'primary');
  }

}
