import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RemoteConfigService } from './services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private remoteConfigService = inject(RemoteConfigService);

  async ngOnInit(): Promise<void> {
    await this.initializeApp();
  }

  async initializeApp() {
    await this.remoteConfigService.loadConfig();
  }
}
