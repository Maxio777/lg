import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPlayersComponent } from './stat-players.component';

describe('StatPlayersComponent', () => {
  let component: StatPlayersComponent;
  let fixture: ComponentFixture<StatPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
