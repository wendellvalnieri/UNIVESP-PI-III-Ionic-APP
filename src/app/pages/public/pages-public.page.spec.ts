import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesPublicPage } from './pages-public.page';

describe('PagesPublicPage', () => {
  let component: PagesPublicPage;
  let fixture: ComponentFixture<PagesPublicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesPublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
