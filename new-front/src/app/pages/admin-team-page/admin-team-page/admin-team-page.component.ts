import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-team-page',
  templateUrl: './admin-team-page.component.html',
  styleUrls: ['./admin-team-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTeamPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
