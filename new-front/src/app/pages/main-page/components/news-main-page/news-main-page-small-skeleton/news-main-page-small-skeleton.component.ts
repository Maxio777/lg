import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'lg-news-main-page-small-skeleton',
  templateUrl: './news-main-page-small-skeleton.component.html',
  styleUrls: ['./news-main-page-small-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMainPageSmallSkeletonComponent {
  @Input() img = false;
}
