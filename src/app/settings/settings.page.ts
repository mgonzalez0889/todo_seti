import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonToggle, IonIcon, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ThemeService } from '../services/theme.service';
import { addIcons } from 'ionicons';
import { moonOutline } from 'ionicons/icons';
import { RemoteConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonListHeader, IonList, IonIcon, IonToggle, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SettingsPage {
  private themeService = inject(ThemeService);
  private remoteConfigService =  inject(RemoteConfigService);
  public showDarkMode = false;

  isDarkMode = false;
  constructor() {

    addIcons({
      moonOutline
    });

    this.isDarkMode =  this.themeService.isDarkMode();
    this.showDarkMode = this.remoteConfigService.isDarkModeEnabled();

  }

  toggleTheme(event: any) {
    this.isDarkMode =
      event.detail.checked;

    this.themeService.toggleTheme( this.isDarkMode );
  }

}
