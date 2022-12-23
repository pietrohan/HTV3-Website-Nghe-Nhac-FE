import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../../model/playlist";
import {PlaylistService} from "../../../service/playlist/playlist.service";

@Component({
  selector: 'app-list-like-playlist',
  templateUrl: './list-like-playlist.component.html',
  styleUrls: ['./list-like-playlist.component.css']
})
export class ListLikePlaylistComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit(): void {


    this.playlistService.getAll().subscribe(list => {
      this.playlists = list;
    });
  }
}
