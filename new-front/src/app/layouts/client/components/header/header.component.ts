import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'lg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Input() links = [];

  toggle(): void {
    this.toggleSideNav.emit();
  }
}
