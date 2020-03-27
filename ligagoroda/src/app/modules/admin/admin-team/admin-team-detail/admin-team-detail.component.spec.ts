import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamDetailComponent } from './admin-team-detail.component';

describe('AdminTeamDetailComponent', () => {
  let component: AdminTeamDetailComponent;
  let fixture: ComponentFixture<AdminTeamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
