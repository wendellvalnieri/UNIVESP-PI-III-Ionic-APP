import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})

export class AppService {
    private data = {
        showMenuButton: true,
        showBackButton: false,
        showCloseButton: false,
        showSetttingButton: true,
        defaultBackUrl: '/',
        showCloseModal: false,
        title: environment.appName,
    }
    private titleSubject = new BehaviorSubject<string>(environment.appName);
    public title$: Observable<string> = this.titleSubject.asObservable();

    private configSubject = new BehaviorSubject<any>(this.data);
    public config$: Observable<any> = this.configSubject.asObservable();

    setTitle(newTitle: string): void {
        this.titleSubject.next(newTitle);
    }

    setConfiguration(config: any): void {
        this.configSubject.next(config);
    }
}