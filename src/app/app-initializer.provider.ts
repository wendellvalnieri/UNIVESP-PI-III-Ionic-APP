import { APP_INITIALIZER } from '@angular/core';
import { AccessibilityService } from './services/accessibility.service';

export function initializeApp(accessibilityService: AccessibilityService) {
    return (): Promise<any> => {
        return accessibilityService.init();
    };
}

export const AppInitializerProvider = {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [AccessibilityService],
    multi: true
};