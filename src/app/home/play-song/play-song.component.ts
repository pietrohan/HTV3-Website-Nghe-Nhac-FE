import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// import {LikeSong} from '../../../model/LikeSong';
// import {LikesongService} from '../../../service/likesong.service';
import {Song} from "../../model/song";
import {SongService} from "../../service/song/song.service";
import {User} from "../../model/user";
import {HttpService} from "../../service/http-service.service";
import {UserService} from "../../service/user/user.service";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {CommentsongService} from "../../service/comment/commentsong.service";
import {Commentsong} from "../../model/commentsong";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment/moment";

declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
  songList: Song[] = [];
  // likeSongs?: LikeSong[];
  commentSong: Commentsong[] = [];
  id?: number;
  userId?: number;
  song?: Song;
  user?: User;
  p?: number;
  page?: number;
  totalLike?: any;
  form!: FormGroup;
  isLoggedIn?: boolean;
  totalView?: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private userService: UserService,
              private formBuild: FormBuilder,
              // private likeSongService: LikesongService,
              private commentSongService: CommentsongService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('auth-token')) {
      this.isLoggedIn = true;
    }
    this.form = this.formBuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));

    // Lấy totalLike - DONE
    // this.likeSongService.getTotalLike(this.id).subscribe(countLike => {
    //   this.totalLike = countLike;
    // });

    // Lấy comment của bài hát - DONE
    this.commentSongService.getCommentBySong(this.id).subscribe(comments => {
      this.commentSong = comments;
      console.log(this.commentSong);
    });
    console.log(this.commentSong);
    // Lấy các bài hát mới cập nhập
    this.songService.getAllSongsNew().subscribe(res => {
      this.songList = res;
    });

    // Lấy user - lấy tạm dùng sau
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
      // console.log(this.user);
    });

    // Lấy bài hát, dùng để chạy bài hát - DONE
    this.songService.getById(this.id).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song?.fileMp3,
            cover_art_url: this.song?.avatar
          }
        ]
      });
    });

  }

  updateView() {
    this.songService.increaseViewSong(this.song?.id).subscribe(() => {
            console.log('Increase Success');
          });

  }





  // Đổi bài hát : dùng trong đoạn "Có thể bạn muốn nghe"
  // tslint:disable-next-line:typedef
  changeSong(data: any) {
    this.commentSongService.getCommentBySong(data).subscribe(res => {
      this.commentSong = res;
    });

    // this.likeSongService.getTotalLike(data).subscribe(countLike => {
    //   this.totalLike = countLike;
    // });

    this.songService.getById(data).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song?.fileMp3,
            cover_art_url: this.song?.avatar
          }
        ],
      });
    });
  }

  onEnter() {
    const now = new Date();
    const dateConvert = moment(now).format('yyyy-MM-DD');
    const comment = {
      comment_content: this.form?.value.comment,
      userComment: this.user,
      songComment: this.song,
      dateCreate: dateConvert
    };
    this.commentSongService.updateCommentSong(comment).subscribe(res => {
      this.commentSongService.getCommentBySong(this.song?.id).subscribe(data => {
        this.commentSong = data;
        this.form?.reset();
      });
    });
  }
}
