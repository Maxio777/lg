import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientDataService } from '../../services/client-data/client-data.service';
import { News } from '../../../../models/news';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsComponent implements OnInit, OnDestroy {
  @Input() isMainPage: boolean = false;
  newsAll: News[] | undefined;
  currentP: number | undefined;
  title: string | undefined;
  sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientDataService: ClientDataService,
    private cd: ChangeDetectorRef
   ) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.currentP = +params.p);
    this.sub.add(this.clientDataService.getNews$().subscribe(newsAll => {
      console.log('newsAll', newsAll);
      this.newsAll = newsAll;
      this.cd.detectChanges();
    }));
 }

  goToChank = (event: number) => this.router.navigate(['/news/page/' + event ]);
  goToNews = () => this.router.navigate(['/news/page/1']);

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
