import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { News } from '../../../../models/news';
import { ClientDataService } from '../../services/client-data/client-data.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleNewsComponent implements OnInit, OnDestroy {
  news: News | undefined;
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private clientDataService: ClientDataService
  ) {}

  ngOnInit() {
    this.route.params.pipe(pluck('id'))
      .subscribe(id => {
        this.sub.add(this.clientDataService.getNews$().
        pipe(
          map((allNews ) => allNews.find(news => news._id === id))
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
