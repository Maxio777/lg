import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamePageComponent } from './admin-game-page.component';

describe('AdminGamePageComponent', () => {
  let component: AdminGamePageComponent;
  let fixture: ComponentFixture<AdminGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
