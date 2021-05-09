import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
// import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'lg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  //
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const contentContainer = document.querySelector('.mat-sidenav-content') || window;
        contentContainer.scrollTo(0, 0);
      });
  }

}
