import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {TitleService} from '../../../services/title/title.service';
import {AuthService} from '../../../services/auth/auth.service';
import {MatSidenav} from '@angular/material';
import {LINKS_LEFT, LINKS_TOP} from '../../../assets/constants/links-menu';
import {LayoutService} from '../../../services/layout/layout.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dataService: TitleService,
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
  ) {
  }

  @ViewChild('drawer') drawer: MatSidenav | undefined;
  selected: string = '';
  linksLeft = LINKS_LEFT;
  linksTop = LINKS_TOP;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  private subs: Subscription = new Subscription();

  public isAdmin = () => this.dataService.getCurrentTitle() === 'АДМИНКА';

  ngOnInit(): void {
    this.subs.add(this.authService.isAuth$.subscribe((bool) => {
      if (this.drawer && !bool) {
        this.drawer.toggle(false);
      }
    }));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const msn = document.querySelector('.mat-sidenav-content');
        if (msn) {
          msn.scrollTop = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.cd.detach();
    this.subs.unsubscribe();
  }

}
