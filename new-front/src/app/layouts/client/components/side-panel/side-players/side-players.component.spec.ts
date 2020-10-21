import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePlayersComponent } from './side-players.component';

describe('SidePlayersComponent', () => {
  let component: SidePlayersComponent;
  let fixture: ComponentFixture<SidePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
