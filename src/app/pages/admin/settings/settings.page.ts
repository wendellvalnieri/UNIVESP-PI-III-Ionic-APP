import { Component, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ModalController, Platform } from '@ionic/angular';
import { AccessibilityService } from 'src/app/services/accessibility.service';
import { appData } from 'src/app/data/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  darkMode = true;
  fontSize = 100; // porcentagem do tamanho da fonte padrão
  highContrast = false;
  reduceMotion = false;
  appVersion: any = appData.version;
  env: any = environment;
  constructor(
    public storage: Storage,
    private modalController: ModalController,
    private accessibilityService: AccessibilityService
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.darkMode = await this.storage.get('darkMode') || true;
    this.fontSize = await this.storage.get('fontSize') || 100;
    this.highContrast = await this.storage.get('highContrast') || false;
    this.reduceMotion = await this.storage.get('reduceMotion') || false;
  }

  changeFontSize(increase: boolean) {
    if (increase && this.fontSize < 200) {
      this.fontSize += 10;
    } else if (!increase && this.fontSize > 70) {
      this.fontSize -= 10;
    }
    this.accessibilityService.setFontSize(this.fontSize);
  }
  applyFontSize(fontSize: number) {
    this.fontSize = fontSize;
    this.accessibilityService.setFontSize(this.fontSize);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.accessibilityService.setDarkMode(this.darkMode);
  }

  toggleHighContrast() {
    this.highContrast = !this.highContrast;
    this.accessibilityService.setHighContrast(this.highContrast);
  }

  toggleReduceMotion() {
    this.reduceMotion = !this.reduceMotion;
    this.accessibilityService.setReduceMotion(this.reduceMotion);
  }

  resetSettings() {
    this.darkMode = false;
    this.fontSize = 100;
    this.highContrast = false;
    this.reduceMotion = false;
    this.accessibilityService.resetSettings();
  }
  dismissModal() {
    this.modalController.dismiss();
  }
}