import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsDetailComponent } from './admin-news-detail.component';

describe('NewsDetailComponent', () => {
  let component: AdminNewsDetailComponent;
  let fixture: ComponentFixture<AdminNewsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
