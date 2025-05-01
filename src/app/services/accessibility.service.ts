import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccessibilityService {
    private darkModeSubject = new BehaviorSubject<boolean>(true);
    private fontSizeSubject = new BehaviorSubject<number>(100);
    private highContrastSubject = new BehaviorSubject<boolean>(false);
    private reduceMotionSubject = new BehaviorSubject<boolean>(false);

    darkMode$ = this.darkModeSubject.asObservable();
    fontSize$ = this.fontSizeSubject.asObservable();
    highContrast$ = this.highContrastSubject.asObservable();
    reduceMotion$ = this.reduceMotionSubject.asObservable();

    constructor(
        private storage: Storage,
        private platform: Platform
    ) {
        this.init();
    }

    async init() {
        await this.storage.create();
        await this.loadSettings();

        this.detectSystemPreferences();
    }

    async loadSettings() {
        const darkMode = await this.storage.get('darkMode') || true;
        const fontSize = await this.storage.get('fontSize');
        const highContrast = await this.storage.get('highContrast');
        const reduceMotion = await this.storage.get('reduceMotion');

        if (darkMode !== null) this.setDarkMode(darkMode);
        if (fontSize !== null) this.setFontSize(fontSize);
        if (highContrast !== null) this.setHighContrast(highContrast);
        if (reduceMotion !== null) this.setReduceMotion(reduceMotion);
    }

    detectSystemPreferences() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDark.matches && this.storage.get('darkMode') === null) {
            this.setDarkMode(true);
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches && this.storage.get('reduceMotion') === null) {
            this.setReduceMotion(true);
        }

        prefersDark.addEventListener('change', (mediaQuery) => {
            if (this.storage.get('darkMode') === null) {
                this.setDarkMode(mediaQuery.matches);
            }
        });

        prefersReducedMotion.addEventListener('change', (mediaQuery) => {
            if (this.storage.get('reduceMotion') === null) {
                this.setReduceMotion(mediaQuery.matches);
            }
        });
    }

    async setDarkMode(enable: boolean) {
        this.darkModeSubject.next(enable);
        document.documentElement.classList.toggle('ion-palette-dark', enable);
        await this.storage.set('darkMode', enable);
    }

    async setFontSize(size: number) {
        this.fontSizeSubject.next(size);
        document.documentElement.style.fontSize = `${size}%`;
        await this.storage.set('fontSize', size);
    }

    async setHighContrast(enable: boolean) {
        this.highContrastSubject.next(enable);
        document.body.classList.toggle('high-contrast', enable);
        await this.storage.set('highContrast', enable);
    }

    async setReduceMotion(enable: boolean) {
        this.reduceMotionSubject.next(enable);
        document.body.classList.toggle('reduce-motion', enable);
        await this.storage.set('reduceMotion', enable);
    }

    async resetSettings() {
        await this.setDarkMode(false);
        await this.setFontSize(100);
        await this.setHighContrast(false);
        await this.setReduceMotion(false);
    }
}