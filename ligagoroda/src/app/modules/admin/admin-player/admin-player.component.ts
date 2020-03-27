import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlayerAdmin } from '../../../models/interfaces';
import { Subscription } from 'rxjs';
import { RestPlayersService } from '../../../rest/rest-players/rest-players.service';
import { filter } from 'rxjs/operators';
import { AdminDataService } from '../services/admin-data/admin-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.scss']
})
export class AdminPlayerComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() data: string[] = [];
  @Input() display: string[] = [];
  form: FormGroup = this.fb.group({});
  isShowButton: boolean | undefined;
  selectedPlayerId: string = '';
  players: PlayerAdmin[] = [];
  teams: any;
  dataSource: MatTableDataSource<PlayerAdmin> | null = null;
  displayedColumns: string[] = ['_id', 'image', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  controls = ['lastName', 'firstName', 'middleName', 'birthday'];
  openAdd: boolean = false;
  kind = 'player';

  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private restPlayersService: RestPlayersService,
    private adminDataService: AdminDataService,
    private toastr: ToastrService,
  ) {
    this.initForm();
  }

  initForm() {
    this.controls.forEach(control => {
        this.form.addControl(
          control, new FormControl('')
        );
      });
  }

  ngOnInit() {
    this.getPlayerLG();
    this.initForm();
  }

  openADD() {
    this.openAdd = true;
    this.selectedPlayerId = '';
    this.players.forEach(t => t.selected = false);
    this.form.reset();
  }

  cancel() {
    this.openAdd = false;
    this.form.reset();
    this.selectedPlayerId = '';
    this.players.forEach(t => t.selected = false);
  }

  offOtherCheck(_id: string, selected: boolean) {
    this.isShowButton = selected;
    if (this.players && this.players.length) {
      const players = this.players.filter(player => player._id !== _id);
      players.forEach(player => player.selected = false);
    }

    if (selected) {
      this.openAdd = false;
      this.selectedPlayerId = _id;
      const currentPlayer: any = this.players.find(play => play._id === _id);
      if (this.form) {
        this.controls.forEach(control => {
          this.form.controls[control].setValue(currentPlayer[control]);
        });
      }
    } else {
      this.selectedPlayerId = '';
      this.form.reset();
    }
  }

  addPlayerLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.restPlayersService.postPlayerLG(this.form.value).subscribe((data: any) => {
        this.toastr.success(data.message);
        this.adminDataService.getPlayers().subscribe();
        this.form.reset();
      }));
    } else {alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.'); }
  }

  updatePlayerLG(_id: string): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.restPlayersService.updatePlayerLG({_id, ...this.form.value}).subscribe(() => {
        this.getPlayerLG();
        this.form.reset();
      }));
    } else {alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.'); }
  }

  deletePlayerLG() {
    if (this.selectedPlayerId) {
      this.restPlayersService.deletePlayerLG(this.selectedPlayerId).subscribe(() => {
        this.form.reset();
        this.selectedPlayerId = '';
        this.isShowButton = false;
        this.getPlayerLG();
      });
    }
  }

  getPlayerLG() {
    return this.adminDataService.getPlayers$().pipe(
      filter((players: PlayerAdmin[]) => players.length > 0))
      .subscribe(data => {
      this.players = data;
      this.initTable();
    }, error => console.log(error));
  }



  initTable() {
    this.dataSource = new MatTableDataSource<PlayerAdmin>(this.players);
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
