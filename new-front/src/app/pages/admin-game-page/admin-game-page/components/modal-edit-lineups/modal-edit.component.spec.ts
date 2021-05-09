import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditComponent } from 'src/app/pages/admin-game-page/admin-game-page/components/modal-edit-lineups/modal-edit.component';

describe('ModalEditLineupsComponent', () => {
  let component: ModalEditComponent;
  let fixture: ComponentFixture<ModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
