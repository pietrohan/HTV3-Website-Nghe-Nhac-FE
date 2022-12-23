import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../../../service/playlist/playlist.service";
import {Playlist} from "../../../model/playlist";
import {SongService} from "../../../service/song/song.service";
import {Song} from "../../../model/song";

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {
  p?: number;
  p2?: number;
  songs: Song[] = [];
  playlists: Playlist[] = [];



  constructor(private songService: SongService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.songService.getAll().subscribe(song => {
      this.songs = song;
      console.log(this.songs)
    });
    this.playlistService.getAll().subscribe(list => {
      this.playlists = list;
    });
  }
}
