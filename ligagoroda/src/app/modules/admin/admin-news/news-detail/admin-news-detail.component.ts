import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { initForm } from '../../../../core/helpers';
import { AdminDataService } from '../../services/admin-data/admin-data.service';
import { Subscription } from 'rxjs';
import { News } from '../../../../models/news';
import { RestNewsService } from '../../../../rest/rest-news/rest-news.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsDetailComponent implements OnInit {
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
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subsOfRoute();
  }

  subsOfRoute() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.subs.add(this.adminDataService.getNews$().pipe(
          map((news ) => news.find(n => n._id === params.id)))
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
      this.form.controls._id.setValue(news._id);
      this.form.controls.title.setValue(news.title);
      this.form.controls.textPreview.setValue(news.textPreview);
      this.form.controls.text.setValue(news.text);
      this.cd.detectChanges();
  }

  postOrUpdate() {
    this.news && this.news._id
        ? this.restNewsService.updateNewsLG(this.form.value).subscribe((news) => {
        this.toastr.success(news.message);
        const allNews = this.adminDataService.news.getValue();
        const index = allNews.findIndex(n => n._id === news.news._id);
        allNews[index] = news.news;
        this.adminDataService.setNews(allNews);
      })
        : this.restNewsService.postNewsLG(this.form.value).subscribe((news) => {
        this.toastr.success(news.message);
        this.adminDataService.setNews([...this.adminDataService.news.getValue(), news.newNews]);
        this.router.navigate(['/admin/news/' + news.newNews._id]);
      });
  }

}
