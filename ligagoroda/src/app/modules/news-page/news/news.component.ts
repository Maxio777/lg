import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {News, Tag} from '../../../models/news';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientDataService} from '../../client/services/client-data/client-data.service';
import {pluck, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {
  selectedTags: Tag[] = [];
  _news: News[] = [];
  search: string = '';
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

  ngOnInit() {
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

  changeLoadStatus(n: News) {
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

  get news() {
    return this._news.filter(n => {
      return this._search(n) && this._tagFilter(n);
    });
  }

  select(tag: Tag) {
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

  get p() {
    return this.route.params.pipe(pluck('p'), map(p => +p));
  }

  goToChank = (event: number) => this.router.navigate(['/news/page/' + event]);

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
