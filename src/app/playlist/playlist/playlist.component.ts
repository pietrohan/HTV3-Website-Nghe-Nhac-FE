import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../service/playlist/playlist.service";




@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  p?: number;
  userid?: any;

  // audioList: PlaylistTemp[] = [];
  playlist: any;
  songs: any;

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("idUser");
    this.getByUserId();



    this.playlistService.getByUserId(this.userid).subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  showSongInPlaylist(playListId:any){
    this.playlistService.showSongInPlaylist(playListId).subscribe(songs => {
      this.songs = songs;
    });
  }


  getByUserId() {
    this.playlistService.getByUserId(this.userid).subscribe(playlist => {
      console.log("pll uid: "+ playlist[0].id)
      this.playlist = playlist;
    });
  }

  delete(id: any) {
    if (confirm('Bạn có muốn xóa?')) {
      this.playlistService.delete(id).subscribe(data => {
        console.log(data)
        // alert("Ok");
        this.getByUserId()
      }, e => {
        console.error(e)
      });
    }
  }

}



