import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lg-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
