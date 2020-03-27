import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
