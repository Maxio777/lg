import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {map, pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {News} from '../../../models/news';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsSingleComponent implements OnInit, OnDestroy {
  news: News | undefined;
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private clientDataService: ClientDataService,
  ) {
  }

  ngOnInit() {
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
