import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGamesComponent } from './player-games.component';

describe('PlayerGamesComponent', () => {
  let component: PlayerGamesComponent;
  let fixture: ComponentFixture<PlayerGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
