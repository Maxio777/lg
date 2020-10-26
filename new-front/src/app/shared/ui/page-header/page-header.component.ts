import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'lg-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() img = '';

}
