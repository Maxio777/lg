import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefereesPageComponent } from './admin-referees-page.component';

describe('AdminRefereesPageComponent', () => {
  let component: AdminRefereesPageComponent;
  let fixture: ComponentFixture<AdminRefereesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRefereesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRefereesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
