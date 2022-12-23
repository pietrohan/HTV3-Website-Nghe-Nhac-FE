import {Component, OnInit} from '@angular/core';
import {Track} from "../../lib/ngx-audio-player/model/track";
import {SongTemp} from "../../model/songTemp";
import {SongService} from "../../service/song/song.service";
import {Playlist} from "../../model/playlist";
import {PlaylistService} from "../../service/playlist/playlist.service";

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{




msaapDisplayTitle = true;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [2,4,6];
msaapDisplayVolumeControls = true;
msaapDisplayRepeatControls = true;
msaapDisplayArtist = false;
msaapDisplayDuration = false;
msaapDisablePositionSlider = true;

// Material Style Advance Audio Player Playlist
msaapPlaylist: Track[] = [

];
  playlists: Playlist[] = [];

  constructor(private songService: SongService,private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.songService.getAll().subscribe(songs => {

      // @ts-ignore
      for (let i = 0; i < songs.length; i++) {
        // @ts-ignore
        let temp : Track={link:songs[i].fileMp3, title: songs[i].name, artist:songs[i].avatar }
        // @ts-ignore
        this.msaapPlaylist.push(temp);
      }
    });
    console.log(this.msaapPlaylist);
    this.playlistService.getAllPlaylistsDescLike().subscribe(list => {
      this.playlists = list;
    });

  }


  onEnded($event: string) {

  }
}
