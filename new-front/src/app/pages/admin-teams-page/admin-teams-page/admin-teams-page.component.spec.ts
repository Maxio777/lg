import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamsPageComponent } from './admin-teams-page.component';

describe('AdminTeamsPageComponent', () => {
  let component: AdminTeamsPageComponent;
  let fixture: ComponentFixture<AdminTeamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeamsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
