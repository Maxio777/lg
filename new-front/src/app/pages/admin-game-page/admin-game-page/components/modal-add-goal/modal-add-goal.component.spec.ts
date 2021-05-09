import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddGoalComponent } from './modal-add-goal.component';

describe('ModalAddGoalComponent', () => {
  let component: ModalAddGoalComponent;
  let fixture: ComponentFixture<ModalAddGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
