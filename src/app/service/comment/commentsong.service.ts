import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../enronments/environment";
import {Commentsong} from "../../model/commentsong";
import {HttpService} from "../http-service.service";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentsongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  // Lấy hết comment trong 1 Song
  getCommentBySong(idSong: number | undefined): Observable<any> {
    return this.http.get<any>(API_URL + '/comment/song/' + idSong);
  }

  updateCommentSong(commentSong: Commentsong): Observable<any> {
    return this.http.post(API_URL + '/comment/song', commentSong, this.httpService.getHttp());
  }
}
