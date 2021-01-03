import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTournamentsPageComponent } from './admin-tournaments-page.component';

describe('AdminTournamentsPageComponent', () => {
  let component: AdminTournamentsPageComponent;
  let fixture: ComponentFixture<AdminTournamentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTournamentsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTournamentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
