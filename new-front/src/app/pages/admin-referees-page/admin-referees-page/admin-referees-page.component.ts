import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {RefereeModel} from '@models/referee/referee-model';
import {RefereesRestService} from '@core/rest/referees-rest-service/referees-rest.service';

@Component({
  selector: 'lg-admin-referees-page',
  templateUrl: './admin-referees-page.component.html',
  styleUrls: ['./admin-referees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRefereesPageComponent implements OnInit, OnDestroy {

  @ViewChild('addRef') addRef: any;
  @ViewChild('editRef') editRef: any;
  @ViewChild('delRef') delRef: any;

  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() display: string[] = [];
  form: FormGroup = this.fb.group({});
  selectedRefereeId = '';
  referees: RefereeModel[] = [];
  teams: any;
  dataSource: MatTableDataSource<RefereeModel> | null = null;
  displayedColumns: string[] = ['_id', 'img', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  controls = ['_id', 'lastName', 'firstName', 'middleName', 'birthday', 'img'];
  openAdd = false;
  kind = 'referee';
  idForDelete = '';

  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private refereesRestService: RefereesRestService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {
    this.initForm();
  }

  openDialogAdd(): void {
    this.dialog.open(this.addRef, {width: '450px', maxWidth: '90%'});
  }

  openDialogEdit(referee: RefereeModel): void {
    this.controls.forEach((control) => this.form.controls[control].setValue(referee[control as keyof RefereeModel]));
    this.dialog.open(this.editRef, {width: '450px', maxWidth: '90%'});
  }

  openDialogDelete(id: string): void {
    this.idForDelete = id;
    this.dialog.open(this.delRef);
  }

  closeModal(): void {
    this.dialog.closeAll();
    this.form.reset();
    this.form.markAsUntouched();
    this.image = null;
    this.imagePreview = '';
    this.idForDelete = '';
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

  initForm(): void {
    this.controls.forEach(control => {
      this.form.addControl(
        control, new FormControl('')
      );
    });
  }

  ngOnInit(): void {
    this.getRefereeLG();
    this.initForm();
  }


  cancel(): void {
    this.openAdd = false;
    this.form.reset();
    this.selectedRefereeId = '';
    this.referees.forEach(t => t.selected = false);
  }

  addRefereeLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.refereesRestService.postRefereeLG(this.form.value).subscribe((data: any) => {
        this.toastr.success(data.message);
        this.closeModal();
        this.getRefereeLG();
      }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  updateRefereeLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.refereesRestService
        .updateRefereeLG({...this.form.value})
        .subscribe((data: any) => {
          this.toastr.success(data.message);
          this.closeModal();
          this.getRefereeLG();
        }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  deleteRefereeLG(id: string): void {

    if (id) {
      this.sub.add(this.refereesRestService.deleteRefereeLG(id).subscribe(() => {
        this.closeModal();
        this.form.reset();
        this.getRefereeLG();
      }));
    }
  }

  getRefereeLG(): Subscription {
    return this.sub.add(this.refereesRestService.getRefereeLG()
      .subscribe(referee => {
        this.referees = referee.reverse();
        this.initTable();
        this.cd.detectChanges();
      }, error => console.log(error)));
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<RefereeModel>(this.referees);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
