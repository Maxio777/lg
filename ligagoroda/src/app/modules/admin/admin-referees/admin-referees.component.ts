import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Referee } from '../../../models/interfaces';
import { RestRefereeService } from '../../../rest/rest-referee/rest-referee.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-referees',
  templateUrl: './admin-referees.component.html',
  styleUrls: ['./admin-referees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRefereesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  referees: Referee[] = [];
  currentRefereeId: string = '';
  controls: string[] = ['lastName', 'firstName', 'middleName', 'birthday'];
  dataSource: MatTableDataSource<any> | undefined;
  displayedColumns: string[] = ['_id', 'image', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  openAdd: boolean = false;
  isShowButton: boolean = false;
  form: FormGroup = this.initForm();


  constructor(private restRefereeService: RestRefereeService, private cd: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.getRefereeLG();
  }

  openADD() {
    this.openAdd = true;
    this.currentRefereeId = '';
    this.referees.forEach(t => t.selected = false);
    this.form.reset();
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  offOtherCheck(_id: string, selected: boolean) {
    this.isShowButton = selected;
    if (this.referees && this.referees.length) {
      const players = this.referees.filter(referee => referee._id !== _id);
      players.forEach(player => player.selected = false);
    }

    if (selected) {
      this.openAdd = false;
      this.currentRefereeId = _id;
      const currentReferee: any = this.referees.find(referee => referee._id === _id);
      if (this.form) {
        this.controls.forEach(control => {
          this.form.controls[control].setValue(currentReferee[control]);
        });
      }
    } else {
      this.currentRefereeId = '';
      this.form.reset();
    }
  }


  initForm() {
    const form = this.fb.group({});
    this.controls.forEach(name => form.addControl(name, new FormControl('')));
    return form;
  }


  addRefereeLG() {
      return this.restRefereeService.postRefereeLG(JSON.stringify(this.form.value)).subscribe(() => {
          this.getRefereeLG();
        },
        error => console.log(error)
      );
  }

  cancel() {
    this.openAdd = false;
    this.form.reset();
    this.currentRefereeId = '';
    this.referees.forEach(r => r.selected = false);
  }

  initTable() {
    this.dataSource = new MatTableDataSource<any>(this.referees);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getRefereeLG() {
    return this.restRefereeService.getRefereeLG()
      .pipe(map(referees => referees.map((referee: Referee) => {
        referee.selected = false;
        return referee;
      })))
      .subscribe((referees: Referee[]) => {
        this.referees = referees;
        this.cd.detectChanges();

        this.initTable();
      });
  }

  deleteRefereeLG(id: string): void {
    this.restRefereeService.deleteRefereeLG({_id: id}).subscribe(() => {
      this.getRefereeLG();
    });
  }

  updateRefereeLG(_id: string): void | Subscription {
    return this.restRefereeService.updateRefereeLG(JSON.stringify({ _id, ...this.form.value}))
      .subscribe(() => this.getRefereeLG());
  }

}
