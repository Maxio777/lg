import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {News} from '@models/news';
import {Subscription} from 'rxjs';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';


@Component({
  selector: 'lg-news-main-page',
  templateUrl: './news-main-page.component.html',
  styleUrls: ['./news-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMainPageComponent implements OnInit {
  news: News[] = [];
  subs: Subscription = new Subscription();
  isFirstLoad = false;

  constructor(private clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subs.add(this.subs.add(this.clientDataService.getNews$().subscribe(news => {

      this.news = news;
      this.cd.detectChanges();
    })));
  }

  changeLoadStatus(n: News): void {
    setTimeout(() => {
      n.isLoad = true;
      this.isFirstLoad = true;
      this.cd.detectChanges();
    }, 50);
  }

}
