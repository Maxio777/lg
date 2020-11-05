import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersPageSkeletonComponent } from './players-page-skeleton.component';

describe('PlayersPageSkeletonComponent', () => {
  let component: PlayersPageSkeletonComponent;
  let fixture: ComponentFixture<PlayersPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersPageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
