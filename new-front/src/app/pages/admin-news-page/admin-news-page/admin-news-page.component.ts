import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {News} from '@models/news';
import {ToastrService} from 'ngx-toastr';
import {AdminDataService} from '@core/services/admin-data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NewsRestService} from '@core/rest/news-rest.service';

@Component({
  selector: 'lg-admin-news-page',
  templateUrl: './admin-news-page.component.html',
  styleUrls: ['./admin-news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNewsPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  dataSource: MatTableDataSource<News> | undefined;

  subs = new Subscription();


  form: FormGroup = this.fb.group({});
  displayedColumns: string[] = ['title', 'textPreview', 'date', 'action'];
  news: News[] = [];
  currentNewsId: number | string = NaN;
  goToNew = () => this.router.navigate(['/admin/news/new']);
  goToNews = (id: string) => this.router.navigate(['/admin/news/' + id]);

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private newsRestService: NewsRestService,
    private adminDataService: AdminDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNewsLG();
  }

  addNewsLG(): Subscription {
    const data = this.form.value;
    return this.subs.add(this.newsRestService.postNewsLG(data).subscribe(
      () => {
        this.toastr.success('Новость добавлена');
        this.getNewsLG();
      },
      () => this.toastr.error('Что-то пошло не так')
    ));
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<News>(this.news);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getNewsLG(): Subscription {
    return this.subs.add(this.newsRestService.getNewsLG<News[]>()
      .subscribe((news: News[]) => {
        this.news = news;
        this.initTable();
      }));
  }

  deleteNewsLG(id: string): void {
    this.newsRestService.deleteNewsLG(id).subscribe(() => {
      this.getNewsLG();
    });
  }

  updateNewsLG(): void | Subscription {
    return this.newsRestService.updateNewsLG(JSON.stringify({ _id: this.currentNewsId, ...this.form.value}))
      .subscribe(() => this.getNewsLG());
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
