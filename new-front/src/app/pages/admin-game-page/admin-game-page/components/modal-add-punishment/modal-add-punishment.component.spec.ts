import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPunishmentComponent } from './modal-add-punishment.component';

describe('ModalAddPunishmentComponent', () => {
  let component: ModalAddPunishmentComponent;
  let fixture: ComponentFixture<ModalAddPunishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPunishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPunishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
