import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import * as moment from "moment/moment";
import {SongService} from "../../../service/song/song.service";
import {UserService} from "../../../service/user/user.service";
import {HttpService} from "../../../service/http-service.service";
import {TokenStorageService} from "../../../security/service/token-storage.service";

declare var Swal: any;

@Component({
  selector: 'app-user-create-song',
  templateUrl: './user-create-song.component.html',
  styleUrls: ['./user-create-song.component.css']
})
export class UserCreateSongComponent implements OnInit {
  downloadImgURL ?: Observable<string>;
  downloadMp3URL ?: Observable<string>;
  fileMp3?: string;
  avatar?: string;

  constructor(private songService: SongService,
              private userService: UserService,
              private httpService: HttpService,
              private tokenService: TokenStorageService,
              private storage: AngularFireStorage,) {
  }

  ngOnInit(): void {
  }

  songForm: FormGroup = new FormGroup({
    name: new FormControl(),
    describeSong: new FormControl(),
    fileMp3: new FormControl(),
    avatar: new FormControl(),
    viewSong: new FormControl(),
    timeCreate: new FormControl(),
  })

  saveSong() {
    const now = new Date();
    const dateConvert = moment(now).format('yyyy-MM-DD');
    const view = 0;
    const song = {
      name: this.songForm.value.name,
      describeSong: this.songForm.value.describeSong,
      fileMp3: this.fileMp3,
      avatar: this.avatar,
      viewSong: view,
      timeCreate: this.songForm.value.timeCreate,
      dateCreateSong: dateConvert
    };
    const idUser = this.tokenService.getUser().id;
    this.songService.save(song, idUser).subscribe(() => {
    });
    Swal.fire({
      icon: 'success',
      title: 'Thêm thành công',
      showConfirmButton: true,
      timer: 5000
    });
    this.songForm.reset();
  }

  sendToFirebaseImg() {
    let n = Date.now();
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
            // this.songForm.patchValue({avatar: url});
            this.avatar = url;
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
    // sleep(3000);
    // alert('upload thành công')
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadMp3URL = fileRef.getDownloadURL();
        this.downloadMp3URL.subscribe(url => {
          if (url) {
            // this.songForm.patchValue({fileMp3: url});
            this.fileMp3 = url;
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
}

