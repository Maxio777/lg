import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'lg-side-skeleton',
  templateUrl: './side-skeleton.component.html',
  styleUrls: ['./side-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideSkeletonComponent {
  @Input() heightLastRow = '390';
}
