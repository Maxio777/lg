import {Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder = 'Поиск';
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl();

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(searchStr => {
      this.search.emit(searchStr);
    });
  }

  clearInp() {
    this.searchControl.setValue('');
    this.search.emit('');
  }
}
