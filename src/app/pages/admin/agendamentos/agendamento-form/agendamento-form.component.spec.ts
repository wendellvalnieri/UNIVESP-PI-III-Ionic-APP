import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgendamentoFormComponent } from './agendamento-form.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

describe('AgendamentoFormComponent', () => {
  let component: AgendamentoFormComponent;
  let fixture: ComponentFixture<AgendamentoFormComponent>;
  const mockActivatedRoute = {
    snapshot: {
      params: {},
      queryParams: {}
    }
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoFormComponent],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
