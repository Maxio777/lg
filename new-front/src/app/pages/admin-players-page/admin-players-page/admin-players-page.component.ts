import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {PlayerAdmin} from '@models/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {PlayersRestService} from '@core/rest/players-rest-service/players-rest.service';
import {log} from 'util';

@Component({
  selector: 'lg-admin-players-page',
  templateUrl: './admin-players-page.component.html',
  styleUrls: ['./admin-players-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPlayersPageComponent implements OnInit, OnDestroy {
  @ViewChild('addRef') addRef: any;
  @ViewChild('editRef') editRef: any;
  @ViewChild('delRef') delRef: any;

  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // @Input() data: string[] = [];
  @Input() display: string[] = [];
  form: FormGroup = this.fb.group({});
  isShowButton: boolean | undefined;
  selectedPlayerId = '';
  players: PlayerAdmin[] = [];
  teams: any;
  dataSource: MatTableDataSource<PlayerAdmin> | null = null;
  displayedColumns: string[] = ['_id', 'img', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  controls = ['_id', 'lastName', 'firstName', 'middleName', 'birthday', 'img'];
  openAdd = false;
  kind = 'player';
  idForDelete = '';

  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private playersRestService: PlayersRestService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {
    this.initForm();
  }

  openDialogAdd(): void {
    this.dialog.open(this.addRef, {width: '450px', maxWidth: '90%'});
  }

  openDialogEdit(player: PlayerAdmin): void {
    this.controls.forEach((control) => this.form.controls[control].setValue(player[control as keyof PlayerAdmin]));
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
    this.getPlayerLG();
    this.initForm();
  }


  cancel(): void {
    this.openAdd = false;
    this.form.reset();
    this.selectedPlayerId = '';
    this.players.forEach(t => t.selected = false);
  }

  addPlayerLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.playersRestService.postPlayerLG(this.form.value).subscribe((data: any) => {
        this.toastr.success(data.message);
        this.closeModal();
        this.getPlayerLG();
      }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  updatePlayerLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.playersRestService
        .updatePlayer({...this.form.value}, this.image, this.kind, this.form.controls._id.value)
        .subscribe((data: any) => {
          this.toastr.success(data.message);
          this.closeModal();
          this.getPlayerLG();
        }));
    } else {
      alert('Проверьте пожалуйста введенные данные и попробуйте еще раз.');
    }
  }

  deletePlayerLG(id: string): void {

    if (id) {
      this.sub.add(this.playersRestService.deletePlayerLG(id).subscribe(() => {
        this.closeModal();
        this.form.reset();
        this.getPlayerLG();
      }));
    }
  }

  getPlayerLG(): Subscription {
    return this.sub.add(this.playersRestService.getPlayerLG()
      .subscribe(players => {
        this.players = players.reverse();
        this.initTable();
        this.cd.detectChanges();
      }, error => console.log(error)));
  }


  initTable(): void {
    this.dataSource = new MatTableDataSource<PlayerAdmin>(this.players);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
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
