import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-teams-page',
  templateUrl: './admin-teams-page.component.html',
  styleUrls: ['./admin-teams-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTeamsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
