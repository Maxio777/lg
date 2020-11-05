import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageSkeletonComponent } from './table-page-skeleton.component';

describe('TablePageSkeletonComponent', () => {
  let component: TablePageSkeletonComponent;
  let fixture: ComponentFixture<TablePageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePageSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
