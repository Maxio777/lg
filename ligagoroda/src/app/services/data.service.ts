import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class DataService {

  team: any;
  player: any;
  private siteTitle$: BehaviorSubject<string> = new BehaviorSubject('');
  public currentSiteTitle$ = this.siteTitle$.asObservable();
  public currentTournamentID: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getCurrentTitle = (): string => this.siteTitle$.getValue();
  public setCurrentTournamentID = (id: string): void => this.currentTournamentID.next(id);

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    this.siteTitle();
  }

  siteTitle(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(routeData => this.setThisTitle(routeData.title));
  }

  setThisTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
    this.siteTitle$.next(newTitle);
  }

}
