import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPageComponent } from './games-page.component';

describe('GamesComponent', () => {
  let component: GamesPageComponent;
  let fixture: ComponentFixture<GamesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
