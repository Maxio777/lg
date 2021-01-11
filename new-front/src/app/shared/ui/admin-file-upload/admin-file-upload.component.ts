import {Component, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output} from '@angular/core';

@Component({
  selector: 'lg-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileUploadComponent {
  @ViewChild('input') inputRef: ElementRef | null = null;
  @Input() kind = '';
  @Input() _id = '';
  image: File | undefined = undefined;
  url = '';

  @Output() file = new EventEmitter<File>();

  selectImage(event: any): void {
    if (event.target.files.length) {
      this.file.emit(event.target.files[0]);
    }
  }

  onSubmit(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.click();
    }
  }

}
