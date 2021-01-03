import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'lg-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() links = [];
}
