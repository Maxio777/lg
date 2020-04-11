import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import {AuthService} from '../../../services/auth/auth.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  selected: string = '';
  userFullName: string | null = '';

  isMenuOpen = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  public goToRouter = (direct: string) => this.router.navigate([direct]);
  public isAdmin = () => this.dataService.getCurrentTitle() === 'АДМИНКА';

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dataService: DataService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.authService.fullName.subscribe(fullName => {
      this.userFullName = fullName;
      this.cd.detectChanges();
    });
    this.router.events.
    pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
      const msn = document.querySelector('.mat-sidenav-content');
      if (msn) {
        msn.scrollTop = 0;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

}
