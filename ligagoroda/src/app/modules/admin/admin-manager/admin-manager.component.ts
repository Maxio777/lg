import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {RestManagerService} from '../../../rest/rest-manager/rest-manager.service';
import {ManagerLG} from '../../../models/manager';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  form: FormGroup = this.initForm();
  isShowButton: boolean | undefined;
  selectedManagerId: string = '';
  managers: ManagerLG[] = [];
  teams: any;
  dataSource: MatTableDataSource<any> | undefined;
  openAdd: boolean = false;
  displayedColumns: string[] =
    ['_id', 'image', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];

  private sub: Subscription = new Subscription();

  constructor(
    private restManagerService: RestManagerService,
  ) {
  }

  ngOnInit() {
    this.getManagerLG();
    this.initForm();
  }

  cancel() {
    this.openAdd = false;
    this.reset();
  }

  reset() {
    this.form.reset();
    this.selectedManagerId = '';
    this.managers.forEach(r => r.selected = false);
  }

  openADD() {
    this.openAdd = true;
    this.reset();
  }

  offOtherCheck(_id: string, selected: boolean) {
    this.isShowButton = selected;
    let managers;
    if (this.managers && this.managers.length) {
      managers = this.managers.filter(manager => manager._id !== _id);
      for (const manager of managers) {
        if (manager.selected) {
          manager.selected = false;
        }
      }
    }

    if (selected) {
      this.selectedManagerId = _id;
      const currentManager = this.managers.filter(play => play._id === _id)[0];
      if (this.form) {
        this.form.controls.firstName.setValue(currentManager.firstName);
        this.form.controls.lastName.setValue(currentManager.lastName);
        this.form.controls.middleName.setValue(currentManager.middleName);
        this.form.controls.birthday.setValue(currentManager.birthday);
      }
    } else {
      this.selectedManagerId = '';
      this.form.reset();
    }

  }

  initForm() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      birthday: new FormControl(''),
    });
  }


  addManagerLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.restManagerService.postManagerLG(this.form.value).subscribe(() => {
        this.getManagerLG();
        this.form.reset();
      }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  updateManagerLG(_id: string): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.restManagerService.updateManagerLG({_id, ...this.form.value}).subscribe(() => {
        this.getManagerLG();
        this.form.reset();
      }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  deleteManagerLG() {
    if (this.selectedManagerId) {
      this.restManagerService.deleteManagerLG(this.selectedManagerId).subscribe(() => {
        this.form.reset();
        this.selectedManagerId = '';
        this.isShowButton = false;
        this.getManagerLG();
      });
    }
  }

  getManagerLG() {
    return this.restManagerService.getManagerLG().subscribe(data => {
        this.managers = data;
        for (const manager of this.managers) {
          manager.selected = false;
        }
        this.initTable();
      }, error => console.log(error)
    );
  }


  initTable() {
    this.dataSource = new MatTableDataSource<any>(this.managers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    if (filterValue === '- Амплуа -') {
      filterValue = '';
    }
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
