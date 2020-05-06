import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileUploadComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef | null = null;
  @Input() kind = '';
  @Input() _id = '';
  image: File | undefined = undefined;
  url = '';

  @Output() file = new EventEmitter<File>();

  constructor(
    // private http: HttpClient
  ) { }

  ngOnInit() {}

  selectImage(event: any) {
    if (event.target.files.length) {
      this.file.emit(event.target.files[0]);
    }
  }

  onSubmit() {
    if (this.inputRef) {
      this.inputRef.nativeElement.click();
    }



    // const formData = new FormData();
    // formData.append('image', this.image, this.image.name);
    //
    // this.http.put(`http://127.0.0.1:5000/api/v1/admin/upload/${this.kind}/${this._id}`, formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }

}
