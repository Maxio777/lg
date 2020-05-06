import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileUploadComponent } from './admin-file-upload.component';

describe('AdminFileUploadComponent', () => {
  let component: AdminFileUploadComponent;
  let fixture: ComponentFixture<AdminFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
