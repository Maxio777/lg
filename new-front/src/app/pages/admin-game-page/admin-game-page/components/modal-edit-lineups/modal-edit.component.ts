import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SimpleUser} from '@models/users/simple-user';

@Component({
  selector: 'lg-modal-edit-lineups',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {allItems: SimpleUser[], items: SimpleUser[]}) { }

  ngOnInit(): void {
    this.data.allItems.forEach(p => p.selected = !!this?.data?.items.find(pl => pl?._id === p?._id));
  }

  get result(): SimpleUser[] {
    return this.data?.allItems?.filter(p => p.selected);
  }

}
