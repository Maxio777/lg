import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsPageComponent } from './admin-news-page.component';

describe('AdminNewsPageComponent', () => {
  let component: AdminNewsPageComponent;
  let fixture: ComponentFixture<AdminNewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
