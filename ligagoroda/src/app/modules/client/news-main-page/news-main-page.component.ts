import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {News} from '../../../models/news';
import {ClientDataService} from '../services/client-data/client-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-news-main-page',
  templateUrl: './news-main-page.component.html',
  styleUrls: ['./news-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMainPageComponent implements OnInit {
  news: News[] = [];
  subs: Subscription = new Subscription();

  constructor(private clientDataService: ClientDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subs.add(this.subs.add(this.clientDataService.getNews$().subscribe(news => {
      this.news = news.reverse();
      this.cd.detectChanges();
    })));
  }


}
