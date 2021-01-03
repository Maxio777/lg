import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-games-page',
  templateUrl: './admin-games-page.component.html',
  styleUrls: ['./admin-games-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGamesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
