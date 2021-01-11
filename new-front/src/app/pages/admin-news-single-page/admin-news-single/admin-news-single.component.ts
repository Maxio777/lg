import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {NewsRestService} from '@core/rest/news-rest.service';
import {News} from '@models/news';
import {FormGroup} from '@angular/forms';
import {initForm} from '@core/helpers';
import {forEach} from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {TagsRestService} from '@core/rest/tags-rest-service/tags-rest.service';
import {Tag} from '@models/tag';


@Component({
  selector: 'lg-admin-news-single',
  templateUrl: './admin-news-single.component.html',
  styleUrls: ['./admin-news-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsSingleComponent implements OnInit, OnDestroy {
  readonly _subs: Subscription;
  news: News;
  tags: Tag[] = [];
  newsTagsId: string[] = [];
  image: File | null = null;
  isNew;
  imagePreview: string | ArrayBuffer | null = '';
  kind = 'news';
  controls =
    ['_id', 'title', 'textPreview', 'text'];
  form: FormGroup = initForm(this.controls);

  constructor(
    private route: ActivatedRoute,
    private newsRestService: NewsRestService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    private tagsRestService: TagsRestService
  ) {
    this._subs = new Subscription();
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this._subs.add(this.route.params.subscribe(params => {
        this.isNew = params.id === 'new';
        if (!this.isNew) {
          this.getNewsAndTags(params.id);
        }
      }));
  }

  private getNewsAndTags(id: string): void {
    this._subs.add(this.newsRestService.getNewsLG<News>(id).pipe(
      map(news => this.news = news),
      mergeMap(() => this.tagsRestService.getTagsLG())
    ).subscribe(
      tags => this.getNewsAndTagsSuccess(tags),
      error => console.log(error?.message)));
  }

  private getNewsAndTagsSuccess(tags): void {
    this.tags = tags;
    this.highlightSelectedTags(tags);
    this.setDataToForm(this.news);
    this.cd.detectChanges();
  }

  private highlightSelectedTags(tags: Tag[]): void {
    if (tags?.length) {
      const selectedTagsIds = this.news.tags.map(t => t._id);
      tags.forEach(t => t.select = selectedTagsIds.includes(t._id));
    }
  }

  private setDataToForm(news: News): void {
    this.controls.forEach(c => {
      this.form.controls[c].setValue(news[c]);
      this.cd.detectChanges();
    });
  }

  private createNews(data): void {
    this._subs.add(this.newsRestService.postNewsLG2(data, this.image, this.kind).subscribe(
      (news) => {
        this.toastr.success(news.message);
        this.goToNewsList();
      },
      error => this.toastr.error(error)));
  }

  private updateNews(data): void {
    this._subs.add(this.newsRestService.updateNewsLG2(data, this.image, this.kind, this.news._id)
      .subscribe(
        (news) => {
          this.toastr.success(news.message);
          this. goToNewsList();
        },
        error => this.toastr.error(error)));
  }

  private goToNewsList(): void {
    this.router.navigate(['/admin/news/']);
  }

  setImage(image: File): void {
    this.image = image;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(image);
  }

  createOrUpdate(): void {
    const data = this.form.getRawValue();
    forEach(data, (_, key) => {
      data[key] = data[key].trim();
    });
    data.tags = this.tags.filter(t => t.select).map(t => t._id);

    if (this.form.valid) {
      this.isNew
        ? this.createNews(data)
        : this.updateNews(data);
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

}
