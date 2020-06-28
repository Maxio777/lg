import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {News, Tag} from '../../../models/news';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {pluck, map} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {
  _news: News[] = [];
  search: string = '';
  currentP: number | undefined;
  title: string | undefined;
  sub: Subscription = new Subscription();
  tags: Tag[] = [
    {
      _id: '1',
      name: 'Кержаков',
      select: false
    },
    {
      _id: '2',
      name: 'Арсенал',
      select: false
    },
    {
      _id: '3',
      name: 'Обзор игры',
      select: false
    },
    {
      _id: '4',
      name: 'Арсен Венгер',
      select: false
    },
    {
      _id: '5',
      name: 'Месси',
      select: false
    },
    {
      _id: '6',
      name: 'Куарежма',
      select: false
    },
    {
      _id: '7',
      name: 'Межсезонье',
      select: false
    },
    {
      _id: '8',
      name: 'Егор Бабок',
      select: false
    },
    {
      _id: '9',
      name: 'Максима',
      select: false
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  get news() {
      return this._news.filter(n => (n.text + n.title + n.textPreview).toLowerCase().includes(this.search.toLowerCase()));
  }

  ngOnInit() {
    this.sub.add(this.clientDataService.getNews$().subscribe(newsAll => {
      this._news = newsAll;
      this.cd.detectChanges();
    }));
  }

  select(id: string) {
    const tag = this.tags.find(t => t._id === id);
    if (tag) {
      tag.select = !tag.select;
      this.cd.detectChanges();
    }
  }

  selectedTags(tags: Tag[]): Tag[] {
    return tags.filter(t => t.select);
  }

  get p() {
    return this.route.params.pipe(pluck('p'), map(p => +p));
  }

  goToChank = (event: number) => this.router.navigate(['/news-page/page/' + event]);
  goToNews = () => this.router.navigate(['/news-page/page/1']);

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
