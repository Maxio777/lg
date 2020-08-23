import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { RestTournamentsService } from '../../../rest/rest-tournaments/rest-tournaments.service';
import { TournamentLG } from '../../../models/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-tournament',
  templateUrl: './admin-tournament.component.html',
  styleUrls: ['./admin-tournament.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTournamentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  public dataSource: MatTableDataSource<any> | undefined;
  public displayedColumns: string[] =
    ['index', 'name', 'dateStart', 'dateEnd', 'action'];

  form: FormGroup = this.initForm();
  tournaments: TournamentLG[] = [];
  currentTournamentId: string = '';
  openAdd: boolean = false;

  constructor(
    private restTournamentsService: RestTournamentsService
  ) { }

  ngOnInit() {
    this.getTournamentsLG();
    this.initForm();
  }

  initForm() {
    return  new FormGroup({
      name: new FormControl('', [Validators.required]),
      dateStart: new FormControl(''),
      dateEnd: new FormControl('')
    });
  }

  initTable() {
    this.dataSource = new MatTableDataSource<any>(this.tournaments);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  addTournamentLG() {
    if (this.form.valid) {
      return this.restTournamentsService.postTournamentLG(this.form.value)
        .subscribe(() => this.getTournamentsLG(),
        error => console.log(error)
      );
    }
    return;
  }

  openADD() {
    this.openAdd = true;
    this.currentTournamentId = '';
    this.tournaments.forEach(t => t.selected = false);
  }

  cancel() {
    this.openAdd = false;
    this.form.reset();
    this.currentTournamentId = '';
    this.tournaments.forEach(t => t.selected = false);
  }

  getTournamentsLG() {
    return this.restTournamentsService.getTournamentLG()
      .pipe(map(tournaments => tournaments.map((tournament: TournamentLG) => {
        tournament.selected = false;
        return tournament;
      })))
      .subscribe((tournaments: TournamentLG[]) => {
        this.tournaments = tournaments;
        this.initTable();
      });
  }

  deleteTournamentLG(id: string): void {
    this.restTournamentsService.deleteTournamentsLG({_id: id})
      .subscribe(() => this.getTournamentsLG());
  }

  updateTournamentLG(): void | Subscription {
    return this.restTournamentsService.updateTournamentLG(JSON.stringify({ _id: this.currentTournamentId, ...this.form.value}))
      .subscribe(() => this.getTournamentsLG());
  }

  offOtherCheckAndSetData(id: string, selected: boolean) {
    if (selected) {
      this.openAdd = false;
      const selectTournament = this.tournaments.filter( (tournament: TournamentLG) => tournament._id === id );
      this.tournaments.filter((tournament: TournamentLG) => tournament._id !== id).forEach(t => t.selected = false);
      this.currentTournamentId = selectTournament[0]._id;
      this.form.controls.name.setValue(selectTournament[0].name);
      this.form.controls.dateStart.setValue(selectTournament[0].dateStart);
      this.form.controls.dateEnd.setValue(selectTournament[0].dateEnd);
    } else {
      this.currentTournamentId = '';
      this.form.reset();
    }
}

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  filterTournament(id: string) {
    return this.tournaments.filter((t: TournamentLG) => t._id === id);
  }
}
