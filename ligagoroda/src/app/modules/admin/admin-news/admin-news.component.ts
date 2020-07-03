import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestNewsService } from '../../../rest/rest-news/rest-news.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { News } from '../../../models/news';
import { AdminDataService } from '../services/admin-data/admin-data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  dataSource: MatTableDataSource<News> | undefined;


  form: FormGroup = this.fb.group({});
  displayedColumns: string[] = ['_id', 'title', 'textPreview', 'date', 'action'];
  news: News[] = [];
  currentNewsId: number | string = NaN;
  goToNew = () => this.router.navigate(['/admin/news-page-new']);
  goToNews = (id: string) => this.router.navigate(['/admin/news/' + id]);

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private restNewsService: RestNewsService,
    private adminDataService: AdminDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNewsLG();
  }

  addNewsLG() {
    const data = this.form.value;
    return this.restNewsService.postNewsLG(data).subscribe(
      () => {
        this.toastr.success('Новость добавлена');
        this.getNewsLG();
      },
      () => this.toastr.error('Что-то пошло не так')
    );
  }

  initTable() {
    this.dataSource = new MatTableDataSource<News>(this.news);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getNewsLG() {
    return this.adminDataService.getNews$()
      .subscribe((news: News[]) => {
        this.news = news;
        this.initTable();
      });
  }

  deleteNewsLG(id: string): void {
    this.restNewsService.deleteNewsLG(id).subscribe(() => {
      this.getNewsLG();
    });
  }

  updateNewsLG(): void | Subscription {
    return this.restNewsService.updateNewsLG(JSON.stringify({ _id: this.currentNewsId, ...this.form.value}))
      .subscribe(() => this.getNewsLG());
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
