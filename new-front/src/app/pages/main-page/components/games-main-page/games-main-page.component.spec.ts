import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMainPageComponent } from './games-main-page.component';

describe('GamesMainPageComponent', () => {
  let component: GamesMainPageComponent;
  let fixture: ComponentFixture<GamesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
