import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '../../../services/title/title.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LayoutService} from '../../../services/layout/layout.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  currentTitle: string | undefined;
  isAdmin: boolean = false;

  constructor(private dataService: TitleService, private router: Router, public layoutService: LayoutService) {
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
