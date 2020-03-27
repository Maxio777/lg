import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTournamentComponent } from './change-tournament.component';

describe('ChangeTournamentComponent', () => {
  let component: ChangeTournamentComponent;
  let fixture: ComponentFixture<ChangeTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
