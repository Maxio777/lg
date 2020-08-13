import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDateCompletedComponent } from './tour-date-completed.component';

describe('TourDateCompletedComponent', () => {
  let component: TourDateCompletedComponent;
  let fixture: ComponentFixture<TourDateCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDateCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDateCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
