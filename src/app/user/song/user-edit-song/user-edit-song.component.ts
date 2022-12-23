import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {SongService} from "../../../service/song/song.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {finalize} from "rxjs/operators";
import * as moment from "moment/moment";
declare var Swal: any;

@Component({
  selector: 'app-user-edit-song',
  templateUrl: './user-edit-song.component.html',
  styleUrls: ['./user-edit-song.component.css']
})
export class UserEditSongComponent {
  // @ts-ignore
  id: number;
  songForm!: FormGroup;
  downloadImgURL ?: Observable<string>;
  downloadMp3URL ?: Observable<string>;
  fileMp3: any;
  avatar: any;

  constructor(private songService: SongService, private storage: AngularFireStorage, private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    // this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
    //   // @ts-ignore
    //   this.id = +paraMap.get('id');
    //   this.getSong(this.id);
    // })
  }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group(
      {
        id: [''],
        name: [''],
        describeSong: [''],
        avatar: [''],
        fileMp3: ['']
      });
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      // @ts-ignore
      this.id = +paraMap.get('id');
      // this.getSong(this.id);
    })
      this.songService.getById(this.id).subscribe(song => {
        // this.songForm = new FormGroup({
        //   id: new FormControl(song.id),
        //   name: new FormControl(song.name),
        //   describeSong: new FormControl(song.describeSong),
        //   avatar: new FormControl(),
        //   fileMp3: new FormControl(),
        // })
        this.songForm.patchValue(song)
      })
    }


  getSong(id: number) {
    return this.songService.getById(id).subscribe(song => {
      this.songForm = new FormGroup({
        id: new FormControl(song.id),
        name: new FormControl(song.name),
        describeSong: new FormControl(song.describeSong),
        avatar: new FormControl(song.avatar),
        fileMp3: new FormControl(song.fileMp3),
      })
    })
  }

  sendToFirebaseImg() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `file_img/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`file_img/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadImgURL = fileRef.getDownloadURL();
        this.downloadImgURL.subscribe(url => {
          if (url) {
            this.songForm.patchValue({avatar: url});
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Tải lên thành công',
          showConfirmButton: true,
          timer: 5000
        });
      })
    )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      })
  }

  sendToFirebaseMp3() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `file_mp3/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`file_mp3/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadMp3URL = fileRef.getDownloadURL();
        this.downloadMp3URL.subscribe(url => {
          if (url) {
            this.songForm.patchValue({fileMp3: url});
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Tải lên thành công',
          showConfirmButton: true,
          timer: 5000
        });
      })
    )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      })
  }

  update() {
    const now = new Date();
    const date = moment(now).format('yyyy-MM-DD');
    const song = {
      id: this.songForm.value.id,
      name: this.songForm.value.name,
      describeSong: this.songForm.value.describeSong,
      fileMp3: this.songForm.value.fileMp3,
      avatar: this.songForm.value.avatar,
      lastTimeEdit: date
    };
    this.songService.update(song.id, song).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cập nhât thành công',
        showConfirmButton: true,
        timer: 5000
      });
    })
  }
}
