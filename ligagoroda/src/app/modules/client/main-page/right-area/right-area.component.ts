import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-right-area',
  templateUrl: './right-area.component.html',
  styleUrls: ['./right-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightAreaComponent {}

