import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Input, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PlayerAdmin} from '../../../models/interfaces';
import {Subscription} from 'rxjs';
import {RestPlayersService} from '../../../rest/rest-players/rest-players.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.scss']
})
export class AdminPlayerComponent implements OnInit, OnDestroy {
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
  selectedPlayerId: string = '';
  players: PlayerAdmin[] = [];
  teams: any;
  dataSource: MatTableDataSource<PlayerAdmin> | null = null;
  displayedColumns: string[] = ['_id', 'img', 'lastName', 'firstName', 'middleName', 'birthday', 'selected'];
  controls = ['_id', 'lastName', 'firstName', 'middleName', 'birthday', 'img'];
  openAdd: boolean = false;
  kind = 'player';

  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private restPlayersService: RestPlayersService,
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
    this.delRef.id = id;
    this.dialog.open(this.delRef);
  }

  closeModal() {
    this.dialog.closeAll();
    this.form.reset();
    this.form.markAsUntouched();
    this.image = null;
    this.imagePreview = '';
  }

  setImage(image: File) {
    this.image = image;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(image);
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


  cancel() {
    this.openAdd = false;
    this.form.reset();
    this.selectedPlayerId = '';
    this.players.forEach(t => t.selected = false);
  }

  addPlayerLG(): void | Subscription {
    if (this.form.valid) {
      return this.sub.add(this.restPlayersService.postPlayerLG(this.form.value).subscribe((data: any) => {
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
      return this.sub.add(this.restPlayersService
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

  deletePlayerLG(id: string) {
    if (id) {
      this.restPlayersService.deletePlayerLG(id).subscribe(() => {
        this.closeModal();
        this.form.reset();
        this.getPlayerLG();
      });
    }
  }

  getPlayerLG() {
    return this.restPlayersService.getPlayerLG()
      .subscribe(players => {
        this.players = players.reverse();
        this.initTable();
        this.cd.detectChanges();
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
