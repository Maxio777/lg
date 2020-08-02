import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowComponent implements OnInit {
  @Input() left = false;
  @Input() hover = false;

  constructor() { }

  ngOnInit() {
  }

}
