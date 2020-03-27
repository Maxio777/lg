import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs/operators';
import { ClientDataService } from '../services/client-data/client-data.service';
import { GameLG } from '../../../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  game: GameLG | undefined;

  constructor(
    private route: ActivatedRoute,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
    console.log('init game');}

  ngOnInit() {
    this.getSingleNews();
  }

  // map((games ) => games.find(game => game._id === params.id))

  getSingleNews(): void {
    this.route.params.pipe(
      pluck('id'),
      map((id: any) => this.getGame(id)))
      .subscribe();
  }

  isHomePlayer(id: string) {
    let homes: string[] = [];
    if (this.game && this.game.homePlayers) {
      homes = Object.values(this.game.homePlayers.map(game => game._id));
    }
    return homes.includes(id);
  }

  getGame(id: string): any {
    this.game = this.clientDataService.gamesMap.get(id);
    this.cd.detectChanges();
  }
}

