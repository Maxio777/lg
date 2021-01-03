import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayersPageComponent } from './admin-players-page.component';

describe('AdminPlayersPageComponent', () => {
  let component: AdminPlayersPageComponent;
  let fixture: ComponentFixture<AdminPlayersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
