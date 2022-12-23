import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Song} from "../../model/song";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {Playlist} from "../../model/playlist";
import {Commentplaylist} from "../../model/commentplaylist";
import {CommentplaylistService} from "../../service/comment/commentplaylist.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {Track} from "../../lib/ngx-audio-player/model/track";
import {UserService} from "../../service/user/user.service";
import {HttpService} from "../../service/http-service.service";
import * as moment from "moment/moment";

declare var $: any;

@Component({
  selector: 'app-play-playlist',
  templateUrl: './play-playlist.component.html',
  styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {

  id?: number;
  userId?: number;
  songList: Song[] = [];
  commentPlaylist: Commentplaylist[] = [];
  playlist?: Playlist;
  p?: number;
  page?: number;
  totalLike: any;
  isLoggedIn?: boolean;
  isLiked?: boolean;
  form!: FormGroup;
  user!: User;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  titleHead: string = "Bài Hát";
  nameAlbum: string = "";


// Material Style Advance Audio Player Playlist


  msaapPlaylist: Track[] = [];


  constructor(private playlistService: PlaylistService,
              private commentPlaylistService: CommentplaylistService,
              private router: ActivatedRoute, private formBuild: FormBuilder,private userService: UserService,private httpService: HttpService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('auth-token')) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('idUser')) {
      // @ts-ignore
      this.userId = parseInt(localStorage.getItem('idUser')) ;
    }
    this.form = this.formBuild.group({
      comment: ['']
    });
    // Lấy user - lấy tạm dùng sau
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
      // console.log(this.user);
    });
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getTotalLikePlaylist(this.id).subscribe(countLike => {
      this.totalLike = countLike;
    });
    this.playlistService.checkLikePlaylist(this.id,this.userId).subscribe(status => {
      this.isLiked = status;
    });
    this.commentPlaylistService.getCommentByPlaylist(this.id).subscribe(comments => {
      this.commentPlaylist = comments;
      console.log(this.commentPlaylist);
      console.log(comments);
    }, error => {
      console.log(error);
    });
    this.playlistService.getById(this.id).subscribe(res => {
      this.playlist = res;
      this.playlistService.increaseViewPlaylist(this.playlist?.id).subscribe(() => {
        console.log('Increase Success');
      });
      this.playlistService.showSongInPlaylist(this.id).subscribe(songs => {
        this.songList = songs;
        for (let i = 0; i < this.songList.length; i++) {
          // let track: Track = {link: this.songList[i].fileMp3, title: this.songList[i].name}
          let track: Track = {link: this.songList[i].fileMp3, title: this.songList[i].name}
          this.msaapPlaylist.push(track);
        }
        this.nameAlbum = this.playlist?.name + "";
      });
    });
  }

  onEnter() {
    const now = new Date();
    const dateConvert = moment(now).format('yyyy-MM-DD');
    const comment = {
      comment_content: this.form?.value.comment,
      userComment: this.user,
      playListComment: this.playlist,
      dateCreate: dateConvert
    };
    this.commentPlaylistService.updateCommentPlaylist(comment).subscribe(res => {
      this.commentPlaylistService.getCommentByPlaylist(this.playlist?.id).subscribe(data => {
        this.commentPlaylist = data;
        this.form?.reset();
      });
    });
  }

  onEnded($event: string) {

  }

  like(idPlaylist: number | undefined, idUser: number | undefined) {
    this.playlistService.likePlaylist(idPlaylist,idUser).subscribe(countLike => {
      this.totalLike = countLike;
      this.isLiked = true
        });
    ;
  }
  // likePlaylist(idUser, idPlaylist) {
  //   this.likePlaylistService.updateLikePlaylist(idUser, idPlaylist).subscribe(countLike => {
  //     this.totalLike = countLike;
  //   });
  // }

  unlike(idPlaylist: number | undefined, idUser: number | undefined) {
    this.playlistService.unlikeLikePlaylist(idPlaylist,idUser).subscribe(countLike => {
      this.totalLike = countLike;
      this.isLiked = false
    });
    ;
  }
}
