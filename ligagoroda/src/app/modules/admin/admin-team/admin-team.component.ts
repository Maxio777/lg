import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlayerAdmin, TeamLG } from '../../../models/interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestTeamService } from '../../../rest/rest-team/rest-team.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MatAutocomplete, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminDataService } from '../services/admin-data/admin-data.service';
import {ManagerLG} from '../../../models/manager';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTeamComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('selectPL', { static: false }) selectPL: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  private subs: Subscription = new Subscription();
  currentPlayerId: string = '';
  candidatesIds: string[] = [];
  candidatesManagerIds: string[] = [];
  addPlayer: boolean = false;
  addManager: boolean = false;
  isEditTeamName: boolean = false;
  openAdd: boolean = false;
  teams: TeamLG[] = [];
  currentTeam: TeamLG | any;
  currentTeamId: any;
  controls: string[] = ['name'];
  dataSource: MatTableDataSource<TeamLG> | undefined;
  displayedColumns: string[] = ['_id', 'name', 'selected'];
  players: PlayerAdmin[] = [];
  managers: ManagerLG[] = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  // @ts-ignore
  filteredOptions: Observable<PlayerAdmin[]>;
  form: FormGroup = this.initForm();
  filteredPlayersForAdd: PlayerAdmin[] = [];
  filteredManagersForAdd: any;

  kind = 'team';

  arr1 = [
    {
      _name: 'one',
      _lastName: 'oneLastname'
    },
    {
      _name: 'two',
      _lastName: 'twoLastname'
    },
    {
      _name: 'three',
      _lastName: 'threeLastname'
    },
  ];
  arr2 = [
    {
      _name: 'three',
      _lastName: 'threeLastname'
    }
  ];

  constructor(
    private restTeamService: RestTeamService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private adminDataService: AdminDataService
  ) { }

  ngOnInit() {
    this.getTeamLG();
    this.getPlayers();
    this.getManagers();

  }

  public removeCandidate(idx: number) {
    console.log(idx);
    this.cd.detectChanges();
  }

  toggleEditTeamName() {
    this.isEditTeamName = !this.isEditTeamName;
  }

  toggleAddManager() {
    this.addManager = !this.addManager;
  }

  toggleAddPlayer() {
    this.addPlayer = !this.addPlayer;
  }

  getTeamLG() {
    return this.restTeamService.getTeamLG()
      .pipe(map(teams => teams.map((team: TeamLG) => {
        team.selected = false;
        return team;
      })))
      .subscribe((teams: TeamLG[]) => {
        this.teams = teams;

        this.initTable();
      });
  }

  getPlayers() {
    this.subs.add(this.adminDataService.getPlayers$()
      .subscribe((players: PlayerAdmin[]) =>  {
        this.filteredPlayersForAdd = this.players = players;
      } ));
  }

  getManagers() {
    this.subs.add(this.adminDataService.getManagers$()
      .subscribe((managers: ManagerLG[]) => this.filteredManagersForAdd = this.managers = managers));
  }

  initForm() {
    const form = this.fb.group({});
    this.controls.forEach(name => {
      form.addControl(name, new FormControl(
        '', [Validators.required]
      ));
    });
    return form;
  }

  cancel() {
    // this.openAdd = false;
    this.addPlayer = false;
    this.isEditTeamName = false;
    // this.reset();
  }

  reset() {
    this.form.reset();
    this.currentTeamId = '';
    this.teams.forEach(r => r.selected = false);
  }

  openADD() {
    this.isEditTeamName = true;
    this.openAdd = true;
    this.currentTeamId = '';
    this.reset();
    this.addManager = false;
    this.addPlayer = false;
  }

  resetAllChanges() {
    this.candidatesIds = [];
    this.candidatesManagerIds = [];
    this.currentTeamId = '';
    this.currentTeam = undefined;
    this.addPlayer = false;
    this.addManager = false;
    this.isEditTeamName = false;
    this.openAdd = false;
    this.form.reset();
    this.teams.forEach(r => r.selected = false);
  }

  initTable() {
    this.dataSource = new MatTableDataSource<TeamLG>(this.teams);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  changeSelectPlayer(player: PlayerAdmin) {
    if (player.selected) {
      this.candidatesIds.push(player._id);
    } else {
      const index = this.candidatesIds.findIndex(el => el === player._id);
      this.candidatesIds.splice(index, 1);
    }
    this.cd.detectChanges();

  }

  getSelectedPlayers = (): PlayerAdmin[] => this.getPlayersForSelect.filter(player => player.selected);
  getNotSelectedPlayers = (): PlayerAdmin[] => this.getPlayersForSelect.filter(player => !player.selected);

  changeSelectManager(manager: ManagerLG) {
    if (manager.selected) {
      this.candidatesManagerIds.push(manager._id);
    } else {
      const index = this.candidatesManagerIds.findIndex(el => el === manager._id);
      this.candidatesManagerIds.splice(index, 1);
    }
    this.cd.detectChanges();

  }

  offOtherCheck(_team: TeamLG, selected: boolean) {
    console.log(selected);
    if (this.teams && this.teams.length) {
      this.currentTeam = this.teams.find(team => team._id === _team._id);
      const teams = this.teams.filter(team => team._id !== _team._id);
      teams.forEach(team => team.selected = false);
    }

    if (_team.selected) {
      this.openAdd = false;
      this.currentTeamId = _team._id;
      const currentReferee: any = this.teams.find(team => team._id === _team._id);
      if (this.form) {
        this.controls.forEach(control => {
          this.form.controls[control].setValue(currentReferee[control]);
        });
      }
    } else {

      this.resetAllChanges();
    }
  }


  addTeamLG() {

    return this.restTeamService.postTeamLG(JSON.stringify(this.form.value)).subscribe(() => {
        this.getTeamLG();
        this.resetAllChanges();
      },
      error => console.log(error)
    );
  }



  deleteTeamLG(_id: string): void {
    this.restTeamService.deleteTeamLG(_id).subscribe(() => {
      this.getTeamLG();
    });
  }

  updateTeamLG(_id: string): void | Subscription {
    const existManagers = this.currentTeam.managers.map((p: { _id: string; }) => p._id);
    const teamManagersForUpdate = new Set([...existManagers, ...this.candidatesManagerIds]);
    const managers = [...teamManagersForUpdate.values()];

    const existPlayers = this.currentTeam.players.map((p: { _id: string; }) => p._id);
    const teamPlayersForUpdate = new Set([...existPlayers, ...this.candidatesIds]);
    const players = [...teamPlayersForUpdate.values()];
    return this.restTeamService.updateTeamLG(JSON.stringify({ _id: this.currentTeamId, ...this.form.value, players, managers}))
      .subscribe(() => {
        this.candidatesIds = [];
        this.getTeamLG();
        this.addPlayer = false;
        this.reset();
      });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  get getPlayersForSelect(): PlayerAdmin[] {
    return this.players.filter(player => !this.currentTeam.players.find((pl: { _id: string; }) => player._id === pl._id));
  }

  get getManagersForSelect(): PlayerAdmin[] {
    return this.managers.filter(manager => !this.currentTeam.managers.find((mg: { _id: string; }) => manager._id === mg._id));
  }

  filterForAddList(val: string) {
    this.filteredPlayersForAdd = val
      ?  this.getPlayersForSelect.filter(player => (player.firstName + player.lastName + player.middleName)
        .trim().toLowerCase().includes(val.trim().toLowerCase()))
      : this.getPlayersForSelect;
  }


  filterForAddListManager(val: string) {
    this.filteredManagersForAdd = val
      ? this.getManagersForSelect.filter(manager => (manager.firstName + manager.lastName + manager.middleName)
        .trim().toLowerCase().includes(val.trim().toLowerCase()))
      : this.getManagersForSelect;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
