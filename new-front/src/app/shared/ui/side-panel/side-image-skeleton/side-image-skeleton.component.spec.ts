import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideImageSkeletonComponent } from './side-image-skeleton.component';

describe('SideImageSkeletonComponent', () => {
  let component: SideImageSkeletonComponent;
  let fixture: ComponentFixture<SideImageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideImageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideImageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
