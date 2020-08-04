import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPercentsComponent } from './player-percents.component';

describe('PlayerPercentsComponent', () => {
  let component: PlayerPercentsComponent;
  let fixture: ComponentFixture<PlayerPercentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPercentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPercentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
