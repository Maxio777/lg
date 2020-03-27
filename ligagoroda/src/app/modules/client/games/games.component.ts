import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
  styleUrls: ['./games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesComponent implements OnInit, OnDestroy {
  @Input() isMainPage = false;
  URLS = URLS;
  games: GameLG[] = [];
  uniqDate: string[] = [];
  sub: Subscription = new Subscription();

  constructor(private router: Router, private clientDataService: ClientDataService, private cd: ChangeDetectorRef) {}

  getUniqDate(games: GameLG[]): void {
    const date: string[] = [];
    if (games.length) {
      games.forEach( game => date.push(game.date.substring(0, 10)));
      const set = new Set(date);
      this.uniqDate = [...set.values()];
    }
  }

  ngOnInit(): void {
    this.clientDataService.getGames$().subscribe(games => {
      this.games = games;
      this.getUniqDate(games);
      this.cd.detectChanges();
    });
  }

  isNeedDate(bool: boolean, date: string): boolean {
    return !!this.games.filter(game => game.completed === bool && game.date.includes(date)).length;
    }

  getGamesForView = (date: string): GameLG[] => this.games.filter(game => game.date.includes(date));
  isHasNoCompleted = (): boolean => !!this.games.filter(game => !game.completed).length;
  goToRouter (url: string, id = '')  {
    console.log([url + id]);
    this.router.navigate([url + id]);
  }

  getGamesByCompleted(games: GameLG[] = [], completed: boolean): GameLG[] {
    if (games.length) {
      return games.filter(game => game.completed === completed);
    }
    return [];
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
