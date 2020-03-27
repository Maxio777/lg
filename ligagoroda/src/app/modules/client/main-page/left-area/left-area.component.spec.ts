import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAreaComponent } from './left-area.component';

describe('LeftAreaComponent', () => {
  let component: LeftAreaComponent;
  let fixture: ComponentFixture<LeftAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
