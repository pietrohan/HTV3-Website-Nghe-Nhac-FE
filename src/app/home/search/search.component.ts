import {Component, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../../service/song/song.service";
import {SongType} from "../../model/songType";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {Playlist} from "../../model/playlist";
import {UserService} from "../../service/user/user.service";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {SongTemp} from "../../model/songTemp";

declare var Swal: any;
@Component({
  selector: 'app-search',
  templateUrl: "./search.component.html",
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  songs: Song[] = [];
  songType: SongType[] = [];
  playlists: Playlist[] = [];
  playListUser: Playlist[] = [];
  name?: string;
  userid: any;
  p?: number;
  pl?: number;



  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private userService: UserService,
              private tokenService: TokenStorageService,
              private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe((params => {
      // @ts-ignore
      this.name = params.name;
      this.getSongByName(this.name);
      this.getPlaylistByName(this.name)
      this.getSongByAuthor(this.name);
      this.getSongBySinger(this.name);
      console.log(this.songs)
    }))
  }


  ngOnInit() {
    const idUser = this.tokenService.getUser().id;
    this.songService.getSongByUser(idUser).subscribe(songs => {
      this.songs = songs;
      // @ts-ignore
      for (let i = 0; i < songs.length; i++) {
        let temp: SongTemp = {url: songs[i].fileMp3, title: songs[i].name, cover: songs[i].avatar}
        // @ts-ignore
        this.audioList.push(temp);
      }
    });
    this.userid = window.localStorage.getItem("idUser");
    this.playlistService.getAll().subscribe(playlist => {
      this.playListUser = playlist;
    });

    this.playlistService.getByUserId(this.userid).subscribe(playlist => {
      this.playListUser = playlist;
    });
  }

  getSongByName(name: string | undefined) {
    this.songService.getByName(name).subscribe(songs => {
      this.songs = songs;
    });
  }
  getPlaylistByName(name:string | undefined){
    this.playlistService.getPlaylistByName(name).subscribe(playlists =>{
      this.playlists = playlists;
    })
  }

  getSongByAuthor(name: string | undefined) {
    this.songService.getSongByAuthor(name).subscribe(songs => {
      this.songs = songs;
    })
  }

  getSongBySinger(name: string | undefined) {
    this.songService.getSongBySinger(name).subscribe(songs => {
      this.songs = songs;
      console.log("singer: ", this.songs)
    })
  }
  addSongToPlaylist(playlistId: any, songId: any) {
    // if (confirm('Bạn có muốn thêm vào playlist?')) {
    this.playlistService.addSongToPlaylist(playlistId, songId).subscribe(()=>{
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
