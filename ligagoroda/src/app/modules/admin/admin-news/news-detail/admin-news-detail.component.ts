import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {initForm} from '../../../../core/helpers';
import {AdminDataService} from '../../services/admin-data/admin-data.service';
import {Subscription} from 'rxjs';
import {News, Tag} from '../../../../models/news';
import {RestNewsService} from '../../../../rest/rest-news/rest-news.service';
import {ToastrService} from 'ngx-toastr';
import {forEach} from 'lodash';


@Component({
  selector: 'app-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsDetailComponent implements OnInit {
  tags: Tag[] = [];
  isNew: boolean = true;
  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  kind: string = 'news';
  subs: Subscription = new Subscription();
  controls =
    ['_id', 'title', 'textPreview', 'text'];
  form: FormGroup = initForm(this.controls);
  news: News | undefined = undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminDataService: AdminDataService,
              private restNewsService: RestNewsService,
              private toastr: ToastrService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subsOfRoute();
    this.getTags();
  }

  getTags() {
    this.subs.add(this.adminDataService.getTags$().subscribe(tags => {
      this.tags = tags;
      this.cd.detectChanges();
    }));
  }

  select(id: string) {
    const tag = this.tags.find(t => t._id === id);
    if (tag) {
      tag.select = !tag.select;
    }
  }

  subsOfRoute() {
    this.route.params.subscribe((params) => {

      if (params.id) {
        this.isNew = false;
        this.subs.add(this.adminDataService.getNews$().pipe(
          map((news) => news.find(n => n._id === params.id)))
          .subscribe((news) => {
            this.news = news;
            if (this.news) {
              this.setDataToForm(this.news);
            }
          }));
      }
    });
  }

  setDataToForm(news: News) {
    this.form.controls.title.setValue(news.title);
    this.form.controls.textPreview.setValue(news.textPreview);
    this.form.controls.text.setValue(news.text);
    this.cd.detectChanges();
  }

  setImage(image: File) {
    this.image = image;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(image);
  }

  createOrUpdate() {
    const data = this.form.getRawValue();
    forEach(data, (_, key) => {
      data[key] = data[key].trim();
    });
    data.tags = this.tags.filter(t => t.select).map(t => t._id);

    if (this.news) {
      this.isNew

        ? this.restNewsService.postNewsLG2(data, this.image, this.kind).subscribe((news) => {
          this.toastr.success(news.message);
          this.adminDataService.setNews([...this.adminDataService.news.getValue(), news.newNews]);
          this.goToNewsList();
        })
        : this.restNewsService.updateNewsLG2(data, this.image, this.kind, this.news._id).subscribe((news) => {
          this.toastr.success(news.message);
          const allNews = [...this.adminDataService.news.getValue()];
          const index = allNews.findIndex(n => n._id === news.news._id);
          allNews[index] = news.news;
          this.adminDataService.setNews([...allNews]);
        });
    }
  }

  goToNewsList() {
    this.router.navigate(['/admin/news/']);
  }

}
