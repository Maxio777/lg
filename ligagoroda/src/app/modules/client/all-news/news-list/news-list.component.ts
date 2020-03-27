import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { chunk } from 'lodash';
import { News } from '../../../../models/news';
import { ClientDataService } from '../../services/client-data/client-data.service';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {
  @Input() singleNews: News | undefined;
  newsAll: News[] = [];
  chunks: News[][] | undefined;
  chunkSize = 2;
  uniqDate: string[] | undefined;
  sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private clientDataService: ClientDataService
  ) { }

  ngOnInit() {
    this.sub.add(this.clientDataService.getNews$().subscribe(newsAll => {
      this.getUniqDate(newsAll);
      this.chunks = chunk(newsAll, this.chunkSize);
      this.newsAll = newsAll;
      this.cd.detectChanges();
    }));
  }

  getUniqDate(newsAll: News[]): void {
    const date = new Set();
    newsAll.forEach(news => date.add(news.date.substring(0, 10)));
    this.uniqDate = [...date.values()];
  }

  showMore() {
    this.chunkSize + 1 < this.newsAll.length
      ? this.chunkSize += 1
      : this.chunkSize += (this.newsAll.length - this.chunkSize);
    this.chunks = chunk(this.newsAll, this.chunkSize);
  }

  goToSingleNews = (id: string) => this.router.navigate(['/news/' + id]);

}
