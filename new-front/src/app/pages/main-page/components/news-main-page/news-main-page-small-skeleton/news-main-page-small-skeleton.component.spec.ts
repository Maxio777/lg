import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainPageSmallSkeletonComponent } from './news-main-page-small-skeleton.component';

describe('NewsMainPageSmallSkeletonComponent', () => {
  let component: NewsMainPageSmallSkeletonComponent;
  let fixture: ComponentFixture<NewsMainPageSmallSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMainPageSmallSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainPageSmallSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
