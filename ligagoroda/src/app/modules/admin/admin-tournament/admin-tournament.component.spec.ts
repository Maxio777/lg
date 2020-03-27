import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTournamentComponent } from './admin-tournament.component';

describe('AdminTournamentComponent', () => {
  let component: AdminTournamentComponent;
  let fixture: ComponentFixture<AdminTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
