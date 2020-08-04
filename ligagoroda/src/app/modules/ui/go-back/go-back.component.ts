import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackComponent {
  @Input() text = 'Назад';
  isHover = false;

  constructor(private _location: Location) {}

  goBack() {
    this._location.back();
  }

}
