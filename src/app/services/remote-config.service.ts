import { Injectable } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue
} from 'firebase/remote-config';


import { firebaseApp } from '../../environments/firebase.config';


@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
   private remoteConfig = getRemoteConfig(firebaseApp);

   constructor() {

    this.remoteConfig.settings = {
      fetchTimeoutMillis: 10000,
      minimumFetchIntervalMillis: 3600000
    };

    this.remoteConfig.defaultConfig = {
      enable_dark_mode: false
    };
  }

  async loadConfig(): Promise<void> {

    try {
        await fetchAndActivate( this.remoteConfig );

    } catch (error) {
      console.error(error);
    }
  }

  isDarkModeEnabled(): boolean {
    return getValue(
      this.remoteConfig,
      'enable_dark_mode'
    ).asBoolean();
  }
}
