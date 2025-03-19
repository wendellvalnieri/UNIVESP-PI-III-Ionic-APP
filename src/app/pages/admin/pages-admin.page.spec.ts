import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesAdminPage } from './pages-admin.page';

describe('PagesAdminPage', () => {
  let component: PagesAdminPage;
  let fixture: ComponentFixture<PagesAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
