import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPageSkeletonComponent } from './games-page-skeleton.component';

describe('GamesPageSkeletonComponent', () => {
  let component: GamesPageSkeletonComponent;
  let fixture: ComponentFixture<GamesPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesPageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
