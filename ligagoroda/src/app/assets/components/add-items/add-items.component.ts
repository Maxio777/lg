import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { PlayerAdmin } from '../../../models/interfaces';

export interface Select {
  selected: boolean;
}

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemsComponent {
  @Input() items: any[] = [];
  @Input() existingItems: any[] = [];
  @Input() editTitle: string = '';
  @Output() submitItems = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();
  candidatesIds: string[] = [];

  getNotSelectedItems = <T extends Select>(_items: T[] ): T[] => _items.filter((item) => !item.selected);
  getSelectedItems = <T extends Select>(_items: T[] ): T[] => _items.filter(item => item.selected);

  constructor(private cd: ChangeDetectorRef) {}

  cancel() {
    this.items.forEach(item => item.selected = false);
    this.candidatesIds = [];
    this.cancelEdit.emit();
  }

  submit() {
    let newItems = this.getSelectedItems(this.getItemsForSelect).concat(this.getNotSelectedItems(this.existingItems));
    newItems = Object.values(newItems.map(item => item._id));
    this.items.forEach(item => item.selected = false);
    this.existingItems.forEach(item => item.selected = false);
    this.submitItems.emit(newItems);
  }

  toggleDelete(item: any) {
    item.selected = !item.selected;
  }

  get getItemsForSelect() {

    if (this.existingItems) {
      return this.items.filter(item => !this.existingItems.find(pl => item._id === pl._id));
    } else {
      return this.items;
    }
  }

  changeSelectPlayer(item: PlayerAdmin) {
    if (item.selected) {
      this.candidatesIds.push(item._id);
    } else {
      const index = this.candidatesIds.findIndex(el => el === item._id);
      this.candidatesIds.splice(index, 1);
    }
    this.cd.detectChanges();

  }

}
