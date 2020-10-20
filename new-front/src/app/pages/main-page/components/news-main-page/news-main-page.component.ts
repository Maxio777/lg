import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {News} from '@models/news';
import {Subscription} from 'rxjs';
import {ClientDataService} from '@core/client-data-service/client-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lg-news-main-page',
  templateUrl: './news-main-page.component.html',
  styleUrls: ['./news-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMainPageComponent implements OnInit {
  news: News[] = [];
  subs: Subscription = new Subscription();

  constructor(private clientDataService: ClientDataService, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.subs.add(this.subs.add(this.clientDataService.getNews$().subscribe(news => {

      this.news = news;
      console.log(this.news);
      this.cd.detectChanges();
    })));
  }

  goToOneNews(id: string): void {
    this.router.navigate(['news-page/' + id ]);
  }

}
