import {Component, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {SongService} from "../../service/song/song.service";
import {SongType} from "../../model/songType";
import {SongTemp} from "../../model/songTemp";
import {Playlist} from "../../model/playlist";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {FormGroup} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {ActivatedRoute} from "@angular/router";


declare var Swal: any;

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {


  playlists: Playlist[] = [];
  playListUser: Playlist[] = [];
  playlistForm!: FormGroup;
  userid?: any;
  p?: number;
  songs: Song[] = [];
  playlist: any;
  constructor(private songService: SongService,
              private playlistService: PlaylistService,
  ) {
  }
  ngOnInit(): void {
    this.userid = window.localStorage.getItem("idUser");
    this.getAll();

  }

  getAll() {
    this.songService.getAll().subscribe(songs => {
      this.songs = songs;
    });
  }


  delete(id: any) {
    this.songService.delete(id).subscribe(data => {
      console.log(data)
      this.getAll()
    }, e => {
      console.error(e)
    });
  }
  // getByUserId() {
  //   this.songService.getByUserId(this.userid).subscribe(playlist => {
  //     console.log("pll uid: " + playlist[0].id)
  //     this.songs = s;
  //   });
  // }

  addSongToAllPlaylist(playlistId: any) {
    // if (confirm('Bạn có muốn thêm vào playlist?')) {
    this.playlistService.addSongToAllPlaylist(playlistId).subscribe(() => {
      // alert("ok")
    });
    Swal.fire({
      icon: 'success',
      title: 'Thêm thành công',
      showConfirmButton: false,
      timer: 1000
    });
  }
}

// }


