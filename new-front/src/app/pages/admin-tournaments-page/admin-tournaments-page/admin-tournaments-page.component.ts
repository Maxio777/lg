import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, OnDestroy} from '@angular/core';
import {TournamentLG} from '@models/interfaces';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AdminDataService} from '@core/services/admin-data.service';
import {RestTournamentService} from '@core/rest/tournament-rest-service/rest-tournament.service';
import {MatDialog} from '@angular/material/dialog';
import {SettingsService} from '@core/services/settings/settings.service';

@Component({
  selector: 'lg-admin-tournaments-page',
  templateUrl: './admin-tournaments-page.component.html',
  styleUrls: ['./admin-tournaments-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTournamentsPageComponent implements OnInit, OnDestroy {
  @ViewChild('dialogRef') dialogRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  public dataSource: MatTableDataSource<any> | undefined;
  public displayedColumns: string[] =
    ['index', 'name', 'format', 'dateStart', 'dateEnd', 'current', 'completed', 'action'];
  public fieldsForProcessing: string[] =
    ['completed', 'current', 'dateEnd', 'dateStart', 'format', 'name', '_id'];

  form: FormGroup = this.initForm();
  tournaments: TournamentLG[] = [];
  subs = new Subscription();
  formatOptions: string[];

  constructor(
    private adminDataService: AdminDataService,
    private restTournamentService: RestTournamentService,
    public dialog: MatDialog,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {
    this.getTournamentsLG();
    this.initForm();
    this.getFormatOptions();
  }

  initForm(): FormGroup {
    return new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      format: new FormControl('', [Validators.required]),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
      current: new FormControl(false),
      completed: new FormControl(false)
    });
  }

  getFormatOptions(): void {
    this.subs.add(this.settingsService.settings
      .subscribe(s => this.formatOptions = s && s.formats ? s.formats : []));
  }

  onEdit(tournament: TournamentLG): void {
    this.setFormValue(tournament);
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(this.dialogRef, {width: '450px', maxWidth: '90%'});
  }

  setFormValue(tournament: TournamentLG): void {
    this.fieldsForProcessing
      .forEach(field => this.form.controls[field].setValue(tournament[field]));
  }

  onClose(): void {
    this.dialog.closeAll();
    this.form.reset();
  }

  onSave(): void {
    if (this.form.controls._id.value) {
      this.updateTournament();
    } else {
      this.createTournament();
    }
  }

  onAdd(): void {
    this.openDialog();
  }

  onDelete(id: string): void {
    this.restTournamentService.deleteTournamentsLG(id)
      .subscribe(() => this.getTournamentsLG());
  }

  initTable(): void {
    this.dataSource = new MatTableDataSource<any>(this.tournaments);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  createTournament(): void {
    const data = this.form.getRawValue();
    delete data._id;
    return this.restTournamentService.postTournamentLG(data)
      .subscribe(() => this.getTournamentsLG(),
        error => console.log(error)
      );
  }

  getTournamentsLG(): void {
    this.subs.add(this.restTournamentService.getTournamentLG().subscribe(tournaments => {
      this.tournaments = tournaments;
      this.initTable();
    }));
  }

  updateTournament(): void | Subscription {
    return this.restTournamentService.updateTournamentLG(JSON.stringify({_id: this.form.value.id, ...this.form.value}))
      .subscribe(() => this.getTournamentsLG());
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
