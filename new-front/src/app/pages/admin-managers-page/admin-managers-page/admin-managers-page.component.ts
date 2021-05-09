import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ManagersRestService} from '@core/rest/managers-rest-service/managers-rest.service';
import {ManagersModel} from '@models/managers/managers-model';

@Component({
  selector: 'lg-admin-managers-page',
  templateUrl: './admin-managers-page.component.html',
  styleUrls: ['./admin-managers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManagersPageComponent implements  OnInit, OnDestroy {

  @ViewChild('addRef') addRef: any;
  @ViewChild('editRef') editRef: any;
  @ViewChild('delRef') delRef: any;

  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() display: string[] = [];
  form: FormGroup = this.fb.group({});
  selectedManagerId = '';
  managers: ManagersModel[] = [];
  teams: any;
  dataSource: MatTableDataSource<ManagersModel> | null = null;
  displayedColumns: string[] = ['_id', 'img', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  controls = ['_id', 'lastName', 'firstName', 'middleName', 'birthday', 'img'];
  openAdd = false;
  kind = 'managers';
  idForDelete = '';

  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private managersRestService: ManagersRestService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {
    this.initForm();
  }

  openDialogAdd(): void {
    this.dialog.open(this.addRef, {width: '450px', maxWidth: '90%'});
  }

  openDialogEdit(managers: ManagersModel): void {
    this.controls.forEach((control) => this.form.controls[control].setValue(managers[control as keyof ManagersModel]));
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
    this.getManagers();
    this.initForm();
  }


  cancel(): void {
    this.openAdd = false;
    this.form.reset();
    this.selectedManagerId = '';
    this.managers.forEach(t => t.selected = false);
  }

  addManagers(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.managersRestService.postManager(this.form.value).subscribe((data: any) => {
        this.toastr.success(data.message);
        this.closeModal();
        this.getManagers();
      }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  updateManagers(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.managersRestService
        .updateManager({...this.form.value})
        .subscribe((data: any) => {
          this.toastr.success(data.message);
          this.closeModal();
          this.getManagers();
        }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  deleteManagers(id: string): void {

    if (id) {
      this.sub.add(this.managersRestService.deleteManager(id).subscribe(() => {
        this.closeModal();
        this.form.reset();
        this.getManagers();
      }));
    }
  }

  getManagers(): Subscription {
    return this.sub.add(this.managersRestService.getManager()
      .subscribe(managers => {
        this.managers = managers.reverse();
        this.initTable();
        this.cd.detectChanges();
      }, error => console.log(error)));
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<ManagersModel>(this.managers);
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
