import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'lg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() toggleSideNav = new EventEmitter<void>();

  toggle(): void {
    this.toggleSideNav.emit();
  }
}
