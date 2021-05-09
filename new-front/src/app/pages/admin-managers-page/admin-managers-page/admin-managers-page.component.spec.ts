import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagersPageComponent } from './admin-managers-page.component';

describe('AdminManagersPageComponent', () => {
  let component: AdminManagersPageComponent;
  let fixture: ComponentFixture<AdminManagersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
