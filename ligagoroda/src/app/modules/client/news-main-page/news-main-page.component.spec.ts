import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainPageComponent } from './news-main-page.component';

describe('NewsMainPageComponent', () => {
  let component: NewsMainPageComponent;
  let fixture: ComponentFixture<NewsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
