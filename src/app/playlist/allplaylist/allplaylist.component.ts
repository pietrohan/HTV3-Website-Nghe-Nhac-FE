import {Component} from "@angular/core";
import {Playlist} from "../../model/playlist";
import {FormGroup} from "@angular/forms";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {UserService} from "../../service/user/user.service";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {Song} from "../../model/song";
import {SongService} from "../../service/song/song.service";


@Component({
  selector: 'app-allplaylist',
  templateUrl: './allplaylist.component.html',
  styleUrls: ['./allplaylist.component.css']
})
export class AllplaylistComponent {

  playlists: Playlist[] = [];
  playListUser: Playlist[] = [];
  playlistForm!: FormGroup;
  userid?: any;
  p?: number;
  songs: Song[] = [];
  playlist: any;
  constructor(private playlistService: PlaylistService,
            ) {
  }
  ngOnInit(): void {
    this.userid = window.localStorage.getItem("idUser");
    this.getAll();
    this.getByUserId();
    this.playlistService.getByUserId(this.userid).subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  getAll() {
    this.playlistService.getAll().subscribe(playlist => {
      this.playlists = playlist;
    });
  }
  showSongInPlaylist(playListId:any){
    this.playlistService.showSongInPlaylist(playListId).subscribe(songs => {
      this.songs = songs;
    });
  }


  delete(id: any) {
    this.playlistService.delete(id).subscribe(data => {
      console.log(data)
      this.getAll()
    }, e => {
      console.error(e)
    });
  }
  getByUserId() {
    this.playlistService.getByUserId(this.userid).subscribe(playlist => {
      console.log("pll uid: " + playlist[0].id)
      this.playlist = playlist;
    });
  }
}
