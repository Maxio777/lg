import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSkeletonComponent } from './side-skeleton.component';

describe('SideSkeletonComponent', () => {
  let component: SideSkeletonComponent;
  let fixture: ComponentFixture<SideSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
