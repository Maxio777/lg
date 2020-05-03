import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { URLS } from '../../../core/urls';
import { ClientDataService } from '../services/client-data/client-data.service';
import { GameLG } from '../../../models/game';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesComponent implements OnInit, OnDestroy {
  URLS = URLS;
  completedGames: GameLG[] = [];
  games: GameLG[] = [];
  uniqDate: string[] = [];
  sub: Subscription = new Subscription();

  constructor(private router: Router, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientDataService.getGames$().subscribe(games => {
      this.games = games.filter(g => !g.completed).slice(0, 5);
      this.completedGames = games.filter(g => g.completed).slice(0, 5);
      this.cd.detectChanges();
    });
  }

  goToGame(id: string) {
    this.router.navigate([URLS.game + id]);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
