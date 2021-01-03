import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {News, Tag} from '@models/news';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientDataService} from '@core/services/client-data-service/client-data.service';
import {map, pluck, tap} from 'rxjs/operators';

@Component({
  selector: 'lg-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit, OnDestroy {
  selectedTags: Tag[] = [];
  _news: News[] = [];
  search = '';
  currentP: number | undefined;
  title: string | undefined;
  sub: Subscription = new Subscription();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.sub.add(this.clientDataService.getNews$().pipe(
      tap(n => n.forEach(news => news.isLoad = true)))
      .subscribe(newsAll => {
        this._news = newsAll;
        this.cd.detectChanges();
      }));
  }

  isTagSelected(tagName: string): boolean {
    return this.selectedTags.map(t => t.name).includes(tagName);
  }

  changeLoadStatus(n: News): void {
    setTimeout(() => {
      n.isLoad = false;
      this.cd.detectChanges();
    }, 200);
  }

  _search(n: News): boolean {
    return this.search
      ? (n.text + n.title + n.textPreview).toLowerCase().includes(this.search.toLowerCase())
      : true;
  }

  _tagFilter(n: News): boolean {
    return this.selectedTags.every((tag) => !!n.tags.find(t => t._id === tag._id));
  }

  get news(): News[] {
    return this._news.filter(n => {
      return this._search(n) && this._tagFilter(n);
    });
  }

  select(tag: Tag): void {
    tag.select = !tag.select;
    tag = this.selectedTags.find(t => t._id === tag._id) || tag;
    const idx = this.selectedTags.indexOf(tag);
    if (idx >= 0) {
      this.selectedTags.splice(idx, 1);
    } else {
      this.selectedTags.push(tag);
    }
    const msn = document.querySelector('.mat-sidenav-content');
    if (msn) {
      msn.scrollTop = 0;
    }
  }

  get p(): Observable<number> {
    return this.route.params.pipe(pluck('p'), map(p => +p));
  }

  goToChank = (event: number) => this.router.navigate(['/news/page/' + event]);

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
