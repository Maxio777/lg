import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainPageSkeletonComponent } from './news-main-page-skeleton.component';

describe('NewsMainPageSkeletonComponent', () => {
  let component: NewsMainPageSkeletonComponent;
  let fixture: ComponentFixture<NewsMainPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMainPageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
