import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})

export class AppService {

    private titleSubject = new BehaviorSubject<string>(environment.appName);
    public title$: Observable<string> = this.titleSubject.asObservable();

    setTitle(newTitle: string): void {
        this.titleSubject.next(newTitle);
    }
}