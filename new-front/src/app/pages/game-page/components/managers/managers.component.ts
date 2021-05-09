import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Referee} from '@models/interfaces';

@Component({
  selector: 'lg-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagersComponent {
  @Input() managers: any = [];

}
