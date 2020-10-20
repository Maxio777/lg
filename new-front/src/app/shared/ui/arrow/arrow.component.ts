import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'lg-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowComponent {
  @Input() left = false;
  @Input() hover = false;
  @Input() isHover = false;
}
