import { Component } from '@angular/core';

import {PlaylistService} from "../../service/playlist/playlist.service";

import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Playlist} from "../../model/playlist";
import {Song} from "../../model/song";
import {SongService} from "../../service/song/song.service";


declare var Swal: any;

@Component({
  selector: 'app-listsong-in-one-playlist',
  templateUrl: './listsong-in-one-playlist.component.html',
  styleUrls: ['./listsong-in-one-playlist.component.css']
})
export class ListsongInOnePlaylistComponent {
  // @ts-ignore
  idPlaylist: number;
  songs: Song[] = [];


  constructor(private playlistService: PlaylistService,
              private songService: SongService) {

  }

  ngOnInit(): void {
    this.getAll;
  }

  getSongsInPlaylist(id: any) {

  }
  // songInPlaylist(id: number) {
  //   return this.playlistService.getById(id).subscribe(playlist => {
  //     this.playlistForm = new FormGroup({
  //       id: new FormControl(playlist.id),
  //     })
  //   })
  // }
  getAll() {
    this.playlistService.getAll().subscribe(playlist => {
    });
  }
  delete(id: any) {
    if (confirm('Bạn có muốn xóa?')) {
      this.songService.delete(id).subscribe(data => {
        console.log(data)
        alert("Ok");
        this.getAll()
      }, e => {
        console.error(e)
      });
    }
  }
}
