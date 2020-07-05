import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  currentTitle: string | undefined;
  isAdmin: boolean = false;

  constructor(private dataService: DataService, private router: Router) {
  }

  get isMobile() {
    return window.screen.width <= 500;
  }

  ngOnInit(): void {
    this.dataService.currentSiteTitle$.subscribe(data => {
      this.currentTitle = data;
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((p: any) => {
        this.isAdmin = p.url === '/admin';
      });
  }
}
