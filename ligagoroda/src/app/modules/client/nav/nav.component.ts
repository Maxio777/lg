import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
// import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  selected: string = '';

  isMenuOpen = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  public goToRouter = (direct: string) => this.router.navigate([direct]);
  public isAdmin = () => this.dataService.getCurrentTitle() === 'АДМИНКА';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dataService: DataService,
    private cd: ChangeDetectorRef,
    // private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.router.events.
    pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
      const msn = document.querySelector('.mat-sidenav-content');
      if (msn) {
        msn.scrollTop = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

}
