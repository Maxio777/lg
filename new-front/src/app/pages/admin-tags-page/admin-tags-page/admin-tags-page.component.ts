import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Tag} from '@models/tag';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup} from '@angular/forms';
import {initForm} from '@core/helpers';
import {TagsRestService} from '@core/rest/tags-rest-service/tags-rest.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lg-admin-tags-page',
  templateUrl: './admin-tags-page.component.html',
  styleUrls: ['./admin-tags-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTagsPageComponent implements OnInit, OnDestroy {
  @ViewChild('addRef') addRef: any;
  @ViewChild('updateRef') updateRef: any;
  @ViewChild('deleteRef') deleteRef: any;
  editTag: Tag | undefined;
  private readonly _subs: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<any> | undefined;
  displayedColumns: string[] =
    ['_id', 'name', 'action'];
  tags: Tag[] = [];
  form: FormGroup = initForm(this.displayedColumns);

  constructor(private tagsRestService: TagsRestService, private cd: ChangeDetectorRef, public dialog: MatDialog) {
    this._subs = new Subscription();
  }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagsRestService.getTagsLG().subscribe(tags => {
      this.tags = tags;
      this.cd.detectChanges();
      this.initTable();
    });
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<any>(this.tags);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addTag(name: string): void {
    this._subs.add(this.tagsRestService.postTagLG(JSON.stringify({name: name.trim()})).subscribe(() => this.getTags()));
    this.dialog.closeAll();
  }

  deleteTag(tag: Tag): void {
    this._subs.add(this.tagsRestService.deleteTagLG(tag._id).subscribe(() => this.getTags()));
  }

  updateTag(body: any): void {
    this._subs.add(this.tagsRestService.updateTagLG(JSON.stringify(body)).subscribe(() => this.getTags()));
  }

  openDialog(action: string, tag?: Tag): void {
    this.editTag = tag;
    this.dialog.open(this[action], {minWidth: '300px'});
    this.cd.detectChanges();
  }

  closeModal(tag: any, action?: string): void {
    if (tag) {
      action === 'update' ? this.updateTag(tag) : this.deleteTag(tag);
    }

    this.dialog.closeAll();
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

}
