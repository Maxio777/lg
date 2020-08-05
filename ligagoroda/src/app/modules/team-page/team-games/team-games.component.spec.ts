import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGamesComponent } from './team-games.component';

describe('TeamGamesComponent', () => {
  let component: TeamGamesComponent;
  let fixture: ComponentFixture<TeamGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
