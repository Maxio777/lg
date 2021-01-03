import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
