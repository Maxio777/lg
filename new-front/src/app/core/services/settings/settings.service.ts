import { Injectable } from '@angular/core';
import {SettingsRestService} from '@core/rest/settings-rest-service/settings-rest.service';
import {Settings} from '@models/settings';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings = new BehaviorSubject<Settings | null>(null);

  constructor(private settingsRestService: SettingsRestService) {
  }

  getSettings(): void {
    this.settingsRestService.getSettings().subscribe(s => {
      this.settings.next(Settings.fromJs(s));
    });
  }
}


export function initSettings(provider: SettingsService): () => void {
  return () => provider.getSettings();
}
