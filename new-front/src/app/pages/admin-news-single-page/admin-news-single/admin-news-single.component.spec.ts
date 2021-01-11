import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsSingleComponent } from './admin-news-single.component';

describe('AdminNewsSingleComponent', () => {
  let component: AdminNewsSingleComponent;
  let fixture: ComponentFixture<AdminNewsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
