import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagsPageComponent } from './admin-tags-page.component';

describe('AdminTagsPageComponent', () => {
  let component: AdminTagsPageComponent;
  let fixture: ComponentFixture<AdminTagsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTagsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
