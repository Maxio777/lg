import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditGameComponent } from './modal-edit-game.component';

describe('ModalEditGameComponent', () => {
  let component: ModalEditGameComponent;
  let fixture: ComponentFixture<ModalEditGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
