import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private siteTitle$: BehaviorSubject<string> = new BehaviorSubject('');
  public title$ = this.siteTitle$.asObservable();

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
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

export function initTitleService(provider: TitleService): () => void {
  return () => provider.siteTitle();
}
