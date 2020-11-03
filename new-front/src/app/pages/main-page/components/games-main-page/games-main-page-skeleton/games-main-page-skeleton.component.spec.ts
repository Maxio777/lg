import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMainPageSkeletonComponent } from './games-main-page-skeleton.component';

describe('GamesMainPageSkeletonComponent', () => {
  let component: GamesMainPageSkeletonComponent;
  let fixture: ComponentFixture<GamesMainPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesMainPageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesMainPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
