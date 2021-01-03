import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {News} from '@models/news';
import {ActivatedRoute} from '@angular/router';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';
import {map, pluck} from 'rxjs/operators';

@Component({
  selector: 'lg-one-news-page',
  templateUrl: './one-news-page.component.html',
  styleUrls: ['./one-news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneNewsPageComponent implements OnInit, OnDestroy {
  news: News | undefined;
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private clientDataService: ClientDataService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id'))
      .subscribe(id => {
        this.sub.add(this.clientDataService.getNews$().pipe(
          map((allNews) => allNews.find(news => news._id === id))
        ).subscribe(news => {
          this.news = news;
          this.cd.detectChanges();
        }));
      });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
