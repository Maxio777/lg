import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-news-page',
  templateUrl: './admin-news-page.component.html',
  styleUrls: ['./admin-news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
