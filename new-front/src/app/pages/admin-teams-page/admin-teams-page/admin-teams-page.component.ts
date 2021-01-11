import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TeamsRestService} from '@core/rest/teams-rest-service/teams-rest.service';
import {map} from 'rxjs/operators';
import {TeamLG} from '@models/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Tag} from '@models/tag';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lg-admin-teams-page',
  templateUrl: './admin-teams-page.component.html',
  styleUrls: ['./admin-teams-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTeamsPageComponent implements OnInit, OnDestroy {
  @ViewChild('addRef') addRef: any;
  @ViewChild('deleteRef') deleteRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  _subs: Subscription;
  teams: TeamLG[] = [];
  dataSource: MatTableDataSource<TeamLG>;
  displayedColumns: string[] = ['name', 'action'];
  form: FormGroup;
  currentTeam;

  constructor(
    private teamsRestService: TeamsRestService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required)
    });
    this._subs = new Subscription();
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamsRestService.getTeams()
      .subscribe((teams: TeamLG[]) => {
        this.teams = teams;
        this.initTable();
      });
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<TeamLG>(this.teams);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cd.detectChanges();
  }

  openDialog(action: string, team?: any): void {
    this.dialog.open(this[action], {minWidth: '300px'});
    this.cd.detectChanges();
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onAdd(): void {
    const modal = this.dialog.open(this.addRef, {minWidth: '300px'});
    modal.afterClosed().subscribe(nameTeam => {
      if (nameTeam) {
        this.addTeam(nameTeam);
      }
    });
  }

  addTeam(name: string): void {
    console.log(name);
    this._subs.add(this.teamsRestService.postTeam(JSON.stringify({name})).subscribe(() => this.getTeams()));
  }

  onDelete(team: TeamLG): void {
    const modal = this.dialog.open(this.deleteRef, {minWidth: '300px', data: {name: team.name}});
    modal.afterClosed().subscribe(isDelete => {
      if (isDelete) {
        this.deleteTeam(team._id);
      }
    });
  }

  deleteTeam(id): void {
    this._subs.add(this.teamsRestService.deleteTeam(id).subscribe(() => this.getTeams()));
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
