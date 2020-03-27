import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefereesComponent } from './admin-referees.component';

describe('AdminRefereesComponent', () => {
  let component: AdminRefereesComponent;
  let fixture: ComponentFixture<AdminRefereesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRefereesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRefereesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
