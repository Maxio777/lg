import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
// import { FileUploadService } from '../../../../rest/file-upload/file-upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileUploadComponent implements OnInit {
  @Input() kind = '';
  @Input() _id = '';
  image: Blob = new Blob();
  url = '';

  constructor(
    private http: HttpClient,
    // private fileUploadService: FileUploadService
    // private toastr: ToastrService,
    // private fileUploadService: FileUploadService,
  ) { }

  ngOnInit() {}

  selectImage(event: any) {
    if (event.target.files.length) {
      this.image = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.image);

    this.http.put(`http://127.0.0.1:5000/api/v1/admin/upload/${this.kind}/${this._id}`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
