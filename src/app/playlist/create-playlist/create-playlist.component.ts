import { Component } from '@angular/core';
import {PlaylistService} from "../../service/playlist/playlist.service";
import {UserService} from "../../service/user/user.service";
import {HttpService} from "../../service/http-service.service";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

declare var Swal: any;

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent {
  downloadImgURL ?: Observable<string>;
  avatar?: string;

  constructor(private playlistService: PlaylistService,
              private userService: UserService,
              private httpService: HttpService,
              private tokenService: TokenStorageService,
              private storage: AngularFireStorage,
  ) {
  }
  ngOnInit():void {
  }
  playlistForm: FormGroup = new FormGroup({
    name: new FormControl(),
    avatar: new FormControl(),
    timeCreate:new FormControl(),
    lastTimeEdit:new FormControl()
  })

  savePlaylist() {

    const playlist = {
      name: this.playlistForm.value.name,
      avatar: this.avatar,
      timeCreate: this.playlistForm.value.timeCreate,
      lastTimeEdit: this.playlistForm.value.lastTimeEdit
    };
    const idUser = this.tokenService.getUser().id;
    // @ts-ignore
    this.playlistService.save(playlist, idUser).subscribe(() => {
    });
    this.playlistForm.reset();
    window.location.reload()
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
            // this.songForm.patchValue({avatar: url});
            this.avatar = url;
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Upload thành công',
          showConfirmButton: false,
          timer: 1000
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
