import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../../../service/upload-file.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  // @ts-ignore
  fileUploads: any[];

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.uploadService.getFileUpload(6).snapshotChanges().pipe(
      map(changes =>
        // @ts-ignore
        changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe((fileUploads: any[]) => {
      this.fileUploads = fileUploads;
    });
  }

}
