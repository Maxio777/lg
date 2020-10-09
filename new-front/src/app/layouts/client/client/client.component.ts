import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ClientDataService} from '../../../core/client-data-service/client-data.service';

@Component({
  selector: 'lg-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {


  constructor(private clientDataService: ClientDataService) {
  }

  ngOnInit(): void {

  }

}
