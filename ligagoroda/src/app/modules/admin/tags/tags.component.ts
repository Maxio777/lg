import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {TagsRestService} from '../../../rest/tags-rest/tags-rest.service';
import {Tag} from '../../../models/news';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {initForm} from '../../../core/helpers';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  @ViewChild('updateRef') updateRef: any;
  @ViewChild('deleteRef') deleteRef: any;
  editTag: Tag | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<any> | undefined;
  displayedColumns: string[] =
    ['_id', 'name', 'action'];
  tags: Tag[] = [];
  form: FormGroup = initForm(this.displayedColumns);

  constructor(private tagsRestService: TagsRestService, private cd: ChangeDetectorRef, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagsRestService.getTagsLG().subscribe(tags => {
      this.tags = tags;
      this.cd.detectChanges();
      this.initTable();
    });
  }

  initTable() {
    this.dataSource = new MatTableDataSource<any>(this.tags);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addTag(name: string) {
    this.tagsRestService.postTagLG(JSON.stringify({name: name.trim()})).subscribe(() => this.getTags());
  }

  deleteTag(tag: Tag) {
    this.tagsRestService.deleteTagLG(tag._id).subscribe(() => this.getTags());
  }

  updateTag(body: any) {
    return this.tagsRestService.updateTagLG(JSON.stringify(body)).subscribe(() => this.getTags());
  }

  openDialog(tag: Tag, action?: string): void {
    this.editTag = tag;
    this.dialog.open(action === 'update' ? this.updateRef : this.deleteRef);
    this.cd.detectChanges();
  }

  closeModal(tag: any, action?: string) {
    if (tag) {
      action === 'update' ? this.updateTag(tag) : this.deleteTag(tag);
    }

    this.dialog.closeAll();
  }

  applyFilter(filterValue: string): void {
    console.log(filterValue);
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
