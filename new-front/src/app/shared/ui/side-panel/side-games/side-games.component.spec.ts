import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideGamesComponent } from './side-games.component';

describe('SideGamesComponent', () => {
  let component: SideGamesComponent;
  let fixture: ComponentFixture<SideGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
